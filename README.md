# 浏览器推送网站通知

[![last-commit](https://img.shields.io/github/last-commit/HollowMan6/Site-Notifications)](https://github.com/HollowMan6/Site-Notifications/graphs/commit-activity)
![Python package](https://github.com/HollowMan6/Site-Notifications/workflows/Python%20package/badge.svg)
[![Node.js Package](https://github.com/HollowMan6/Site-Notifications/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/HollowMan6/Site-Notifications/actions/workflows/npm-publish.yml)
[![Push Browser Notification and Daily Weather Report](https://github.com/HollowMan6/Site-Notifications/actions/workflows/notification.yml/badge.svg)](https://github.com/HollowMan6/Site-Notifications/actions/workflows/notification.yml)

[![Followers](https://img.shields.io/github/followers/HollowMan6?style=social)](https://github.com/HollowMan6?tab=followers)
[![watchers](https://img.shields.io/github/watchers/HollowMan6/Site-Notifications?style=social)](https://github.com/HollowMan6/Site-Notifications/watchers)
[![stars](https://img.shields.io/github/stars/HollowMan6/Site-Notifications?style=social)](https://github.com/HollowMan6/Site-Notifications/stargazers)
[![forks](https://img.shields.io/github/forks/HollowMan6/Site-Notifications?style=social)](https://github.com/HollowMan6/Site-Notifications/network/members)

[![Open Source Love](https://img.shields.io/badge/-%E2%9D%A4%20Open%20Source-Green?style=flat-square&logo=Github&logoColor=white&link=https://hollowman6.github.io/fund.html)](https://hollowman6.github.io/fund.html)
[![GPL Licence](https://img.shields.io/badge/license-GPL-blue)](https://opensource.org/licenses/GPL-3.0/)
[![Repo-Size](https://img.shields.io/github/repo-size/HollowMan6/Site-Notifications.svg)](https://github.com/HollowMan6/Site-Notifications/archive/main.zip)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/HollowMan6/Site-Notifications.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/HollowMan6/Site-Notifications/alerts/)
[![Language grade: Python](https://img.shields.io/lgtm/grade/python/g/HollowMan6/Site-Notifications.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/HollowMan6/Site-Notifications/context:python)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/HollowMan6/Site-Notifications.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/HollowMan6/Site-Notifications/context:javascript)

(English version is down below)

[Python/NodeJS库依赖](https://github.com/HollowMan6/Site-Notifications/network/dependencies)

[推送脚本(python)](python/webpush.py) [推送脚本(NodeJS)](src/webpush.js)

[订阅网页端](index.html)

## 简介

[推送脚本(python)](python/webpush.py)参数见：https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#parameters

其中函数标题Title为字符串类型，Options为字典类型，使用时需要预先设定环境变量`SUBSINFO`为订阅码。

通过[这里的订阅网页端](https://hollowman.ml/Site-Notifications/)你可以订阅[我的网站](https://hollowman.ml/)的浏览器推送消息，获取到订阅码。随后你就可以使用订阅码将消息通过浏览器通知的形式推送到安卓/Linux/Windows/Mac等通知栏处(IOS暂不支持)。即使你关闭了网页，你仍然可以收到通知。

如果你需要从你自己的服务器发送消息，你可以使用这里的[推送工具库](https://github.com/web-push-libs)

## 网站使用的 VAPID Keys

公钥: `BOHSZycLLiXBjp0djrpD6vbzVX4g7D1QcW4cb1UonDcDYu6ewOXJ4qcz-e3J3d2VpjHgm0tHnZRjoGTv7SRJl7M`

私钥: `tUCZ-8DGMlUhr3ntyN4PQoDbALJSBnv8yZXhi4XX1iI`

## 注意

建议选用最新版谷歌Chrome、微软Edge、Mozilla Firefox。

请不要告诉别人你的订阅码，以防被骚扰。另外你随时可以通过按钮关闭开启浏览器推送来重新生成订阅码。

由于安卓端Chrome、Edge、Firefox浏览器订阅和接收打卡消息时使用FCM(Firebase Cloud Messaging)，所以请确保设备访问谷歌服务通畅，并且通常需要安装好相关谷歌服务才能使用。如点击`Enable Push Message`后，出现错误`DOMException: Registration failed - push service error`，则除了网络问题，请确保浏览器为谷歌Play商店下载的最新版，其它原因一般为你的ROM版本不支持FCM推送服务，建议安装谷歌框架或者刷国际版ROM之后再试。

华为/荣耀手机如果安装了谷歌框架后还不支持FCM推送服务可以参考[这篇文章](docs/Huawei_Honor_FCM_Fix)

## 应用: 每日天气预报推送

[每日天气预报推送工作流](.github/workflows/weatherreport.yml)

这里使用GitHub Actions，每日中午12点自动运行[脚本](python/weather.py)，推送当日天气。

如果你也想使用，请在Fork本仓库之后，创建两个Actions Secrets，一个Name为`LOCATION`，value为天气预报地点；另一个Name为`SUBSINFO`，value为你的订阅码。

## Github Actions Workflow 自行配置工作流

你可以自行创建一个仓库并自行配置工作流进行使用，该工作流可以自行定义消息，也可以进行天气预报推送。[示例工作流文件](.github/workflows/notification.yml)

### 输入

#### 必须

* SUBSINFO: 你的网站订阅码

#### 可选

* LOCATION: 天气预报地点(该输入标志工作流进行天气预报报道)
* TITLE: 通知标题(该输入标志工作流进行自定义通知推送)
* OPTIONS: 通知选项(该输入仅对自定义通知推送起效)

### 示例

```yaml
- name: Push Browser Notification and Daily Weather Report
  uses: HollowMan6/Site-Notifications@main
  with:
    SUBSINFO: ${{ secrets.SUBSINFO }}
    LOCATION: ${{ secrets.LOCATION }}
    TITLE: ${{ secrets.TITLE }}
    OPTIONS: ${{ secrets.OPTIONS }}
```

# Browser Website Notification

[Python / NodeJS library dependency](https://github.com/HollowMan6/Site-Notifications/network/dependencies)

[Web push Script(python)](python/webpush.py) [Web push Script(NodeJS)](src/webpush.js)

[Subscription Page](index.html)

## Introduction

See https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#parameters for [Web push Script(python)](python/webpush.py) Parameters.

The function's title being the string type, options being dictionary type. You have to pre-set environment variable `SUBSINFO` as the Subscription Code.

Through the [subscription page](https://hollowman.ml/Site-Notifications/) you can subscribe to [my website](https://hollowman.ml/)'s notification, then use the Subscription Code to directly push the message to the Notifications of Android, Linux, Windows, Mac, and etc. (IOS not supported currently) through your browser's Site Notifications. Even if you close this website, you can still receive notifications you sent.

To send push messages from your own server, use one of the [web push libraries](https://github.com/web-push-libs) available.

## VAPID Keys for this website

Public: `BOHSZycLLiXBjp0djrpD6vbzVX4g7D1QcW4cb1UonDcDYu6ewOXJ4qcz-e3J3d2VpjHgm0tHnZRjoGTv7SRJl7M`

Private: `tUCZ-8DGMlUhr3ntyN4PQoDbALJSBnv8yZXhi4XX1iI`

## Note

It is recommended to select the latest version of Google Chrome, Microsoft edge and Mozilla Firefox.

For Users in 🇨🇳 Mainland China, because the Chrome, Edge and Firefox for Android browsers uses FCM (firebase Cloud Messaging) to push, you usually need to make sure you can visit Google Service, install relevant Google services before you can use it. For example, after clicking `Enable Push Message`, when the error `DOMException: Registration failed - push service error` occurs, except from network problems, please make sure you download latest version from Google Play Store, otherwise generally it's caused by your ROM version not supporting FCM push service. It is recommended to install Google framework or use the Global ROM version and try again.

If your phone is Huawei or Honor phone and does not support FCM push service after installing Google framework (GMS), please refer to [this video (in Bahasa Indonesia but can just follow gesture)](https://www.youtube.com/watch?v=nLzYrxm0mMg).

## Application: Daily Weather Report

[Daily Weather Report Workflow](.github/workflows/weatherreport.yml)

Here use GitHub Actions, executing [script](python/weather.py) 12 a.m. CST everyday to push Weather Report Notification.

If you also want to use it, please create two Actions Secrets after forking. One name is `LOCATION`, and value is the weather forecasting location; the other name is `SUBSINFO`, and value is your subscription code.

## Github Actions Workflow Self-Configure Workflow

You can create your own repository and configure your own workflow to use, this workflow can send customized notifications and also weather report. [Example Workflow YAML File](.github/workflows/notification.yml)

### Input

#### Required

* SUBSINFO: Your Website Subscription Code

#### Optional

* LOCATION: Weather Forecast Location (This input marks push Weather Forecast Notification)
* TITLE: Notification Title (This input marks push Customized Notification)
* OPTIONS: Notification Options (This input only works for Customized Notification)

### Example

```yaml
- name: Push Browser Notification and Daily Weather Report
  uses: HollowMan6/Site-Notifications@main
  with:
    SUBSINFO: ${{ secrets.SUBSINFO }}
    LOCATION: ${{ secrets.LOCATION }}
    TITLE: ${{ secrets.TITLE }}
    OPTIONS: ${{ secrets.OPTIONS }}
```
