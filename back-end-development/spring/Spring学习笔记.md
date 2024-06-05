# SPRING项目整合记忆

[[toc]]

---

## 1. 技术选型

![image-20220306111652337](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220306111652337.png)



## 2. 版本选型

| Spring Cloud Alibaba Version | Sentinel Version | Nacos Version | RocketMQ Version | Dubbo Version | Seata Version |
| ---------------------------- | ---------------- | ------------- | ---------------- | ------------- | ------------- |
| 2021.0.1.0*                  | 1.8.3            | 1.4.2         | 4.9.2            | 2.7.15        | 1.4.2         |

#### 1. sudo npm install n -g

##### 2.安装稳定版本 sudo n stable

##### 3. 安装最新版本 sudo n stable

##### 4. 降级/升级 sudo n latest

当前版本是 17.3.0



降级到 14.17.3

sudo n 14.17.3

安装nvm 

```
nvm                  // 会提示nvw下的相关命令
nvm ls               // 查看已安装node版本
nvm install vXX      // 安装对应vXX版本的node
nvm uninstall vXX    // 卸载对应vXX版本的node
nvm use xxx          // 选择使用XXX版本
```





问题：

node版本问题，需要用 nvm 切换node版本

~~sdaf~~

~~删除线~~

`Request:`

_Correct the classpath of your application so that it contains compatible versions of the classes org.apache.catalina.authenticator.AuthenticatorBase and javax.servlet.ServletContext_

`solution：`

 

scope=compile的情况（默认scope),也就是说这个项目在编译，测试，运行阶段都需要这个artifact(模块)对应的jar包在classpath中。
而对于scope=provided的情况，则可以认为这个provided是目标容器已经provide这个artifact。换句话说，它只影响到编译，测试阶段。在编译测试阶段，我们需要这个artifact对应的jar包在classpath中，而在运行阶段，假定目标的容器（比如我们这里的liferay容器）已经提供了这个jar包，所以无需我们这个artifact对应的jar包了。==

```xml
<scope>provided</scope> 排除掉
```





干掉

`Request:` Did you forget to include spring-cloud-starter-loadbalancer

`solution：` 由于SpringCloud Feign在Hoxton.M2 RELEASED版本之后不再使用Ribbon而是使用spring-cloud-loadbalancer，所以不引入spring-cloud-loadbalancer会报错
加入spring-cloud-loadbalancer依赖 并且在nacos中排除ribbon依赖，不然loadbalancer无效

```java
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    <exclusions>
        <exclusion>
            <groupId> springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-loadbalancer</artifactId>
    <version>2.2.4.RELEASE</version>
</dependency>

```





##### 3.Nacos配置中心使用

```properties
# DataId By default, the `spring.application.name` configuration is combined with the file extension (the configuration format uses properties by default), and the GROUP is not configured to use DEFAULT_GROUP by default. Therefore, the Nacos Config configuration corresponding to the configuration file has a DataId of nacos-config.properties and a GROUP of DEFAULT_GROUP
spring.application.name=nacos-config
spring.cloud.nacos.config.server-addr=127.0.0.1:8848
```



必须

```xml
@RefreshScope
@Value("${coupon.user.userName:xiudou}")
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```

##### 4.GateWay

```
spring:
  cloud:
    gateway:
      routes:
        - id: test-route
          uri: https://www.baidu.com
          predicates:
            - Query=url,baidu
        - id: qq_route
          uri: https://www.qq.com
          predicates:
            - Query=url,qq
```

请求参数 如果带url 值 是qq的 则前往 qq



##### 5. MyBatis有逻辑删除

```
@TableLogic 逻辑删除字段上
```





##### 6. OSS

## 简介

更新时间：2020年7月14日 11:33:37

阿里云对象存储服务（Object Storage Service，简称OSS），是阿里云对外提供的海量、安全、低成本、高可靠的云存储服务。您可以通过本文档提供的简单的REST接口，在任何时间、任何地点、任何互联网设备上进行上传和下载数据。基于OSS，您可以搭建出各种多媒体分享网站、网盘、个人和企业数据备份等基于大规模数据的服务。

## 使用限制

