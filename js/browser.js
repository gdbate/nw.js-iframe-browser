;(function(){

	var gui=require('nw.gui');
	var win=gui.Window.get();
	win.showDevTools();

	var settings={
		'home-url':'http://google.com',
		'user-agent':'NW.JS Sample Browser',
		shown:false
	};

// S H O W - T R A Y
	var Tray=require('./js/tray');
	new Tray(gui,'Demo Browser','img/browsermatic-icon.png','Click to open Browser')
		.click(function(){show();})
		.add('Browser',function(){show();})
		.add('Console',function(){win.showDevTools();})
		.separator()
		.add('Exit Browser',function(){gui.App.quit();})

// I N I T
	$(function(){
		setup();
		show();
		home();
	});

	function setup(){

		//upper top bar
		$('#btn-fullscreen').click(function(){
			if(!win.isFullscreen){
				win.enterFullscreen();
				$('i#icon-fullscreen').removeClass('fa-arrows-alt').addClass('fa-square-o');
			}else{
				win.leaveFullscreen();
				$('i#icon-fullscreen').removeClass('fa-square-o').addClass('fa-arrows-alt');
			}
			return false;
		});
		$('#btn-hide').click(function(){
			hide();
			$('#content-external').attr('src','about:blank').css('display','none');
			return false;
		});
		$('#btn-close').click(function(){
			gui.App.quit();
			return false;
		});

		//lower top bar
		$('#btn-back').click(function(){
			document.getElementById('frame').contentWindow.history.back();
			return false;
		});
		$('#btn-forward').click(function(){
			document.getElementById('frame').contentWindow.history.forward();
			return false;
		});
		$('#btn-refresh').click(function(){
			return false;
		});
		$('#btn-home').click(function(){
			home();
			return false;
		});
		$('#btn-search').click(function(){
			var search=$('#location').val().trim();
			navigate(search);
			return false;
		});

		//frame
		var frame=$('#frame').attr('nwUserAgent',settings['user-agent']).get(0);
		frame.onload=function(){
			location(this.contentWindow.location.href);
			title(this.contentWindow.document.title);
		}
		//there has to be a better way?
		var updateLocation=function(){
			location(frame.contentWindow.location.href);
			title(frame.contentWindow.document.title);
			setTimeout(updateLocation,250);
		}
		updateLocation();
		var resizeFrame=function(){
			$('#frame').css('height',$('div#frame-container').height()-1);
		}
		var resizeTimer=null;
		$(window).resize(function(){
			clearTimeout(resizeTimer);
			resizeTimer=setTimeout(resizeFrame,15);
		});
		resizeFrame();
	}

	var currentLocation='';
	function location(url){
		if(url!=currentLocation&&!$('#location').is(':focus')){
			currentLocation=url;
			$('#location').val(url);
		}
	}
	var currentTitle='';
	function title(title){
		if(title!=currentTitle){
			currentTitle=title;
			$('#title').text(title);
		}
	}

	function home(){
		navigate(settings['home-url']);
	}
	function navigate(url){
		$('#location').val(url);
		$('#frame').attr('src',url);
	}

	function show(){
		if(settings.shown)return;
		win.show();
		settings.shown=true;
	}
	function hide(){
		if(!settings.shown)return;
		win.hide();
		settings.shown=false;
	}

}());