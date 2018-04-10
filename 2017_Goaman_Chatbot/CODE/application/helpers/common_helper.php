<?php
function v2e_special($value){
	$value = str_replace("â", "a", $value);	
	$value = str_replace("ấ", "a", $value);
	$value = str_replace("ầ", "a", $value);
	$value = str_replace("ẩ", "a", $value);
	$value = str_replace("ẫ", "a", $value);
	$value = str_replace("ậ", "a", $value);
	#---------------------------------A^

	$value = str_replace("Â", "a", $value);	
	$value = str_replace("Ấ", "a", $value);
	$value = str_replace("Ầ", "a", $value);
	$value = str_replace("Ẩ", "a", $value);
	$value = str_replace("Ẫ", "a", $value);
	$value = str_replace("Ậ", "a", $value);
	#---------------------------------a

	$value = str_replace("á", "a", $value);
	$value = str_replace("à", "a", $value);
	$value = str_replace("ả", "a", $value);
	$value = str_replace("ã", "a", $value);
	$value = str_replace("ạ", "a", $value);
	#---------------------------------A

	$value = str_replace("Á", "a", $value);
	$value = str_replace("À", "a", $value);
	$value = str_replace("Ả", "a", $value);
	$value = str_replace("Ã", "a", $value);
	$value = str_replace("Ạ", "a", $value);
	#---------------------------------a(

	$value = str_replace("ă", "a", $value);	
	$value = str_replace("ắ", "a", $value);
	$value = str_replace("ằ","a", $value);
	$value = str_replace("ẳ", "a", $value);
	$value = str_replace("ẵ","a", $value);
	$value = str_replace("ặ", "a", $value);
	#---------------------------------A(

	$value = str_replace("Ă", "a", $value);
	$value = str_replace("Ắ", "a", $value);
	$value = str_replace("Ằ", "a", $value);
	$value = str_replace("Ẳ", "a", $value);
	$value = str_replace("Ẵ", "a", $value);
	$value = str_replace("Ặ", "a", $value);
	#---------------------------------e^

	$value = str_replace("ê", "e", $value);	
	$value = str_replace("ế", "e", $value);
	$value = str_replace("ề", "e", $value);
	$value = str_replace("ể", "e", $value);
	$value = str_replace("ễ", "e", $value);
	$value = str_replace("ệ", "e", $value);
	#---------------------------------E^

	$value = str_replace("Ê", "e", $value);	
	$value = str_replace("Ế", "e", $value);
	$value = str_replace("Ề", "e", $value);
	$value = str_replace("Ể", "e", $value);
	$value = str_replace("Ễ", "e", $value);
	$value = str_replace("Ệ", "e", $value);
	#---------------------------------e

	$value = str_replace("é","e", $value);
	$value = str_replace("è", "e", $value);
	$value = str_replace("ẻ", "e", $value);
	$value = str_replace("ẽ", "e", $value);
	$value = str_replace("ẹ", "e", $value);
	#---------------------------------E

	$value = str_replace("É", "e", $value);
	$value = str_replace("È", "e", $value);
	$value = str_replace("Ẻ", "e", $value);
	$value = str_replace("Ẽ", "e", $value);
	$value = str_replace("Ẹ", "e", $value);
	#---------------------------------i

	$value = str_replace("í", "i", $value);
	$value = str_replace("ì", "i", $value);
	$value = str_replace("ỉ", "i", $value);
	$value = str_replace("ĩ", "i", $value);
	$value = str_replace("ị", "i", $value);
	#---------------------------------I

	$value = str_replace("Í", "i", $value);
	$value = str_replace("Ì", "i", $value);
	$value = str_replace("Ỉ", "i", $value);
	$value = str_replace("Ĩ", "i", $value);
	$value = str_replace("Ị", "i", $value);
	#---------------------------------o^

	$value = str_replace("ô", "o", $value);	
	$value = str_replace("ố", "o", $value);
	$value = str_replace("ồ", "o", $value);
	$value = str_replace("ổ", "o", $value);
	$value = str_replace("ỗ", "o", $value);
	$value = str_replace("ộ", "o", $value);
	#---------------------------------O^

	$value = str_replace("Ô", "o", $value);	
	$value = str_replace("Ố", "o", $value);
	$value = str_replace("Ồ", "o", $value);
	$value = str_replace("Ổ", "o", $value);
	$value = str_replace("Ỗ", "o", $value);
	$value = str_replace("Ộ", "o", $value);
	#---------------------------------o*

	$value = str_replace("ơ", "o", $value);	
	$value = str_replace("ớ", "o", $value);
	$value = str_replace("ờ", "o", $value);
	$value = str_replace("ở", "o", $value);
	$value = str_replace("ỡ", "o", $value);
	$value = str_replace("ợ", "o", $value);
	#---------------------------------O*

	$value = str_replace("Ơ", "o", $value);	
	$value = str_replace("Ớ", "o", $value);
	$value = str_replace("Ờ", "o", $value);
	$value = str_replace("Ở", "o", $value);
	$value = str_replace("Ỡ", "o", $value);
	$value = str_replace("Ợ", "o", $value);
	#---------------------------------u*

	$value = str_replace("ư", "u", $value);	
	$value = str_replace("ứ", "u", $value);
	$value = str_replace("ừ", "u", $value);
	$value = str_replace("ử", "u", $value);
	$value = str_replace("ữ", "u", $value);
	$value = str_replace("ự", "u", $value);
	#---------------------------------U*

	$value = str_replace("Ư", "u", $value);	
	$value = str_replace("Ứ", "u", $value);
	$value = str_replace("Ừ", "u", $value);
	$value = str_replace("Ử", "u", $value);
	$value = str_replace("Ữ", "u", $value);
	$value = str_replace("Ự", "u", $value);
	#---------------------------------y

	$value = str_replace("ý", "y", $value);
	$value = str_replace("ỳ", "y", $value);
	$value = str_replace("ỷ", "y", $value);
	$value = str_replace("ỹ", "y", $value);
	$value = str_replace("ỵ", "y", $value);
	#---------------------------------Y

	$value = str_replace("Ý", "y", $value);
	$value = str_replace("Ỳ", "y", $value);
	$value = str_replace("Ỷ", "y", $value);
	$value = str_replace("Ỹ", "y", $value);
	$value = str_replace("Ỵ", "y", $value);
	#---------------------------------DD

	$value = str_replace("Đ", "d", $value);		
	$value = str_replace("đ", "d", $value);
	#---------------------------------o

	$value = str_replace("ó", "o", $value);
	$value = str_replace("ò", "o", $value);
	$value = str_replace("ỏ", "o", $value);
	$value = str_replace("õ", "o", $value);
	$value = str_replace("ọ", "o", $value);
	#---------------------------------O

	$value = str_replace("Ó", "o", $value);
	$value = str_replace("Ò", "o", $value);
	$value = str_replace("Ỏ", "o", $value);
	$value = str_replace("Õ", "o", $value);
	$value = str_replace("Ọ", "o", $value);
	#---------------------------------u

	$value = str_replace("ú", "u", $value);
	$value = str_replace("ù", "u", $value);
	$value = str_replace("ủ", "u", $value);
	$value = str_replace("ũ", "u", $value);
	$value = str_replace("ụ", "u", $value);
	#---------------------------------U

	$value = str_replace("Ú", "u", $value);
	$value = str_replace("Ù", "u", $value);
	$value = str_replace("Ủ", "u", $value);
	$value = str_replace("Ũ", "u", $value);
	$value = str_replace("Ụ", "u", $value);
	#---------------------------------

	return $value;
}

