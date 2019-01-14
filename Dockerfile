###########################################################
#
# Dockerfile for harbourmaster
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Installs docker
RUN apk add --update --no-cache docker py-pip
RUN apk add bash bash-doc bash-completion
RUN pip install docker-compose
RUN apk --no-cache add curl
ADD https://storage.googleapis.com/kubernetes-release/release/v1.6.4/bin/linux/amd64/kubectl /usr/bin/kubectl
RUN chmod +x /usr/bin/kubectl

# Extra tools for native dependencies
# RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT 3000
# ENV TOKEN abc123
# ENV DEBUG DISABLE

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm start