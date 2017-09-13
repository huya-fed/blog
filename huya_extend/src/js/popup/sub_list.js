/*
* @Author: xiejinlong
* @Date:   2017-02-22 14:40:13
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-09-12 18:25:49
*/


function SubList(){
	this.initialize.apply(this, arguments);
}


var nowTime = new Date().getTime(); 

function showTime(time){
	var result = ((nowTime - time) / (60 *1000)).toFixed(0);  // 秒


	var min = result % 60;
	var hour = Math.floor(result / 60);


	return '已播' + hour + '时' + min + '分';


 
}


SubList.prototype = {
	initialize : function(){
		this.$loading = $('#loading');
		this.$subscribe = $('.subscribe');
		this.subListTmpl = __inline('../../tpl/sub_list.tmpl')


		this._bindEvent();
	},
	appendList : function(index,oData){

		this._removeLoad();

		this.$subscribe[index].innerHTML = this.subListTmpl(oData)

	},
	//删除loading
	_removeLoad : function(){
		this.$loading.length && this.$loading.remove();
	},
	_bindEvent : function(){
		$('#wrap').on('click','li',function(){
			var $this = $(this);
			var url = $this.attr('url');

			if(url){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {action: "popupClickLi"});
				});
				window.open(url)
			}
		})
	}
}



var subList = new SubList();

var bgWindow = chrome.extension.getBackgroundPage();

bgWindow.platformSubList(function(index,oData){
	subList.appendList(index,oData)
})





