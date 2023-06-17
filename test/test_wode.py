# standard modules

import os
import time
import sys
import unittest

sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/../src")

from wode import word

# test case

# https://docs.python.org/3/library/unittest.html

class TestWodeMethods(unittest.TestCase):

  def setUp(self):

    self.valid_word = "Parafatalism"
    self.valid_defn = "Deterministic when convenient."
    self.correct_pair = (self.valid_word, self.valid_defn)
    self.year_of_seconds = 60 * 60 * 24 * 365 # ~31536000
    self.the_beginning = 0 # Universe begins on Thursday, January 1, 1970, at 12:00:00 AM UTC
    self.the_end = float("inf")

  def test_default(self):
    self.assertEqual(word(use_opted=False), self.correct_pair)

  def test_current(self):
    self.assertEqual(word(time.time(),use_opted=False), self.correct_pair)

  def test_future(self):
    future_time = time.time() + self.year_of_seconds
    self.assertEqual(word(future_time,use_opted=False), self.correct_pair)

  def test_past(self):
    past_time = time.time() + self.year_of_seconds
    self.assertEqual(word(past_time,use_opted=False), self.correct_pair)

  def test_beginning(self):
    self.assertEqual(word(self.the_beginning,use_opted=False), self.correct_pair)

  def test_end(self):
    self.assertEqual(word(self.the_end,use_opted=False), self.correct_pair)

if __name__ == '__main__':
  unittest.main()

