/*
* @Author: xiejinlong
* @Date:   2017-02-16 14:50:15
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-02-16 17:17:09
*/

function outside(json){
	if(json.status == 200 && Array.isArray(json.data) && json.data.length > 0){

		var protocol = window.location.protocol;

		json.data.forEach(function(item){

			var url = protocol+'//xjl.huya.com/huya_extend/js/content/'+item+'.js';

			$.getScript(url)
		})
	}
}


//内部静默更新的采用外链的形式加载
UTIL.fetch({
	url: serverUrl+'mock/content_js.json',
	success : outside,
	fail : function(ex){
		console.log('content_js parsing failed', ex);
	}
})