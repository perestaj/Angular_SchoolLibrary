FROM node:alpine AS builder-stage

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=builder-stage /app/dist/angular-school-library /usr/share/nginx/html/
