<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Home extends MX_Controller {
    
    private $module = 'home';
    private $current_page_data;
    private $current_category_data;
    private $current_detail_data;
    private $parent_url;
    private $segments;
    private $pre_uri;

    public function __construct(){
        parent::__construct();
        //load model
        $this->load->model('home_model','model');
        $this->template->set_template('default');
        $this->current_page_data = NULL;
        $this->segments = $this->uri->segment_array();
        $this->load->library('session');
        $this->load->library('facebook');

    }

    public function index(){ 
        // redirect(PATH_URL.'cms');
		
		/* 
        $data['type_list'] = $this->model->load_list_user(); 
        $userData = $this->session->get_userdata();
        if(isset($this->session->userdata['userData'])){
         $data['userDataSetting1'] = $this->model->load_list_user_info($this->session->userdata['userData']['id']);
        }
		
		// Begin: Get Header Ticker
		$data['header_ticker'] = $this->model->get_header_ticker();
		// End: Get Header Ticker

		
        $this->template->write('title','Home page');
        $this->template->write_view('content','FRONTEND/index',$data);
        $this->template->render(); 
		*/
    }
	
	public function get_header_ticker(){
		return $this->model->get_header_ticker();
	}
    public function get_list_menu(){
        return $this->model->get_list_menu();
    }
     public function get_background(){
        return $this->model->get_background();
    }
    public function get_link_css(){
        //get css
        return $this->model->get_link_css();
    }

    public function get_articles_featured(){
        return $this->model->get_articles_featured();
    }

    public function get_articles_latest(){
        return $this->model->get_articles_latest();
    }

    public function get_articles_country($country){
        return $this->model->get_articles_country($country);
    }

    public function load_list_user_info($id){
        return $this->model->load_list_user_info($id);
    }

    public function send_notify_by_onesignal() {
        $title = $this->input->get('title');
        $content = $this->input->get('content');
        $player_id = $this->input->get('player_id');
        $headings = array(
            'en' => $title, //'English title',
            );
        $contents = array(
            'en' => $content, //'Engish content',
            );
        $data = array(
            'key' => 'value',
            );
        $player_ids = array(
            $player_id, //'befadb7c-c008-4ebd-801c-b2829efd59b1'
            );

        $fields = array(
            'app_id' => ONESIGNAL_APP_ID,
            'include_player_ids' => $player_ids,
            'headings' => $headings,
            'contents' => $contents,
            'data' => $data,
            );
        $fields_json = json_encode($fields);
        $request_header = array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic ' . ONESIGNAL_REST_API_KEY
            );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $request_header);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_json);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        $response = curl_exec($ch);
        curl_close($ch);
        pr($response, 1);
    }

    public function test_onesignal() {
        $this->load->view('FRONTEND/test_onesignal', NULL);
    }

    public function test_editor(){
        $data = array();
        $this->load->view('FRONTEND/test_get_oembed', $data);
    }
    private function _is_login(){
        if ($this->session->userdata('token')) {
            redirect(base_url());
        }
        elseif ( ! $this->input->is_ajax_request()) {
            redirect(base_url('/'));
        }
    }
    // Resgiter user database
    public function signup(){ 
       
        $email          = $this->input->post('email');
        $username       = $this->input->post('username');
        $password       = $this->hashpassword($this->input->post('password'));
        $location       = $this->input->post('location');
        $country        = $this->input->post('country');
        $city           = $this->input->post('city');
        $url            = $this->input->post('url');
        $biiography     = $this->input->post('biiography');
        $status_genenal = $this->input->post('status_genenal');
        $founder        = $this->input->post('founder');
        $shortbio       = $this->input->post('shortbio');
        $marketing      = $this->input->post('marketing');
        $contact        = $this->input->post('contact');
        $distributor    = $this->input->post('distributor');
        $facebook       = $this->input->post('facebook');
        $twitter        = $this->input->post('twitter');
        $bandcamp       = $this->input->post('bandcamp');
        $soundcloud     = $this->input->post('soundcloud');
        $mixcloud       = $this->input->post('mixcloud');
        $itunes         = $this->input->post('itunes');
        $beatport       = $this->input->post('beatport');
        $user_type_id   = $this->input->post('gender');  

        switch ($user_type_id) {
           case '1':
           $user_type_id =1;
                break;
            case '2':
                $user_type_id=2;
                break;
            case '3':
                $user_type_id=3;
                break;
            case '4':
                $user_type_id=4;
                break;
            case '5':
                $user_type_id=5;
                break;
            case '6':
                 $user_type_id=6;
                break;
            case '7':
                $user_type_id=7;
                break;
        }
        if(!empty($email) && !empty($username))
        {
            if($this->model->check_mail_info($email))
            {
                $data = array(
                    'email'         => $email,
                    'username'      => $username,
                    'location'      => $location,
                    'country'       => $country,
                    'city'          => $city,
                    'user_type_id'  => $user_type_id,
                    'password'      => $password,
                    'url'           => $url,
                    'biiography'    => $biiography,
                    'status_genenal'=> $status_genenal,
                    'founder'       => $founder,
                    'shortbio'      => $shortbio,
                    'marketing'     => $marketing,
                    'contact'       => $contact,
                    'distributor'   => $distributor,
                    'facebook'      => $facebook,
                    'twitter'       => $twitter,
                    'bandcamp'      => $bandcamp,
                    'soundcloud'    => $soundcloud,
                    'mixcloud'      => $mixcloud,
                    'itunes'        => $itunes,
                    'beatport'      => $beatport,
                    );
              
                if($this->model->insert_info($data)){
                   
                    echo 1;
                }
            } 
            else 
            {
              
                echo 0;
            }
        }
        exit();
    }

    //login username/email function
    public function login(){
        
        $email = $username = $this->input->post('username');
        $password = $this->hashpassword($this->input->post('password')) ;
        $request_headers = $this->input->request_headers();

        // check data login
        $result = $this->model->login_info($username,$password,$email);
        if($result){    
            // check username exits
            $result = $this->model->check_user_info($username,$email);
            $user_id = $result[0]->id;
            $resultlocation = $this->model->load_list_location_user($user_id);
            if($result != false){
                $data['userData'] = array(
                    'username'          => $result[0]->username,
                    'id'                => $result[0]->id,
                    'location'           => $result[0]->location,
                    'country'           => $result[0]->country,
                    'city'              => $result[0]->city,
                    'url'               => $result[0]->url,
                    'biiography'        => $result[0]->biiography,
                    'status_genenal'    => $result[0]->status_genenal,
                    'founder'           => $result[0]->founder,
                    'shortbio'          => $result[0]->shortbio,
                    'marketing'         => $result[0]->marketing,
                    'contact'           => $result[0]->contact,
                    'distributor'       => $result[0]->distributor,
                    'facebook'          => $result[0]->facebook,
                    'twitter'           => $result[0]->twitter,
                    'bandcamp'          => $result[0]->bandcamp,
                    'beatport'          => $result[0]->beatport,
                    'soundcloud'        => $result[0]->soundcloud,
                    'itunes'            => $result[0]->itunes,
                    'mixcloud'          => $result[0]->mixcloud,
                    'image'             => $result[0]->image,
                    'thumbnail'         => $result[0]->thumbnail,
                    'global_newsletter'          => $result[0]->global_newsletter,
                    'local_newsletter'          => $result[0]->local_newsletter,
                    'auto_location'          => $result[0]->auto_location,
                    'forum_threads'          => $result[0]->forum_threads,
                    'private_messages'          => $result[0]->private_messages,
                    'friend_request_notify'          => $result[0]->friend_request_notify,
                    'private_messages_notify'          => $result[0]->private_messages_notify,
                    );
                    if(!empty($resultlocation)){
                        $data['userData']['local1']          = $resultlocation[0]->local;
                        $data['userData']['local2']          = $resultlocation[1]->local;
                        $data['userData']['local3']          = $resultlocation[2]->local;
                        $data['userData']['local4']          = $resultlocation[3]->local;
                    }
                    else{
                        $data['userData']['local1']          = '';
                        $data['userData']['local2']          = '';
                        $data['userData']['local3']          = '';
                        $data['userData']['local4']          = '';
                    }
                //send session to view
                $this->session->set_userdata('userData',$data['userData']);
            }
            $_data ['status'] = 1;
            $_data ['message'] = 'success';
            $_data ['rdt'] = $request_headers ['Referer'];
        }
        else{
            $_data ['status'] = 0;
            $_data ['message'] = '....';
        }
        echo json_encode($_data); exit;
    }

    //login google
    public function login_google(){
        // Include the google api php libraries
        include_once APPPATH."libraries/google-api-php-client/Google_Client.php";
        include_once APPPATH."libraries/google-api-php-client/contrib/Google_Oauth2Service.php";
        //$this->load->library('GoogleAPI');
        // Google Project API Credentials
        $clientId = GG_CLIENT_ID;
        $clientSecret = GG_CLIENT_SECRET;
        $redirectUrl = base_url() . 'ajax/login_gg';
        //pr($redirectUrl,1);
        // Google Client Configuration
        $gClient = new Google_Client();

        $gClient->setApplicationName('Login to Redm');
        $gClient->setClientId($clientId);
        $gClient->setClientSecret($clientSecret);
        $gClient->setRedirectUri($redirectUrl);
        $gClient->setScopes(array(
                'email', 
                'profile', 
                'https://www.googleapis.com/auth/plus.login'
                ));
       
        if ( empty($this->input->get('code')) ) {
            redirect($gClient->createAuthUrl());
        } else {

            try {
                //Create google OAuth2 Service
                $google_oauthV2 = new Google_Oauth2Service($gClient);
                //pr($google_oauthV2,1);
                $gClient->authenticate();
                $access_token = $gClient->getAccessToken();
                // $plus->people->get('me');
                $userProfile = $google_oauthV2->userinfo->get();
                if(!empty($userProfile['email']) && !empty($userProfile['family_name']) && !empty($userProfile['given_name'])){
                    $userData['oauth_provider'] = 'google';
                    $userData['oauth_uid'] = $userProfile['id'];
                    $userData['first_name'] = $userProfile['given_name'];
                    $userData['last_name'] = $userProfile['family_name'];
                    $userData['email'] = $userProfile['email'];
                    $userData['locale'] = $userProfile['locale'];
                    $userData['picture_url'] = $userProfile['picture'];
                    // //BEGIN FIX MISSING FIELDS GOOGLE ACCOUNT
                    // // Insert or update user data
                     $userID = $this->model->checkUser($userData);
                    if(!empty($userID)){
                        $data['userData'] = array(
                        'username' => $userData['first_name'],
                        'id' => $userID,
                        );
                        //send session to view
                        $this->session->set_userdata('userData',$data['userData']);
                    } else {
                        $data['userData'] = array();
                     }
                    redirect(base_url());
                    // //END FIX MISSING FIELDS GOOGLE ACCOUNT
                    //TODO redirect to personal profile, set session token in web ....
                }else{
                    redirect(base_url());
                }
            } 
            catch (Exception $e) {
                redirect(base_url());
            }
        } 
    }

    //login facebook function
    public function login_fb(){
        $userData = array();
        $result_url = PATH_URL;
       
        // Check if user is logged in
        if($this->facebook->is_authenticated()){
            // Get user facebook profile details
            $userProfile = $this->facebook->request('get', '/me?fields=id,first_name,last_name,email,gender,locale,picture');
            // Preparing data for database insertion
            if(!empty($userProfile['email']) && !empty( $userProfile['first_name']) && !empty($userProfile['last_name'])){
                $userData['oauth_provider'] = 'facebook';
                $userData['oauth_uid'] = $userProfile['id'];
                $userData['first_name'] = $userProfile['first_name'];
                $userData['last_name'] = $userProfile['last_name'];
                $userData['email'] = $userProfile['email'];
                $userData['locale'] = $userProfile['locale'];
                $userData['profile_url'] = 'https://www.facebook.com/'.$userProfile['id'];
                $userData['picture_url'] = $userProfile['picture']['data']['url'];
                // Insert or update user data
                $userID = $this->model->checkUser($userData);
                // Check user data insert or update status
                if(!empty($userID)){
                    $data['userData'] = array(
                            'username' => $userData['first_name'],
                            'id' => $userID,
                    );
                    $this->session->set_userdata('userData',$data['userData']);
                } else {
                   $data['userData'] = array();
                }
                // Get logout URL
                $data['logoutUrl'] = $this->facebook->logout_url();

            }
             else{
                 redirect(base_url());
            }
        }else{
            $fbuser = '';
            // Get login URL

            
                $result_url = $this->facebook->login_url();
        }
       
            redirect($result_url);
    }

    //Logout
    public function logout(){
        $see_data = array(
            'username'          => '',
            'id'                => '',
            'location'          => '',
            'country'           => '',
            'city'              => '',
            'url'               => '',
            'biiography'        => '',
            'status_genenal'    => '',
            'founder'           => '',
            'shortbio'          => '',
            'marketing'         => '',
            'contact'           => '',
            'distributor'       => '',
            'facebook'          => '',
            'twitter'           => '',
            'bandcamp'          => '',
            'beatport'          => '',
            'soundcloud'        => '',
            'itunes'            => '',
            'mixcloud'          => '',
            );
        $this->facebook->destroy_session();
        $this->session->unset_userdata('userData', $see_data);
        // Remove user data from session
        $this->session->unset_userdata('userData');
        $this->session->unset_userdata('token');
        $this->session->sess_destroy();
        $request_headers = $this->input->request_headers();
        redirect($request_headers ['Referer']);
    }

    public function blog($slug = '',$start=0) {
        if(!$slug){
            $slug = $this->model->get_articles_blog_feature_new();
            foreach ($slug as $value) {
                $slug =  $value->slug;
            }
            if(!$slug){
            redirect(PATH_URL);
            }
            $data['hidden'] = 'hidden';
        } 

        $start = (int)$start;
        $limit = 2;
        $limit_news= '1';
        $request_headers = $this->input->request_headers();
        //pr(strstr($request_headers['Referer'],'en'),1);
        $lang = $this->lang->default_lang();
        $item_total_list = $this->model->get_item_list();//last_query(1);

        $data['type_list'] = $this->model->load_list_user();
        $userData = $this->session->get_userdata();
        if(isset($this->session->userdata['userData'])){
            $data['userDataSetting1'] = $this->model->load_list_user_info($this->session->userdata['userData']['id']);
        }
        if(!empty($item_total_list)){
            $total_rows = count($item_total_list);
            $item_list = $this->model->get_item_list($start, $limit);//last_query(1);
            $current_url = PATH_URL.$lang.'/blog';
            paginate($this,$current_url,$total_rows,$start,$limit);
        }
        $data['item_list'] = $item_list;

        $data['news'] = $this->model->get_latest_news($lang,$limit_news);
        $data['news_related'] = $this->model->get_related_news();

        $data['articles_blog'] =  $this->model->get_articles_blog($slug);

        $data['select_blog_view'] = $this->model->select_blog_view($slug);

        foreach ($data['select_blog_view'] as $result){
            $data['select_blog_view'] = $result->view;
        }

        $data['update_blog_view'] = $this->model->update_blog_view($slug,$data['select_blog_view'] );

        //pr($data['news_related'],1);
        $this->template->write('title',$data['news'][0]['title']);
        $this->template->write_view('content','FRONTEND/blog',$data);
        $this->template->render(); 
    }

    function get_articles_blog_category($category_id,$articles_id){
        return $this->model->get_articles_blog_category($category_id,$articles_id);
    }

    function get_user_comment($articles_id){
       
        return $this->model->get_user_comment($articles_id);
    }
    function get_user_comment_child($articles_id,$id_comment_parent){
       
        return $this->model->get_user_comment_child($articles_id,$id_comment_parent);
    }


    function insert_user_comment(){
        $user_info_id = $this->input->post('user_info_id');
        $id_artcles_item_lang = $this->input->post('id_artcles_item_lang');
        $comment = $this->input->post('comment');
        $this->model->insert_user_comment($user_info_id,$id_artcles_item_lang,$comment);
    }

    function insert_user_comment_child(){
        $user_info_id = $this->input->post('user_info_id');
        $id_artcles_item_lang = $this->input->post('id_artcles_item_lang');
        $id_comment_parent = $this->input->post('id_comment_parent');
        $comment = $this->input->post('comment');
        $this->model->insert_user_comment_child($user_info_id,$id_artcles_item_lang,$id_comment_parent,$comment);
    }

    function ajax_loadcomment(){
        $articles_id['articles_id'] = $this->input->post('articles_id');
        $this->load->view('FRONTEND/ajax_loadComment', $articles_id);
    }

    function ajax_loadcomment_reply(){
        $articles_id['articles_id'] = $this->input->post('articles_id');
        $articles_id['id_comment_parent'] = $this->input->post('id_comment_parent');
        $this->load->view('FRONTEND/ajax_loadComment_reply', $articles_id);
    }



    public function hashpassword($password) {
        return md5($password);
    }
    
    public function changePassword(){
        $userData = $this->session->get_userdata();
        $user_id = $userData['userData']['id'];
        $pass = $this->model->get_password($user_id);
        $password = $pass[0]->password;
        if(!empty($_POST)){
        $currentpass = $_POST['currentPass'];
        $newpass = $_POST['newPass'];
        $confirmpass = $_POST['confirmPass'];
        $currentPassmd5 = $this->hashpassword($currentpass);
            if($password==$currentPassmd5){
                if($newpass != $currentpass){$is_update = 0;
                    if($newpass == $confirmpass){
                        $item = array();
                        $item['password'] = $this->hashpassword($newpass);
                        $this->db->where('id',$user_id);
                        $is_update = $this->db->update('admin_nqt_user_info',$item);
                        $response['success'] = $is_update ? true : false;
                    }else{
                        print 'wrong-password-confirm';
                        exit;
                    }
                    echo json_encode($response);
                }else{
                    print 'repeated-password';
                    exit;
                }
            }else{
                print 'wrong-password';
                exit;
            }
        }
    }
    
    public function subscription_setting(){
        $userData = $this->session->get_userdata();
        $user_id = $userData['userData']['id'];
        $checkUserLocation = $this->model->checkUserLocation($user_id);
        $item = array();
        $local1 = array();
        $local2 = array();
        $local3 = array();
        $local4 = array();
        $local1['user_id'] = $user_id;
        $local2['user_id'] = $user_id;
        $local3['user_id'] = $user_id;
        $local4['user_id'] = $user_id;
        if(!empty($_POST)){
            $item['global_newsletter'] = $this->input->post('global-newsletter');
            $item['local_newsletter'] = $this->input->post('local-newsletter');
            $item['auto_location'] = $this->input->post('auto-location');
            $item['forum_threads'] = $this->input->post('forum-threads');
            $item['private_messages'] = $this->input->post('private-messages');
            $item['friend_request_notify'] = $this->input->post('friend-request-notify');
            $item['private_messages_notify'] = $this->input->post('private-messages-notify');
            
            $local1['local'] = $this->input->post('locationAdmincp');
            $local2['local'] = $this->input->post('locationAdmincp1');
            $local3['local'] = $this->input->post('locationAdmincp2');
            $local4['local'] = $this->input->post('locationAdmincp3');
            
            $local1['country'] = $this->input->post('countryAdmincp');
            $local2['country'] = $this->input->post('countryAdmincp1');
            $local3['country'] = $this->input->post('countryAdmincp2');
            $local4['country'] = $this->input->post('countryAdmincp3');
            
            $local1['cities'] = $this->input->post('citiesAdmincp');
            $local2['cities'] = $this->input->post('citiesAdmincp1');
            $local3['cities'] = $this->input->post('citiesAdmincp2');
            $local4['cities'] = $this->input->post('citiesAdmincp3');
            if($user_id){
                $this->db->where('id', $user_id);
                $this->db->update('admin_nqt_user_info',$item);
                if($checkUserLocation == true){
                    $this->db->insert('local_receive_newsletters',$local1);
                    $this->db->insert('local_receive_newsletters',$local2);
                    $this->db->insert('local_receive_newsletters',$local3);
                    $this->db->insert('local_receive_newsletters',$local4);
                }
                else{
                    $this->db->where('user_id', $user_id);
                    $this->db->delete('local_receive_newsletters');
                    $checkUserLocation = $this->model->checkUserLocation($user_id);
                    if($checkUserLocation == true){
                        $this->db->insert('local_receive_newsletters',$local1);
                        $this->db->insert('local_receive_newsletters',$local2);
                        $this->db->insert('local_receive_newsletters',$local3);
                        $this->db->insert('local_receive_newsletters',$local4);
                    }
                }           
            }
                $result = $this->model->load_list_user_info($user_id);
                if($this->model->get_id($user_id)){
                    $data['userDataLocation'] = array(
                            'id'            => $user_id,
                            'username'      => $result[0]->username,
                            'global_newsletter' => $item['global_newsletter'],                       
                            'local_newsletter' => $item['local_newsletter'],                       
                            'auto_location' => $item['auto_location'],                       
                            'forum_threads' => $item['forum_threads'],                       
                            'private_messages' => $item['private_messages'],                       
                            'friend_request_notify' => $item['friend_request_notify'],                       
                            'private_messages_notify' => $item['private_messages_notify'],                       
                            'local1' => $local1['local'],                       
                            'local2' => $local2['local'],                       
                            'local3' => $local3['local'],                       
                            'local4' => $local4['local'],                       
                    );
                    $this->session->set_userdata('userData',$data['userDataLocation']);
                }
            $debug = false;
            if($debug){
                echo $this->db->last_query();
                exit();
            }
        
        $_data ['status'] = 1;
            $_data ['message'] = 'success';
            $_data ['rdt'] = base_url();
        }
        else{
            $_data ['status'] = 0;
            $_data ['message'] = '....';
        }
        echo json_encode($_data); exit;
    }
    
    public function update_user(){
        
        $id = $this->input->post('id');
        $url = $this->input->post('url');
        $location       = $this->input->post('location');
        $country        = $this->input->post('country');
        $city           = $this->input->post('city');

        $contact        = $this->input->post('contact');
        $biography      = $this->input->post('biography');
        $status_genenal = $this->input->post('status_genenal');
        $founder        = $this->input->post('founder');
        $shortbio       = $this->input->post('shortbio');
        $marketing      = $this->input->post('marketing');
        $contact        = $this->input->post('contact');
        $distributor    = $this->input->post('distributor');
        $facebook       = $this->input->post('facebook');
        $twitter        = $this->input->post('twitter');
        $bandcamp       = $this->input->post('bandcamp');
        $soundcloud     = $this->input->post('soundcloud');
        $mixcloud       = $this->input->post('mixcloud');
        $itunes         = $this->input->post('itunes');
        $beatport       = $this->input->post('beatport');
        $_thumbnail_url = $_image_url = '';

        $result = $this->model->load_list_user_info($id);
        if($this->model->get_id($id)){
        
             $data = array(
                        'location'       => $location,
                        'country'       => $country,
                        'city'       => $city,
                        'url'           => $url,
                        'biiography'    => $biography,
                        'status_genenal'=> $status_genenal,
                        'founder'       => $founder,
                        'shortbio'      => $shortbio,
                        'marketing'     => $marketing,
                        'contact'       => $contact,
                        'distributor'   => $distributor,
                        'facebook'      => $facebook,
                        'twitter'       => $twitter,
                        'bandcamp'      => $bandcamp,
                        'soundcloud'    => $soundcloud,
                        'mixcloud'      => $mixcloud,
                        'itunes'        => $itunes,
                        'beatport'      => $beatport,
                        // 'image' => $_image_url,
                        // 'thumbnail' => $_thumbnail_url
            );

            if( ! empty($_POST['thumbnail_urlAdmincp'])) {
                    $pre_url = $_POST['thumbnail_urlAdmincp'];
                    $_thumbnail_url = move_file_from_url('thumb_avatar', $pre_url, TRUE);
                    $data['thumbnail'] = $_thumbnail_url;
            } 
            if( ! empty($_POST['image_urlAdmincp']) ) {
                    $pre_url = $_POST['image_urlAdmincp'];
                    $_image_url = move_file_from_url('image', $pre_url, FALSE);
                    $data['image'] = $_image_url;
            }


            $this->db->where('id',$id);
             if($this->model->update_info($data)){
             }
             // FOR DEBUG
             $debug = false;
            if($debug){
            echo $this->db->last_query();
            exit();
            }
            $_data ['status'] = 1;
            $_data ['message'] = 'success';
            $_data ['rdt'] = base_url();
        }
        else{
            $_data ['status'] = 0;
            $_data ['message'] = '....';
        }
        echo json_encode($_data); exit;
    }
    public function insert_com(){
        $comment = $this->input->post('comment');
    }

    public function for_got_password(){
      if(!empty($_POST)){
        $data = array();
        $email = $this->input->post('email');
        $checkmail = $this->model->check_mail_info($email);
        if($checkmail == false){
            $newPass = generate_random_string(8);
            $newPassMD5 = $this->hashpassword($newPass);
            $subject = 'Send New Password';
            $body = 'NEW PASSWORD:'.$newPass;
            $result = ses_send_mail($subject,$body,$email);
            $response['success'] = $result ? true : false;
            if($response['success'] == true){
                $data['password'] = $newPassMD5;
                $this->db->where('email', $email);
                $this->db->update('admin_nqt_user_info',$data);
            }
            $_data ['status'] = 1;
            $_data ['message'] = 'success';
            $_data ['rdt'] = base_url();
        }
        else{
            $_data ['status'] = 0;
            $_data ['message'] = '....';
        }
      }
      echo json_encode($_data); exit;
    }
    public function profile(){
        $this->load->view('FRONTEND/profile');
    }
    public function visit_analytic(){
        $this->load->library('GoogleAPI');
    }

}