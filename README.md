# nw.js-iframe-browser

NW.JS comes with a toolbar that has some browser functionality to start with. But what if you want to customize the UI and keep node scripts separate from the websites? I have distilled this project down to a simple browser in order to try and resolve some of the issues with making a browser out of an iframe. 

#### It uses the following NW.JS Features: ####

- frameless window
- iframes with:
	1. custom user agent
	2. fake top (no frame breaking)
	3. no node.js privileges
- system tray icon with menu
- custom UI

## Current Screenshot: ##

![Example](https://raw.githubusercontent.com/gdbate/nw.js-iframe-browser/master/example.png)

## Quick Links ##

1. [NW.JS Homepage](http://nwjs.io/)
2. [NW.JS Wiki](https://github.com/nwjs/nw.js/wiki)
3. [frameless window info](https://github.com/nwjs/nw.js/wiki/Frameless-window)
4. [iframe Information](https://github.com/nwjs/nw.js/wiki/Mini-browser-in-iframe)

## Issues ##

- haven't had time to get location bar entry working well.
- have a search engine setting
- more testing and some more issues will crop up.
- multiple tab support?
- Remember window location on restart
- disabled back/forward buttons if no ability to do so

(probably lots not listed)
 