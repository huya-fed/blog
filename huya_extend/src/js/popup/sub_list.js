/*
* @Author: xiejinlong
* @Date:   2017-02-22 14:40:13
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-04-26 16:31:34
*/


function SubList(){
	this.initialize.apply(this, arguments);
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





