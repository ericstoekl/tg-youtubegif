FROM alpine:3.6

RUN apk --no-cache add ffmpeg gifsicle curl \
   && curl -LS https://github.com/openfaas/faas/releases/download/0.6.7/fwatchdog-armhf > /usr/bin/fwatchdog \
   && chmod +x /usr/bin/fwatchdog \
   && apk del curl
WORKDIR /root/
COPY entry.sh   .
ENV fprocess="sh ./entry.sh"
CMD ["fwatchdog"]
