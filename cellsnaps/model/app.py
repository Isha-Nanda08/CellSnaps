import base64
import io
import os
import random

import torch
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

model = torch.hub.load("ultralytics/yolov5", "custom", path="best.pt")
model.iou = 0.20
model.conf = 0.50

@app.route('/detect', methods=['POST'])
def detect_objects():
    if 'images' not in request.files:
        return jsonify({"error": "No images provided"}), 400

    images = []
    for file in request.files.getlist('images'):
        image = Image.open(file.stream).convert("RGB")
        images.append(image)


    results = model(images, size=480)

    results.render()

    encoded_images = []
    for img in results.ims:
        buffered = io.BytesIO()
        img_with_boxes = Image.fromarray(img)
        img_with_boxes.save(buffered, format="JPEG")
        encoded_image = base64.b64encode(buffered.getvalue()).decode("utf-8")
        encoded_images.append(f"data:image/jpeg;base64,{encoded_image}")

    class_cell_count = {}
    total_area_um2 = 0

    class_names = model.names

    # Process results for each image
    for i in range(len(results.xywh)):
        # Get predictions for each image
        predictions = results.xywh[i]

        # Image dimensions in pixels (1 pixel = 1 μm² at 100x magnification)
        magnification = 6  # for 100x, each pixel is 1 μm²
        width, height = images[i].size
        image_area_um2 = width * height * (100 / magnification * 1e-6)  # Total area in μm²
        total_area_um2 += image_area_um2  # accumulate total area across images

        # Extract class IDs
        class_ids = predictions[:, 5].int()  # class IDs (index 5 is the class ID)

        # Update counts for each detected class (number of occurrences)
        for class_id in class_ids:
            class_id = class_id.item()  # convert tensor to a native integer
            if class_id not in class_cell_count:
                class_cell_count[class_id] = 0  # Initialize cell count per class

            class_cell_count[class_id] += 1  # Count each occurrence of a cell detection for the class

    # Prepare the response data
    response_data = {"output_images": encoded_images}

    # Calculate and add average cell density (in μL) for each class
    density_data = {}
    for class_id in class_cell_count:
        total_cells = class_cell_count[class_id]

        # Calculate the average cell density for each class (cells per μm²)
        average_cell_density_um2 = total_cells / total_area_um2 if total_area_um2 > 0 else 0

        # Convert cell density to cells per μL
        average_cell_density_uL = average_cell_density_um2 * 1e6  # Convert from μm² to μL

        # Map class ID to class name
        class_name = class_names[class_id]

        density_data[class_name] = {
            "average_cell_density_um2": round(average_cell_density_um2, 6),
            "average_cell_density_uL": round(average_cell_density_uL)
        }

    # Add density data to the response
    response_data["density_data"] = density_data

    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
