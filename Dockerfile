FROM node:12.18.4-alpine as base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install

FROM base as build
COPY . .
RUN npm run build-prod

FROM nginx:1.19.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/hands-on /usr/share/nginx/html
