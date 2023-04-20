FROM golang:1.20-alpine

WORKDIR /usr/src/app

COPY ./pocketbase ./

RUN go mod download && \
go mod verify && \
wget -O- -nv https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.52.2

EXPOSE 8090

CMD [ "golangci-lint", "run" ]
