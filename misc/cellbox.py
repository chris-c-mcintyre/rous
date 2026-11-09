# cellbox.py

# alternate depth visualizer for images

# modules

import numpy as np
import cv2
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from dash import Dash, dcc, html, Input, Output, State, callback, ctx, Patch, ALL, MATCH

import base64
import datetime
import json
import math
import sys
import time

# methods

def add_pole(arr_dat, arr_max = None):

  if arr_max == None: arr_max = np.max(arr_dat)

  arr_dat[0][0] = arr_max

  return arr_dat

def add_wall(arr_dat, arr_max = None):

  arr_y = len(arr_dat[0])

  if arr_max == None: arr_max = np.max(arr_dat)

  for j in range(arr_y):
    arr_dat[0][j] = arr_max

  return arr_dat

def add_fort(arr_dat, arr_max = None):

  arr_x = len(arr_dat)
  arr_y = len(arr_dat[0])

  if arr_max == None: arr_max = np.max(arr_dat)

  for i in range(arr_x):
    arr_dat[i][0] = arr_max
    arr_dat[i][-1] = arr_max

  for j in range(arr_y):
    arr_dat[0][j] = arr_max
    arr_dat[-1][j] = arr_max

  return arr_dat

@callback(
  Output('output-image-upload', 'children'),
  Input('upload-image', 'contents'),
  State('upload-image', 'filename'),
  State('upload-image', 'last_modified'),
)
def update_output(list_of_contents, list_of_names, list_of_dates):

  if list_of_contents is not None:
 
    children = [
      parse_contents(
        list_of_contents,
        #list_of_names,
        #list_of_dates,
      )
    ]

    return children

def main() -> int:

  # dash

  app = Dash()

  # https://dash.plotly.com/dash-core-components/upload

  app.layout = html.Div([
    dcc.Upload(
      id='upload-image',
      children=html.Div([
        'Drag and Drop or ',
        html.A('Select Files')
      ]),
      style={
        'width': '100%',
        'height': '60px',
        'lineHeight': '60px',
        'borderWidth': '1px',
        'borderStyle': 'dashed',
        'borderRadius': '5px',
        'textAlign': 'center',
        'margin': '10px'
      },
      # Allow multiple files to be uploaded
      multiple=True,
    ),
    html.Div(id='output-image-upload'),
  ])

  app.run_server()

  return 0

if __name__ == '__main__': sys.exit(main())
