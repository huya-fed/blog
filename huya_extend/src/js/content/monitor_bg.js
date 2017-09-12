/*
* @Author: xiejinlong
* @Date:   2017-02-20 17:37:37
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-09 09:28:56
*/

;(function(){

	var response = {
		popupStartUp : function(){
			ga('send', {
				hitType: 'pageview',
				page: '/popupStartUp',
				title: '订阅弹层启动'
			});
		},
		popupClickLi : function(){
			ga('send', 'event', 'popup', 'click_li', {'nonInteraction': 1});
		}
	}


	//这里的sendResponse只能采用同步的方式，在回调哪里传递不成功不知道为什么
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

		var func = response[request.action];
		
		if(func && typeof func === 'function'){
			sendResponse(func(request,sender));
		}
			
	});

})()