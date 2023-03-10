// ? used docker file to upload on gcp

FROM node:17-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY . . 
CMD ["npm", "start"]

