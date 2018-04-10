<?php

/*
 * -------------------------------------------------------------------
 *  My Config Private
 * -------------------------------------------------------------------
 */
date_default_timezone_set('Asia/Ho_Chi_Minh');
define('FOLDER', '/2017_Goaman_Chatbot/CODE/');
define('ADMINCP', 'admincp');
if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on'){
	define('PATH_URL', 'https://'.$_SERVER['HTTP_HOST'].FOLDER);
	define('PATH_URL_ADMIN', 'https://'.$_SERVER['HTTP_HOST'].FOLDER.ADMINCP.'/');
}else{
	define('PATH_URL', 'http://'.$_SERVER['HTTP_HOST'].FOLDER);
	define('PATH_URL_ADMIN', 'http://'.$_SERVER['HTTP_HOST'].FOLDER.ADMINCP.'/');
}

define('PREFIX', 'nqt_');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'chatbot_builder');

// ENVATO
define('ENVATO_USERNAME', '');
define('ENVATO_API_KEY', '');
define('ENVATO_ITEM_ID', '');

define('DEBUG_LOG', true);
define('DEBUG_LOG_LAST_COMMAND', false);

define('PAGE_ACCESS_TOKEN', 'EAAEcnQNlqEkBAK7vqcaXjFry11l8rz0Jta686X1lNXbxHb5yFvEep2RE8RMztKbEnUA6yR76cJeEZBKNDJp5ZCJ6H1NYJvyEb1VWWUmsp6BABHPAKZAlUq3fmJRkqm2UnWfBoM7SCV2xyq6VcFZB66qpdXiRvxAsnJQkpHhmKgZDZD');