// ==UserScript==
// @name         b站稍后再看链接替换
// @version      0.70
// @description  稍后再看链接替换
// @author       dyxlike
// @match        https://www.bilibili.com/watchlater/
// @grant        none
// @namespace https://github.com/dyxcloud
// ==/UserScript==

(function() {
    'use strict';


//v0.7 更精确的链接替换范围
//v0.6 更新正则表达式, 适配b站新的BV号, 去掉了原来AV号的后发断言

const reWatch = /watchlater\/#/;
const reP = /\/p(?=\d+)/;
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

function getTargets(){
    let result =document.querySelectorAll('a.av-pic,.av-about>a');
    console.log(result.length);
    return result;
}

function trans() {
    let elements = getTargets();
    for (let e of elements) {
        let str = e.getAttribute("href");
        if (str != null && str.indexOf("/watchlater/#") !== -1) {
            console.log("geted!!" + str);
            e.setAttribute('href', transUrl(str));
            e.setAttribute('target', "_blank");
        }
    }
}

let timesRun = 0;
let timer = setInterval(function(){
    if(timesRun >= 6){
        clearInterval(timer);
    }
    timesRun++;
    trans();
},500);



})();
