FROM node:latest

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN yarn 

CMD ["yarn", "start:dev"]

EXPOSE 3000