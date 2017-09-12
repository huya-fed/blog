/*
* @Author: xiejinlong
* @Date:   2017-03-02 15:40:36
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-09 10:09:04
*/



;(function(){


	var oUrl = UTIL.parseQueryString(window.location.href);
	var $body = $('body');



	var huya_small_window = {

		init : function(){

			this.bindEvent(); 

			this.addTagStyle();

			if(oUrl.pattern == 'huyaFullscreen'){
				$('body').addClass('mode-page-full');
			}
		},
		bindEvent : function(){


			//添加观看标签
			$body.on('mouseenter','.game-live-item',function(){
				var $this = $(this);
				var $smallWinTag = $this.find('.small-win-tag');

				var url =  $this.find('a').eq(0).attr('href');

				if(url.indexOf('http://www.huya.com')==-1){
					return false;
				}

				if($smallWinTag.length==0){
					$this.append('<div class="small-win-tag" href="'+url+'">小窗口观看</div>');
				}else{
					$smallWinTag.show();
				}

			}).on('mouseleave','.game-live-item',function(){

				$(this).find('.small-win-tag').hide();
			})


			$body.on('click','.small-win-tag',function(){

				var url = $(this).attr('href');
				var yyuid = url.substr(url.lastIndexOf('/')+1);

				ga('send', 'event', 'page', 'click_smallWins', {'nonInteraction': 1});

				chrome.runtime.sendMessage({action: "openSmallwindows",url:'http://hd.huya.com/outsite_flash/index.html?roomId='+yyuid});

			})

		},
		addTagStyle : function(){

			var cssText = '.small-win-tag {position: absolute;right: 0px;bottom: 60px; background: rgba(255,255,255,.8);width: 70px;line-height: 25px;text-align: center;height: 25px;z-index: 5;cursor: pointer;}.small-win-tag:hover{background:#f80;color:#fff}.game-live-item{ position: relative;}'

			UTIL.importStyle(cssText,'tag_extend')
		}
	}

	var douyu_small_window = {
		init : function(){
			this.addTagStyle();
			this.bindEvent();

			if(oUrl.pattern == 'douyuFullscreen'){
				$('body').addClass('layout-newfullpage body-flash-fullpage hide-chatgift-area');
			}
		},
		bindEvent : function(){
			//添加观看标签
			$body.on('mouseenter','li[data-rid]',function(){
				var $this = $(this);
				var $smallWinTag = $this.find('.small-win-tag');

				if($smallWinTag.length==0){
					$this.append('<div class="small-win-tag" >小窗口观看</div>');
				}else{
					$smallWinTag.show();
				}

			}).on('mouseleave','li[data-rid]',function(){

				$(this).find('.small-win-tag').hide();
			})


			$body.on('click','.small-win-tag',function(){

				var rid = $(this).parent('li').attr('data-rid');

				ga('send', 'event', 'page', 'click_smallWins', {'nonInteraction': 1});


				

				chrome.runtime.sendMessage({action: "openSmallwindows",url:'https://www.douyu.com/'+rid+'?pattern=douyuFullscreen'});

			})
		},
		addTagStyle : function(){

			var cssText = '.small-win-tag {position: absolute;right: 0px;bottom: 65px; background: rgba(255,255,255,.8);width: 70px;line-height: 25px;text-align: center;height: 25px;z-index: 5;cursor: pointer;font-size: 12px;}.small-win-tag:hover{background:#f80;color:#fff;}li[data-rid] {position:relative}li[data-sub_rt] .small-win-tag {margin-right: 10px;}#live-new-show-content-box .small-win-tag{right:10px;}';

			UTIL.importStyle(cssText,'tag_extend')

		}
	}

	var panda_small_window = {
		init : function(){
			this.addTagStyle();
			this.bindEvent();

			if(oUrl.pattern == 'pandaFullscreen'){
				$('html').addClass('room-player-fullscreen');
			}

		},
		bindEvent : function(){
			//添加观看标签
			$body.on('mouseenter','.video-list-item,.list-item',function(){
				var $this = $(this);
				var $smallWinTag = $this.find('.small-win-tag');

				if($smallWinTag.length==0){
					$this.append('<div class="small-win-tag" >小窗口观看</div>');
				}else{
					$smallWinTag.show();
				}

			}).on('mouseleave','.video-list-item,.list-item',function(){

				$(this).find('.small-win-tag').hide();
			})


			$body.on('click','.small-win-tag',function(){

				var href = $(this).siblings('a').attr('href');

				ga('send', 'event', 'page', 'click_smallWins', {'nonInteraction': 1});

				chrome.runtime.sendMessage({action: "openSmallwindows",url:'http://www.panda.tv'+href+"?pattern=pandaFullscreen"});

			})
		},
		addTagStyle : function(){

			var cssText = '.small-win-tag {position: absolute;right: 0px;top: 0; background: rgba(255,255,255,.8);width: 70px;line-height: 25px;text-align: center;height: 25px;z-index: 10;cursor: pointer;font-size: 12px;}.small-win-tag:hover{background:#f80;color:#fff;}li[data-rid] {position:relative}li[data-sub_rt] .small-win-tag {margin-right: 10px;}';

			UTIL.importStyle(cssText,'tag_extend')

		}
	}

	var quanmin_small_window = {
		init : function(){
			this.addTagStyle();
			this.bindEvent();

		},
		bindEvent : function(){
			//添加观看标签
			$body.on('mouseenter','.w-video,.w-index_category-right-zbview,.w-index-hotlive_zbview,.w-recommend-category_item',function(){
				var $this = $(this);
				var $smallWinTag = $this.find('.small-win-tag');

				if($smallWinTag.length==0){
					$this.append('<div class="small-win-tag" >小窗口观看</div>');
				}else{
					$smallWinTag.show();
				}

			}).on('mouseleave','.w-video,.w-index_category-right-zbview,.w-index-hotlive_zbview,.w-recommend-category_item',function(){

				$(this).find('.small-win-tag').hide();
			})


			$body.on('click','.small-win-tag',function(e){

				var $this = $(this);
				var href='';

				var parentA = $this.parent('a')

				if(parentA.length){

					href = parentA.attr('href');					
	
				}else{

					href = $this.siblings('a').attr('href');
				}


				var roomId = href.substr(href.lastIndexOf('/')+1);

				ga('send', 'event', 'page', 'click_smallWins', {'nonInteraction': 1});

				chrome.runtime.sendMessage({action: "openSmallwindows",url: 'http://www.quanmin.tv/embed/'+roomId});

				return false;

			})
		},
		addTagStyle : function(){

			var cssText = '.small-win-tag {position: absolute;right: 16px;top: 3px; background: rgba(255,255,255,.8);width: 70px;line-height: 25px;text-align: center;height: 25px;z-index: 101;cursor: pointer;font-size: 12px;}.small-win-tag:hover{background:#f80;color:#fff;}.w-index_category-right-zbview .small-win-tag,.w-index-hotlive_zbview .small-win-tag,.w-recommend-category_item .small-win-tag{right:0}';

			UTIL.importStyle(cssText,'tag_extend')

		}
	}

	var longzhu_small_window = {
		init : function(){
			this.addTagStyle();
			this.bindEvent();

			if(oUrl.pattern == 'longzhuFullscreen'){
				$('body').addClass('page-player-full');
			}
		},
		bindEvent : function(){
			//添加观看标签
			$body.on('mouseenter','.livecard',function(){
				var $this = $(this);
				var $smallWinTag = $this.find('.small-win-tag');

				if($smallWinTag.length==0){
					$this.append('<div class="small-win-tag" >小窗口观看</div>');
				}else{
					$smallWinTag.show();
				}

			}).on('mouseleave','.livecard',function(){

				$(this).find('.small-win-tag').hide();
			})


			$body.on('click','.small-win-tag',function(){

				var href = $(this).parent('a').attr('href');

				ga('send', 'event', 'page', 'click_smallWins', {'nonInteraction': 1});

				chrome.runtime.sendMessage({action: "openSmallwindows",url:href+"&pattern=longzhuFullscreen"});

				return false;

			})
		},
		addTagStyle : function(){
			var cssText = '.small-win-tag {position: absolute;right: 0px;top: 0; background: rgba(255,255,255,.8);width: 70px;line-height: 25px;text-align: center;height: 25px;z-index: 10;cursor: pointer;font-size: 12px; color:#555}.small-win-tag:hover{background:#f80;color:#fff;}';

			UTIL.importStyle(cssText,'tag_extend')
		}
	}


	var zhanqi_small_window = {
		init : function(){
			this.addTagStyle();
			this.bindEvent();
		},
		bindEvent : function(){
			//添加观看标签
			$body.on('mouseenter','li[data-id],li[data-room-id]',function(){
				var $this = $(this);
				var $smallWinTag = $this.find('.small-win-tag');
				//

				if($smallWinTag.length==0){
					$this.append('<div class="small-win-tag" >小窗口观看</div>');
				}else{
					$smallWinTag.show();
				}

			}).on('mouseleave','li[data-id],li[data-room-id]',function(){

				$(this).find('.small-win-tag').hide();
			})


			$body.on('click','.small-win-tag',function(e){

				var $li = $(this).parents('li');
				var roomId = $li.attr('data-id') || $li.attr('data-room-id');

				ga('send', 'event', 'page', 'click_smallWins', {'nonInteraction': 1});

				chrome.runtime.sendMessage({action: "openSmallwindows",url:'https://www.zhanqi.tv/live/embed?roomId='+roomId});

				return false;

			})
		},
		addTagStyle : function(){
			var cssText = '.small-win-tag {position: absolute;right: 7px;top: 13px; background: rgba(255,255,255,.8);width: 70px;line-height: 25px;text-align: center;height: 25px;z-index: 10;cursor: pointer;font-size: 12px; color:#555}.small-win-tag:hover{background:#f80;color:#fff;} li[data-room-id],li[data-id]{position: relative;}';

			UTIL.importStyle(cssText,'tag_extend')
		}
	}

	


	
	



	


	switch(window.location.host){
		case 'www.huya.com':
			huya_small_window.init();
			break;
		case 'www.douyu.com':
			douyu_small_window.init();
			break;
		case 'www.panda.tv':
			panda_small_window.init();
			break;
		case 'www.quanmin.tv':
			quanmin_small_window.init();
			break;
		case 'www.zhanqi.tv':
			zhanqi_small_window.init();
			break;
	}

	if(window.location.host.indexOf('longzhu.com')>-1){

		longzhu_small_window.init();
	}



})()

