FROM node:12

# Create app directory (in the container)
WORKDIR /macarc/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 9000 9010

CMD [ "node", "dist/main" ]
