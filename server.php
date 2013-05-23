<?php
// prevent the server from timing out
set_time_limit(0);
require 'class.PHPWebSocket.php';

// when a client sends data to the server
function wsOnMessage($clientID, $message, $messageLength, $binary) {
	global $Server;
		foreach ( $Server->wsClients as $id => $client ) {
			$Server->wsSend($id, $message);
		}
}

$Server = new PHPWebSocket();
$Server->bind('message', 'wsOnMessage');
$Server->wsStartServer('0.0.0.0', 3000);

?>
