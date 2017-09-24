## Serverless YouTube GIF maker


### Instructions:

Create an EC2 instance on AWS and run the following commands to set up OpenFaaS

```
# Setup Docker
~ $ sudo yum update -y
~ $ sudo yum install -y docker git
~ $ sudo service docker start
~ $ sudo usermod -a -G docker ec2-user
```

```
# Log out and log back in (You are using SSH, so cut the connection and re-connect)
```

```
# Deploy OpenFaaS on the EC2 instance
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
~ $ cd tg-youtubegif
~/tg-youtubegif $ faas-cli deploy -f tg-youtubegif.yml
```

### Try it out:

```
$ curl localhost:8080/function/youtube-dl \
-d "https://www.youtube.com/watch?v=NtgtMQwr3Ko"  \
| curl -X POST localhost:8080/function/gif-maker --data-binary @- > yt.gif
```

Your gif will be in the "yt.gif" file. Enjoy
