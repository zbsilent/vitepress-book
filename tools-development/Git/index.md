# Git

[![](https://img.shields.io/badge/Git-zbsilent-brightgreen)](Https://github.com/zbsilent)

## .gitignore文件无效解决方案

> 使用git CLI命令，在IDEA中是Terminal输入git命令

```text
 git rm -r --cached .（注意空格）
 git add .（注意空格）
 git commit -m "update .gitignore"
```

> 忽略放弃对.classpath对跟踪

```text
git update-index --assume-unchanged .classpath
```



 

## [Commit](https://so.csdn.net/so/search?q=Commit&spm=1001.2101.3001.7020) message 的格式

[这里推荐使用IDEA git-commit-template插件](https://plugins.jetbrains.com/plugin/9861-git-commit-template)

> 每次提交，Commit message 都包括三个部分：[Header](https://so.csdn.net/so/search?q=Header&spm=1001.2101.3001.7020)，Body 和 Footer。

<type>(<scope>): <subject>// 空一行<body>// 空一行<footer> 12

其中，Header 是必需的，Body 和 Footer 可以省略。

不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。

### Header

Header部分只有一行，包括三个字段：type（必需）、[scope](https://so.csdn.net/so/search?q=scope&spm=1001.2101.3001.7020)（可选）和subject（必需）。

**（1）type**

- **feat**：新功能（feature）
- **fix**：修补bug
- **docs**：文档（documentation）
- **style**： 格式（不影响代码运行的变动）
- **refactor**：重构（即不是新增功能，也不是修改bug的代码变动）
- **test**：增加测试
- **chore**：构建过程或辅助工具的变动

如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。

**（2）scope**

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

**（3）subject**

subject是 commit 目的的简短描述，不超过50个字符。

- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
- 第一个字母小写
- 结尾不加句号（.）

### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。
More detailed explanatory text, if necessary. Wrap it to about 72 characters or so. Further paragraphs come after blank lines.- Bullet points are okay, too- Use a hanging indent

有两个注意点。

（1）使用第一人称现在时，比如使用change而不是changed或changes。

（2）应该说明代码变动的动机，以及与以前行为的对比。

### Footer

Footer 部分只用于两种情况。

（1）不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。

BREAKING CHANGE: isolate scope bindings definition has changed.     To migrate the code follow the example below:     Before:     scope: {       myAttr: 'attribute',     }     After:     scope: {       myAttr: '@',     }     The removed `inject` wasn't generaly useful for directives so there should be no code using it. 123456789101112131415161718

（2）关闭 Issue

如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。

Closes *#234* 12

也可以一次关闭多个 issue 。

Closes #123, #245, #992 12

### Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。

revert: feat(pencil): add 'graphiteWidth' option This reverts commit 667ecc1654a317a13331b17617d973392f415f02. 1234

Body部分的格式是固定的，必须写成This reverts commit <hash>.，其中的hash是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。