function v2e($value){
	#---------------------------------SPECIAL	
	$value = str_replace("&quot;","", $value);	
	$value = str_replace(".","", $value);
	$value = str_replace("=","", $value);
	$value = str_replace("+","", $value);
	$value = str_replace("!","", $value);
	$value = str_replace("@","", $value);
	$value = str_replace("#","", $value);
	$value = str_replace("$","", $value);
	$value = str_replace("%","", $value);	
	$value = str_replace("^","", $value);	
	$value = str_replace("&","", $value);	
	$value = str_replace("*","", $value);	
	$value = str_replace("(","", $value);	
	$value = str_replace(")","", $value);	
	$value = str_replace("`","", $value);	
	$value = str_replace("~","", $value);	
	$value = str_replace(",","", $value);
	$value = str_replace("/","", $value);	
	$value = str_replace("\\","", $value);	
	$value = str_replace('"',"", $value);	
	$value = str_replace("'","", $value);	
	$value = str_replace(":","", $value);	
	$value = str_replace(";","", $value);	
	$value = str_replace("|","", $value);	
	$value = str_replace("[","", $value);	
	$value = str_replace("]","", $value);	
	$value = str_replace("{","", $value);	
	$value = str_replace("}","", $value);	
	$value = str_replace("(","", $value);	
	$value = str_replace(")","", $value);		
	$value = str_replace("?","", $value);
	#---------------------------------a^

	$value = str_replace("â", "a", $value);	
	$value = str_replace("ấ", "a", $value);
	$value = str_replace("ầ", "a", $value);
	$value = str_replace("ẩ", "a", $value);
	$value = str_replace("ẫ", "a", $value);
	$value = str_replace("ậ", "a", $value);
	#---------------------------------A^

	$value = str_replace("Â", "a", $value);	
	$value = str_replace("Ấ", "a", $value);
	$value = str_replace("Ầ", "a", $value);
	$value = str_replace("Ẩ", "a", $value);
	$value = str_replace("Ẫ", "a", $value);
	$value = str_replace("Ậ", "a", $value);
	#---------------------------------a

	$value = str_replace("á", "a", $value);
	$value = str_replace("à", "a", $value);
	$value = str_replace("ả", "a", $value);
	$value = str_replace("ã", "a", $value);
	$value = str_replace("ạ", "a", $value);
	#---------------------------------A

	$value = str_replace("Á", "a", $value);
	$value = str_replace("À", "a", $value);
	$value = str_replace("Ả", "a", $value);
	$value = str_replace("Ã", "a", $value);
	$value = str_replace("Ạ", "a", $value);
	#---------------------------------a(

	$value = str_replace("ă", "a", $value);	
	$value = str_replace("ắ", "a", $value);
	$value = str_replace("ằ","a", $value);
	$value = str_replace("ẳ", "a", $value);
	$value = str_replace("ẵ","a", $value);
	$value = str_replace("ặ", "a", $value);
	#---------------------------------A(

	$value = str_replace("Ă", "a", $value);
	$value = str_replace("Ắ", "a", $value);
	$value = str_replace("Ằ", "a", $value);
	$value = str_replace("Ẳ", "a", $value);
	$value = str_replace("Ẵ", "a", $value);
	$value = str_replace("Ặ", "a", $value);
	$value = str_replace("Ă", "a", $value);
	#---------------------------------e^

	$value = str_replace("ê", "e", $value);	
	$value = str_replace("ế", "e", $value);
	$value = str_replace("ề", "e", $value);
	$value = str_replace("ể", "e", $value);
	$value = str_replace("ễ", "e", $value);
	$value = str_replace("ệ", "e", $value);
	#---------------------------------E^

	$value = str_replace("Ê", "e", $value);	
	$value = str_replace("Ế", "e", $value);
	$value = str_replace("Ề", "e", $value);
	$value = str_replace("Ể", "e", $value);
	$value = str_replace("Ễ", "e", $value);
	$value = str_replace("Ệ", "e", $value);
	#---------------------------------e

	$value = str_replace("é","e", $value);
	$value = str_replace("è", "e", $value);
	$value = str_replace("ẻ", "e", $value);
	$value = str_replace("ẽ", "e", $value);
	$value = str_replace("ẹ", "e", $value);
	#---------------------------------E

	$value = str_replace("É", "e", $value);
	$value = str_replace("È", "e", $value);
	$value = str_replace("Ẻ", "e", $value);
	$value = str_replace("Ẽ", "e", $value);
	$value = str_replace("Ẹ", "e", $value);
	#---------------------------------i

	$value = str_replace("í", "i", $value);
	$value = str_replace("ì", "i", $value);
	$value = str_replace("ỉ", "i", $value);
	$value = str_replace("ĩ", "i", $value);
	$value = str_replace("ị", "i", $value);
	#---------------------------------I

	$value = str_replace("Í", "i", $value);
	$value = str_replace("Í", "i", $value);
	$value = str_replace("Ỉ", "i", $value);
	$value = str_replace("Ĩ", "i", $value);
	$value = str_replace("Ị", "i", $value);
	#---------------------------------o^

	$value = str_replace("ô", "o", $value);	
	$value = str_replace("ố", "o", $value);
	$value = str_replace("ồ", "o", $value);
	$value = str_replace("ổ", "o", $value);
	$value = str_replace("ỗ", "o", $value);
	$value = str_replace("ộ", "o", $value);
	#---------------------------------O^

	$value = str_replace("Ô", "o", $value);	
	$value = str_replace("Ố", "o", $value);
	$value = str_replace("Ồ", "o", $value);
	$value = str_replace("Ổ", "o", $value);
	$value = str_replace("Ỗ", "o", $value);
	$value = str_replace("Ộ", "o", $value);
	#---------------------------------o*

	$value = str_replace("ơ", "o", $value);	
	$value = str_replace("ớ", "o", $value);
	$value = str_replace("ờ", "o", $value);
	$value = str_replace("ở", "o", $value);
	$value = str_replace("ỡ", "o", $value);
	$value = str_replace("ợ", "o", $value);
	#---------------------------------O*

	$value = str_replace("Ơ", "o", $value);	
	$value = str_replace("Ớ", "o", $value);
	$value = str_replace("Ờ", "o", $value);
	$value = str_replace("Ở", "o", $value);
	$value = str_replace("Ỡ", "o", $value);
	$value = str_replace("Ợ", "o", $value);
	#---------------------------------u*

	$value = str_replace("ư", "u", $value);	
	$value = str_replace("ứ", "u", $value);
	$value = str_replace("ừ", "u", $value);
	$value = str_replace("ử", "u", $value);
	$value = str_replace("ữ", "u", $value);
	$value = str_replace("ự", "u", $value);
	#---------------------------------U*

	$value = str_replace("Ư", "u", $value);	
	$value = str_replace("Ứ", "u", $value);
	$value = str_replace("Ừ", "u", $value);
	$value = str_replace("Ử", "u", $value);
	$value = str_replace("Ữ", "u", $value);
	$value = str_replace("Ự", "u", $value);
	#---------------------------------y

	$value = str_replace("ý", "y", $value);
	$value = str_replace("ỳ", "y", $value);
	$value = str_replace("ỷ", "y", $value);
	$value = str_replace("ỹ", "y", $value);
	$value = str_replace("ỵ", "y", $value);
	#---------------------------------Y

	$value = str_replace("Ý", "y", $value);
	$value = str_replace("Ỳ", "y", $value);
	$value = str_replace("Ỷ", "y", $value);
	$value = str_replace("Ỹ", "y", $value);
	$value = str_replace("Ỵ", "y", $value);
	#---------------------------------DD

	$value = str_replace("Đ", "d", $value);		
	$value = str_replace("đ", "d", $value);
	#---------------------------------o

	$value = str_replace("ó", "o", $value);
	$value = str_replace("ò", "o", $value);
	$value = str_replace("ỏ", "o", $value);
	$value = str_replace("õ", "o", $value);
	$value = str_replace("ọ", "o", $value);
	#---------------------------------O

	$value = str_replace("Ó", "o", $value);
	$value = str_replace("Ò", "o", $value);
	$value = str_replace("Ỏ", "o", $value);
	$value = str_replace("Õ", "o", $value);
	$value = str_replace("Ọ", "o", $value);
	#---------------------------------u

	$value = str_replace("ú", "u", $value);
	$value = str_replace("ù", "u", $value);
	$value = str_replace("ủ", "u", $value);
	$value = str_replace("ũ", "u", $value);
	$value = str_replace("ụ", "u", $value);
	#---------------------------------U

	$value = str_replace("Ú", "u", $value);
	$value = str_replace("Ù", "u", $value);
	$value = str_replace("Ủ", "u", $value);
	$value = str_replace("Ũ", "u", $value);
	$value = str_replace("Ụ", "u", $value);
	#---------------------------------

	return $value;
}

