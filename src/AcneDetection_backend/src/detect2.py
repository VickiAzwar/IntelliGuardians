import cv2 
from ultralytics import YOLO

# Load a model
model = YOLO("acne.pt")  # pretrained YOLOv8n model

# Run batched inference on a list of images
results = model(["jenis_jerawat.png", "jenis_jerawat.png"])  # return a list of Results objects

key = cv2. waitKey(1)
webcam = cv2.VideoCapture(0)
while True:
    try:
        check, frame = webcam.read()
        print(check) #prints true as long as the webcam is running
        print(frame) #prints matrix values of each framecd 
        cv2.imshow("Capturing", frame)
        key = cv2.waitKey(1)

        #Capturing IMG
        if key == ord('s'): 
            cv2.imwrite(filename='saved_img3.jpg', img=frame)
            cv2.waitKey(1650)
            results = model("saved_img3.jpg")  # return a list of Results objects
            
            for result in results:
                boxes = result.boxes  # Boxes object for bounding box outputs
                masks = result.masks  # Masks object for segmentation masks outputs
                keypoints = result.keypoints  # Keypoints object for pose outputs
                probs = result.probs  # Prqobs object for classification outputs
                obb = result.obb  # Oriented boxes object for OBB outputs
                result.show()  # display to screen
                result.save(filename="result2.jpg")  # save to disk
            #webcam.release()
            # img_new = cv2.imread('saved_img.jpg', cv2.IMREAD_GRAYSCALE)
            # img_new = cv2.imshow("Captured Image", img_new)
            # cv2.waitKey(1650)
            # #cv2.destroyAllWindows()
            # print("Processing image...")
            # img_ = cv2.imread('saved_img.jpg', cv2.IMREAD_ANYCOLOR)
            # print("Converting RGB image to grayscale...")
            # gray = cv2.cvtColor(img_, cv2.COLOR_BGR2GRAY)
            # print("Converted RGB image to grayscale...")
            # print("Resizing image to 28x28 scale...")


            #img_ = cv2.resize(gray,(28,28))
            #print("Resized...")
            #img_resized = cv2.imwrite(filename='saved_img-final.jpg', img=img_)
            print("Image saved!")
        
            #break
        elif key == ord('q'):
            print("Turning off camera.")
            webcam.release()
            print("Camera off.")
            print("Program ended.")
            cv2.destroyAllWindows()
            break
        
    except(KeyboardInterrupt):
        print("Turning off camera.")
        webcam.release()
        print("Camera off.")
        print("Program ended.")
        cv2.destroyAllWindows()
        break