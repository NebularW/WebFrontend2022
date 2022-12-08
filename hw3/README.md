# Web前端开发 作业2

## 1. 作业要求

使用html、css技术设计四个界面：登陆、注册、一级页面（主页），二级页面。

内容为高清图片展示，其中一级页面为大量图片的缩略图展示（可参考瀑布流布局），二级页面为上述页面中选定图片的放大（或原图）展示。

主题：秋日校园

## 2. 文件结构

```bash
│  index.html
│  README.md
│
├─assets
│  │  background.jpg
│  │  home.jpg
│  │
│  ├─icons
│  │
│  └─pics
│
├─css
│
└─html
    │  first.html
    │  signup.html
    │
    └─second
            watermark_SVG.html
            watermark_DCT.html
            3.html


```

## 3. 页面设置

### 3.1 登录页面

> 首先打开`index.html`

![image-20221129203353708](http://img.nebular.site/markdown/image-20221129203353708.png)

该页面负责用户的登录。

1. 点击注册，跳转至注册页面(`signup.html`)
   - 输入用户名但没有输入密码，输入密码但没有输入用户名，点击登录，会提醒必须输入用户名密码
2. 输入用户名密码、点击登录后，跳转至主页(`first.html`)

### 3.2 注册页面

![image-20221129203802739](http://img.nebular.site/markdown/image-20221129203802739.png)

该页面负责用户的注册。

1. 输入所有信息后，点击注册，会跳转至登录页面
   - 信息输入不完全，点击注册，会提示需要输入所有信息
   - 电子邮箱格式输入错误，点击注册，会提醒需要输入正确格式的电子邮箱地址
2. 点击返回，即可返回登录页面

### 3.3 主页

![image-20221202201716212](http://img.nebular.site/md/image-20221202201716212.png)

该页面以瀑布流方式展示大量图片的缩略图。

1. 点击页面顶部的主页，会跳转至主页（即当前页面）
2. 点击页面顶部的登出，会跳转至登录页面
3. 点击用户Sky上传的照片，会跳转至二级页面，展示选定图片的放大展示

### 3.4 二级页面

![image-20221202201822415](http://img.nebular.site/md/image-20221202201822415.png)

该页面展示选定图片的放大展示。

1. 点击页面顶部的主页，会跳转至主页
2. 点击页面顶部的登出，会跳转至登录页面

## 4. 响应式布局

以上页面都针对移动端设备进行优化，效果如下：

> 以下页面的显示设备为iPhone 12 Pro

1. 登录页面

![image-20221202202020243](http://img.nebular.site/md/image-20221202202020243.png)

2. 注册页面

![image-20221202202100859](http://img.nebular.site/md/image-20221202202100859.png)

3. 主页

![image-20221202202136170](http://img.nebular.site/md/image-20221202202136170.png)

4. 二级页面

![image-20221202202217679](http://img.nebular.site/md/image-20221202202217679.png)
