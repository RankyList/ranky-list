FROM golang:1.22-alpine

WORKDIR /usr/src/app

COPY ./pocketbase/go.mod ./pocketbase/go.sum ./

RUN go mod download && \
    go mod verify && \
    go install github.com/bokwoon95/wgo@latest

EXPOSE 8090
