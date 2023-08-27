FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
EXPOSE  5173

CMD ["npm", "run", "dev"]
