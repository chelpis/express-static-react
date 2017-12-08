FROM node:carbon

WORKDIR /express

COPY package*.json ./

RUN npx yarn install

# Bundle app source
COPY . .

EXPOSE 80
EXPOSE 443
CMD [ "npm", "start" ]
