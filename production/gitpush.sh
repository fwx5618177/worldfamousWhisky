#!/bin/bash
git status
read -p "输入commit信息：" info
git add .
git commit -am "$info"
sleep 8
#git pull origin master --rebase
git push origin master

