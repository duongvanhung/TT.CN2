<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admincp_articles_detail extends MX_Controller {

	private $module = 'admincp_articles_detail';
	private $table = 'page_item';
	private $table_lang = 'page_item_lang';
	function __construct(){
		$this->admin_module = 'admincp_articles_detail';
		parent::__construct();
		// $this->load->model($this->module.'_model','model');
		// $this->load->model('admincp_modules/admincp_modules_model');
		// if($this->uri->segment(1)==ADMINCP){
		// 	if($this->uri->segment(2)!='login'){
		// 		if(!$this->session->userdata('userInfo')){
		// 			header('Location: '.PATH_URL_ADMIN.'login');
		// 			exit;
		// 		}
		// 		$get_module = $this->admincp_modules_model->check_modules($this->uri->segment(2));
		// 		$this->session->set_userdata('ID_Module',$get_module[0]->id);
		// 		$this->session->set_userdata('Name_Module',$get_module[0]->name);
		// 	}
		// 	$this->template->set_template('admin');
		// 	$this->template->write('title','Admin Control Panel');
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
	
	public function admincp_update($id=0){
		if($id==0){
			permission_force_check('w');
		}else{
			permission_force_check('r');
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
		$this->template->write_view('content','BACKEND/ajax_editContent',$data);
		$this->template->render();
	}

	public function admincp_save(){
		// pr($this->input->post(), 1);
		 permission_force_check('w');
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
		permission_force_check('d');
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

	public function admincp_ajaxUpdateStatus(){	
		$perm = permission_force_check('a');
		
			if($this->input->post('status')==0){
				$status = 1;
			}else{
				$status = 0;
			}
			$data = array(
				'status'=>$status
			);
			modules::run('admincp/saveLog',$this->module,$this->input->post('id'),'status','update',$this->input->post('status'),$status);
			$this->db->where('id', $this->input->post('id'));
			$this->db->update($this->table, $data);
			
			$update = array(
				'status'=>$status,
				'id'=>$this->input->post('id'),
				'module'=>$this->module
			);
			$this->load->view('BACKEND/ajax_updateStatus',$update);

		
	}


	public function admincp_ajaxUpdateFeatured(){	
		$perm = permission_force_check('a');
		if($perm=='permission-denied'){
			print '<script type="text/javascript">show_perm_denied()</script>';
			$featured = $this->input->post('featured');
			$data = array(
				'featured'=>$featured
			);
			$update = array(
				'featured'=>$featured,
				'id'=>$this->input->post('id'),
				'module'=>$this->module
			);
			$this->load->view('BACKEND/ajax_updateFeatured',$update);
		}else{
			if($this->input->post('featured')==0){
				$featured = 1;
			}else{
				$featured = 0;
			}
			$data = array(
				'featured'=>$featured
			);
			modules::run('admincp/saveLog',$this->module,$this->input->post('id'),'featured','update',$this->input->post('featured'),$featured);
			$this->db->where('id', $this->input->post('id'));
			$this->db->update($this->table, $data);
			
			$update = array(
				'featured'=>$featured,
				'id'=>$this->input->post('id'),
				'module'=>$this->module
			);
			$this->load->view('BACKEND/ajax_updateFeatured',$update);
		}	
	}


	/*------------------------------------ End Admin Control Panel --------------------------------*/

}