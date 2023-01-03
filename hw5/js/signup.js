const showNum = [];

function isEmail(str) {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}

function checkCode(str) {
    if (str.length !== 4) return false;
    const reg = /^([a-zA-Z0-9])+/;
    if (!reg.test(str)) return false;
    for (let i = 0; i < 4; ++i) {
        if ('0' <= showNum[i] && showNum[i] <= '9') {
            if (str.charAt(i) !== showNum[i]) return false
        } else if (str.charAt(i).toLowerCase() !== showNum[i]) {
            return false
        }
    }
    return true;
}

function checkPassword(str) {
    return !(str.length < 6 || str.length > 30);

}

function register() {
    console.log(showNum)
    const email = document.getElementById("email").value;
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const code = document.getElementById("code").value;
    if (!checkPassword(password)) {
        window.alert('密码不符合规则')
        location.reload()
    } else if (password !== password2) {
        window.alert('密码不匹配')
        location.reload()
    } else if (!checkCode(code)) {
        window.alert('验证码错误')
        location.reload()
    } else {
        const params = {
            email: email,
            userName: userName,
            password: password,
        };
        console.log(params)
        $.get("http://localhost:3001/register", params, function (result) {
            console.log(result);
            if (result === 1) {
                window.alert('该邮箱已被注册')
            } else {
                window.alert('注册成功！')
                window.location.href = '../index.html'
            }
        });
    }
}

$(function () {
    // 存放随机的验证码

    draw(showNum)

    $("#c").click(function () {
        draw(showNum)
    })
    $("#btn").click(function () {
        const s = $("#inputValue").val().toLowerCase();
        const s1 = showNum.join("");
        if (s === s1) {
            alert("提交成功")
        } else {
            alert("验证码错误")
        }
        draw(showNum)
    })


    // 封装一个把随机验证码放在画布上
    function draw(showNum) {
        let x;
        //每一个验证码绘制的起始点x坐标
        let y;
        let i;
        // 获取canvas
        const canvas = $("#c");
        const ctx = canvas[0].getContext("2d");
        // 获取画布的宽高
        const canvas_width = canvas.width();
        const canvas_height = canvas.height();
        //  清空之前绘制的内容
        // 0,0清空的起始坐标
        // 矩形的宽高
        ctx.clearRect(0, 0, canvas_width, canvas_height)
        // 开始绘制
        const scode = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,";
        const arrCode = scode.split(",");
        const arrLength = arrCode.length;
        for (i = 0; i < 4; i++) {
            const index = Math.floor(Math.random() * arrCode.length);
            const txt = arrCode[index];//随机一个字符
            showNum[i] = txt.toLowerCase()//转化为小写存入验证码数组
            // 开始控制字符的绘制位置
            x = 10 + 20 * i;
            y = 20 + Math.random() * 8;// 起始点y坐标

            ctx.font = "bold 20px 微软雅黑"
            // 开始旋转字符
            const deg = Math.random * -0.5;
            // canvas 要实现绘制内容具有倾斜的效果，必须先平移，目的是把旋转点移动到绘制内容的地方
            ctx.translate(x, y)
            ctx.rotate(deg)
            // 设置绘制的随机颜色
            ctx.fillStyle = randomColor()
            ctx.fillText(txt, 0, 0)

            // 把canvas复原
            ctx.rotate(-deg)
            ctx.translate(-x, -y)

        }
        for (i = 0; i < 30; i++) {
            if (i < 5) {
                // 绘制线
                ctx.strokeStyle = randomColor()
                ctx.beginPath()
                ctx.moveTo(Math.random() * canvas_width, Math.random() * canvas_height)
                ctx.lineTo(Math.random() * canvas_width, Math.random() * canvas_height)
                ctx.stroke()
            }
            // 绘制点
            ctx.strokeStyle = randomColor()
            ctx.beginPath()
            x = Math.random() * canvas_width;
            y = Math.random() * canvas_height;
            ctx.moveTo(x, y)
            ctx.lineTo(x + 1, y + 1)
            ctx.stroke()

        }


    }

    // 随机颜色
    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`

    }

})

function PasswordStrength(passwordID, strengthID) {
    this.init(strengthID);
    const _this = this;
    document.getElementById(passwordID).onkeyup = function () {//onkeyup 事件,在键盘按键被松开时发生,进行判断
        _this.checkStrength(this.value);
    }
}

PasswordStrength.prototype.init = function (strengthID) {
    const id = document.getElementById(strengthID);
    const div = document.createElement('div');
    const strong = document.createElement('strong');
    this.oStrength = id.appendChild(div);
    this.oStrengthTxt = id.parentNode.appendChild(strong);
};
PasswordStrength.prototype.checkStrength = function (val) { //验证密码强度的函数
    let lv = 0; //初始化提示消息为空
    if (val.match(/[a-z]/g)) {
        lv++;
    } //验证是否包含字母
    if (val.match(/[0-9]/g)) {
        lv++;
    } // 验证是否包含数字
    if (val.match(/(.[^a-z0-9])/g)) {
        lv++;
    } //验证是否包含字母，数字，字符
    if (val.length < 6) {
        lv = 0;
    } //如果密码长度小于6位，提示消息为空
    if (lv > 3) {
        lv = 3;
    }
    this.oStrength.className = 'strengthLv' + lv;
    // this.oStrengthTxt.innerHTML = aLvTxt[lv];
};
new PasswordStrength('password', 'pwdStrength');