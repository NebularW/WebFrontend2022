# Web前端开发 作业6

## 1. 作业实现方案

### 1.1 实现功能概述

- 使用nodejs，MySQL数据库
- 在登录注册功能的基础上，基于TensorFlow.js，使用神经网络在web端实现了风格迁移

### 1.1 方案具体说明

> 登录注册功能在之前的作业已经详细阐述过了，所以这里只详细介绍风格迁移功能

#### 基本框架

我基于TensorFlow.js，使用神经网络画风迁移算法在web端实现图片风格迁移。

#### 神经网络的画风迁移算法

![img](http://img.nebular.site/md/v2-2c42963322d402dd6dcb2cce65e4ff0e_b.jpg)

在神经网络的画风迁移算法中，我们需要输入两张图，一张是内容图，另一张是风格图。在经过神经网络的画风迁移算法处理后，我们将得到一个画风改变的内容图。

#### 方案的提高点

1. 浓缩模型
   - 原论文采用Inception-v3模型作为画风网络，该模型固化并发送至浏览器时体积达36.3MB。
   - 为减小模型体积，将训练好的Inception-v3模型浓缩为MobileNet-v2模型，在模型质量略有牺牲的情况下，模型体积从36.3MB降到了9.6MB，减小了近四倍。
2. 替换普通卷积层
   - 对于迁移网络，论文中采用基于普通卷积层的模型。该模型发送至浏览器时体积为7.9MB，画风渲染运算耗时很大
   - 为使迁移网络更高效，绝大多数的普通卷积层被深度可分离卷积层代替。这使得模型体积降至2.4MB，同时大幅提升了画风渲染速度。
3. 提供多项选择
   - 在实际使用时，可以根据需要自行选择速度优先或者质量优先的方案

## 2. 安装运行说明

> 运行前需要安装Node.js

因为我采用了在云服务器运行数据库，所以不需要本地建立数据库。

运行流程：

1. 需要在目录下打开终端，依次输入 `npm install`，`node server.js`，启动登录注册服务端
2. 在该目录下再打开一个终端，依次输入`yarn prep`，`yarn run start`，启动风格迁移服务端
3. 使用Chrome浏览器打开该目录下的`login.html`文件，注册登录后进入一级页面、二级页面、风格迁移页面等。

## 3. 实现效果

1. 登录后进入一级页面，在图片瀑布流中点击左上角任一张图片（图片上传者为Sky）进入二级页面

![image-20230116194656388](http://img.nebular.site/md/image-20230116194656388.png)

2. 在二级页面右上角点击`图片风格迁移`即可进入风格迁移界面

![image-20230116194810720](http://img.nebular.site/md/image-20230116194810720.png)

3. 在图片迁移页面，源图片为二级页面中展示的图片，风格图片为自己上传的图片、随机从网络获得的图片或者是一系列预设的图片

![image-20230116195154705](http://img.nebular.site/md/image-20230116195154705.png)

4. 可以修改源图片和风格图片大小，风格化的强度，这些因素会影响生成图片的尺寸及风格等

![image-20230116195701602](http://img.nebular.site/md/image-20230116195701602.png)



![image-20230116195458746](http://img.nebular.site/md/image-20230116195458746.png)

5. 此外，风格迁移可以选择高质量但耗时多的方式，或者是低质量但耗时少的方式，默认方式为后者

![image-20230116195617362](http://img.nebular.site/md/image-20230116195617362.png)



## 4. 参考文献

1. [什么是图像风格迁移](https://zhuanlan.zhihu.com/p/469685783)
2. [基于深度学习的图像真实风格迁移](https://zhuanlan.zhihu.com/p/28605436)
3. [[图像风格化算法综述三部曲](https://www.zhihu.com/column/c_185430820)]
4. [Arbitrary style transfer using TensorFlow.js](https://github.com/reiinakano/arbitrary-image-stylization-tfjs)
5. [Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization](https://arxiv.org/pdf/1703.06868.pdf)
6. [Deep Photo Style Transfer](https://arxiv.org/pdf/1703.07511.pdf)
