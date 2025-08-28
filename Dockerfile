FROM node:alpine AS build
WORKDIR /app

COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build:production

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/frontend/browser ./
EXPOSE 80