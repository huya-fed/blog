/*
* @Author: xiejinlong
* @Date:   2017-02-15 15:53:07
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-02 11:10:06
*/

//https://crxdoc-zh.appspot.com/extensions/notifications#event-onShowSettings

var noticeObserver = new Events(); 

chrome.notifications.onClicked.addListener(function(notificationId){
	if(notificationId.indexOf('http')==0){
		window.open(notificationId);
		chrome.notifications.clear(notificationId);
	}else{
		noticeObserver.trigger(notificationId);
	}
})


chrome.notifications.onClosed.addListener(function(notificationId){
	noticeObserver.off(notificationId);
})