if ( ! function_exists('SEO')){	
	function SEO($name='') {
		$name = v2e($name);
		$name = preg_replace("/[^a-z,A-Z,0-9,_,-]/", "-", $name);
		$name = str_replace("---", "-", $name);
		$name = str_replace("--", "-", $name);		
		return strtolower($name);
	}
}

if ( ! function_exists('random_string')){
	function random_string($length = 4)
	{
		$sWord = '';
		$sChars = 'abcdefghjklmnprtwyzABCDEFGHJKLMNPRTWXYZ1234567890';		
		for ($i = 1; $i <= $length; $i++)
		{
			$nNumber = rand(1, strlen($sChars));
			$sWord .= substr($sChars, $nNumber - 1, 1);
	 	}
	 	return $sWord;
	}
}

if ( ! function_exists('pr')){
	function pr($data,$type=0)
	{
		print '<pre>';
		print_r($data);
		print '</pre>';
		if($type!=0){
			exit();
		}
	}
}

if ( ! function_exists('CutText')){
	function CutText($text, $n=80) 
	{ 
		// string is shorter than n, return as is
		if (strlen($text) <= $n) {
			return $text;}
		$text= substr($text, 0, $n);
		if ($text[$n-1] == ' ') {
			return trim($text)."...";
		}
		$x  = explode(" ", $text);
		$sz = sizeof($x);
		if ($sz <= 1)   {
			return $text."...";}
		$x[$sz-1] = '';
		return trim(implode(" ", $x))."...";
	}
}

