#!/bin/sh

cd dist
git init
gh auth setup-git
mv ./config ./.git/config
git remote add origin https://github.com/acyza/acyza.github.io.git
git add *
git commit -am "update"
git push origin HEAD:main --force