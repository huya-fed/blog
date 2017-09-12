/*
* @Author: xiejinlong
* @Date:   2017-03-03 16:28:18
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-08 15:08:10
*/

;(function(){


	var closePans = function() {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(q) {
			var r = q[0];
			chrome.tabs.remove(r.id)
		})
	};

	var sendMessage = function(){

		var formObj = {}

		$('input').each(function(){
			var name = this.name;
			var value = this.value;

			if(this.type =='checkbox'){
				value = this.checked
			}

			formObj[name] = value;
		})

		chrome.extension.sendMessage({
			action: 'optionsPage',
			formObj: formObj
		})
	}

	var setValue  = function(obj){
		for(var name in obj){
			var dom = document.querySelectorAll('input[name='+name+']')[0];

			if(dom.type == 'checkbox'){
				dom.checked = obj[name]
			}else{
				dom.value = obj[name]
			}
			
		}
	}


	$("#btn_close").click(function() {
		closePans();
	});
	$("#btn_save").click(function(e) {
		sendMessage();
		alert("恭喜，直播盒子-配置修改成功!");
		closePans();
	})





	chrome.storage.local.get('optionsPage',function(tab){
		setValue(tab.optionsPage);
	})

})()