FROM node

WORKDIR /app/auth

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]