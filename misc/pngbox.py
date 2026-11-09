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
    imagename = "data/test.png"
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

if __name__ == "__main__":
    main()

