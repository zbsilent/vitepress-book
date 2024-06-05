# IDEA开发问题整理



环境 账号 admin 密码 1234qwer!!

<kbd>⚠️ 不允许转载发现必严惩</kbd>

1. 目录结构说明


![image-20220331003209259](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331003209259.png)

> 1、新建业务组件 对应hotwebs目录下的代码 切记在用开发工具打开之前 先移动目录 具体方式参考3 
>
> 2、新建模块目录 对应./nchome下的moudles目录下的代码

![](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220331004229645.png)

> 补丁目录结构示范



2. IEAD直接启动前端登录找不到页面异常

![image-20220330234511235](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220330234511235.png)

> 因为找不到对应页面的路径，需要设置下路径 前面增加/nccloud/resources/

3. 更新类路径

旧版本执行deploy.bat 移动jar包 

新版本手动执行移动 ./nchome/hotwebs/nccloud/web-inf -> ./nchome/external/lib下

![image-20220330225126858](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220330225126858.png)

![image-20220330225149769](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20220330225149769.png)

> 1.  NCC【NCC或NC】
> 2. V2105【NC6.x或者NCC2105、2005……】
> 3. GJFOOD【项目名称】
> 4. Reuse【Reuse是否可复用、UnReuse不可复用】