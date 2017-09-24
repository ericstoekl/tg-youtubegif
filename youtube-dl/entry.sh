#!/bin/sh

nano=`date +%s%N`

while read line
do
  echo "$line"
done < "${1:-/dev/stdin}"

youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4' $line --no-warnings --quiet -o $nano.mp4
cat $nano.mp4 > /dev/stdout \
  && rm $nano.mp4
