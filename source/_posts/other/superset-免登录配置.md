---
title: superset 免登录配置
lang: other
abbrlink: 355ba238
date: 2023-03-10 17:57:45
tags:
---


本次配置适用于superset 2.0.1版本。
#### 修改配置文件 config.py 

```bash
PUBLIC_ROLE_LIKE: Optional[str] = "Gamma"
DASHBOARD_CROSS_FILTERS = true
DASHBOARD_NATIVE_FILTERS_SET = true
```
![superset配置二](../../images/super_login_20230310180004.png)
![superset配置一](../../images/super_login_20230310175930.png)

#### 重新初始化

```bash
# 重新初始化
superset init 
# 开启服务
superset run -h 0.0.0.0 -p 8088 --with-threads --reload --debugger
```

#### 配置权限

登录后，配置权限。

就可以了










参考[阿里云分享](https://developer.aliyun.com/article/1047644)的第二种办法。