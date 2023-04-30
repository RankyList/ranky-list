FROM golang:1.20-alpine

RUN wget -O- -nv https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.52.2

WORKDIR /usr/src/app

COPY ./pocketbase/go.mod ./pocketbase/go.sum ./
RUN go mod download && go mod verify

COPY ./pocketbase .

CMD ["golangci-lint", "run", "--disable-all", "-E govet", "-v"]
