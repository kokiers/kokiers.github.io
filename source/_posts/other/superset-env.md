---
title: superset window python 虚拟环境配置记录
lang: other
abbrlink: 4b6927f1
date: 2023-03-07 22:27:44
tags:
---

superset 在windows 环境中安装，可以通过python虚拟环境配置，记录备忘一下。

#### **环境注意事项**
安装过程中各种错误，安装如下可解决。
需要额外下载好visual studio 的相关插件。好像单个组件不选也可以。
<!-- more -->
![详情如图](../../images/superset_20230304172137.jpg)
#### **具体步骤：**
详细可以查看[superset 官方文档](https://superset.apache.org/docs/installation/installing-superset-from-scratch) 或者 [GitHub CONTRIBUTING](https://github.com/apache/superset/blob/master/CONTRIBUTING.md#documentation)

1、安装python，下载exe安装，记得勾选，配置环境变量
```bash
# 2、安装虚拟环境 
pip install virtualenv 
# 3、在需要开启虚拟环境的目录下执行。
py -3 -m venv venv || python3 -m venv venv 
```
  tips: 在项目目录下执行, python3 可以用的前提是python的安装目录有个python3.exe
  常见错误： python3 不是内部外部命令，不能识别。用 **py -3** 代替。如果需要使用，需要复制python.exe 后重命名 python3.exe
```bash
# 4、开启虚拟化
venv\Scripts\activate 
# 5、安装superset 可以选择版本安装。
   #tips: 如果superset对应的版本已经下载下来，且虚拟目录在项目中开启，则可忽略此步骤。
pip install apache-superset==2.0.1 // --use-deprecated=legacy-resolver
```
5、安装需要的package（以下2个步骤好像选一个就可以了?)
```bash
pip install -r requirements/testing.txt
# Install Superset in editable (development) mode
pip install -e .
```
6、 配置**后端服务**
```bash
# (别的位置看到的)
set flask = superset 
# Initialize the database
superset db upgrade

# Create an admin user in your metadata database (use `admin` as username to be able to load the examples)
superset fab create-admin

# Create default roles and permissions
superset init

# Load some data to play with.
# Note: you MUST have previously created an admin user with the username `admin` for this command to work.
superset load-examples

# Start the Flask dev web server from inside your virtualenv.
# Note that your page may not have CSS at this point.
# See instructions below how to build the front-end assets.
FLASK_ENV=development superset run -p 8088 --with-threads --reload --debugger
```
7、**前端服务**起来
 安装nodejs 16.19.1 报错少。别的版本的错误巨多。
 ```bash
 # cd superset-frontend
 npm install 
 # 默认启用的9000 端口，后端服务用的flask服务起的。
 npm run dev 
 ````


#### 常见错误
+ 环境报错，需要安装好环境注意事项的包。
1、fatal error C1083: Cannot open include file: 'basetsd.h'致命错误 C1083：无法打开包含文件：“basetsd.h”
fatal error C1083: 无法打开包括文件: “basetsd.h”: No such file or directory
2、error: command 'D:\\visual studio\\VC\\Tools\\MSVC\\14.31.31103\\bin\\HostX86\\x64\\cl.exe' failed with exit code 2
3、error: legacy-install-failure
4、src/geohash.cpp(2): fatal error C1083: 无法打开包括文件: “stdio.h”: No such file or directory
5、Command errored out with exit status 1:
6、 pip is looking at multiple versions of dnspython to determine which version is compatible with other requirements. This could take a while.


+ 安装requirements.txt 报错
ERROR: Could not open requirements file: [Errno 2] No such file or directory: ‘requirments.txt’
解决办法：
  先执行pip freeze > requirements.txt//会在当前目录下生成文件。 管理包版本
  然后再pip install -r requirements.txt


+ ModuleNotFoundError: No module named ‘pip
先解决 ModuleNotFoundError: No module named ‘pip‘
先把pip装回来：
python -m ensurepip

+ Found but failed to import local superset_config
....
OSError: The environment variable DATABASE_DIALECT was missing, abort...
解决:
 之前不小心配置环境变量PYTHONPATH(本人小心学习中。。。），删除了就好了

错误：
Init superset fail with error 'No module named 'cryptography.hazmat.backends.openssl.x509'
解决办法： 参考 [GitHub issue](https://github.com/apache/superset/issues/22571)
参考 [stackoverflow 32518458](https://stackoverflow.com/questions/32518458/importerror-no-module-named-cryptography-hazmat-bindings-openssl)
--- 就是包不兼容。

```bash
 pip uninstall -y markupsafe
 pip install markupsafe==2.0.1
 pip uninstall -y Werkzeug
 pip install Werkzeug==2.0.3

