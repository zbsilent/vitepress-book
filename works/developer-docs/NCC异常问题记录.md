# 异常解决

## 占位

### 占位

#### 前端

---

### 1.1 Uncaught SyntaxError: Invalid regular expression: /['鈥橾/: Unterminated character class

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=W7d1EKZcQVU&fid=362980571088657&width=1200&height=800&type=min)

**解决方法：**

2005及以后的版本VM启动参数里需要加一个-Dfile.encoding=UTF-8。
如果加了该参数，检查启动参数里面是否含有中文空格之类的字符，如果有中文空格时也会导致该问题。修改后重启后端服务并清除浏览器缓存。
见下图。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=ZnIlqLKlSBk&fid=362980571088656&width=1200&height=800&type=min)

### 1.2 浏览器报错 Error：Malformed UTF-8 data

**解决方法：**
(1)用home里面的platform替换前端工程src里面的platform。清除前端浏览器缓存。重启前端服务。

(2)如果用上面的方法还是有问题，可以把home\hotwebs\nccloud\WEB-INF\config\miscellaneous.xml配置文件里的true改成false，再次清除浏览器缓存，重启后端服务再试。

(3)尝试把前端脚手架config\webpack.dev.config.js里面的`const host = 'localhost';` 改成`const host = '127.0.0.1';`

(4)用 127.0.0.1:后端端口/nccloud ，如果用后端端口能正常登陆打开节点则说明是前端工程搭建有问题，如果后端端口打开报错说明后端工程搭建有问题。

(5)检查浏览器版本、更换浏览器

### 1.3 前端界面节点打开报错，界面显示Cannot GET /xxx/xxx/xxx/main/index.html

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=Lrt7uX57QmM&fid=362980571089176&width=1200&height=800&type=min)
**解决方法：**

前端工程config.json里面没有配置对应节点的路径。

举个例子，截图里面报错是" Cannot GET /uapbd/mainchild/mainentity/main/index.html",那我们就需要把"./src/uapbd/mainchild/mainentity/main/index.js"路径配置到config.json文件的buildEntryPath里面，可以使用*号进行匹配。

同时需要保证前端工程里面的src/uapbd/mainchild/mainentity/main/index.js是源码，如果是从home里面拿出来的编译好的代码，则不配置在config.json里面。
改完config.json后需要重启前端服务。如下图所示：

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=7AZ9z7wjQzU&fid=362980571089177&width=1200&height=800&type=min)

### 1.4 前端js怎么获取当前登陆用户信息、业务日期

**解决方法：**

```javascript
import {getBusinessInfo } from 'nc-lightapp-front';
let businessInfo = getBusinessInfo();
let pk_group = businessInfo.groupId;//所属集团
let groupName = businessInfo.groupName;//所属集团名称
let userCode = businessInfo.userCode;//登陆用户编码
let username = businessInfo.userName;//登陆用户名
let userId = businessInfo.userId;//登陆用户主键
let businessDate = businessInfo.businessDate;//业务日期，格式yyyy-MM-dd HH:mm:ss
```

### 1.5 前端工程怎么出补丁？怎么出可以在测试环境调试的前端补丁？

检查前端脚手架config下有没有patch.js和packmetadata.xml，如果说明可以使用npm run patch命令进行出补丁，执行后会在脚手架根目录出现一个patch开头的压缩文件，目录无需调整。
![1.png](https://nccdev.yonyou.com/shareThumbnail?shareId=vQrId59QSsY&fid=362980571089195&width=1200&height=800&type=min)

如果没有patch.js和packmetadata.xml，在终端输入npm run build，在脚手架dist目录下会出现编译好的文件，需要找到home\hotwebs\nccloud\resources，将dist生成的文件覆盖到该目录覆盖即可。

如果是用npm run patch或者npm run test命令生成的文件可以看到除了有js、html外还有js.map文件，如果有.js.map文件则在浏览器里面是可以调试的，与在本地调试一样（浏览器按F12，找来源->mainframe->[name]->.->src）。

### 1.6 怎么通过.js.map文件获取前端源码？

**解决方法：** 如果拿到xxxx.js.map文件可以通过reverse-sourcemap命令反编译出源码来的。操作步骤：

1、使用淘宝镜像，这条命令执行一次即可，下次不用执行。

```
npm install -g cnpm --registry=https://registry.npm.taobao.org 
```

安装reverse-sourcemap命令，执行一次即可。

```
cnpm install --global reverse-sourcemap
```

2、`reverse-sourcemap --output-dir XXX(导出路径)  XXX.js.map( .js.map文件名)`

![2.png](https://nccdev.yonyou.com/shareThumbnail?shareId=taanR44S20&fid=362980571089196&width=1200&height=800&type=min)

### 1.7 前端服务启动报错Error: listen EADDRINUSE: address already in use 0.0.0.0:3006

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=NOr8PQQSSAQ&fid=362980571089124&width=1200&height=800&type=min)
**解决方法：** 前端3006端口被占用，需要换个端口

### 1.8 打开节点白屏控制台报错 Cannot read properties of undefined (reading 'list_head')

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=D3H90mVDQWw&fid=362980571088706&width=1200&height=800&type=min)
**解决方法**

(1) 如果括号里面的是区域的id：2105及2105以后版本如果使用了查询区组件或simplTable、cardTable、form组件又没有使用props.use进行注册，就会报错。需要根据情况，使用了哪个就注册哪个组件。

具体参考文档：[prop.use使用](javascript:void(0))
示例：

```javascript
this.props.use.search('查询区域编码');
this.props.use.form('表单区域编码');
this.props.use.table('表格区域1编码', '表格区域2编码');
this.props.use.cardTable('cardTable区域编码');
```

(2) 如果括号里面不是区域编码而是组件名称，说明该组件没有正常引进来，需要检查一下。

### 1.9 日期类型显示Invalid Date 或者保存报错Invalid Date

**解决方法：** 2111版本启动参数需要加上
`-Duser.timezone=GMT+8`
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=rogJ9NQuTxM&fid=362980571088736&width=1200&height=800&type=min)

### 1.10 Cannot read property 'connectMesg' of undefined

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=V0GRlQySOA&fid=362980571088623&width=1200&height=800&type=min)
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=F0QBnnfqSsU&fid=362980571088624&width=1200&height=800&type=min)
**解决办法：** 从home/hotwebs/nccloud/resources下拷贝platform到vscode工程的src下，重启前端服务，清除浏览器缓存。

### 1.11 启动前端服务时报：Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=gKAMd679TKU&fid=362980571088625&width=1200&height=800&type=min)
**解决办法** npm run dev 启动前端服务时出现如上图红框中的问题的话，是因为你的config.json中
buildEntryPath中路径配置的有问题造成的，需要检查路径是否能与src下的路径匹配。

### 1.12 npm install失败，报错reason: connect ETIMEDOUT

![8ae87295d7249768812c19c1743f2e2.png](https://nccdev.yonyou.com/shareThumbnail?shareId=wXMIe2AESAM&fid=362980571089114&width=1200&height=800&type=min)
**解决方法：** 建议使用淘宝镜像，执行以下命令：

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
```

（当你执行npm install, npm会根据脚手架里面的package.json中对各种依赖的定义去安装这些依赖，安装后在脚手架可以看到会有文件夹node_modules里面就是下载的各种依赖包，还有package-lock.json，用以记录当前状态下实际安装的各个npm package的具体来源和版本号。执行`npm config ls -l` 可以看到npm配置，其中有一条`registry = "https://registry.npmjs.org/"`也就是说npm install的时候是从[https://registry.npmjs.org/去安装我们的依赖，cnpm](javascript:void(0)) install则是从国内[https://registry.npm.taobao.org去下载安装。另外package.json是已经配置好了的，一般情况下不要修改。](javascript:void(0))
）

### 1.13 Minified React error #62;问题（注意是#62）

Error: Minified React error #62; visit [https://reactjs.org/docs/error-decoder.html?invariant=62&args[\]=](javascript:void(0)) for the full message or use the non-minified dev environment for full errors and additional helpful warnings.

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=ZNskXwmSAU&fid=362980571089366&width=1200&height=800&type=min)
点超链接会进入下面的页面
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=1bCEuhLTIA&fid=362980571089368&width=1200&height=800&type=min)

**解决方法：**
点击超链接后会进入报错原因的介绍页面，注意看上面的报错提示。检查自己的style样式，下面是正确的和错误写法示例：

```javascript
正确写法：
<div style={{width:'100px'}}>
</div>
错误写法：
<div style={width:'100px'}>
<div style='width:100px'>
等等

```

### 1.14 Minified React error #130; 问题（注意是#130）

react-dom.production.min.js:187 Error: Minified React error #130; visit
[https://reactjs.org/docs/error-decoder.html?invariant=130&args[\]=undefined&args[]=](javascript:void(0)) for the full message or use the non-minified dev environment for full errors and additional helpful warnings.问题

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=xr8XnJnZRyg&fid=362980571089347&width=1200&height=800&type=min)

**解决方法：**

我们需要在render方法中return组件的地方打断点，然后检查每个组件，是否是如下图这样，如果是那就是该组件没有引用到，需要去检查对应的引用

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=B7duyC5KRic&fid=362980571089346&width=1200&height=800&type=min)

(1)如果是2105及以后的版本，部分组件的引用方式发生了变化，参考文档： [组件引用方式变化](javascript:void(0))

注意点：config.json修改完成需要重启前端服务。文档里面所说的config.json，是跟你的index.js平级的，并不是指配置页面路径的那个config.json。本地开发时需要注意要用home\hotwebs\nccloud\resources下面的uap、platform替换自己前端工程里的uap、platform。
参考下面的截图。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=ZGRg0GHfQp4&fid=362980571088885&width=1200&height=800&type=min)

**注意点1：如果是人力的产品，引用方式略有些不同**。不是配config.json，而是通过这种方式引入:
`import ApproveDetail from 'src/uap/common/components/ApproveDetail';  //审批详情，其他组件类似。`

(2)如果前端调试检查发现是调用createSimpleTable或者createCardTable等组件报错，有数据时报错，无数据不报错，这种一般是modifyMeta里面自定义了render方法或者添加操作列按钮导致，可以检查对应代码里面是否引用了特殊的组件。（例如到货单维护initTemplate里面有一个引入的方式import BillCodeHyperLink from 'scmpub/scmpub/components/BillCodeStyle'; 这种需要在入口index.js配置对应的config.json，可以参考文档[https://nccdev.yonyou.com/article/detail/240](javascript:void(0))。）

(3) 如果通过上述方式没有找到，可以备份代码，逐个删除render里面的代码，定位代码位置，具体问题具体分析。

### 1.15 导入导出报错：TypeError: (0 , _ncLightappFront.excelImportconfig) is not a function

导入导出组件引不进来
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=aSagZ7dEQck&fid=362980571089374&width=1200&height=800&type=min)

**解决方法：** 2105及2105以后的版本，部分组件的引用方式发生了变化，参考文档： [组件引用方式变化](javascript:void(0))
（注意点1：config.json与节点index.js平级，修改过config.json后需要重启前端服务，不然不生效，可以参考上个问题。

注意点2：前端工程里面需要拷贝home\hotwebs\nccloud\resources里面的platform、uap到src目录下。

注意点3：人力产品 `import excelImportconfig from 'src/uap/common/components/excelImportconfig';  //导入，其他组件类似。`
）

### 1.16 前端启动报错 Error: Can't resolve 'ssccommon/components/xxx' 或者Can't resolve 'ssccommon/utils/xxxx'

报错截图：
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=nIgnU7BESq8&fid=362980571088647&width=1200&height=800&type=min)
**解决方法：**
config\webpack.common.js增加配置路径，**同时一定要注意对应路径里面有对应的源码**

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=32eNTBYQQT4&fid=362980571099145&width=1200&height=800&type=min)
（1）如果是erm模块配置如下 ：

