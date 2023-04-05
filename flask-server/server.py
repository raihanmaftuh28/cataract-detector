from flask import Flask, request, send_file
from flask_cors import CORS, cross_origin
from tensorflow.keras.models import load_model
from PIL import Image

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/classify', methods=['GET'])
@cross_origin(support_credentials=True)
def classify():
    model = load_model('model_30.h5')
    img = Image.imread('image/data.png')
    print(img)
    yhat = new_model.predict(img)
    if(yhat[0]<0.5):
        classified_result = "Cataract"
    else:
        classified_result = "Normal"
    return ({"data" : classified_result})

    


@app.route('/upload-image', methods=['POST'])
@cross_origin(support_credentials=True)
def get_image():
    file = request.files['file']
    fileMimetype = file.mimetype[6:]
    fileUrl = 'image/data.png'
    if file:
        file.save(fileUrl)
    return ({"status" : "success", "code": 200})


if __name__ == "__main__":
    app.run(debug=True)