FROM node:14.19.1-slim
WORKDIR /app
COPY ./ .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]