```javascript
alias:{
	src: path.resolve(__dirname,"../src/"),
	//路径src/erm/sscrppublic/common下需要有对应源码
	ssccommon : path.resolve(__dirname,"../src/erm/sscrppublic/common/"),
	//下面这一条根据版本自行调整，src/sscrp/public/common/platformcomponents需要有对应源码
	sscplatformcomponents : path.resolve(__dirname, "../src/sscrp/public/common/platformcomponents/V2111"),
	base: path.resolve(__dirname,"../src/common/less/base"),
	widgetsless: path.resolve( __dirname,"../src/sscrp/public/common/less/widgets"),
	uapbd: path.resolve( __dirname,"../src/uapbd")
}
```

（2）如果是共享的模块 sscrp配置：

```javascript
alias: {//路径src/sscrp/public/common/下需要有代码
        ssccommon: path.resolve(__dirname, '../src/sscrp/public/common/'),
        //下面这一条根据版本自行调整，src/sscrp/public/common/platformcomponents需要有对应源码
	sscplatformcomponents : path.resolve(__dirname, "../src/sscrp/public/common/platformcomponents/V2111"),
        base: path.resolve(__dirname, '../src/common/less/base'),
        widgetsless: path.resolve(__dirname, '../src/sscrp/public/common/less/widgets'),
        uapbd: path.resolve(__dirname, '../src/uapbd'),
        src: path.resolve(__dirname, '../src/')
    }
```

### 1.17 前端服务启动报错：Module not found: Error: Can't resolve 'epmp' in xxx\xxx\xxx

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=2BgMEXRx0&fid=362980571089125&width=1200&height=800&type=min)
**解决方法：**

预算领域封装了一些公共的组件、方法。这些组件方法在epmp\output\config\com\index.js进行整体的引入和导出操作。
在需要编译的节点，与index.js平级加个config.json。文件内容如下

```json
{
    "dependModuleName": ["epmp"],
    "dependjs": ["../../../../epmp/index.js"]
} 
```

截图示例：
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=sTyNEWGFRI&fid=362980571089126&width=1200&height=800&type=min)

### 1.18 前端启动报错：Module not found: Error: Can't resolve 'uap/common/components/NCUploader' in xxxxx

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=8jfgmoEmStk&fid=362980571089127&width=1200&height=800&type=min)
**解决方法：** (1) 从2105版本开始，部分平台的组件引用方式发生了变化，这个跟上个问题’epmp’找不到的问题基本类似。

需要把自己节点依赖的组件配置在config.json里面，同时需要确保前端工程里面复制了home\hotwebs\nccloud\resources里面的uap模块以便能找到对应组件。参考文档：[各领域组件适配](javascript:void(0))。引用方式如下面截图所示。配置完后需要重启前端服务。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=8h5wPJYGSnI&fid=362980571089128&width=1200&height=800&type=min)

(2) 配置编译路径的时候需要注意一下需要哪个节点编译哪个，经常会有同学buildEntryPath配置成`"./src/模块编码/*/*/*/index.js"`这样会导致有些不需要的也编译进去，一般buildEntryPath只配置编译入口文件。举个例子打开【请购单维护】节点，右键检查->元素找到main_iframe的src="/pu/pu/buyingreq/main/index.html#/list"从这里我们就可以看出它对应的编译入口文件。即buildEntryPath应该配置成`"./src/pu/pu/buyingreq/main/index.js"`。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=A8j7t4KR4E&fid=362980571104519&width=1200&height=800&type=min)

**错误示例：** 如果buildEntryPath配置成`"./src/pu/pu/*/*/index.js"`，就会导致把list页面路径的也作为编译入口导致找不到组件。具体参考下面截图示例。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=c8m1NYnZSIA&fid=362980571104520&width=1200&height=800&type=min)

### 1.19 前端启动报错：Module not found: Error: Can't resolve 'fs' in 'xxxxxxx'

Module not found: Error: Can't resolve 'fs' in 'C:\Users\Administrator\Desktop\cs\node_modules\webpack\node_modules\schema-utils\src'
@ (webpack)/node_modules/schema-utils/src/validateOptions.js 8:11-24
@ (webpack)/node_modules/schema-utils/src/index.js
@ (webpack)/lib/IgnorePlugin.js
@ (webpack)/lib/webpack.js
@ ./src/cdmc/cdm/financepay/card/events/buttonClick.js
@ ./src/cdmc/cdm/financepay/card/events/index.js
@ ./src/cdmc/cdm/financepay/card/index.js
![657e21d8d129d64f054cfb49028f623.png](https://nccdev.yonyou.com/shareThumbnail?shareId=dhrMcVtRmY&fid=362980571089275&width=1200&height=800&type=min)
**解决方法：** webpack自动在头部引入了` import { debug } from "webpack";`

找到自己的js文件，如果里面有这行代码，删除重新编译即可。

### 1.20 前端启动报错：use strict Unrecognised input 或者报错@import "~base";

报错截图：

![d5168c2b723e56d29458bce7ef9a42b.png](https://nccdev.yonyou.com/shareThumbnail?shareId=nkB48bmgT3c&fid=362980571100204&width=1200&height=800&type=min)

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=qqW0GGgBTFw&fid=362980571099146&width=1200&height=800&type=min)

**解决方法：**
原因是少样式文件，如下图所示：

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=kr1LgVILSso&fid=362980571099151&width=1200&height=800&type=min)

同时需要修改脚手架配置，可以参考问题 “1.16 前端启动报错 Error: Can't resolve 'ssccommon/components/xxx' ” 添加`base: path.resolve(__dirname, '../src/common/less/base'),`

样式文件下载地址：[https://pan.yonyou.com/s/OiIs9vTjQhE](javascript:void(0))

### 1.21 NCC2105 适配了附件，附件管理打开后是空白，只显示单据号xxxx

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=JRZuO0oT28&fid=362980571088649&width=1200&height=800&type=min)
**解决方法：** NCC2105版本为了适配按钮权限，附件弹框上面的按钮也需要注册。这种是因为没有注册附件的按钮导致。到应用注册->找到对应页面->按钮注册界面右上角有个附件按钮注册点一下。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=qrjLDzhFT0c&fid=362980571088650&width=1200&height=800&type=min)

### 1.22 NCC2105 扩展开发不生效，不加载扩展开发的js

**解决方法：**
2105及以后的版本扩展开发应用注册需要配置参数。打开应用注册，找到需要扩展开发的小应用，添加参数：参数名：sec_develop 参数值: Y
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=4XdXcx3uStY&fid=362980571088894&width=1200&height=800&type=min)

### 1.23 审批中心报“没有应用权限或配置错误，请联系管理员”

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=UC2cMRStRmk&fid=362980571088653&width=1200&height=800&type=min)
**解决方法：** (1)检查对应的审批联查节点权限,检查审批页面是否有权限 ，如果没有分配权限则需要到职责-集团去分配。

(2)检查是否多次生成节点,存在冗余脚本 审批应用注册节点

(3)是否设置了默认页面
Select * from sm_apppage where dr = 0 and parentcode = '审批联查应用编码' and isdefault = 'Y'
Select * from sm_appparam where dr = 0 and parentid = (select pk_appregister from sm_appregister where code = '审批联查应用编码') and paramname = 'transtype'

### 1.24 打开节点提示 Unexpected EOF in prolog at [row,col {unknown-source}]: [1,0]

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=0ZTaKAKTH4&fid=362980571089129&width=1200&height=800&type=min)
**解决方法：**
（1）导入导出需要一个xml配置文件，放在文件夹home\resources\excel\billdefine\对应的模块\excel导入导出类型名.xml。以物料-业务单元为例，在excel_billprocess表里注册的billtype值为MATERIAL_ORG，则对应的xml路径为home\resources\excel\billdefine\uapbd\material_org.xml。前端js进行适配的时候调用excelImportconfig、ExcelOutput传入的billtype也是material_org，字母大小写没有关系。

（2）如果文件存在，检查文件格式、内容是否符合xml格式要求。

### 1.25 打开节点提示“根据当前模板主键无法定位模板，请尝试清除缓存后重试！”或者提示“01501001-0281”

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=a9U99xBZTuo&fid=362980571090515&width=1200&height=800&type=min)
**解决方法：**
一般原因是在【模板设置-集团】或者【模板设置-业务单元】复制了模板并且分配了模板后又重新生成了节点，导致找不到原来的模板。解决方法是录制spr日志搜索“PUB_TEMPLATE_ASSIGNMENT” 把对应数据删除掉。

查询sql：

```sql
select * from PUB_TEMPLATE_ASSIGNMENT where  app_code = '应用编码' and page_code = '页面编码'
```

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=rEJM8c3vSXQ&fid=362980571090516&width=1200&height=800&type=min)

### 1.26 npm install提示ac-ep-utils not found

![1876c82fd099a9645f8249adf1a965b.png](https://nccdev.yonyou.com/shareThumbnail?shareId=mFEl1D9MQwQ&fid=362980571099872&width=1200&height=800&type=min)

**解决方法** ： （1）建议把package.json里面的ac-ep-utils删除掉。然后重新npm install。

![b1ac94c90f492c45f58fbd4666e502a.png](https://nccdev.yonyou.com/shareThumbnail?shareId=tFnU1oX7Sx0&fid=362980571099873&width=1200&height=800&type=min)

（2） 参考文档：[https://nccdev.yonyou.com/article/detail/806](javascript:void(0))

```
npm i ynpm-tool -g 
 
ynpm i
```

### 1.27 该单据无小应用xxxx的数据权限或组织权限,请刷新后重试

报错截图如下所示：
![728407c89da53ff31527cbdbde37bba.png](https://nccdev.yonyou.com/shareThumbnail?shareId=rhiVlp2S3A&fid=362980571104336&width=1200&height=800&type=min)

**解决方法：** （1）检查是否有该应用的权限，换另外一个用户登录，到【职责-集团】节点分配一下权限。

（2）另外比较常见的一个错误是应用注册的组织类型错误。例如下面截图是个**错误例子** 组织类型选择了“全局”但是元数据上是“业务单元”这种也会出现上面的问题

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=RZjZMQ6kSw&fid=362980571104337&width=1200&height=800&type=min)

（3）配置了数据权限，可以到【数据权限】节点检查配置情况，或者新做一个数据或者换其他数据检查能否联查过去。

### 1.28 前端npm install时报错提示npm ERR! code EINTEGRITY

报错内容示例如下：

```
npm ERR! code EINTEGRITY
npm ERR! Verification failed while extracting rxjs@6.6.7:
npm ERR! Verification failed while extracting rxjs@6.6.7:
npm ERR! sha1-hqs431zx8LGU9WZQc+nLhznherw= integrity checksum failed when using sha1: wanted sha1-hqs431zx8LGU9WZQc+nLhznherw= but got sha512-hTdwr+7yYNIT5n4AMYp85KA6yw2Va0FLa3Rguvbpa4W3I5xynaBZo41cM3XM+4Q6fRMj3sBYIR1VAmZMXYJvRQ== sha1-kKwBisq/SRv2UEQjXVhjxNq4BMk=. (754116 bytes)
 
npm ERR! A complete log of this run can be found in:
npm ERR!     D:\Nodejs\node_cache\_logs\2023-07-05T03_08_12_453Z-debug.log
```

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=W816lBu7SPw&fid=362980571106423&width=1200&height=800&type=min)
**解决方法：** 脚手架文件里面里面有个package-lock.json，把文件删除，然后重新执行npm install即可。

## 2 参照

### 2.1 如何对参照进行过滤。

参照过滤的位置可以写在initTemplate里面也可以写在编辑前或编辑后事件，总之根据需要确定参照过滤的位置。

1、以部门参照为例，根据选择的组织对部门进行过滤。
前端代码（可以写在编辑前事件）：

```javascript
let meta = this.props.meta.getMeta();//获取模板meta
meta["区域编码"].items.forEach(item=>{
    if(item.attrcode=="pk_dept"){//pk_dept是部门字段编码
        item.queryCondition=()=>{
           return{
               pk_group:pk_group,//集团主键pk_group
               pk_org:pk_org//组织主键pk_org
           }; 
        }//item. queryCondition
  	}
});
this.props.meta.setMeta(meta);
```

这样打开参照查询时，可以看到请求的queryCondition参数里面有pk_group及pk_org的值。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=N0wKVydmSFA&fid=362980571089180&width=1200&height=800&type=min)
这样后台参照类里面就可以取到前端传过来的参数值，在getExtraSql及getExtraSqlParameter把查询的sql拼进去。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=yLgtRJX0T8M&fid=362980571089181&width=1200&height=800&type=min)

