# JUC (java.util.concurrent)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/zbsilent/GitBook?color=brightgreen&logoColor=brightgreen)
![node-current](https://img.shields.io/java/v/jdk)



1. 进程/线程 【测试】

2. 并发/并行 


- java.util.concurrent.atomic
- java.util.concurrent.locks 

![image-20220201123757994](/Users/zbsilent/Library/Application Support/typora-user-images/image-20220201123757994.png)

> 一个方法对应一个块栈帧内存区域
>
> javap -c xxx.class 反汇编 字节码反汇编 <kbd>JVM指令手册</kbd>

![image-20220201131527503](/Users/zbsilent/Library/Application Support/typora-user-images/image-20220201131527503.png)![image-20220201134442993](/Users/zbsilent/Library/Application Support/typora-user-images/image-20220201134442993.png)

![image-20220201132228861](/Users/zbsilent/Library/Application Support/typora-user-images/image-20220201132228861.png)

> * 本地方法栈 native 用C/C++实现 GC从下往上的寻找引用 打上标记 非垃圾 可达性非吸算法 minor gc
>
>   Full gc无法回收 就内存溢出了
>
> 程序计数器 放正在运行的方法区的位置即内存地
>
> 其实一直在做压栈出栈操作
>
> 对象在堆里的内存地址 指针
>
> 方法区里放 常量 静态变量 类信息【元空间】
>
> * STW [stop word]停止所有用户线程 进行GC

## 垃圾收集器

-XX.UserSerialGC...

## jvisualvm Arthas 

Visual GC

## 调优工具



