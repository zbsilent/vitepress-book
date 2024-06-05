# DOCKER基础
[[toc]]



## docker命令

> [复制文件]()docker cp /Users/zbsilent/Developer/TestSSH d255a2c8c987:home

## mysql安装



1. 下载

```shell
docker pull mysql:5.7   # 拉取 mysql 5.7
docker pull mysql       # 拉取最新版mysql镜像
```

2. 检查是否拉取成功

```shell
sudo docker images
```

3. 一般来说数据库容器不需要建立目录映射

```shell
sudo docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```

- –name：容器名，此处命名为`mysql`
- -e：配置信息，此处配置mysql的root用户的登陆密码
- -p：端口映射，此处映射 主机3306端口 到 容器的3306端口
- -d：后台运行容器，保证在退出终端后容器继续运行

4. 如果要建立目录映射

```shell
duso docker run -p 3306:3306 --name mysql \
-v /usr/local/docker/mysql/conf:/etc/mysql \
-v /usr/local/docker/mysql/logs:/var/log/mysql \
-v /usr/local/docker/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql:5.7
```

- -v：主机和容器的目录映射关系，":"前为主机目录，之后为容器目录

5. 检查容器是否正确运行

```shell
docker container ls
```

- 可以看到容器ID，容器的源镜像，启动命令，创建时间，状态，端口映射信息，容器名字

6. 连接mysql

1. 进入docker本地连接mysql客户端

   ```shell
   sudo docker exec -it mysql bash
   mysql -uroot -p123456
   ```

2. 使用远程连接软件时要注意一个问题

   我们在创建容器的时候已经将容器的3306端口和主机的3306端口映射到一起，所以我们应该访问：

   ```
   host: 127.0.0.1
   port: 3306
   user: root
   password: 123456
   ```

3. 如果你的容器运行正常，但是无法访问到MySQL，一般有以下几个可能的原因：

   - 防火墙阻拦

     ```shell
     # 开放端口：
     $ systemctl status firewalld
     $ firewall-cmd  --zone=public --add-port=3306/tcp -permanent
     $ firewall-cmd  --reload
     # 关闭防火墙：
     $ sudo systemctl stop firewalld
     ```

   - 需要进入docker本地客户端设置远程访问账号

     ```shell
     $ sudo docker exec -it mysql bash
     $ mysql -uroot -p123456
     mysql> grant all privileges on *.* to root@'%' identified by "password";
     ```

     原理：

     ```shell
     # mysql使用mysql数据库中的user表来管理权限，修改user表就可以修改权限（只有root账号可以修改）
     
     mysql> use mysql;
     Database changed
     
     mysql> select host,user,password from user;
     +--------------+------+-------------------------------------------+
     | host                    | user      | password                                                                 |
     +--------------+------+-------------------------------------------+
     | localhost              | root     | *A731AEBFB621E354CD41BAF207D884A609E81F5E      |
     | 192.168.1.1            | root     | *A731AEBFB621E354CD41BAF207D884A609E81F5E      |
     +--------------+------+-------------------------------------------+
     2 rows in set (0.00 sec)
     
     mysql> grant all privileges  on *.* to root@'%' identified by "password";
     Query OK, 0 rows affected (0.00 sec)
     
     mysql> flush privileges;
     Query OK, 0 rows affected (0.00 sec)
     
     mysql> select host,user,password from user;
     +--------------+------+-------------------------------------------+
     | host                    | user      | password                                                                 |
     +--------------+------+-------------------------------------------+
     | localhost              | root      | *A731AEBFB621E354CD41BAF207D884A609E81F5E     |
     | 192.168.1.1            | root      | *A731AEBFB621E354CD41BAF207D884A609E81F5E     |
     | %                       | root      | *A731AEBFB621E354CD41BAF207D884A609E81F5E     |
     +--------------+------+-------------------------------------------+
     3 rows in set (0.00 sec)
     ```

### dockerfile
```xml

#build ssh images
#
#VERSION        1.0
FROM ubuntu:latest
RUN apt-get update
RUN adduser -disabled-password zbsilent 
# 开始安装
RUN apt-get -y install nodejs && \
apt-get -y install npm  
# 切换淘宝镜像
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org 
# 安装VIM 
RUN apt-get -y install vim
# 安装VUE
RUN cnpm install vue && \
cnpm install -g @vue/cli  
# 安装ssh
RUN apt-get install -y openssh-server
RUN echo 'root:root' | chpasswd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config
# SSH login fix. Otherwise user is kicked off after login
RUN sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config

RUN mkdir /var/run/sshd
#EXPOSE 映射端口
EXPOSE 22
# zsh
RUN apt-get update && apt-get install -y \
    zsh \
    git-core && rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
    && chsh -s /bin/zsh
# RUN mkdir /home/vue3
# WORKDIR /home/vue3
# RUN vue create vue3-pro
#Start ssh Service
CMD ["/usr/sbin/sshd", "-D"]

```



# MACBOOK PRO13 INSIDE

#### [DOCKER]()

[1. 镜像设置地址](https://www.cnblogs.com/evan-liang/p/12233904.html)

[2. 安装注意事项-基于本机docker]()

> docker run --name oracle -d -p 8080:8080 -p 1521:1521 -v /Users/zbsilent/OpenSources/oracle/data:/u01/app/oracle abhyuni/oracle-11g-r2



> docker run -h oracle --name oracle -d -p 49160:22 -p 49161:1521 -p 49162:8080 deepdiver/docker-oracle-xe-11g



docker run -p 1521:1521 --name oracle_11g -d --restart=always registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g

--platform linux/amd64
