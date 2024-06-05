

# SPRINBOOT基础

[[toc]]

![](https://img.shields.io/badge/SpringBoot-zbsilent-brightgreen)](Https://github.com/zbsilent)

[![plastic](https://shields.io/badge/style-plastic-green?logo=appveyor&style=plastic)]()

## What`s SpringBoot



> Srping是一个开源框架，容器，2003年，作者：Rod Johnson

**Spring是为了解决企业级应用开发的复杂性**

- IOC
- AOP
- 最小侵入式的编程

`约定大于配置` 



**主要优点**

* 快速入门
* 开箱即用
* 简化配置



> 微服务是一种架构风格 **打破all in one风格 ** 



## The first Spring Boot program



* [Quick Start by IDEA](https://start.spring.io)

## 配置编写

- pom.xml
  - Spring-boot-dependencies : 核心依赖在父工程中
  - 不需要指定版本   

- 启动器

  ```xml-dtd
  <dependency>
  	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
  </dependency>
  ```

## Auto Configure

* 注解

  ```java
  @SrpingBootConfiguration: springboot的配置
  		@Configuration : spring配置类
  		@Component：说明这是一个Spring的组件
  @EnableAutoConfiguration：自动配置
  		@Auto ConfigurationPackage:自动配置包
  					@Import(AutoConfigurationPackages.Registrar.class) 自动配置注册包
  		@Import(AutoConfigurationImportSelector.class)
  
  //获取所有的配置
  List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);
  
  ```

* 获取候选的配置

  ```java
  protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
  		List<String> configurations = SpringFactoriesLoader.loadFactoryNames(getSpringFactoriesLoaderFactoryClass(),
  				getBeanClassLoader());
  		Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you "
  				+ "are using a custom packaging, make sure that file is correct.");
  		return configurations;
  	}
  ```

- 自动配置核心文件 [META-INF/spring.factories]()_by_[spring-boot-autoconfigure-2.x.RELEASE.jar]()
- [核心流程图](https://www.processon.com/embed/608a92d00791295756e07f8a)

![springboot启动流程](https://raw.githubusercontent.com/zbsilent/imag/main/springboot.png)

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:1024px; height:320px;" src="https://www.processon.com/embed/608a92d00791295756e07f8a"></iframe>

> 结论：srpingboot所有自动配置都在启动的时候扫描加在：`spring.factories`所有的自动配置类都在这里面，但是需要依据条件判断是否成立，导入相对应的_`start`_,就有对应的启动器了，有了启动器，我们自动装载就会生效，配置成功！



- 关于springboot核心
  - autoconfiguration
  - run()
    - 推断应用都类型是普通的项目还是web项目
    - 查找加载所有可用的初始化器，设置到initializers属性中
    - 找出所有的应用程序监听器，设置到listeners属性中
    - 推断并设置main方法的定义类，找到运行的主类

## YML配置文件

```yaml
spring:
  profiles:
    active: dev
```

> 可以使用开始`--spring.profiles.active=dev`活跃了`application-dev.yml`

### Configuring the Annotation Processor 配置注释处理器

- pom.xml增加对应的_start_

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-configuration-processor</artifactId>
      <optional>true</optional>
  </dependency>
  ```

### 注入关键点

- 注解

  > @ConfigurationProperties: <font color="skyblue">默认从全局配置文件中获取值</font>
  >
  > @PropertySource:加载指定配置文件

- 用法

  - @ConfigurationProperties(prefix =“person”)

    ```yaml
    server:
      port: 8081
    
    person:
      name: zbsilent${random.uuid}
      age: 18${random.int}
      happy: true
      birth: 2021/05/20
      map: {k1:v1,k2:v2}
      lists:
        - code
        - girl
        - music
      dog:
        name: ${person.hello:hello}_大黄
        age: 1
    
    
    ```

    

  - @PropertySouce(vlue=“classpath:person.properites”)

    ```java
    @PropertySouce(vlue=“classpath:person.properites”)
    public class Person {
    
        @Value("${name}")
        private String name;
    
        ......  
    }
    ```

    ```properties
    name=kuangshen
    ```

    > 【注意】properties配置文件在写中文的时候，会有乱码 ， 我们需要去IDEA中设置编码格式为UTF-8；

    ![image-20210528125719510](https://raw.githubusercontent.com/zbsilent/imag/main/fileencodings.png)



## JSR303数据校验

### 引入配置

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



### 代码演示

```java
@Component
@ConfigurationProperties(prefix = "person")
@Validated
public class Person {
    @NotBlank(message = "用户名不能为空")
    private String name;
    private Integer age;
    private Boolean happy;
    private Date birth;
    private Map<String,Object> maps;
    private List<Object> lists;
    private Dog dog;

    @Override
    public String toString() {
        return "name:"+name;
    }
}
```



## 自动配置原理

>@Configuration 表示是一个配置类

> @EnableConfigurationProperties({HttpProperties.class})

> @Conditional注解



1、SpringBoot启动会加载大量的自动配置类

2、我们看我们需要的功能有没有在SpringBoot默认写好的自动配置类当中；

3、我们再来看这个自动配置类中到底配置了哪些组件；（只要我们要用的组件存在在其中，我们就不需要再手动配置了）

4、给容器中自动配置类添加组件的时候，会从properties类中获取某些属性。我们只需要在配置文件中指定这些属性的值即可；

**xxxxAutoConfigurartion：自动配置类；**给容器中添加组件

**xxxxProperties:封装配置文件中相关属性；**



```java
//表示这是一个配置类，和以前编写的配置文件一样，也可以给容器中添加组件；
@Configuration 

//启动指定类的ConfigurationProperties功能；
  //进入这个HttpProperties查看，将配置文件中对应的值和HttpProperties绑定起来；
  //并把HttpProperties加入到ioc容器中
@EnableConfigurationProperties({HttpProperties.class}) 

/**
 * Spring底层@Conditional注解
 * 根据不同的条件判断，如果满足指定的条件，整个配置类里面的配置就会生效；
 * 这里的意思就是判断当前应用是否是web应用，如果是，当前配置类生效
 */
@ConditionalOnWebApplication(
    type = Type.SERVLET
)

//判断当前项目有没有这个类CharacterEncodingFilter；SpringMVC中进行乱码解决的过滤器；
@ConditionalOnClass({CharacterEncodingFilter.class})

//判断配置文件中是否存在某个配置：spring.http.encoding.enabled；
  //如果不存在，判断也是成立的
  //即使我们配置文件中不配置pring.http.encoding.enabled=true，也是默认生效的；
@ConditionalOnProperty(
    prefix = "spring.http.encoding",
    value = {"enabled"},
    matchIfMissing = true
)

public class HttpEncodingAutoConfiguration {
    //他已经和SpringBoot的配置文件映射了
    private final Encoding properties;
    //只有一个有参构造器的情况下，参数的值就会从容器中拿
    public HttpEncodingAutoConfiguration(HttpProperties properties) {
        this.properties = properties.getEncoding();
    }
    
    //给容器中添加一个组件，这个组件的某些值需要从properties中获取
    @Bean
    @ConditionalOnMissingBean //判断容器没有这个组件？
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
        filter.setEncoding(this.properties.getCharset().name());
        filter.setForceRequestEncoding(this.properties.shouldForce(org.springframework.boot.autoconfigure.http.HttpProperties.Encoding.Type.REQUEST));
        filter.setForceResponseEncoding(this.properties.shouldForce(org.springframework.boot.autoconfigure.http.HttpProperties.Encoding.Type.RESPONSE));
        return filter;
    }
    //。。。。。。。
}
```









## 集成WEB开发：业务核心

### [静态资源创建](SpringBoot.md#自动装配原理) 

```java
@Override
protected void addResourceHandlers(ResourceHandlerRegistry registry) {
	super.addResourceHandlers(registry);
	if (!this.resourceProperties.isAddMappings()) {
		logger.debug("Default resource handling disabled");
		return;
	}
	ServletContext servletContext = getServletContext();
	addResourceHandler(registry, "/webjars/**", "classpath:/META-INF/resources/webjars/");
	addResourceHandler(registry, this.mvcProperties.getStaticPathPattern(), (registration) -> {
		registration.addResourceLocations(this.resourceProperties.getStaticLocations());
		if (servletContext != null) {
			registration.addResourceLocations(new ServletContextResource(servletContext, SERVLET_LOCATION));
		}
	});
}
private void addResourceHandler(ResourceHandlerRegistry registry, String pattern, String... locations) {
	addResourceHandler(registry, pattern, (registration) -> registration.addResourceLocations(locations));
}
```

- webjars  `localhost:8081/webjars/**`

-  `classpath:/META-INF/resources/` , `classpath:/resources/`, `classpath:/static/`, `classpath:/public/`,`rootPath`

- 优先级：`resources > static(default) > public`

- 设置自己的

  ```yaml
  spring:
    mvc:
      static-path-pattern:/hello/
  ```

  

```java
@Bean
public WelcomePageHandlerMapping welcomePageHandlerMapping(ApplicationContext applicationContext,
		FormattingConversionService mvcConversionService, ResourceUrlProvider mvcResourceUrlProvider) {
	WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(
			new TemplateAvailabilityProviders(applicationContext), applicationContext, getWelcomePage(),
			this.mvcProperties.getStaticPathPattern());
	welcomePageHandlerMapping.setInterceptors(getInterceptors(mvcConversionService, mvcResourceUrlProvider));
	welcomePageHandlerMapping.setCorsConfigurations(getCorsConfigurations());
	return welcomePageHandlerMapping;
}
private Resource getWelcomePage() {
	for (String location : this.resourceProperties.getStaticLocations()) {
		Resource indexHtml = getIndexHtml(location);
		if (indexHtml != null) {
			return indexHtml;
		}
	}
	ServletContext servletContext = getServletContext();
	if (servletContext != null) {
		return getIndexHtml(new ServletContextResource(servletContext, SERVLET_LOCATION));
	}
	return null;
}
private Resource getIndexHtml(String location) {
	return getIndexHtml(this.resourceLoader.getResource(location));
}
private Resource getIndexHtml(Resource location) {
		Resource resource = location.createRelative("index.html");
		if (resource.exists() && (resource.getURL() != null)) {
			return resource;
		}
	}
	
```

### 模版引擎 `Thymeleaf `[语法](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#a-multi-language-welcome)

> 只需要导入对应依赖即可

```xml
<!--thymeleaf 基于3.x开发-->
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf-spring5</artifactId>
</dependency>
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-java8time</artifactId>
</dependency>
```



> 使用`thymeleaf`只能使用`@Controller`跳转到**<font color="#00ff7f">Templates</font>** 目录

### 国际化

- 配置i18n文件

- 如果需要按钮自动切换，需要自定义组件 注册入Spring容器中 @Bean

  ```html
  <div>
          <a th:href="@{/login(language='zh_CN')}">中文</a>
          <a th:href="@{/login(language='en_US')}">English</a>
      </div>
  
  ```

  ```java
  package com.reon.rboot.config;
  
  
  import org.springframework.util.StringUtils;
  import org.springframework.web.servlet.LocaleResolver;
  
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import java.util.Locale;
  
  /**
   * @author Reno
   */
  public class MyMvcLocaleResolver implements LocaleResolver {
      @Override
      public Locale resolveLocale(HttpServletRequest request) {
          String language= request.getParameter("language");
          Locale locale = Locale.getDefault();
          //如果请求参数携带了国际化参数
          if(StringUtils.hasText(language)){
              String[] s = language.split("_");
              locale = new Locale(s[0], s[1]);
          }
          return locale;
      }
  
      @Override
      public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
  
      }
  }
  
  ```

  ```
  package com.reon.rboot.config;
  
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.web.servlet.LocaleResolver;
  import org.springframework.web.servlet.config.annotation.EnableWebMvc;
  import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
  import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
  
  /**
   *
   * @author Reno
   */
  @Configuration
  public class MyMvcConfig implements WebMvcConfigurer {
  
  
      /**
       * 自定义国际化组件会放入spring bean
       * @return LocaleResolver
       */
      @Bean
      public LocaleResolver localeResolver(){
          return new MyMvcLocaleResolver();
      }
      /**
       * 控制页面多级访问
       * @param registry 管理器
       */
      @Override
      public void addViewControllers(ViewControllerRegistry registry) {
          registry.addViewController("/").setViewName("index");
          registry.addViewController("/index.html").setViewName("index");
  
      }
  }
  
  ```

### 拦截器

- 开发拦截器

  ```java
  package com.reon.rboot.config;
  
  import org.springframework.util.ObjectUtils;
  import org.springframework.util.StringUtils;
  import org.springframework.web.servlet.HandlerInterceptor;
  
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  
  /**
   * @author Reno
   */
  public class LoginHandlerInterceptor implements HandlerInterceptor {
  
      @Override
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
          Object loginUser = request.getSession().getAttribute("loginUser");
  
          if(ObjectUtils.isEmpty(loginUser)){
              request.setAttribute("msg","没有权限，请先登陆");
              request.getRequestDispatcher("/login.html").forward(request,response);
              return false;
          }else{
              return true;
          }
      }
  }
  
  ```

- 拦截器配置

  ```java
   @Override
      public void addInterceptors(InterceptorRegistry registry) {
          registry.addInterceptor(new LoginHandlerInterceptor()).addPathPatterns("/**").excludePathPatterns("/index" +
                  ".html","/","/user/login","/css/**,/js/**","/imag/**","/login.html","/login","/user/business");
          //WebMvcConfigurer.super.addInterceptors(registry);
      }
  ```

  

### CRUD

| 功能                               | 请求uri | 方式   |
| ---------------------------------- | ------- | ------ |
| 查询所有员工                       | emps    | GET    |
| 查询某个员工(到修改界面)           | emp/1   | GET    |
| 来到添加页面                       | emp     | GET    |
| 添加员工                           | emp     | POST   |
| 来到修改页面(查出员工进行信息回显) | emp     | PUT    |
| 删除员工                           | emp/1   | DELETE |
|                                    |         |        |



### 解决日期问题

```yml
spring:
	jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
```

​		

### ErrorMvcAutoConfiguration 错误自动处理配置

#### DefaultErrorAttributes

#### BasicErrorController

- 处理 `/error`请求

  ```java
  @RequestMapping("${server.error.path:${error.path:/error}}")
  ```

  - 请求头里会有<a>accept:text-html</a>或者<a>accept:其他</a>

  ```java
  @RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
  	public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
  		HttpStatus status = getStatus(request);
  		Map<String, Object> model = Collections
  				.unmodifiableMap(getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.TEXT_HTML)));
  		response.setStatus(status.value());
      //要去哪个错误页面
  		ModelAndView modelAndView = resolveErrorView(request, response, status, model);
  		return (modelAndView != null) ? modelAndView : new ModelAndView("error", model);
  	}
  
  	@RequestMapping
  	public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
  		HttpStatus status = getStatus(request);
  		if (status == HttpStatus.NO_CONTENT) {
  			return new ResponseEntity<>(status);
  		}
  		Map<String, Object> body = getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.ALL));
  		return new ResponseEntity<>(body, status);
  	}
  ```

  - 解析页面 DefaultErrorViewResolver 解析

  ```java
  protected ModelAndView resolveErrorView(HttpServletRequest request, HttpServletResponse response, HttpStatus status,
  			Map<String, Object> model) {
  		for (ErrorViewResolver resolver : this.errorViewResolvers) {
  			ModelAndView modelAndView = resolver.resolveErrorView(request, status, model);
  			if (modelAndView != null) {
  				return modelAndView;
  			}
  		}
  		return null;
  	}
  //默认springboot可以去找到一个页面？error/404
  private ModelAndView resolve(String viewName, Map<String, Object> model) {
  		String errorViewName = "error/" + viewName;
    //如果模版引擎可以解析这个页面就用模版
  		TemplateAvailabilityProvider provider = this.templateAvailabilityProviders.getProvider(errorViewName,
  				this.applicationContext);
  		if (provider != null) {
        //模版引擎指定的视图地址
  			return new ModelAndView(errorViewName, model);
  		}
    //模版引擎不可用调用这个 就去静态文件夹下找
  		return resolveResource(errorViewName, model);
  	}
  
  private ModelAndView resolveResource(String viewName, Map<String, Object> model) {
  		for (String location : this.resources.getStaticLocations()) {
  			try {
  				Resource resource = this.applicationContext.getResource(location);
  				resource = resource.createRelative(viewName + ".html");
  				if (resource.exists()) {
  					return new ModelAndView(new HtmlResourceView(resource), model);
  				}
  			}
  			catch (Exception ex) {
  			}
  		}
  		return null;
  	}
  
  ```

  

#### ErrorPageCustomizer

- 系统出现错误，注册registerErrorPages，注册的错误页面规则

#### DefaultErrorViewResolver

步骤：

​		一旦系统出现404等异常则ErrorPageCustomizer 定制异常

1 ) . 有模版引擎的情况下：error/状态码 ，精确优先，然后再匹配，可以使用5xx.html 或者4xx.html



### 配置嵌入式servlet容器

Srpingboot使用的是嵌入式Servlet容器

编写一个EmbeddedServletContainerCustomizer:嵌入式的Servlet容器的定制器；









## 集成数据库 ：Druid

## 分布式开发 Dubbo+Zookeeper

## Swagger：接口文档

## 任务调度

## SpringSecurity:Shiro



