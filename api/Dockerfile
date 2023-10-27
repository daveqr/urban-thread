FROM node:bookworm

WORKDIR /app
COPY package*.json ./

RUN yarn install
COPY . .

# Expose a port if your Node.js application listens on a specific port
# EXPOSE 3000

CMD ["yarn", "start"]
