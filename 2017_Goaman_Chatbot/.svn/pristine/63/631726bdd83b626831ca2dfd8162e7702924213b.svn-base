<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Payment extends MX_Controller {
	private $schedule;
	private $sessionData;
	public function __construct(){
		parent::__construct();
		$this->load->model('Chat/Chat_model','model');
		$this->schedule = array('card_number', 'expiration_date', 'cvc_number', 'confirm', 'end');
	}

	public function index($data = NULL) {
		$result = $message = array();

		$uid = $data ['uid'];
		$inputMessageData = $data ['messageData'];
		$inputSessionData = $data ['sessionData'];
		$sessionData = $this->sessionData = $data ['sessionData'];

		$messageText = $data ['messageData']['messageText'];
		$quickReplyValude = $data ['messageData']['quickReplyValue'];
		$log = 'begin';
		$currentIndex = '-1';
		if(strripos($messageText, 'checkout') > 0) {
			$message = $this->showQuestionBuy();
		}
		else if(strripos($messageText, 'test stripe') > 0) {
			$message = $this->listQuestionCreditCard(3);
		}
		else if($quickReplyValude == 'QR_CONFRIM_BUY_PRODUCT') {
			$message = $this->listQuestionCreditCard(0);
			$sessionData = $this->sessionData = $this->createSessionPayment($sessionData);
		} 
		else if($quickReplyValude == 'QR_PAYMENT_CONFIRM_CARD') {
			$chargeData = $this->doCharge($sessionData);
			$message = $chargeData ['message'];
			$sessionData = $this->sessionData = $chargeData ['sessionData'];
			$log= 'log do charge';
		} 
		else if($this->checkExistsSessionPayment($sessionData)) {
			$currentIndex = $this->getCurrentIndexSessionPayment($sessionData);
			if($currentIndex !== FALSE || isset($this->schedule [$currentIndex])) {
				$nextIndex = $currentIndex + 1;
			} else {
				$nextIndex = FALSE;//$currentIndex;
			}
			if(isset($this->schedule [$currentIndex])) {
				$fieldName = $this->schedule [$currentIndex];
				$value = $messageText;
				$sessionData = $this->sessionData = $this->updateSessionPaymentData($sessionData, $fieldName, $value);
				$message = $this->listQuestionCreditCard($nextIndex);
				$sessionData = $this->sessionData = $this->updateCurrentIndexSessionPayment($sessionData, $nextIndex);
			}
			
		}
		else {
			$message = $this->listQuestionCreditCard();
		}
		$cardInfo = isset($this->sessionData ['payload']['payment']['card_info']) ? $this->sessionData ['payload']['payment']['card_info'] : array();
		$result ['status'] = 1;
		$result ['resultMessage'] = 'Get data successful';
		$result ['messageData'] = $message;
		$result ['sessionData'] = $this->sessionData;
		$result ['inputSessionData'] = $inputSessionData;
		$result ['cardInfo'] = $cardInfo;
		$result ['log'] = $log;
		$result ['currentIndex'] = $currentIndex;
		echo json_encode($result); exit;

	}

	function checkExistsSessionPayment($sessionData) {
		return isset($sessionData['payload']['payment']) ? TRUE : FALSE;
	}

	function getCurrentIndexSessionPayment($sessionData) {
		return isset($sessionData ['payload']['payment']['current_index']) ? $sessionData ['payload']['payment']['current_index'] : FALSE;
	}

	function updateCurrentIndexSessionPayment($sessionData, $currentIndex) {
		$sessionData ['payload']['payment']['current_index'] = $currentIndex;
		return $sessionData;
	}

	function createSessionPayment($sessionData) {
		$card = array(
			'card_number' => '',
			'expiration_date' => '',
			'cvc_number' => ''
			);
		$payment = array(
			'current_index' => 0,
			'card_info' => $card
			);
		$sessionData ['payload']['payment'] = $payment;
		return $sessionData;
	}

	function destroySessionPayment($sessionData) {

	}

	function updateSessionPaymentData($sessionData, $fieldName, $value) {
		$this->sessionData ['payload']['payment']['card_info'][$fieldName] = $value;
		$sessionData ['payload']['payment']['card_info'][$fieldName] = $value;
		return $sessionData;
	}

	function getCardInfoFromSession($sessionData) {
		return isset($sessionData ['payload']['payment']['card_info']) ? $sessionData ['payload']['payment']['card_info'] : FALSE;
	}

	// function updateSessionPayment($sessionData, $data = FALSE) {
	// 	$currentIndex = isset($sessionData ['payload']['payment']['next_index']) ? $sessionData ['payload']['payment']['next_index'] : 'card_number';
	// 	$nextIndex = isset($flow [$currentIndex]) ? $flow [$currentIndex] : FALSE;
	// 	$result = array();
	// 	$result ['payment']['current_index'] = $currentIndex;
	// 	$result ['payment']['next_index'] = $nextIndex;
	// 	if(!empty($data)) {
	// 		$result ['payment']['card_info'][$currentIndex] = $data;
	// 	}
	// 	$sessionData ['payload'] = array_merge($sessionData ['payload'], $result);
	// 	return $sessionData;
	// }

	public function showQuestionBuy() {
		$quickReplyObjects = array(
			array(
				'content_type' => 'text',
				'title' => 'YES',
				'payload' => 'QR_CONFRIM_BUY_PRODUCT'
				),
			array(
				'content_type' => 'text',
				'title' => 'NO',
				'payload' => 'QR_CANCEL_BUY_PRODUCT'
				)
			);
		$data = array (
			'text' => 'Do you want checkout?',
			'quick_replies' => $quickReplyObjects
			);
		return $data;
	}

	public function listQuestionCreditCard($index = '') {
		$result = array();
		$text = '';
		$quick_replies = array();
		$index = isset($this->schedule [$index]) ? $this->schedule [$index] : '';
		/*card_number, expiration_date, cvc_number, end*/
		switch ($index) {
			case 'start':
				break;
			case 'card_number':
				$text = "What is your card number?";
				break;
			case 'expiration_date':
				$text = "What is your card expiration date? (in format MM/YY. Ex: 08/17)";
				break;
			case 'cvc_number':
				$text = "What is your card CVC number?";
				break;
			case 'confirm':
				$cardInfo = $this->sessionData ['payload']['payment']['card_info'];
				$text = "Your card info:";
				$text .= "\nCard Number: " . $cardInfo ['card_number'];
				$text .= "\nExpiration Date: " . $cardInfo ['expiration_date'];
				$text .= "\nCVC Number: " . $cardInfo ['cvc_number'];
				$text .= "\nAre you ready for charge?";
				$quick_replies  = array(
					array( 'content_type' => 'text', 'title' => 'YES', 'payload' => 'QR_PAYMENT_CONFIRM_CARD' ),
					array( 'content_type' => 'text', 'title' => 'NO', 'payload' => 'QR_PAYMENT_CANCEL_CARD' )
					);
				break;
			case 'end':
				$text = "Thanks you!";
				break;
			default:
				$text = "Sorry, I can\\'t analytics your message";
				break;
		}
		$result ['text'] = $text;
		if(!empty($quick_replies)) {
			$result ['quick_replies'] = $quick_replies;
		}
		return $result;
	}

	public function doCharge($sessionData) {
		$result = array();
		$cardInfo = $this->getCardInfoFromSession($sessionData);
		if($cardInfo === FALSE) {
			$message = array('text' => 'Missing card info');
		}
		$date = explode('/', $cardInfo ['expiration_date']);
		$cardInfo ['month'] = isset($date [0]) ? $date [0] : 0;
		$cardInfo ['year'] = isset($date [1]) ? $date [1] : 0;
		$tokenData = $this->generateStripeTokenByCardInfo($cardInfo);
		if($tokenData ['status'] === FALSE) {
			$message = array('text' => $tokenData ['message']);
			$result ['message'] = $message;
			$result ['sessionData'] = $sessionData;
			return $result;	
		}
		$token = $tokenData ['token'];
		$amount = 1;
		$chargeData = $this->chargeMoneyByStripeToken($token, $amount);
		$message = array('text' => $chargeData ['message']);

		if($chargeData ['status'] === TRUE) {
			$nextIndex = 4;
			$sessionData = $this->sessionData = $this->updateCurrentIndexSessionPayment($sessionData, $nextIndex);
		}
		$result ['message'] = $message;
		$result ['sessionData'] = $sessionData;
		return $result;	
	}

	public function generateStripeTokenByCardInfo($cardInfo) {
		$this->load->library('Stripe');
		$result = array('status' => FALSE);
		\Stripe\Stripe::setApiKey('pk_test_JALIS32VJk8VN7gisu1jj8d3');
		#Ref: https://stripe.com/docs/api/php#create_card_token
		try {
			$stripeResponse = \Stripe\Token::create(
		      	array(
		          "card" => array(
						"number"    => $cardInfo ['card_number'],
						"exp_month" => $cardInfo ['month'],
						"exp_year"  => $cardInfo ['year'],
						"cvc"       => $cardInfo ['cvc_number']
		           )
		      	)
			);
		} catch (Exception $error) {
			//$error->jsonBody->error->message
			$result ['message'] = isset($error->jsonBody['error']['message'])? $error->jsonBody['error']['message'] : 'create stripe token error';
			// echo json_encode($error);
			// exit;
		}
		if (isset($stripeResponse ['id'])) {
			$result ['status'] = TRUE;
			$result ['token'] =  $stripeResponse ['id'];
			$result ['message'] = 'create stripe token successful';
		}
		return $result;
	}

	public function chargeMoneyByStripeToken($token, $amount = 1) {
		$this->load->library('Stripe');
		$result = array('status' => FALSE);
		\Stripe\Stripe::setApiKey("sk_test_ZvU1q6mW2kjkgozmCYZ0boZw");
		#Ref: https://stripe.com/docs/api/php#create_charge
		try {
		  	$stripeResponse = \Stripe\Charge::create(
		  		array(
			        "amount" => $amount * 100,
			        "currency" => "usd",
			        "card" => $token,
			        "description" => "Description charge" 
			  	)
		  	);
		} catch (Exception $error) {
			$result ['message'] = isset($error->jsonBody['error']['message'])? $error->jsonBody['error']['message'] : 'stripe charge error';
		}
		if (isset($stripeResponse ['id'])) {
			$result ['status'] = TRUE;
			$result ['token'] =  $stripeResponse ['id'];
			$result ['message'] = 'stripe charge successful';
		}
		return $result;
	}

}