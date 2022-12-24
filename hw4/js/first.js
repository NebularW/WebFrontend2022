let container=document.querySelector('label');
let dark = false;
container.onclick=function () {
    //查询的是div当中的className
    console.log('switch');
    if(dark===false){
        dark = true;
        document.documentElement.setAttribute('theme', 'dark');
    }else{
        dark = false;
        document.documentElement.setAttribute('theme', 'light');
    }
}
