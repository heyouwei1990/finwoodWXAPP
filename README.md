项目名：[A wepy project]，芬木微信小程序。本项目第一负责人为 `[蔡博文]`。


## 1. 如何运行

> node版本 `[8.0.0]`

### 1.1 开发环境配置

```sh
# 安装 cnpm 命令行工具。
npm i -g cnpm --registry=https://registry.npm.taobao.org

# 安装（更新） wepy-cli 命令行工具，这里我用1.6.0版本。
cnpm i wepy-cli@1.6.0 -g

# 安装依赖包
cnpm i
```

### 1.2 开发过程

#### 1.2.1 命令

```sh
# 开发
npm run dev

# 发布
npm run build
```

#### 1.2.2 开发注意事项

使用微信开发者工具新建项目，本地开发选择ec-dist目录。

微信开发者工具 --> 项目 --> 关闭ES6转ES5。

微信开发者工具 --> 项目 --> 关闭上传代码时样式自动补全。

微信开发者工具 --> 项目 --> 关闭代码压缩上传。

### 1.3 发布

> 发布时的备注
    1.修改src/utils/Http.js下的变量debug，baseUrl
    2.执行npm run build压缩代码，打开微信开发者工具填写正式appid
    3.上传代码

### 1.4 相关人员

| 角色 | 人员 |
| --- | --- |
| 产品经理 | 王明辉 |
| 前端开发 | 蔡博文,何友伟 |
| 后台开发 | 李伟,严小俊 |
| 交互设计 | 阮爱斌 |


## 2. 业务介绍

### 2.1 小程序业务入口

入口地址为 `src/app.wpy`

目录结构

    ├── api						//接口
    ├── app.wpy                 //入口文件
    ├── components              //组件
    ├── images                  //图片文件夹
    ├── pages                   //页面
    ├── styles                  //样式
    │   ├── base.scss
    │   ├── icon.scss           	// 图标文件
    │   └── mixin.scss				//scss常量方法
    └── utils                   //工具类
        ├── Cache.js                //缓存处理
        ├── Constant.js             //缓存常量
        ├── HTTP.js                 //ajax请求
        ├── Lang.js                 //常用验证
        ├── MD5.js                  //md5
        ├── Tip.js                  //提示弹框组件
        ├── Upload.js               //图片上传类库
        ├── Validate.js             //各类验证
        └── WxUtils.js              //低版本微信兼容处理


## 3. 其他

wepy开发文档地址

> https://tencent.github.io/wepy/

小程序开发文档

> https://mp.weixin.qq.com/debug/wxadoc/dev/

