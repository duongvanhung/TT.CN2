<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'users';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'home'; //home
// $route['404_override'] = 'home/pagemissing';
$route['translate_uri_dashes'] = FALSE;

//Config Router Multi Language
// $route['^(en|cn)/(.+)$'] = "$1";
$route['^(en|cn)$'] = $route['default_controller'];
$route[AJAX_PREFIX . '/signup'] ='home/signup';
$route[AJAX_PREFIX . '/login'] ='home/login';
$route[AJAX_PREFIX . '/profile'] ='home/profile';
$route[AJAX_PREFIX . '/blog'] ='home/blog';
$route[AJAX_PREFIX . '/logout'] ='home/logout';
$route[AJAX_PREFIX . '/profile'] ='home/profile';
$route[AJAX_PREFIX . '/login_fb'] ='home/login_fb';
$route[AJAX_PREFIX . '/changePassword'] ='home/changePassword';
$route[AJAX_PREFIX . '/subscription'] ='home/subscription_setting';
$route[AJAX_PREFIX . '/for-got-password'] ='home/for_got_password';
$route[AJAX_PREFIX . '/update'] ='home/update_user';
$route[AJAX_PREFIX . '/comment'] ='home/insert_com';

$route[AJAX_PREFIX . '/login_gg'] ='home/login_google';
$route[AJAX_PREFIX . '/profile/(:any)'] ='home/proflie/$1';




$route['^(en|cn)/ajax_comment'] = 'home/ajax_loadcomment';
$route['^(en|cn)/ajax_comment_reply'] = 'home/ajax_loadcomment_reply';


$route['^(en|cn)/comments'] = 'home/insert_user_comment';
$route['^(en|cn)/comments-reply'] = 'home/insert_user_comment_child';

$route['^(en|cn)/blog/(:any)'] = 'home/blog/$2';
$route['^(en|cn)/(.+)$'] = $route[AJAX_PREFIX . '/blog'];
//$route['^(en|cn)/blog/(:any)'] = 'home/blog/$2';
$route['^(en|cn)/(.+)$'] = $route[AJAX_PREFIX . '/profile'];




//$route['^(en|cn)/(.+)$'] = $route[AJAX_PREFIX . '/profile'];

$route[AJAX_PREFIX . '/test-editor'] ='home/test_editor';
$route[AJAX_PREFIX . '/test-onesignal'] ='home/test_onesignal';
$route[AJAX_PREFIX . '/send-onesignal'] ='home/send_notify_by_onesignal';



//Config Router Front End

// //Config AWS
$route[AMAZON_PREFIX] = 'aws_service';
$route[AMAZON_PREFIX.'/test_parse'] = 'aws_service/test_parse';
$route[AMAZON_PREFIX.'/test_bounce'] = 'aws_service/test_send_email_bounce';
$route[AMAZON_PREFIX.'/test_compaint'] = 'aws_service/test_send_email_complaint';

$route[AMAZON_PREFIX.'/get_bounce'] = 'aws_service/amazon_message_listener';
$route[AMAZON_PREFIX.'/get_complaint'] = 'aws_service/amazon_message_listener';

$route[AMAZON_PREFIX.'/verify_email'] = 'aws_service/verify_email_sandbox/';
$route[AMAZON_PREFIX.'/test_send_mail'] = 'aws_service/test_send_mail/';

$route[AMAZON_PREFIX.'/unsubscribe'] = 'admincp_campaigns/admincp_checkmail_unsubscribe/';
// //Config url ajax request
// $route[AJAX_PREFIX] = 'test';
// // page 
$route['^(en|cn)/(:any)'] = 'home/router/$1/$2';
// // page / category / 
$route['^(en|cn)/(:any)/(:any)'] = 'home/router/$1/$2/$3';
// // page / category / item
$route['^(en|cn)/(:any)/(:any)/(:any)'] = 'home/router/$1/$2/$3/$4';

//Config Router Admincp
$route[ADMINCP] = "admincp";
$route[ADMINCP.'/menu'] = "admincp/menu";
$route[ADMINCP.'/login'] = "admincp/login";
$route[ADMINCP.'/logout'] = "admincp/logout";
$route[ADMINCP.'/permission'] = "admincp/permission";
$route[ADMINCP.'/saveLog'] = "admincp/saveLog";
$route[ADMINCP.'/update_profile'] = "admincp/update_profile";
$route[ADMINCP.'/setting'] = "admincp/setting";
$route[ADMINCP.'/getSetting'] = "admincp/getSetting";
$route[ADMINCP.'/theme'] = "admincp_theme/admincp_index";
$route[ADMINCP.'/(:any)/(:any)/(:any)/(:any)'] = "$1/admincp_$2/$3/$4";
$route[ADMINCP.'/(:any)/(:any)/(:any)'] = "$1/admincp_$2/$3";
$route[ADMINCP.'/(:any)/(:any)'] = "$1/admincp_$2";
$route[ADMINCP.'/(:any)'] = "$1/admincp_index";
//$route['abc'] = 'home/index';


