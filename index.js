#!/usr/bin/env node

const os = require('os')
, childProcess = require('child_process')
, file2open = process.env.npm_package_homepage

let cmd = `nohup xdg-open ${file2open} >/dev/null 2>&1 &`

switch (os.platform()) {
  case "win32":
  case "cygwin":
    cmd = `start "" ${file2open}`
    break
  case "darwin":
    cmd = `open ${file2open}`
    break
}

childProcess.execSync(cmd)
