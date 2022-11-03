ARG ARCH=
FROM ${ARCH}node:16.14.0-buster AS build
WORKDIR /app
ENV DOCKER=YES NODE_ENV=production
ADD . .
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends build-essential && \
    npm install --production=false && \
    npm run build && \
    npm install -g --unsafe-perm --production

FROM ${ARCH}node:16.14.0-buster-slim
WORKDIR /app
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        make \
        gcc \
        g++ \
        pkg-config \
        pcscd \
        libpcsclite-dev \
        libccid \
        libdvbv5-dev \
        pcsc-tools \
        dvb-tools \
        && \
# recfriio (for HDUS)
    apt-get install -y --no-install-recommends \
#        make \
        git \
        build-essential \
        libglib2.0-dev \
        libusb-dev \
#        pcscd \
#        libpcsclite-dev \
#        libccid \
        libboost-dev \
        libboost-thread-dev \
        libboost-system-dev \
        libboost-filesystem-dev \
        && \
    git clone https://github.com/yngt78/recfriio.git && \
    cd ./recfriio/recfriior5/ && \
    make && \
    make install && \
    cd ../../ && \
    rm -rf ./recfriio &&\
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
COPY --from=build /usr/local/lib/node_modules/mirakurun /app
CMD ["./docker/container-init.sh"]
EXPOSE 40772 9229
