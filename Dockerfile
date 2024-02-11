# syntax=docker/dockerfile:1
FROM node:current-alpine

ENV APP_PATH=/usr/app001/app

WORKDIR $APP_PATH

ONBUILD RUN echo ★★★★★

# RUN apk update \
#  && apk add curl

# RUN cp /app/package.json . \
# && npm install

# COPY app/package*.json ./
# RUN npm install
# COPY . .


# RUN ls ./
# RUN echo xxxxxxxxxxxxxx
# RUN pwd
# RUN cd $APP_PATH \
#  && sh -c "npm install"

# FROM node
# WORKDIR /app
# RUN yarn install
CMD ["npm install"]