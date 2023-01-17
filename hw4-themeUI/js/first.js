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
