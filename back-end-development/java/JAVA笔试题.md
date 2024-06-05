# java笔试题



## 选择题

1. 如下哪些是java中有效的关键字( D )[单选题]

   A native

   B NULL

   C false

   D this

2. 以下代码输出值是多少( C )[单选题]

   ```java
   public void test(C) {
        int a = 10;
        System.out.println(a++ + a--);
    }
   ```

   A 19

   B 20

   C 21

   D 21

3. 以下关于异常的说法正确的是( D )[单选题]

   Ａ  一旦出现异常，程序运行就终止了 　

   Ｂ  如果一个方法申明将抛出某个异常，它就必须真的抛出那个异常　

   Ｃ  在catch子句中匹配异常是一种精确匹配

   Ｄ  可能抛出系统异常的方法是不需要申明异常的

4. 下面关于垃圾收集的说法正确的是( D )[单选题]

   Ａ  一旦一个对象成为垃圾，就立刻被收集掉。

   Ｂ  对象空间被收集掉之后，会执行该对象的finalize方法

   Ｃ  finalize方法和C++的析构函数是完全一回事情

   Ｄ  一个对象成为垃圾是因为不再有引用指着它，但是线程并非如此

5. 下面的程序中，temp的最终值是( B )[单选题]

   ```java
   long temp=(int)3.9;
   temp%=2;
   ```

   A  0

   B  1
   C  2
   D  3
   E  4

6. 下面有两个赋值语句：

   ```java
   a = Integer.parseInt("1024");
   
   b = Integer.valueOf("1024").intValue();
   ```

   下述说法正确的是( D )[单选题]

   A a是整数类型变量，b是整数类对象。

   B a是整数类对象，b是整数类型变量。

   C a和b都是整数类对象并且它们的值相等。

   D a和b都是整数类型变量并且它们的值相等。

7. 咖啡店销售系统具体需求为：咖啡店店员在卖咖啡时，可以根据顾客的要求加入各种配料，并根据加入配料价格的不同来计算总价。若要设计该系统可以应该采用哪种设计模式进行设计( A )[单选题]

   A  装饰模式

   B 单例模式

   C 原型模式

   D  组合模式

8. 解决哈希冲突的链地址算法中，关于插入新的数据项的时间表述正确的是( D )[单选题]

   A 和数组已占用单元的百分比成正比

   B 和链表数目成正比

   C  和哈希表中项数成正比

   D  随装填因子线性增长

9. 下列关于Object类的说法，正确的是( D )[单选题]

   A 如果一个类显示地继承了其他类，则该类不再继承Object类

   B Error类不是从Object类派生出来的

   C 如果一个类是从Object类派生出来的，那么必须重写toString()和equals()方法

   D 一个类如果定义为abstract的，依然继承自Object类

10. 调用者发出消息后，必须等待消息处理结束返回后，才能进行后续操作的是( A )[单选题]

    A. 同步消息

    B. 返回消息

    C. 异步消息

    D. 简单消息

11. 在java中重写方法应遵循规则的包括( B C )[多选题]

    A 访问修饰符的限制一定要大于被重写方法的访问修饰符

    B 可以有不同的访问修饰符

    C 参数列表必须完全与被重写的方法相同

    D 必须具有不同的参数列表

12. 不能用来修饰interface的有(A C D )[多选题]
     A private 

    B public 

    C protected 

    D static

13. 关于Java中的ClassLoader下面的哪些描述是错误的( B D F )[多选题]

    A 默认情况下，Java应用启动过程涉及三个ClassLoader: Boostrap, Extension, System

    B 一般的情况不同ClassLoader装载的类是不相同的，但接口类例外，对于同一接口所有类装载器装载所获得的类是相同的

    C 类装载器需要保证类装载过程的线程安全

    D ClassLoader的loadClass在装载一个类时，如果该类不存在它将返回null

    E ClassLoader的父子结构中，默认装载采用了父优先

    F 所有ClassLoader装载的类都来自CLASSPATH环境指定的路径

14. 哪二种声明防止方法覆盖(A D )[多选题]

    A final void methoda() {}

    B void final methoda() {}

    C static void methoda() {}

    D static final void methoda() {}

    E final abstract void methoda() {}

15. Java 中的集合类包括 ArrayList 、 LinkedList 、 HashMap 等，下列关于集合类描述正确的是(A B D )[多选题]

    A ArrayList和LinkedList均实现了List接口

    B ArrayList访问速度比LinkedList快

    C 随机添加和删除元素时，ArrayList的表现更加快速

    D HashMap实现Map接口，它允许任何类型的键和值对象，并允许将NULL用作键或值

16. 关于wait()和sleep()说法正确的是(B C )[多选题]

    A  wait()和sleep()都会释放锁

    B  sleep()可以在任何地方使用

    C wait()只能在方法或者语句块中使用

    D  wait()和sleep()都是Thread类的方法

17. 下面哪些语句能够正确地生成5个空字符串(A B )[多选题]

    A String a[]=new String[5]；for(int i=0；i<5；a[i++]=“”)；

    B String a[]={“”，“”，“”，“”，“”}；

    C String a[5]；

    D String[5]a；

    E String []a=new String[5]；for(int i=0；i<5；a[i++]=null)；

