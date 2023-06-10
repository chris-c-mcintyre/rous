# standard modules

import math
import sys
import time

# environment

wode_dictionary = {
  "parafatalism": "deterministic when convenient"
}

wode_reference = list(wode_dictionary.keys())

# functions

def word( unix_time_s = None ):

  if unix_time_s is None:

    unix_time_s = time.time()

  reference_index = math.floor( unix_time_s % len(wode_reference) )

  wode_word = wode_reference[ reference_index ]

  wode_defn = wode_dictionary[ wode_word ]

  return ( wode_word, wode_defn )

# entrypoint

if __name__ == "__main__":

  if len(sys.argv) > 1:
    wode_arg = sys.argv[1]
  else:
    wode_arg = time.time()

  wode_ret = word( wode_arg )

  print( wode_ret )

