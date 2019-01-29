FROM camaras
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node app.js
EXPOSE 80
RUN chmod +x /startscript.sh
