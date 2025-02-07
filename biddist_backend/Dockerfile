FROM ubuntu:latest
LABEL authors="arielcann"
FROM node AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:lts-bookworm-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["npm", "run", "production"]