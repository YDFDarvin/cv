#!/bin/bash

git-hooks-wrapper init; git config include.path ../.gitconfig
exit $?
