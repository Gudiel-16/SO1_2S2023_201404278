FROM golang

WORKDIR /back_container

COPY . .

RUN go mod download

RUN apt-get update

RUN apt-get install -y stress

EXPOSE 5000

CMD ["go", "run", "main.go"]