<?php

namespace App\Chat;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        echo "Starting server...\n";
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        echo "Connection was opened!\n";
        $this->clients->attach($conn);
        echo "New connection! {$conn->resourceId}\n";
        $this->responseClients("User {$conn->resourceId} is now online!", $conn);
    }
    
    public function onBinaryMessage(ConnectionInterface $from, $msg) {
        echo "binary";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Message received! Said: {$msg}\n";
        $this->responseClients($msg, null);//$from);
    }

    public function onClose(ConnectionInterface $conn) {
        echo "Closing connection...\n";
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} closed!\n";
        $this->responseClients("User {$conn->resourceId} gone away!", $conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Oh no, an error! The system said: bla bla {$ex->getMessage()}\n";
        $conn->close();
    }
    
    protected function responseClients($msg, $from) {
        foreach ($this->clients as $client) {
            if ($from != $client) {
                $client->send($msg);
            }
        }
    } 
}