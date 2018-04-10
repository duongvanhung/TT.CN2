<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Chat extends MX_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model('Chat/Chat_model','model');
	}

	private function getDataFromJson() {
		$jsonData = @file_get_contents('php://input');
		@json_decode($jsonData, TRUE);
		$arrayData = (json_last_error() === JSON_ERROR_NONE) ? json_decode($jsonData, TRUE) : array();
		return $arrayData;
	}

	public function index(){
		$jsonData = @file_get_contents('php://input');
		@json_decode($jsonData, TRUE);
		$arrayData = (json_last_error() === JSON_ERROR_NONE) ? json_decode($jsonData, TRUE) : array();

		$inputPostData = $this->input->post();
		$headers = $this->input->request_headers();
		$dummyData = array(
			// 'data1' => 'value1', //ex custom data from server
			// 'data2' => 'value2', //ex custom data from server
			// 'postdata' => $inputPostData,
			// 'headerdata' => $headers,
			'input_data' => $arrayData,
			'create_at' => date(DATE_ISO8601),
			);
		echo json_encode($dummyData); 
		exit;
	}

	public function doSubscribe() {
		$result = array();
		$arrayData = $this->getDataFromJson();
		if( ! isset($arrayData ['uid'])) {
			$result ['status'] = -1;
			$result ['message'] = 'Missing required field';
			echo json_encode($result);
			exit;
		}
		$uid = $arrayData ['uid'];
		//do insert uid to subscribe data
		if ($this->model->userSubscribe($uid)) {
			$result ['status'] = 1;
			$result ['message'] = 'Subscribe successful';
		} else {
			$result ['status'] = 0;
			$result ['message'] = 'Subscribe failed';
		}
		echo json_encode($result);
		exit;
	}

	public function insertConversation(){
		// pr(@file_get_contents('php://input'));
		$result = array();
		$arrayData = $this->getDataFromJson();
		// pr($arrayData);
		
		if( ! isset($arrayData ['uid'])) {
			$result ['status'] = -1;
			$result ['message'] = 'Missinggtfrdbhgvcdtgff';
			echo json_encode($result);
			exit;
		}
		$item['senderID'] = $arrayData ['uid'];
		$item['answer'] = $arrayData ['messageText'];
		$item['question_id'] = $arrayData ['question_id'];


		if ($this->model->insertChatbotConversation($item)) {
			$result ['status'] = 1;
			$result ['message'] = 'save successful';
		} else {
			$result ['status'] = 0;
			$result ['message'] = 'save failed';
		}
		echo json_encode($result);
		exit;
	}
}