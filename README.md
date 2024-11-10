# CellSnaps

**CellSnaps** is a deep learning-powered image analysis tool designed to predict the counts of red blood cells (RBC), white blood cells (WBC), and platelets from magnified blood cell images. This project consists of a frontend built with React and a backend built with Express.js. The frontend communicates with the backend for image analysis and storing results.

## Project Structure
- **Frontend**: Built with React, responsible for the user interface and handling image uploads.
- **Backend**: Built with Express.js, responsible for processing the images, running predictions, and storing results in MongoDB.

## Prerequisites

Before getting started, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (for storing results)
- `npm` (Node Package Manager) is included with Node.js.

## Setup Instructions

### 1. Clone the Repository

Clone the **CellSnaps** repository to your local machine:

bash
git clone https://github.com/Isha-Nanda08/CellSnaps.git
cd CellSnaps

## Frontend Setup

Navigate to the frontend folder and install the dependencies:

bash
cd cellsnaps
npm install

## Backend Setup

Navigate to the frontend folder and install the dependencies:

bash
cd Backend
npm install

## ML Model Setup
cd cellsnaps
cd server
cd yolov5
pip install -r requirements.txt


### 2. Running Project

##Start the Backend Server
Once the dependencies are installed for the backend, you can start the backend server using the following command:

bash
cd Backend
npm start

##Start the Frontend Server

bash
cd cellsnaps
npm start

##Start the Model Server
cd cellsnaps
cd server
python app.py

Now you are ready to GO!!

### 3. Accessing the Application

Frontend: Open your browser and go to http://localhost:3000 to interact with the application.

Backend: The backend will be running at http://localhost:3080 by default, handling image uploads, predictions, and database operations.

Model_Server: By default it will be hosted at http://localhost:5000



### 4. About Model:

###Automatic Identification and Counting of Blood Cells

##Overview
This project presents a machine learning approach for the automatic identification and counting of three types of blood cells using the YOLO (You Only Look Once) object detection and classification algorithm. The model is trained on the BCCD dataset of blood smear images to identify and count red blood cells (RBCs), white blood cells (WBCs), and platelets.


##Introduction
A complete blood cell (CBC) count is crucial for evaluating overall health. Traditionally, blood cells are counted manually using a haemocytometer, which is time-consuming and prone to errors. This project aims to automate the process using machine learning techniques.

##Methodology
Algorithm: YOLO (You Only Look Once) object detection and classification
Dataset: BCCD dataset of blood smear images
Blood Cells Identified: Red blood cells (RBCs), white blood cells (WBCs), and platelets
Training: The YOLO framework is trained with a modified configuration to improve accuracy and efficiency.

#Results
The model can identify and count blood cells from smear images in less than a second.
The trained model is generalized and performs well on smear images from different datasets.

#Applications
This automated system can significantly reduce the time and effort required for blood cell counting in medical diagnostics.
It provides a reliable and efficient alternative to manual counting, improving accuracy and consistency.

