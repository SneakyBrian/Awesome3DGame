# Awesome 3D Game! #

## About ##

Although the name suggest that this is a game, at present it is merely a demo. When you visit the site (in a browser that fulfills the requirements below) then you will be presented with a first-person view from your own personal spaceship, flying through the galaxy.

Other people also viewing the site at the same time as you will be visible to you as spaceships flying through space, their positions updated in real time. Your spaceship will also be visible to them.

## Controls ##

**Mouse**

- Moving the mouse pointer away from the centre will turn your ship in that direction
- Left click moves your ship forward
- Right click moves your ship backwards

**Keyboard**

- **W** moves your ship forward
- **A** moves your ship to the left
- **S** moves your ship backwards
- **D** moves your ship to the right
- **Q** rotates your ship around the forward axis to the left
- **E** rotates your ship around the forward axis the the right
- **R** moves your ship upwards
- **F** moves your ship down

## HUD ##

Top left displays your radar, which shows where other ships are in space. Your ship is represented by the large green dot in the centre, other ships are smaller red dots around. If a red dot is on top of the green dot that means that either the other ship is right next to you, or directly in front of you.

Bottom left displays the game info messages, which will tell you about events in the galaxy, such as a new player joining the game.

## Requirements ##

You will need a browser that supports WebGL, running on a reasonably powerful computer with decent graphics hardware.

The currently recommended browser is [Google Chrome](http://www.google.com/chrome/ "Google Chrome"). The demo works ok on [Firefox](http://www.mozilla.org/firefox/ "Firefox") (but not as fast as Chrome), and not at all on [IE 10](http://windows.microsoft.com/en-GB/internet-explorer/download-ie "IE 10") or less. Apparently this may be changed in IE 11 ([which will possibly support WebGL](http://www.theverge.com/2013/3/30/4165204/microsoft-bringing-webgl-support-internet-explorer-11-windows-blue "which will possibly support WebGL")).

Google Chrome has also been found to work on Android devices, such as Tablets and recent phones. However what does not work at present is the touch interface for these devices. At present this is primarily a desktop-with-mouse driven experience. 

## Technology ##

This demo uses WebGL for the graphics rendering. It also uses either WebSockets, Server-Sent Events or AJAX Long Polling for the real-time communications.

It is built with the following technologies:

- [Three.js](http://threejs.org/ "Three.js") is a WebGL javascript library
- [SignalR](http://signalr.net/ "SignalR") is Real-Time Communications library for the web
- [Windows Azure](http://www.windowsazure.com/ "Windows Azure") is Microsofts Cloud Hosting Solution

## Live Demo ##

A live demo is available here: [http://awesome3dgame.azurewebsites.net/](http://awesome3dgame.azurewebsites.net/)

## Additional Links ##

Here are some additional links:

- [Developer Blog](http://tehc0dez.blogspot.co.uk/ "Developer Blog")
- [Follow me on Twitter](https://twitter.com/thesneakybrian "Follow me on Twitter")