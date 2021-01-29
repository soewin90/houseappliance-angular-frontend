# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Start 2
RUN rm -rf /usr/share/nginx/html/*

# Stage 3
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/house-appliance-frontend /usr/share/nginx/html