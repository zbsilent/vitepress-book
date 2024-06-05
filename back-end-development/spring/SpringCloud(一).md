# SPRINGCLOUD基础2

_For the memory of forgetting_$Summer Aurora$

## 1、技术选型

> [https://start.spring.io/actuator/info](https://start.spring.io/actuator/info)

```json
"spring-cloud": {
  "Hoxton.SR11": "Spring Boot >=2.2.0.RELEASE and <2.3.12.BUILD-SNAPSHOT",
  "Hoxton.BUILD-SNAPSHOT": "Spring Boot >=2.3.12.BUILD-SNAPSHOT and <2.4.0.M1",
  "2020.0.0-M3": "Spring Boot >=2.4.0.M1 and <=2.4.0.M1",
  "2020.0.0-M4": "Spring Boot >=2.4.0.M2 and <=2.4.0-M3",
  "2020.0.0": "Spring Boot >=2.4.0.M4 and <=2.4.0",
  "2020.0.3": "Spring Boot >=2.4.1 and <2.5.1-SNAPSHOT",
  "2020.0.4-SNAPSHOT": "Spring Boot >=2.5.1-SNAPSHOT"
},
"spring-cloud-alibaba": {
  "2.2.1.RELEASE": "Spring Boot >=2.2.0.RELEASE and <2.3.0.M1"
}
```

---

_Configuration_: 推荐使用Cloud Version: 2020.0.3 ,Boot Version 2.4.6

## 2、停更、升级、替换



![image-20210608235908726](https://raw.githubusercontent.com/zbsilent/imag/main/image-20210608235908726.png)



---

## 3、项目结构

```
Aurora
--Cloud-provider-payment
```



> `<dependencyManagement/>`指定元素中的POM父类版本中才拥有、子项目的版本号跟父类保持一致[^1][^2]	

_Configuration:_**File Types**  `Editor->File Types-> Ignore files and folders`

​						**builder**`Complier->Annotation Processors`



## 4、业务代码编写

### 4.1 创建数据库

```sql

```

[2](http://82.156.26.299:8083/GameServer/index)

### 4.2 标准结果返回[^3]

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> {
    private Integer code;
    private String message;
    private T data;

    public CommonResult(Integer code,String message){
        this(code,message,null);
    }
}
```

> 范型传进去什么是什么

### 4.3 Dao层[^4]

### 4.3 Service层[^5]

### 4.4 Controller层

### 4.5 Eureka

- @EnableEurekaServer 开启服务注册中心

- @EnableEurekaClient 注册

- > eureka:
  >   instance:
  >     hostname: localhost
  >   client:
  >     register-with-eureka: false # 不向自己注册
  >     fetch-registry: false # 维护服务实例，不需要检索服务
  >     service-url:
  >       defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/

- >eureka:
  >  instance:
  >    prefer-ip-address: true #使用服务的IP地址注册
  >  client:
  >    service-url:
  >      defaultZone: http://localhost:7001/eureka/
  >    register-with-eureka: true
  >    fetch-registry: true #单节点无所谓 集群必须配置rebbon使用负载均衡

- <a>集群</a>

  - <a>互相注册，相互守望</a>

  - 修改HOST文件[^6]

  - ```java
    server:
      port: 7002
    eureka:
      instance:
        hostname: eureka7002.com
      client:
        register-with-eureka: false # 不向自己注册
        fetch-registry: false # 维护服务实例，不需要检索服务
        service-url:
          defaultZone: http://eureka7001.com:7001/eureka/
    
    
    ```

## 5、 CP/AP

> 一致性（Consistency）、可用性（Availability）、分区容错性（Partition tolerance）

- AP(Eureka) 高可用

- CP(Zookeeper/Consul) 数据一致 

## 6、 Ribbon

> 自动基于某准规则连接服务 实现负载均衡和服务器调用的小工具
>
> 负载均衡+RestTimplete实现调用
>
> 软负载均衡的客户端组件

##  7、 Hystrix

> 服务降级 程序异常，超时，服务熔断出发服务降级，线程池/信号量满 fallboack
>
> 服务熔断 保险丝
>
> 服务限流 保证服务器不被拥挤

```java
/**注解到类上*/  
@HystrixCommand(
      fallbackMethod = "errorHandle",
      commandProperties = {
        @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "1500"),
        @HystrixProperty(name = "execution.timeout.enabled", value = "true"),
      })
```

- 熔断 检测正常后，恢复链路调用





Config设置



- 新建仓库 




# Nacos

---

_**Reference:**_

[^1]:_子项目中指定了版本号用子项目的_
[^2]:如何跳过MAVEN单元测试

![image-20210609004313196](https://raw.githubusercontent.com/zbsilent/imag/main/image-20210609004313196.png)

[^3]:[Java Doc注释详解](https://www.cnblogs.com/lukelook/p/12800812.html)



[^5]: _**Configuration of  Transactional:**_

> @EnableTransactionManagement
>
> ---
>
> **Required** *需要 如果存在一个事务，则支持当前事务。如果没有事务则开启*
>
> **Supports** *支持 如果存在一个事务，支持当前事务。如果没有事务，则非事务的执行*
>
> **Mandatory** *必要的 如果已经存在一个事务，支持当前事务。如果没有一个活动的事务，则抛出异常。*
>
> **required_new ** *总是开启一个新的事务。如果一个事务已经存在，则将这个存在的事务挂起。*
>
> **Not_support** *总是非事务地执行，并挂起任何存在的事务。*
>
> **Never**  *绝不 总是非事务地执行，如果存在一个活动事务，则抛出异常*
>
> **Nested**  *嵌套的 如果有就嵌套、没有就开启事务*

[^4]: _MyBatis注解补漏_

> @Results({
> 		@Result(property="grade",column="gid",one=@One(select="cn.easytop.lesson03.resultMap.anno.GradeMapper.queryGrade"))
> 		/*
> 		 *根据@Select("select * from student where sid=#{0}")结果  把gid自动映射到数据库中的列名gid（属性名和列名一致自动映射）
> 		 *把gid传入到one=@One(select="cn.easytop.lesson03.resultMap.anno.GradeMapper.queryGrade")
>
>    *		此方法中查询出结果映射到Student中的grade属性  property="grade"
>             	 *
>             	 */
>       })
>       @Select("select * from student where sid=#{0}")
>       public Student queryStudent(String sid)
>
> ---
>
> //查询班级带出学生
> 	@Results({
> 			//属性名映射到数据库的列名中
> 			@Result(property="gname1",column="gname"),
> 			/*
>
>    * 根据@Select("select * from grade where gid=#{0}")查询出来的gid与数据库中学生列表名映射（一致自动映射）
>         * 把gid传递到 "cn.easytop.lesson03.resultMap.anno.StudentMapper.queryAllStudent" 此方法中
>             * 查询出来的结果与Grade中的 studentList映射   并指定类型 javaType=List.class
>               * */
>                 @Result(property="studentList",javaType=List.class,column="gid",many=@Many
>                 	(select="cn.easytop.lesson03.resultMap.anno.StudentMapper.queryAllStudent"))
>                 }
>                 )
>                 @Select("select * from grade where gid=#{0}")
>                 public Grade queryAllGrade(String gid);

[^6]:host文件设置localhost映射

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
127.0.0.1	eureka7001
127.0.0.1	eureka7002
127.0.0.1	eureka7003
255.255.255.255	broadcasthost
::1             localhost
# Added by Docker Desktop
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of section

```



