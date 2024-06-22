#importnya ini
import cv2  
from ultralytics import YOLO

#load Model
model = YOLO("acne.pt") 

def predictPhoto():
    results = model("jenis_jerawat.png")
    for result in results:
            boxes = result.boxes  # Boxes object for bounding box outputs
            masks = result.masks  # Masks object for segmentation masks outputs
            keypoints = result.keypoints  # Keypoints object for pose outputs
            probs = result.probs  # Prqobs object for classification outputs
            obb = result.obb  # Oriented boxes object for OBB outputs
            result.show()  # display to screen
            result.save(filename="resultfoto1lagi.jpg")  # save to disk
