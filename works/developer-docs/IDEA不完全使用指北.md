# 使用idea插件开发常见问题解答

### 本文所指的idea插件是：[https://nccdev.yonyou.com/article/detail/630](javascript:void(0))

## 服务启动问题

### 情况1、项目结构不规范

未按照给出的说明规范创建整个的项目结构目录，具体参考 [https://nccdev.yonyou.com/article/detail/658](javascript:void(0)) 文章底下的附件内容创建。
整个项目结构如图所示：

![img.png](https://nccdev.yonyou.com/shareThumbnail?fid=862980571113328&width=1200&height=800&type=min)

### 情况2、依赖类库顺序问题

虽然插件已经很尽力的帮助大家以尽量少的操作，加快项目启动。但是有时候会有类库加载顺序不正确的情况存在，如果提示无法序列化类，可能就是类库加载顺序问题。
类库正确的加载顺序如下：

![img_1.png](https://nccdev.yonyou.com/shareThumbnail?fid=862980571113329&width=1200&height=800&type=min)

### 情况3、启动服务后，然后服务突然停了

控制台没有抱任何错误，只打印了那么几行的日志就停服务了。此时我们需要找到home/nclogs/server/serverstart-log.log，打开查看具体的报错原因。
具体原因具体分析。我下面只说几种常见问题的解决办法。

1、提示端口冲突：打开sysconfig修改端口，然后重启。

2、提示uri找不到：说明当前启动的是个空项目，创建一个业务组件，在src下的client、private或public中创建一个类，然后重新编译下项目，重启服务。

3、提示slf4j的类重复：找到home\external\lib\slf4j-log4j12-1.7.30.jar重命名为slf4j-log4j12-1.7.30.jar.bak，然后更新home类路径，重启服务。

4、目前home最新版本开始使用jdk17，因此在做新版本的开发时要使用2022.3以上版本的idea才可以。

5、其他情况：根据报错，到idea找到类并打上断点跟踪问题。或者到社区论坛搜索答案。

## 导出补丁问题

### 导出的补丁中没有选中的要导出的补丁文件

检查要导出文件的路径，全路径中不能包含“.”

## 打开前端后提示 xxx send token

打开home中的sysConfig，找到系统配置-安全，点击读取，将“是否校验token”取消勾选，然后点击保存，重启服务即可。

![img_2.png](https://nccdev.yonyou.com/shareThumbnail?fid=862980571113330&width=1200&height=800&type=min)

## Mac启动问题

目前从高级版2312版本开始，使用jdk17。之前社区关于Mac使用idea插件文章，提示下载的jdk1.8的openjdk要改成下载jdk17的openjdk，不可以使用home中自带的jdk。

## 其他问题

参考 [https://nccdev.yonyou.com/article/detail/187](javascript:void(0)) 文章的解决办法，或者到社区搜索答案。

## 插件所有功能

参考 [https://nccdev.yonyou.com/article/detail/658](javascript:void(0)) 文章底下的附件。