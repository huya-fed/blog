/*
* @Author: xiejinlong
* @Date:   2017-02-14 19:38:13
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-08 17:42:55
* 在这里通过动态插入的js，是获取不到里面对象的，而且还会影响原来页面的js资源
*/

//var serverUrl = 'http://172.28.25.13:8080/';
//清单文件详情
var manifestJson = chrome.runtime.getManifest();

//工具类
var UTIL = {

	fetch : function(ajaxJson){
		fetch(ajaxJson.url)
			.then(function(response) {
			    return response.json()
			})
			.then(ajaxJson.success)
			.catch(ajaxJson.fail)
	},
	parseQueryString : function(url){
		var pos;
	    var obj = {};
	    if ((pos = url.indexOf("?")) != -1) {
	        var param = url.substring(pos+1, url.length)
	        var paramArr = param.split('&');
	        var keyValue = [];
	        for (var i = 0, l = paramArr.length; i < l; i++) {
	            keyValue = paramArr[i].split('=');
	            obj[keyValue[0]] = keyValue[1];
	        }
	    }
	    return obj;
	},
	/**
     * 插入样式
     */
    importStyle : function(cssText, id){
        if (document.getElementById(id)) return;

        var element = document.createElement('style');

        id && (element.id = id);

        // Adds to DOM first to avoid the css hack invalid
        document.getElementsByTagName('head')[0].appendChild(element);

        element.innerHTML = cssText;
    }
}

ga('create', 'UA-93168611-1', 'auto');
ga('set', 'forceSSL', true);
ga('send', {
  hitType: 'pageview',
  page: location.href
});

ga('send', 'event', 'version', manifestJson.version, {'nonInteraction': 1});




//监听来自bg.js的信息
__inline('content/monitor_bg.js');

//小窗口观看
__inline('content/small_window.js');


//页面的性能上报
__inline('content/page_performance.js');

//页面资源错误上报
__inline('content/err_report.js');




//内部静默更新的采用外链的形式加载
//__inline('content/outside.js')


