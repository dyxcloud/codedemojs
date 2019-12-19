


var reWatch = /watchlater\/#/
var reP = /(?<=av\d+)\/p(?=\d+)/
/**
 * @description 转换url
 * www.bilibili.com/watchlater/#/av75216330/p2 
 * to 
 * www.bilibili.com/video/av75216330?p=2
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
    if(timesRun >= 3){    
        clearInterval(timer);    
    }
    timesRun++;
    trans();
},2000);