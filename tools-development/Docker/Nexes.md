# 搭建私有Maven仓库



# 获取镜像

```shell
docker pull sonatype/nexus3:latest

docker run -d --restart=always -p 8081:8081 --name nexus sonatype/nexus3

```



