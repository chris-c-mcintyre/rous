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

# share

sha_con_lis = []

sha_fig_dic = {}

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
  
def get_str_dat(img_bsf):

  # https://codoraven.com/tutorials/opencv-vs-pillow/image-base64/

  img_str = base64.b64decode(img_bsf)

  #img_arr = np.fromstring(img_str, np.uint8)
  """
  The binary mode of fromstring is deprecated, as it behaves surprisingly on unicode inputs. Use frombuffer instead
  """
  img_arr = np.frombuffer(img_str, np.uint8)

  img_dat = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)

  return img_dat

def fix_img_siz(img_dat, img_siz_max=2000):

  img_x = len(img_dat)
  img_y = len(img_dat[0])

  if img_x > img_siz_max or img_y > img_siz_max:

    img_sca = img_siz_max / max(img_x, img_y)

    img_dat = cv2.resize(img_dat, None, fx= img_sca, fy= img_sca, interpolation= cv2.INTER_AREA)

  return img_dat

def fix_img_rat(img_dat, img_rat_min=1.0, img_pad_fil=0):

  img_x = len(img_dat)
  img_y = len(img_dat[0])

  img_rat = (min(img_x, img_y)) / (max(img_x, img_y))

  if img_rat < img_rat_min:

    rat_dif = (abs(img_x - img_y))

    mat_dif = math.floor(rat_dif / 2)

    if img_x > img_y:

      if rat_dif % 2: img_dat = np.hstack((np.full(shape=(img_x, 1, 3),fill_value=img_pad_fil,dtype=img_dat.dtype),img_dat))

      img_dat = np.hstack((np.full(shape=(img_x, mat_dif, 3),fill_value=img_pad_fil,dtype=img_dat.dtype),img_dat))
      img_dat = np.hstack((img_dat,np.full(shape=(img_x, mat_dif, 3),fill_value=img_pad_fil,dtype=img_dat.dtype)))

    elif img_y > img_x:

      if rat_dif % 2: img_dat = np.vstack((np.full(shape=(1, img_y, 3),fill_value=img_pad_fil,dtype=img_dat.dtype),img_dat))

      img_dat = np.vstack((np.full(shape=(mat_dif, img_y, 3),fill_value=img_pad_fil,dtype=img_dat.dtype),img_dat))
      img_dat = np.vstack((img_dat,np.full(shape=(mat_dif, img_y, 3),fill_value=img_pad_fil,dtype=img_dat.dtype)))

  return img_dat

def sca_img_siz(img_dat, img_sca=2, img_siz_max=2000):

  img_dat = cv2.resize(img_dat, None, fx= img_sca, fy= img_sca, interpolation= cv2.INTER_CUBIC)

  img_dat = fix_img_siz(img_dat, img_siz_max=img_siz_max)

  return img_dat

def pad_img_siz(img_dat, img_siz_max=2000, img_pad_fil=0):

  img_x = len(img_dat)
  img_y = len(img_dat[0])

  if img_x < img_siz_max:

    x_dif = abs(img_siz_max - img_x)

    if x_dif % 2:
      img_dat = np.hstack((np.full(shape=(img_x, 1, 3),fill_value=img_pad_fil,dtype=img_dat.dtype),img_dat))
      img_x = len(img_dat)
      x_dif = x_dif - 1

    img_x_dif = math.floor((x_dif) / 2)

    img_dat = np.hstack((np.full(shape=(img_x, img_x_dif, 3),fill_value=img_pad_fil,dtype=img_dat.dtype),img_dat))
    img_dat = np.hstack((img_dat,np.full(shape=(img_x, img_x_dif, 3),fill_value=img_pad_fil,dtype=img_dat.dtype)))

  if img_y < img_siz_max:

    y_dif = abs(img_siz_max - img_y)

    if y_dif % 2:
      img_dat = np.vstack((np.full(shape=(1, img_siz_max, 3),fill_value=img_pad_fil,dtype=img_dat.dtype),img_dat))
      img_y = len(img_dat[0])
      y_dif = x_dif - 1

    img_y_dif = math.floor((y_dif) / 2)

    img_dat = np.vstack((np.full(shape=(img_y_dif, img_siz_max, 3),fill_value=img_pad_fil,dtype=img_dat.dtype),img_dat))
    img_dat = np.vstack((img_dat,np.full(shape=(img_y_dif, img_siz_max, 3),fill_value=img_pad_fil,dtype=img_dat.dtype)))

  return img_dat

