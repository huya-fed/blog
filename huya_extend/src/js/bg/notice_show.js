/*
* @Author: xiejinlong
* @Date:   2017-03-01 14:09:47
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-09-18 15:59:49
*/



;(function(){

	//虎牙
	var huyaSub = (function(){


	
		var livesubscribe = function(cookie){
			return $.getJSON('http://fw.huya.com/dispatch?do=subscribeList&uid='+cookie.value);
		}


		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){

				for(var i=0; i <aData.length; i++){

					if (aData[i].isLive) {
						var obj = {
							roomId : aData[i].yyid,
							screenshot : aData[i].screenshot+"?imageview/4/0/w/100/h/50/blur/1",
							nick : aData[i].nick,
							totalCount : aData[i].totalCount,
							gameFullName : aData[i].gameName,
							avatar : aData[i].avatar180,
							roomTitle : aData[i].intro,
							showTime : aData[i].startTime*1000
						}

						arr.push(obj);
					}
				}
			}

			return arr
		}

		return {

			getData : function(callback){

				subModule.getuid('http://www.huya.com','yyuid').then(function(cookie){
					
					return livesubscribe(cookie)

				}).then(function(json){

					if(json.status === 1000 && json.result && json.result.list.length >0){

						var aJson = adaptiveData(json.result.list);

						console.log('虎牙订阅的数据--------------');
						console.log(aJson);

						callback && callback({
							platform : '虎牙',
							host : 'http://www.huya.com/',
							ajson : aJson
						})
					}
				}).catch(function(e){
					
				})

			}
		}
	})();

	//斗鱼
	var douyuSub = (function(){

		var livesubscribe = function(){
			return $.ajax({
				url : 'https://www.douyu.com/room/follow',
				dataType: 'html'
			})
		}


		var parseHTML = function parseHTML(html, promiseFactory) {
	        var $iframe = $('<iframe></iframe>');
	        var dom = $.parseHTML(html, $iframe.document);
	        var list = promiseFactory(dom);
	        $iframe.remove();
	        return list;
	    };

	    var getInfoFromItem = function getInfoFromItem(item) {
            item = $(item);
            if (item.find('i.icon_live').length == 0) return null;
            var beginTime = item.find('span.glyphicon01_playtime').text().trim();
            var timeRE = /(\d+)分钟/;
            if (!timeRE.test(beginTime)) {
                beginTime = false;
            } else {
                beginTime = parseInt(timeRE.exec(beginTime)[1]);
                beginTime = new Date().getTime() - beginTime * 1000 * 60;
            }

            var roomid = item.find('div>div>a').attr('href').replace('/', '');
            return {
                roomId: roomid,
                roomTitle: item.find('h1').text().trim(),
                showTime: beginTime,
                nick: item.find('span.username').text().trim(),
                totalCount: parseInt(item.find('span.glyphicon01_hot').text().trim()),
                screenshot: item.find('img').data('original'),
                gameFullName: item.find('.sort_focus').find('.glyphicon01').text().trim(),
                avatar: item.find('img').data('original')
            };
        };

		return {
			
			getData : function(callback){

				livesubscribe().then(function(html) {
			        return parseHTML(html, function (dom) {
		                var followedList = $(dom).find('.attention > ul');
		                if (followedList.length == 0) {
		                    throw new Error('douyu not login');
		                    return [];
		                }
		                var itemArray = $.makeArray(followedList.children());
		                itemArray = itemArray.map(getInfoFromItem);
		                return itemArray.filter(function (i) {
		                    return i;
		                });
		            })
				}).then(function(aJson) {
		            	console.log('斗鱼订阅的数据--------------');
						
						console.log(aJson)
						
					if(aJson.length > 0){ 
						callback && callback({
							platform : '斗鱼',
							host : 'https://www.douyu.com/',
							ajson : aJson
						})
					}
				}) 
			}
		}
	})();

	//熊猫
	var pandaSub = (function(){

		var livesubscribe = function(){
			return $.getJSON('http://www.panda.tv/ajax_get_follow_rooms?pageno=1&pagenum=20&status=2');
		}

		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){

				for(var i=0; i <aData.length; i++){


					var obj = {
						roomId : aData[i].id,
						screenshot : aData[i].pictures.img,
						nick : aData[i].userinfo.nickName,
						totalCount : aData[i].person_num,
						gameFullName : aData[i].classification.cname,
						avatar : aData[i].userinfo.avatar,
						roomTitle : aData[i].name,
						showTime: aData[i]['start_time']*1000
					}


					arr.push(obj);
				}
			}

			return arr
		}

		return {
			
			getData : function(callback){

				livesubscribe().then(function(json){

					if(json.errno == 0 && json.data && json.data.items.length > 0){

						var aJson = adaptiveData(json.data.items);

						console.log('熊猫订阅的数据--------------');
						console.log(aJson);

						if(aJson.length > 0){
							callback && callback({
								platform : '熊猫',
								host : 'http://www.panda.tv/',
								ajson : aJson
							})
						}
					}

					
				})

			}
		}
	})();

	//全民
	var quanminSub = (function(){

		var livesubscribe = function(cookie){
			return $.ajax({
					  type: 'POST',
					  url: 'http://www.quanmin.tv/user/getfollowlist?uid='+cookie.value,
					  contentType:'text/plain;charset=UTF-8',
						data:JSON.stringify({
							p: {page: 0, size: 50}
						}),
						dataType:'json'
					});
		}


		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){

				for(var i=0; i <aData.length; i++){

					if(aData[i].status == 1){

						var showTime = 0;

						try {
							showTime = new Date(aData[i]['play_at']).getTime()
						}catch(e){
						}

						var obj = {
							roomId : aData[i].uid,
							screenshot : aData[i].thumb,
							nick : aData[i].nick,
							totalCount : aData[i].view,
							gameFullName : aData[i].category_name,
							avatar : aData[i].avatar,
							roomTitle : aData[i].title,
							showTime : showTime
						}

						

						arr.push(obj);
					}
				}
			}

			return arr
		}

		return {
			
			getData : function(callback){

				subModule.getuid('http://www.quanmin.tv','uid').then(function(cookie){
					
					return livesubscribe(cookie)

				}).then(function(json){

					if(json.code == 200 && json.data && json.data.items.length > 0){

						var aJson = adaptiveData(json.data.items);

						console.log('全民订阅的数据--------------');
						console.log(aJson);

						if(aJson.length > 0){
							callback && callback({
								platform : '全民',
								host : 'http://www.quanmin.tv/',
								ajson : aJson
							})
						}
					}

				})
			}
		}
	})();

	//龙珠
	var longzhuSub = (function(){

		var livesubscribe = function(){
			return $.getJSON('http://userapi.plu.cn/subinfo/mysubscribe?pageIndex=0&pageSize=15');
		}

		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){
				
				for(var i=0; i <aData.length; i++){

					var feed = aData[i].feed;

					if(feed){

						var showTime = 0;

						try {
							showTime = new Date(feed['time']).getTime()
						}catch(e){
						}

						var obj = {
							roomId : aData[i].room.domain,
							screenshot : aData[i].liveScreenPic,
							nick : aData[i].room.name,
							gameFullName : feed.gameName,
							avatar : aData[i].room.logo,
							roomTitle : aData[i].room.boardCast_Title,
							showTime : showTime
						}

						arr.push(obj);
					}
				}
	
			}

			return arr
		}

		return {
			
			getData : function(callback){

				livesubscribe().then(function(json){

					if(json.items && json.items.length > 0){

						var aJson = adaptiveData(json.items);

						console.log('龙珠订阅的数据--------------');
						console.log(aJson);

						if(aJson.length > 0){
							callback && callback({
								platform : '龙珠',
								host : 'http://star.longzhu.com/',
								ajson : aJson
							})
						}
					}

					
				})

			}
		}
	})();

	//战旗
	var zhanqiSub = (function(){

		var livesubscribe = function(){
			return $.getJSON('https://www.zhanqi.tv/api/user/follow.listsbypage?page=1&nums=8');
		}

		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){

				for(var i=0; i <aData.length; i++){
					if (aData[i].status>0) {
						var obj = {
								roomId : aData[i].roomUrl,
								screenshot : aData[i].spic,
								nick : aData[i].nickname,
								totalCount : aData[i].online,
								gameFullName : aData[i].gameName,
								avatar : aData[i].avatar+'-big',
								roomTitle : aData[i].title
							}

						arr.push(obj);
					}
					
				}
			}

			return arr
		}

		return {
			
			getData : function(callback){

				livesubscribe().then(function(json){

					if(json.code == 0 && json.data && json.data.list.length > 0){

						var aJson = adaptiveData(json.data.list);

						console.log('战旗订阅的数据--------------');
						console.log(aJson);


						if(aJson.length > 0){
							callback && callback({
								platform : '战旗',
								host : 'https://www.zhanqi.tv',
								ajson : aJson
							})
						}
					}

					
				})

			}
		}
	})();

	//B站
	var bilibiliSub = (function(){

		var livesubscribe = function(){
			return $.getJSON('https://api.live.bilibili.com/feed/v1/feed/getList?page=1');
		}

		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){

				for(var i=0; i <aData.length; i++){

					var obj = {
							roomId : aData[i].short_id || aData[i].room_id,
							screenshot : aData[i].keyframe,
							nick : aData[i].nickname,
							totalCount : aData[i].online,
							gameFullName : aData[i].area_name,
							avatar : aData[i].face,
							roomTitle : aData[i].roomname,
							showTime : aData[i].liveTime *1000
						}

					arr.push(obj);
					
				}
			}

			return arr
		}

		return {
			
			getData : function(callback){

				livesubscribe().then(function(json){

					if(json.code == 0 && json.data && json.data.rooms){

						var aJson = adaptiveData(json.data.rooms);

						console.log('哔哩哔哩订阅的数据--------------');
						console.log(aJson);


						if(aJson.length > 0){
							callback && callback({
								platform : '哔哩哔哩(B站)',
								host : 'http://live.bilibili.com/',
								ajson : aJson
							})
						}
					}

					
				})

			}
		}
	})();

	//火猫
	var huomaoSub = (function(){


		var livesubscribe = function(){
			return $.getJSON('https://www.huomao.com/subscribe/getUsersSubscribe?tag_name=top');
		}

		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){

				for(var i=0; i <aData.length; i++){

					if ( aData[i].is_live > 0) {
						var obj = {
								roomId : aData[i].room_number,
								screenshot : aData[i].image,
								nick : aData[i].nickname,
								totalCount : aData[i].views,
								gameFullName : aData[i].gameCname,
								avatar : aData[i].headimg.big,
								roomTitle : aData[i].channel,
								showTime : aData[i].liveTime
							}

						arr.push(obj);
					}
					
				}
			}

			return arr
		}

		return {
			
			getData : function(callback){

				livesubscribe().then(function(json){

					if(json.status && json.data && json.data.usersSubChannelsLiving){

						var aJson = adaptiveData(json.data.usersSubChannelsLiving);

						console.log('火猫订阅的数据--------------');
						console.log(aJson);


						if(aJson.length > 0){
							callback && callback({
								platform : '火猫',
								host : 'https://www.huomao.com/',
								ajson : aJson
							})
						}
					}

					
				})

			}
		}
	})();

	

	//YY直播
	var yySub = (function(){

		var timeNow = Date.now();

		var livesubscribe = function(){
			return $.getJSON('http://www.yy.com/yyweb/user/queryLivePreview.json?_=' + timeNow);
		}

		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){

				for(var i=0; i <aData.length; i++){

					if ( aData[i].liveType > 0) {
						var obj = {
								roomId : aData[i].liveUrl,
								screenshot : aData[i].liveCover,
								nick : aData[i].anchorInfo.stageName || aData[i].anchorInfo.nick,
								totalCount : aData[i].users,
								gameFullName : '',
								avatar : aData[i].anchorInfo.logo,
								roomTitle : aData[i].title,
								showTime : aData[i].liveTime
							}

						arr.push(obj);
					}
					
				}
			}

			return arr
		}

		return {
			
			getData : function(callback){

				livesubscribe().then(function(json){

					if(json.resultCode == 0 && json.data && json.data.att){

						var aJson = adaptiveData(json.data.att);

						console.log('YY直播订阅的数据--------------');
						console.log(aJson);


						if(aJson.length > 0){
							callback && callback({
								platform : 'YY直播',
								host : 'http://www.yy.com/',
								ajson : aJson
							})
						}
					}

					
				})

			}
		}
	})();

	//触手tv
	var chushouSub = (function(){

		var livesubscribe = function(){
			return $.getJSON('https://chushou.tv/subscriber/down.htm?pageSize=9');
		}

		//数据适配
		var adaptiveData  = function(aData){

			var arr = [];

			if(Array.isArray(aData) && aData.length > 0){

				for(var i=0; i <aData.length; i++){
					if (aData[i].liveStatus) {

						var obj = {
								roomId : aData[i].liveStatus.roomId + '.htm',
								screenshot : aData[i].liveStatus.screenshot,
								nick : aData[i].creator.nickname,
								totalCount : aData[i].liveStatus.onlineCount,
								gameFullName : aData[i].liveStatus.game.name,
								avatar : aData[i].creator.avatar,
								roomTitle : aData[i].liveStatus.name,
								showTime : aData[i].liveStatus.createdTime
							}

						arr.push(obj);
					}
					
				}
			}

			return arr
		}

		return {
			
			getData : function(callback){

				livesubscribe().then(function(json){

					if(json.code == 0 && json.data && json.data.items){

						var aJson = adaptiveData(json.data.items);

						console.log('触手订阅的数据--------------');
						console.log(aJson);


						if(aJson.length > 0){
							callback && callback({
								platform : '触手',
								host : 'https://chushou.tv/room/',
								ajson : aJson
							})
						}
					}

					
				})

			}
		}
	})();

	




	var subList = [huyaSub, douyuSub, pandaSub, quanminSub, longzhuSub, zhanqiSub, bilibiliSub, huomaoSub, yySub, chushouSub];

	//公用模块
	function SubModule(){
		this.initialize.apply(this, arguments);
	}

	SubModule.prototype = {
		initialize : function(){
			
			this.resetData();
		},
		resetData : function(){
			this.dataObj = {};
		},
		addData : function(platformName,json){
			this.dataObj[platformName] = json;
		},
		//获取uid
		getuid : function(url,name){
			return new Promise(function(resolve, reject){
				chrome.cookies.get({
					url : url,
					name : name
				},function(cookie){
					if(cookie){
						//var tab = {};
						//tab[name] = cookie;
						//chrome.storage.local.set(tab);
						resolve(cookie);
					}else{
						/*chrome.storage.local.get(name, function(tab) {
							if(tab[name]){
								resolve(tab[name])
							}else{
								reject();
							}
						})*/

						reject();
					}
				})
			})
		},
		pluck : function(list, propertyName){
			return list.map(function(obj){
				return obj[propertyName];
			})
		},
		noticeShow : function(){

			var _this = this;

			
			var pushMessage = function(noticeList,oData){
				noticeList.forEach(function(item){

					chrome.notifications.create(oData.host + item.roomId,{
						"type" : "basic",
						"iconUrl" : item.avatar,
						"title" : item.nick+"---正在开播:",
						"message" : item.roomTitle,
						"priority" : 2,
						"contextMessage" : "来自 "+oData.platform+" 直播平台"
					})
				})
			}


			subList.forEach(function(item,index){

				item.getData(function(oData){

					if(!_this.dataObj[index]) {
						_this.dataObj[index] = {};
					}

					_this.dataObj[index].ajson = _this.dataObj[index].ajson || [];
					var newArr = oData.ajson;

					var oldIdArr  = _this.pluck(_this.dataObj[index].ajson,'roomId');
					var noticeList = [];



					//筛选出新的数据在不旧的里面
					newArr.forEach(function(item,key){
						if(oldIdArr.indexOf(item.roomId)==-1){
							if(oldIdArr.length){ // 首次为空的话，就不推送了，防止浏览器首次启动为空
								noticeList.push(item)
							}
							_this.dataObj[index].ajson.push(item);//推送过的就不推送了
						}
					})

					

					UTIL.getNoticePermission()
						.then(function(){
							pushMessage(noticeList,oData)
						})
					
				});
			})
		}
		
	}



	window.subModule = new SubModule();

	


	//暴露到widnow中，给popup页面用
	window.platformSubList = function(callback){

		//置空所有平台的数据
		subModule.resetData();

		subList.forEach(function(item,index){

			item.getData(function(oData){

				//添加对应平台的数据
				subModule.addData(index,oData);

				callback(index,oData)
			});
		})
	}


	//通知主播开播了
	//每隔x mins去查询各大平台的订阅接口与popup拿到的数据进行比较过滤，然后进行推送

	chrome.storage.local.get('optionsPage',function(tab){

		if(tab.optionsPage){

			if(tab.optionsPage.push){  // 主动推送
				chrome.alarms.create('noticeShow',{
					delayInMinutes : + 0,
					periodInMinutes : +tab.optionsPage.mins_val
				})
			}
		}else{

			chrome.alarms.create('noticeShow',{
				delayInMinutes : 0,
				periodInMinutes : 3
			})
		}

	})


	chrome.alarms.onAlarm.addListener(function(alarm){
		console.log(alarm)
		if(alarm.name == 'noticeShow'){
			subModule.noticeShow();
		}
	})

})();

