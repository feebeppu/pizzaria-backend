FROM node:latest as base

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

FROM node:latest as build

WORKDIR /usr/src/app

COPY package*.json yarn.lock tsconfig.json ./

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .

RUN yarn build

ENV NODE_ENV production

RUN yarn install --production=true --frozen-lockfile && yarn cache clean

FROM node:latest as production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3001

ENTRYPOINT ["node", "dist/src/main.js"]