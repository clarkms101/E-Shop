FROM node:lts-alpine
RUN npm i -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm rebuild node-sass
RUN npm run build
EXPOSE 80
CMD ["http-server","dist"]