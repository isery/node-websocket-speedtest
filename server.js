
var array = [];
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 3000});
	wss.on('connection', function(ws) {
		array.push(ws);
    	ws.on('message', function(message) {
    		console.log(message+" : "+array.length);
    		for(var i = 0; i < array.length;i++) {
       	 		array[i].send('something');
       		}
   		 });
	});