function resizeImage($src,$w=0,$h=0){
	if($w!=0 && $h!=0){
		return PATH_URL.'imgresize.php?w='.$w.'&h='.$h.'&src='.$src;
	}elseif($w!=0){
		return PATH_URL.'imgresize.php?w='.$w.'&src='.$src;
	}elseif($h!=0){
		return PATH_URL.'imgresize.php?h='.$h.'&src='.$src;
	}
}

function check_dir_upload($targetDir){
	if(!is_dir($targetDir.date('Y'))){
		@mkdir($targetDir.date('Y'),0777);
	}
	if(!is_dir($targetDir.date('Y').'/'.date('m'))){
		@mkdir($targetDir.date('Y').'/'.date('m'),0777);
	}
	if(!is_dir($targetDir.date('Y').'/'.date('m').'/'.date('d'))){
		@mkdir($targetDir.date('Y').'/'.date('m').'/'.date('d'),0777);
	}
}

function getIP(){
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {   //check ip from share internet
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {   //to check ip is pass from proxy
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	if($ip=='::1'){
		$ip = '127.0.0.1';
	}
	return $ip;
}

function parserEditorHTML($str){
	$str = str_replace('../../../assets/uploads/editor/', PATH_URL.'assets/uploads/editor/', $str);
	$str = preg_replace('/http:\/\/www.youtube.com\/watch\?v=([A-Za-z0-9\-\_]+)&amp;feature=([A-Za-z0-9]+)/is', '<iframe width="500" height="289" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>', $str);
	$str = preg_replace('/http:\/\/www.youtube.com\/watch\?v=([A-Za-z0-9\-\_]+)/is', '<iframe width="500" height="289" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>', $str);
	return $str;
}

function url_login_openid($type='google'){
	if($type=='google'){
		$params = array(
			'response_type'            => 'token',
			'client_id'                => G_CLIENT_ID,
			'redirect_uri'             => REDIRECT_URL,
			'state'                    => 'profile',
			'scope'                    => 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds'
		);
		
		$url = 'https://accounts.google.com/o/oauth2/auth?';
		foreach($params as $key=>$param){
			$url .= $key.'='.urlencode($param).'&';
		}
	}
	if($type=='yahoo'){
		$params = array(
			'openid.claimed_id'        => 'http://specs.openid.net/auth/2.0/identifier_select',
			'openid.identity'          => 'http://specs.openid.net/auth/2.0/identifier_select',
			'openid.mode'              => 'checkid_setup',
			'openid.ns'                => 'http://specs.openid.net/auth/2.0',
			'openid.realm'             => PATH_URL,
			'openid.return_to'         => REDIRECT_URL.'/login/yahoo',
			'openid.ns.oauth'          => 'http://specs.openid.net/extensions/oauth/1.0',
			'openid.oauth.consumer'    => YH_CLIENT_KEY,
			'openid.ns.ax'             => 'http://openid.net/srv/ax/1.0',
			'openid.ax.mode'           => 'fetch_request',
			'openid.ax.required'       => 'email,fullname,nickname,gender,language,timezone,image',
			'openid.ax.type.email'     => 'http://axschema.org/contact/email',
			'openid.ax.type.fullname'  => 'http://axschema.org/namePerson',
			'openid.ax.type.nickname'  => 'http://axschema.org/namePerson/friendly',
			'openid.ax.type.gender'    => 'http://axschema.org/person/gender',
			'openid.ax.type.image'     => 'http://axschema.org/media/image/default',
		);
		
		$url = 'https://open.login.yahooapis.com/openid/op/auth?';
		foreach($params as $key=>$param){
			$url .= $key.'='.urlencode($param).'&';
		}
	}
	if($type=='fb'){
		$url = 'https://www.facebook.com/dialog/oauth/?client_id='.FB_CLIENT_ID.'&redirect_uri='.REDIRECT_URL.'&state='.FB_CLIENT_SECRET.'&display=popup&scope=email,publish_stream';
	}
	return $url;
}

function get_attr_profile_openid($type){
	if($type=='google'){
		include('application/libraries/eac_curl.class.php');
		$options = array();
		$options['CURLOPT_AUTOREFERER']    = 1;
		$options['CURLOPT_CRLF']           = 1;
		$options['CURLOPT_NOPROGRESS']     = 1;
		$http = new cURL($options);
		$http->setOptions($options);
		$src = $http->get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=".$_GET['access_token']);
		$contact = $http->get("https://www.google.com/m8/feeds/contacts/default/full?max-results=5000&oauth_token=".$_GET['access_token']);
		$xml =  new SimpleXMLElement($contact);
		$xml->registerXPathNamespace('gd', 'http://schemas.google.com/g/2005');
		$result = $xml->xpath('//gd:email');

		$profile = json_decode($src);
		$info['type'] = 'google';
		if(isset($profile->id)){
			$info['id'] = $profile->id;
		}else{
			$info['id'] = '';
		}
		if($profile->email){
			$info['email'] = $profile->email;
		}else{
			$info['email'] = '';
		}
		if($profile->verified_email){
			$info['verified_email'] = $profile->verified_email;
		}else{
			$info['verified_email'] = '';
		}
		if($profile->name){
			$info['full_name'] = $profile->name;
		}else{
			$info['full_name'] = '';
		}
		if($profile->given_name){
			$info['f_name'] = $profile->given_name;
		}else{
			$info['f_name'] = '';
		}
		if($profile->family_name){
			$info['l_name'] = $profile->family_name;
		}else{
			$info['l_name'] = '';
		}
		if(isset($profile->picture)){
			$info['avatar'] = $profile->picture;
		}else{
			$info['avatar'] = '';
		}
		if(isset($profile->locale)){
			$info['locale'] = $profile->locale;
		}else{
			$info['locale'] = '';
		}
		if(isset($profile->timezone)){
			$info['timezone'] = $profile->timezone;
		}else{
			$info['timezone'] = '';
		}
		if(isset($profile->gender)){
			$info['gender'] = $profile->gender;
		}else{
			$info['gender'] = '';
		}
		foreach ($result as $title){
			$info['contact'][] = $title->attributes()->address;
		}
	}elseif($type=='yahoo'){
		$info['type'] = 'yahoo';
		if(isset($_REQUEST['openid_ax_value_email'])){
			$info['email'] = $_REQUEST['openid_ax_value_email'];
		}else{
			$info['email'] = '';
		}
		
		if(isset($_REQUEST['openid_ax_value_fullname'])){
			$info['full_name'] = $_REQUEST['openid_ax_value_fullname'];
		}else{
			$info['full_name'] = '';
		}
		
		if(isset($_REQUEST['openid_ax_value_nickname'])){
			$info['nick_name'] = $_REQUEST['openid_ax_value_nickname'];
		}else{
			$info['nick_name'] = '';
		}
		
		if(isset($_REQUEST['openid_ax_value_gender'])){
			$info['gender'] = $_REQUEST['openid_ax_value_gender'];
		}else{
			$info['gender'] = '';
		}
		
		if(isset($_REQUEST['openid_ax_value_image'])){
			$info['avatar'] = $_REQUEST['openid_ax_value_image'];
		}else{
			$info['avatar'] = '';
		}
	}else{
		$facebook = new Facebook(array(
			'appId'  => FB_CLIENT_ID,
			'secret' => FB_CLIENT_SECRET,
		));
		$user_id = $facebook->getUser();
		if($user_id){
			$user_info = $facebook->api('/me');
			$list_firend = $facebook->api('/me/friends');
			$info['type'] = 'facebook';
			$info['uid'] = $user_info['id'];
			$info['email'] = $user_info['email'];
			$info['full_name'] = $user_info['name'];
			$info['list_firend'] = $list_firend;
		}
	}
	return $info;
}

/*BEGIN: GET RESOURCE URL */
function get_resource_url ($path = null)
{
	$url = PATH_URL . $path;
	$path_full = BASEFOLDER . $path;
	if (function_exists('filemtime')) {
		if (file_exists($path_full)) {
			$url .= '?r=' . filemtime($path_full);
		}
	}
	return $url;
}
/*END: GET RESOURCE URL */


/**
 * getNow()
 *
 * @return
 */
if ( ! function_exists('getNow'))
{
	function getNow()
	{
		return date(DATETIME_FORMAT_DB);
	}
}


/*BEGIN: DEBUG HELPER*/
function debug_log_reset(){
	$file_path = 'debug_log.txt';
	@unlink($file_path);
}

function debug_log($value){
	$file_path = 'debug_log.txt';
	$content = getNow();
	$content .= "\r\n";
	$content .= $value;
	$content .= "\r\n";
	$content .= "\r\n";
	
	@file_put_contents($file_path,$content, FILE_APPEND | LOCK_EX);
}

function debug_log_from_config($value){
	if (defined('DEBUG_LOG')) {
		if(DEBUG_LOG){
			if(DEBUG_LOG_LAST_COMMAND){
				debug_log_reset();
			}
			if(is_array($value)){
				$value = print_r($value, true);
			}
			debug_log($value);
		}
	}
}
/*END: DEBUG HELPER*/
?>