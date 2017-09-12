/*
* @Author: xiejinlong
* @Date:   2017-02-14 19:38:13
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-08 17:12:43
* 里面有jq、event函数
*/

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
	//获取桌面通知的权限
	getNoticePermission : function(){

		var getPermission = new Promise(function(resolve, reject){
			chrome.notifications.getPermissionLevel(function(level){
				if(level == 'granted'){
					resolve();
				}else{
					reject();
				}
			})
		})

		return  getPermission;
	}
}





//监听信息
__inline('bg/monitor_message.js');

//桌面通知绑定事件
__inline('bg/notice_event.js');

//通知主播开播了
__inline('bg/notice_show.js');




//监控虎牙子域名下的网络资源状况
//__inline('bg/huya_network.js')



//crv版本更新
__inline('bg/update_version.js');


