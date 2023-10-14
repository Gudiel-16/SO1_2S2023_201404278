FROM golang:1.20-alpine3.17

WORKDIR /app/src

ENV GOPATH=/app

COPY . /app/src

RUN go build -o Server .

EXPOSE 50051

CMD ["./Server"]