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
|	$route['default_controller'] = 'welcome';
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
$route['default_controller'] = 'home';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

//Config Router Multi Language
// $route['^(en|vi)/(.+)$'] = "$1";
// $route['^(en|vi)$'] = $route['default_controller'];

//Config Router Front End
$route['export'] = 'home/export';
$route['export_buyer_save'] = 'home/export_buyer_save';

$route['stripe-demo'] = 'home/stripe_demo';
# chat module
$route['chat'] = 'chat';
$route['chat/subscribe'] = 'chat/doSubscribe';
$route['chat/insertConversation'] = 'chat/insertConversation';
#### get started button
$route['get-started-button/set'] = 'chat/setGetStartedButton';
$route['get-started-button/get'] = 'chat/readGetStartedButton';
$route['get-started-button/delete'] = 'chat/deleteGetStartedButton';
$route['geeting-text/set'] = 'chat/setGeetingText';
$route['geeting-text/get'] = 'chat/readGeetingText';
$route['chat/test-ai'] = 'chat/testSendAI';
$route['chat/wit-ai'] = 'chat/testWitAi';
$route['chat/ai/get-weight'] = 'chat/getWeightByAI';
$route['chat/ai/get-height'] = 'chat/getHeightByAI';
$route['chat/ai/get-birthday'] = 'chat/getBirthdayByAI';
$route['chat/test'] = 'chat/Payment/test_session';


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