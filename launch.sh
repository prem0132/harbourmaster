#!/bin/bash

docker run -d \
  --restart always \
  -p 3000:3000 \
  -e SERVER_PORT=3000 \
  -e TOKEN=abc123 \
  -e ROUTE=/api \
  -v ${PWD}/scripts:/src/scripts \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name harbourmaster \
  premhashmap/harbourmaster:latest 

