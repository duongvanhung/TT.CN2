<?php
class Admincp_users_model extends CI_Model {
	private $module = 'admincp_users';
	private $table = 'facebook_user_subscribe';

	function getsearchContent($limit,$page){
		$this->db->select($this->table.'.*');
		
		$this->db->limit($limit,$page);
		$this->db->order_by($this->input->post('func_order_by'),$this->input->post('order_by'));
		if($this->input->post('content')!='' && $this->input->post('content')!='type here...'){
			$this->db->where('`email` LIKE "%'.$this->input->post('content').'%" OR `firstname` LIKE "%'.$this->input->post('content').'%" OR `lastname` LIKE "%'.$this->input->post('content').'%"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')==''){
			$this->db->where($this->table.'.created >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
		}
		if($this->input->post('dateFrom')=='' && $this->input->post('dateTo')!=''){
			$this->db->where($this->table.'.created <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')!=''){
			$this->db->where($this->table.'.created >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
			$this->db->where($this->table.'.created <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
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
			$this->db->where($this->table.'.created >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
		}
		if($this->input->post('dateFrom')=='' && $this->input->post('dateTo')!=''){
			$this->db->where($this->table.'.created <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
		}
		if($this->input->post('dateFrom')!='' && $this->input->post('dateTo')!=''){
			$this->db->where($this->table.'.created >= "'.date('Y-m-d 00:00:00',strtotime($this->input->post('dateFrom'))).'"');
			$this->db->where($this->table.'.created <= "'.date('Y-m-d 23:59:59',strtotime($this->input->post('dateTo'))).'"');
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
	
	function getdataConversation($uid){
		$this->db->select('*');
		$this->db->from('chatbot_conversation');
		$this->db->where('senderID',$uid);
		$this->db->join('chatbot_question', 'chatbot_question.id = chatbot_conversation.question_id');
		$this->db->order_by('question_id','ASC');
		$query = $this->db->get();
		
		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function getdataQuestion0($uid){
		$this->db->select('*');
		$this->db->where('senderID',$uid);
		$this->db->where('question_id',0);
		$query = $this->db->get('chatbot_conversation');
		
		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
}