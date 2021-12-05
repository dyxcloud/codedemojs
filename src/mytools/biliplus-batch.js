// ==UserScript==
// @name         biliplus弹幕文件批量下载
// @namespace    https://github.com/dyxcloud
// @version      0.01
// @description  批量从biliplus下载某一个av号下所有分P的弹幕xml文件, 不用再一个一个点了, xml文件名是分P的名称
// @author       dyxlike
// @match        https://www.biliplus.com/video/*
// @grant        GM_download
// @connect      *
// @license MIT
// ==/UserScript==

(function () {
    'use strict';

    function getNameMap() {
        let nameMap = new Map();
        let partDivs = document.querySelectorAll("div.part_title");
        for (let part of partDivs) {
            let idStr = part.id.substring(4);
            nameMap.set(idStr, part.innerText);
        }
        return nameMap;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function downloadAll() {
        let nameMap = getNameMap();
        let count = 10;
        for (let [key, value] of nameMap.entries()) {
            let url = `https://comment.bilibili.com/${key}.xml`;
            let fileName = value.replace(/[/\\?%*:|"<>]/g, '-');
            console.log(fileName+"      "+url);
            GM_download({
                url: url,
                name: fileName+".xml",
                onerror: function (e) {
                    console.log(e);
                }
            });
            count--;
            if (count === 0) {
                await sleep(5000);
                count = 10;
            }
        }
    }

    //生成下载按钮
    let topMenu = document.querySelector('.sidebar');
    let newA = document.createElement('a');
    newA.innerText = "下载全部弹幕文件";
    newA.onclick = function () {
        downloadAll();
        return false;
    };
    topMenu.appendChild(newA);


})();
