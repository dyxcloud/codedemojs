// ==UserScript==
// @name         B站订阅页面自动筛选"在看"番剧和电影
// @namespace    https://github.com/dyxcloud
// @version      0.1
// @description  订阅页面的筛选自动选择"在看", 在"追番"和"追剧"两个页面生效
// @author       dyxLike
// @match        https://space.bilibili.com/*/bangumi
// @match        https://space.bilibili.com/*/cinema
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


    function _getTime() {
        let element = document.querySelector('span.bilibili-player-video-time-now');
        return element.textContent
            .split(':')
            .reduce((accumulator, x) => accumulator * 60 + parseInt(x), 0);
    }

    const SEEK_KEY = 'seekdata';

    function updateUrl() {
        let time = _getTime();
        let url = new URL(window.location);
        url.searchParams.set(SEEK_KEY, time + '');
        window.history.replaceState({}, '', url);//b站pushState无效
    }


    document.addEventListener('keydown',(e)=>{
        if(e.ctrlKey&&e.key==='d'){
            updateUrl();
        }
    });

//<a class="video-seek" data-p="-1" data-time="437">7：17</a>

})();
