// ==UserScript==
// @name         定时监控json接口数据变化
// @namespace    https://github.com/dyxcloud
// @version      0.1
// @description  监控rewasd完全版的人民币售价
// @author       dyxLike
//@crontab 15 */3 * * *
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @connect www.daemon-tools.cc
// @cloudCat
// @exportCookie domain=www.daemon-tools.cc
// ==/UserScript==

let url = 'https://www.daemon-tools.cc/chn/cart/check?fields%5Bcoupon_code%5D=&fields%5Bcountry_code%5D=CN&fields%5Bvat_number%5D=&fields%5Buser_email%5D=&fields%5Bpayment_system_abbr%5D=payproWechat&fields%5Bvat_is_valid%5D=&fields%5Bsuborders%5D%5B0%5D%5Bproduct_id%5D=45&fields%5Bsuborders%5D%5B0%5D%5Bproduct_abbr%5D=rewasd&fields%5Bsuborders%5D%5B0%5D%5Brecipient_user_email%5D=&fields%5Bsuborders%5D%5B0%5D%5Btype%5D=0&fields%5Bsuborders%5D%5B0%5D%5Blifetime%5D=1&fields%5Bsuborders%5D%5B0%5D%5Bfeatures%5D%5B0%5D=advanced-mapping&fields%5Bsuborders%5D%5B0%5D%5Bfeatures%5D%5B1%5D=macros&fields%5Bsuborders%5D%5B0%5D%5Bfeatures%5D%5B2%5D=four-slots&fields%5Bsuborders%5D%5B0%5D%5Bfeatures%5D%5B3%5D=rapid-fire&fields%5Bsuborders%5D%5B0%5D%5Bhas_subscription%5D=false&fields%5Bsuborders%5D%5B0%5D%5Bshare_product%5D=false&fields%5Bsuborders%5D%5B0%5D%5Blicense_configuration%5D%5Binstances%5D=1&fields%5Bsuborders%5D%5B0%5D%5Bnum%5D=0&fields%5Bsuborders%5D%5B0%5D%5Badded_to_cart%5D=true&requestNum=3';

function msg(text) {
    GM_notification({
        title: 'reWASD价格监控 - ScriptCat',
        text: text,
    });
}

return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (xhr) {
            let data = JSON.parse(xhr.responseText);
            let value = data.data.total;
            let text;
            if (value < 98) {
                text = "价格下降:" + value;
                msg(text);
            } else {
                text = '价格不变:' + value;
            }
            resolve(text);
        },
        onerror: function (e) {
            let text = "查询reWasd接口失败" + e;
            msg(text);
            reject(text);
        }
    });
});
