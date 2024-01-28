#!/bin/bash

if [ -z $npm_config_run_ci ]; then
  # npm run setup
  node index.js
  exit $?
fi 
