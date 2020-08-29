FROM cypress/browsers:chrome69
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
COPY cypress*.json /usr/src/app/
RUN npm install
COPY cypress /usr/src/app/cypress/
RUN ./node_modules/.bin/cypress verify