
/**
 * 获取页面漫画标题
 */
function getTitle(){
    var h2 = document.querySelector('#info > h2');
    var text = h2.innerHTML;
    return text;
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
    var result = '';
    for(var img of imgs){
        var src = img.getAttribute('data-src');
        src = transUrl(src);
        result +=  (src + '\r\n');
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
function main(self){
    console.log(getTitle());
    copyText(getAllUrl());
    self.innerText = '复制完成';
    var event = event || window.event;
    event.preventDefault();
}

var topmenus = document.querySelectorAll('.desktop');
var info = topmenus[topmenus.length-1];
var a = info.querySelector('a');
a.innerText = '点击复制图片';
a.onclick = function(){ main(this); }




//https://nhentai.net/g/307036/

