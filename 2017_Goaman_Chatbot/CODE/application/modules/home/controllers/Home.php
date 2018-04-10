<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends MX_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model('home/home_model','model');
	}
	
	/*-------------------------------------- FrontEnd --------------------------------------*/
	function index(){
		// Check permanent
		$permanent = (int)$this->input->get('permanent');
		if(!empty($permanent)){
			$_SESSION['permanent'] = 1;
		} else {
			$_SESSION['permanent'] = 0;
		}
		
		$this->session->unset_userdata('folder_name');
		$blocks = $this->model->getData('blocks');

		$data['blocks'] = $blocks;
		$this->template->write('title','Landing page builder');
		$this->template->write_view('content','index',$data);
		$this->template->render();
	}

	function stripe_demo(){
		$this->load->library('Stripe');
		$user = array();
		$fields = array('name', 'card_number', 'month', 'year', 'cvc_number');
		/*
		input json: {"name":"User Test", "card_number":4242424242424242, "month":8, "year": 2020, "cvc_number":123}
		 */
		$jsonData = @file_get_contents('php://input');
		$user = @json_decode($jsonData, TRUE);
		// pr($user, 1);

		\Stripe\Stripe::setApiKey('pk_test_JALIS32VJk8VN7gisu1jj8d3');
		#Ref: https://stripe.com/docs/api/php#create_card_token
		$result = \Stripe\Token::create(
	      	array(
	          "card" => array(
					"name"      => $user ['name'],
					"number"    => $user ['card_number'],
					"exp_month" => $user ['month'],
					"exp_year"  => $user ['year'],
					"cvc"       => $user ['cvc_number']
	           )
	      	)
		);
		// pr($result,1);
		$token = $result['id'];
		$amount = isset($user['amount']) ? $user['amount'] : 10;

		\Stripe\Stripe::setApiKey("sk_test_ZvU1q6mW2kjkgozmCYZ0boZw");
		#Ref: https://stripe.com/docs/api/php#create_charge
	  	$charge = \Stripe\Charge::create(array(
	        "amount" => $amount * 100,
	        "currency" => "usd",
	        "card" => $token,
	        "description" => "Charge for test@example.com" 
	  	));
	  	pr($charge, 1);
	}
	function get_category(){
		$parent = 'null';
		$limit = '';
		$order_by = 'porder DESC';
		$data['category'] = $this->model->getData('category', $parent, $limit, $order_by);
		$this->load->view('category',$data);
	}
	
	function get_blocks(){
		$id = $this->input->post('id',TRUE);
		$data['blocks'] = $this->model->getData('blocks',$id);
		$this->load->view('blocks',$data);
	}
	
	// TODO
	function get_blocks_new(){
		$id = (int)$this->input->post('id',TRUE);
		switch ($id) {
			case 0:
				$category_id = 31;
				$data['blocks'] = $this->model->getData('blocks',$category_id);
				break;
			case 1:
				$data['cate_id'] = $id;
				$data['blocks'] = $this->model->getTextTemplate();
				break;
			case 2:
				$data['blocks'] = $this->model->getAudioTemplate();
				break;
			case 3:
				$data['blocks'] = $this->model->getImageTemplate();
				break;	
			case 4:
				$data['blocks'] = $this->model->getAITemplate();
				break;
			case 5:
				$data['blocks'] = $this->model->getVideoTemplate();
				break;
			case 6:
				$data['blocks'] = $this->model->getFileTemplate();
				break;
			default:
				break;
			}

		$this->load->view('blocks',$data);
	}
	
	function get_category_icon(){
		$result = $this->model->getData('category_icon');
		$html = '';
		if($result){
			foreach($result as $v){
				$html .= '<option value="'.$v->id.'">'.$v->name.'</option>';
			}
		}
		return $html;
	}
	
	function get_icons(){
		$category_id = (int)$this->input->post('category_id');
		$keyword = trim($this->input->post('keyword'));
		$condition_arr = array();
		if(!empty($category_id)){
			$condition_arr[] = "category_id = {$category_id}";
		}
		if(!empty($keyword)){
			$keyword = strtolower($keyword);
			$condition_arr[] = "value LIKE '%{$keyword}%'";
		}
		$result = $this->model->getData('icons',$parent='null',$limit='',$order_by='',$condition_arr);
		
		// echo $this->db->last_query();exit();
		
		$html = '';
		if($result){
			foreach($result as $v){
				$html .= trim('<div class="col-xs-2"><i class="fa '.trim($v->value).'" aria-hidden="true"></i></div>');
			}
		}
		echo $html;
		exit;
	}
	
	function get_font_icons($type=''){
		$data['result'] = $this->model->getData('icons');
		$this->load->view('icons',$data);
	}
	
	function save_bg(){
		$name_img = time().'.png';
		$data = base64_decode($this->input->post('data64',TRUE));
		file_put_contents(BASEFOLDER.'assets/uploads/tmp_bg/'.$name_img, $data);
		echo PATH_URL.'assets/uploads/tmp_bg/'.$name_img;
		exit;
	}
	
	function _rrmdir($dir){
		if(is_dir($dir)){
			$objects = scandir($dir);
			foreach($objects as $object){
				if($object != "." && $object != ".."){
					if(filetype($dir."/".$object) == "dir"){
						rrmdir($dir."/".$object); 
					}else{
						@unlink($dir."/".$object);
					}
				}else{
					@unlink($dir."/".$object);
				}
			}
			reset($objects);
			rmdir($dir);
		}
	}
	
	function import(){
		@ini_set('memory_limit', '-1');
		set_time_limit(-1);
		if($_FILES && $_FILES['importFile']['error']==0){
			$zip = new ZipArchive;
			$zip_name = str_replace(".zip","",$_FILES['importFile']['name']);
			$fileName = $_FILES['importFile']['tmp_name'];
			$res = $zip->open($fileName);
			$rt_obj = array();
			if($res){
				$zip->extractTo(BASEFOLDER.'assets/uploads/unzip/');
				$zip->close();
				$dir = BASEFOLDER.'assets/uploads/unzip/'.$zip_name.'/';
				if(is_dir($dir)){
					$objects = scandir($dir);
					foreach($objects as $object){
						if($object != "." && $object != ".."){
							if(filetype($dir."/".$object) != "dir"){
								$rt_obj['page'][] = str_replace('.html','',$object);
								$src_content = file_get_contents(PATH_URL.'assets/uploads/unzip/'.$zip_name.'/'.$object);
								preg_match("/<main id=\"container\">(.*?)<\/main>/is",$src_content,$body);
								preg_match_all("/<link date-type=\"require\" rel=\"stylesheet\" href=\"(.*?)\" media=\"all\" \/>/is",$src_content,$css);
								preg_match_all("/<script date-type=\"require\" src=\"(.*?)\"><\/script>/is",$src_content,$js);
								if(isset($body[1]) && trim($body[1])!=''){
									$page = trim($body[1]);
									$page = str_replace('"images/','"'.PATH_URL.'assets/uploads/unzip/'.$zip_name.'/images/',$page);
									$page = str_replace('\'images/','\''.PATH_URL.'assets/uploads/unzip/'.$zip_name.'/images/',$page);
									$rt_obj['body'][str_replace('.html','',$object)] = $page;
								}else{
									$rt_obj['body'][str_replace('.html','',$object)] = '';
								}
								if(isset($css[1][0])){
									foreach($css[1] as $k=>$v){
										$css_full = $css[0][$k];
										$css_full = str_replace('"css/','"'.PATH_URL.'assets/uploads/unzip/'.$zip_name.'/css/',$css_full);
										$css_full = str_replace('\'css/','\''.PATH_URL.'assets/uploads/unzip/'.$zip_name.'/css/',$css_full);
										if($k==0){
											$rt_obj['css'][str_replace('.html','',$object)] = $css_full;
										}else{
											$rt_obj['css'][str_replace('.html','',$object)] .= "\r\n".$css_full;
										}
									}
								}else{
									$rt_obj['css'][str_replace('.html','',$object)] = '';
								}
								if(isset($js[1][0])){
									foreach($js[1] as $k=>$v){
										$js_full = $js[0][$k];
										$js_full = str_replace('"js/','"'.PATH_URL.'assets/uploads/unzip/'.$zip_name.'/js/',$js_full);
										$js_full = str_replace('\'js/','\''.PATH_URL.'assets/uploads/unzip/'.$zip_name.'/js/',$js_full);
										if($k==0){
											$rt_obj['js'][str_replace('.html','',$object)] = $js_full;
										}else{
											$rt_obj['js'][str_replace('.html','',$object)] .= "\r\n".$js_full;
										}
									}
								}else{
									$rt_obj['js'][str_replace('.html','',$object)] = '';
								}
							}
						}
					}
				}
			}
			echo json_encode($rt_obj);
			exit;
		}else{
			echo 'error-upload';
			exit;
		}
	}
	
	function export(){
		$result['message'] = '';
	
		if(!empty($_SESSION['purchase_code_verified'])){
			$result = $this->export_zip_file();
		} else {
			$result['message'] = 'purchase_code_invalid';
		}
		
		echo json_encode($result);
		exit();
	}
	function export_buyer_save(){
		$result['message'] = '';
		
		$purchase_code = $this->input->post('purchase_code');
		if(!empty($purchase_code)){
			$username = ENVATO_USERNAME;
			
			// Set API Key	
			$api_key = ENVATO_API_KEY;
			
			// Open cURL channel
			$ch = curl_init();
			 
			// Set cURL options
			curl_setopt($ch, CURLOPT_URL, "http://marketplace.envato.com/api/edge/". $username ."/". $api_key ."/verify-purchase:". $purchase_code .".json");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

			//Set the user agent
			$agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)';
			curl_setopt($ch, CURLOPT_USERAGENT, $agent);
			   
			// Decode returned JSON
			$purchase_data = json_decode(curl_exec($ch), true);
			 
			// Close Channel
			curl_close($ch);
			
			$buyer['code'] = $purchase_code;
			if( isset($purchase_data['verify-purchase']['buyer']) ) {
				$purchase_info = $purchase_data['verify-purchase'];
				$item_id = $purchase_info['item_id'];
				if($item_id == ENVATO_ITEM_ID){
					$buyer['name'] = $purchase_info['buyer'];
					$buyer['licence'] = $purchase_info['licence'];
					$buyer['supported_until'] = $purchase_info['supported_until'];
					$buyer['created_at'] = $purchase_info['created_at'];					
				} else {
					// TODO - Message - Wrong item was bought
					$result['message'] = 'wrong_item';
				}
			}
			
			$buyer['created'] = getNow();
			if($this->db->insert(PREFIX.'buyer',$buyer)){
				if(!empty($buyer['name'])){
					$buyer_id = $this->db->insert_id();
					$_SESSION['purchase_code_verified'] = true;
					$_SESSION['buyer_id'] = $buyer_id;
					$result['message'] = 'success';
				}
			}
		}
		
		echo json_encode($result);
		exit();
	}
	function export_zip_file(){
		@ini_set('memory_limit', '-1');
		set_time_limit(-1);
		
		$result['message'] = '';
		
		//MKDIR Folder
		if(!empty($_SESSION['folder_name'])){
			$name = $_SESSION['folder_name'];
		}else{
			$name = time();
		}
		$targetDir = BASEFOLDER.'assets/uploads/export/';
		check_dir_upload($targetDir);
		$targetDir = $targetDir.date('Y').'/'.date('m').'/'.date('d').'/';
		if(!is_dir($targetDir.$name)){
			@mkdir($targetDir.$name,0777);
		}
		if(!is_dir($targetDir.$name.'/css')){
			@mkdir($targetDir.$name.'/css',0777);
		}
		if(!is_dir($targetDir.$name.'/css/fonts')){
			@mkdir($targetDir.$name.'/css/fonts',0777);
		}
		if(!is_dir($targetDir.$name.'/fonts')){
			@mkdir($targetDir.$name.'/fonts',0777);
		}
		if(!is_dir($targetDir.$name.'/js')){
			@mkdir($targetDir.$name.'/js',0777);
		}
		if(!is_dir($targetDir.$name.'/images')){
			@mkdir($targetDir.$name.'/images',0777);
		}
		if(!is_dir($targetDir.$name.'/libs')){
			@mkdir($targetDir.$name.'/libs',0777);
		}
		if(!is_dir($targetDir.$name.'/css/blocks')){
			@mkdir($targetDir.$name.'/css/blocks',0777);
		}
		if(!is_dir($targetDir.$name.'/libs/jquery')){
			@mkdir($targetDir.$name.'/libs/jquery',0777);
		}
		if(!is_dir($targetDir.$name.'/libs/bootstrap')){
			@mkdir($targetDir.$name.'/libs/bootstrap',0777);
		}
		if(!is_dir($targetDir.$name.'/libs/carousel')){
			@mkdir($targetDir.$name.'/libs/carousel',0777);
		}
		if(!is_dir($targetDir.$name.'/libs/fanxybox')){
			@mkdir($targetDir.$name.'/libs/fanxybox',0777);
		}
		if(!is_dir($targetDir.$name.'/libs/fanxybox/source')){
			@mkdir($targetDir.$name.'/libs/fanxybox/source',0777);
		}
		if(!is_dir($targetDir.$name.'/libs/animatecss')){
			@mkdir($targetDir.$name.'/libs/animatecss',0777);
		}
		if(!is_dir($targetDir.$name.'/libs/fanxybox/source/helpers')){
			@mkdir($targetDir.$name.'/libs/fanxybox/source/helpers',0777);
		}
		if(!is_dir($targetDir.$name.'/libs/trianglify')){
			@mkdir($targetDir.$name.'/libs/trianglify',0777);
		}

		$page_num = (int)($this->input->post('page_num'));
		$total_page = (int)($this->input->post('total_page'));
		$page_name = trim($this->input->post('page_name'),TRUE);
		$data = trim($this->input->post('data'));
		$data_script = trim($this->input->post('data_script'));
		$data_css = trim($this->input->post('data_css'));
		$title = trim($this->input->post('title'),TRUE);
		$description = trim($this->input->post('description'),TRUE);
		$keywords = trim($this->input->post('keywords'),TRUE);
		if($data!=''){
			$data = str_replace("\t","",$data);
			$data = str_replace("\r\n","",$data);
			$data = str_replace("\n","",$data);
			
			//Xử lý Copy Image về thư mục Image
			preg_match_all('/< *img[^>]*src *= *["\']?([^"\']*)/i',$data,$matches);
			if(isset($matches[1][0])){
				foreach($matches[1] as $v){
					$v = trim($v);
					if(strpos($v,'http')===false){
						@copy(PATH_URL.$v,$targetDir.$name.'/images/'.substr($v,strrpos($v,'/')+1));
					}else{
						@copy($v,$targetDir.$name.'/images/'.substr($v,strrpos($v,'/')+1));
					}
					$data = str_replace($v,'images/'.substr($v,strrpos($v,'/')+1),$data);
				}
			}
			
			//Copy Css và JS bắt buộc có
			// <!-- jquery CSS -->
		    @copy(PATH_URL.'assets/libs/jquery/jquery-ui.min.css',$targetDir.$name.'/libs/jquery/jquery-ui.min.css');
		    // <!-- bootstrap CSS -->
		    @copy(PATH_URL.'assets/libs/bootstrap/bootstrap.min.css',$targetDir.$name.'/libs/bootstrap/bootstrap.min.css');
		    // <!-- font CSS -->
		    @copy(PATH_URL.'assets/css/font-awesome.min.css',$targetDir.$name.'/css/font-awesome.min.css');
		    @copy(PATH_URL.'assets/css/fonts/fonts.css',$targetDir.$name.'/css/fonts/fonts.css');
		    // <!--carousel-->
		    @copy(PATH_URL.'assets/libs/carousel/owl.carousel.css',$targetDir.$name.'/libs/carousel/owl.carousel.css');
		    @copy(PATH_URL.'assets/libs/carousel/owl.theme.css',$targetDir.$name.'/libs/carousel/owl.theme.css');
		    // <!-- fancybox -->
		    @copy(PATH_URL.'assets/libs/fanxybox/source/jquery.fancybox.css',$targetDir.$name.'/libs/fanxybox/source/jquery.fancybox.css');
		    @copy(PATH_URL.'assets/libs/fanxybox/source/helpers/jquery.fancybox-buttons.css',$targetDir.$name.'/libs/fanxybox/source/helpers/jquery.fancybox-buttons.css');
		    @copy(PATH_URL.'assets/libs/fanxybox/source/helpers/jquery.fancybox-thumbs.css',$targetDir.$name.'/libs/fanxybox/source/helpers/jquery.fancybox-thumbs.css');
		    // <!-- animate css -->
		    @copy(PATH_URL.'assets/libs/animatecss/animate.css',$targetDir.$name.'/libs/animatecss/animate.css');
		    // <!-- style css -->
		    @copy(PATH_URL.'assets/css/style.css',$targetDir.$name.'/css/style.css');
		      // <!-- style blocks css -->
		    @copy(PATH_URL.'assets/css/blocks/style.css',$targetDir.$name.'/css/blocks/style.css');

		    // <!-- jquery js -->
			@copy(PATH_URL.'assets/libs/jquery/jquery-1.12.4.min.js',$targetDir.$name.'/libs/jquery/jquery-1.12.4.min.js');
			@copy(PATH_URL.'assets/libs/jquery/jquery-ui.min.js',$targetDir.$name.'/libs/jquery/jquery-ui.min.js');
			@copy(PATH_URL.'assets/js/blocks/wow.min.js',$targetDir.$name.'/libs/wow.min.js'); // TODO
			@copy(PATH_URL.'assets/js/modernizr.custom.js',$targetDir.$name.'/libs/modernizr.custom.js'); // TODO
			
			// <!-- bootstrap js -->
			@copy(PATH_URL.'assets/libs/bootstrap/bootstrap.min.js',$targetDir.$name.'/libs/bootstrap/bootstrap.min.js');
			
			@copy(PATH_URL.'assets/js/block.js',$targetDir.$name.'/libs/block.js'); // TODO
			
			// <!-- fancybox -->
			@copy(PATH_URL.'assets/libs/fanxybox/source/jquery.fancybox.js',$targetDir.$name.'/libs/fanxybox/source/jquery.fancybox.js');
			@copy(PATH_URL.'assets/libs/fanxybox/source/helpers/jquery.fancybox-buttons.js',$targetDir.$name.'/libs/fanxybox/source/helpers/jquery.fancybox-buttons.js');
			@copy(PATH_URL.'assets/libs/fanxybox/source/helpers/jquery.fancybox-thumbs.js',$targetDir.$name.'/libs/fanxybox/source/helpers/jquery.fancybox-thumbs.js');
			@copy(PATH_URL.'assets/libs/fanxybox/source/helpers/jquery.fancybox-media.js',$targetDir.$name.'/libs/fanxybox/source/helpers/jquery.fancybox-media.js');
			// <!-- carousel js -->
			@copy(PATH_URL.'assets/libs/carousel/owl.carousel.min.js',$targetDir.$name.'/libs/carousel/owl.carousel.min.js');
			// <!-- trianglify js -->
			@copy(PATH_URL.'assets/libs/trianglify/trianglify.min.js',$targetDir.$name.'/libs/trianglify/trianglify.min.js');
			// <!-- main js -->
			@copy(PATH_URL.'assets/js/style.js',$targetDir.$name.'/js/style.js');


			//Copy Fonts
			@copy(PATH_URL.'assets/css/fonts/Raleway-Regular.woff',$targetDir.$name.'/css/fonts/Raleway-Regular.woff');
			@copy(PATH_URL.'assets/css/fonts/Raleway-Bold.woff',$targetDir.$name.'/css/fonts/Raleway-Bold.woff');
			@copy(PATH_URL.'assets/css/fonts/Raleway-Regular.ttf',$targetDir.$name.'/css/fonts/Raleway-Regular.ttf');
			@copy(PATH_URL.'assets/css/fonts/Raleway-Bold.ttf',$targetDir.$name.'/css/fonts/Raleway-Bold.ttf');
			@copy(PATH_URL.'assets/css/fonts/SourceSansPro-Light.woff',$targetDir.$name.'/css/fonts/SourceSansPro-Light.woff');
			@copy(PATH_URL.'assets/css/fonts/SourceSansPro-Regular.woff',$targetDir.$name.'/css/fonts/SourceSansPro-Regular.woff');
			@copy(PATH_URL.'assets/css/fonts/SourceSansPro-Bold.woff',$targetDir.$name.'/css/fonts/SourceSansPro-Bold.woff');
			@copy(PATH_URL.'assets/css/fonts/SourceSansPro-Light.ttf',$targetDir.$name.'/css/fonts/SourceSansPro-Light.ttf');
			@copy(PATH_URL.'assets/css/fonts/SourceSansPro-Regular.ttf',$targetDir.$name.'/css/fonts/SourceSansPro-Regular.ttf');
			@copy(PATH_URL.'assets/css/fonts/SourceSansPro-Bold.ttf',$targetDir.$name.'/css/fonts/SourceSansPro-Bold.ttf');
			@copy(PATH_URL.'assets/css/fonts/SourceSansPro-It.woff',$targetDir.$name.'/css/fonts/SourceSansPro-It.woff');
			@copy(PATH_URL.'assets/css/fonts/SourceSansPro-It.ttf',$targetDir.$name.'/css/fonts/SourceSansPro-It.ttf');

			@copy(PATH_URL.'assets/fonts/fontawesome-webfont.eot',$targetDir.$name.'/fonts/fontawesome-webfont.eot');
			@copy(PATH_URL.'assets/fonts/fontawesome-webfont.svg',$targetDir.$name.'/fonts/fontawesome-webfont.svg');
			@copy(PATH_URL.'assets/fonts/fontawesome-webfont.ttf',$targetDir.$name.'/fonts/fontawesome-webfont.ttf');
			@copy(PATH_URL.'assets/fonts/fontawesome-webfont.woff',$targetDir.$name.'/fonts/fontawesome-webfont.woff');
			@copy(PATH_URL.'assets/fonts/fontawesome-webfont.woff2',$targetDir.$name.'/fonts/fontawesome-webfont.woff2');
			
			$html = "<!DOCTYPE html>\r\n";
			$html .= "<html>\r\n";
			$html .= "<html lang=\"en\">\r\n";
			$html .= "<head>\r\n";
			$html .= "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n";
			$html .= "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n";
			$html .= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n";
			$html .= "<meta name=\"description\" content=\"".$description."\" />\r\n";
			$html .= "<meta name=\"keywords\" content=\"".$keywords."\" />\r\n";
			$html .= "<meta name=\"author\" content=\"PIX COMPANY\">\r\n\r\n";

			$html .= "<link href=\"libs/jquery/jquery-ui.min.css\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"libs/bootstrap/bootstrap.min.css\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"css/font-awesome.min.css\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"css/fonts/fonts.css\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"libs/carousel/owl.carousel.css\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"libs/carousel/owl.theme.css\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"libs/fanxybox/source/jquery.fancybox.css?v=2.1.5\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"libs/fanxybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"libs/fanxybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"libs/animatecss/animate.css\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"css/style.css\" rel=\"stylesheet\">\r\n";
			$html .= "<link href=\"css/blocks/style.css\" rel=\"stylesheet\">\r\n";
			
			$log_arr = array(
				'location' => __FILE__ ,
				'function' => 'export',
				'data_css' => !empty($data_css) ? $data_css : '',
				'data_script' => !empty($data_script) ? $data_script : '',
			);
			debug_log_from_config($log_arr);
			
			if($data_css!=''){
				$arr_css = explode(';',$data_css);
				foreach($arr_css as $v){
					// Remove suffix random_number
					$v_arr = explode('?r=', $v);
					if(count($v_arr) == 2){
						$v = $v_arr[0];
					}
					
					$v = trim($v);
					@copy($v,$targetDir.$name.'/css/'.substr($v,strrpos($v,'/')+1));
					$html .= "<link date-type=\"require\" rel=\"stylesheet\" href=\"css/".substr($v,strrpos($v,'/')+1)."\" media=\"all\" />\r\n";
					
					// Copy image background from readning css files' content
					$str=@file_get_contents(PATH_URL.'assets/uploads/export/'.date('Y').'/'.date('m').'/'.date('d').'/'.$name.'/css/'.substr($v,strrpos($v,'/')+1));
					preg_match_all('/..\/..\/images\/(.*?)\)/is',$str,$matches_img);
					if(isset($matches_img[1][0])){
						foreach($matches_img[1] as $val_img){
							@copy(PATH_URL.'assets/images/'.$val_img,$targetDir.$name.'/images/'.substr($val_img,strrpos($val_img,'/')+1));
							$str = str_replace('../../images/'.$val_img,'../images/'.substr($val_img,strrpos($val_img,'/')+1),$str);
						}
						file_put_contents($targetDir.$name.'/css/'.substr($v,strrpos($v,'/')+1), $str);
					}
				}
			}
			$html .= "<title>".$title."</title>\r\n";
			$html .= "</head>\r\n";
			$html .= "<body>\r\n";
			$html .= "<main id=\"container\">\r\n";
			$html .= $data;
			$html .= "\r\n</main>\r\n\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/jquery/jquery-1.12.4.min.js\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/jquery/jquery-ui.min.js\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/wow.min.js\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/modernizr.custom.js\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/bootstrap/bootstrap.min.js\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/block.js\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/fanxybox/source/jquery.fancybox.js?v=2.1.5\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/fanxybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/fanxybox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/fanxybox/source/helpers/jquery.fancybox-media.js?v=1.0.6\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/carousel/owl.carousel.min.js\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"libs/trianglify/trianglify.min.js\"></script>\r\n";
			$html .= "<script type=\"text/javascript\" src=\"js/style.js\"></script>\r\n";

			if($data_script!=''){
				$arr_script = explode(';',$data_script);
				foreach($arr_script as $v){
					// Remove suffix random_number
					$v_arr = explode('?r=', $v);
					if(count($v_arr) == 2){
						$v = $v_arr[0];
					}
					
					@copy($v,$targetDir.$name.'/js/'.substr($v,strrpos($v,'/')+1));
					$html .= "<script date-type=\"require\" type=\"text/javascript\" src=\"js/".substr($v,strrpos($v,'/')+1)."\"></script>\r\n";
				}
			}
			$html .= "</body>\r\n";
			$html .= "</html>";
			
			//Save HTML
			$target = $targetDir.$name.'/'.$page_name.'.html';
			$fp = fopen($target, "a+") or die("Unable to open file!");
			fwrite($fp, $html);              
			fclose($fp);
		}
		
		if($total_page == $page_num){
			//Add ZIP
			$this->load->library('zip');
			$this->zip->read_dir($targetDir.$name.'/',FALSE);
			$this->zip->archive($targetDir.$name.'.zip');
			$result['download_url'] = PATH_URL.'assets/uploads/export/'.date('Y').'/'.date('m').'/'.date('d').'/'.$name.'.zip';
			if(!empty($_SESSION['buyer_id'])){
				$buyer_id = (int)($_SESSION['buyer_id']);
				$export_finished_time = getNow();
				$table_name = PREFIX.'buyer';
				$sql = "UPDATE {$table_name} SET export_finished_time = '{$export_finished_time}', export_total_page = {$total_page} WHERE id = {$buyer_id}";
				$this->db->query($sql);
				unset($_SESSION['buyer_id']);
			}
			unset($_SESSION['purchase_code_verified']);
			unset($_SESSION['folder_name']);
		} else {
			$_SESSION['folder_name'] = $name;
			$result['continue'] = true;
		}
		$result['message'] = 'success';
		
		return $result;
	}
	
	function permanent_cookie_file_path(){
		$file_name = 'root.txt'; // 
		$file_path = BASEFOLDER.'assets/uploads/cookie/'.$file_name;
		return $file_path;
	}
	function permanent_json_file_path(){
		$file_name = 'json.txt'; // 
		$file_path = BASEFOLDER.'assets/uploads/cookie/'.$file_name;
		return $file_path;
	}
	function save_permanent_cookie(){
		$return_data = [];
		
		$is_permanent = builder_check_permanent();
		if($is_permanent){
			$cookie_data = $this->input->post('cookie_data');
			$insert['cookie_data'] = $cookie_data;
			$insert['created'] = date('Y-m-d H:i:s');
			
			$query = $this->model->insert('chatbot_flow', $insert);
			
			$json_text = $this->input->post('json_text');
			
			//$file_path = $this->permanent_cookie_file_path();
			//@file_put_contents($file_path, $cookie_data);
			// $return_data['cookie_file_path'] = $file_path; // TODO - Security
			
			// TODO - Save to file to improve performance
			// $file_path = $this->permanent_json_file_path();
			
			// @file_put_contents($file_path, $json_text);
			
			// Clear db 
			$sql = 'TRUNCATE chatbot_question';
			$this->db->query($sql);
			
			$json_data = json_decode($json_text);
			foreach($json_data as $key => $obj){
				$question_data['type'] = $obj->type;
				
				$question_data['question'] = $obj->content;
				
				if(!empty($obj->json)){
					$question_data['json'] = json_encode($obj->json);
				}
				$this->model->insert('chatbot_question', $question_data);
			}
			// $return_data['json_file_path'] = $file_path; // TODO - Security
			
			$return_data['status'] = 'success';
		}
		
		echo json_encode($return_data);
		exit();
	}
	function get_permanent_cookie(){
		$return_data = [];
		
		$is_permanent = builder_check_permanent();
		if($is_permanent){
			
			// $file_path = $this->permanent_cookie_file_path();
			// $cookie_data = @file_get_contents($file_path);
			
			$array_cookie_data = $this->model->get_cookie_data();
			$cookie_data = $array_cookie_data[0]->cookie_data;
			
			$return_data['cookie_data'] = $cookie_data;
			$return_data['status'] = 'success';
		}
		
		echo json_encode($return_data);
		exit();
	}
	function chat(){
		$jsonData = @file_get_contents('php://input');
		@json_decode($jsonData, TRUE);
		$arrayData = (json_last_error() === JSON_ERROR_NONE) ? json_decode($jsonData, TRUE) : array();
		
		// echo '{"text":"TEST To give you a quote and find out if we can offer you this product, you will need to provide the relevant medical, lifestyle, occupation and income information we request. Are you happy and able to do this?","quick_replies":[{"content_type":"text","title":"Yes","payload":"YES"},{"content_type":"text","title":"No","payload":"NO"}]}';
		
		// TODO - Save to file to improve performance
		// $file_path = $this->permanent_json_file_path();
		// $json_text = @file_get_contents($file_path);
		// $json_data = json_decode($json_text);
		// pr($json_data,1);
		if(isset($arrayData ['sessionData']['payment']) && $arrayData ['sessionData']['payment'] == 1) {
			modules::run('chat/Payment/index',$arrayData);
		}
		$messageText = $arrayData ['messageData']['messageText'];
		
		$question_id_previous = !empty($arrayData['question_id_previous']) ? (int)($arrayData['question_id_previous']) : 0;
		$question_id_selected = !empty($arrayData['question_id_selected']) ? (int)($arrayData['question_id_selected']) : 0;
		if(!empty($question_id_selected)){
			$next_question = $this->model->get('*','chatbot_question', "id = {$question_id_selected}");
		} else {
			$question_list = $this->model->fetch('*','chatbot_question','','id','asc');
			$next_question = '';
			foreach($question_list as $question){
				$question_id = $question->id;
				if($question_id > $question_id_previous){
					$next_question = $question;
					break;
				}
			}
		}
		
		// pr($return_obj,1);
		$json_text = '';
		if(!empty($next_question)){
			$json_text = $this->chat_json_get($next_question);
			
		} else {
			$data['command'] = 'restart';
			$data['question'] = [
				'text' => 'Chatbot will be restarted AGAIN'
			];
			$data['question_id'] = 0;
			$json_text = json_encode($data, true);
		}
		echo $json_text;
		
		exit;
	}
	function chat_json_get($question){
		$result = '';
		
		if(!empty($question)){
			$question_id = $question->id;
			if(!empty($question->json)){
				$card_obj = json_decode($question->json);
				if(empty($card_obj->quick_replies)){
					unset($card_obj->quick_replies);
				}
				$return_obj = $card_obj;
			}
			
			$data = [];
			if(!empty($return_obj)){
				$data['command'] = 'next';
				$data['question'] = $return_obj;
				$data['question_id'] = $question_id;
			}
			$result = json_encode($data, true);
		}
		
		return $result;
	}
	function chat_get_question(){
		$jsonData = @file_get_contents('php://input');
		@json_decode($jsonData, TRUE);
		$arrayData = (json_last_error() === JSON_ERROR_NONE) ? json_decode($jsonData, TRUE) : array();
		$question_id = !empty($arrayData['question_id']) ? (int)($arrayData['question_id']) : 0;
		
		// DEBUG
		$log_arr = array(
			'location' => __FILE__ ,
			'function' => 'chat_get_question',
			'question_id' => !empty($question_id) ? $question_id : '',
		);
		debug_log_from_config($log_arr);
		
		if(!empty($question_id)){
			$question = $this->model->get('*','chatbot_question', "id = {$question_id}");
			$json_text = $this->chat_json_get($question);
			echo $json_text;
		}
		
		// DEBUG
		$log_arr = array(
			'location' => __FILE__ ,
			'function' => 'chat_get_question',
			'question' => !empty($question) ? $question : '',
			'json_text' => !empty($json_text) ? $json_text : '',
		);
		debug_log_from_config($log_arr);
		
		exit;
	}
	
	function upload_file(){
		$upload_dir = BASEFOLDER.DIR_UPLOAD_CARDS;
		
		// DEBUG
		$log_arr = array(
			'location' => __FILE__ ,
			'function' => 'upload_file',
			'upload_config' => !empty($upload_config) ? $upload_config : '',
		);
		debug_log_from_config($log_arr);
		
		$data64_image = $this->input->post('data64_image');
		if(!empty($data64_image)){
			$image_content = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data64_image));
			$name_img = time().'.png';
			// file_put_contents(BASEFOLDER.$uploaname_imgd_dir.$, $image_content);
			
			$source = fopen($data64_image, 'r');
			$destination = fopen($upload_dir.$name_img, 'w');
			stream_copy_to_stream($source, $destination);
			fclose($source);
			fclose($destination);
			
			echo PATH_URL.DIR_UPLOAD_CARDS.$name_img;
		}
		
		// DEBUG
		$log_arr = array(
			'location' => __FILE__ ,
			'function' => 'upload_file',
			'upload_config' => !empty($upload_config) ? $upload_config : '',
			'name_img' => !empty($name_img) ? $name_img : '',
			// 'data64_image' => !empty($name_img) ? $data64_image : '',
			// 'exception_error' => !empty($exception_error) ? $exception_error : '',
		);
		debug_log_from_config($log_arr);
		
		exit;
	}
}