您使用的OSS资源和相关功能，都有一定的限制，具体请参见[OSS使用限制](https://help.aliyun.com/document_detail/54464.html#concept-pzk-crg-tdb)。

## 使用说明

OSS API参考主要介绍接口的请求语法、相关参数含义以及请求和返回示例。如果要进行快速二次开发，建议您使用SDK开发包。关于SDK的安装和使用，请参见[OSS SDK参考](https://help.aliyun.com/document_detail/52834.html#t22258.html)。

## OSS定价

关于OSS的价格，请参见[OSS详细价格信息](https://www.aliyun.com/price/product#/oss/detail)。关于OSS的计量计费方式，请参见[OSS计量项和计费项](https://help.aliyun.com/document_detail/59636.html#concept-n4t-mwg-tdb)。

## 错误码

请参见[OSS常见错误响应](https://help.aliyun.com/knowledge_detail/32005.html)。

## 资源术语

放大查看

| 中文      | 英文      | 说明                                                         |
| :-------- | :-------- | :----------------------------------------------------------- |
| 存储空间  | Bucket    | 存储空间是您用于存储对象（Object）的容器，所有的对象都必须隶属于某个存储空间。 |
| 对象/文件 | Object    | 对象是 OSS 存储数据的基本单元，也被称为OSS的文件。对象由元信息（Object Meta）、用户数据（Data）和文件名（Key）组成。对象由存储空间内部唯一的Key来标识。 |
| 地域      | Region    | 地域表示 OSS 的数据中心所在物理位置。您可以根据费用、请求来源等综合选择数据存储的地域。详情请查看[OSS已经开通的Region](https://help.aliyun.com/document_detail/31837.html#concept-zt4-cvy-5db)。 |
| 访问域名  | Endpoint  | Endpoint 表示OSS对外服务的访问域名。OSS以HTTP RESTful API的形式对外提供服务，当访问不同地域的时候，需要不同的域名。通过内网和外网访问同一个地域所需要的域名也是不同的。具体的内容请参见[各个Region对应的Endpoint](https://help.aliyun.com/document_detail/31837.html#concept-zt4-cvy-5db)。 |
| 访问密钥  | AccessKey | AccessKey，简称 AK，指的是访问身份验证中用到的AccessKeyId 和AccessKeySecret。OSS通过使用AccessKeyId 和AccessKeySecret对称加密的方法来验证某个请求的发送者身份。AccessKeyId用于标识用户，AccessKeySecret是用户用于加密签名字符串和OSS用来验证签名字符串的密钥，其中AccessKeySecret 必须保密。 |



##### 7. JSR303

```java
<dependency>
    <groupId>jakarta.validation</groupId>
    <artifactId>jakarta.validation-api</artifactId>
</dependency>


Controller  增加@Valid注解
//javax.validation.constraints,并定义自己的message提示
@NotBlank(message="")' 
private String name;
@RequestMapping("/save")
public R save(@Valid @RequestBody BrandEntity brand,BindingResult result){
  if(result.hasErrors){
    result.getFieldErrors().forEach(()->{
      ……
    })
    R.error(400,"提交数据不合法").put("data",data)
  }
}
校验结果获取
  result.hasErrors
```





```java
//统一异常处理

@Slf4j
@RestControllerAdvice(basePackages = "package")
public class MallExceptionControllerAdvice {

    @ExceptionHandler(value = Exception.class)
    public R handleVaildException(Exception e){
        log.error("数据校验异常{},异常类型{}",e.getMessage(),e.getClass());
        return R.error();
    }
}

```

```java
//分组校验
//1.创建校验接口 什么情况需要什么校验
package com.aurora.mall.common.valid
public interface AddGroup{
  
}

@URL(message="xxx",group={AddGroup.class})
@NotNull(message="",group={UpdateGroup.class,AddGroup.class})
//这里 注意⚠️ 这里 新增时候必须不能空，且是个浏览器地址
  

//2.@Validate 指定一个class 
@RequestMapping("/save")
public R save(@Validate({AddGroup.class}) @RequestBody BrandEntity brand,BindingResult result){
  if(result.hasErrors){
    result.getFieldErrors().forEach(()->{
      ……
    })
    R.error(400,"提交数据不合法").put("data",data)
  }
}
```

> 自定义校验

```java
package com.aurora.mall.product;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;
import java.util.List;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * @author zbsilent
 * @version 1.0
 * @description: TODO
 * @date 2022/3/8 13:25
 */
@Documented
@Constraint(validatedBy = {ListConstraintValidator.class })
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
public @interface  ListValue {
    String message() default "{javax.validation.constraints.NotBlank.message}";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

    int[] vals() default {};
}

//2.可以在资源文件创建 ValidationMessage.properties文件 
javax.validation.constraints.AssertFalse.message = "must be xxxxx"；
//3. validatedBy = { }
  
package com.aurora.mall.product;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.HashSet;
import java.util.Set;

/**
 * @author zbsilent
 * @version 1.0
 * @description: TODO
 * @date 2022/3/8 13:23
 */
public class ListConstraintValidator implements ConstraintValidator<ListValue,Integer> {

    private Set<Integer> set = new HashSet<>();
    @Override
    public void initialize(ListValue constraintAnnotation) {
        int[] vals = constraintAnnotation.vals();
        //ConstraintValidator.super.initialize(constraintAnnotation);
        for(int val : vals){
            set.add(val);
        }
    }


    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {

        return set.contains(value);
    }
}

```





#### 2. 分布式开发

##### 2.1 全文检索 Elasticsearch

##### 2.2 压测 JMeter

* qps 系统美妙处理查询次数 次/秒
* tps 每秒处理的交易数 笔/秒
  1. 创建测试计划 添加线程 用户组 线程组 并发线程数200 Ramp-up 1秒内启动200个 循环次数 每个线程发送多少次请求
  2. HTTP请求 协议/地址/端口 请求方法get/post 路径 
  3. 添加 监听器 查看结果树/汇总报告
* 问题处理 1024-5000 四分钟才回收 端口被占满了 修改注册表 HKEY_LOCAL_MACHIME/SYSTEM/CurrentControlSet/Services/TcpIP/Parameters添加 MaxUserPort 10进制65534 
* TCPTimedWaitDelay:30 

#### 3.优化

##### 3.1 IO密集型/CPU密集型

* CPU升级服务器，增加CPU

* IO密集型 网卡/内存…

## Nginx反向代理



客户 ——-> 公网服务器Nginx ——-> gateway ——-> 后台服务集群代转服务集群（内网IP）

先修改host文件，配置域名和IP地址的对应 即Nginx的地址 switchhost 可以修改

> docker update nginx – - restart=always 自动启动

让nginx反向代理 所有来自于mall.com的请求 都转到商品服务 修改nginx配置文件

> Config 目录下 

![image-20220309124550404](/Users/zbsilent/Library/Application Support/typora-user-images/image-20220309124550404.png)



```json
   server {
        listen       80;
        server_name  mail.com; #监听来源自哪个主机地址 nginx监听域名及端口
 
        location / {
     			proxy_pass http://192.168.56.1:10000; #代理回传到本机
        }
 
        location @router {
        	rewrite ^.*$ /index.html last;
        }
 
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
        location /api/ {
          proxy_pass http://127.0.0.1:7002/;
        }
    }


```

配置上游服务器 网关服务器 在上游的http服务里 nginx总配置文件

```json
Upstream mall{
	server 192.168.50.1:88;
}
```

```json
server {
     listen       80;
     server_name  mail.com; #监听来源自哪个主机地址 nginx监听域名及端口
   
     location / {
  			proxy_pass http://mall; #转发给负载均衡的组 动态转发 代理给网关时候丢失请求的host信息
    		proxy_set_header Host $host;
     }
 }
```

```yaml
修改路由
- id: mall-host
  uri: lb://nacos服务id
  predicates:
  	- Host=**.mall.com
```

Nginx动静分离 static/**下的所有静态资源 放入到nginx下

```
 server {
     listen       80;
     server_name  mail.com; #监听来源自哪个主机地址 nginx监听域名及端口
     # root C:\devtools\web-app;
     # index index.html
     location /static/ {
       root /.../... 访问什么路径
     }
     location / {
       proxy_set_header Host $host;
  	   proxy_pass http://mall; #转发给负载均衡的组 动态转发 代理给网关时候丢失请求的host信息
     }
 }
```



## JAVA内存模型

### jconsole 与 jvisualvm

cmd ~ jconsole

Cmd ~ jvisualvm 插件中心地址 http://visualvm.github.io/pluginscenters.html

![image-20220309120510948](/Users/zbsilent/Library/Application Support/typora-user-images/image-20220309120510948.png)



## 缓存处理

缓存信息 数据一致性要求不高，及时性 访问量大且更新频率不高的应该用缓存处理

先验证缓存是否存在 有就用 没有就用查询

整合缓存 Redis作为缓存 可以利用map 再同一个线程的时候的cache为本地缓存





### 分布式缓存 

* 本地模式在分布式环境下，会造成本地缓存不一致 每个服务器节点上都不一样
* 数据修改也要修改缓存中，导致数据不一致

* ==利用缓存中间件==_集中解决问题_

引入data-redis-starter 

配置redis的host相关信息 使用springboot自动部署的StringRedisTemplate

```java
@Autowired
RedisTemplate redisTemplate;

//TODO 利用方法处理

1.出现内存溢出 -Dio.netty.maxDirectMemory
2.升级lettuce客户端 切换使用jedis 
  
//缓存穿透 查询永远不存在的结果 的解决方案 把null也存储进去 设置过期时间 

//缓存雪崩 同一时间key全部失效，请求全部转发到db 有效时间+随机值
redisTemplate.opsForValue().set(key,value,timeOut,..)
//缓存击穿 访问热点key，刚好失效，查询到db 加锁处理 查到后释放 
public Map<?> getXX(){
  //只要是同一把锁，就能锁住 this
  synchroized(this){
    //得到锁后，再去缓存中确认一次，没有才需要继续查询 
    //TODO 释放锁之前就放缓存
  }
}


//TODO 分布式的解决方案
//TODO 本地锁 synchronized，JUC lock 都是本地锁 只能锁当前进程 使用分布式锁 可以居于redis做分布式锁
//TODO  基于redis的set命令 docker exec -it redis reids-cli 
// set lock hahah NX 发送给多客户 加锁 大家获取锁 都去 redis 占位 setNx命令 
// set lock 111 EX 300 NX 站位 加 过期时间 ttl lock 可以查看过期时间 
public xxx getDbWithLock(){
  //加分布式锁
  //Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock","111");
  //创建Token
  String uuid = UUID.randomUUID().toString()
  Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock",uuid,300,TimeUnit.SECOND);
  if(lock){
    try{
        //加锁成功 设置过期时间 ？这里突然闪断怎么办 非原子操作会出现问题 所以必须得同步操作
    		//redisTemplate.expire("lock",30,TimeUnit.SECOND);
    		R r =  method();
    }finally{
      	//删除锁 解锁失败会导致死锁
      	//redisTemplate.getOpsForValue("lock");
      	//网络交互会造成uuid和lockVaule不一致 删锁会有问题
      	//if(uuid.equals(lockValue)){
      	//  	sredisTemplate.delete("lock");
      	//}
      	String script="if redis.call('get',KEYS[1]==ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end)";
       //解锁保证原子性
       Integer lockStats = redisTemplate.execute(new DefaultRedisScript<Integer>			(script,Integer.class),Arrays.asList("lock"),uuid);
    }

    return r;
  }else{
    //加锁失败...重试... 可以休眠一下
    try{
       Thread.sleep(200)
    }catch(Exception e){
      
    }
   
    return getDbWithLock();  
  }
}

public xxx method(){
  String catalogJSON = redisTemplate.opsForValue().get("catalogJSON");
  if(!StringUtils.isEmpty(catalogJSON)){
    //缓存不为空直接返回
    retrun result;
  }
  //查询数据库
  Object xx = baseMapper.selectList(null);
  //保存到redis
  redisTemplate.opsForValue().set(key,value,time,timeOut);
  //返回值
  return xx;
}


```



## 2.[分布式锁专业框架the Redlock algorithm ](https://github.com/redisson/redisson/wiki/)

Distributed Locks with Regis

```
<!-- https://mvnrepository.com/artifact/org.redisson/redisson -->
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.16.8</version>
</dependency>
```

1. 使用redisson作为分布式锁框架
2. 配置redisson

```shell
docker run --myredis redis -d -p 6379:6379 redis --requirepass "123456"
```

读写锁

```java
package com.aurora.mall.product.web.controller;

import com.aurora.mall.common.utils.R;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RReadWriteLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * @author zbsilent
 * @version 1.0
 * @description: TODO
 * @date 2022/3/9 22:27
 */
@RestController
@Slf4j
@RequestMapping("product/test")
public class IndexController {

    @Autowired
    RedissonClient redisson;

    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @ResponseBody
    @GetMapping("/hello")
    public R hello() {
        //创建分布式锁 只要锁名字一样，就能同一把锁
        RLock lock = redisson.getLock("my-lock");
        RLock fairLock = redisson.getFairLock("公平锁");
        //常见场景 别人在写的时候 又要读 必须成对出现
        RReadWriteLock rReadWriteLock = redisson.getReadWriteLock("读写锁");

        //加锁
        try {
            //lock.lock();//阻塞等待
            /*10秒后自动解锁*/
            lock.lock(10, TimeUnit.SECONDS);
            //最多等待100秒，10秒自动解锁
            lock.tryLock(100, 10, TimeUnit.SECONDS);
            // 业务时间长，运行起见会自动续上新的 30s 模式是30s 锁自动过期被删掉
            //业务只要完成 不手动解锁也会30s后释放
            log.debug("加锁成功，执行业务" + Thread.currentThread().getId());
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            log.debug("释放锁.." + Thread.currentThread().getId());
            lock.unlock();
        }
        return R.ok();
    }

    @ResponseBody
    @GetMapping("/write")
    public R writeValue() {
        String uuid = "";
        RReadWriteLock readWriteLock = redisson.getReadWriteLock("wr-lock");
        RLock rLock = readWriteLock.writeLock();

        try {
            log.debug("增加写锁....."+Thread.currentThread().getId());
            rLock.lock();
            uuid = UUID.randomUUID().toString();
            Thread.sleep(30000);
            stringRedisTemplate.opsForValue().set("writeValue", uuid);
            log.debug("写入成功....."+Thread.currentThread().getId());
        } catch (InterruptedException e) {
            log.debug(e.getMessage());
        } finally {
            log.debug("释放写锁....."+Thread.currentThread().getId());
            rLock.unlock();
        }

        return R.ok(uuid);
    }

    @ResponseBody
    @GetMapping("/read")
    public R readValue() {
        String writeValue = "";
        RReadWriteLock readWriteLock = redisson.getReadWriteLock("wr-lock");
        RLock rLock = readWriteLock.readLock();
        try {
            log.debug("增加读锁....."+Thread.currentThread().getId());
            rLock.lock();
            writeValue = stringRedisTemplate.opsForValue().get("writeValue");
            log.debug("读取成功....."+writeValue+","+Thread.currentThread().getId());
        } catch (Exception e) {
            log.debug(e.getMessage());
        } finally {
            log.debug("释放读锁....."+Thread.currentThread().getId());
            rLock.unlock();
        }
        return R.ok(writeValue);
    }
}

```



闭锁

```
@ResponseBody
@GetMapping("/lockDor")
public R lockDor() throws InterruptedException {
    RCountDownLatch door = redisson.getCountDownLatch("door");
    door.trySetCount(5);
    log.debug("闭锁....."+Thread.currentThread().getId());
    door.await();//等待闭锁完成

    return R.ok("门锁了");
}
@ResponseBody
@GetMapping("/gogo/{id}")
public R gogo(@PathVariable("id") Long id) {
    RCountDownLatch door = redisson.getCountDownLatch("door");
    log.debug(id+"班的人都走了...."+Thread.currentThread().getId());
    door.countDown();//计数-1

    return R.ok("走完了");
}
```

信号量

```
/** redis 直接设置park = 3*/
@ResponseBody
@GetMapping("/park")
public R park() throws InterruptedException {
    RSemaphore park = redisson.getSemaphore("park");//信号亮
    park.acquire();//获取一个信号2⃣ 占一个车位
    return R.ok();
}
@ResponseBody
@GetMapping("/carGo")
public R carGo() throws InterruptedException {
    RSemaphore park = redisson.getSemaphore("park");//信号亮
    park.release();//释放一个车位
    return R.ok();
}
```

```java
/** redis 直接设置park = 3 可以用来做限流 tryacquire */
@ResponseBody
@GetMapping("/park")
public R park() throws InterruptedException {
    RSemaphore park = redisson.getSemaphore("park");//信号亮
    boolean tryAcquire = park.tryAcquire();//试着获取一个信号量
    if(tryAcquire){
        log.debug("可以停车");
    }else{
        log.debug("不可停车");
    }
    //park.acquire();//获取一个信号2⃣ 占一个车位
    return R.ok();
}
@ResponseBody
@GetMapping("/carGo")
public R carGo() throws InterruptedException {
    RSemaphore park = redisson.getSemaphore("park");//信号亮
    park.release();//释放一个车位
    return R.ok();
}
```

## 3解决缓存数据一致性-解决Canal

mysql只要有更新，就放入【订阅】canal 更新redis

数据异构问题： 访问记录表 — 商品记录表 – canal 分析计算 生成另外一张表 用户推荐表 推送到web

:::danger

缓存数据都有过期时间，数据过期下一次查询主动触发更新

读写数据的时候，加上分布式锁 

:::



## 4 整合springcache简化缓存开发

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
 <dependency>
 			<groupId>org.springframework.boot</groupId>
 			<artifactId>spring-boot-starter-data-redis</artifactId>
 </dependency>
```

CacheAutoConfiguration 并配置 RedisCacheConfiguration 会自动配置缓存管理器

- 手工配置

```yaml
spring:
	cache:
		type: redis
```

- 使用注解

@Cacheable 触发将数据保存到缓存

@CacheEvict 删除缓存

@CacthPut 不影响方法执行更新缓存

@Caching 组合以上多个操作

@CacheConfig 共享相同缓存配置

- 开启缓存功能 @EnableCaching 

```java
@ResponseBody
@GetMapping("/getInfos")
@Cacheable(cacheNames = {"category"}，key="'SpEL表达式'")
public R getTtreeInfos() {
    //先拿缓存
     List<CategoryEntity> categoryEntities  = categoryService.listWithTree();
        //防止击穿
    log.debug("这里使用了数据库查询");
    if (categoryEntities != null) {
        return R.ok(categoryEntities.toString());
    } else {
        return R.error();
    }
}
```

`@Cacheable(cacheNames = {"category"}，key="'SpEL表达式'")` 

1. 自定义设置存款key生成规则 指定key的生成器 传入spid表达式 #root.method.name ……
2. 设置缓存存活时间 spring.cache.redis.time-to-live = 5000 存活5秒
3. 以json格式存储 自定义缓存配置器 spring加载<kbd>CacheAutoConfiguration</kbd>，会拿去<kbd>RedisCacheConfiguration</kbd>，最后会使用<kbd>RedisCacheManager</kbd>,放置一个<font color='green'><kbd>RedisCacheConfiguration</kbd></font>即可设置
4. 如果使用cacheConfiguration就不走配置文件，必须迁移配置文件

```java
package com.aurora.mall.product.config;

import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * @author zbsilent
 * @version 1.0
 * @date 2022/3/12 11:44
 */
@Configuration
@EnableCaching
@EnableConfigurationProperties(CacheProperties.class)
public class MyCacheConfiguration {

    /**
     * //@Autowired CacheProperties cacheProperties;
     */


    @Bean
    RedisCacheConfiguration redisCacheConfiguration(CacheProperties cacheProperties) {


        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig();
        //设置缓存key生成方式
        config = config.serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()));
        //设置值返回方式
        config = config.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
        //设置配置文件中的所有配置
        if (cacheProperties.getRedis().getTimeToLive() != null) {
            config = config.entryTtl(cacheProperties.getRedis().getTimeToLive());
        }
        if (cacheProperties.getRedis().getKeyPrefix() != null) {
            config = config.prefixCacheNameWith(cacheProperties.getRedis().getKeyPrefix());
        }
        if (!cacheProperties.getRedis().isCacheNullValues()) {
            config = config.disableCachingNullValues();
        }
        if (!cacheProperties.getRedis().isUseKeyPrefix()) {
            config = config.disableKeyPrefix();
        }
        return config;
    }
}
```

```
cache-null-values: true 解决缓存穿透
time-to-live: 3600000 设置时间
use-key-prefix: true 
key-prefix:CACHE_ 如果指定了名字 用这个作为前缀 如果没有就默认使用缓存的名字做前缀
```

更新时候使用 @CacheEvict(cacheNames = {"category"}) 设置缓存失效
