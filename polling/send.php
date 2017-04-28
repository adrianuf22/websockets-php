<?php

if (isset($_POST['message'])) {
    file_put_contents('database', $_POST['message']);
}