18. Spring有哪三个核心组件(A B  D)[多选题]

    A eans

    B Context

    C IOC

    D Core 

19. 下列关于视图的说法中正确的是(C  D)[多选题]

    A 对视图的使用与表一样，也可以进行插、查、删、改操作

    B  视图与表一样，也存储着数据

    C 对视图的操作，是最终都要转化成对基本表的操作

    D 可以根据数据库表和自由表建立视图。

    

20. 下列等价类的叙述中正确的是(A B D)[多选题]

    A 若输入条件为一个布尔变量，则可以确定一个有效等价类和一个无效等价类

    B  若输入条件为一个逻辑量，则可为每一个输入值确定一个有效等价类，并针对这组值确定一个无效等价类

    C  若输入条件规定了“必须如何”的条件，则可以确定一个有效等价类和两个无效等价类

    D 若输入条件规定了取值的上下限，则可以确定一个有效等价类和两个无效等价类



## 简答题

1. 请说出作用域public，private，protected，以及不写时的区别 6

   private修饰的成员变量和函数只能在类本身和内部类中被访问。

   protected 修饰的成员变量和函数能被类本身、子类及同一个包中的类访问。

   public修饰的成员变量和函数可以被类、子类、同一个包中的类以及任意其他类访问。

   默认情况（不写）下，属于一种包访问，即能被类本身以及同一个包中的类访问

2. 面向对象的特征有哪些方面 8

   面向对象的三大特征：1.继承 2.封装 3.多态性

   （1）继承：就是保留父类的属性，开扩新的东西。通过子类可以实现继承，子类继承父类的所有状态和行

   为，同时添加自身的状态和行为。

   （2）封装：就是类的私有化。将代码及处理数据绑定在一起的一种编程机制，该机制保证程序和数据不受外

   部干扰。

   （3）多态：是允许将父对象设置成为和一个和多个它的子对象相等的技术。包括重载和重写。重载为编译时多态，重写是运行时多态。

3. 想要了解班级内同学的考试情况，现有一张成绩表表名为A，每行都包含以下内容（已知表中没有重复内容，但所有的考试结果都录入在了同一张表中，一个同学会有多条考试结果）：student_id，course_name，score

   1）每门课程得到成绩的同学人数 2

   ```sql
   select course_name, count(distinct student_id) 
   from table 
   where score is not null 
   group by course_name;
   ```

   2)  每门课程的平均成绩 2

   ```sql
   select course_name, avg(score)
   from table
   group by course_name;
   ```

   3)  如果对于每门课程来说，60分以下为不及格，高于60为及格，统计每门课程及格和不及格的人数 2

   ```sql
   select course_name, sum(if(score >= 60, 1,0)) as PASS, 
   sum(if(score < 60, 1,0)) as FAIL
   from table 
   ```

## 程序设计题

1. 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。

   ​	

   示例 1：

   > 输入：x = 121
   > 输出：true

   示例 2：

   > 输入：x = -121
   > 输出：false
   > 解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

   示例 3：

   > 输入：x = 10
   > 输出：false
   > 解释：从右向左读, 为 01 。因此它不是一个回文数。

   示例 4：

   > 输入：x = -101
   > 输出：false

   `提示`：

   `231 <= x <= 231 - 1`

   

   ```java
   class Solution {
       public boolean isPalindrome(int x) {
           // 特殊情况：
           // 如上所述，当 x < 0 时，x 不是回文数。
           // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
           // 则其第一位数字也应该是 0
           // 只有 0 满足这一属性
           if (x < 0 || (x % 10 == 0 && x != 0)) {
               return false;
           }
   
           int revertedNumber = 0;
           while (x > revertedNumber) {
               revertedNumber = revertedNumber * 10 + x % 10;
               x /= 10;
           }
   
           // 当数字长度为奇数时，我们可以通过 revertedNumber/10 去除处于中位的数字。
           // 例如，当输入为 12321 时，在 while 循环的末尾我们可以得到 x = 12，revertedNumber = 123，
           // 由于处于中位的数字不影响回文（它总是与自己相等），所以我们可以简单地将其去除。
           return x == revertedNumber || x == revertedNumber / 10;
       }
   }
   ```

2. 给你二叉树的根节点 `root` ，返回它节点值的 **前序** 遍历。

   示例 1：

   ![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

   > 输入：root = [1,null,2,3]
   > 输出：[1,2,3]

   示例 2：

   > 输入：root = []
   > 输出：[]

   示例 3：

   > 输入：root = [1]
   > 输出：[1]

   

   示例 4：

   ![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg)

   > 输入：root = [1,2]
   > 输出：[1,2]

   示例 5：

   ![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg)

   > 输入：root = [1,null,2]
   > 输出：[1,2]

   `提示`：

   `树中节点数目在范围 [0, 100] 内
   -100 <= Node.val <= 100`

   ```java
   class Solution {
       public List<Integer> preorderTraversal(TreeNode root) {
           List<Integer> res = new ArrayList<Integer>();
           preorder(root, res);
           return res;
       }
   
       public void preorder(TreeNode root, List<Integer> res) {
           if (root == null) {
               return;
           }
           res.add(root.val);
           preorder(root.left, res);
           preorder(root.right, res);
       }
   }
   ```

   

 