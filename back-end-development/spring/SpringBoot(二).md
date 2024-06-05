

# SPRINGBOOT基础2

## DOC

### _Spring Boot Base_

#### _0_、[_crate empty maven project_](https://baidu.com)

#### _1_、[_Create HelloWorld program_](https://docs.spring.io/spring-boot/docs/2.4.6/reference/html/getting-started.html#getting-started)

#### _2_、[POM](#POM)

- Parent
  
  ```java
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.4.6</version>
  </parent>
  <properties>
    <activemq.version>5.16.2</activemq.version>
    <antlr2.version>2.7.7</antlr2.version>
    <appengine-sdk.version>1.9.88</appengine-sdk.version>
  </properties>
  ```

  > Spring Boot 版本仲裁
  >
  > 没有在<dependencies>中管理的依赖需要自行管理

- <a id="F0001">Other Starters</a>[^1]

  > 场景启动器导入 spring-boot-starter

#### 3、MAIN CLASS

- @<a id="F0002">SpringBootApplication</a>[^2]
  - @**SpringBootConfiguration**:标注为SpringBoot的配置类
    - @**Configuration：**Spring定义的配置类
  - <a id="F2091">@**EnableAutoConfiguration：**</a>开启自动配置功能
    - **@AutoConfigurationPackage：**自动配置包[^3]
      - *@Import({[Registrar.class](#F0003)})*给容器中引入组件
    - **@Import({<a id="F0004">[AutoConfigurationImportSelector.class](#F9982)})</a>[^4]：**将需要导入的组件以完全限定类名的方式导入
      - <a id="F0005">META-INF/spring.factories[^划重点]</a>:基本都在org.springframework.boot.autoconfigure包下 

#### 4、[_Spring Initalizr_](https://spring.io/quickstart)

- resources file catalog

  - static：static resources
  - templates ：user freemarker,thymeleaf
  - Application.properties: springboot application config files

  

- @RestController 

  - @Controller
  - @ResponseBody



#### _5_、SpringBoot configuration files

> Modifying configuration files

- application.properties
- application.yml
  -  `YML A Markup Language:是一个标记语言`
  - `YML isn not Markup Language:不是一个标记语言`
  - 以数据为中心

- <a id =“F0006">Getting value from configuration files</a>
  - <a id="F0007">add dependency</a>
  - **@ConfigurationProperties(prefix =“person")**: 默认从全局配置文件中获取值 
  - **@PropertySouce(vlue="classpath:person.properites")**:配合@Value("${name}”) 加载指定配置文件属性
  - **@ImportResouce**:导入srping的配置文件，让配置文件里的内容生效
    - 自己写的spring.xml 文件无法自动进来
    - *@ImportResource(locations = {"classpath:beans.xml”})*
- <a id="#F0008">JSR303 Validate</a>
  - <a id="F0008">add dependency</a>
  - @Validated
- <a id="F0009">Add SpringConfig</a>
  - <a id="F0011">Create MyAppConfig</a>
- Profiles Config
  - after start ,spring scan appliaction.properties or application.yml from project ,  used to Config
  - `file:./config/ `> `File:./`>`Classpath:/config/`>`Classpath:/`
  - spring.config.location设置
  - Server.servlet.context-path = /boot02 访问路径
  - **spring.config.location = /user/prop.properties**[^运维阶段使用] 

#### 6、Auto Configuration

- [Flow](#F2091)
  - 启动即加载大量自动配置类
  - 有没有springboot默认写好的spring自动配置类
  - 我们在来看这个自动配置类到底配置了哪些组件（只要我们用的组件有，就不需要配置了）
  - 给容器中自动配置类添加组件时候，会从properties类中获取某些属性，我们可以在配置文件中指定这些属性的值
    - xxxAutonConfiguration 自动配置类
    - 给容器中添加组件 利用@Bean
    - 有对应的xxxProperties类
- [Conditional & 自动配置报告](#F8872A)
  - 指定条件成立，才给容器中添加Bean
  - 几乎自动配置类都是在一定条件下生效，即加载并非生效
  - `application.yml` 中配置 `debug=true` 即可启动 `自动配置报`



#### 7、SpringBoot Log File

- ~~JCL (Jakarta Commons Logging)~~

- SLF4J(Simple Logging Facade for Java)

- ~~Jboss-logging~~

  - Log4j
  - JUL
  - Log4j2(阿帕奇框架 跟Log4j关系不大)
  - Logback

  > 日志门面：SLF4J
  >
  > 日志实现：~~Log4j~~ Logback

- Spring框架默认使用JCL
- [SpringBoot选用SLF4J和LOGBACK](#F2891)
  
  - 不用调用实现类 ，调用抽象层方法即可
  - [官方手册](http://www.slf4j.org/manual.html)
  - [看图](#img001)
- [统一日志记录](#T00001)
  - 统一使用slf4j和logback实现
  - 将系统中其他日志框架先排除出去
  - 用中间包替换原有的日志框架
  - 我们导入slf4j其他的实现
  - [一定要移除掉框架默认日志依赖](#REMOVE01)
  
- [SpringBoot里日志](#log011)



####  8、<a>Spring&Docker</a>[^Docker]

---

Docker host : docker服务

Docker client : 链接docker主机进行操作

Docker Registy : 用于保存打包好的软件镜像

Docker Images : 用于创建docker容器的模版

Docker Container : 独立的一个或者一组应用

---

1. 安装docker

   > Add config <a>"registry-mirrors": ["https://hsucowrp.mirror.aliyuncs.com","https://docker.mirrors.ustc.edu.cn”  ]</a>

2. 找到镜像
   1. [docker search mysql ](https://hub.docker.com)
   2. docker pull mysql
   3. docker images 查看安装了哪些镜像
   4. docker rmi <IMAGE ID>
   5. docker ps -a
      docker start 14fd7ef73b99
   6. \#执行进入容器命令
      docker exec -it 30a29a905ebb /bin/bash
   7. \#查看容器日志
      docker logs --since 30m 14fd7ef73b99

3. 运行镜像，生成容器

   1. docker run —name container-name -d image-name

      Eg:docker run —name myredis —d redis

      eg:<a>sudo docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7</a>

      - –name：容器名，此处命名为`mysql`
      - -e：配置信息，此处配置mysql的root用户的登陆密码
      - -p：端口映射，此处映射 主机3306端口 到 容器的3306端口
      - -d：后台运行容器，保证在退出终端后容器继续运行

   2. docker ps (查看运行中的容器)

   3. docker container ls 查看容器运行状态

      eg: <a>sudo docker exec -it mysql bash</a>

      ​		<a>mysql -uroot -p123456</a>

   4. docker stop container-name/container-id

   5. docker start container-name/container-id

   6. docker rm container-id

   7. -p 6379:6379

      eg:docker run -d -p  6379:6379 —name myredis docker.io/reids

   8. docker logs container-name/container-id

4. 软件的启停





#### 9、JDBC

---

- [yml配置](#Y0001)
- 自动生成创建脚本
  - 默认规则: schema.sql,schema-all.sql
  - [可用规则](#Y0001)
- 操作数据库
  - <a>JdbcTemplate jdbcTemplate</a> 操作数据库

---

##### 9.1 [整合druid数据源](https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter)

>**强烈注意**：Spring Boot 2.X 版本不再支持配置继承，多数据源的话每个数据源的所有配置都需要单独配置，否则配置不会生效



> 2.x 默认不需要创建 直接配置文件即可

- 创建数据源需要采用[**1**](#C0009)
- Druid监控配置





#### 10、 整合mybatis

##### 10.1 Base Annotation

- **@MapperSacn(value=“package”)**
- @Mapper

##### 10.2 mybatis-config.xml

- [mapper设置YML](#M0004)

##### 10.2 mybatis设置

- [自增主键](#P0004)

> @Options(useGeneratedKeys = true,keyProperty = "id")

##### 10.4 log4j2日志整合注意事项

- [import spring-boot-start-log4j2](#YR0001)
- [remove logback、slf4j.jar](#TC0001)
- [application.yml configuration](#CO0001)

#### 11、 JPA整合

##### 11.1 JAP配置

- [JPA Configuration](#JPA0001)

##### 11.2 JAP配置

- [继承JpaRepository来完成对数据库对操作](#JC0001)
- [**@Query**](https://docs.spring.io/spring-data/jpa/docs/2.4.9/reference/html/#jpa.entity-persistence)
- [@NameQuery](https://docs.spring.io/spring-data/jpa/docs/2.4.9/reference/html/#jpa.entity-persistence)



#### 12、Spring Boot启动原理

##### 12.1 create SpringApplication.class

- 判断是否是web应用
- [add initializers](#IMG0009)
- [add Listeners](#IMG00101)
- [search main method]()[^search main]

##### 12.2 [operation run method](#RUN01)

- 准备环境
  - 执行[ApplicationContextInitializer.initialize()](#APP0001)
  - 监听器<a>SrpingApplicationRunListener</a>回调<a>contextPrepared</a>
  - 加载主配置类定义信息
  - 监听器<a>SpringApplicationRunListener</a>回调<a>contextLoaded</a>
- 刷新启动IOC容器
  - 扫描加载所有的组件
  - 包括从<a>META-INF/spring-factories</a>中获取所有<a>EnableAutoCOnfiguration</a>组件
- 回调容器中所有的<a>AppliactionRunner</a>、<a>CommandLineRunner的run</a>方法
- 监听器<a>SpringAppliactionRunListener</a>回调<a>finished</a>



#### 13、Custom Starter

##### 13.1 场景依赖什么

##### 13.2 如何编写自动配置

- **@Configuration**<a>set class is Config file</a>
- **@ConditionalOnXxxx** 
- **@AutoConfigureOrder** 
- **@Bean** <a>add module to IOC</a>
- **@EnableConfigurationProperties** add IOC 
  - *ConfigurationProperties* user<a> WebMvcProperties.class</a>bind Configuration class

##### 13.3 将需要启动就加载的自动配置类 放入<a>META-INF/spring.factories</a> 中

- org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  - org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
  -  org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
  - org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,

##### 13.4 Custom Moudle

- 启动器只用来依赖导入empty.jar xxx-starter  <font color="red" >— spring-boot-starter</font>
- 专门写一个自动配置模块 xxx-starter-autoconfiguration <font color="red" >— spring-boot-starter-moduleNme</font>
- 启动器依赖自动配置模块 
- 命名规则
  - 后缀 <font color="red" >-spring-boot-starter</font>
  - 模式：<font color="red" >moudle - spring-boot-starter</font>
  - 举例：<font color="red" >mybatis-spring-boot-starter</font>

### SpringBoot 高级

#### _0、_ Springboot&Cache

##### _0.1_ JSR-107

- <a>CachingProvider</a>[^缓存提供者] 定义创建，配置，获取，管理和控制多个CacheManager
- <a>CacheManager</a>[^缓存管理器] 定义创建，配置，获取，管理和控制多个唯一命名的Cache
- <a>Cache</a>[^缓存组件] 一个类似Map的存储结构
- <a>Entry</a>是一个存储中Cache的key-value对
- <a>Expirt</a> 有效期 通过ExpirtPolicy设置



#####  0.2 [Spring缓存抽象](https://docs.spring.io/spring-boot/docs/2.4.6/reference/html/spring-boot-features.html#boot-features-caching-provider)

- org.springframework.cache.Cahe

- org.springframework.cache.CacheManager
- 支持JCache(JSR-107)注解

---

- <a>@EnableCaching</a>启用缓存
- **@Cacheable**(cacheNames={"user"},condition = "#id>0" ,key = "#id”)`add cache`
- **@CachePut**(cacheNames={"user"},key = "#result.userId”)`alter cache`
- **@CacheEvict**(cacheNames={"user"},/*key = "#userId"*/allEntries = true,beforeInvocation = true)`del cache`

##### _0.3_、[整合Redis缓存中间件](https://docs.spring.io/spring-data/redis/docs/2.5.1/reference/html/#redis:connectors)

> install redis : <a>docker run -d -p 6379:6379 --name myredis redis</a>

- **import starter**
- **use RedisAutoConfiguration **
  - *StringRedisTemplate*
  - *RedisTemplate*
  - [custom RedisTemplate](#CUST01)
- **RedisCacheManager**  `efficient`
  - [Config  RedisCacheManager](#CUST01)
  - Autowired RedisCacheManager 可以直接注入使用
  -  user.put("id",userId)
- Create RedisCache
  - @CacheConfig(cacheManager = "userCacheManager")
  - @Cacheable(cacheNames={"user"},condition = "#id>0" ,key = "#id",unless="#result == null",cacheManager = "userCacheManager")
  - @Primary 多个时候必须默认缓存处理器

#### _1_、JMS&AMQP

##### _1.1_提升异步通信，扩展解耦能力，流量削峰

```sequence
participant 用户请求
participant ExchangeN
participant 消息队列
participant 信道N
participant TCP
participant 秒杀业务系统
participant Consumer消费者
用户请求->ExchangeN:给交换器
ExchangeN->消息队列:绑定
note left of 消息队列:exchange用于绑定消息队列
秒杀业务系统->> TCP: 创建一条TCP
TCP ->> 信道N:多路复用
信道N->> 消息队列: 取回数据
消息队列--> Consumer消费者:信息返回
```



##### _1.2_概念

> <a>消息发送者将消息发送后，将由消息代理接管，消息代理保证消息传递到指定目的地</a>

- 消息代理(message broker)

- 目的地(distination)

##### _1.4_ 消息队列主要形式

- **_Queue_**:*point-to-point*
- **_topic_**:*publish==/==subscribe*
- **JMS**(*Java Message Service*):java消息服务
  - 两种基础模型
    - Peer-2-Peer
    - Pub/Sub
  - 多种消息类型
    - TextMessage
    - MapMessage
    - BytesMessage
    - StreamMessage
    - ObjectMessage
    - Message(只有消息头和属性)
- **AMQP**(*Advanced Message Queuing Protocol*) : 高级消息队列协议，兼容JMS网络线级协议
  - 两种基础模型
    - direct exchange
    - fanout exchange
    - topic exchange
    - headers exchange
    - system exchange
    - RabbitMQ
  - 单一消息类型
    - byte[] 当实际应用时，有复杂的消息，可以将消息序列化后发送

##### _1.5_ spring支持

- Spring-jms for jms
- spring-rabbit for amqp
- 需要ConnectionFactory的实现来连接消息代理
- 提供JmsTemplate,RabbitTemplate来发送消息
- @JmsListener(JMS)、@RabbitListener(AMQP)注解方法 监听消息代理发布消息
- @EnableJMS，@EnableRabbit开启支持

##### _1.6_ spring boot atuoconfiguration

- **JmsAutoConfiguration**
- **RabbitAutoConfiguration**

### 2、RabbitMQ for Spring

##### 2.3.1 direct(default) for==p-2-p==

- routeing key 和 binding key一致

##### 2.3.2 fanout ==pub/sub==

- 不管消息routing key是什么 每个发一份 

##### 2.3.3 topic ==pub/sub==

- USA.# 允许0活着多个，*匹配一个
- USA.*weather

##### 2.3.4 headers ==pub/sub==

##### 2.3.5 发布模型

- Publish

- Message

- Broker[^消息队列服务器实体]
     - Virtual Host[^虚拟主机]
          -  Exchange
          - Binding[^bind eq]
          - Queue[^消息队列]
  -  Connection[^TCP链接]
    -  Channel[^信道]

- Consumer[^消息消费者]

#### 2.2 Docker for RabbitMq

> docker run -d -p 5672:5672 -p 15672:15672 --name myrabbitmq de56f4cfbb98

- [访问管理页面](http://127.0.0.1:15672/)

- @See [RabbitAutoConfiguration]()
  - 自动配置链接工厂 **CachingConnectionFactory**
  - **RabbitProperties**：配置文件
  - **RabbitTemplate**:给Rabbit发送和接收消息
    - 默认序列化后发送**rabbitTemplate.convertAndSend("exchange.direct","reno","hello world 你好")**
  - **amqpAdmin**:系统管理功能组件



### 3、[elasticSearch](http://全文检索.com)

> docker run -e "ES_JAVA_OPTS=-Xms512m -Xmx=512m" -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" --name myelasticsearch 6adeafaff184





### 4、Security

### _5、zookeeper+dubbo & Spring Boot+Cloud_

> docker run --name zookeeper -p 2181:2181 --restart always -d 2bd79ece4af2

- 将服务提供者注册到服务中心
- 

























-----

## CODE

#### _1_、[SpringBootApplication Annotation](#F0002)

```Java
@SpringBootConfiguration
@EnableAutoConfiguration
public @interface SpringBootApplication
```

#### _2_、<a id="F0003">Registrar.class</a>

```java
static class Registrar implements ImportBeanDefinitionRegistrar, DeterminableImports {
        Registrar() {
        }

        public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
            AutoConfigurationPackages.register(registry, (String[])(new AutoConfigurationPackages.PackageImports(metadata)).getPackageNames().toArray(new String[0]));
        }

        public Set<Object> determineImports(AnnotationMetadata metadata) {
            return Collections.singleton(new AutoConfigurationPackages.PackageImports(metadata));
        }
    }
```

#### _3_、 <a id="F9982">AutoConfigurationImportSelector.class</a>

```java
List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);
protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
		List<String> configurations = SpringFactoriesLoader.loadFactoryNames(getSpringFactoriesLoaderFactoryClass(),
				getBeanClassLoader());
		Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you "
				+ "are using a custom packaging, make sure that file is correct.");
		return configurations;
	}

/* spring 扫描 META-INF/spring.factories 里的配置文件
   将扫描到的jar包的类路径包装成Properties对象
   从properties中获取到EnableAtuonConfiguration.class（classsName）类的值，添加到容器中
   每一个自动配置类进行自动配置功能*/
```

> HTTP编码自动配置

```java
@Configuration(proxyBeanMethods = false)
//启动ServerProperties类
//将配置文件中的值和ServerProperties对应起来了
@EnableConfigurationProperties({ServerProperties.class}) 
//如果满足什么条件才生效 当前应用是否是web应用 是 当前配置类生效
@ConditionalOnWebApplication(type = Type.SERVLET)
//如果满足什么条件才生效 判断当前项目有没有这个类 乱码解决过滤器
@ConditionalOnClass({CharacterEncodingFilter.class})
//配置文件是否存在以下属性 即使配置文件中不配置 server.servlet.encoding.enabled=true,也是默认生效
@ConditionalOnProperty(
    prefix = "server.servlet.encoding",
    value = {"enabled"},
    matchIfMissing = true
)
public class HttpEncodingAutoConfiguration {
    private final Encoding properties;

  //只有一个有惨构造器的情况下 只去从容器中拿
  public HttpEncodingAutoConfiguration(ServerProperties properties) {
      this.properties = properties.getServlet().getEncoding();
  }

 	//给容器中添加组件
  @Bean
  @ConditionalOnMissingBean
  public CharacterEncodingFilter characterEncodingFilter() {
    CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
   	//server.servlet.encoding.charset=utf-8
		filter.setEncoding(this.properties.getCharset().name());
    //我们能配置的属性都是来源于这个功能的properti类
	 	filter.setForceRequestEncoding(this.properties.shouldForce（Type.REQUEST));
    filter.setForceResponseEncoding(this.properties.shouldForce(Type.RESPONSE));
    return filter;
   }
  }
}
}

```

> 所有配置文件中能配置的属性都是在XXXXProperties文件中封装着

```java
@ConfigurationProperties(
    prefix = "server",
    ignoreUnknownFields = true
)
public class ServerProperties {
    private Integer port;
    private InetAddress address;
    @NestedConfigurationProperty
    private final ErrorProperties error = new ErrorProperties();
    private ServerProperties.ForwardHeadersStrategy forwardHeadersStrategy;
    private String serverHeader;
    private DataSize maxHttpHeaderSize = DataSize.ofKilobytes(8L);
    private Shutdown shutdown;
    @NestedConfigurationProperty
    private Ssl ssl;
    @NestedConfigurationProperty
    private final Compression compression;
    @NestedConfigurationProperty
    private final Http2 http2;
    private final ServerProperties.Servlet servlet;
    private final ServerProperties.Tomcat tomcat;
    private final ServerProperties.Jetty jetty;
    private final ServerProperties.Netty netty;
    private final ServerProperties.Undertow undertow;
```



#### _4_、 [Get Value from Configuration Files](#F0007)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

5、[JSR303 Validate](#F0008)

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<dependency>
   <groupId>jakarta.validation</groupId>
   <artifactId>jakarta.validation-api</artifactId>
   <version>2.0.2</version>
</dependency>
```

6、[Add SpringConfig](#F0011)

```java
package com.srpingsut.quick;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MyAppConfig {
    /** 将方法返回值添加到容器中 id就是方法名*/
    @Bean
    public HelloService helloService(){
        return new HelloService();
    }
}

```

#### 7、<a id="log011">_日志_</a>

```java
Logger logger = LoggerFactory.getLogger(getClass());
logger.trace("跟踪信息");
logger.debug("调试信息");
logger.info("基础信息");
logger.warn("警告信息");
logger.error("错误信息");
```

```properties
#扫描com.springstudy包下
logging.level.com.springstudy=trace
logging.file.name=spring.log
logging.file.path=/user/logger
```



9、<a id="Y0001">JDBC相关代码配置</a>

```yml
server:
  port: 8084
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/mysql
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
    # 自动建表配置
    initialization-mode: always
    # schema: schema-all.sql
    schema: classpath:schema-all.sql
```

#### 10、<a id='C0009'>crate</a>

```java
@Bean
@ConfigurationProperties("spring.datasource.druid.two")
public DataSource dataSourceTwo(){
    return DruidDataSourceBuilder.create().build();
}
```

- 开启监控的内容

```xml
# WebStatFilter配置，说明请参考Druid Wiki，配置_配置WebStatFilter
spring.datasource.druid.web-stat-filter.enabled= #是否启用StatFilter默认值false
spring.datasource.druid.web-stat-filter.url-pattern=
spring.datasource.druid.web-stat-filter.exclusions=
spring.datasource.druid.web-stat-filter.session-stat-enable=
spring.datasource.druid.web-stat-filter.session-stat-max-count=
spring.datasource.druid.web-stat-filter.principal-session-name=
spring.datasource.druid.web-stat-filter.principal-cookie-name=
spring.datasource.druid.web-stat-filter.profile-enable=

# StatViewServlet配置，说明请参考Druid Wiki，配置_StatViewServlet配置
spring.datasource.druid.stat-view-servlet.enabled= #是否启用StatViewServlet（监控页面）默认值为false（考虑到安全问题默认并未启动，如需启用建议设置密码或白名单以保障安全）
spring.datasource.druid.stat-view-servlet.url-pattern=
spring.datasource.druid.stat-view-servlet.reset-enable=
spring.datasource.druid.stat-view-servlet.login-username=
spring.datasource.druid.stat-view-servlet.login-password=
spring.datasource.druid.stat-view-servlet.allow=
spring.datasource.druid.stat-view-servlet.deny=

# Spring监控配置，说明请参考Druid Github Wiki，配置_Druid和Spring关联监控配置
spring.datasource.druid.aop-patterns= # Spring监控AOP切入点，如x.y.z.service.*,配置多个英文逗号分隔

```

#### <a id="P0004">add primarykey</a>

```java
@Options(useGeneratedKeys = true,keyProperty = "id")
```

#### <a id="M0004">mapper.xml for yml</a>

```yml
mybatis:
  type-aliases-package: com.springstudy.db.pojo
  configuration:
    map-underscore-to-camel-case: true
#  配置文件
#  config-location: classpath:mybatis/mybatis-config.xml
#  mapper-locations: classpath:mybatis/mapper/*.xml

```

#### <a id= "YR0001">import spring-boot-start-log4j2</a>

```yml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```



#### <a id =“TC0001">remove logback、slf4j.jar</a>

```yml
 <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
   <!--***Spring Boot 默认使用的日志框架是logback，去掉logback日志框架***-->
   <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-log4j2</artifactId>
   <exclusions>
       <exclusion>
           <groupId>org.apache.logging.log4j</groupId>
           <artifactId>log4j-slf4j-impl</artifactId>
       </exclusion>
   </exclusions>
</dependency>
```



#### <a id="CO0001">application.yml configuration</a>

```yml
mybatis:
  type-aliases-package: com.springstudy.db.pojo
  configuration:
    log-impl: org.apache.ibatis.logging.log4j2.Log4j2Impl
logging:
  file:
    name: sping-xx.log
    path: /Users/Reno/Developer/logger/newlog
  pattern:
    console: "%d{HH:mm:ss.SSS} -> %contextName [%thread] %-5level %logger{36} - %msg%n"
  level:
    com:
      springstudy:
        db:
          mapper: DEBUG
```

#### <a id="JC0001">继承JpaRepository来完成对数据库对操作</a>

```java
public interface UserRepository extends JpaRepository<User,Integer> {
    /**
     * 查询高段位查询
     * @param userId 用户ID
     * @return User
     */
    @Query("select u from User u where u.userId =:userId")
    User findByUserId(@Param("userId") Integer userId);

    /**
     * 按用户编码查询
     * @param userCode 用户编码
     * @return User
     */
    User findByUserCode(String userCode);

```

<a id="JPA0001">JPA</a>

```yml
spring:
  application:
    name: data-jpa
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/jpa
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    open-in-view: true
server:
  port: 8085
logging:
  file:
    name: ${spring.application.name}.log
  pattern:
    console: "%d{HH:mm:ss} -> [%thread] %-5level %logger{36} - %msg%n"
  level:
    com:
      springstudy:
        jpa:
          repository: DEBUG

```

<a id="APP0001">ApplicationContextInitializer.initialize()</a>

```java
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
  this.resourceLoader = resourceLoader;
  Assert.notNull(primarySources, "PrimarySources must not be null");
  this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
  this.webApplicationType = WebApplicationType.deduceFromClasspath();
  //META-INF/spring.factories
  this.bootstrapRegistryInitializers = getBootstrapRegistryInitializersFromSpringFactories();
  setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
  setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
  this.mainApplicationClass = deduceMainApplicationClass();
}
```

<a id="RUN01">run()</a>

```java
public ConfigurableApplicationContext run(String... args) {
  StopWatch stopWatch = new StopWatch();
  stopWatch.start();
  DefaultBootstrapContext bootstrapContext = createBootstrapContext();
  ConfigurableApplicationContext context = null;
  configureHeadlessProperty();
  //获取Listeners 从META-INF/spring.factries
  SpringApplicationRunListeners listeners = getRunListeners(args);
  listeners.starting(bootstrapContext, this.mainApplicationClass);
  try {
     ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);
    //创建环境 
    ConfigurableEnvironment environment = prepareEnvironment(listeners, bootstrapContext, applicationArguments);
    //配置环境
    configureIgnoreBeanInfo(environment);
    //启动头文件 可以自定义
    Banner printedBanner = printBanner(environment);
    //创建应用上下文 即创建IOC容器 AnnotationConfigServletWebServerApplicationContext
    context = createApplicationContext();
    //设置启动器 
    context.setApplicationStartup(this.applicationStartup);
    //准备上下文环境 
    //applyInitializers(context); 回调之前保存好的Initialize方法
		//listeners.contextPrepared(context); 回调之前SpringApplicationRunListener的contextPrepared方法
    //listeners.contextLoaded(context) 运行完成后回调所有的springApplicationRunListener他的contextLoaded方法
    prepareContext(bootstrapContext, context, environment, listeners, applicationArguments, printedBanner);
    //刷新容器 ioc容器初始化过程 
    refreshContext(context);
    
    afterRefresh(context, applicationArguments);
    stopWatch.stop();
    if (this.logStartupInfo) {
       new StartupInfoLogger(this.mainApplicationClass).logStarted(getApplicationLog(), stopWatch);
     }
     listeners.started(context);
    //从ioc容器中 所有 ApplicationRunner，CommandLineRunner
     callRunners(context, applicationArguments);
  }
  catch (Throwable ex) {
     handleRunFailure(context, ex, listeners);
     throw new IllegalStateException(ex);
  }

  try {
     listeners.running(context);
  }
  catch (Throwable ex) {
     handleRunFailure(context, ex, null);
     throw new IllegalStateException(ex);
  }
  return context;}
```

<a id="CUST01">MyRedisConfiguration</a>

```java
package com.study.cache.config;

import com.study.cache.pojo.UserEntity;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnSingleCandidate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;

import java.time.Duration;

/**
 * @author zbsilent
 * @date 2021年06月05日 11:04 上午
 */
@Configuration
public class MyRedisConfig {

//    @Bean
//    public RedisTemplate<Object, UserEntity> userRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
//        RedisTemplate<Object, UserEntity> template = new RedisTemplate<Object, UserEntity>();
//        template.setDefaultSerializer(new Jackson2JsonRedisSerializer<UserEntity>(UserEntity.class));
//        template.setConnectionFactory(redisConnectionFactory);
//        return template;
//    }

    @Bean
    @Primary
    public RedisCacheManager userCacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig().
                entryTtl(Duration.ofDays(1)).disableCachingNullValues().serializeValuesWith(RedisSerializationContext
                        .SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
        return RedisCacheManager.builder(connectionFactory).cacheDefaults(redisCacheConfiguration).build();
    }
}

```



#### END



---



## IMAGE

<a id="img001">日志实现</a>

![click to enlarge](http://www.slf4j.org/images/concrete-bindings.png)

<a id="T00001">同一日志</a>

![click to enlarge](http://www.slf4j.org/images/legacy.png)

<a id="IMG0009">add initializers</a>

![image-20210604225441965](https://raw.githubusercontent.com/zbsilent/imag/main/%E5%8A%A0%E8%BD%BDinitiali)

<a id="IMG00101">add Listeners</a>

![image-20210604225543600](https://raw.githubusercontent.com/zbsilent/imag/main/image-20210604225543600.png)



#



## _Reference_

[^1]:`spring-boot-starter`为开头且包下的其他组件  例如： `spring-boot-starter` `spring-boot-starter-activemq `,`spring-boot-starter-amqp`,` spring-boot-starter-aop`
[^2]:该注解标注的类，SpringBoot则运行该类的main()启动springboot应用
[^3]:将主配置类标注类所在包及以下所有包扫描到spring容器中
[^4]:`org.springframework.boot.autoconfigure`.??.`??AutoConfiguration`包下的自动配置类
[^划重点]:重要的配置文件路径，spring boot 在启动的时候从类路径下的META-INF/spring.factories中获取EnableAutoConfiguration指定的值，并将这些值作为自动配置类导入到容器中，自动配置类生效，帮我们进行自动配置工作
[^运维阶段使用]: 项目打包后可以使用命令行参数的形式，在启动项目的时候指定配置文件的新位置 ，_` java -jar  xxxx.jar --spring.config.loaction=/user/prop.properties` 运行文件_

[^Docker]:开运的应用容器引擎，启动非常快，基于GO语言，Apache2.0开源协议

[^虚拟主机]:表示一批交换器、消息队列和相关对象



























---

​																																														_study by zbsilent@gmail.com_

 

[^信道]: