import math
import sys

import tkinter

def draw_umbrella( draw_args ):

  # https://pythonbasics.org/tkinter-canvas/

  # init tk
  root = tkinter.Tk()

  canvas_w = 900
  canvas_h = 900

  # these pythonic patterns are intolerable

  try:
    s_arg_i = draw_args.index("s")
  except:
    try:
      s_arg_i = draw_args.index("size")
    except:
      s_arg_i = -1
  if s_arg_i > -1:
    canvas_w = int(draw_args[s_arg_i + 1])
    canvas_h = int(draw_args[s_arg_i + 1])

  try:
    w_arg_i = draw_args.index("w")
  except:
    try:
      w_arg_i = draw_args.index("width")
    except:
      w_arg_i = -1
  if w_arg_i > -1:
    canvas_w = int(draw_args[w_arg_i + 1])

  try:
    h_arg_i = draw_args.index("h")
  except:
    try:
      h_arg_i = draw_args.index("height")
    except:
      h_arg_i = -1
  if h_arg_i > -1:
    canvas_h = int(draw_args[h_arg_i + 1])

  canvas_h_1_3rd = math.floor(canvas_h / 3)
  canvas_h_2_3rd = canvas_h_1_3rd * 2
  canvas_h_1_9th = math.floor(canvas_h / 9)

  canvas_w_1_3rd = math.floor(canvas_w / 3)
  canvas_w_2_3rd = canvas_w_1_3rd * 2
  canvas_w_1_9th = math.floor(canvas_w / 9)

  # create canvas
  my_canvas = tkinter.Canvas(root, bg="black", height=canvas_h, width=canvas_w)

  # umbrella
  coord = canvas_w_1_3rd, canvas_h_1_3rd, canvas_w_2_3rd, canvas_h_2_3rd

  umb_offset = 22.5
  umb_segments = 8
  umb_extent = math.floor(360 / umb_segments)

  umb_width = 10
  umb_outline = "black"
  umb_fill = ["white","red"]

  if "pride" in draw_args:
    umb_outline = "white"
    umb_fill = ["red","orange","yellow","green","blue","indigo","violet","brown"]

  for i in range(umb_segments):
    my_canvas.create_arc(
      coord,
      start = i * umb_extent + umb_offset,
      extent = umb_extent,
      fill = umb_fill[ i % len(umb_fill) ],
      outline = umb_outline,
      width = umb_width
    )

  # edge overlay

  corner_move = canvas_w_1_9th + math.floor(umb_width / 2)
  cornoff = corner_move

  cardinal_move = math.floor(canvas_w_1_9th / 4)
  cardoff = cardinal_move

  out_coords = [
    [ canvas_w_1_3rd, canvas_h_2_3rd-cardoff, canvas_w_2_3rd, canvas_h-cardoff ], # bot mid
    [ canvas_w_2_3rd-cornoff, canvas_h_2_3rd-cornoff, canvas_w-cornoff, canvas_h-cornoff ], # bot right
    [ canvas_w_2_3rd-cardoff, canvas_h_1_3rd, canvas_w-cardoff, canvas_h_2_3rd ], # mid right
    [ canvas_w_2_3rd-cornoff, 0+cornoff, canvas_w-cornoff, canvas_h_1_3rd+cornoff ], # top right
    [ canvas_w_1_3rd, 0+cardoff, canvas_w_2_3rd, canvas_h_1_3rd+cardoff ], # top mid
    [ 0+cornoff, 0+cornoff, canvas_w_1_3rd+cornoff, canvas_h_1_3rd+cornoff ], # top left
    [ 0+cardoff, canvas_h_1_3rd, canvas_w_1_3rd+cardoff, canvas_h_2_3rd ], # mid left
    [ 0+cornoff, canvas_h_2_3rd-cornoff, canvas_w_1_3rd+cornoff, canvas_h-cornoff ] # bot left
  ]

  edge_offset = 45
  edge_segments = 8
  edge_extent = 180

  edge_width = 0
  edge_outline = "black"
  edge_fill = "black"

  for i in range(edge_segments):

    my_canvas.create_arc(
      out_coords[i],
      start = i * edge_offset,
      extent = edge_extent,
      fill = edge_fill,
      outline = edge_outline,
      width = edge_width
    )

  # add to window and show
  my_canvas.pack()
  root.mainloop()

draw_umbrella( sys.argv )
