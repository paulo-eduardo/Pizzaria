# 1. Grab the latest node image
FROM node:latest as common
WORKDIR /api
ADD .env /api
EXPOSE ${PORT}
COPY package.json ./
RUN npm install
RUN npm install -g @adonisjs/cli
ADD . .
# RUN adonis migration:run
COPY . .

### STAGE 2: Dev ###
FROM node:latest as dev
COPY --from=common /api /api
WORKDIR /api
CMD ["adonis", "serve", "--dev"]

### STAGE 2: Deploy ###
FROM node:latest as deploy
COPY --from=common /api /api
WORKDIR /api
CMD ["npm", "start"]