def sep_img_arr(img_dat):

  a_dat = img_dat[:,:,0]
  b_dat = img_dat[:,:,1]
  c_dat = img_dat[:,:,2]

  return [a_dat, b_dat, c_dat]

def get_hsv_arr(img_dat):

  hsv_dat = cv2.cvtColor(img_dat, cv2.COLOR_BGR2HSV_FULL)

  hsv_arr = sep_img_arr(hsv_dat)

  return hsv_arr

def get_rgb_arr(img_dat):

  rgb_dat = cv2.cvtColor(img_dat, cv2.COLOR_BGR2RGB)

  rgb_arr = sep_img_arr(rgb_dat)

  return rgb_arr

def get_arr_gra(arr_dat, gra_min=None, gra_max=None, nor_min=None, nor_max=None):

  arr_gra = np.gradient(
    arr_dat,
    #edge_order=2,
  )

  for i, gra in enumerate(arr_gra):

    if gra_max or gra_min:
      if gra_max == None: gra_max = np.max(gra)
      if gra_min == None: gra_min = np.min(gra)
      gra = np.clip(gra, gra_min, gra_max)

    if nor_max or nor_min:
      if nor_max == None: nor_max = np.max(arr_dat)
      if nor_min == None: nor_min = np.min(arr_dat)

      gra = (nor_max-nor_min)*(gra - np.min(gra))/np.ptp(gra)-nor_min

    arr_gra[i] = gra

  return arr_gra

def get_opa_flo(
  img_arr,
  opa_min=0,
  opa_max=1,
):

  SCA_FLO = 1/255

  opa_sca = []

  opa_sca.append([0,opa_min])
  opa_sca.append([SCA_FLO,opa_max])
  opa_sca.append([1, opa_max])

  return opa_sca

def get_opa_cei(
  img_arr,
  opa_min=0,
  opa_max=1,
):

  SCA_CEI = 254/255

  opa_sca = []

  opa_sca.append([0,opa_max])
  opa_sca.append([SCA_CEI,opa_max])
  opa_sca.append([1, opa_min])

  return opa_sca

def get_opa_sca(img_arr):

  img_min = np.min(img_arr)/255
  img_max = np.max(img_arr)/255
  img_avg = np.mean(img_arr)/255

  opa_sca = []

  if img_min > 0: opa_sca.append([0, 0])
  opa_sca.append([img_min, 0])
  if img_avg < 1: opa_sca.append([img_avg, 1])
  if img_avg < img_max < 1: opa_sca.append([img_max, 1])
  opa_sca.append([1, 1])

  return opa_sca

def get_col_sca(
  img_arr,
  col_min="rgb(0,0,0)",
  col_max="rgb(255,255,255)",
):

  img_min = np.min(img_arr)/255
  img_max = np.max(img_arr)/255

  col_sca = []

  if img_min > 0: col_sca.append([0, col_min])
  col_sca.append([img_min, col_min])
  if img_max < 1: col_sca.append([img_max, col_max])
  col_sca.append([1, col_max])

  return col_sca

def val_piv(
  val,
  val_min=0,
  val_max=255
):

  # this accidentally works on rows too

  val_ran = (val_max - val_min) + 1
  val_zer = -1

  if val_ran % 2:
    val_ran = val_ran - 1
    val_zer = val_zer + 1

  val_mid = val_min + int(val_ran / 2)
  val_dif = val_mid - val

  val_ret = val_zer + val_mid + val_dif

  return val_ret

