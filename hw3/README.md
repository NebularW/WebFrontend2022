# Web前端开发 作业3

​																													201250044 王星云

## 一、文件结构

```bash
│  index.html
│  README.md
│  watermark_DCT.html
│  watermark_SVG.html
│
├─assets
│
├─css
│
├─html
│
└─js
```

## 二、实现效果

本次作业实现水印的网页为 `watermark_DCT.html` 和 `watermark_SVG.html`

1. 可以直接打开html文件查看效果
2. 也可以在一级页面点击用户昵称为 `SVG水印` 和 `频域水印` 的图片（页面左上角），跳转到相应的二级页面

一级页面如下图所示：

![image-20221208174417628](http://img.nebular.site/md/image-20221208174417628.png)

### 1. 动态水印

#### 原始页面

![image-20221208175335366](http://img.nebular.site/md/image-20221208175335366.png)

#### 水印页面

如图所示，该页面使用了SVG明水印，水印信息为 `Sky 201250044` ：

![image-20221208174549871](http://img.nebular.site/md/image-20221208174549871.png)

### 2. 频域水印

#### 原始页面

![image-20221208175431067](http://img.nebular.site/md/image-20221208175431067.png)

#### 水印页面

如图所示，该图片添加了不可见的频域水印，图片隐藏信息为 `Sky 201250044`

![image-20221208175021682](http://img.nebular.site/md/image-20221208175021682.png)

## 三、使用方法说明

### 1. 无水印方案

直接加载图像，并通过CSS文件设置样式

```html
<img class="itemImg" src="../../assets/pics/h4.jpg" alt="">
```

### 2. 动态水印方案（SVG水印）

（1）在html中加入`watermark`块，并引入js脚本

```html
<img class="itemImg" src="assets/pics/v1.jpg" alt="">
<div class="watermark"></div>
<script src="js/watermark.js"></script>
```

（2）通过JS脚本和CSS文件共同设置水印文字信息和样式

`second.css`

```css
.watermark {
    position: absolute;
    width: 100%;
    height: 100%;
    --watermarkSVG: null;
    background-image: var(--watermarkSVG);
    pointer-events: none;
}
```

`watermark.js`

```javascript
let svgText = 'Sky 201250044'
let fontSize = 20
let svgWidth = 250
let svgHeight = 250
let rotate = -45
let fillOpacity = 0.1
watermarksvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${svgWidth}px' height='${svgHeight}px'%3E  %3Ctext  x='${fontSize}' y='0'  fill-opacity='${fillOpacity}' fill='%23000' transform='translate(0,${svgHeight})rotate(${rotate})'    font-size='${fontSize}'%3E${svgText}%3C/text%3E%3C/svg%3E")`
document.querySelector('.watermark').style.setProperty('--watermarkSVG', watermarksvg)
```

做法：

1. 在CSS将页面背景设置为变量`--watermarkSVG`，并且覆盖展示图片
2. 在JS中设置水印的文字、大小、样式等，并将其进行base64编码，写入变量`--watermarkSVG`
3. 页面最终展示覆盖图片的明水印，并且因为是通过 JS 写入水印信息，为后续根据不同用户的昵称，动态写入水印提供了良好扩展基础

### 3. 频域水印方案

（1）加密主要函数：

```javascript
function writeIMG() {
        function writeFunc() {
            if (writeMsgToCanvas('canvas', 'Sky 201250044', '', 1) != null) {
                const main = document.getElementById("main");
                const myCanvas = document.getElementById("canvas");
                const image = document.createElement('img');
                image.src = myCanvas.toDataURL("image/png");
                image.style = "position: absolute; width: 100%; height: 100%; object-fit: contain;"
                main.append(image);
                console.log(image);
            }
        }
        console.log("loading");
        loadIMGtoCanvas('file', 'canvas', writeFunc, 800, 'h1.jpg');
    }
```

做法：

1. 将图片加载为canvas
2. 把图像分成8×8的不重叠像素块，在经过分块DCT变换后，即得到由DCT系数组成的频率块，然后随机选取一些频率块，将水印信号嵌入到由密钥控制选择的一些DCT系数中。
3. 进行逆变换，得到加密后的新图像
4. 生成的图像质量有1到5，五个级别，级别越高，质量越高，加密所花费的时间也越长
   - 作业展示时的图像质量级别为1，加载完成需要大约10秒

（2）解密主要函数：

```javascript
function readMsgFromCanvas(canvasId,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    const f = readMsgFromCanvas_base;
    switch (mode) {
        case 1: return f(canvasId, pass, true, 23, 2, [2, 9, 16], true, false)[1];
        case 2: return f(canvasId, pass, true, 17, 3, [1, 8], true, false)[1];
        case 3: return f(canvasId, pass, true, 17, 5, [1, 8], true, false)[1];
        case 4: return f(canvasId, pass, true, 5, 5, [0], true, false)[1];
        case 5: return f(canvasId, pass, true, 5, 6, [0], true, true)[1];
        case 0:
        default: return f(canvasId, pass, false, 1)[1];
    }
}
```

根据加密时的图像质量级别，进行对应解密



