#!/bin/sh
set -x
docker rm -f simplevote
docker run --name simplevote -p 8080:80 -v $PWD/:/usr/share/nginx/html:ro -d nginx:alpine
set +x
echo "Go to http://localhost:8080"