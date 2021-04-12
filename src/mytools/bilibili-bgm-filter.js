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

    function watchingFilter() {
        let span = document.querySelector('.cur-filter');
        let lis = document.querySelectorAll('.be-dropdown-menu.menu-align-left>li');
        if (lis) {
            lis[2].click();
            span.click();
        }
    }

    let currentId;

    window.onload = function () {
        watchingFilter();
        document.querySelector('.s-space').addEventListener('DOMSubtreeModified', function () {
            //判断是否切换了sheet
            let newId = document.querySelector('.s-space>div>div').id;
            if (currentId === newId) {
                return;
            }
            currentId = newId;
            watchingFilter();
        }, false);
    };

})();
