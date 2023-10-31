FROM node:18.18.0

WORKDIR /back_container

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5003

CMD [ "npm", "start" ] 
