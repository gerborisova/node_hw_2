FROM nikolaik/python-nodejs
RUN apt-get update && apt-get install -y postgresql-client

EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/
COPY package-lock.json /home/app/
COPY src /home/app/
COPY wait-for-postgres.sh /home/app/
RUN npm ci

COPY . /home/app

RUN npm run build

RUN ["chmod", "777", "wait-for-postgres.sh"]
