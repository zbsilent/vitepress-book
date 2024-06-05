# NC Cloud OpenAPI

---

⚠️  <font color='red'>本文仅供内部交付人员参考学习，且针对版本为NCC2005及以上版本，产品缺失及其他异常均可提交集团产品处理。（另U8C也提供了对应的付费产品）</font>

​	<font color='red'>OpenApi是用友提供的产品公开接口，包含在软件基础平台中并附相关的文档、接口清单，具备开发能力的组织都可以进行使用。与此同时，用友只提供OpenApi相关接口功能和手册，在标准服务中不包含相关的开发、指导、协助、测试等服务内容。如果需要用友提供相关服务和开发支持工作，需要签署相关的合同。</font>

附:[OpenAPI接口文档](https://nccdev.yonyou.com/openapi/doc)

## 说明

​    API的全称是应用[编程](https://baike.baidu.com/item/编程)接口（Application Programming Interface），这并不是一个新概念，在[计算机操作系统](https://baike.baidu.com/item/计算机操作系统/2310)出现的早期就已经存在了。在互联网时代，把网站的服务封装成一系列计算机易识别的数据接口开放出去，供第三方开发者使用，这种行为就叫做开放网站的API，与之对应的，所开放的API就被称作openAPI。

​	NCCloud 1903及以上版本均开放了对应版本的基础档案、业务单据的接口以满足第三方开发者的使用。区别NC各版本，NCC产品更加开放，随着后续产品的迭代，外系统接口服务将均采用OpenAPI实现。

​	OpenAPI接口文档地址 https://nccdev.yonyou.com/openapi/doc，使用前请按照对接信息确认接口是否满足需求。



## 系统配置

Openapi做了权限控制和OAuth2安全控制。使用openapi的完整步骤如下：

### 1、访问NCCloud开放管理平台

> http://ip:prot/nccloud/resources/opm/ <font color='red'>系统管理员管理员权限登录</font>

### 2、注册第三方应用（可以使用openapi的应用）

![image-20220331134329237](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331134329237.png)

> ⚠️ <font color='red'>down load 链接下载的文档各版本略有不同，且只提供java请求示例 供第三方研发使用</font>

### 3、注册页面说明

![image-20220331134944136](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331134944136.png)

![image-20220331135015709](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331135015709.png)

![image-20220331135044152](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331135044152.png)

### 4、可访问API分配

![image-20220331135120284](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331135120284.png)

分配后效果如下

![image-20220331135204931](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331135204931.png)

### 5、第三方对接需提供的相关信息说明

| 字段编码      | 字段名称                        | 字段类型 | 取值范围/枚举                                                |
| ------------- | ------------------------------- | -------- | ------------------------------------------------------------ |
| grant_type    | 授权模式                        | String   | 第三方参照开发文档可选                                       |
| client_id     | 第三方应用 id                   | String   | NCC 系统设置 ⚠️ 即APPID                                       |
| client_secret | 第三方应用注册当中的 app_secret | String   | NCC 系统设置 ⚠️ 即app_secret                                  |
| biz_center    | 访问的 nccloud 系统的账套       | String   | 如 001 NCC 系统设置 ⚠️ 帐套编码                               |
| dsname        | 数据源名称                      | String   | 如开发环境 design 其他环境自行提供                           |
| usercode      | 默认用户                        | String   | NCC 用户编码                                                 |
| signature     | 请求加签(各版本算法略有区别)    | String   | 请求加签，其算法为 SHA256Util.getSHA256(client_id + client_secret + pubKey,pubkey) ⚠️ 其中 pubKey 为第三方应用注册当中的公钥字段 |
| mediaType     | content-Type                    | String   | application/x-www-form-urlencoded                            |

## 其他

### _1、NCCloud开放管理平台 download的文件，可直接提java请求实例给第三方,无需NCC开发人员提供_

### _2、https://nccdev.yonyou.com/openapi/doc 官方提供接口文档注册时候会略有出入，可以参考后台 opm_apimanager 表进行核对_

### 3、_接口均不提供查询接口 可参考https://nccdev.yonyou.com/openapi/doc_

### 4、以币种基础档案示范 该图来源于https://nccdev.yonyou.com/openapi/doc

![image-20220331140643398](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331140643398.png)

#### 1、请求地址为接口访问地址

#### 2、POST为接口请求方式 第三方开发人员会自行按照post方式处理不做过多解释

#### 3、请求参数指 请求体参数，<font color='red'>请求头参数参考 【系统配置 5】外系统使用人员会自行索要</font>

#### 4、文档均提供请求参数势力和返回参数示例 具体请自行参考文档

