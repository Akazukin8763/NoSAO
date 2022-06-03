<?php
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', '123456789'); // 123456789，設自己的

    date_default_timezone_set('Asia/Taipei');

    try{
        $link = new PDO('mysql:host=localhost; dbname=mysao; charset=utf8', DB_USERNAME, DB_PASSWORD);
        
        $link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $link->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        return $link;
    }
    catch (PDOException $e){
        die("ERROR: Could not connect. ".$e->getMessage());
    }
?>