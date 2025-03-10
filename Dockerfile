FROM node

WORKDIR /app

COPY package.json /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]