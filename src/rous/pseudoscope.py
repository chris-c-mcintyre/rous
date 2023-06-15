# pseudoscope.py

# builds fake dynamic globally-scoped modules and/or functions that can be applied to any existing module / function / variable / structure

# serves as an overly elaborate wrapper, to be used as part of other modules for dynamically introducing a simple but powerful ux

"""

import pseudoscope

def demo_function(arg_1, arg_2):
  return arg_1 ** arg_2

my_scope = "exclaim"

def exclaim_fn_return( fn_output ):
  print( str(fn_output) + "!!!" )

def exclaim_fn_call( fn_input ):
  print( str(fn_input) + "???" )

def exclaim_list_fn( input_str ):
  print( input_str.upper() + "!!!" )

pseudoscope(
  my_scope,
  {
    "function": {
      "return": exclaim_fn_return
    },
    "module": {
      "function": {
        "call": exclaim_fn_call,
        "return": exclaim_fn_return
      }
    },
    "string": {
      "function": exclaim_list_fn
    }
  }
)

demo_function(5, 3)

> 125

exclaim.demo_function(5, 3)

> 125!!!

exclaim.math.ceil(math.pi)

> 3.141592653589793???
> 4!!!

"hello world".exclaim()

> "HELLO WORLD!!!"

"""
