## Serverless YouTube GIF maker


### Instructions:

Create an EC2 instance using the [Ubuntu AMI](https://aws.amazon.com/marketplace/pp/B01JBL2M0O) on AWS. Make sure to have port 8080 open in the security group, as OpenFaaS listens on port 8080. Run the following commands to set up OpenFaaS:

```
# SSH into your machine:
$ ssh -i KeyPair.pem ubuntu@<your EC2 instance Public DNS>
```

```
# Setup Docker
~ $ sudo apt-get update
~ $ curl -sSL https://get.docker.com/ | sudo sh
~ $ sudo usermod -a -G docker ubuntu
```

```
# Log out and log back in (You are using SSH, so cut the connection and re-connect)
```

```
# Initialize docker swarm
~ $ docker swarm init
```

```
# Deploy OpenFaaS on the EC2 instance
~ $ git clone https://github.com/openfaas/faas
~ $ cd faas
~/faas $ ./deploy_stack.sh
```

```
# Install faas-cli
~ $ curl -sSL https://cli.openfaas.com | sudo sh
~ $ faas-cli version
```

```
# Deploy the tg-youtubegif function
~ $ git clone https://github.com/ericstoekl/tg-youtubegif
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
