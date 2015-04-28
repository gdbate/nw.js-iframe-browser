;(function(){

	var gui=require('nw.gui');
	var win=gui.Window.get();
	//win.showDevTools();

	var settings={
		'home-url':'http://google.com',
		'user-agent':'NW.JS Sample Browser',
		shown:false
	};

// S H O W - T R A Y
	var Tray=require('./js/tray');
	new Tray(gui,'Demo Browser','img/browsermatic-icon.png','Click to open Browser')
		.click(function(){show();})
		.add('Show Browser',function(){show();})
		.add('Developer Console',function(){win.showDevTools();})
		.separator()
		.add('Exit',function(){gui.App.quit();})

// I N I T
	$(function(){
		setup();
		show();
		home();
	});

	function setup(){

		//full screen button (icon changes depending on state)
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

		//hide window button, keep it active, can be re-opened from status bar
		$('#btn-hide').click(function(){
			hide();
			$('#content-external').attr('src','about:blank').css('display','none');
			return false;
		});

		//close program button
		$('#btn-close').click(function(){
			gui.App.quit();
			return false;
		});

		//back button
		$('#btn-back').click(function(){
			document.getElementById('frame').contentWindow.history.back();
			return false;
		});

		//forward button
		$('#btn-forward').click(function(){
			document.getElementById('frame').contentWindow.history.forward();
			return false;
		});

		//refresh button
		$('#btn-refresh').click(function(){
			$('#frame').attr('src',frame.contentWindow.location.href);
			return false;
		});

		//home button
		$('#btn-home').click(function(){
			home();
			return false;
		});

		//search/navigate button
		$('#btn-search').click(function(){
			var search=$('#location').val().trim();
			navigate(search);
			return false;
		});

		//setup the iframe that will show child webpages
		var frame=$('#frame').attr('nwUserAgent',settings['user-agent']).get(0);

		//update the location & title when a page completely loads (might already be done)
		frame.addEventListener('load',function(){
			location(this.contentWindow.location.href);
			title(this.contentWindow.document.title);
			var links=frame.contentWindow.document.getElementsByTagName('a');
			for(var i=0;i<links.length;i++){
				var link=links[i];
        link.onclick=function(e){
        	if(e.ctrlKey||e.shiftKey){
        		//prevent click from removing iframe
        		navigate(this.getAttribute('href'));
        		e.preventDefault();
        		return false;
        	}
          return true;
        };
			};
		});

		//when a page starts loading, update the url and title
		win.on('document-start',function(frame){
			if(frame&&typeof frame=='object'){
				if(frame.id=='frame'){
					location(frame.contentWindow.location.href);
					title(frame.contentWindow.document.title);
				}
			}else{
				console.log('- Frame breaker');

			}
		});
		//make sure links that target only open in the main window.
		//Would be good to get multiple tabs and add support here.
		win.on('new-win-policy',function(frame,url,policy){
			console.log('new-win-policy',frame,url,policy);
			policy.forceCurrent();
		});

		//handle when the window gets resized make sure the frame adjusts, timer is so it doesn't go too crazy
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

	//set the location if the URL changes and the user isn't typing in the location bar
	var currentLocation='';
	function location(url){
		if(url!=currentLocation&&!$('#location').is(':focus')){
			currentLocation=url;
			$('#location').val(url);
		}
	}

	//set the title if it changes
	var currentTitle='';
	function title(title){
		win.title=title;
		if(title!=currentTitle){
			$('#title').text(title);
			currentTitle=title;
		}
	}

	//go home based on settings homepage
	function home(){
		navigate(settings['home-url']);
	}

	//navigate the frame to a url
	function navigate(url){
		$('#location').val(url);
		$('#frame').attr('src',url);
	}

	//show the browser window (if hidden)
	function show(){
		if(settings.shown)return;
		win.show();
		settings.shown=true;
	}

	//hide the shown browser window but keep it's state
	//might be worth going to about:blank or something, sounds will still be going on page.
	function hide(){
		if(!settings.shown)return;
		win.hide();
		settings.shown=false;
	}

function CheckIsValidDomain(domain){
	var re=new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
	return domain.match(re)?true:false;
}


}());