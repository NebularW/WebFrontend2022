# README

201250047 殷天逸

# 1. 概览

登录后进入主页，点击瀑布流图片组中最左边一列以及第二列的第一张这3张图片都可以进入二级页面，然后点击图片风格迁移按钮进入风格迁移页面。

![pic1](./截图/pic1.png)

下图是风格迁移页面

![pic2](./截图/pic2.png)

点击风格化（Stylize）按钮即可进行图片风格迁移，拖动滑块可以改变强度，迁移后如下图所示：

![pic3](./截图/pic3.png)

# 2.安装运行过程

## 2.1 数据库操作

建表，使用mysql8，`Lab5`为数据源，数据放在表`userinfo`中

```mysql
CREATE DATABASE IF NOT EXISTS Lab5 CHARACTER SET UTF8;
USE Lab5;
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
    `email` varchar(64) NOT NULL,
    `phoneNumber` int(32) NOT NULL,
    `password` varchar(64) NOT NULL,
    PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

在server.js中加入数据库的信息，修改成自己数据库的密码，如下图所示：

![pic4](./截图/pic4.png)

## 2.2 运行操作

在终端中执行`yarn run prep `，然后执行`node server.js`，登录注册服务端开始运行。如下图所示：

![pic5](./截图/pic5.png)

然后再开一个终端，执行`yarn run start `，打开风格迁移服务端如下图所示：

![pic6](./截图/pic6.png)

在打开以上两个服务端后，打开在浏览器中打开html文件夹中的login.html页面，即可开始运行。

![pic7](./截图/pic7.png)

注册账号之后用该账号登录，如概览中所说即可进行风格迁移。

# 3.实现方案

这是基于TensorFlow.js完全运行在web端的画风迁移算法实现。跟所有基于神经网络的画风迁移算法一样，神经网络试图去“画”一张画，画的内容源自一张图（通常是一张照片），画的风格源自另一张图（通常是一幅画）。

本项目通过一个将任意画风表示为100维向量的画风网络来突破这个限制，该向量跟照片内容一起注入迁移网络，产生最终的画风图像。如下图所示：

![pic8](./截图/pic8.png)

原论文采用Inception-v3模型作为画风网络，该模型固化并发送至浏览器时体积达36.3MB。

为减小模型体积，训练好的Inception-v3模型浓缩为MobileNet-v2模型，在模型质量略有牺牲的情况下，模型体积从36.3MB降到了9.6MB，减小了近四倍。

对于迁移网络，原论文采用基于普通卷积层的模型。该模型发送至浏览器时体积为7.9MB，且画风渲染运算中占很大比重。

为使迁移网络更高效，绝大多数的普通卷积层被深度可分离卷积层代替。这使得模型体积降至2.4MB，同时大幅提升了画风渲染速度。

