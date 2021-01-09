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

    /**
     * 获取坦克表格行tr列表
     * @returns {HTMLCollection}
     */
    function getRowList() {
        let table = document.querySelector("#app > div.section-content > div > div:nth-child(3) > div > div > div > table > tbody");
        return table.children;
    }

    /**
     * 降序排序
     * @param {string} type 排序字段
     */
    function sort(type) {
        let markClass; //标伤单元格的class样式
        switch (type) {
            case "65":
                markClass = ".value-0";
                break;
            case "85":
                markClass = ".value-1";
                break;
            case "95":
                markClass = ".value-2";
                break;
            case "100":
                markClass = ".value-3";
                break;
            default:
                return;
        }

        let trArr = getRowList();
        let length = trArr.length;
        console.log(trArr);
        console.log(length);
        for (let i = 1; i < length; i++) {
            let tmpHtml = trArr[i].innerHTML;
            let tmpScore = getScore(trArr[i], markClass);
            let j = i - 1;
            while (j >= 0 && tmpScore > getScore(trArr[j], markClass)) {
                trArr[j + 1].innerHTML = trArr[j].innerHTML;
                j--;
            }
            trArr[j + 1].innerHTML = tmpHtml;
        }
    }


    /**
     * 获取标伤数值
     * @param rowTag
     * @param markClass 标伤单元格的class样式
     * @returns {number}
     */
    function getScore(rowTag, markClass) {
        const reg = /\d+/;
        let param = rowTag.querySelector(markClass).innerHTML;
        if (!reg.test(param)) {
            return 0;
        }
        return param - 0;
    }


    /**
     * 从tasks.gg获取坦克列表
     * @returns {Promise<JSON>}
     */
    function getTaskListJson() {
        const TASK_LIST_URL = "https://tanks.gg/api/list";
        return fetch(TASK_LIST_URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                return myJson;
            });
    }

    /**
     * TODO 添加金币车图标
     */
    function addGoldTag() {
        //处理表头 表尾
        let tHead = document.querySelector("#app > div.section-content > div > div:nth-child(3) > div > div > div > table > thead > tr");
        let thElement = document.createElement('th');
        thElement.className = "text-center";
        thElement.innerHTML = "Gold";
        tHead.appendChild(thElement);
        let tFoot = document.querySelector("#app > div.section-content > div > div:nth-child(3) > div > div > div > table > tfoot > tr");
        let thFootElement = document.createElement('th');
        thFootElement.className = "text-center";
        thFootElement.innerHTML = "Gold";
        tFoot.appendChild(thFootElement);
        //处理表体
        let trArr = getRowList();
        let length = trArr.length;
        for(let i=0;i<length;i++){
            let tr = trArr[i];
            let td_element = document.createElement('td');
            td_element.innerHTML = "<img src='https://tanks.gg/img/icons/gold.png'  alt />";
            tr.appendChild(td_element);
            console.log("added");
        }
    }

    function main() {
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

        setTimeout(function () {
            addGoldTag();
        },3000);
    }

    main();

})();
