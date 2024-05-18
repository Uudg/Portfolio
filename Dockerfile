FROM node:21-alpine

WORKDIR /frontend/

COPY public/ / /frontend/public/
COPY src/ / /frontend/src/
COPY package.json /frontend/

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]