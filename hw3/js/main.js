//MAIN
// Parameters optimized according to tests.
function writeMsgToCanvas(canvasId,msg,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    const f = writeMsgToCanvas_base;
    switch (mode) {
        case 1: return f(canvasId, msg, pass, true, 23, 2, [2, 9, 16], true, false);
        case 2: return f(canvasId, msg, pass, true, 17, 3, [1, 8], true, false);
        case 3: return f(canvasId, msg, pass, true, 17, 5, [1, 8], true, false);
        case 4: return f(canvasId, msg, pass, true, 5, 5, [0], true, false);
        case 5: return f(canvasId, msg, pass, true, 5, 6, [0], true, true);

        case 0:
        default: return f(canvasId, msg, pass, false, 1);
    }
}

//Read msg from the image in canvasId.
//Return msg (null -> fail)
// function readMsgFromCanvas(canvasId,pass,mode){
//     mode=(mode=== undefined)?0:parseInt(mode);
//     const f = readMsgFromCanvas_base;
//     switch (mode) {
//         case 1: return f(canvasId, pass, true, 23, 2, [2, 9, 16], true, false)[1];
//         case 2: return f(canvasId, pass, true, 17, 3, [1, 8], true, false)[1];
//         case 3: return f(canvasId, pass, true, 17, 5, [1, 8], true, false)[1];
//         case 4: return f(canvasId, pass, true, 5, 5, [0], true, false)[1];
//         case 5: return f(canvasId, pass, true, 5, 6, [0], true, true)[1];
//         case 0:
//         default: return f(canvasId, pass, false, 1)[1];
//     }
// }

//load image from html5 input and execute callback() if successful
function loadIMGtoCanvas(inputId, canvasId, callback, maxsize, imgPath) {
    maxsize=(maxsize=== undefined)?0:maxsize;
    const image = new Image();
    image.onload = function() {
        let w = image.width;
        let h = image.height;
        if(maxsize>0){
            if(w>maxsize){
                h=h*(maxsize/w);
                w=maxsize;
            }
            if(h>maxsize){
                w=w*(maxsize/h);
                h=maxsize;
            }
            w=Math.floor(w);
            h=Math.floor(h);
        }
        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.width = w;
        canvas.height = h;
        canvas.style.display = "none";
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(canvas);
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0,image.width,image.height,0,0,w,h);
        callback();
        document.body.removeChild(canvas);
    };
    image.src = '../../assets/pics/' + imgPath;
    console.log(image.src);

}