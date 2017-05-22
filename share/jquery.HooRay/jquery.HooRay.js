
(function($){

	$.fn.HRsfq = function(options){
		var options = $.extend({}, {
			activeClass		:'HRsfq-active',
			speed			:'normal',
			openRow			:0
		}, options);
		this.each(function() {
			var $ul = $(this);
			$ul.children('li').each(function(){
				$(this).children('div').hide();
				$(this).children('a').click(function(e){
					$(this).parent('li').toggleClass(options.activeClass).siblings().removeClass(options.activeClass).children('div').slideUp(options.speed);
					$(this).siblings().slideToggle(options.speed);
				});
			});
			if(options.openRow >= 0){
				$ul.children('li:nth-child('+options.openRow+')').addClass(options.activeClass).children('div').show();
			}
		});
	};
	
	
	/*
		分享工具 HRshare
		@DOM
			<div>
				<a class="hr-share-xiaoyou"></a>
				<a class="hr-share-115"></a>
				<a class="hr-share-tsina"></a>
				<a class="hr-share-tqq"></a>
				<a class="hr-share-more"></a>
			</div>
		@Usage
			$('div').HRshare(options);
		@options
			size		:16,	//图标尺寸，目前可选16和32
			hasText		:true	//是否显示文字
	*/
	$.fn.HRshare = function(options){
		var options = $.extend({}, {
			size	:16,
			hasText	:true
		}, options);
		var shareico = {
			"tqq"		:"http://v.t.qq.com/share/share.php?title={title}&url={url}&appkey=118cd1d635c44eab9a4840b2fbf8b0fb",
			"tsina"		:"http://service.weibo.com/share/share.php?title={title}&url={url}&source=bookmark&appkey=2992571369",
			"qzone"		:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}",
			"renren"	:"http://share.renren.com/share/buttonshare.do?link={url}&title={title}",
			"baidu"		:"http://cang.baidu.com/do/add?it={title}&iu={url}&fr=ien#nw=1",
			"115"		:"http://sc.115.com/add?url={url}&title={title}",
			"tsohu"		:"http://t.sohu.com/third/post.jsp?url={url}&title={title}&content=utf-8",
			"taobao"	:"http://share.jianghu.taobao.com/share/addShare.htm?url={url}",
			"xiaoyou"	:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url={url}",
			"hi"		:"http://apps.hi.baidu.com/share/?url={url}&title={title}",
			"fanfou"	:"http://fanfou.com/sharer?u={url}&t={title}",
			"sohubai"	:"http://bai.sohu.com/share/blank/add.do?link={url}",
			"feixin"	:"http://space3.feixin.10086.cn/api/share?title={title}&url={url}",
			"youshi"	:"http://www.ushi.cn/feedShare/feedShare!sharetomicroblog.jhtml?type=button&loginflag=share&title={title}&url={url}",
			"tianya"	:"http://share.tianya.cn/openapp/restpage/activity/appendDiv.jsp?app_id=jiathis&ccTitle={title}&ccUrl={url}&jtss=tianya&ccBody=",
			"msn"		:"http://profile.live.com/P.mvc#!/badge?url={url}&screenshot=",
			"douban"	:"http://shuo.douban.com/!service/share?image=&href={url}&name={title}",
			"twangyi"	:"http://t.163.com/article/user/checkLogin.do?source={title}&info={title}+{url}&images=",
			"mop"		:"http://tk.mop.com/api/post.htm?url={url}&title={title}"
		};
		var shareiconame = {
			"tqq"		:"腾讯微博",
			"tsina"		:"新浪微博",
			"qzone"		:"QQ空间",
			"renren"	:"人人网",
			"baidu"		:"百度收藏",
			"115"		:"115",
			"tsohu"		:"搜狐微博",
			"taobao"	:"淘江湖",
			"xiaoyou"	:"腾讯朋友",
			"hi"		:"百度空间",
			"fanfou"	:"饭否",
			"sohubai"	:"搜狐白社会",
			"feixin"	:"飞信",
			"tianya"	:"天涯社区",
			"youshi"	:"优士网",
			"msn"		:"MSN",
			"douban"	:"豆瓣",
			"twangyi"	:"网易微博",
			"mop"		:"猫扑推客"
		};
		this.each(function(){
			$(this).addClass("hr-share-"+options.size);
			var title = document.title;
			var url = window.location.href;
			function eFunction(str){
				return function(){
					window.open(formatmodel(shareico[str],{title:title, url:url}));
				}
			}
//			for(si in shareico){
//				$(this).find(".hr-share-"+si).die('click').live('click',eFunction(si)).attr("title","分享到"+shareiconame[si]);
//				if(options.hasText){
//					$(this).find(".hr-share-"+si).text(shareiconame[si]);
//				}
//				$(this).find(".hr-share-more-panel-"+si).die('click').live('click',eFunction(si));
//			}
			
			for(si in shareico){
				$(".hr-share-"+si).die('click').live('click',eFunction(si)).attr("title","分享到"+shareiconame[si]);
				if(options.hasText){
					$(".hr-share-"+si).text(shareiconame[si]);
				}
				$(".hr-share-more-panel-"+si).die('click').live('click',eFunction(si));
			}
			
			
			//更多
			$(".hr-share-more").live("click",function(){
				if(!$(".HRshare-bg").length){
					if($.browser.msie && $.browser.version == "6.0"){
						//ie6无法遮住select，则只能将其隐藏
						$("select:visible").addClass("hr-share-select-hidden");
						//ie6不支持position:fixed
						$("body").append("<div class='HRshare-bg' style='position:absolute;left:0;top:0;width:"+$(window).width()+"px;height:"+$(window).height()+"px;display:none;z-index:9998;background-color:#000;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);opacity:0.5;'></div>");
					}else{
						$("body").append("<div class='HRshare-bg' style='position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:9998;  background-color:#000;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);opacity:0.5;'></div>");
					}
				}
				$(".HRshare-bg").fadeIn('fast');
				
				if(!$(".hr-share-more-panel").length){
					var _left = ($(window).width()-270)/2;
					var _top = ($(window).height()-300)/3;
					if($.browser.msie && $.browser.version == "6.0"){
						var _sharepanel = '<div class="hr-share-more-panel" style="position:absolute;z-index:9999;left:expression(eval(document.documentElement.scrollLeft)+'+_left+');top:expression(eval(document.documentElement.scrollTop)+'+_top+')">';
					}else{
						var _sharepanel = '<div class="hr-share-more-panel" style="position:fixed;z-index:9999;top:'+_top+'px;left:'+_left+'px">';
					}
					_sharepanel += '<div class="hr-share-more-panel-title"><a href="#close" title="关闭">×</a><span>分享到各大网站</span></div><div class="hr-share-more-panel-list">';
					for(si in shareiconame){
						_sharepanel += '<a class="hr-share-more-panel-'+si+'">'+shareiconame[si]+'</a>';
					}
					_sharepanel += '</div><div class="hr-share-more-panel-copyright"><a href="http://www.caiyufu.com" target="_blank">少年创客</a></div></div>';
					$("body").append(_sharepanel);
				}
				$(".hr-share-more-panel").fadeIn('fast');
			});
			$(".HRshare-bg").live("click",function(){
				$(".hr-share-more-panel").fadeOut('fast');
				$(".HRshare-bg").fadeOut('fast');
			});
			$(".hr-share-more-panel-title a").live("click",function(){
				$(".hr-share-more-panel").fadeOut('fast');
				$(".HRshare-bg").fadeOut('fast');
			});
			$(window).bind('resize',function(){
				var _left = ($(window).width()-270)/2;
				var _top = ($(window).height()-300)/3;
				$(".hr-share-more-panel").css({"left":_left,"top":_top});
			});
		});
	};
	
	function isMouseLeaveOrEnter(e, handler){
		if (e.type != 'mouseout' && e.type != 'mouseover') return false;
		var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
		while (reltg && reltg != handler)
			reltg = reltg.parentNode;
		return (reltg != handler);
	}
	function getEvent(){
		if(document.all)
			return window.event;
		func=getEvent.caller;
		while(func!=null){
			var arg0=func.arguments[0];
			if(arg0){
				if((arg0.constructor==Event || arg0.constructor==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation)){
					return arg0;
				}
			}
			func=func.caller;
		}
		return null;
	}
	function formatmodel(str,model){
		for(var k in model){
			var re = new RegExp("{"+k+"}","g");
			str = str.replace(re,model[k]);
		}
		return str;
	}
})(jQuery);
