# Gitlab安装

1. 更新并安装依赖

   > sudo yum -y -update 
   >
   > sudo  yum -y install policycoreutils openssh-server openssh-clients postfix policycoreutils-python ca-certificates curl	

2. 安装路径

   > ![image-20231212195128572](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20231212195128572.png)

3. 备份

   > sudo gitlab-backup create
   >
   > ![image-20231212215756594](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/image-20231212215756594.png)

4. 下载目录及安装版本

   > /etc/gitlab/gitlabsoft

   

5. 版本

   > sudo wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-16.6.1-ce.0.el7.x86_64.rpm
   >
   > rpm -ivh gitlab-ce-14.10.5-ce.0.el7.x86_64.rpm

6. 配置地址

   > vi /etc/gitlab/gitlab.rb
   > external_url 'http://192.168.109.128:9090' # ===>这里一定要加上http://

7. 在 `/etc/gitlab/gitlab.rb` 文件中，有许多用于各种类型日志的 `log_directory` 键。取消注释并更新要放置在其他地方的所有日志的值：

   ># For example:
   >gitlab_rails['log_directory'] = "/var/log/gitlab/gitlab-rails"
   >puma['log_directory'] = "/var/log/gitlab/puma"
   >registry['log_directory'] = "/var/log/gitlab/registry"

8. 邮箱配置

   >vi /etc/gitlab/gitlab.rb
   >
   >gitlab-rails console
   >
   >Notify.test_email('收件人邮箱', '邮件标题', '邮件正文').deliver_now
   >
   >Notify.test_email('mail地址', '邮件标题', '邮件正文').deliver_now
   >
   >{:authentication=>:login,
   > :user_name=>"******@163.com",
   > :password=>"WZZFIXUOLHOJHFWN",
   > :address=>"smtp.163.com",
   > :port=>25,
   > :domain=>"163.com",
   > :enable_starttls_auto=>true,
   > :tls=>false,
   > :ca_file=>"/opt/gitlab/embedded/ssl/certs/cacert.pem",
   > :open_timeout=>30,
   > :read_timeout=>60}

9. 安装命令开放端口

   > sudo systemctl enable sshd
   > sudo systemctl start sshd
   > sudo firewall-cmd --permanent --add-service=http
   > sudo systemctl reload firewalld
   >
   > sudo systemctl enable postfix
   > sudo systemctl start postfix
   >
   > firewall-cmd --add-port=9081/tcp --permanent
   >
   > firewall-cmd --add-port=25/tcp --permanent
   >
   > systemctl restart firewalld.service

10. 进入查看gitlab.yml

    > cd /opt/gitlab/embedded/service/gitlab-rails/config
    >
    > vi gitlab.yml  这里需要设置下载地址

11. 重启

    >gitlab-ctl reconfigure
    >gitlab-ctl restart

12. 常用命令

    > # 开启,关闭,重启: gitlab组件
    > gitlab-ctl {start|stop|restart|status} 		
    > gitlab-ctl start
    > gitlab-ctl stop
    > gitlab-ctl restart
    > gitlab-ctl status
    >
    > # 重载配置文件(重新编译gitlab的配置)
    > gitlab-ctl reconfigure
    >
    > # 验证配置文件
    > gitlab-ctl show-config   
    >
    > # 检查gitlab
    > gitlab-rake gitlab:check SANITIZE=true --trace    
    >
    > # 查看日志
    > gitlab-ctl tail
    > gitlab-ctl tail nginx/gitlab_access.log
    > gitlab-ctl tail nginx/gitlab_error.log
    >
    > # 常用目录
    > 日志地址：/var/log/gitlab/   # 对应各服务的打印日志 
    > 服务地址：/var/opt/gitlab/   # 对应各服务的主目录 

13. 两部验证

    >https://zhuanlan.zhihu.com/p/649375110
    >
    >GitLab的双因子认证（2FA）可以提供额外的账户安全保护。以下是启用和使用GitLab双因子认证的基本步骤：
    >
    >一、管理员强制启用双因子认证
    >
    >![img](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/v2-45baf4108dd7bbc9098e2b30ce064b72_1440w-20231212221138369.webp)
    >
    >二、用户首次登录配置双因子
    >
    >1、登录gitlab后会自动跳转到两步验证配置页面
    >
    >![img](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/v2-64b0086d31fca479054744d832d02a4c_1440w-20231212221132753.webp)
    >
    >2、手机下载Google Authenticator apk或者使用微信小程序
    >
    >微信小程序搜索Authly，直接使用小程序也可以实现
    >
    >apk下载链接: [https://pan.baidu.com/s/1SszwZ8hmaz-I-74cfQmLdw](https://link.zhihu.com/?target=https%3A//pan.baidu.com/s/1SszwZ8hmaz-I-74cfQmLdw) 密码: fuee
    >
    >3、打开Google Authenticator 点击右下角扫描二维码，扫描后会获取到一个pin码
    >
    >4、直接将pin码填入gitlab配置页面即可
    >
    >三、完成配置后再次打开gitlab会调整到如下页面，直接填写对应pin码即可登录。
    >
    >![img](https://raw.githubusercontent.com/zbsilent/imag/main/img/2022/v2-6d168f9eda736d158c8a1af4ca9375ce_1440w-20231212221128353.webp)

14. linux命令补全

    > 1.查看防火墙某个端口是否开放：firewall-cmd --query-port=80/tcp
    >
    > 2.开放80端口（重启防火墙生效）：firewall-cmd --add-port=80/tcp --permanent
    >
    > 3.关闭防火墙端口80：firewall-cmd --remove-port=80/tcp --permanent
    >
    > 4.重启防火墙：systemctl restart firewalld.service
    >
    > 5.开放一段端口：firewall-cmd --zone=public --add-port=40000-45000/tcp --permanent
    >
    > 6.查看开放的端口列表：firewall-cmd --zone=public --list-ports
    >
    > 7.查看被监听（Listen）的端口：netstat -lntp
    >
    > sudo xattr -d com.apple.quarantine /Applications/PicGo.app



















