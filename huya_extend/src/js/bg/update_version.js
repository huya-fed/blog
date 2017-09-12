/*
* @Author: xiejinlong
* @Date:   2017-02-15 09:56:17
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-04-26 14:17:21
*/


;(function(){




	//桌面通知-插件更新
	function notifications(json){

		//生成通知
		var createNotice = function(){
			chrome.notifications.create(json.openUrl,json.options)
		}


	
		UTIL.getNoticePermission()
			.then(createNotice)
	}


	function update_version(json){
		if(json.status == 200 && +manifestJson.version < +json.data.version){

			chrome.browserAction.setBadgeText({
				text : 'new'
			});

			chrome.browserAction.setBadgeBackgroundColor({
				color : '#F00'
			})

			notifications(json.data);
		}
	}


	
	UTIL.fetch({
		url: 'https://237368756.github.io/live_box/js/update.json',
		success : update_version,
		fail : function(ex){
			console.log('update_version parsing failed', ex);
		}
	})

})()

