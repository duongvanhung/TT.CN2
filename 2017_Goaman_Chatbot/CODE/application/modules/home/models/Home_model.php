<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home_model extends MY_Model {
	
	function getData($table,$parent='null',$limit='',$order_by='',$condition_arr=''){
		$table_name = PREFIX.$table;
		$category_table_name = PREFIX.'category'; // For blocks
		
		$this->db->select("{$table_name}.*");
		$this->db->where("{$table_name}.status",1);
		if($parent!='' && $parent!='null'){
			$this->db->where("{$table_name}.category_id",$parent);
		} else if($parent==''){
			if($table != 'blocks'){
				$this->db->order_by('category_id','ASC');
			}
		}
		if(!empty($condition_arr)){
			foreach($condition_arr as $key => $condition){
				$this->db->where($condition);
			}
		}
		
		if($limit!=''){
			$this->db->limit($limit);
		}
		if($table=='icons'){
			if($this->uri->segment(3) && $this->uri->segment(3)!=''){
				$this->db->where('category_id',$this->uri->segment(3));
			}
			$this->db->order_by('value','ASC');
		} else if($order_by!=''){
			$this->db->order_by($order_by);
		}
		if($table == 'blocks'){
			$this->db->join($category_table_name, "{$table_name}.category_id = {$category_table_name}.id", 'left');
			$this->db->order_by("{$category_table_name}.porder DESC");
			$this->db->order_by("{$table_name}.porder DESC");
		}
		$query = $this->db->get($table_name);

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function getTextTemplate(){
		$this->db->select('*');
		$this->db->where('status', 1);
		$query = $this->db->get(PREFIX.'text_template');

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
		
	}
	
	function getAudioTemplate(){
		$this->db->select('*');
		$this->db->where('status', 1);
		$query = $this->db->get(PREFIX.'audio_template');

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
		
	}
	
	function getSetting($slug=''){
		$this->db->select('*');
		if($slug!=''){
			$this->db->where('slug', $slug);
			$this->db->limit(1);
		}
		$query = $this->db->get('admin_nqt_settings');

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function get_cookie_data(){
		$this->db->select('chatbot_flow.cookie_data');
		$this->db->order_by('id','DESC');
		$query = $this->db->get('chatbot_flow');
		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
}
?>