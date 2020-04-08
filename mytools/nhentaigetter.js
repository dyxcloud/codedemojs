// ==UserScript==
// @name         nhentai图片批量下载
// @namespace    https://github.com/dyxcloud
// @version      0.20
// @description  解析nhentai页面的漫画url, 可以复制所有大图连接, 或者打包下载zip
// @author       dyxlike
// @match        https://nhentai.net/g/*
// @require      https://cdn.jsdelivr.net/npm/jszip@3.2.2/dist/jszip.min.js
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.js
// @grant        GM_xmlhttpRequest
// @connect      *
// ==/UserScript==

(function() {
    'use strict';


/**
 * 获取页面漫画标题
 */
function getTitle(){
    var h2 = document.querySelector('#info > h2');
    var text = h2.innerHTML;
    return text;
}

/**
 * 从文件url来获取文件名
 * @param {string} url 
 */
function getFileName(url){
    var urlarr = url.split('?');
    var sp = urlarr[0].split('/');
    var result = sp[sp.length-1];
    return result;
}

/**
 * 缩略图url转为大图url
 * @param {string} url 
 */
function transUrl(url){
    url = url.replace('https://t.nhentai.net','https://i.nhentai.net');
    url = url.replace('t.jpg','.jpg',1);
    url = url.replace('t.png','.png',1);
    return url;
}

function getAllUrl(){
    var imgs = document.querySelectorAll('.gallerythumb > img');
    var result = [];
    for(var img of imgs){
        var src = img.getAttribute('data-src');
        src = transUrl(src);
        result.push(src);
    }
    console.log(result);
    return result;
}

function copyText(text){
    var ta = document.getElementById('ta')
    if(ta){
        ta.innerHTML = '';
    }else{
        ta = document.createElement('textarea');
        ta.style="width:800px;height:200px";
        ta.id = 'ta';
        var comments = document.querySelector('#comment-container');
        comments.appendChild(ta);
    }
    ta.innerHTML = text;
    ta.select();
    console.log('copy='+document.execCommand('copy'));
}

/**
 * 入口函数
 */
function mainCopy(self){
    var result = getAllUrl();
    var line = '';
    for(var u of result){
        line +=  (u + '\r\n');
    }
    copyText(line);
    self.innerText = '复制完成';
    // var event = event || window.event;
    // event.preventDefault();
}


/**
 * 返回blob数组
 * @param {Array<string>} urls 
 */
function fetchBlobs(urls){
    console.log("fetchBlobs获取到个数:"+urls.length);
    return Promise.all(urls.map(GMFetch));
}

/**
 * 返回blob
 * @param {string} url 
 */
function GMFetch(url){
    return new Promise((resolve)=>{
        console.log('开始请求:'+url);
        GM_xmlhttpRequest({
            url : url,
            responseType: 'blob',
            onload : function(re){
                var blob = re.response; //TODO 此处必须先获取到blob对象再赋值
                blob.name = getFileName(url);
                console.log('获取到请求响应'+blob.size);
                console.log('获取到请求响应'+blob.name);
                setTextById('azip', '下载中:' + (++pageCount) + '/' + pageNum);
                resolve(blob);
            },
            onerror:function(){
                console.log('请求失败:'+url);
            }
        });
    }).then((blob)=>{return blob});
}

/**
 * blob数组打压缩包
 * @param {Array<Blob>} blobs 
 */
function pack(blobs) {
    console.log('获取到blob个数:'+blobs.length);
    const zip = new JSZip();
    blobs.forEach((blob) => zip.file(blob.name, blob));
    setTextById('azip','打包中');
    return zip.generateAsync({type : "blob"});
}

var pageNum = 0;
var pageCount = 0;

function mainDownloadZip(){
    var urls = getAllUrl();
    pageNum = urls.length;
    fetchBlobs(urls).then(pack).then((zipblob) => {
        saveAs(zipblob, getTitle() + ".zip");
        setTextById('azip','下载完成');
    });
    
    // var event = event || window.event;
    // event.preventDefault();
}

/**
 * 设置按钮的文本
 * @param {string} id 
 * @param {string} text 
 */
function setTextById(id, text){
    var a = document.querySelector('#'+id);
    a.innerText = text;
}




//生成复制按钮
var topmenus = document.querySelectorAll('.desktop');
var info = topmenus[topmenus.length-1];
var a = info.querySelector('a');
a.id = 'aurl';
a.innerText = '点击复制图片链接';
a.onclick = function(){ mainCopy(this);return false; }
//生成下载按钮
var cloneN = info.cloneNode(true);
a = cloneN.querySelector('a');
a.id = 'azip';
a.innerText = '点击打包下载';
a.onclick = function(){ mainDownloadZip();return false; }
info.parentNode.appendChild(cloneN);


//https://nhentai.net/g/307036/


})();