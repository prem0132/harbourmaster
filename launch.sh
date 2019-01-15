#!/bin/bash
docker rm -f $(docker ps -aq)

docker logs -f $(docker run -d \
  --restart always \
  -p 6000:3000 \
  -e SERVER_PORT=3000 \
  -e TOKEN=abc123 \
  -v ${PWD}/scripts:/src/scripts \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name harbourmaster \
  premhashmap/harbourmaster:latest )

