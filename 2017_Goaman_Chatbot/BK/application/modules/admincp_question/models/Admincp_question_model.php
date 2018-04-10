<?php
class Admincp_question_model extends CI_Model {
	private $module = 'admincp_question_model';
	private $table = 'question';

	function getsearchContent($limit,$page){
		$this->db->select($this->table.'.*');
		
		$this->db->limit($limit,$page);
		$this->db->order_by($this->input->post('func_order_by'),$this->input->post('order_by'));
		if($this->input->post('content')!='' && $this->input->post('content')!='type here...'){
			$this->db->where('`email` LIKE "%'.$this->input->post('content').'%" OR `firstname` LIKE "%'.$this->input->post('content').'%" OR `lastname` LIKE "%'.$this->input->post('content').'%"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')==''){
			$this->db->where($this->table.'.created_at >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
		}
		if($this->input->post('dateFrom')=='' && $this->input->post('dateTo')!=''){
			$this->db->where($this->table.'.created_at <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')!=''){
			$this->db->where($this->table.'.created_at >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
			$this->db->where($this->table.'.created_at <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		$query = $this->db->get($this->table);

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function getTotalsearchContent(){
		$this->db->select('*');
		if($this->input->post('content')!='' && $this->input->post('content')!='type here...'){
			$this->db->where('`email` LIKE "%'.$this->input->post('content').'%" OR `firstname` LIKE "%'.$this->input->post('content').'%" OR `lastname` LIKE "%'.$this->input->post('content').'%"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')==''){
			$this->db->where($this->table.'.created_at >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
		}
		if($this->input->post('dateFrom')=='' && $this->input->post('dateTo')!=''){
			$this->db->where($this->table.'.created_at <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')!=''){
			$this->db->where($this->table.'.created_at >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
			$this->db->where($this->table.'.created_at <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		$query = $this->db->count_all_results($this->table);

		if($query > 0){
			return $query;
		}else{
			return false;
		}
	}
	
	function getDetailManagement($id){
		$this->db->select('*');
		$this->db->where('id',$id);
		$query = $this->db->get($this->table);

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function saveManagement($perm=''){

		$_thumbnail_url = $_image_url = '';

		if($_POST['hiddenIdAdmincp']==0){
			//Kiểm tra đã tồn tại chưa?
			if($checkData){
				print 'error-email-exists';
				exit;
			}


			$data = array(
				'status'		=>	isset($_POST['status']) ? 1 : 0,
				'question'			=> 	trim($_POST['question']),
				'created_at'	=>	date('Y-m-d H:i:s'),
				'updated_at'	=> 	'0000-00-00 00:00:00'
			);
			

			if($data['user_role'] == USER_ROLE_PRO){
				$data['user_type'] = (int)$_POST['user_type'];
			}else {
				$data['user_type'] = 0;
			}

			if( ! empty($_POST['thumbnail_urlAdmincp'])) {
				$pre_url = $_POST['thumbnail_urlAdmincp'];
				$_thumbnail_url = move_file_from_url('thumb_avatar', $pre_url, TRUE);
			}

			if( ! empty($_POST['image_urlAdmincp']) ) {
				$pre_url = $_POST['image_urlAdmincp'];
				$_image_url = move_file_from_url('avatar', $pre_url, FALSE);
			}

			$data['avatar'] = $_image_url;
			$data['thumbnail'] = $_thumbnail_url;

			if($this->db->insert($this->table,$data)){
				modules::run('admincp/saveLog',$this->module,$this->db->insert_id(),'Add new','Add new');
				return true;
			}
		}else{
			$result = $this->getDetailManagement($_POST['hiddenIdAdmincp']);
			
			if($this->input->post('password')==''){
				$pass = $result[0]->password;
			}else{
				$pass = md5($_POST['password']);
			}

			$data = array(
				'status'		=>	isset($_POST['status']) ? 1 : 0,
				'question'			=> 	trim($_POST['question']),
				'updated_at'	=> 	date('Y-m-d H:i:s')
			);

			if($data['user_role'] == USER_ROLE_PRO){
				$data['user_type'] = (int)$_POST['user_type'];
			}else {
				$data['user_type'] = 0;
			}

			if( ! empty($_POST['thumbnail_urlAdmincp']) ) {
				$pre_url = $_POST['thumbnail_urlAdmincp'];
				$_thumbnail_url = move_file_from_url('thumb_avatar', $pre_url, TRUE);
			}else{
				$_thumbnail_url = $result[0]->thumbnail;
			}

			if( ! empty($_POST['image_urlAdmincp']) ) {
				$pre_url = $_POST['image_urlAdmincp'];
				$_image_url = move_file_from_url('avatar', $pre_url, FALSE);
			}else{
				$_image_url =  $result[0]->avatar;
			}

			$data['avatar'] = $_image_url;
			$data['thumbnail'] = $_thumbnail_url;

			modules::run('admincp/saveLog',$this->module,$this->input->post('hiddenIdAdmincp'),'','Update',$result,$data);

			$this->db->where('id',$_POST['hiddenIdAdmincp']);
			if($this->db->update($this->table,$data)){
				return true;
			}
		}
		return false;
	}
	
}