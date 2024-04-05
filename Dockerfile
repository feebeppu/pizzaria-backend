FROM node:latest

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN yarn install --production

CMD ["yarn", "start:dev"]

EXPOSE 3000