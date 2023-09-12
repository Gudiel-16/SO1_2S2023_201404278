FROM golang

WORKDIR /back_container

COPY . .

RUN go mod download

EXPOSE 5000

CMD ["go", "run", "main.go"]