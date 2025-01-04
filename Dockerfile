FROM node:20.17 as node
WORKDIR /app
COPY . .
RUN npm install
run npm run build

FROM httpd:2.4
COPY --from=node /app/dist/phones_crud/browser/ /usr/local/apache2/htdocs/
