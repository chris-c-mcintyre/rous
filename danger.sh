#!/bin/sh

# don't run this, dummy.

sleep 5 && xdg-open http://localhost:3125 &

python -m http.server 3125
