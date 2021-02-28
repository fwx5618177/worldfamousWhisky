#!/bin/bash
# 开启pm2
pm2 list
echo "关闭..."
pm2 start app.js
nginx -s reload
