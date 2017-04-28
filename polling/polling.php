<?php

$timestamp = (int)$_GET['timestamp'];
$fileTimestamp = filemtime('database');

if ($timestamp == null || $fileTimestamp > $timestamp) {
    $data['timestamp'] = $fileTimestamp;
    $data['message'] = file_get_contents('database');

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
echo null;