import math
import sys

import numpy as np
import tkinter as tk

from PIL import Image, ImageTk, ImagePalette

def load_noise( data_path = "256x256x256.csv", data_shape = (256,256,256) ):

  noise_data = np.loadtxt(
    data_path,
    delimiter = ",",
    dtype="B"
  )

  noise_data = np.reshape(
    noise_data,
    newshape = data_shape
  )

  return noise_data

def build_palette( seg = [] ):

  if len(seg) == 0:
    seg = [
      [  255,    0,    0 ],
      [  255,  165,    0 ],
      [  255,  255,    0 ],
      [    0,    0,  255 ],
      [    0,  255,    0 ],
      [   75,    0,  130 ],
      [  143,    0,  255 ],
      [  255,  255,  255 ],
    ]

  seg_steps = math.floor(256 / len(seg))

  frame_palette = []
  for i in range(len(seg) - 1):

    ran_r = seg[i+1][0] - seg[i][0]
    ran_g = seg[i+1][1] - seg[i][1]
    ran_b = seg[i+1][2] - seg[i][2]

    step_r = math.floor(ran_r / seg_steps)
    step_g = math.floor(ran_g / seg_steps)
    step_b = math.floor(ran_b / seg_steps)

    for j in range(seg_steps):

      frame_palette.append( min( max( seg[i][0] + ( j * step_r ), 0 ), 255 ) )
      frame_palette.append( min( max( seg[i][1] + ( j * step_g ), 0 ), 255 ) )
      frame_palette.append( min( max( seg[i][2] + ( j * step_b ), 0 ), 255 ) )

  return frame_palette

def launch_ui( input_manifold, image_palette = None ):

  """
  https://stackoverflow.com/questions/53308708/
  how-to-display-an-image-from-a-numpy-array-in-tkinter
  """

  root = tk.Tk()

  frame_margin = 25
  start_frame_i = math.floor(input_manifold.shape[0] / 2)

  if image_palette == None:
    frame_empty_channel = Image.new(
      mode="L",
      size=(input_manifold.shape[1],input_manifold.shape[2]),
      color=0
    )
  else:
    frame_palette = ImagePalette.ImagePalette(
      mode = "L",
      palette = image_palette
    )

  manifold_label_left = tk.Label(
    root,
    bg="black",
    fg="white",
    width = 5,
    text = str(0)
  )
  manifold_label_left.grid(row=3,column=0)

  manifold_label = tk.Label(
    root,
    bg="black",
    fg="white",
    width = 5,
    text = str(start_frame_i)
  )
  manifold_label.grid(row=0,column=1)

  manifold_label_right = tk.Label(
    root,
    bg="black",
    fg="white",
    width = 5,
    text = str(0)
  )
  manifold_label_right.grid(row=3,column=2)

  manifold_canvas = tk.Canvas(
    root,
    bg="gray",
    height = input_manifold.shape[1] + (2 * frame_margin),
    width = input_manifold.shape[2] + (2 * frame_margin)
  )
  manifold_canvas.grid(row=1,column=1)

  manifold_image = manifold_canvas.create_image(
    frame_margin,
    frame_margin,
    anchor = tk.NW,
    image = None
  )

  def display_frame( frame_data ):

    if image_palette == None:

      frame_image = Image.merge(
        mode="RGB",
        bands=(
          Image.fromarray(
            frame_data,
          ),
          frame_empty_channel,
          frame_empty_channel
        )
      )

    else:

      frame_image = Image.fromarray(
        frame_data,
      )
      frame_image.putpalette(frame_palette)

    frame = ImageTk.PhotoImage(
      image = frame_image
    )

    manifold_canvas.itemconfig(
      manifold_image,
      image = frame
    )
    manifold_canvas.imgref = frame

  def display_value_left( scale_value ):
    manifold_label_left.config(
      text = str(scale_value)
    )

  def display_value( scale_value ):
    manifold_label.config(
      text = str(scale_value)
    )

  def display_value_right( scale_value):
    manifold_label_right.config(
      text = str(scale_value)
    )

  def frame_select( scale_value ):
    frame_data = input_manifold[int(scale_value)]
    display_frame(frame_data)
    display_value(scale_value)

  # https://pythonbasics.org/tkinter-scale/

  manifold_left = tk.Scale(
    root,
    activebackground = "red",
    from_ = 0,
    to = input_manifold.shape[2] - 1,
    orient = tk.VERTICAL,
    length = 256,
    showvalue = 0,
    command = display_value_left
  )
  manifold_left.grid(row=1,column=0)

  manifold_right = tk.Scale(
    root,
    activebackground = "red",
    from_ = 0,
    to = input_manifold.shape[1] - 1,
    orient = tk.VERTICAL,
    length = 256,
    showvalue = 0,
    command = display_value_right
  )
  manifold_right.grid(row=1,column=2)

  manifold_scale = tk.Scale(
    root,
    activebackground = "red",
    from_ = 0,
    to = input_manifold.shape[0] - 1,
    orient = tk.HORIZONTAL,
    length = 256,
    showvalue = 1,
    command = frame_select
  )
  manifold_scale.grid(row=2,column=1)

  manifold_scale.set(start_frame_i)

  manifold_left.set(0)
  manifold_left["state"] = "disabled"

  manifold_right.set(0)
  manifold_right["state"] = "disabled"

  root.mainloop()

def main( main_args ):

  noise_size = 256
  noise_dims = 3
  noise_form = "csv"

  noise_path = str(noise_size)
  for i in range(noise_dims - 1):
    noise_path = noise_path + "x" + str(noise_size)
  noise_path = noise_path + "." + noise_form

  noise_shape = (noise_size,) * noise_dims

  noise_manifold = load_noise(
    noise_path,
    noise_shape
  )

  palette_segments = []

  palette = build_palette(
    seg = palette_segments
  )

  launch_ui(
    noise_manifold,
    palette
  )

main( sys.argv )
