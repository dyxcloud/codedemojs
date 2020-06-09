// ==UserScript==
// @name         jav tag copy
// @namespace    https://github.com/dyxcloud
// @version      0.1
// @description  获取页面的tag,返回带tag的文件名 "番号标题 #tag1 #tag2.."
// @author       dyxlike
// @match        http://www.g46e.com/*
// @match        http://javlib.com/*
// @match        http://www.javlibrary.com/*
// @match        https://www.javbus.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';



function javlibGetter(){
    let result = '';
    //获取标题
    let title = document.querySelector('#video_title > h3').innerText;
    console.log("title="+title);
    result+=title;

    //获取start
    let starAs = document.querySelectorAll('span.star > a');
    console.log(starAs.length);
    for(let a of starAs){
        console.log("star="+a.text);
        result+=(" #"+a.text);
    }

    //获取tag
    let tagAs = document.querySelectorAll('span.genre > a');
    console.log(tagAs.length);
    for(let a of tagAs){
        console.log("tag="+a.text);
        result+=(" #"+a.text);
    }
    return result;
}

function javbusGetter(){
    let result = '';
    //获取标题
    let title = document.querySelector('body > div.container > h3').innerText;
    console.log("title="+title);
    result+=title;

    //获取start
    let starAs = document.querySelectorAll('span.genre > a[href*="https://www.javbus.com/star/');
    console.log(starAs.length);
    for(let a of starAs){
        console.log("star="+a.text);
        result+=(" #"+a.text);
    }

    //获取tag
    let tagAs = document.querySelectorAll('span.genre > a[href*="https://www.javbus.com/genre/');
    console.log(tagAs.length);
    for(let a of tagAs){
        console.log("tag="+a.text);
        result+=(" #"+a.text);
    }
    return result;
}

function javlib(){
    let avname = document.createElement('a');
    avname.innerText='点击复制tag文件名';
    avname.href="#";
    let video_info = document.querySelector('#video_info');
    video_info.append(avname);

    avname.onclick = function () {
        let result = javlibGetter();
        GM_setClipboard(result);
    };
}

function javbus(){
    let avname = document.createElement('a');
    avname.innerText='点击复制tag文件名';
    avname.href="#";
    let video_info = document.querySelector('body > div.container > div.row.movie > div.col-md-3.info');
    video_info.append(avname);

    avname.onclick = function () {
        let result = javbusGetter();
        GM_setClipboard(result);
    };
}
    
function main(){
    let title = document.title;
    if ((/JAVLib/g).test(title)){
        javlib();
    }else if((/JavBus/g).test(title)){
        javbus();
    }
}

main();

})();