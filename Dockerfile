FROM node:alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . ./
ENV npm_config_env=production
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80