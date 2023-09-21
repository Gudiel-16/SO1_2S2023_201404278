FROM node:18.18.0

WORKDIR /back_container

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE 5001

CMD [ "npm", "start" ] 
