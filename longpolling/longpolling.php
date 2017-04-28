<?php

header('Content-Type: application/json');

set_time_limit(0);
$safeLimit = 90;
$safeCounter = 0;

while ($safeCounter < $safeLimit) {
    $safeCounter++;

    clearstatcache();
    
    $timestamp = (int)$_GET['timestamp'];
    $fileTimestamp = (int)filemtime('database');
    if ($timestamp == null || $fileTimestamp > $timestamp) {
        $data['timestamp'] = $fileTimestamp;
        $data['message'] = file_get_contents('database');
        
        echo json_encode($data);
        exit;
    } else {
        session_write_close();
        sleep(1);
        continue;
    }
}

echo json_encode(['empty' => true]);