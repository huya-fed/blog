/*
* @Author: xiejinlong
* @Date:   2017-02-16 16:19:21
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-08 16:30:44
*/

;(function(){

	var response = {
		//获取ip
		/*getIpInfo : function(){
			return UTIL.getIpInfo();
		},*/

		openSmallwindows : function(request){


			chrome.windows.create({
				url : request.url,
				left : window.screen.width-650,
				top : window.screen.height-450,
				width : 650,
				height : 450,
				focused : true,
				type:"popup"
			})
		},
		optionsPage : function(request){
			
			chrome.storage.local.set({
				"optionsPage" : request.formObj
			})

			if(request.formObj.push == false){
				chrome.alarms.clear('noticeShow');
			}else{

				chrome.alarms.create('noticeShow',{
					delayInMinutes : +request.formObj.mins_val,
					periodInMinutes : +request.formObj.mins_val
				})
			}


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



