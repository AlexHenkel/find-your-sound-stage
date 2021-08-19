FROM node:14.9.0-alpine

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps alpine-sdk python gcc

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build \
  && apk del .build-deps

EXPOSE 4000

CMD [ "yarn",  "start" ]
