node-websocket-speedtest
========================

testing the speed and maximum of websockets in node.js and PHP

```javascript
//May be changed for testing
var CONNECTIONS = 200;
var CONCURRENT = 50;
var INTERVAL = 1000;
```

```javascript
Node Server
Node test

php Server.php
Node test
```

If the Server crashes when you try a couple hundred connections then its most likely because of a limitation of your OS.
Most of the times it is the file-descriptor or open-files max.
