## Serverless YouTube GIF maker


### Instructions:

Get OpenFaaS with instructions @ https://github.com/alexellis/faas/blob/master/guide/deployment_swarm.md

```
~ $ sudo yum update -y
~ $ sudo yum install -y docker
~ $ sudo service docker start
~ $ sudo usermod -a -G docker ec2-user
```

```
# Log out and log back in
~ $ git clone https://github.com/openfaas/faas
~ $ cd faas
~/faas $ ./build.sh
~/faas $ ./deploy_stack.sh
```

```
# Install faas-cli
~ $ curl -sSL https://cli.openfaas.com | sudo sh
~ $ faas-cli version
```

```
# Deploy the tg-youtubegif function
~ $ # Change directory back to tg-youtubegif/
~ $ cd tg-youtubegif
~/tg-youtubegif $ faas-cli deploy -f tg-youtubegif.yml
```


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
