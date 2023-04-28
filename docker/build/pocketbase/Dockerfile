FROM golang:1.20-alpine

WORKDIR /usr/src/app

COPY ./pocketbase/go.mod ./pocketbase/go.sum ./
RUN go mod download && go mod verify

COPY ./pocketbase .
RUN CGO_ENABLED=0 GOOS=linux go build -o /pocketbase github.com/RankyList/ranky-list

EXPOSE 8090

CMD ["/pocketbase", "serve"]