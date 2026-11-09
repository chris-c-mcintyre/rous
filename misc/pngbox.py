# pngbox.py

# simple depth visualizer for images

# modules

import plotly.graph_objects as go
import numpy as np

import cv2

import math
import sys

# methods

def main():

    # constants
    imagemax = 2000

    # default args
    imagename = "test.png"
    jumpsize = 8
    gridsize = 1
    gridwide = 1
    gridtall = 0

    # args handling
    if len(sys.argv) > 1:
      imagename = sys.argv[1]

    if len(sys.argv) > 2:
      jumpsize = int(sys.argv[2])

    if len(sys.argv) > 3:
      gridsize = int(sys.argv[3])

    if len(sys.argv) > 4:
      gridwide = int(sys.argv[4])

    if len(sys.argv) > 5:
      gridtall = int(sys.argv[5])

    imagetype = imagename.split(".")[1]

    imagedata = cv2.imread(imagename)

    if imagetype == "png":
      imagedata = cv2.cvtColor(imagedata, cv2.COLOR_BGRA2RGB)
    elif imagetype == "jpg":
      imagedata = cv2.cvtColor(imagedata, cv2.COLOR_BGR2RGB)
    else:
      raise Exception('Image file extension not recognized.')

    imagex = len(imagedata)
    imagey = len(imagedata[0])

    if imagex > imagemax or imagey > imagemax:

      imagescale = imagemax / max(imagex, imagey)

      imagedata = cv2.resize(imagedata, None, fx= imagescale, fy= imagescale, interpolation= cv2.INTER_AREA)

      imagex = len(imagedata)
      imagey = len(imagedata[0])

    imagerat = (min(imagex, imagey)) / (max(imagex, imagey))

    if imagerat <= 0.75:

      matdif = math.floor((abs(imagex - imagey)) / 2)

      if imagex > imagey:

        imagedata = np.hstack((np.zeros(shape=(imagex, matdif, 3),dtype=np.uint8),imagedata))
        imagedata = np.hstack((imagedata,np.zeros(shape=(imagex, matdif, 3),dtype=np.uint8)))

      elif imagey > imagex:

        imagedata = np.vstack((np.zeros(shape=(matdif, imagey, 3),dtype=np.uint8),imagedata))
        imagedata = np.vstack((imagedata,np.zeros(shape=(matdif, imagey, 3),dtype=np.uint8)))

      imagex = len(imagedata)
      imagey = len(imagedata[0])

    hsvdata = cv2.cvtColor(imagedata, cv2.COLOR_BGR2HSV_FULL)

    valdata = hsvdata[:,:,2]

    arrdata = valdata

    xgrad, ygrad = np.gradient(arrdata)
    arrgrad = np.add(xgrad, ygrad)

    arrnorm = arrgrad

    # https://stackoverflow.com/questions/1735025/how-to-normalize-a-numpy-array-to-within-a-certain-range

    # Normalised [0,255] as integer: don't forget the parenthesis before astype(int)
    #arrnorm = (255*(arrgrad - np.min(arrgrad))/np.ptp(arrgrad)).astype(int)

    # Normalised [0,1]
    arrnorm = (arrgrad - np.min(arrgrad))/np.ptp(arrgrad)

    # Normalised [-1,1]
    #arrnorm = 2.*(arrgrad - np.min(arrgrad))/np.ptp(arrgrad)-1
    #arrnorm = np.fabs(arrnorm)

    # Normalize audio channels to between -1.0 and +1.0
    #audio /= np.max(np.abs(audio),axis=0)

    # Normalize image to between 0 and 255
    #image *= (255.0/image.max())

    arrdata = np.multiply(arrdata, arrnorm)

    arrmax = 255 #np.max(arrdata)

    for i in range(imagex):
      arrdata[i][0] = arrmax
      arrdata[i][-1] = arrmax

    for j in range(imagey):
      arrdata[0][j] = arrmax
      arrdata[-1][j] = arrmax

    # figure
    imagefiggo = go.Figure(
      data=[
        go.Surface(
          z=arrdata,
          colorscale='gray',
          hoverinfo='skip',
          showlegend=False,
          showscale=True,
        ),
      ])

    imagefiggo.update_layout(
      title=imagename,
      autosize=False,
      width=900, height=900,
    )

    imagefiggo.show()

if __name__ == "__main__":
    main()

