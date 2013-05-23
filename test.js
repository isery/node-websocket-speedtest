//all the Socket-Objects are saved in an array called connectedClients
//each socket has to listeners connected and message
//each socket also has a time1 which is the starting time of the connection request

var WebSocket = require('ws');
//May be changed for testing
var CONNECTIONS = 200;
var CONCURRENT = 50;
var INTERVAL = 1000;

//Include the time of each socket for connecting and messaging
var connectingTimes = [];
var messageTimes = [];

//All Socket-Objects
var connectedClients = [];

//Global Start time, when the Broadcaster sends his message
var sendingTime1 = 0;

//counter for ArrayIndex, counter for sockets who got the message, counter for actual connected user
var j = 0;
var messageArrived = 0;
var connected = 0;

//scheme for array to save the socket
var obj = {
    socket:0
};

//function for calculating the average time
var average = function (messageTimes) {
    summe = 0;
    //console.log(messageTimes);
    for (i = 0; i < messageTimes.length; i++) {
        summe += messageTimes[i];
    }
    return summe / messageTimes.length;
}

//setInterval for concurrency
int1 = setInterval(
    function () {
        for (var i = 0; i < CONCURRENT; i++) {
                var time1 = new Date;
                        connectedClients[j] = new WebSocket('ws://127.0.0.1:3000/');
                        connectedClients[j].time1 = time1;
                        connectedClients[j].on('open', function() {
                                var time2 = new Date;
                                connectingTimes.push(time2 - this.time1);
                                connected++;
                                //console.log(connectedClients.length)
                                if (connected >= CONNECTIONS) {
                                        //console.log(connectingTimes.length);
                                        console.log("Average time for connecting: "+average(connectingTimes));
                                        testSending();
                                        clearInterval(int1);
                                }
                        });

                        connectedClients[j].on('message', function(data) {
                                var time3 = new Date;
                                messageTimes.push(time3 - sendingTime1);
                                messageArrived++;
                                //console.log(messageArrived + " : "+connectedClients.length)
                                if (messageArrived >= connectedClients.length) {
                                        //console.log(messageTimes.length);
                                        console.log("Average Time for Message: "+average(messageTimes));
                                }
                        });
                        //Index for connectedUser
                        j++;
                }
    }, INTERVAL);

//this is one connection who will broadcast a message
function testSending() {
    var sender = new WebSocket('ws://127.0.0.1:3000');

    sender.on('open', function() {
        sendingTime1 = new Date;
        sender.send('I am the Broadcaster and I\'ve got News!');
    });
}