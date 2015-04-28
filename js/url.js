;(function(){

	module.exports=function(url,base){
		url=parseUrl(url);
		base=parseUrl(base);
		var info=urlInfo(url,base);
		return buildUrl(info);
	}

	function parseUrl(str){
		var uri={};
		var key=['source','scheme','authority','userInfo','user','pass','host','port','relative','path','directory','file','query','fragment'];
		var parser=/^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
		var m=parser.exec(str);
		for(var i=14;i>0;i--)
			if(m[i]) uri[key[i]]=m[i];
		delete uri.source;
		return uri;
	}

	function urlInfo(info,base){
		if(base){
			if(typeof info.path=='string'&&info.path.substr(0,1)!='/'&&info.path.substr(0,1)!='.')info.path='./'+info.path;
			if(typeof info.path=='string'&&info.path.substr(0,2)=='./'&&typeof base.path=='string'&&base.path.indexOf('/')!==-1){
				info.path=base.path.substr(0,base.path.lastIndexOf('/'))+info.path.substr(1);
			}
			for(var i in base)
				if(i!='hash'&&i!='query'&&typeof info[i]!='string')
					info[i]=base[i];
		}
		return info;
	}

	function buildUrl(info){
		if(typeof info.host!='string')
			return false;
		if(typeof info.scheme!='string')
			info.scheme='http';
		if(typeof info.path!='string')
			info.path='/';
		return info.scheme+'://'+info.host+info.path+(info.query?'?'+info.query:'')+(info.fragment?'#'+info.fragment:'');
	}

}());