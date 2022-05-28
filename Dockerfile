FROM node

RUN apt update -y
RUN apt install tzdata ntp ntpdate -y

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN echo "server 0.amazon.pool.ntp.org iburst" >> /etc/ntp.conf
RUN echo "server 1.amazon.pool.ntp.org iburst" >> /etc/ntp.conf
RUN echo "server 2.amazon.pool.ntp.org iburst" >> /etc/ntp.conf
RUN echo "server 3.amazon.pool.ntp.org iburst" >> /etc/ntp.conf

EXPOSE 3333

CMD ["npm", "run", "dev"]