FROM node:7

MAINTAINER Yang Sixuan <812414023@qq.com>

COPY . /docker-node-express-boilerplate

WORKDIR /docker-node-express-boilerplate

# Global installation for server-runners
RUN npm install pm2@2.2.1 --global && \
    npm install --production

EXPOSE 3000
EXPOSE 3001
CMD ["pm2-docker", "./config/process.yml"]
