// ==UserScript==
// @name         jav tag copy
// @namespace    https://github.com/dyxcloud
// @version      0.5.7.1
// @description  获取页面的tag,返回带tag的文件名 "番号标题 #tag1 #tag2.."
// @author       dyxlike
// @include     *://*javlibrary.com/*
// @include     *://*javlib.com/*
// @include     *://*javbus.com/*
// @include     *://*avsox.*/*
// @include     *://*javdb.com*/*
// @grant        GM_setClipboard
// @license MIT
// ==/UserScript==

(function() {
    'use strict';



function javLibGetter(){
    let result = '';
    //获取标题
    let title = document.querySelector('#video_title > h3').innerText;
    console.log("title="+title);
    result+=title;

    //获取star
    let starAs = document.querySelectorAll('span.star > a');
    if (starAs.length > 0) {
        result += " ";
        for(let a of starAs){
            console.log("star="+a.text);
            result+=("#"+a.text);
        }
    }

    //获取tag
    let tagAs = document.querySelectorAll('#video_genres span.genre > a');
    if(tagAs.length>0){
        result += " ";
        for(let a of tagAs){
            console.log("tag="+a.text);
            result+=("#"+a.text);
        }
    }
    return result;
}

function javLib(){
    let button = document.createElement('a');
    button.innerText='点击复制tag文件名';
    button.href="#";
    let video_info = document.querySelector('#video_info');
    video_info.append(button);

    button.onclick = function () {
        let result = javLibGetter();
        GM_setClipboard(result);
    };
}

function javBusGetter(){
    let result = '';
    //获取标题
    let title = document.querySelector('body > div.container > h3').innerText;
    console.log("title="+title);
    result+=title;

    //获取star
    let starAs = document.querySelectorAll('span.genre > a[href*="/star/"]');
    if (starAs.length > 0) {
        result += " ";
        for(let a of starAs){
            console.log("star="+a.text);
            result+=("#"+a.text);
        }
    }

    //获取tag
    let tagAs = document.querySelectorAll('span.genre a[href*="/genre/"]');
    if(tagAs.length>0){
        result += " ";
        for(let a of tagAs){
            console.log("tag="+a.text);
            result+=("#"+a.text);
        }
    }
    return result;
}

function javBus(){
    let button = document.createElement('a');
    button.innerText='点击复制tag文件名';
    button.href="#";
    let video_info = document.querySelector('body > div.container > div.row.movie > div.col-md-3.info');
    video_info.append(button);

    button.onclick = function () {
        let result = javBusGetter();
        GM_setClipboard(result);
    };
}

function avSoxGetter(){
    let result = '';
    //获取标题
    let title = document.querySelector('body > div.container > h3').innerText;
    console.log("title="+title);
    result+=title;

    //获取star
    let starAs = document.querySelectorAll('#avatar-waterfall > a');
    if (starAs.length > 0) {
        result += " ";
        for(let a of starAs){
            let span = a.children[1];
            console.log("star="+span.innerText);
            result+=("#"+span.innerText);
        }
    }

    //获取tag
    let tagAs = document.querySelectorAll('span.genre a[href*="/genre/"]');
    if(tagAs.length>0){
        result += " ";
        for(let a of tagAs){
            console.log("tag="+a.text);
            result+=("#"+a.text);
        }
    }
    result+=("#无码");
    return result;
}

function avSox(){
    let button = document.createElement('a');
    button.innerText='点击复制tag文件名';
    button.href="#";
    let video_info = document.querySelector("div.col-md-3.info");
    video_info.append(button);

    button.onclick = function () {
        let result = avSoxGetter();
        GM_setClipboard(result);
    };
}


    function javDbGetter(){
        let result = '';
        //获取标题
        let title = document.querySelector('.title.is-4').innerText;
        console.log("title="+title);
        result+=title;

        //获取star
        let starAs = document.querySelectorAll('nav.panel.movie-panel-info a[href*="/actors/"]');
        if (starAs.length > 0) {
            result += " ";
            for(let a of starAs){
                console.log("star="+a.text);
                result+=("#"+a.text);
            }
        }

        //获取tag
        let tagAs = document.querySelectorAll('nav.panel.movie-panel-info a[href*="/tags"]');
        if(tagAs.length>0){
            result += " ";
            for(let a of tagAs){
                console.log("tag="+a.text);
                result+=("#"+a.text);
            }
        }
        return result;
    }

    function javDb(){
        let button = document.createElement('a');
        button.innerText='点击复制tag文件名';
        button.href="#";
        let video_info = document.querySelector(".panel.movie-panel-info");
        video_info.append(button);
        button.onclick = function () {
            let result = javDbGetter();
            GM_setClipboard(result);
        };
        video_info.append(document.createElement('br'));
        let button2 = document.createElement('a');
        button2.innerText='点击复制tag文件名(#无码)';
        button2.href="#";
        video_info.append(button2);
        button2.onclick = function () {
            let result = javDbGetter();
            GM_setClipboard(result+'#无码');
        };
    }
    
function main(){
    let title = document.title;
    if ((/JAVLib/g).test(title)) {
        javLib();
    } else if ((/JavBus/g).test(title)) {
        javBus();
    } else if ((/AVSOX/g).test(title)) {
        avSox();
    } else if ((/JavDB/g).test(title)) {
        javDb();
    }
}

main();

})();
