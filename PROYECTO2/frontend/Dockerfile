FROM node:18.18.0 as compilacion

LABEL name="gudiel" \
    email="gudiel.lv16@gmail.com"

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build

FROM nginx:1.25.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=compilacion /opt/app/dist /usr/share/nginx/html

EXPOSE 80