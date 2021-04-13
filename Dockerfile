# node-sass 4.14.1 requires node version <= 14 for Alpine Linux
# See: https://github.com/sass/node-sass/releases/tag/v4.14.1
FROM node:14.16.1-alpine3.10 AS build-stage

WORKDIR /app

# YARN REQUIRES GIT BINARY
RUN apk add git

# COPY PACKAGE MANAGEMENT FILES + DEPENDENCIES
COPY geppetto-showcase/package*.json geppetto-showcase/
COPY geppetto-showcase/yarn.lock geppetto-showcase/
COPY geppetto.js geppetto.js

# INSTALL PACKAGES
WORKDIR geppetto-showcase
RUN yarn

# COPY SOURCE CODE
COPY geppetto-showcase .

# BUILD
RUN npm run build

####################################################################

FROM nginx:alpine
COPY --from=build-stage /app/geppetto-showcase/dist/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY geppetto-showcase/nginx/nginx.conf /etc/nginx/conf.d