def run_img(
  img_con,
):

  img_dat = get_str_dat(img_con)

  img_dat = fix_img_siz(img_dat)
  img_dat = fix_img_rat(img_dat)

  img_dat = pad_img_siz(img_dat)

  #[r_arr, g_arr, b_arr] = get_rgb_arr(img_dat)
  [h_arr, s_arr, v_arr] = get_hsv_arr(img_dat)

  sur_dat = v_arr
  sur_col = v_arr

  col_sca = get_col_sca(
    sur_col,
    col_min="rgb(0,0,0)",
    col_max="rgb(255,255,255)",
  )

  sur_opa = 1

  opa_sca = get_opa_flo(sur_dat)

  sha_fig_dic["data"] = sur_dat
  sha_fig_dic["colo"] = sur_col
  sha_fig_dic["csca"] = col_sca
  sha_fig_dic["opac"] = sur_opa
  sha_fig_dic["osca"] = opa_sca

  return 0

def lay_sur_fig(arr_dat, sur_col, col_sca, opa_mul, opa_sca):

  dat_sur_lis = []

  sur_for = go.Surface(
    z=sha_fig_dic["fort"],
    colorscale='amp',
    hoverinfo='skip',
    opacity=1,
    showlegend=False,
    showscale=False,
  )
  dat_sur_lis.append(sur_for)

  dat_sur = go.Surface(
    z=arr_dat,
    colorscale=col_sca,
    hoverinfo='skip',
    opacity=opa_mul,
    opacityscale=opa_sca,
    showlegend=False,
    showscale=False,
    surfacecolor=sur_col,
  )
  dat_sur_lis.append(dat_sur)

  sur_fig = go.Figure(
    data=dat_sur_lis,
  )

  sur_fig.update_layout(
    autosize=False,
    width=900, height=900,
  )

  return sur_fig

def parse_contents(contents):

  sha_con_lis.append(contents)

  parse_i = len(sha_con_lis)-1

  run_img(contents[0][contents[0].index(","):])

  sha_fig_dic["cont"] = 0

  img_fig = lay_sur_fig(
    sha_fig_dic["data"],
    sha_fig_dic["colo"],
    sha_fig_dic["csca"],
    sha_fig_dic["opac"],
    sha_fig_dic["osca"],
  )

  ret_div = html.Div([

    html.Hr(),
    dcc.Slider(
      min=0,
      max=len(contents)-1,
      step=1,
      value=0,
      included=False,
      tooltip={"placement": "bottom", "always_visible": True},
      id={"type": "sur-sli", "index": parse_i},
    ),
    dcc.Graph(
      figure=img_fig,
      id={"type": "sur-fig", "index": parse_i},
    ),
    dcc.Checklist(
      options=[
       {'value': 'gra', 'label': 'Grade'},
       {'value': 'gro', 'label': 'Grode'},
       {'value': 'inv', 'label': 'Invert'},
       {'value': 'piv', 'label': 'Pivot'},
       {'value': 'rot', 'label': 'Turn'},
       {'value': 'fli', 'label': 'Flip'},
       {'value': 'flo', 'label': 'Flop'},
      ],
      value=[],
      id={"type": "sur-opt", "index": parse_i},
    ),
    html.Button(
      'Update',
      id={"type": "sur-btn", "index": parse_i},
      n_clicks=0
    ),
    html.Hr(),
  ])

  return ret_div

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


