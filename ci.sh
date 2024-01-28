#!/bin/bash
# --only=prod OR --production
# ? --no-optional=false 
# --ignore-scripts makes puppeteer to rebuild
npm ci --progress=false --no-audit --prefer-offline --run_ci=1 || exit $?
