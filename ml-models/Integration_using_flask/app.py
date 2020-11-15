#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Nov 15 00:05:12 2020

@author: khush
"""
from flask import Flask, render_template, Response
import cv2
import numpy as np
#import cv2
import tensorflow as tf
import time
from tensorflow.keras.models import load_model
import requests


class_names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
               'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W','X', 'Y','Z', 'del','nothing', 'space']

model = load_model('resnetV2.h5')

app = Flask(__name__)

def adjust_gamma(image, gamma=1.0):

    invGamma = 1.0 / gamma
    table = np.array([((i / 255.0) ** invGamma) * 255
                      for i in np.arange(0, 256)]).astype("uint8")

    return cv2.LUT(image, table)

camera = cv2.VideoCapture(0)  # use 0 for web camera
#  for cctv camera use rtsp://username:password@ip_address:554/user=username_password='password'_channel=channel_number_stream=0.sdp' instead of camera
# for local webcam use cv2.VideoCapture(0)

def gen_frames():  # generate frame by frame from camera
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()  # read the camera frame
        cv2.rectangle(frame, (100, 50), (500, 450), (0, 0, 255))
        #cv2.imshow('frame', frame)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = adjust_gamma(frame, gamma=0.7)
        #cv2.imshow('frame',frame)
        crop = np.array(frame[51:450, 101:500, :])
    
        dim = (200, 200)
        img = cv2.resize(crop, dim, interpolation=cv2.INTER_AREA)
        img = img.reshape((1, 200, 200, 3))
        img = img / 255.0
        predicted = model.predict(img)
        #cv2.putText(frame,class_names[np.argmax(predicted)],(0,0),cv2.FONT_HERSHEY_SIMPLEX,(0,255,255))
        no = class_names[np.argmax(predicted)]
        url = "https://voice4mutes.firebaseio.com/ml_output.json"
        headers = {
          'Content-Type': 'application/json'
        }
        
        response = requests.post(url, json={"Location": no, "ImageUrl": "jshdcb"})
        
        print(response.text.encode('utf8'))
    #print(class_names[np.argmax(predicted)])
    
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


@app.route('/video_feed')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)