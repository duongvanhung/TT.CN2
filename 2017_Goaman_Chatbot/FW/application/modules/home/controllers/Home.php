<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends MX_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model('home_model','model');
	}
	
	/*-------------------------------------- FrontEnd --------------------------------------*/
	function index(){
		// $this->template->write_view('content','index');
		// $this->template->render();
	}
}