## Serverless YouTube GIF maker


### Instructions:

Get OpenFaaS with instructions @ https://github.com/alexellis/faas/blob/master/guide/deployment_swarm.md

Deploy the `tg-youtubegif` function:

```
$ faas-cli --deploy -f tg-youtubegif.yml
```

Now try it out:

```
$ curl localhost:8080/function/youtube-dl \
-d "https://www.youtube.com/watch?v=NtgtMQwr3Ko"  \
| curl -X POST localhost:8080/function/gif-maker --data-binary @- > yt.gif
```

Your gif will be in the "yt.gif" file. Enjoy
