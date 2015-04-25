# nw.js-iframe-browser

The following is a (very) quick tech demo for using NW.JS to create a custom browser. Iframes are ideal since you can remove the node privileges and also no allow frame breakers to remove the frame. This would be a good starting point if you are looking to make a browser.

#### It uses the following NW.JS Features: ####

1. Frameless Window
2. iframes with:
	1. custom user agent
	2. fake top (no frame breaking)
	3. no node.js privileges
4. System tray icon with menu
5. Custom UI

## Current Screenshot: ##

![Example](https://raw.githubusercontent.com/gdbate/nw.js-iframe-browser/master/example.png)

## Quick Links ##

1. [NW.JS Homepage](http://nwjs.io/)
2. [NW.JS Wiki](https://github.com/nwjs/nw.js/wiki)
3. [frameless window info](https://github.com/nwjs/nw.js/wiki/Frameless-window)
4. [iframe Information](https://github.com/nwjs/nw.js/wiki/Mini-browser-in-iframe)

## Issues ##

This is a work in progress to get the best experience possible using an iframe. There are still some issues to work out as well as some more time needed on implementing some basic functionality.

1. haven't had time to get location bar entry working well.
2. more testing and some more issues will pop up.
3. multiple tab support?

