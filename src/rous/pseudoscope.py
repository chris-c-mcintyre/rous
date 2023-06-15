# pseudoscope.py

# builds fake dynamic globally-scoped modules and/or functions that can be applied to any existing module / function / variable / structure

# serves as an overly elaborate wrapper, to be used as part of other modules for dynamically introducing a simple but powerful ux

"""

import pseudoscope

def demo_function(arg_1, arg_2):
  return arg_1 ** arg_2

my_scope = "exclaim"

def scoped_return( fn_output ):
  print( str(fn_output) + "!!!" )

def scoped_call( fn_input ):
  print( str(fn_input) + "???" )

def scoped_list_fn( input_str ):
  print( input_str.upper() + "!!!" )

pseudoscope(
  my_scope,
  {
    "function": {
      "return": my_return
    },
    "module": {
      "function": {
        "call": my_call,
        "return": my_return
      }
    },
    "string": {
      "function": scoped_list_fn
    }
  }
)

exclaim.demo_function(5, 3)

> 125!!!

exclaim.math.ceil(math.pi)

> 3.141592653589793???
> 4!!!

"hello world".exclaim()

> "HELLO WORLD!!!"

"""
