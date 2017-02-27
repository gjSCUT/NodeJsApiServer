#!/bin/bash
port=${PORT:-27017}
HTTP_CODE=`curl -o /dev/null -s -w "%{http_code}" "http://127.0.0.1:${port}"`
printf $HTTP_CODE
echo "Waiting for startup.."

until [ ${HTTP_CODE} -eq "200" ]
do
  HTTP_CODE=`curl -o /dev/null -s -w "%{http_code}" "http://127.0.0.1"`
  printf $HTTP_CODE
  sleep 1
done

echo "Started.."
exec pm2-docker --watch ../server/server.js

