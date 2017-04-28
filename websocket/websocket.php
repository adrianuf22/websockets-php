<?php

require __DIR__ . '/../vendor/autoload.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Chat\Chat;

$chatApp = new Chat();
$webSocketServer = new WsServer($chatApp);
$httpServer = new HttpServer($webSocketServer);

$server = IoServer::factory($httpServer, 8181);
//$server->route();
$server->run();