FROM node:alpine

WORKDIR /app
COPY eventsmgmt-api/package.json ./
RUN npm install
COPY eventsmgmt-api/ ./

CMD ["npm","start"]