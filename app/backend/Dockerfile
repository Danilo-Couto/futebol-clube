FROM node:16-alpine

WORKDIR /app

COPY package*.json ./ 
#./ === ./app 

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"] //  é substituível via execucacao no terminal
