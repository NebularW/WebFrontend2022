# Web前端开发 作业4

## 1. 作业要求

在前面一级页面中，自行查找或者参照如下文献的方案，实现主题切换。两种主题即可。

## 2. 文件结构

```bash
│  first.html
│  README.md
│
├─assets
├─css
├─html
└─js

```

打开first.html即可进入一级页面

## 3. 实现效果

### 3.1 淡色主题（默认主题）

> 首先打开`first.html`

![image-20221224225605752](http://img.nebular.site/md/image-20221224225605752.png)

打开页面是默认的淡色主题，点击右上角的按钮，即可切换为另一个主题

### 3.2 深色主题

![image-20221224225802679](http://img.nebular.site/md/image-20221224225802679.png)

此为深色主题，如需切换回淡色主题，只需要再次点击右上角按钮即可。

### 3.3 动画效果

![button](http://img.nebular.site/md/button.gif)

在切换按钮上，实现了一定的动画效果。

## 4. 实现方案说明

我使用的**方案**是CSS变量+类名切换。

### 4.1 大体思路

**大体思路**是提前将CSS样式文件载入，切换时将指定的根元素类名更换。不过这里相对灵活的是，默认在根作用域下定义好CSS变量，只需要在不同的主题下更改CSS变量对应的取值即可。

### 4.2 关键实现

1. 提前定义CSS变量

```css
:root[theme='dark'] {
    --theme-color: azure;
    --theme-btn: rgba(0, 0, 0, .8);
    --theme-item: rgba(0, 0, 0, .5);
    --theme-bg: url("../assets/background.jpg");
}

:root[theme='light'] {
    --theme-color: black;
    --theme-btn: rgba(255, 255, 255, 0.8);
    --theme-item: rgba(255, 255, 255, 0.5);
    --theme-bg: url("../assets/light.jpg");
}
```

2. 部分元素样式为CSS变量

```css
.item {
    margin-bottom: 10px;
    break-inside: avoid;
    background: var(--theme-item);
    border-radius: 5%;
}
```

3. js文件中根据不同主题更改CSS变量

```javascript
let container=document.querySelector('label');
let dark = false;
container.onclick=function () {
    console.log('switch');
    if(dark===false){
        dark = true;
        document.documentElement.setAttribute('theme', 'dark');
    }else{
        dark = false;
        document.documentElement.setAttribute('theme', 'light');
    }
}
```

### 4.3 方案特点

方案优点：

1. 不用重新加载样式文件，在样式切换时不会有卡顿
2. 在需要切换主题的地方利用var()绑定变量即可，不存在优先级问题
3. 新增或修改主题方便灵活，仅需新增或修改CSS变量即可，在var()绑定样式变量的地方就会自动更换

方案缺点：

1. 首屏加载时会牺牲一些时间加载样式资源
2. 对IE的兼容性不好（在当下环境可以忽略）
