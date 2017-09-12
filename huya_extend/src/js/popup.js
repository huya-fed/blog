/*
* @Author: xiejinlong
* @Date:   2017-02-16 11:21:13
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-08 17:34:35
*/

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, {action: "popupStartUp"});
});



//全网络平台的主播订阅
__inline('popup/sub_list.js');




