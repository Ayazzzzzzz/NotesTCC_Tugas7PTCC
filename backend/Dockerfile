FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
RUN cat .env
CMD ["node", "index.js"]
