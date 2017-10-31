
#FROM arm64v8/python
FROM armhf/python:2.7-alpine

RUN pip install --upgrade youtube_dl && mkdir /download
WORKDIR /download
#ENTRYPOINT ["youtube-dl"]
#CMD ["--help"]

ENTRYPOINT []

#ADD https://github.com/openfaas/faas/releases/download/0.6.7/fwatchdog-arm64 /usr/bin
RUN apk --no-cache add curl \
 && curl -LS https://github.com/openfaas/faas/releases/download/0.6.7/fwatchdog-armhf > /usr/bin/fwatchdog \
 && chmod +x /usr/bin/fwatchdog
COPY entry.sh   .
RUN chmod +x entry.sh
ENV fprocess="./entry.sh"

CMD ["fwatchdog"]
