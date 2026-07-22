FROM node:20-alpine

WORKDIR /app

ENV PORT=3000

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY . .

USER node

EXPOSE 3000

CMD ["npm", "start"]
