<div align="center">
<img src="https://i.loli.net/2019/08/13/MWqKVkFZR74tDCw.png" width = "400" height = "250" alt="vue-logo.png" align=center />
</div>

***

## 技术栈

前端： vue2  +  element-ui  +  particles + ES6/7 + axios + stylus 

可视化库: mapv + baidu-map + highcharts + echarts

部署: forever + nginx + ubuntu远程虚拟机

## 线上效果预览
#### [查看 DataV 请戳这里](http://www.gsce.cc:4000/)
>  `主页面进入密钥:sakura，同时本文后面有截图展示`~~

## 说明

>  开发环境 ubuntu 18.04 chrome nodejs 8+

>  这个项目主要是用于探索开发全过程(需求分析-》》功能设计-》》产品设计-》》样式设计-》》回滚功能-》》完整页面), 旨在完成一个独立的思考过程.

> 后续会继续完善功能滴～    ⎛⎝≥⏝⏝≤⎠⎞


## 项目描述

### 前端部分

#### 项目结构
</br>

```shell
├── README.md
├── build //编任务代码
│   ├── buil.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config //webpack的配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html 
├── package.json //项目的基本信息
├── src //vue文件
└── static //静态资源（图片相关）
```

#### src结构
</br>

```shell
src
├── assets          // 资源目录 图片，样式，iconfont
├── configs	        // 页面配置
├── components      // 全局通用组件目录
├── config          // 项目配置，开关
├── pages           // 页面集
├── lang            // 国际化支持
├── router          // 路由配置
├── utils	          // 通用方法工具集合
```


#### 需求背景
西安，作为每年旅游的热门城市，行人旅客络绎不绝。大唐芙蓉园的花灯，秦岭终年不化的 雪顶，不夜城的姹紫嫣红......经过互联网多种媒体形式的传播，使得西安在 2018 年完成了”千年 古城至网红城市”的蜕变，同时在全域旅行开展的幕后之下，人们生活质量需求正发生着潜移默 化的变化。与之相应的是，西安旅游产业总收入的大幅度增长。据统计，今年全年，西安游客总 人次已经达到 2.4 亿，同比增长 40%，收入更是同比增长达 58%。 
旅游产业不仅是我国的基础产业，也是脊柱产业之一，在旅客统计管理分析中应用 webgis 技术达到旅客信息管理、实时展示、动态更新迭代、旅客动态分析、旅客关注点景区状态等多 种信息进行可视化分析和管理，是各地政府部门对旅游文化产业及相关进行管理个决策不可或缺的系统。在当下的旅游热门城市——西安，进行节假日旅游信息工程化工作，完善建立数据动态 可视化管理平台，必将有利于整合西安市现有的旅游资源，同时为日后发展进行决策和管理。

#### 技术总结
<div align="center">
<img src="https://i.loli.net/2019/08/13/SnXO5ZTCG68Uhgt.png" width = "600" height = "340" alt="vue-logo.png" align=center />
</div>

---
### 整体功能设计
</br>

#### 页面功能模块
<div align="center">
<img src="https://s2.ax1x.com/2019/08/14/mPdKJA.png" width = "600" height = "280" alt="vue-logo.png" align=center />
</div>

#### 样式色彩设计
对于本系统而言，更适合使用偏蓝色系的色彩设计，对于标题、坐标轴 描述、副标题等都有不同的大小和颜色，但总体色系基调一直，保证页面可视化的协调性。
<div align="center">
<img src="https://s2.ax1x.com/2019/08/14/mPd8L8.png" width = "600" height = "220" alt="vue-logo.png" align=center />
</div>

## 数据可视化开发流程
做数据可视化是为了从中获取有用的信息...
`but`...
过程是`曲折`的...
需要不断的recode,Repeated design...
<div align="center">
<img src="https://s2.ax1x.com/2019/08/14/mPdYdg.png" width = "600" height = "260" alt="vue-logo.png" align=center />
</div>


## 线上部署
部署在阿里云的虚拟机上

`前端`如果需要本地预览，可以修改`webpack.base.conf.js`

```javascript
output: {
    path: config.build.assetsRoot,
    publicPath: './',  //资源的公共路径
    filename: '[name].js'
}
```

这样生产相对资源路径，可以直接访问。如果线上发布，则直接打包即可。


#### `nginx服务器配置`
修改 nginx.conf

```shell
server {
	listen xx #端口
	server_name xx #域名
	location /api {
		porxy_pass http://127.0.0.1:4000 #反向代理node,js服务器
	}

	location / { #配置静态文件路径(即打包后文件)
		root xxx #静态资源路径路径
		index index.html
	}
}
```

***

## 部分功能展示
* **enter入口页面**
***
![enter入口页面.png](https://s2.ax1x.com/2019/08/14/mPdwzq.jpg)
</br>

* **总览分析**
***
旅客数据流入方式及景区合理数据分析。
![总览.png](https://s2.ax1x.com/2019/08/14/mPdOfA.png)
</br>
</br>
</br>

* **数据详情页**
***
旅客出入境、年龄/性别占比、区域流量热力图等多种数据展示方式
![banner.gif](https://s2.ax1x.com/2019/08/13/mPNrLD.png)
</br>
</br>
</br>

* **三项热度排名**
***
通过三种热度排行榜，侧面展示西安旅客动向(数据来源高德平台)。
![nav.gif](https://s2.ax1x.com/2019/08/13/mPNzOU.png)
</br>
***

## 待完善功能

* <del>响应式布局</del>

> 1. 利用elem-ui栅格布局系统+charts自带的响应能力，完成数据详情页面响应布局。
> 2. 调整页面整体颜色搭配，尽量保持协调、美观的风格。
> 3. 结合baidu-api，完成热力图部分...

*  完成后端相关业务开发，实时更新数据

> 1. 利用websocket进行数据通讯~
> 2. 设计合理的api接口。
> 3. 使用nodejs完成后端功能开发...

* 实现更多交互功能，页面功能etc...
* 解决一些bug
...

## 一些问题
1. 首页背景效果
1.1 particles提供的粒子效果。
1.2 原生animation实现背景图片轮播动画效果.
2. 功能合理性设计
3. 数据来源
4. 项目具体作用
### 下载运行
`clone`项目

```shell
git clone https://github.com/waiwai948/datav.git

# 开启前端
cd ./webgis
npm install
npm run dev
```