2、使用过滤类：有时候光有上面的参照过滤可能还不够灵活，比如上面允许我们用集团、组织进行过滤，但是有些时候我们可能只想显示编码为0001的部门。不可能做参照开发的时候把所有场景都考虑到，所以为了能够做到灵活应变就用到参照的过滤类。这里还是以部门参照为例：

```javascript
let meta = this.props.meta.getMeta();
meta[moduleId].items.forEach(item=>{
   if(item.attrcode=="pk_dept"){
       item.queryCondition=()=>{
       	return{
          pk_group:pk_group,
          pk_org:pk_org,
          code:"0001",
          //树型参照用TreeRefActionExt
          //表型参照用GridRefActionExt
          TreeRefActionExt:"nccloud.web.uapbd.ref.DeptCodeFilter",
        }; 
       }
}
});
this.props.meta.setMeta(meta);
```

后端：nccloud.web.uapbd.ref.DeptCodeFilter该类应该放到NCC client下：

```java
package nccloud.web.uapbd.ref;
import nccloud.framework.web.processor.IRefSqlBuilder;
import nccloud.framework.web.processor.refgrid.RefQueryInfo;
import nccloud.framework.web.ui.meta.RefMeta;
import nccloud.pubitf.platform.db.SqlParameterCollection;
/*
 * dept
 * @author duchsh
 */
public class DeptCodeFilter implements IRefSqlBuilder  {
	@Override
	public String getExtraSql(RefQueryInfo para, RefMeta meta) {
		return " and code=? ";
	}
	@Override
	public SqlParameterCollection getExtraSqlParameter(RefQueryInfo queryInfo, RefMeta meta) {
		String code = queryInfo.getQueryCondition().get("code");
		SqlParameterCollection ret = new SqlParameterCollection();
		ret.addChar(code);
		return ret;
	}
	@Override
	public String getOrderSql(RefQueryInfo para, RefMeta meta) {
		return null;
	}
}
```

界面效果：
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=JQPUhsvURPA&fid=362980571089182&width=1200&height=800&type=min)
部门参照是树形结构，queryCondition返回时是TreeRefActionExt，如果是表型参照返回时就是{GridRefActionExt: "class类全路径"}，如果有多个过滤类时可以使用逗号进行分割。

3、左树右表的参照过滤：

以物料为例，找到物料参照的js可以看到它有两个请求url，其中一个是queryTreeUrl即左树的物料分类，一个是queryGridUrl即右表的物料。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=N9k2v0kwRN8&fid=362980571089183&width=1200&height=800&type=min)
所以左树右表的参照会有两个后台的类MaterialClassTreeRef和MaterialGridRef，右表对物料分类的过滤也是通过getExtraSql完成的，感兴趣的不妨去看一下。所以如果参照类里面getExtraSql不能满足我们过滤需要时，也可以用参照过滤类，左树过滤就是{TreeRefActionExt: "类全路径"}，右表过滤就是{GridRefActionExt: "类全路径"}，两个都需要则两个都写。

4、参照使用ReferLoader及过滤方法

以部门参照为例：

```javascript
import { high } from 'nc-lightapp-front';
const { Refer:{ReferLoader} } = high;//引入ReferLoader
<ReferLoader
	placeholder={"部门"} 
	value={this.state.pk_dept}
	disabled={false}
	required={true}
	queryCondition={() => {//参照过滤
		return {
			pk_group:pk_group,
			pk_org:pk_org 
		};
	}}
	onChange={(value) => {//值改变处理
		this.setState({
			pk_dept: { value: value.refpk, display: value.refname }
		});
	}}
	refcode={"uapbd/refer/org/DeptAllDataTreeRef/index"}//前端部门参照的路径，注意没有.js
/>
```

5、启用数据权限、组织权限过滤

queryCondition里面设置isDataPowerEnable为true即可，如果需要设置使用场景可以在queryCondition里设置DataPowerOperationCode，值为对应场景编码。同时需要在【数据权限】配置使用规则才能生效，数据权限对应的拼sql类nccloud.web.refer.sqlbuilder. DefaultRefSqlBuilder方法名称：getDataPowerSQL。

过滤用户有权限的组织，参考下面的例子：

```javascript
let meta = props.meta.getMeta();
meta['区域编码'].items.forEach(item => {
	if (item.attrcode == "pk_org") {
		item.queryCondition = () => {
			return {
				AppCode : props.getSearchParam('c'),
				TreeRefActionExt : 'nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder'
			};
		};
	}
});
props.meta.setMeta(meta);
```

### 2.2 参照过滤不生效

点参照右上角的刷新，检查请求的参数里面的queryCondition里面有没有自己过滤的参数，如果有说明已经生效，检查后端代码逻辑。如果没有queryCondition过滤参数则检查代码是否执行了参照过滤的代码，设置参照过滤后有没有调用props.meta.setMeta(meta);
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=L1iaDJpuQBA&fid=362980571089184&width=1200&height=800&type=min)

### 2.3 单据参照翻译问题或参照显示主键