@callback(
  Output({"type": "sur-fig", "index": MATCH}, "figure"),
  Input({"type": "sur-btn", "index": MATCH}, "n_clicks"),
  Input({"type": "sur-sli", "index": MATCH}, "value"),
  State({"type": "sur-opt", "index": MATCH}, "value"),
  prevent_initial_call=True,
)
def button_handle(
  btn,
  sli,
  opt,
):

  pat_upd = {
    "data": False,
    "colo": False,
    "csca": False,
    "opac": False,
    "osca": False,
  }

  if sli != sha_fig_dic["cont"]:

    run_img_sta = time.time()

    input_group = json.loads(ctx.triggered[0]["prop_id"].split(".")[0])["index"]
    new_con = sha_con_lis[input_group][sli]
    new_con = new_con[new_con.index(","):]
    run_img(new_con)

    sha_fig_dic["cont"] = sli

    pat_upd["data"] = True
    pat_upd["colo"] = True
    pat_upd["csca"] = True
    pat_upd["opac"] = True
    pat_upd["osca"] = True

    run_img_sto = time.time()

  if "gra" in opt:

    gra_sta = time.time()

    sur_gra = get_arr_gra(
      sha_fig_dic["data"],
      nor_min=0,
      nor_max=0.5,
    )
    gra_dat = np.add(np.fabs(sur_gra[0]), np.fabs(sur_gra[1]))
    sha_fig_dic["data"] = np.multiply(sha_fig_dic["data"], gra_dat)

    pat_upd["data"] = True

    gra_sto = time.time()

  if "gro" in opt:

    gro_sta = time.time()

    sur_gro = get_arr_gra(
      sha_fig_dic["data"],
      nor_min=1.0,
      nor_max=2.0,
    )
    gro_dat = np.add(np.fabs(sur_gro[0]), np.fabs(sur_gro[1]))
    sha_fig_dic["data"] = np.multiply(sha_fig_dic["data"], gro_dat)

    pat_upd["data"] = True

    gro_sto = time.time()

  if "inv" in opt:

    inv_sta = time.time()

    sha_fig_dic["colo"] = np.apply_along_axis(
      val_piv,
      1,
      sha_fig_dic["colo"],
    )

    pat_upd["colo"] = True

    sha_fig_dic["csca"] = get_col_sca(
      sha_fig_dic["colo"],
      col_min="black",
      col_max="white",
    )

    pat_upd["csca"] = True

    inv_sto = time.time()

  if "piv" in opt:

    piv_sta = time.time()

    sha_fig_dic["data"] = np.apply_along_axis(val_piv, 1, sha_fig_dic["data"])

    pat_upd["data"] = True

    piv_sto = time.time()

  if "rot" in opt:

    rot_sta = time.time()

    sha_fig_dic["data"] = np.rot90(sha_fig_dic["data"], k=1, axes=(0, 1))
    sha_fig_dic["colo"] = np.rot90(sha_fig_dic["colo"], k=1, axes=(0, 1))

    pat_upd["data"] = True
    pat_upd["colo"] = True

    rot_sto = time.time()

  if "fli" in opt:

    fli_sta = time.time()

    sha_fig_dic["data"] = np.fliplr(sha_fig_dic["data"])
    sha_fig_dic["colo"] = np.fliplr(sha_fig_dic["colo"])

    pat_upd["data"] = True
    pat_upd["colo"] = True

    fli_sto = time.time()

  if "flo" in opt:

    flo_sta = time.time()

    sha_fig_dic["data"] = np.flipud(sha_fig_dic["data"])
    sha_fig_dic["colo"] = np.flipud(sha_fig_dic["colo"])

    pat_upd["data"] = True
    pat_upd["colo"] = True

    flo_sto = time.time()

  pat_sta = time.time()

  # Creating a Patch object
  patched_figure = Patch()

  if pat_upd["osca"]: patched_figure["data"][1]["opacityscale"] = sha_fig_dic["osca"]
  if pat_upd["opac"]: patched_figure["data"][1]["opacity"] = sha_fig_dic["opac"]
  if pat_upd["csca"]: patched_figure["data"][1]["colorscale"] = sha_fig_dic["csca"]
  if pat_upd["colo"]: patched_figure["data"][1]["surfacecolor"] = sha_fig_dic["colo"]
  if pat_upd["data"]: patched_figure["data"][1]["z"] = sha_fig_dic["data"]

  pat_sto = time.time()

  return patched_figure

def main() -> int:

  # share

  sha_fig_dic = {
    "cont": 0,
    "fort": add_fort(np.zeros(shape=(2000,2000),dtype=np.uint16),2000),
    "data": np.zeros(shape=(2000,2000),dtype=np.uint16),
    "colo": np.zeros(shape=(2000,2000),dtype=np.uint16),
    "csca": [],
    "opac": 1,
    "osca": [],
  }

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
