# build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . . 

RUN yarn build

#prod stage

FROM node:18-alpine 

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app/dist ./dist

COPY package*.json ./

RUN yarn --only=production

RUN rm package*.json

EXPOSE 3000

CMD ["yarn", "start:dev"]