参照翻译不过来的问题比较复杂，这里可以提供一些排查思路：
(1)检查action请求返回的数据对应的字段有没有display和value，如果有display和value说明已经翻译排查前端代码，可能前端逻辑有问题；如果没有value，则检查后端代码。
![111.png](https://nccdev.yonyou.com/shareThumbnail?shareId=Ns10lMQtTEQ&fid=362980571089187&width=1200&height=800&type=min)
(2) 检查参照字段的pk值所对应档案是否已经被删除了。如果录spr日志时，一般会看到有对应的查询sql会去查找对应档案的code或name，检查后面的结果集或者到数据库里面执行一下，看看有没有对应的数据。
![222.png](https://nccdev.yonyou.com/shareThumbnail?shareId=ehPQkTfSS4M&fid=362980571089188&width=1200&height=800&type=min)
(3)如果单据上所有参照字段都翻译有问题检查模板区域有没有设置vo类。检查action调用的翻译方法是否正确，翻译的方法可以参考2111版本nccloud.web.codeplatform.framework.action.base. VOTransform
![3.png](https://nccdev.yonyou.com/shareThumbnail?shareId=TJ5fpirPTg&fid=362980571089189&width=1200&height=800&type=min)
(4) 检查是否使用了自定义项：如果使用自定义项设置为参照，应该通过【用户定义属性设置-全局】和【用户定义属性设置-集团】来配置，而不是修改模板。如果用户定义属性设置里面找不到，需要先到【用户定义属性组】去注册。
**注意：如果用户定义属性设置后没生效，清除浏览器缓存，重启后台服务。**

(5)检查模板上的区域是否设置了关联区域或者配置了侧拉展开。如果有这种情况，则关联的区域相同字段要配置的一样才能翻译过来。检查方法：
`select * from pub_area left join pub_page_templet on pub_area.templetid = pub_page_templet.pk_page_templet where pub_page_templet.code in ('模板编码') and relationcode='区域编码'`
![4.png](https://nccdev.yonyou.com/shareThumbnail?shareId=NulCz2QQRs&fid=362980571089190&width=1200&height=800&type=min)
(6)检查pub_form_property表，翻译时是根据pub_form_property表里面的metadataproperty和metaid来确定参照从哪个表去查，翻译成哪个字段的。
**注意：如果修改了pub_form_property表，验证时清除浏览器缓存、重启后台服务。**
![5.png](https://nccdev.yonyou.com/shareThumbnail?shareId=pCv7DWNuSL4&fid=362980571089191&width=1200&height=800&type=min)
(7)如果上述方式检查过后无法解决或者参照本身无法通过平台进行翻译，还可以自己代码里面翻译。例如，卡片界面在调用完平台提供的翻译方法后会得到BillCard对象，对card进行解析设置display即可。下面是BillCard例子，其他情况可以自行调试解析结构，逻辑上都是一样的，即设置Cell的display。参考例子如下

```java
public BillCard headExtraTranslate(BillCard card) throws BusinessException {
	Form form = card.getHead();
	Row[] rows = form.getModel().getRows();
	if (rows == null || rows.length == 0) {
		return card;
	}
	for (int i = 0; i < rows.length; i++) {
		rows[i].getCell("creator").setDisplay("username:****");//设置字段的display值
	}
	return card;
}
```

### 2.4 如何设置参照多选

**解决方法：** 查询区域通过配置模板，选中字段后设置显示属性后多选即可。
![6.png](https://nccdev.yonyou.com/shareThumbnail?shareId=v8HQ59USTY&fid=362980571089192&width=1200&height=800&type=min)
如果是表单或者表格参照需要多选，不建议这么做。原因有很多，字段可能存不下，需要考虑后台字段长度问题；翻译问题，多选的参照平台翻译不了，需要自己翻译；显示问题，参照选的记录很多时，界面可能显示不全。如果以上问题考虑清楚后可以参考下面方法：

```javascript
meta['区域编码'].items.forEach(item => {        
	if (item.attrcode == "字段编码") {
		item.isMultiSelectedEnabled = true;//设置参照字段多选
	}
});
```

### 2.5 如何通过前端js代码设置某个字段为参照？

**解决方法：** 参考下面的方式，修改meta对应的item：
![f4ad14de2727d95a8f9dac285919f39.png](https://nccdev.yonyou.com/shareThumbnail?shareId=CsxruCStTlU&fid=362980571089193&width=1200&height=800&type=min)

### 2.6 前端参照没有输入框或者报错找不到xxxxx/index这个文件，请检查引用路径

或者报错提示：“请检查引用的xxxxxx这个文件是源码还是编译好的。源码需要在config.json/buildEntryPath配相应的路径，编译好的则不用”
![7.png](https://nccdev.yonyou.com/shareThumbnail?shareId=NeSKTwfGR6w&fid=362980571089194&width=1200&height=800&type=min)
**解决方法：** 1、如果console控制台有上面报错的提示信息，检查前端工程src里面有没有对应的文件，如果js文件是源码，需要配置到config.json的buildEntryPath里面。如果是系统自带的参照，可以从home里面（home\hotwebs\nccloud\resources）复制到前端工程里面，因为home里的是已经编译好的不需要配置config.json。

2、如果没有报错，检查模板是否正确。代码里面检查item.refcode是否正确。
数据库检查pub_form_property的refcode

```
select * from pub_form_property where areaid in( select pk_area from pub_area left join pub_page_templet on pub_area.templetid = pub_page_templet.pk_page_templet where pub_page_templet.code in ('页面编码') ) and code in('字段编码');
```

## 3 后端

### 3.1 报错提示 不支持此种业务

(1)如果是**本地开发环境**跟代码发现是 nccloud.framework.web.action.entry.ActionExcutor中 if条件判断instance instanceof ICommonAction为false导致执行了ExceptionUtils.unSupported(); 一般是没有使用deploy部署工具（[https://pan.yonyou.com/web/share.html?hash=mJ0LpdY6TU8）导致的，并且一定要用工具去执行不要手动挪jar包。需要停止服务关闭开发工具，防止文件被占用，使用附件中的deploy工具重新部署，部署完成后并确保home\hotwebs\nccloud\WEB-INF\lib和home\hotwebs\nccloud\WEB-INF\classes文件夹里面是空的。](javascript:void(0))

(2)如果已经执行上述步骤而且仍然报错，检查对应的action类是否实现了ICommonAction接口或者ActionExcutor里面条件判断的接口。

(3)检查跟代码如果不是 nccloud.framework.web.action.entry.ActionExcutor报的错，则需要跟代码具体问题具体分析。

**另外需要注意：deploy执行是本地开发环境才需要用到的，线上测试环境不能执行**

### 3.2 User session expired,please re login!(0)

**解决方法：** 使用NCLocator进行调用接口，是会校验会话信息的。需要确认以下几种情况：
(1) 是否是在NCC的client使用了NCLocator（包括在public写了静态方法，public的静态方法使用了NCLocator，NCC client又调用了该静态方法），NCC的client应该是用ServiceLocator获取接口实例调用接口。
(2) 是否启用了线程，在线程里面调用了接口。
(3) 是否在webservice或者servlet类型的接口里面使用了NCLocator，这种也会出现类似情况。
(4) 用户还未登陆，例如用户登陆界面点击登陆或者调用远程接口。
如果用户是未登录的情况下需要调用接口，此时可以参考下面方式

```java
ISecurityTokenCache service = NCLocator.getInstance().lookup(ISecurityTokenCache.class);
		try {
			ISecurityTokenCallback sc = NCLocator.getInstance().lookup(ISecurityTokenCallback.class);
			String userCode = "annoymous";//匿名用户编码
			InvocationInfoProxy.getInstance().setUserCode(userCode);//设置运行环境的用户编码
			byte[] annonyTokens = sc.token(ISystemIDConstants.NCSYSTEM.getBytes(), userCode.getBytes());//ISystemIDConstants.NCSYSTEM代表nc系统
			sc.restore(annonyTokens);//设置临时token
			return SysInitQuery.getParaBoolean(GLOBEL_PK, initCode);//调用接口
		} finally {
			// 注销临时token
			InvocationInfoProxy.getInstance().setUserCode(null);
			boolean isCacheOn = TokenUtil.isSecurityTokenCacheOn();
			if (isCacheOn) {
				service.removeToken(NetStreamContext.getToken());
			}
		}
```

注：有些简单省事的办法是，接口调用前加上下面代码，不过考虑安全问题慎用。
`NCLocator.getInstance().lookup(ISecurityTokenCallback.class).token("NCSystem".getBytes(),"pfxx".getBytes());`

### 3.3 action请求报错 401 Unauthorized

界面提示有类路径或者http响应标头authorizemsg 会有个类路径
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=SSEUJkKRXc&fid=362980571088775&width=1200&height=800&type=min)
**解决方法：**
看到401 Unauthorized 可能把很多会认为是没有放鉴权文件，如果没有鉴权文件时确实会有401状态的提示，这个我们这里也会进行介绍。没有鉴权文件时一般还会有提示信息是“应用编码 xx 以及其根应用编码 xx 没有该操作的业务权限 xxxx/xxx/xxx” 可以在文档搜一下相关介绍。打开nccloud.framework.core.filter.AppActionAuthorizeFilter类doFilter方法可以看到下面一段代码

```java
try {
    name = ncrequest.getAction();
    IActionResource resource = Locator.find(IActionResource.class);
    define = resource.find(name);
} catch (Throwable e) {
    logger.debug(name + "请求 401报错:  " + e.getMessage());
    ThreadResources.getInstance().release();
    res.setHeader("AUTHORIZE", "FALSE");
    String msg = java.net.URLEncoder.encode(e.getMessage(), "UTF-8");
    // 处理空格转为加号的问题
    msg = msg.replaceAll("\\+", "%20");
    res.setHeader("AUTHORIZEMSG", msg);
    res.setStatus(401);
    return;
}
```

所以如果获取实例报错了就会出现该问题，同时AUTHORIZEMSG显示的是对应类名称。像截图这种报错一般是实例化action类出错导致。

另外在这个类里面还有个方法validateActionAuthorized，这个是校验小应用是否有action请求权限的，也就是校验鉴权文件。这个方法finally里面有一段代码如下：

```java
ThreadResources.getInstance().release();
httpRes.setHeader("AUTHORIZE", "FALSE");
msg = java.net.URLEncoder.encode(msg, "UTF-8");
// 处理空格转为加号的问题
msg = msg.replaceAll("\\+", "%20");
				logger_security.debug("AppActionAuthorizeFilter:401报错 ；msg:" + msg);
httpRes.setHeader("AUTHORIZEMSG", msg);
httpRes.setStatus(401);
```

如果校验鉴权没有通过，则设置状态码为401，同时也会有对应的AUTHORIZEMSG。如果authorizemsg看不懂没有关系，复制后找url Decode解码工具解析就明白了。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=zQlbmV1CT7g&fid=362980571089123&width=1200&height=800&type=min)

可以按下面方式解决：
(1) 如果是开发环境，检查action xml配置文件里面对应的类路径是否完全正确，类是否存在，对应的类有没有编译出class文件。如果有多个项目时需要关注当前启动的是哪个项目。

另外有时候PackageExplorer视图里面发现工程前面有个红色的叹号（类似下图test工程），这种就是由于java build path构建有误导致的，这种情况下会导致类不编译，即使bin文件夹有class文件，新添加类或修改类也不生效。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=VLotk1uERzo&fid=362980571088777&width=1200&height=800&type=min)

(2) 如果是测试环境，检查服务器上action配置的类路径是否正确，有没有这个类，有没有class文件，补丁路径是否正确，xml格式是否正确，打过补丁后有没有重启服务（注:有些老的工具出ncc client的补丁会在modules\模块\client下，需要手动调整，正确的路径应该是在home\hotwebs\nccloud\WEB-INF\classes下）。

(3) 如果是was环境，hotwebs的补丁在was需要部署到IBM目录底下，检查重新部署，重启服务。
![983459fa63dcc5c4efc8b8fdeab284a.png](https://nccdev.yonyou.com/shareThumbnail?shareId=HSChdyhZQpA&fid=362980571089349&width=1200&height=800&type=min)

(4) 如果是打印的时候报错，检查是否放了鉴权文件，action及鉴权文件内容配置是否正确。

### 3.4 调action请求报错 Java heap space

**解决方法：** 一般是后台的代码掉死循环里面了。其中比较常见的一个错误是，vo类里面的get、set方法使用了getAttributeValue、setAttributeValue，但是元数据里面对应的属性又没有勾上动态属性也会报这个错误。例如下面的例子：

```java
public void setCode(java.lang.String code){
    this.setAttributeValue(CODE, code);
}
public java.lang.String getCode(){
    return (String) this.getAttributeValue(CODE);
}
```

对应的元数据上实体字段没有勾动态属性。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=mIr66wfQv8&fid=362980571088875&width=1200&height=800&type=min)
**改正方法：** 如果需要用动态属性，则元数据上勾上动态属性，vo类里面对应的字段get、set用getAttributeValue、setAttributeValue。

如果不用动态属性，则元数据上不要勾动态属性，vo类里面对应字段get、set不要用getAttributeValue、setAttributeValue。

修改完元数据重新发布、vo类修改重启服务，进行验证。

### 3.5 新增或修改数据，没有报错也没有保存到数据库里面

**解决方法：**（1）检查vo的status，vo继承SuperVO后保存时一般会根据vo.getStatus()进行判断。在nc.vo.pub.VOStatus有对应的枚举值，如果枚举值是0，则认为是没有修改一般保存接口里面不会保存。

（2）检查upm文件配置有没有设置tx=”CMT”，例如下面的例子，如果只是查询一般配置tx=”NONE”，如果涉及到增删改时会有事务提交才会设置tx="CMT"
（注意点：查询配置成“NONE”这个并不是绝对的，有些查询比如需要根据主键查询创建临时表时也是需要用事务的。）

```xml
<?xml version="1.0" encoding="gb2312"?>
<module name="uapbd">
	<public>
		<component priority="0" singleton="true" remote="true" tx="CMT" supportAlias="true">
			<interface>nc.itf.uapbd.mainchild.mainentity.IMainEntityService</interface>
			<implementation>nc.impl.uapbd.mainchild.mainentity.MainEntityServiceImpl</implementation>
		</component>
		<component priority="0" singleton="true" remote="true" tx="NONE" supportAlias="true">
			<interface>nc.itf.uapbd.mainchild.mainentity.IQuery10KHForMC01</interface>
			<implementation>nc.impl.uapbd.mainchild.mainentity.Query10KHForMC01Impl</implementation>
		</component>
	</public>
</module>
```

（3）录spr日志，检查有没有报错导致事务回滚。

（4）在AbstractEJBServiceHandler类的invoke方法里面找catch，两个catch 的地方都打个断点，重新操作看是否进入断点。

```java
protected static Object invoke(Object proxy, Object target, String name, Method method, Object[] args) throws Throwable {
    ....
    catch (InvocationTargetException var23) {
        hasError = true;
        ...
    } catch (Throwable var24) {
        hasError = true;
        ....
    }
    ...
}
```

### 3.6 提交报错：错误：流程平台缓存中不存在该单据或交易类型=xxxx

![1.png](https://nccdev.yonyou.com/shareThumbnail?shareId=MJvurpXTRhM&fid=362980571089199&width=1200&height=800&type=min)

审批流需要注册单据类型，如果没有注册到单据类型管理里面注册，如果注册了，检查单据类型注册是否正确。
`SELECT * FROM bd_billtype WHERE pk_billtypecode = '单据类型的编码' and ( pk_group = '~' or pk_group = 'global00000000000000' )`

录spr日志，跟一下代码，有些时候可能是其他原因查询时报错，然后在catch里面捕获抛出该异常。见下面代码：

```java
nc.vo.pf.change.PfUtilBaseTools:
//从数据库里再查一下，还是取不到，则抛出异常
try {
    IBilltypeService ser=NCLocator.getInstance().lookup(IBilltypeService.class);
    btVO=ser.getBilltype(strTypeCodestr, InvocationInfoProxy.getInstance().getGroupId());
    }catch(Exception e) {
        throw new PFRuntimeException(NCLangRes4VoTransl.getNCLangRes().getStrByID("busitype",
		"PfUtilBaseTools-000000", null, new String[] { billtype })/* 错误：流程平台缓存中不存在该单据或交易类型={0} */);
}
 
 
```

### 3.7 如何找到action请求对应的后台类？

(1) 推荐使用action嗖一下功能：[https://nccdev.yonyou.com/devtools/action/search](javascript:void(0))

(2)通过搜索定位：需要先确定请求的路径，通过代码或者浏览器里面的network，例如下图请求路径是/nccloud/platform/total/switch.do
![3.png](https://nccdev.yonyou.com/shareThumbnail?shareId=Yy1kOiDRXk&fid=362980571089200&width=1200&height=800&type=min)
则我们只需要找action配置路径为platform.total.switch即可通过action配置找到对应的name、clazz就可以找到对应的类。使用notepad++->搜索->文件中查找->查找目标：platform.total.switch，文件类型*.xml，目录home\hotwebs\nccloud\WEB-INF\extend\yyconfig\modules，搜索后会找到对应的配置及class文件
![4.png](https://nccdev.yonyou.com/shareThumbnail?shareId=yo9se2rJS30&fid=362980571089201&width=1200&height=800&type=min)
![5.png](https://nccdev.yonyou.com/shareThumbnail?shareId=eEefMTTiSH0&fid=362980571089202&width=1200&height=800&type=min)

（3）通过录spr日志方式查找：通过录spr日志可以找到remoteCallPath及remoteCallAction，部分老的版本不支持。
![6.png](https://nccdev.yonyou.com/shareThumbnail?shareId=LO4UeJzuRyI&fid=362980571089203&width=1200&height=800&type=min)

### 3.8 外部交换平台报错“不正确的用户类型”

**解决方法：** &operator=用户主键
外部交换平台导入，需要在url后面添加用户参数operator，后面的是用户的主键，根据自己需要填写用户主键。示例：`&operator=1001A110000000002QZ3`

### 3.9 外部交换平台报错“从后台读取交换规则定义文件发生错误，请检查文件是否存在！”

文件配置错误:文件路径 263X,异常信息:从后台读取交换规则定义文件发生错误，请检查文件是否存在！","errorStack":"nc.vo.pfxx.exception.FileConfigException: 文件配置错误:文件路径 263X,异常信息:从后台读取交换规则定义文件发生错误，请检查文件是否存在！
nc.bs.pfxx.xxconfig.FileConfigInfoReadFacadeImp.getSchemeDefinationFromXML(FileConfigInfoReadFacadeImp.java:322)
nc.bs.pfxx.xxconfig.FileConfigInfoReadFacadeImp.getSchemeDefinationFromXML(FileConfigInfoReadFacadeImp.java:208)
nc.bs.pfxx.xxconfig.FileConfigInfoReadFacade.getSchemeDefinationFromXML(FileConfigInfoReadFacade.java:70)
nc.bs.pfxx.XChangeContext.initBillDefination(XChangeContext.java:131)
nc.bs.pfxx.XChangeContext.init(XChangeContext.java:98)
nc.bs.pfxx.XChangeContext.init(XChangeContext.java:73)
nc.bs.pfxx.XChangeContext.init(XChangeContext.java:79)

**解决方法：** 一般是校验文件不存在。 检查`select * from xi_billdefine where billtype='报错提示的类型'` 如果没有需要从其他环境导入进来。

### 3.10 登录页面platform/total/switch请求403，“无效的请求!”

![488e2590a8c271d1cca118861233d35.png](https://nccdev.yonyou.com/shareThumbnail?shareId=yvKdMXjmQuo&fid=362980571101056&width=1200&height=800&type=min)

***解决方法：*** 应该有多个platform/total/switch 请求，如果能正常登录可以不用管。如果白屏挨个检查一下返回信息。如果有提示类名称则检查该类是否存在，确定存在相应的类更新类路径，重启服务然后再试。

### 3.11 发布webserivce后访问wsdl地址，报错java.lang.ClassCastException: nc.uap.ws.engine.Engine cannot be cast to nc.uap.ws.Bus

***解决方法：*** 参考问题 [https://nccdev.yonyou.com/qa/detail/879](javascript:void(0))
将home\modules\uapfw\META-INF\module.xml中的内容改为如下

```xml
    <?xml version="1.0" encoding="gb2312"?>
    <module name="uapfw">
        <public>
        </public>
        <private>
        </private>
    </module>
```

重启服务。

## 4 打印

### 4.1 打印时提示该网页无法正常运作，HTTP ERROR 401

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=gZFSO4iFTqk&fid=362980571089130&width=1200&height=800&type=min)
**解决方法：** 没有放鉴权文件，参考前面问题action请求报错 401 Unauthorized或者 参考校验类nccloud.framework.core.filter.AppActionAuthorizeFilter 。

## 5 环境

### 5.1 启动环境到一半就停止

![b608ecb4ed79240d42b72da64b6a5b0.jpg](https://nccdev.yonyou.com/shareThumbnail?shareId=2awwqHAgQ2M&fid=362980571088629&width=1200&height=800&type=min)
Java HotSpot(TM) 64-Bit Server VM warning: ignoring option MaxPermSize=256m; support was removed in 8.0
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=QjX0shvfS9s&fid=362980571088651&width=1200&height=800&type=min)
红色报错部分其实并没有影响，问题出在协议初始化。

**解决方法：** (1)检查ip地址或端口，IP地址应该配成127.0.0.1或者为空。
还有可能端口被占用了，检查哪个程序占用端口关掉或者换个启动端口 。
ip地址和启动端口在home\bin\sysconfig.bat 双击执行后的【服务器信息】里配置。
(2) 如果开发工具卡死强制关闭、重复启动也有可能出现这种情况，注意检查一下。

### 5.2 环境启动一直卡在ESA Server starting

![bb68c3751c4b08aeee53c7cd867eeb8.jpg](https://nccdev.yonyou.com/shareThumbnail?shareId=ZVyQP6ZqQfM&fid=362980571096159&width=1200&height=800&type=min)

***解决方法：*** home\bin\sysconfig.bat双击执行后检查【服务器信息】里配置。
读取后正确的应该为下面的单服务器，如果是选择了集群服务器可能会出现该问题。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=GeBbO0tFQE&fid=362980571096160&width=1200&height=800&type=min)

### 5.3 修改端口号不生效，无论怎么修改，服务启动时始终是80端口。

**解决方法：** 【服务器名称】设置了名字，本地开发时应设置为server，见下图。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=B2prsuIBSzA&fid=362980571088652&width=1200&height=800&type=min)

如果使用开发工具起服务，可以在启动参数里面指定启动端口：`-Dnc.http.port=8090`

### 5.4 登陆时提示“非法登陆”

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=RNqqV3w4TxQ&fid=362980571089112&width=1200&height=800&type=min)
**解决方法：** 浏览器地址栏localhost改成127.0.0.1

### 5.5 登陆时提示“安全日志数据源异常，请联系环境管理员处理”

![627f537f89dd2b8a761c9b207ce7b0e.png](https://nccdev.yonyou.com/shareThumbnail?shareId=H42hCCUISu8&fid=362980571090587&width=1200&height=800&type=min)
**解决方法：**
（1） 检查home\bin\sysConfig.bat 配置工具有没有配置安全日志数据源。左侧的页签数据源、安全日志数据源配置完成后需要重启服务验证。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=TJbrlGhgQis&fid=362980571090588&width=1200&height=800&type=min)

（2）登陆页面按F12打开浏览器控制台，如果出现如下报错信息
![5631e0a79030e88f2b20597967a002b.jpg](https://nccdev.yonyou.com/shareThumbnail?shareId=FAKccv1Sf8&fid=362980571096161&width=1200&height=800&type=min)
原因是登陆页面打开时会有登陆初始化过程，初始化后台报错但是后台使用try...catch把异常信息吃掉了，导致部分字段信息丢失。可以到nccloud.web.riart.login.action.LoginInitAction类的processRSA方法 跟代码解决。

这里介绍一个常见的场景，如下图所示执行RSAUtilsFromDB.getRSAPublicKey时报错，原因是jar包冲突导致。正常的应该是使用external/lib下的commons-codec里面的Hex类，实际可能跟别的jar冲突（有多个org.apache.commons.codec.binary.Hex类），走了其他jar包里面类导致问题。只需要调整项目里面.classpath先后顺序，重新启动项目即可，如果有额外添加的jar包需要认真检查删除不用的jar包。

![02d6ae5284f57273f71dd93d87e4ad7.jpg](https://nccdev.yonyou.com/shareThumbnail?shareId=H3UrG4tuSLo&fid=362980571096162&width=1200&height=800&type=min)
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=WkqopwBjQy4&fid=362980571096163&width=1200&height=800&type=min)

（3）如果排除了1、2两种情况。按照下面方法解决：

先到数据库里面把 sm_securitylogname、sm_securitylog_strategy、sm_init_data**这几张表做一下备份**，然后把sm_init_data表从数据库drop掉。

用记事本打开sysConfig.bat脚本。在如下位置加入命令：

```bat
REM  这里设置JAVA_HOME使用home里的ufjdk
REM  根据自己home的位置自行调整
set JAVA_HOME=D:\devsoft\21NCC2105\ncchome_0710\ufjdk
```

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=fDP81FUZQuc&fid=362980571090589&width=1200&height=800&type=min)

保存后再次打开sysConfig.bat配置工具，左侧选择安全日志数据源，可以看到初始化数据源按钮可用，点击初始化。然后重启NCC服务。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=e7fmKGLzTBA&fid=362980571090590&width=1200&height=800&type=min)

### 5.6 超级管理员登陆提示：“nc.bs.framework.tool.config.upgrade.ConfUpgradeXML” 或者日志提示“nc/bs/framework/tool/config/upgrade/ConfUpgradeXML”

**解决方法：** 一般是本地开发环境登陆超级管理员的时候报的错。原因是类找不到，ConfUpgradeXML是云原生环境里面用到的，一般的单机环境用不到这个类。先检查home\ierp\bin\nativeconfig\runningOnCloud.properties 里面值是否为false，如果是true改为false。如果检查没有问题则打开nccloud.web.riart.login.action.LoginInitAction检查doAction方法，this.init()加判断处理：

```java
// 是否登录系统管理
String isAdmin = requestDto.get("isAdmin");
/**
* 云原生才走
*/
if ("true".equals(isAdmin)&&RuntimeEnv.getInstance().isRunningOnCloud()){
    this.init();
}
```

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=3a0kfbLGSNo&fid=362980571090591&width=1200&height=800&type=min)

### 5.7 页面提示“抱歉，您请求的页面出错啦！”

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=ddtjvhWT2c&fid=362980571089115&width=1200&height=800&type=min)
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=yGdDYE5mRb4&fid=362980571089116&width=1200&height=800&type=min)
**解决方法：**
(1)如果是在地址栏里面输入[http://localhost:3006/nccloud](javascript:void(0)) 地址后提示，说明没有使用正确的启动参数，启动参数里面需要有 `-Duap.hotwebs=nccloud,fs`。在hotwebs文件夹下有多个web工程，如果需要起哪个服务，就把哪个配进去，例如fs是文件服务。

(3)如果配置了启动nccloud 依然报错，检查启动服务过程有没有报错，必须先解决报错的问题。

(4) 如果是在打开某个节点时报的错，说明地址栏里面端口是后端的端口，没有使用前端工程的端口。正确的做法应该搭建前端工程，浏览器访问时使用前端配好的端口。

(5) **如果不修改前端界面，只开发后端**，可以按下面方法解决，浏览器访问时使用后端的端口即可：

这里以人员节点为例，如果鼠标右键->检查元素可以找到 `<iframe fieldid="main_iframe" id="mainiframe" frameborder="0" scrolling="0" src="/uapbd/psninfo/psndoc/main/index.html" style="width: 100%; height: 100%;"></iframe>`，把src=""这段改成"/nccloud/resources/uapbd/psninfo/psndoc/main/index.html"，加上/nccloud/resources这个时候就能访问了。

还有一个办法就是启动参数里面添加一句`-Dnc.HomeFront=true` ，这样打开界面时会自动修改路径走home里面的页面，需要NCC2111版本及更高版本有效（如果需要修改前端界面时注意不要加这个参数：防止走home里面代码前端修改不生效）。

### 5.8 使用deploy部署时报错，提示FileNotFoundException: .\hotwebs\nccloud\WEB-INF\extend\yyconfig\modules\hrpub\refer\config\action\refer_hrpub.xml

![211495d805c2f32f6d86a86325c1b2a.png](https://nccdev.yonyou.com/shareThumbnail?shareId=mdvOeAamQBg&fid=362980571088715&width=1200&height=800&type=min)
**解决方法：** 部署工具问题，换工具包： [https://pan.yonyou.com/web/share.html?hash=mJ0LpdY6TU8](javascript:void(0))

### 5.9 Component: xxxxxxx,Detail Message: The tx component: xxxxxxx is not found in jndi please deploy it!} jndiName: xxxxxxx meta: null

其中xxx是接口类路径，例如下面截图。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=hLDOtiQ4&fid=362980571088709&width=1200&height=800&type=min)
**解决方法：** 接口的upm文件没有部署。检查方法：

(1) 将upm文件放到home\modules\模块\META-INF\ 文件夹里面，重启后台服务即可。

(2) 如果是新开发的一个模块，检查home\modules\模块\META-INF\module.xml，**有没有module.xml，路径模块名称是否英文字符全部小写**。文件内容格式如下

```xml
<?xml version="1.0" encoding="gb2312"?>
<module name="模块名"> <!-- 这里模块名要对应上，英文全小写 -->
    <public>
    </public>
    <private>
    </private>
</module>
```

确定有module.xml文件后，在home\bin\sysconfig.bat->部署->模块全选后部署，重启服务即可。

(3)如果是本地开发工具启动的服务，有一点需要注意的，开发工具windows->Preference（或者首选项）->NC Cloud集成开发->模块选择。
也就是配置数据源的界面，对应有多个页签其中有个模块选择，自己的upm在哪个模块下就要把对应的模块勾上。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=PmF8x0q0Tbk&fid=362980571089298&width=1200&height=800&type=min)

(4) upm文件内容不符合格式要求、类路径填写错误，需要认真检查。

(5) Service接口或ServiceImpl类有错误、类找不到或者ServiceImpl使用了有参构造函数却没提供无参构造函数等情况也有可能引发该种情况。可以到**nclogs\server\serverstart-log.log**里进行排查，建议先把原来的日志备份后删除，重启服务避免以往日志影响分析。

这里举一个例子，看下面一段取自serverstart-log.log的日志：

```
$$ts=2022-01-08 19:26:34  $$msg=###开始部署模块::lcdp 
$$ts=2022-01-08 19:26:34  $$msg=info: module=lcdp, error at D:\devsoft\20codefactory\20210910\modules\lcdp\META-INF\msagg1to0_mastervo.upm <module/public/component/interface>, catch root <module/public/component> 
java.lang.ClassNotFoundException: nc.itf.lcdp.msagg1to0.mastervo.IQuery21ForAGGXZC10
	at java.net.URLClassLoader.findClass(URLClassLoader.java:382) ~[?:1.8.0_202]
	at java.lang.ClassLoader.loadClass(ClassLoader.java:424) ~[?:1.8.0_202]
	at nc.bs.framework.loading.ModulePrivateClassLoader.loadClass(ModulePrivateClassLoader.java:92) ~[fwserver.jar:?]
```

从日志可以看到有部署模块lcdp，指出对应的upm文件是msagg1to0_mastervo.upm，错误原因是nc.itf.lcdp.msagg1to0.mastervo.IQuery21ForAGGXZC10类找不到，所以我们就该去检查这个类有没有，为什么没有找到。如果没有对应upm文件的报错，则应该检查有没有`###开始部署模块::xxxx`字样，如果没有说明没有部署该模块，需要参考前面几条解决方法。

### 5.10 前台报错 “ 找不到活动名：xxx/xxx/xxx所对应的处理类 ”

**解决方法：** 一般报错的类为nccloud.framework.web.action.define.ActionResource，表明没有找到该请求对应路径的action配置文件。

(1)如果是自己客开的action，检查是否放了action配置文件，文件格式是否符合xml格式要求，配置文件内容有误也可能会加载不到action配置。

(2)action xml的放置路径是否正确，正确的应该为home\hotwebs\nccloud\WEB-INF\extend\yyconfig\modules\模块\组件\config\action\xxxxx.xml

(3)如果是标准产品里面的action(即系统自带action不是客开的)，则检查有没有对应的action配置，可以使用notepad++ 搜索-在文件中查找功能，搜索内容把路径里面的/替换成.

例如果报错提示路径为platform/gzip/switch则搜索内容为platform.gzip.switch，文件类型为*.xml，搜索路径home\hotwebs\nccloud\WEB-INF\extend\yyconfig\modules 如下图所示：
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=xTODWzgSZI&fid=362980571089912&width=1200&height=800&type=min)
如果找不到说明没有用depoly工具进行部署，因为使用deploy工具部署时除了会移动jar包外还会解压jar包里面的yyconfig，即action配置和鉴权配置。解决方法是把home\external\lib里面ui开头的jar包放回原来位置（即home\hotwebs\nccloud\WEB-INF\lib），注意关闭服务及开发工具防止文件占用然后使用部署工具（[https://pan.yonyou.com/web/share.html?hash=mJ0LpdY6TU8）重新部署一下，部署完成记得重启服务。](javascript:void(0))

(4)放完action配置文件后需要重启服务才能生效。

(5) action配置文件路径需要有action字符串，但是路径及文件名称不要带有“freedef”、“userdef”、“authorize”等字符串。

```
系统中是根据路径中包含action，就会匹配到ActionConfigReader。包含freedef->FreedefConfigReader。包含userdef->UserdefConfigReader。包含authorize->AppAuthenticationConfigReader
```

所以检查配置文件路径。

### 5.11 应用编码 xxxxxx 以及其根应用编码 xxxxxx 没有该操作的业务权限 xxxx/xxx/xxxAction

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=igLPAAy2RM0&fid=362980571088707&width=1200&height=800&type=min)
**解决方法：**

(1)这种错误一般是没有放鉴权文件，或者请求路径和鉴权文件配置的不一样。路径：home\hotwebs\nccloud\WEB-INF\extend\yyconfig\modules\对应的模块\组件\config\authorize\xxx.xml里面。

(2) 如果放了配置文件，则检查配置文件内容是否符合xml规范，检查路径是否正确。下面是正确的鉴权配置示例：

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<authorizes>
  <authorize>
  	<appcode>90H30199</appcode><!-- 应用编码，多个用英文逗号分割，可以用*表示所有应用都有权限 -->
  	<actions>
<action>cfgnkf.cfinterviewermanage.ListCfinterviewermanageHVOAction</action>
       <action>cfgnkf.cfinterviewermanage.DeleteCfinterviewermanageHVOAction</action>
	</actions>
   </authorize>
</authorizes>
```

(3) 检查action请求路径 是否和其他的配置文件冲突了，例如截图的路径为cfgnkf/cfinterviewermanage/ListCfinterviewermanageHVOAction，则使用notepad++ 搜索->在文件中查找-> 查找目标为 cfgnkf.cfinterviewermanage.ListCfinterviewermanageHVOAction（即路径里的斜线"/"换成点"."），文件类型*.xml，搜索路径home\hotwebs\nccloud\WEB-INF\extend\yyconfig\modules，搜索不到说明没有放鉴权，如果搜到多个注意是鉴权还是action配置，正常情况搜索结果是一个action一个authorize鉴权配置，如果搜索到了多个鉴权则可能是冲突了。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=ojfIZKg9QHc&fid=362980571089915&width=1200&height=800&type=min)

(4) 放完鉴权配置文件还需要重启服务。

(5) 鉴权文件路径、文件名称不要带有“action”字符串。

```
系统中是根据路径中包含action，就会匹配到ActionConfigReader。包含freedef->FreedefConfigReader。包含userdef->UserdefConfigReader。包含authorize->AppAuthenticationConfigReader
```

所以鉴权文件路径不要带action等特殊字符串否则会导致匹配错误。

### 5.12 开发工具启动服务报错：找不到或无法加载主类

**解决方法：** （1）一般新搭建环境或者更换home的时候会出现这个问题。重启开发工具，更新类路径。确保工程里面能够引用到下面截图的类库。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=GCInoUMkRac&fid=362980571089131&width=1200&height=800&type=min)

更新类路径方式：项目工程右键->NC Cloud Tools(不同版本工具可能不一样)->update classpath

（如果检查发现有的项目有更新类路径，有的项目找不到更新类路径，可以参考本文档“项目右键找不到更新类路径”问题解决方法。）

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=dosHDRNTyk&fid=362980571089132&width=1200&height=800&type=min)

（2）如果重启开发工具、更新类路径后依然有问题，尝试更使用home里的ufjdk，或者更换其他版本jdk（设置启动jdk如下图所示）。另外就是注意JRE home路径是全英文没有空格的，**VM arguments也是空的具体见下图（路径、VM arguments这条要重点检查）**。

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=z0C2pslsSEQ&fid=362980571099143&width=1200&height=800&type=min)

### 5.13 项目右键Debug As找不到启动入口“NC Cloud中间件服务器”，项目右键找不到更新类路径。

**解决方法：** 按下图方法项目上右键->properties->Project Natures找一下有没有下图的特性，如果没有点Add添加一下。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=a2FuQuIzT5c&fid=362980571089324&width=1200&height=800&type=min)

### 5.14 启动环境时报错nccloud.framework.web.action.entry.NCCloudContextListener

严重: 异常将上下文初始化事件发送到类的侦听器实例.[nccloud.framework.web.action.entry.NCCloudContextListener]
java.lang.NullPointerException
at nccloud.framework.core.config.ResourceInitor.load(ResourceInitor.java:38)
at nccloud.framework.core.config.ConfigCacheServer.load(ConfigCacheServer.java:52)
at nccloud.framework.web.action.entry.NCCloudContextListener.contextInitialized(NCCloudContextListener.java:32)
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=khjz0T7NRGY&fid=362980571088630&width=1200&height=800&type=min)
**解决方法：** **注意，这里是报的空指针错误，提示的是NullPointerException**。问题原因是 home\hotwebs\nccloud\WEB-INF\lib 被删除，用工具deploy挪完包后，lib文件夹不能删掉，否则就会报上面的错误。如果是ClassNotFoundException见下一个问题。

### 5.15 服务启动时报错：严重：配置应用程序监听器[nccloud.framework.web.action.entry.NCCloudContextListener]错误

java.lang.ClassNotFoundException:nccloud.framework.web.action.entry.NCCloudContextListener
at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1279)
at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1104)
![1641210141(1).jpg](https://nccdev.yonyou.com/shareThumbnail?shareId=mipYi5pdSBU&fid=362980571089271&width=1200&height=800&type=min)
**解决方法：** **注意，这里是报的类找不到，提示的是ClassNotFoundException**。确认是问题ClassNotFoundException原因是类找不到，这个类在pubplatform_baseLevel-1.jar里面，一般测试服务环境在home\hotwebs\nccloud\WEB-INF\lib 下，搭建本地开发环境时会被移动到home\external\lib 下，应该先确保环境里有这个jar包且jar包里面有这个类。如果本地开发用工具deploy引起的问题的话，关闭服务关闭开发工具，重新打开并重启后端服务。

如果提示的是NullPointerException，处理方法见上个问题。

### 5.16 服务启动时报错：Provider org.apache.xerces.jaxp.DocumentBuilderFactoryImpl not found

详细报错日志如下：

```
Caused by: javax.xml.parsers.FactoryConfigurationError: Provider org.apache.xerces.jaxp.DocumentBuilderFactoryImpl not found
	at javax.xml.parsers.FactoryFinder.newInstance(FactoryFinder.java:200)
	at javax.xml.parsers.FactoryFinder.newInstance(FactoryFinder.java:152)
	at javax.xml.parsers.FactoryFinder.find(FactoryFinder.java:232)
	at javax.xml.parsers.DocumentBuilderFactory.newInstance(DocumentBuilderFactory.java:120)
....//省略部分
Caused by: java.lang.ClassNotFoundException: org/apache/xerces/jaxp/DocumentBuilderFactoryImpl
```

**解决方法：**
home里面找不到DocumentBuilderFactoryImpl 这个类，一般是NCC2111版本报的错。2111版本基于安全问题删掉了一些类。启动参数上做了调整。用下面的启动参数(参考文档：[https://nccdev.yonyou.com/article/detail/495](javascript:void(0)) )：

```properties
-Dnc.exclude.modules=${FIELD_EX_MODULES}
-Dnc.runMode=develop
-Dnc.server.location=${FIELD_NC_HOME}
-DEJBConfigDir=${FIELD_NC_HOME}/ejbXMLs
-Dorg.owasp.esapi.resources=${FIELD_NC_HOME}/ierp/bin/esapi
-DExtServiceConfigDir=${FIELD_NC_HOME}/ejbXMLs
-Xms256M -Xmx1024M -XX:NewSize=256M 
-Duap.hotwebs=nccloud,uapws,fs 
-Duap.disable.codescan=false 
-Djavax.xml.parsers.DocumentBuilderFactory=com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl 
-Djavax.xml.parsers.SAXParserFactory=com.sun.org.apache.xerces.internal.jaxp.SAXParserFactoryImpl 
-Dfile.encoding=UTF-8
-Duser.timezone=GMT+8
```

### 5.17 后端报错nccloud.framework.core.exception.BusinessException: Illegal key size

详细报错堆栈：

```
严重: 在路径为[/nccloud]的上下文中，servlet[springServlet]的Servlet.service()引发异常
nccloud.framework.core.exception.BusinessException: Illegal key size
	at nccloud.framework.core.exception.ExceptionUtils.wrapBusinessException(ExceptionUtils.java:82)
	at nccloud.framework.web.container.AESUtil.encrypt(AESUtil.java:85)
	at nccloud.framework.web.container.Response.verifyAES(Response.java:200)
	at nccloud.framework.web.container.Response.write(Response.java:73)
	at nccloud.framework.web.action.entry.ResponseProcess.writeJson(ResponseProcess.java:201)
	at nccloud.framework.web.action.entry.ResponseProcess.process(ResponseProcess.java:69)
	at nccloud.framework.core.filter.EntryLeaveFilter.doFilter(EntryLeaveFilter.java:68)
	at sun.reflect.GeneratedMethodAccessor227.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.apache.catalina.security.SecurityUtil$1.run(SecurityUtil.java:282)
	at org.apache.catalina.security.SecurityUtil$1.run(SecurityUtil.java:279)
	at java.security.AccessController.doPrivileged(Native Method)
	at javax.security.auth.Subject.doAsPrivileged(Subject.java:549)
	at org.apache.catalina.security.SecurityUtil.execute(SecurityUtil.java:314)
	at org.apache.catalina.security.SecurityUtil.doAsPrivilege(SecurityUtil.java:253)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:191)
	at org.apache.catalina.core.ApplicationFilterChain.access$000(ApplicationFilterChain.java:47)
	at org.apache.catalina.core.ApplicationFilterChain$1.run(ApplicationFilterChain.java:149)
	at org.apache.catalina.core.ApplicationFilterChain$1.run(ApplicationFilterChain.java:145)
	at java.security.AccessController.doPrivileged(Native Method)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:144)
	at nccloud.framework.core.filter.HostFilter.doFilter(HostFilter.java:48)
	at sun.reflect.GeneratedMethodAccessor227.invoke(Unknown Source)
....//省略部分内容
```

**解决方法：** 服务启动时JDK使用home里面的ufjdk

### 5.18 打开登陆页面报错：can not find datasource: xxxx

![85fa24523b92c90051c339712f9590c.png](https://nccdev.yonyou.com/shareThumbnail?shareId=lky62XujQP4&fid=362980571090841&width=1200&height=800&type=min)
**解决方法：** 原因是找不到账套对应的数据源。根据情况如果是本地开发模式（使用开发工具起的服务）清除浏览器缓存，登陆账套选择开发账套；如果是测试环境（使用startup.bat起的服务）需要在sysConfig.bat配置界面上选择数据源->添加数据源，数据源编码与报错提示编码一致，例如截图提示的是nccxy则添加的数据源编码为nccxy

### 5.19 如何配置用户session会话时长

**解决方法：** NCC 用户会话时长在home\ierp\bin\session.xml里面配置，expireTime配置小于等于0时取消自动注销。
重量端的在home\bin\sysconfig.bat 双击执行后配置工具->其他配置->系统配置->系统基础配置。

### 5.20 root管理员账号被锁、超级管理员登录不上去解决方法

**解决方法：** `update sm_super_user set password='U_U++--V93f182df06984208361b9689a94416ec' where admcode ='root';`

超级管理员表sm_super_user
密码字段是password

root密码为空的值` U_U++--V93f182df06984208361b9689a94416ec`
super密码为空的值 `U_U++--V316a223e0a2381c992955a97f5734f8f`
把对应账号的值在数据库改一下，登录的时候密码就是空，点登陆即可。

### 5.21 ncc用户被锁ncc解锁用户后台

**解决方法：** 如果有其他用户可以正常登陆，到【用户】节点，找到对应用户解锁即可，如果找不到可以执行下面脚本，用户主键为用户表sm_user对应要解锁用户的主键。
`DELETE FROM sm_user_ex WHERE user_id = '用户主键' and exstatuscode in ( '1', '2' )  `

### 5.22 ncc用户密码如何加密？如何校验密码？

**解决方法：** 如果有需求可以参考nc.vo.uap.rbac.util.RbacUserPwdUtil类里面的checkUserPassword方法。参数UserVO user用户vo， String expresslyPWD待校验明文密码。

### 5.23 重量端登陆提示“密码级别文件遭篡改，详细请查看日志”

**解决方法：** home\ierp\bin\passwordsecurityconfig.xml 把这个文件删除

### 5.24 附件文件上传提示“上传文件不满足格式限制”

![6d1edfb52b852e72af269a8bf659f52.png](https://nccdev.yonyou.com/shareThumbnail?shareId=3Kz7Zg7zQUM&fid=362980571088708&width=1200&height=800&type=min)
**解决方法：** 用系统管理员登录---->全局参数---->找到 附件类型 参数 把需要的类型加上去

### 5.25 如何能获取附件的URL？

**解决方案：**
问这个问题的小伙伴还挺多的，其实获取的方法很简单。如果是单据附件管理上传的文件，一般都是在文件服务器里（通过sysconfig配置）。打开一个单据点击附件管理的下载按钮到uap.pub.fs.client.RestFileTransfer类里面跟一下代码就可以看到downloadFile里面调用了一个方法获取文件url，这个url就是需要的[http://xxxx](javascript:void(0)) URL路径 ，如下图所示：

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=3WjKG4iRE&fid=362980571088989&width=1200&height=800&type=min)

所以我们只要调 `uap.pub.fs.client.UfsHostURI.getRestfulURI(bucket, filePath, VERSIONNO + "=" + version)` 这段代码就可以了。
参数说明：
bucket：文件服务的模块，对应bap_fs_header里面的module，如果是单据附件填nccloud.pubitf.platform.attachment.IFileStorageConst.Bucket 即 "uapattachroot"，不过文件服务器里面存的可不止单据附件，例如导入导出、业务消息等也有文件存文件服务器，如果不是单据附件管理里面的文件可以到bap_fs_header里面查一下。
filePath：文件路径，是个uuid，对应bap_fs_header里面的path。
version：文件版本，可以是null或填versionno=0 .

本地开发环境下注意启动参数要启动fs文件服务`-Duap.hotwebs=nccloud,fs`

附一下获取文件服务器文件信息的sql：
1.查询附件节点信息：select * from sm_pub_filesystem where filepath = '单据主键' or filepath like '单据主键/%'

2.查询文件信息：select * from bap_fs_header where path = sm_pub_filesystem.pk_doc

3.查询文件路径：select storepath from bap_fs_body where headid = bap_fs_header.guid

### 5.26 部署出错，hotwebs下没有找到相应的配置文件

**解决方法：**
1、检查有没有配置文件服务器，**尤其是ip、端口检查配置是否正确**

2、检查启动参数里面有没有启动文件服务系统：`-Duap.hotwebs=nccloud,fs,uapws` 注意有个fs，这个就是文件服务系统，修改完成后要重启后端服务。

### 5.27 如何更改登录页logo？如何更改导航栏logo？如何配置重量端的颜色主题？

**解决方案：**
（1）轻量端：
登录页logo替换路径： home\hotwebs\nccloud\resources\uap\public\img\logo.png

登陆的背景图：home\hotwebs\nccloud\resources\uap\public\img\background.jpg

登陆后工作界面上方默认主题logo替换路径：home\hotwebs\nccloud\resources\workbench\public\common\main\images\Group.png

1909及2005版本工作界面的logo还要替换路径： home\hotwebs\nccloud\resources\workbench\public\common\main\images\GroupWhite.png

（2）重量端：
登陆界面的LOGO，替换的home路径是：home\resources\themeroot\blue\themeres\login\logo.png其中路径中的blue为当前使用的主题。

登陆界面右下角的yonyou标志，路径是：home\resources\themeroot\blue\themeres\login\yonyou.png其中路径中的blue为当前使用的主题。

登陆后左上方的LOGO，替换的home路径是：
home\resources\themeroot\blue\themeres\control\desktop\logo.png

路径中的blue为当前使用的主题，系统预置了四种主题blue、gray、green、red
如果要修改使用的主题，可以修改配置文件\ierp\sf\ themeconf.xml

### 5.28 打开节点提示“该模块未购买！”或者提示该产品用户的数已达到产品授权数！ 客开模块授权问题。

![1.png](https://nccdev.yonyou.com/shareThumbnail?shareId=6Pk5aXhnR3E&fid=362980571089204&width=1200&height=800&type=min)
**解决方法：**
（1）如果是本地开发，用开发工具起的服务，说明启动参数有问题。启动参数里面有`-Dnc.runMode=develop`设置环境启动模式为开发模式。

(2)如果是客开的模块，模块编码、应用编码第三位应该为大写H，避免占用授权（这里说的模块编码和应用编码是指应用注册的模块编码和应用编码）。
参考nc.mddb.cil.tool.CilTookit（有些版本是nc.impl.uap.busibean.cil.LicenseToolKit）校验方法，应该不止大写H。

```java
public static boolean isNonLicenseProduct(String code) {
    boolean b = false;
    if (code != null && code.length() >= 4) {
        String str = code.toUpperCase();
        char ch = str.charAt(2);
        b = ch == 'H' || ch == 'L' || ch == 'R' || ch == 'J' || ch == 'K';
    }
    return b;
}
```

(3) 如果是测试环境或者正式环境上报错，检查sysconfig里面的授权导入，可以把bin\license删除掉重新导入。（用户授权占用数据会保存至数据库表LIC_USEROCCUPY，授权数量来自license文件，如果多个home共用一个数据库时会导致授权数量不足，测试环境的话可以尝试集团管理员登陆到【授权使用监控】节点清理）

### 5.29 登陆页面提示“ncHome is null,pls set ncHome value.”

![2.png](https://nccdev.yonyou.com/shareThumbnail?shareId=Lswxl6rRU&fid=362980571089205&width=1200&height=800&type=min)
解决方法：检查启动参数，启动参数里面有一条-Dnc.server.location=${FIELD_NC_HOME} 用来指定home的路径。同时需要设置FIELD_NC_HOME参数。
启动参数：

```properties
-Dnc.exclude.modules=${FIELD_EX_MODULES} 
-Dnc.runMode=develop
-Dnc.server.location=${FIELD_NC_HOME} 
-DEJBConfigDir=${FIELD_NC_HOME}/ejbXMLs 
-DExtServiceConfigDir=${FIELD_NC_HOME}/ejbXMLs 
-Duap.disable.codescan=false 
-Djavax.xml.parsers.DocumentBuilderFactory=org.apache.xerces.jaxp.DocumentBuilderFactoryImpl
-Djavax.xml.parsers.SAXParserFactory=org.apache.xerces.jaxp.SAXParserFactoryImpl -Xms128M -Xmx512M 
-XX:NewSize=96M 
-XX:MaxPermSize=256M 
-Dorg.owasp.esapi.resources=${FIELD_NC_HOME}/ierp/bin/esapi
-Duap.hotwebs=nccloud,fs
-Dfile.encoding=UTF-8
-Duser.timezone=GMT+8
```

![3.png](https://nccdev.yonyou.com/shareThumbnail?shareId=6n60DUzMQq8&fid=362980571089206&width=1200&height=800&type=min)

### 5.30 登陆时如何打开或者取消登陆的校验码

![4.png](https://nccdev.yonyou.com/shareThumbnail?shareId=GrYHBLCPTBo&fid=362980571089207&width=1200&height=800&type=min)
**解决方法：** 使用系统管理员登录，在系统参数设置-全局中，进行验证码和手机找回密码的设置，默认为否，见下图。(更多相关参数配置可以参考应用方案手册-公共工作平台，关于验证码是怎么生成的，感兴趣的可以到nccloud.web.riart.login.action.LoginRandAction跟一下代码)
![5.png](https://nccdev.yonyou.com/shareThumbnail?shareId=yes6KosTdk&fid=362980571089208&width=1200&height=800&type=min)

### 5.31 登陆时验证码出不来，登录报错 cn/hutool/captcha/LineCaptcha 或者 cn.hutool.captcha.LineCaptcha

![下载.jpg](https://nccdev.yonyou.com/shareThumbnail?shareId=rySbPYGRTew&fid=362980571090842&width=1200&height=800&type=min)
**解决方法：**

参考文档：[https://nccdev.yonyou.com/article/detail/473](javascript:void(0))

（本地开发情况下建议关闭验证码：`update pub_sysinit set value='N' where initcode='randomimg'` ）

### 5.32 根据名称空间和实体名称无法查询到相应的组件!需要检查模型查看是否此类型已被删除!名称空间:baseapp, 实体名称:workbench

![6.png](https://nccdev.yonyou.com/shareThumbnail?shareId=rWGmnvH3QXE&fid=362980571089209&width=1200&height=800&type=min)

**解决方法：** 这个报错是说找不到对应的元数据，报错所说的【名称空间】对应md_component表的namespace，对应元数据视图上点空白地方属性中的名称空间。【实体名称】对应md_class里面的name，对应元数据上点击某一个实体的名称。根据这个可以去数据库里面查一下有没有这个元数据，如果有则需要重启后台服务。查询sql：
`SELECT * FROM md_component  WHERE namespace = 'baseapp' AND id IN (  SELECT DISTINCT componentID FROM md_class WHERE name = 'workbench' ) AND  industry = '0'`
（1）如果是登陆后打开首页就报错，一般是home的版本和数据库的版本不一致导致的，应该使用版本匹配的数据库。（可能出现新的疑问就是如何确认home版本和数据库的版本？一般产品安装的时候每个领域都有自己的版本号，包括平台也是。例如截图的是baseapp模块的，在home\ncscript\ria\baseapp\ setup.ini找到这个文件后可以找到相应配置说明：

```
#编码
code=100001
#名称
name=baseapp
#版本号
version=NC Cloud 2021.1120210913155858
```

根据version就可以确定版本是NC Cloud 2021.11版本的。同时也拿到产品号即编码100001，从数据库里面执行`select note,productcode,version from sm_product_version where productcode='100001' `就可以知道数据库的版本。）

（2）如果是自己的节点打开报错，说明元数据不存在或者元数据已经修改，检查数据库里面是否正确，检查对的VO方法getMetaData()等等。可以按下面sql语句排查是否发布进入库里面：`SELECT * FROM md_component  WHERE namespace = '报错提示的名称空间' AND id IN (  SELECT DISTINCT componentID FROM md_class WHERE name = '报错提示的实体编码' ) AND  industry = '0'`

（3）如果是医疗行业版本的home，修改一下home里面的配置文件home/ierp/bin/industry_config.xml，belongNCIndustryCode改成48并重启后台服务，**如果不是医疗行业home不要修改**

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=5rYDt76vRvg&fid=362980571102631&width=1200&height=800&type=min)

### 5.33 登陆报错，no token seed 或者 invalid secrity token(null)

![7.png](https://nccdev.yonyou.com/shareThumbnail?shareId=ig79GNNWTgQ&fid=362980571089210&width=1200&height=800&type=min)
**解决方法：** 令牌种子没有配置或被人为修改。到home\bin\sysconfig.bat左侧选“系统配置”。右侧点“安全”。读取保存或重置一下。
![8.png](https://nccdev.yonyou.com/shareThumbnail?shareId=5gHHMF1TKY&fid=362980571089211&width=1200&height=800&type=min)

### 5.34 前端报错数据不能解析（解压或解密）

![9.png](https://nccdev.yonyou.com/shareThumbnail?shareId=b3G7o9LJRg4&fid=362980571089212&width=1200&height=800&type=min)
请求参数解压缩出错，关掉页面清除浏览器缓存，重新打开登陆。或者关闭流量压缩home\hotwebs\nccloud\WEB-INF\config\miscellaneous.xml全部改为false，JDK设置为home里面的ufjdk，重启服务。

### 5.35 开发工具没有启动客户端入口，怎么启动重量端界面？

**解决方法：**
参考下面截图的方法及步骤。

```
项目：选择自己的nc或ncc项目。
启动类：
nc.starter.test.JStarter
启动参数：
-Dnc.exclude.modules=${FIELD_EX_MODULES}
-Dnc.runMode=develop
-Dnc.server.location=${FIELD_NC_HOME}
-DEJBConfigDir=${FIELD_NC_HOME}/ejbXMLs -DExtServiceConfigDir=${FIELD_NC_HOME}/ejbXMLs
-Xmx768m -XX:MaxPermSize=256m
如果variables配置了FIELD_CLIENT_IP和FIELD_CLIENT_PORT,界面依然出现can't connect to server,please wait. 上面的启动参数里面加入服务端口号。
-Dnc.jstart.port=8080
 
```

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=iyKmylJKQPY&fid=362980571089317&width=1200&height=800&type=min)
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=LOSKyRy3SH0&fid=362980571089318&width=1200&height=800&type=min)

### 5.36 配置数据源测试报错：java.sql.SQLRecoverableException: IO错误: Undefined Error!

**解决方法：** 问题原因是windows账户名是中文导致，按照下面步骤解决：
在“运行（win+R）”里面输入“control userpasswords2”，弹出窗口，选中用户名，点击属性并修改下全名使用英文。**修改后重启计算机生效**。

修改完成后可以到任务管理器->用户检查是否修改生效。

### 5.37 后端启动时报错：Init datasource error [design] can not get connection,please check the DBSet

**解决方法：** 检查数据源是否测试通过。如果测试通过需要检查数据库驱动版本是否匹配，可以先把home\nclogs\server\文件夹底下的日志清空，启动服务输出数据源初始化报错后到home\nclogs\server\serverstart-log.log检查报错原因。如果是协议不匹配一般是数据库驱动版本导致，例如数据库是Oracle19c可以到home\driver\oracle_19c\ojdbc6.jar，把对应jar包替换home\lib\ojdbc6.jar，其他情况类似。home服务启动时使用的是home\lib文件夹下面对应版本驱动包。

### 5.38 报错提示：get connection error!!###design:::u:50:::f:0::::50::::1:::p0

![1673341272683.jpg](https://nccdev.yonyou.com/shareThumbnail?shareId=DebQy5AzTGI&fid=362980571100471&width=1200&height=800&type=min)

**解决方法：** 数据库连接池获取连接的时候报错。报错位置：`uap.mw.ds.UAPDataSource` 方法：getConnection获取不到可用连接时会抛出错误

```java
private String getErrorMsg() {
  return "###" + getDataSourceName() + ":::u:" + getInUsedConnection() + ":::f:" + getFreeConnection() + "::::" + getMaxConnection() + "::::" + getMinConnection() + ":::p" + getPoolConnPermit();
}
```

报错信息的错误含义：`###{数据源编码}:::u:{被占用的连接数}:::f:{空闲连接数}::::{最大连接数}::::{最小连接数}:::p{可用连接数}`

所以如果空闲连接数是0的情况下，一般是数据库连接池的连接被用尽了。此时只需要到sysconfig配置工具把最大连接数调大一点重启服务即可。如下图所示：

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=e8fRmFjRIQ&fid=362980571100475&width=1200&height=800&type=min)

### 5.39 报错提示no column info for: xx_xxxx at datasource: design

**解决方法：** 报错提示的xx_xxxx是一个表名字，说明这个表不存在。如果是客开的表名自己创建一下。如果是标准产品的说明产品安装不正确，最简单的解决方法是换数据库。

### 5.40 起服务报错，控制台提示org.slf4j.LoggerFactory in failed state. 或者提示 nccloud.framework.core.filter.CacheFilter.destroy(CacheFilter.java:33)

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=eg5b9c3LRRg&fid=362980571104596&width=1200&height=800&type=min)

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=1UYIpwy0QDQ&fid=362980571104598&width=1200&height=800&type=min)

**解决方法：** **如果是本地开发环境** 第一步在home/external/lib中添加jar包：log4j-1.2.17.jar(此jar包从2105或2105以前的home中找就可以)
第二步在home/ierp/bin/esapi/ESAPI.properties中添加语句：`ESAPI.Logger=org.owasp.esapi.reference.Log4JLogFactory` 然后更新类路径重启服务。

如果不是本地的开发环境一般是jar冲突导致，删除冲突jar包即可。

## 6 单点登陆

### 6.1 单点登陆后白屏或仍需要密码登陆

**解决方法：** 可以根据以下情况检查：

(1)如果是2005、2105版本的，需要打单点登陆白屏免密码输入的补丁。

(2)如果打了补丁，单点登陆路径里面不要用localhost，应该用127.0.0.1，有些小伙伴把补丁打到home里面了，注意本地开发时hotwebs\nccloud\WEB-INF\classes这里应该是空的，建议可以把类放到自己工程里面。

(3)检查一下用户状态：看用户能否通过登陆界面正常登陆，若用户状态不正常可能出问题。

(4)如果是多账套的话把busicentercode即账套编码传递过去。

### 6.2 单点登陆提示找不到页面：抱歉，您请求的页面出错啦！ 　

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=XxZFk3pQ3Q&fid=362980571089109&width=1200&height=800&type=min)
**解决方法：** 拼接的url错误，检查如果是 [http://ip:port/uap/](javascript:void(0))... 地址应该为[http://ip:port/nccloud/resources/uap/](javascript:void(0))...

### 6.3 NCC单点登录时服务返回401

报错信息：
java.io.IOException: Server returned HTTP response code: 401 for URL: [http://192.168.48.133:9903/service/genThirdPartyAccessToken](javascript:void(0))
at sun.net.[www.protocol.http.HttpURLConnection.getInputStream0(HttpURLConnection.java:1894)](javascript:void(0))
at sun.net.[www.protocol.http.HttpURLConnection.getInputStream(HttpURLConnection.java:1492)](javascript:void(0))

**解决方法：**
原因是home\ierp\sf\nccssoConfig.xml文件中未配置白名单。如下图所示，在listParam里面配置允许访问的客户端ip，注意是客户端ip，不是第三方服务器ip。可以使用*号进行匹配，例如192.168.*.*

如果已经配置了白名单依然报错，尝试删除配置文件的listParam或者把ip地址配置成*.*.*.* 即不校验ip地址。尝试删除sm_oauth_security对应表的client_security。

必要时可以到ncc.sso.bs.DefaultNCCSSOAuthenticator里面跟一下代码。
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=G6CtZTXsRuY&fid=362980571089110&width=1200&height=800&type=min)

### 6.4 单点登陆提示“未找到第三方系统”

**解决方法：** 这个问题在于token的多次使用或token错误。单点登陆的token只能使用一次，用过后就失效了，这点需要注意。

打开类ThirdPartyLoginVerfiyAction，可以找到如下代码：

```java
INCCSSOService nccSSOService = ServiceLocator.find(INCCSSOService.class);
NCCSSORegInfo regInfo = nccSSOService.fetchSSORegInfo(access_token);
if (regInfo == null) {
    result.put(IUserLoginHandler.RSL_Code, IUserLoginHandler.TOKEN_WRONG);
    result.put(IUserLoginHandler.RSL_MSG, "未找到第三方系统");
    return result;
}
```

关于查找token的代码，如果找到源头可以看到，token信息会存在map中，获取后就remove掉了：

```java
public NCCSSORegInfo fetchSSORegInfo(String access_token) {
    return regInfoMap.remove(access_token);
}
```

### 6.5 NCC单点登录用拼好的url地址提示“访问xxxxd 的请求遭到拒绝” 您未获授权，无法查看此网页。 HTTP ERROR 403

![aba8e5fdfba140653d80cb352a70f8b.png](https://nccdev.yonyou.com/shareThumbnail?shareId=hxgChL9QvQ&fid=362980571089111&width=1200&height=800&type=min)
**解决方法：** 问题原因是跨域拦截了。如果打开home\hotwebs\nccloud\WEB-INF\web.xml可以看到有很多的filter配置，也就是说每当有一次向后台的NCC的服务请求时，会按照web.xml里面配置的filter顺序依次进行过滤，只有经过滤筛选符合NCC安全要求的才能进入系统，调用各个业务领域的action代码。包括我们文档前面提到的AppActionAuthorizeFilter也是在这里面配置的。

在filter中有一个nccloud.framework.core.filter.CorsFilter是跨域请求处理的。类里面可以看到它通过`String referer = request.getHeader("referer");` 判断服务请求方。从类里面我们也可以找到对应的 **配置文件为home\hotwebs\nccloud\WEB-INF\corsfilter.properties** ，把配置文件里的referer按逗号分割成数组，只要请求的路径部分包含配置文件里的路径即可。**当然如果用了域名应该配置域名而不是ip，多个之间用英文逗号分割**。参考下面截图：
![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=Dhcx3nI9QFE&fid=362980571090519&width=1200&height=800&type=min)

配置示例如下：

```properties
....//省略部分，如果是80端口一定不要:port
referer=http://IP地址1:port,https://IP地址2:port,http://域名1,https://域名2:port
```

### 6.6 单点登陆token的失效时间是多少？能否配置？

NCC轻量端在home\ierp\sf\nccssoConfig.xml里面配置regTimeout即可，重量端单点token失效时间在home\ierp\sf\ssoConfig.xml的regTimeout。 配置文件初始化的类：ncc.sso.bs.NCCSSOConfigParser
![1.png](https://nccdev.yonyou.com/shareThumbnail?shareId=JnZdg6v8Tas&fid=362980571089213&width=1200&height=800&type=min)

### 6.7 如何通过单点登陆打开某一个节点？

**参考文档** [https://nccdev.yonyou.com/article/detail/207](javascript:void(0))

### 6.8 单点登陆到审批详情后，点返回按钮不起作用，无法返回到列表

手动打开节点看看是否正常，如果手动打开正常但是单点登陆进去不正常说明单点登陆时拼接url错误，检查路径。

### 6.9 连续单点登录，第二次单点登录提示“用户没有登录，即将跳转到登录页面”

**参考文档**： [https://nccdev.yonyou.com/article/detail/974](javascript:void(0))

