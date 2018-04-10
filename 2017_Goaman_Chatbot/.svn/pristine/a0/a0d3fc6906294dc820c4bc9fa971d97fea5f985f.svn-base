<?php

/*
 * -------------------------------------------------------------------
 *  My Config Private
 * -------------------------------------------------------------------
 */
date_default_timezone_set('Asia/Ho_Chi_Minh');

define('FOLDER', '/PROJECT/2017_Goaman_Chatbot/CODE/');
define('ADMINCP', 'cms');
if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on'){
	define('PATH_URL', 'https://'.$_SERVER['HTTP_HOST'].FOLDER);
	define('PATH_URL_ADMIN', 'https://'.$_SERVER['HTTP_HOST'].FOLDER.ADMINCP.'/');
}else{
	define('PATH_URL', 'http://'.$_SERVER['HTTP_HOST'].FOLDER);
	define('PATH_URL_ADMIN', 'http://'.$_SERVER['HTTP_HOST'].FOLDER.ADMINCP.'/');
}

define('PREFIX', '');//pix_
define('DB_USER', 'root');//root
define('DB_PASS', '');
define('DB_NAME', 'goaman');

define('IS_LOCALHOST', true);

define('DEBUG_LOG', true);
define('DEBUG_LOG_LAST_COMMAND', false);

define('WEBSITE_NAME', 'GOAMAN');

define('LANG_CODE_DEFAULT', 'vn');
define('LANG_CODE_VIETNAM', 'vn');
define('LANG_CODE_ENGLISH', 'en');

define('PRODUCT_SIZE_SMALL', 1);
define('PRODUCT_SIZE_MEDIUM', 2);
define('PRODUCT_SIZE_LARGE', 3);

define('AJAX_PREFIX', 'ajax');
define('AJAX_SUBMIT_CONTACT_FORM', 'submit_contact');
define('AJAX_SUBMIT_BOOKING_FORM', 'submit_booking');
define('AJAX_SUBMIT_ORDER_FORM', 'submit_order');

define('HAS_PAGE', 1);
define('HAS_CATEGORY', 2);
define('HAS_DETAIL', 3);

define('USER_ROLE_READER', 1);
define('USER_ROLE_PRO', 2);
define('ACCOUNT_CREATED_BY_NORMAL', 1);
define('ACCOUNT_CREATED_BY_FACEBOOK', 2);
define('ACCOUNT_CREATED_BY_GMAIL', 3);

$size = array(
	's' => 'Small',
	'm' => 'medium',
	'l' => 'Large'
	);

define('SIZE_SERIALIZE', serialize($size));
define('AMAZON_PREFIX', 'aws_ses');

$slug_special = array(ADMINCP, AJAX_PREFIX, AMAZON_PREFIX);
define('SLUGS_SPECIAL_SERIALIZE', serialize($slug_special));

//CONFIG AMAZON SES
//PIX
define('AWS_ACCESS_KEY','AKIAJX5FIUES662ZCWAQ');
define('AWS_SECRET_KEY','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');
define('AWS_REGION','us-east-1'); 
define('AWS_SDK_VERSION', 'latest');
define('NO_REPLY_SENDER', 'nhatnguyen.pix@gmail.com');
define('FLATFORM_NAME', 'REDM');

define('GG_CLIENT_ID', '828611657482-mhttm1pb5d41mt3t3468ht98n3d2ncag.apps.googleusercontent.com');
define('GG_CLIENT_SECRET', 'EdFC6HP3WMTGantSayaWJ8Xb');

define('ONESIGNAL_REST_API_KEY', 'NWQ5ZGM5MDEtZDIyYS00MzMwLTkzMWItOGI5MTA5MGRlMGZl');
define('ONESIGNAL_APP_ID', 'fe355421-d33c-4c52-92e9-34f2d60c9ede');
define('ONESIGNAL_SUBDOMAIN_NAME', 'redmdev');
define('ONESIGNAL_SAFARI_WEB_ID', 'web.onesignal.auto.0f4ef0fc-d020-4184-9066-253532c318fc');

