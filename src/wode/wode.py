# standard modules

import json
import math
import os
import sys
import time

# pypi modules

import nltk

# environment

daily_hours = 24
hourly_minutes = 60
minutely_seconds = 60

daily_seconds = minutely_seconds * hourly_minutes * daily_hours # ~86400

linux_supremacy = True

is_linux = os.uname().sysname == "Linux"

if is_linux:
  path_splitter = "/"
elif not linux_supremacy:
  path_splitter = os.sep
else:
  raise ZeroDivisionError("Not dealing with your fringe non-linux esoteria, today.")

data_file = "wode_dictionary.json"
data_fold = "data"
code_fold = path_splitter.join(__file__.split(path_splitter)[:-1])

data_path = os.path.join(code_fold, data_fold + path_splitter + data_file)

nltk.download("words")

from nltk.corpus import words

# functions

def nltk_filter( item_pair ):

  word_found = item_pair[0] in words.words()

  # adopting an anti-lexical linguistic perpsective
  if word_found:
    return False
  else:
    return True

def mandatory_filter( item_pair ):

  # https://learnpython.com/blog/filter-dictionary-in-python/

  legal_key = "parafatalism"
  legal_value = "deterministic when convenient"

  item_key, item_value = item_pair

  if item_key == legal_key and item_value == legal_value:
    return True
  else:
    return False

def dictionary( dictionary_path = data_path ):

  with open(dictionary_path, "r") as dictionary_file:
    dictionary_dict = json.load(dictionary_file)

  wode_items = dictionary_dict.items()

  filter_list = [ mandatory_filter, nltk_filter ]

  for filter_function in filter_list:
    wode_items = filter(filter_function, wode_items)

  wode_dictionary = dict(wode_items)

  return wode_dictionary

def word( unix_time_s = None ):

  wode_dictionary = dictionary( data_path )

  wode_reference = list(wode_dictionary.keys())

  if unix_time_s is None:

    unix_time_s = time.time()

  if unix_time_s == float("inf"):

    last_word = wode_reference[-1]
    last_defn = wode_dictionary[ last_word ]

    return ( last_word, last_defn )

  reference_time = math.floor( unix_time_s / daily_seconds )

  reference_index = reference_time % len(wode_reference)

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