pip install flask==2.1.0
# 数据库用上的 
pip install pillow
# 不确定这个有用
pip install pyopenssl==22.1.0
# 这个很重要
 pip install flask-wtf==1.0.1 
```


  前端项目起来，后端服务也起来，登录页面也出来了。登录上去后报错。
 {"errors": [{"message": "validate() got an unexpected keyword argument 'extra_validators'", "error_type": "GENERIC_BACKEND_ERROR", "level": "error", "extra": {"issue_codes": [{"code": 1011, "message": "Issue 1011 - Superset encountered an unexpected error."}]}}]}
 ```bash
#  log:
2023-03-08 09:42:29,976:INFO:werkzeug: * Running on http://127.0.0.1:8088/ (Press CTRL+C to quit)
2023-03-08 09:42:32,514:INFO:werkzeug:127.0.0.1 - - [08/Mar/2023 09:42:32] "GET / HTTP/1.1" 302 -
2023-03-08 09:42:32,584:WARNING:root:Class 'werkzeug.local.LocalProxy' is not mapped
2023-03-08 09:42:32,686:DEBUG:superset.stats_logger:[stats_logger] (incr) welcome
2023-03-08 09:42:32,732:INFO:werkzeug:127.0.0.1 - - [08/Mar/2023 09:42:32] "GET /superset/welcome/ HTTP/1.1" 302 -
2023-03-08 09:42:34,465:INFO:werkzeug:127.0.0.1 - - [08/Mar/2023 09:42:34] "GET /login/ HTTP/1.1" 200 -
2023-03-08 09:42:35,129:INFO:werkzeug:127.0.0.1 - - [08/Mar/2023 09:42:35] "GET /static/assets/preamble.418fde3b.entry.js HTTP/1.1" 200 -
2023-03-08 09:42:35,161:WARNING:superset.views.base:HTTPException
Traceback (most recent call last):
  File "D:\work\myTest\superset\lastv\lib\site-packages\flask\app.py", line 1523, in full_dispatch_request
    rv = self.dispatch_request()
  File "D:\work\myTest\superset\lastv\lib\site-packages\flask\app.py", line 1499, in dispatch_request
    self.raise_routing_exception(req)
  File "D:\work\myTest\superset\lastv\lib\site-packages\flask\app.py", line 1481, in raise_routing_exception
    raise request.routing_exception  # type: ignore
  File "D:\work\myTest\superset\lastv\lib\site-packages\flask\ctx.py", line 397, in match_request
    result = self.url_adapter.match(return_rule=True)  # type: ignore
  File "D:\work\myTest\superset\lastv\lib\site-packages\werkzeug\routing.py", line 2042, in match
    raise NotFound()
werkzeug.exceptions.NotFound: 404 Not Found: The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.
2023-03-08 09:42:35,231:INFO:werkzeug:127.0.0.1 - - [08/Mar/2023 09:42:35] "GET /static/assets/menu.926ed779.entry.js HTTP/1.1" 200 -
 ```

解决办法： 
```bash
 pip install flask-wtf==1.0.1 
```
https://github.com/apache/superset/issues/20914#issuecomment-1434344417


 
#### python 版本切换
切换python版本，[参照文档](https://blog.csdn.net/qq_42455308/article/details/129263694)
安装不一样的版本，可切换版本使用。再走一遍。

python38 install virtualenv

错误：ERROR: After October 2020 you may experience errors when installing or updating packages 
解决：pip install apache-superset --use-feature=2020-resolver

pip install sqlalchemy-utils==0.36.6 --use-feature=2020-resolver -i https://pypi.douban.com/simple/


