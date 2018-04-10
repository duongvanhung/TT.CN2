<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admincp_test extends MX_Controller {

	private $module = 'admincp_test';
	private $table = 'page_item';
	private $table_lang = 'page_item_lang';
	function __construct(){
		$this->admin_module = 'admincp_test';
		parent::__construct();
		// $this->load->model($this->module.'_model','model');
		// $this->load->model('admincp_modules/admincp_modules_model');
		// if($this->uri->segment(1)==ADMINCP){
			// if($this->uri->segment(2)!='login'){
				// if(!$this->session->userdata('userInfo')){
					// header('Location: '.PATH_URL_ADMIN.'login');
					// exit;
				// }
				// $get_module = $this->admincp_modules_model->check_modules($this->uri->segment(2));
				// $this->session->set_userdata('ID_Module',$get_module[0]->id);
				// $this->session->set_userdata('Name_Module',$get_module[0]->name);
				// $this->load->helper('admin_helper');
			// }
			// $this->template->set_template('admin');
			// $this->template->write('title','Admin Control Panel');
		// }
	}
	/*------------------------------------ Admin Control Panel ------------------------------------*/
	public function admincp_index(){
		permission_force_check('r');
		
		$default_func = 'created';
		$default_sort = 'DESC';
		$data = array(
			'module'=>$this->module,
			'module_name'=>$this->session->userdata('Name_Module'),
			'default_func'=>$default_func,
			'default_sort'=>$default_sort
		);
		$this->template->write_view('content','BACKEND/index',$data);
		$this->template->render();
	}
	
	private function input_config($data=null, $obj=null){
		$config_list = array(
			'input_config_country' => array(
				'input_type' => 'textbox',
				'input_label' => 'Country',
				'input_id' => 'countryAdmincp',
				'input_required' => true,
				'field_name' => 'country',
			),
			'input_config_title' => array(
				'multilingual' => true,
				'input_type' => 'textbox',
				'input_label' => 'Title',
				'input_id' => 'title',
				'input_required' => true,
				'field_name' => 'title',
				'field_name_access' => 'data_lang',
			)
		);
		
		// input_config process
		if(!empty($obj)){
			foreach($config_list as &$config_item){
				$config_item['obj'] = $obj;
				unset($config_item);
			}
		}
		
		if(!empty($data)){
			$config_list = array_merge($data,$config_list);
		}
		
		return $config_list;
	}
	
	public function admincp_update($id=0){
		if($id==0){
			modules::run('admincp/chk_perm',$this->session->userdata('ID_Module'),'w',0);
		}else{
			modules::run('admincp/chk_perm',$this->session->userdata('ID_Module'),'r',0);
		}
		$result = array();
		if($id!=0){
			$result = $this->model->getDetailManagement($id);
		}
		//get list category
		$list_category = $this->model->getCategories();

		$data = array(
			'list_category'=> $list_category,
			'result'=>$result,
			'module'=>$this->module,
			'id'=>$id
		);
		$data = $this->input_config($data, $result);
		// pr($data,1);
		
		$this->template->write_view('content','BACKEND/ajax_editContent',$data);
		$this->template->render();
	}

	public function admincp_save(){
		// pr($this->input->post(), 1);
		$perm = modules::run('admincp/chk_perm',$this->session->userdata('ID_Module'),'w',1);
		if($perm=='permission-denied'){
			print $perm.'.'.$this->security->get_csrf_hash();
			exit;
		}
		if($_POST){
			//Upload Image
			$fileName = array('image'=>'');
			if($_FILES){
				foreach($fileName as $k=>$v){
					if(isset($_FILES['fileAdmincp']['error'][$k]) && $_FILES['fileAdmincp']['error'][$k]!=4){
						$typeFileImage = strtolower(mb_substr($_FILES['fileAdmincp']['type'][$k],0,5));
						if($typeFileImage == 'image'){
							$tmp_name[$k] = $_FILES['fileAdmincp']["tmp_name"][$k];
							$file_name[$k] = $_FILES['fileAdmincp']['name'][$k];
							$ext = strtolower(mb_substr($file_name[$k], -4, 4));
							if($ext=='jpeg'){
								$fileName[$k] = date('Y').'/'.date('m').'/'.md5(time().'_'.SEO(mb_substr($file_name[$k],0,-5))).'.jpg';
							}else{
								$fileName[$k] = date('Y').'/'.date('m').'/'.md5(time().'_'.SEO(mb_substr($file_name[$k],0,-4))).$ext;
							}
						}else{
							print 'error-image.'.$this->security->get_csrf_hash();
							exit;
						}
					}
				}
			}
			//End Upload Image

			if($this->model->saveManagement($fileName)){
				//Upload Image
				if($_FILES){
					if($_FILES){
						$upload_path = BASEFOLDER.DIR_UPLOAD_NEWS;
						check_dir_upload($upload_path);
						foreach($fileName as $k=>$v){
							if(isset($_FILES['fileAdmincp']['error'][$k]) && $_FILES['fileAdmincp']['error'][$k]!=4){
								move_uploaded_file($tmp_name[$k], $upload_path.$fileName[$k]);
							}
						}
					}
				}
				//End Upload Image
				print 'success.'.$this->security->get_csrf_hash();
				exit;
			}
		}
	}
	
	public function admincp_ajaxLoadContent(){
		$this->load->library('AdminPagination');
		$config['total_rows'] = $this->model->getTotalsearchContent();
		$config['per_page'] = $this->input->post('per_page');
		$config['num_links'] = 3;
		$config['func_ajax'] = 'searchContent';
		$config['start'] = $this->input->post('start');
		$this->adminpagination->initialize($config);

		$result = $this->model->getsearchContent($config['per_page'],$this->input->post('start'));
		$data = array(
			'result'=>$result,
			'per_page'=>$this->input->post('per_page'),
			'start'=>$this->input->post('start'),
			'module'=>$this->module,
			'total'=>$config['total_rows']
		);
		$this->session->set_userdata('start',$this->input->post('start'));
		$this->load->view('BACKEND/ajax_loadContent',$data);
	}
	
	public function admincp_delete() {
		$perm = modules::run('admincp/chk_perm',$this->session->userdata('ID_Module'),'w',1);
		if($perm=='permission-denied'){
			print $perm;
			exit;
		}
		if ( ! empty($this->input->post('id')) ) {
			$id = $this->input->post('id');
			
			if ($this->model->softDeleteData($id)){
				print 'success.'.$this->security->get_csrf_hash();
				exit;
			}
		}
	}
	public function admincp_ajaxGetImageUpdate($id){
		$result = $this->model->getDetailManagement($id);
		print resizeImage(PATH_URL.DIR_UPLOAD_NEWS.$result->image,250);exit;
	}
	/*------------------------------------ End Admin Control Panel --------------------------------*/

}