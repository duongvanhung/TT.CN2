<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Chat_model extends CI_Model {

	function __construct() {
		parent::__construct();
	}

	public function userSubscribe($uid) {
		$data = array(
			'uid' => $uid,
			'created' => date('Y-m-d H:i:s'));
		if($this->checkExistsUIDSubscribe($uid)) {
			return TRUE;
		}
		$this->db->insert('facebook_user_subscribe', $data);
		return TRUE;
	}

	public function checkExistsUIDSubscribe($uid) {
		$this->db->select('id');
		$this->db->where('uid', $uid);
		$query = $this->db->get('facebook_user_subscribe');
		return ( ! empty ($query->row('id'))) ? TRUE : FALSE;
	}

	public function insertChatbotConversation($item){
		
		$query = $this->db->insert('chatbot_conversation', $item);

		if($query){
			return TRUE;
		}
		return FALSE;
	}
}
?>