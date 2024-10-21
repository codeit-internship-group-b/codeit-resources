#!/bin/bash
cd /home/ubuntu/build
pm2 start ../apps/api/src/index.js
