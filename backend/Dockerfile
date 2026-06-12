# using node 18 alpine as base - lightweight and fast
FROM node:18-alpine

# set working directory inside container
WORKDIR /app

# copy package files first - docker caches this layer
# so npm install only reruns when dependencies change
COPY package*.json ./

# install dependencies
RUN npm install --production

# copy rest of the source code
COPY . .

# expose the port our app runs on
EXPOSE 5000

# start the server
CMD ["node", "index.js"]