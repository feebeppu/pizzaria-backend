FROM node:latest

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN yarn install --production

CMD ["node", "dist/src/main.js"]

EXPOSE 3000