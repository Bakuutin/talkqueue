FROM node:10 as base

WORKDIR /usr/local/app
COPY ./frontend/package.json /usr/local/app/package.json
COPY ./frontend/package-lock.json /usr/local/app/package-lock.json
RUN npm ci
COPY ./frontend /usr/local/app
RUN npm run build
CMD ["npm", "run", "watch"]


FROM alpine
COPY --from=base /usr/local/app/dist /static
RUN mkdir -p /usr/local/app/dist
CMD [ "mv", "/static/*", "/usr/local/app/dist/" ]
