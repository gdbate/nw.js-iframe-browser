;(function(){

	module.exports=function(gui,title,icon,tooltip){
		this.gui=gui;
		this.tray=new this.gui.Tray({
			title:title,
			icon:icon,
			tooltip:tooltip
		});
		this.menu=new this.gui.Menu();
	}
	module.exports.prototype.click=function(cb){
		this.tray.on('click',cb);
		return this;
	}
	module.exports.prototype.add=function(label,cb){
		this.menu.append(new this.gui.MenuItem({type:'normal',label:label,click:cb}));
		this.tray.menu=this.menu;
		return this;
	}
	module.exports.prototype.separator=function(){
		this.menu.append(new this.gui.MenuItem({type:'separator',label:''}));
		this.tray.menu=this.menu;
		return this;
	}
	module.exports.prototype.remove=function(){
		this.tray.remove();
		this.tray=null;
		return this;
	}

}());