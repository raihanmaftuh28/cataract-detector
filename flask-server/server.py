from flask import Flask, request, send_file
from flask_cors import CORS, cross_origin
import tensorflow as tf
from tensorflow.keras.models import *
from PIL import Image
import numpy as np
import io
import base64
import cv2

app = Flask(__name__)
CORS(app, support_credentials=True)

model = load_model('model_30.h5',compile = False)
# print(model.summary())
model.compile(optimizer='adam')

@app.route('/classify', methods=['GET'])
@cross_origin(support_credentials=True)
def classify():
   
    img = Image.open('image/data.png')
    img = np.array(img)
    img = tf.image.resize(img,(256,256))
    img = img[:, :, :3]
    print(tf.shape(img))
    yhat = model.predict(np.expand_dims(img/255,0))
    print(yhat)

    if(yhat[0]<0.5):
        classified_result = "Cataract"
        message = """This means that the model detect a sign of blurriness in your cornea. It is recommended to consult to a doctor for further action to be taken. """
    else:
        classified_result = "Normal"
        message = """Make sure you keep your eyes healthy and having less chance of getting cataract by gets proper nutrition, avoid smoking, not consuming alcohol, and gets sleep regularly. """

    
    return ({"result" : classified_result,
    "message" : message})


    


@app.route('/upload-image', methods=['POST'])
@cross_origin(support_credentials=True)
def get_image():
    file = request.files['file']
    fileMimetype = file.mimetype[6:]
    fileUrl = 'image/data.png'
    if file:
        file.save(fileUrl)
    return ({"status" : "success", "code": 200})


@app.route('/get-image')
@cross_origin(support_credentials=True)
def image_route():
    image = "image/data.png"
    return send_file(image,mimetype='image/png')


if __name__ == "__main__":
    app.run(debug=True)