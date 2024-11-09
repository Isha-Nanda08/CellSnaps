from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
import io
import base64

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

model = torch.hub.load("ultralytics/yolov5", "custom", path="yolov5/runs/train/exp/weights/best.pt")
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

    for i in range(len(results.xywh)):
        predictions = results.xywh[i]
        
        magnification = 6 
        width, height = images[i].size
        image_area_um2 = width * height * (100 / magnification * 1e-6)
        total_area_um2 += image_area_um2

        class_ids = predictions[:, 5].int()

        for class_id in class_ids:
            class_id = class_id.item()
            if class_id not in class_cell_count:
                class_cell_count[class_id] = 0 
            
            class_cell_count[class_id] += 1

    response_data = {"output_images": encoded_images}

    density_data = {}
    for class_id in class_cell_count:
        total_cells = class_cell_count[class_id]
        
        average_cell_density_um2 = total_cells / total_area_um2 if total_area_um2 > 0 else 0
        
        average_cell_density_uL = average_cell_density_um2 * 1e6
        
        class_name = class_names[class_id]
        
        density_data[class_name] = {
            "average_cell_density_um2": round(average_cell_density_um2, 6),
            "average_cell_density_uL": round(average_cell_density_uL)
        }

    response_data["density_data"] = density_data

    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
