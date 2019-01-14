[![Build Status](https://travis-ci.org/prem0132/harbourmaster.svg?branch=master)](https://travis-ci.org/prem0132/harbourmaster)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Coverage Status](https://coveralls.io/repos/github/prem0132/harbourmaster/badge.svg)](https://coveralls.io/github/prem0132/harbourmaster)
[![Code Climate](https://codeclimate.com/github/prem0132/harbourmaster/badges/gpa.svg)](https://codeclimate.com/github/prem0132/harbourmaster)

# harbourmaster

Automatic [docker](https://www.docker.com) deployment with [webhooks](https://docs.docker.com/docker-hub/webhooks/).

harbourmaster listens to incoming HTTP POST-requests from hub.docker.com and triggers your specified script(s).

## Features

* Lightweight
* Pretty simple setup process
* Can be runned in a docker container
* Supports updating multiple docker images
* Scripts can trigger docker or docker-compose
* Used in production
* Good logging

# Create a token
Create a secret token with ``openssl``, ``uuidgen`` or something else. Don't use any slashes since token is going to be used in the URL.

```sh
export TOKEN=$(uuidgen)
echo $TOKEN
```

# Installation alternatives

## 1. Run on host

### Install

Nodejs and npm must be installed.

```sh
git clone http://github.com/prem0132/harbourmaster
cd harbourmaster
npm i
```

### Edit config

See [config.js](config.js)

```sh
vim config.js
```

### Configure repos and scripts

See [scripts/index.js](scripts/index.js)

```sh
vim scripts/index.js
```

Use this format:
`'repo/image[:tag]': 'script.sh [parameter1 parameter2]',`

tag and parameters are optional.

Remember to `chmod +x script.sh`

### Start harbourmaster
```sh
npm start
```

## 2. Run with docker-compose

Git clone
```sh
git clone http://github.com/prem0132/harbourmaster
```

Add secret token in docker.env with
```sh
vim docker.env
```

Start with
```sh
docker-compose up -d
```

## 3. Run from docker hub

Git clone
```sh
git clone http://github.com/prem0132/harbourmaster
```

Start with
```sh
docker run -d \
  -p 3000:3000 \
  -e TOKEN=${token} \
  -v ${PWD}/scripts:/src/scripts \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name harbourmaster \
  prem0132/harbourmaster
```

# Configuration on docker hub

Go to https://hub.docker.com/ -> your repo -> Webhooks

Add a webhook like on the following image.

![alt tag](https://i.imgur.com/DcAAA8G.png)

Replace ``example.com`` with the domain of your server or it's ip address.

Replace ``abc123`` with your secret token.

docker-hook listens to port 3000 by default.

# Testing on local machine

Setup the development environment

```sh
git clone https://github.com/prem0132/harbourmaster/
cd harbourmaster
npm i
npm run dev
```

Run test with ```curl```

```sh
curl -i -d @test/data/payload.json http://localhost:3000/$TOKEN
```
