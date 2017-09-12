/*
* @Author: xiejinlong
* @Date:   2017-02-16 15:57:38
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-08 15:58:34
*/

;(function() {
    if (document.readyState == "complete") {
        performanceReport();
    } else {
        window.addEventListener("load", performanceReport);
    }

    var location = window.location;



    function huya(){
        var name = null;
        if(location.pathname === '/'){
            name = '虎牙首页--'
        }else if(location.pathname === '/l'){
            name = '虎牙列表页--'
        }else if(/^\/[^/]{3,}/.test(location.pathname)){
            name = '虎牙直播间--'
        }   
        return name;
    }


    function douyu(){
        var name = null;
        if(location.pathname === '/'){
            name = '斗鱼首页--'
        }else if(location.pathname === '/directory/all'){
            name = '斗鱼列表页--'
        }else if(/^\/[^/]{3,}/.test(location.pathname)){
            name = '斗鱼直播间--'
        }   
        return name;
    }


    function panda(){
        var name = null;

        if(location.pathname === '/'){
            name = '熊猫首页--'
        }else if(location.pathname === '/all'){
            name = '熊猫列表页--'
        }else if(/^\/[^/]{5,}/.test(location.pathname)){
            name = '熊猫直播间--'
        }   
        return name;
    }



    function source(){

        var sourceName = null;

        switch(location.host){
            case 'www.huya.com':
                sourceName =huya();
                break;
            case 'www.douyu.com':
                sourceName =douyu();
                break;
            case 'www.panda.tv':
                sourceName = panda();
                break;
        }

        return sourceName;
    }



    function performanceReport () {
        var comeFrom = source();

        if(!comeFrom){
            return false;
        }

        var timing = performance.timing;
        var totalTime = timing.loadEventEnd - timing.navigationStart;//过早获取时,loadEventEnd有时会是0
        if(totalTime <= 0) {
        // 未加载完，延迟200ms后继续times方法，直到成功
            setTimeout(function(){
                performanceReport();
            }, 200);
            return;
        }
        var netWorkTime = timing.responseEnd - timing.navigationStart;
        var initDomTreeTime = timing.domInteractive - timing.responseEnd;
        var domReadyTime = timing.domComplete - timing.domInteractive; //过早获取时,domComplete有时会是0
        var loadEventTime = timing.loadEventEnd - timing.loadEventStart;


        //chrome.runtime.sendMessage({action: 'getIpInfo'}, function(returnInfo) {
        	/*var reportObj = {
				netWorkTime : netWorkTime, //网络时间
				initDomTreeTime : initDomTreeTime, //白屏时间(请求完毕到DOM加载完成)
				domReadyTime : domReadyTime,  //可操作时间(解释dom树耗时)
				loadEventTime : loadEventTime, //load事件的耗时
				totalTime : totalTime, // 总下载时间
				city : returnInfo.city,  //城市
				isp : returnInfo.isp  //运营商
			}*/

            ga('send', 'timing', {'timingCategory': comeFrom + '核心指标','timingVar': '网络时间','timingValue': netWorkTime});
            ga('send', 'timing', {'timingCategory': comeFrom + '核心指标','timingVar': '白屏时间(请求完毕到DOM加载完成)','timingValue': initDomTreeTime});
            ga('send', 'timing', {'timingCategory': comeFrom + '核心指标','timingVar': '可操作时间(解释dom树耗时)','timingValue': domReadyTime});
            ga('send', 'timing', {'timingCategory': comeFrom + '核心指标','timingVar': 'load事件的耗时','timingValue': loadEventTime});
            ga('send', 'timing', {'timingCategory': comeFrom + '核心指标','timingVar': '总下载时间','timingValue': totalTime});

            //console.debug('页面性能数据:');
			//console.debug(reportObj);

		//});

	}
})();