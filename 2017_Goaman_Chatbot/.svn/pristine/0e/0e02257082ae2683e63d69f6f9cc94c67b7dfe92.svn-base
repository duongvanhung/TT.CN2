<?php
class Blocks_model extends CI_Model {
	private $module = 'blocks';
	private $table = 'blocks';

	function getsearchContent($limit = 0, $page = -1, $is_province = false) {
		$category_table_name = PREFIX.'category';
		$table_name = PREFIX.$this->table;
		
        if($limit == 0){
            $this->db->select("{$table_name}.id");
        } else {
            $this->db->select("{$table_name}.*, {$category_table_name}.name AS category_name");
        }
        $this->db->from($table_name);
        $this->db->join($category_table_name, "{$table_name}.category_id = {$category_table_name}.id", 'left');
		
        /*Begin: Condition*/
        if($limit > 0){
            $this->db->limit($limit, $page);
            $this->db->order_by("{$category_table_name}.porder DESC");
            $this->db->order_by($this->input->post('func_order_by'), $this->input->post('order_by'));
        }

        // Search condition
        $searched_content = trim($this->input->post('content'));
        if($searched_content != '' && $searched_content != 'type here...'){
            $search_condition = "(
					{$table_name}.name LIKE '%{$searched_content}%' OR 
					{$category_table_name}.name LIKE '%{$searched_content}%'
					)";
            $this->db->where($search_condition);
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
		/*End: Condition*/

        $query = $this->db->get(); 
        return $query->result();
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
				'image'=> trim($fileName['image']),
				'category_id'=> trim($this->input->post('category_idAdmincp')),
				'status'=> ($this->input->post('statusAdmincp')=='on')?1:0,
				'porder'=> (int)($this->input->post('porderAdmincp')),
				'created'=> date('Y-m-d H:i:s',time()),
			);
			foreach($all_lang as $key=>$val){
				$data['name'.$key] = trim(htmlspecialchars($this->input->post('name'.$key.'Admincp')));
				$data['src_js'.$key] = trim(htmlspecialchars($this->input->post('js'.$key.'Admincp')));
				$data['src_css'.$key] = trim(htmlspecialchars($this->input->post('css'.$key.'Admincp')));
				$data['source'.$key] = trim(htmlspecialchars($this->input->post('source'.$key.'Admincp')));
				$data['json'.$key] = trim(htmlspecialchars($this->input->post('json'.$key.'Admincp')));
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
			
			//Xử lý xóa hình khi update thay đổi hình
			if($fileName['image']==''){
				$fileName['image'] = $result[0]->image;
			}else{
				@unlink(BASEFOLDER.DIR_UPLOAD_BLOCKS.$result[0]->image);
			}
			//End xử lý xóa hình khi update thay đổi hình
			
			$data = array(
				'image'=> trim($fileName['image']),
				'category_id'=> trim($this->input->post('category_idAdmincp')),
				'status'=> ($this->input->post('statusAdmincp')=='on')?1:0,
				'porder'=> (int)($this->input->post('porderAdmincp')),
			);
			foreach($all_lang as $key=>$val){
				$data['name'.$key] = trim(htmlspecialchars($this->input->post('name'.$key.'Admincp')));
				$data['src_js'.$key] = trim(htmlspecialchars($this->input->post('js'.$key.'Admincp')));
				$data['src_css'.$key] = trim(htmlspecialchars($this->input->post('css'.$key.'Admincp')));
				$data['source'.$key] = trim(htmlspecialchars($this->input->post('source'.$key.'Admincp')));
				$data['json'.$key] = trim(htmlspecialchars($this->input->post('json'.$key.'Admincp')));
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
	
	function getCategory(){
		$this->db->select('*');
		$this->db->where('status',1);
		$this->db->order_by('name','ASC');
		$query = $this->db->get(PREFIX.'category');

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
}