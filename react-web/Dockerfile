FROM node:20.9.0

# Create the cache dir.
RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache

# Install dependencies into the cache directory. They will be copied
# to the app directory in entrypoint.sh. Direct installation to the app
# directory is avoided to prevent obscuring when the volume is mounted.
COPY package*.json yarn.lock ./
RUN yarn install

# Create the app directory. The project dir on the host will be mounted here.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# The app will be started from the entrypoint.sh script in the compose file.
