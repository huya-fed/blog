/*
* @Author: xiejinlong
* @Date:   2017-02-19 14:47:38
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-02 14:37:31
*/

;(function() {

	chrome.storage.local.get('errResources', function(tab) {

		var aError =  tab.errResources;

		if(aError && Array.isArray(aError) && aError.length > 0){

			//无论访问那个页面，每次访问页面最多拿5条数据进行上报
			var aReport = aError.splice(0,5);

			aReport.forEach(function(item){
				/*try{
			        ya.reportProductEvent(item)
			    }catch(e){
			    	console.log(e);
			    }*/
			})

			chrome.storage.local.set(tab);

		}
		
	})

})()