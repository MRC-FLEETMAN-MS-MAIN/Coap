FROM node:10
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app/package.json
RUN npm install
COPY .  /src/app
EXPOSE 3002 5683 6793
CMD ["npm", "start"]