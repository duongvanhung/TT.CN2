<?php
/*BEGIN: ADMIN HELPER*/
function admin_user_check_root(){
	$result = false;
	
	$ci = & get_instance();
	$session_data = $ci->session->get_userdata('userInfo');
	if(!empty($session_data['userInfo'])){
		$username = $session_data['userInfo'];
		$result = $username == 'root';
	}

	return $result;
}

function builder_check_permanent(){
	$is_permanent = !empty($_SESSION['permanent']) || admin_user_check_root();
	return $is_permanent;
}
/*END: ADMIN HELPER*/