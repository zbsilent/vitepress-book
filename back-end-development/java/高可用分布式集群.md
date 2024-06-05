# 高可用分布式集群篇



[kubernetes](https://kubernetes.io/zh/docs/home/)

_reference:_Kubernetes 是一个可移植的、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化。 Kubernetes 拥有一个庞大且快速增长的生态系统。Kubernetes 的服务、支持和工具广泛可用。

**Kubernetes** 这个名字源于希腊语，意为“舵手”或“飞行员”。k8s 这个缩写是因为 k 和 s 之间有八个字符的关系。 Google 在 2014 年开源了 Kubernetes 项目。Kubernetes 建立在 [Google 在大规模运行生产工作负载方面拥有十几年的经验](https://research.google/pubs/pub43438) 的基础上，结合了社区中最好的想法和实践。

[kubernetes基础知识](https://kubernetes.io/zh/docs/tutorials/kubernetes-basics/)

### Install

```bash
brew install kubectl 
```

> 安装路径 /usr/local/bin/kubectl

```bash
kubectl version --client
```

### 架构

#### mater节点

##### apiserver

1. 暴露K8s的api接口，是外界进行资源操作的唯一入口 

##### etcd

1. 高一致性，高可用的键值数据库，可以保存kubernetes的所有集团和后台数据

##### scheduler

1. 主节点上的组件，监视哪些新创建的未指定运行的节点

##### controller-manager

1. 调度不同控制器



container 容器，可以说docker启动的一个容器

kubelet 工作组 代理

pod 是k8s中的最小部署单元

volume pod容器中可以访问的目录

controllers 更高层次的对象，部署和管理pod

deployment 部署操作

service 定义一个pod的访问策略 组合一些pod  部署到节点

Lable 标签，用于对象的资源的查询，筛选 

namespace 命民空间，逻辑隔离 每个资源都属于一个namespace，同一个namespace里的lable不允许重复

##### 创建节点

![image-20220322112732447](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220322112732447.png)

##### 部署流程



![image-20220322113336799](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220322113336799.png)

![image-20220322113405806](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220322113405806.png)

![image-20220322112931980](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220322112931980.png)

## 操作

![image-20220322113955964](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220322113955964.png)



> docker build -t dfc30428e163 /Users/zbsilent/Developer/2022PRO/docker

> docker run -itd --privileged -e "container=docker" --name centos7   -v /sys/fs/cgroup:/sys/fs/cgroup:ro -p 22:22 centos7 /usr/sbin/init



*docker run -d -p 22:22 --name mycentod --privileged=true centos /usr/sbin/init*

```
docker run --privileged -ti -e "container=docker" --name centos77 -v /sys/fs/cgroup:/sys/fs/cgroup -p 22:22 centos7 /usr/sbin/init
```



```shell
docker run -i -t -p 8080:80 ubuntu
```

1  apt-get install net-tools inetutils-ping openssh-server samba samba-common git vim curl

yum install -y openssl openssh-server net-tools inetutils-ping openssh-server samba samba-common git vim curl





/etc/init.d/ssh restart

remote-dev-server.sh run "/home/developer"