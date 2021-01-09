// ==UserScript==
// @name         坦克世界击杀环标伤数据排序 WOT world of tanks
// @name:en      World of Tanks Kill ring sort
// @namespace    https://github.com/dyxcloud
// @version      0.0.5
// @description  将毛服击杀环的数据进行排序
// @description:en  Sort the data of Russian service kill ring
// @author       dyxlike
// @match        https://lebwa.tv/lebwa-team/marks-of-excellence
// ==/UserScript==

(function () {
    'use strict';

    //https://tanks.gg/api/list

    /**
     * 排序
     * @param {string} type 排序字段
     */
    function sort(type) {
        let intType;
        if (type === "65") {
            intType = 4;
        } else if (type === "85") {
            intType = 5;
        } else if (type === "95") {
            intType = 6;
        } else if (type === "100") {
            intType = 7;
        } else {
            return;
        }

        let table = document.querySelector("#app > div.section-content > div > div:nth-child(3) > div > div > div > table > tbody");
        let trArr = table.children;
        let length = trArr.length;
        for (let i = 1; i < length; i++) {
            let tmpHtml = trArr[i].innerHTML;
            let tmpScore = getScore(trArr[i], intType);
            let j = i - 1;
            while (j >= 0 && tmpScore > getScore(trArr[j], intType)) {
                trArr[j + 1].innerHTML = trArr[j].innerHTML;
                j--;
            }
            trArr[j + 1].innerHTML = tmpHtml;
        }
    }

    const reg = /\d+/;
    function getScore(rowTag,intType){
        let param = rowTag.children[intType].innerHTML;
        if(!reg.test(param)){
            return 0;
        }
        return param - 0;
    }

    let e65 = document.querySelector("#app > div.section-content > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(5)");
    let e85 = document.querySelector("#app > div.section-content > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(6)");
    let e95 = document.querySelector("#app > div.section-content > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(7)");
    let e100 = document.querySelector("#app > div.section-content > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(8)");

    e65.addEventListener('click', function () {
        sort("65");
    });
    e85.addEventListener('click', function () {
        sort("85");
    });
    e95.addEventListener('click', function () {
        sort("95");
    });
    e100.addEventListener('click', function () {
        sort("100");
    });

})();
