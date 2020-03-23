//v0.6 更新正则表达式, 适配b站新的BV号, 去掉了原来AV号的后发断言

var reWatch = /watchlater\/#/
var reP = /\/p(?=\d+)/
/**
 * @description 转换url
 * www.bilibili.com/watchlater/#/av75216330/p2 
 * to 
 * www.bilibili.com/video/av75216330?p=2
 * 
 * www.bilibili.com/watchlater/#/BV1mE411F7tV/p1
 * to
 * www.bilibili.com/video/BV1mE411F7tV?p=1
 */
function transUrl(str){
    str = str.replace(reWatch, "video");
    str = str.replace(reP, "?p=");
    return str;
}

function trans() {
    var elements = document.getElementsByTagName('a');
    console.log("get " + elements.length + " <a>:")
    for (var i = 0; i < elements.length; i++) {
        var str = elements[i].getAttribute("href");
        if (str != null && str.indexOf("/watchlater/#") != -1) {
            console.log("geted!!" + str);
            elements[i].setAttribute('href', transUrl(str));
            elements[i].setAttribute('target', "_blank");
        }
    }
}

var timesRun = 0;
var timer = setInterval(function(){
    if(timesRun >= 6){    
        clearInterval(timer);    
    }
    timesRun++;
    trans();
},500);