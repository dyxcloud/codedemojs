let url = "https://t.nhentai.net/galleries/1599898/1t.jpg";
url = url.replace('https://t.nhentai.net', 'https://i.nhentai.net');
url = url.replace('t.jpg', '.jpg', 1);
url = url.replace('t.jpg', '.jpg');

console.log(url);
