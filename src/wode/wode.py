# standard modules

import json
import math
import os
import random
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

def get_definition( input_word, input_word_class = None, dictionary_path = "data/opted/opted.txt", banned_roots = ["fatal"] ):

  # Q: are these arbitrary magic values?
  # A: || there is only one valid suffix, and only one valid prefix ||
  pref_len = 4
  suff_len = 3

  input_word_suff = input_word[-suff_len:]

  dictionary_size = os.stat( dictionary_path ).st_size

  start_byte = random.randrange( 0, dictionary_size )

  with open(dictionary_path, "r") as dictionary_file:

    dictionary_file.seek( start_byte )

    # skip first line due to random point of entry
    dictionary_file.readline()

    final_definition = ""

    loop_breaker = 0

    while loop_breaker < dictionary_size:

      loop_breaker += 1

      current_line = dictionary_file.readline()

      if len(current_line) == 0:
        dictionary_file.seek( 0 )

      else:
        if current_line == "\n":
          continue

        current_word = current_line[ 0 : current_line.find("(") ].strip()

        if current_word[ pref_len : -suff_len ].lower() in banned_roots:
          continue

        if input_word_class:
          current_word_class = current_line[ current_line.find("(")+1 : current_line.find(")") ]
          if current_word_class != input_word_class:
            continue

        if current_word[-suff_len:] == input_word_suff:
          final_definition = current_line[current_line.find(")")+1:].strip()
          break

    return final_definition

def word( unix_time_s = None, use_opted = True ):

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

  if use_opted:
    wode_defn = get_definition( wode_word )
  else:
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

