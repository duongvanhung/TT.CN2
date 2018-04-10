<?php
class Category_model extends CI_Model {
	private $module = 'category';
	private $table = 'category';

	function getsearchContent($limit,$page){
		$this->db->select('*');
		$this->db->limit($limit,$page);
		$this->db->order_by($this->input->post('func_order_by'),$this->input->post('order_by'));
		if($this->input->post('content')!=''){
			$this->db->where('(`name` LIKE "%'.$this->input->post('content').'%")');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')==''){
			$this->db->where('created >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
		}
		if($this->input->post('dateFrom')=='' && $this->input->post('dateTo')!=''){
			$this->db->where('created <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')!=''){
			$this->db->where('created >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
			$this->db->where('created <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		$query = $this->db->get(PREFIX.$this->table);

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function getTotalsearchContent(){
		$this->db->select('*');
		if($this->input->post('content')!='' && $this->input->post('content')!='type here...'){
			$this->db->where('(`name` LIKE "%'.$this->input->post('content').'%")');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')==''){
			$this->db->where('created >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
		}
		if($this->input->post('dateFrom')=='' && $this->input->post('dateTo')!=''){
			$this->db->where('created <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')!=''){
			$this->db->where('created >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
			$this->db->where('created <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		$query = $this->db->count_all_results(PREFIX.$this->table);

		if($query > 0){
			return $query;
		}else{
			return false;
		}
	}
	
	function getDetailManagement($id){
		$this->db->select('*');
		$this->db->where('id',$id);
		$query = $this->db->get(PREFIX.$this->table);

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function saveManagement($fileName=''){
		if(isset($this->lang->languages)){
			$all_lang = $this->lang->languages;
		}else{
			$all_lang = array(
				'' => ''
			);
		}
		
		if($this->input->post('hiddenIdAdmincp')==0){
			//Kiểm tra đã tồn tại chưa?
			foreach($all_lang as $key=>$val){
				if($key!=''){
					$key = '_'.$key;
					$keyerror = '-'.$key;
				}else{
					$key = '';
					$keyerror = '';
				}
				$checkData = $this->checkData($this->input->post('name'.$key.'Admincp'),$key);
				if($checkData){
					print 'error-name'.$keyerror.'-exists.'.$this->security->get_csrf_hash();
					exit;
				}
			}
			$data = array(
				'status'=> ($this->input->post('statusAdmincp')=='on')?1:0,
				'created'=> date('Y-m-d H:i:s',time()),
			);
			foreach($all_lang as $key=>$val){
				$data['name'.$key] = trim(htmlspecialchars($this->input->post('name'.$key.'Admincp')));
				$data['porder'.$key] = trim(htmlspecialchars($this->input->post('porder'.$key.'Admincp')));
			}
			if($this->db->insert(PREFIX.$this->table,$data)){
				modules::run('admincp/saveLog',$this->module,$this->db->insert_id(),'Add new','Add new');
				return true;
			}
		}else{
			$result = $this->getDetailManagement($this->input->post('hiddenIdAdmincp'));
			//Kiểm tra đã tồn tại chưa?
			foreach($all_lang as $key=>$val){
				if($key!=''){
					$key = '_'.$key;
					$keyerror = '-'.$key;
				}else{
					$key = '';
					$keyerror = '';
				}
				$name = 'name'.$key;
				if($result[0]->$name!=$this->input->post('name'.$key.'Admincp')){
					$checkData = $this->checkData($this->input->post('name'.$key.'Admincp'),$key,$this->input->post('hiddenIdAdmincp'));
					if($checkData){
						print 'error-name'.$keyerror.'-exists.'.$this->security->get_csrf_hash();
						exit;
					}
				}
			}
			
			$data = array(
				'status'=> ($this->input->post('statusAdmincp')=='on')?1:0
			);
			foreach($all_lang as $key=>$val){
				$data['name'.$key] = trim(htmlspecialchars($this->input->post('name'.$key.'Admincp')));
				$data['porder'.$key] = trim(htmlspecialchars($this->input->post('porder'.$key.'Admincp')));
			}
			modules::run('admincp/saveLog',$this->module,$this->input->post('hiddenIdAdmincp'),'','Update',$result,$data);
			$this->db->where('id',$this->input->post('hiddenIdAdmincp'));
			if($this->db->update(PREFIX.$this->table,$data)){
				return true;
			}
		}
		return false;
	}
	
	function checkData($name,$lang,$id=0){
		$this->db->select('id');
		$this->db->where('name'.$lang,$name);
		if($id!=0){
			$this->db->where_not_in('id',array($id));
		}
		$this->db->limit(1);
		$query = $this->db->get(PREFIX.$this->table);

		if($query->result()){
			return true;
		}else{
			return false;
		}
	}
}