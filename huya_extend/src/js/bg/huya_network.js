/*
* @Author: xiejinlong
* @Date:   2017-02-17 15:10:33
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-02-20 15:18:38
*/

;(function(){


	//获取当前请求tab的url
	function getTabUrl(tabId){
		return new Promise(function(resolve, reject){

			chrome.tabs.get(tabId,function(tabDetail){

				var tempUrl = tabDetail.url;
				var url = tempUrl.indexOf('?')>-1 ? tempUrl.substring(0,tempUrl.indexOf('?')) : tempUrl;

				resolve(url);
			})
		})
	}

	//将错误存储
	function storageError(tabUrl,details){
		chrome.storage.local.get('errResources', function(tab) {
					
			tab.errResources = tab.errResources || [];

            tab.errResources.push({
            	eid:'error/resources',
				status : details.statusCode,
				resouceName : encodeURIComponent(details.url),
				urlType : details.type,
				ip : details.ip,
				timeStamp : details.timeStamp,
				tabUrl : tabUrl
			})

            console.debug('存在错误的资源:');
			console.debug(tab)

            chrome.storage.local.set(tab);

        });
	}



	// 当请求完成时产生。
	// 捉取4xx，5xx
	chrome.webRequest.onCompleted.addListener(function(details) {

			var statusCode = (details.statusCode+'').charAt(0);

			if(statusCode == 4 || statusCode == 5){

				getTabUrl(details.tabId).then(function(tabUrl){
					storageError(tabUrl,details)
				});
				
			}
		},
		{
	    	urls: ['*://*.huya.com/*','*://*.dwstatic.com/*','*://hls.huanjuyun.com/*','*://lgn.yy.com/*','*://res.udb.duowan.com/*'],
	    	types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'object', 'xmlhttprequest']
	  	}
	);

})()