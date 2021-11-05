// ==UserScript==
// @name         书签记录B站视频播放进度
// @namespace    https://github.com/dyxcloud
// @version      0.1
// @description  书签记录B站视频播放进度
// @author       dyxLike
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /*
    搁置...
    1.其他b站脚本会重置url
    2.b站自带历史记录功能会重绘页面
    3.时间戳标签不能点击跳转
     */
    
    
    function _strToSec(str){
        return str.split(':')
            .reduce((accumulator, x) => accumulator * 60 + parseInt(x), 0);
    }

    function _getTime() {
        let element = document.querySelector('span.bilibili-player-video-time-now');
        return element.textContent;
    }

    const SEEK_KEY = 'seekdata';

    function updateMyUrl() {
        let time = _getTime();
        let url = new URL(window.location);
        url.searchParams.set(SEEK_KEY, time + '');
        window.history.replaceState({}, '', url);//b站pushState无效
    }

    function createButton() {
        //创建更新url按钮
        let vData = document.querySelector('h1.video-title');
        vData.innerHTML += '<span style="margin-left: auto;"><a id="upbtn1">点击更新URL时间..     </a></span>';
        //检查url
        let url = new URL(window.location);
        let seekData = url.searchParams.get(SEEK_KEY);
        //创建seek按钮
        if (seekData) {
            vData.innerHTML += '<span>上次观看进度:<a class="video-seek" data-p="-1" data-time="' + _strToSec(seekData) + '">'+seekData+'</a></span>';
        }
    }

    setTimeout(function () {
        //创建按钮
        createButton();
        document.getElementById('upbtn1').addEventListener("click", updateMyUrl);
        //监听收藏事件
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                updateMyUrl();
            }
        });
    }, 1500);

})();
