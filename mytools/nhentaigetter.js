
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

/**
 * 从文件url来获取文件名
 * @param {string} url 
 */
function getFileName(url){
    var urlarr = url.split('?');
    var sp = urlarr[0].split('/');
    return sp[sp.length-1];
}

/**
 * 获取页面漫画标题
 */
function getTitle(){
    var h2 = document.querySelector('#info > h2');
    var text = h2.innerHTML;
    return text;
}

/**
 * 调用浏览器下载功能
 * @param {string} url 
 */
function download(url){
    var filename = getFileName(url);
    fetch(url,{
        mode: "no-cors"
    }).then(res => res.blob().then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }));
}


console.log(getTitle());
var imgs = document.querySelectorAll('.gallerythumb > img');
for(var img of imgs){
    var src = img.getAttribute('data-src');
    src = transUrl(src);
    download(src);
}