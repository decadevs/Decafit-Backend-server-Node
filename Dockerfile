FROM node:14-alpine AS compilation
WORKDIR /temp/compilation

COPY . .

RUN yarn
RUN yarn tsc

FROM node:14-alpine AS build

WORKDIR /temp/build

COPY . .

RUN yarn --production

FROM node:14-alpine AS production

ENV NODE_ENV production

WORKDIR /app


COPY --from=compilation /temp/compilation/dist dist
COPY --from=build /temp/build/node_modules node_modules

COPY bin bin
COPY public public
COPY views views
COPY package.json package.json

EXPOSE 3000

CMD ["yarn", "start"]

