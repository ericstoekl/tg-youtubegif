## Serverless YouTube GIF maker

Live Preview - Jedi Kittens: https://twitter.com/alexellisuk/status/911290757314744322

### Instructions:

Get OpenFaaS with instructions @ https://github.com/alexellis/faas/blob/master/guide/deployment_swarm.md

Edit docker-compose.yml:

```
$ git diff docker-compose.yml 
diff --git a/docker-compose.yml b/docker-compose.yml
index 9d91cff..cfcde24 100644
--- a/docker-compose.yml
+++ b/docker-compose.yml
@@ -10,6 +10,8 @@ services:
             - functions
         environment:
             dnsrr: "true"  # Temporarily use dnsrr in place of VIP while issue persists on PWD
+            read_timeout: 65    # seconds
+            write_timeout: 65   # seconds
         deploy:
             placement:
                 constraints:
```

Then re-deploy:

```
./deploy_stack.sh
```

And deploy the functions:

```
$ faas-cli deploy --image ems5311/youtube-dl:latest --name youtube-dl --fprocess "sh ./entry.sh"
$ faas-cli deploy --image ems5311/gif-maker:latest  --name gif-maker  --fprocess "./entry.sh"
```

Now try it out:

```
$ curl localhost:8080/function/youtubedl \
-d "https://www.youtube.com/watch?v=NtgtMQwr3Ko"  \
| curl -X POST localhost:8080/function/gif-maker --data-binary @- > yt.gif
```

Your gif will be in the "yt.gif" file. Enjoy
