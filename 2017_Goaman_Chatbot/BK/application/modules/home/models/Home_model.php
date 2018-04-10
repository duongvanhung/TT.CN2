<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Home_model extends MY_Model {

	private $module = 'home';
    private $token;
	private $table = 'admin_nqt_user_info';

    function __construct(){
        parent::__construct();
        //$this->lang_code = $this->lang->default_lang();
        $this->load->database();
        $this ->table = 'admin_nqt_user_info';
        $this->tableName = 'admin_nqt_user_info';
        $this->primaryKey = 'id';
    }

    public function check_mail_info($email){
        $result = false;
        
        $this->db->select("id");
        $this->db->where('email', $email);
        $query = $this->db->get("admin_nqt_user_info");
        $query_result = $query->result_array();
        if(empty($query_result)){
            $result = true;
        }
        return $result;
    }

    public function load_list_user(){
      
        $this->db->select("*");
        $query_list = $this->db->get("user_type");
        return $query_list->result();
    }

    public function load_list_user_info($id){
        $this->db->select("*");
        $this->db->where('id',$id);
        $query_list = $this->db->get("admin_nqt_user_info");
        return $query_list->result();
    }
	
	public function load_list_location_user($id){
        $this->db->select('*');
        $this->db->where('user_id',$id);
        $query_list = $this->db->get('local_receive_newsletters');
        return $query_list->result();
    }
	
	public function get_password($id){
        $this->db->select("password");
		$this->db->where('id',$id);
        $query_list = $this->db->get("admin_nqt_user_info");
        return $query_list->result();
    }

    public function get_id($id){
        $this->db->select("id");
        $this->db->where('id',$id);
        $query_list = $this->db->get("admin_nqt_user_info");
        return $query_list->result();
    }

    public function login_info($username,$password,$email){
       $this->db->select('username','password','email');
       $this->db->from('admin_nqt_user_info');
       $this->db->where("(email ='$email' or username ='$username') and password ='$password'");
       $query = $this->db->get();
       if($query->num_rows() == 1){
        return true;
       }
       return false;
    }

    public function check_user_info($username,$email){
        $condition = "username =" . "'" . $username . "' or email ="."'".$email."'";
        $this->db->select('*');
        $this->db->from('admin_nqt_user_info');
        $this->db->where($condition);
        $this->db->limit(1);
        $query = $this->db->get();
        if ($query->num_rows() == 1) {
        return $query->result();
        } else {
        return false;
        }
    }
    
    public function checkUser($data = array()){
        $this->db->select($this->primaryKey);
        $this->db->from($this->table);
        $this->db->where(array('oauth_provider'=>$data['oauth_provider'],'oauth_uid'=>$data['oauth_uid']));
        $prevQuery = $this->db->get();
        $prevCheck = $prevQuery->num_rows();
        if($prevCheck > 0){
            $prevResult = $prevQuery->row_array();
            $update = $this->db->update($this->table,$data,array('id'=>$prevResult['id']));
            $userID = $prevResult['id'];
        }else{
            $data['created'] = date("Y-m-d H:i:s");
            $insert = $this->db->insert($this->table,$data);
            $userID = $this->db->insert_id();
        }
        return $userID?$userID:FALSE;
    }
   
    public function insert_info($data){
        return $this->insert("admin_nqt_user_info", $data);
    }
    public function update_info($data, $where=""){
       if($where != "")
        {
            $this->db->where($where);
        }
        return $this->db->update("admin_nqt_user_info", $data);
    }

	
	public function checkUserLocation($user_id){
		$result = false;
        
        $this->db->select("user_id");
        $this->db->where('user_id', $user_id);
        $query = $this->db->get("local_receive_newsletters");
        $query_result = $query->result_array();
        if(empty($query_result)){
            $result = true;
        }
        return $result;
	}
    
    public function load_comment(){
        $this->db->select("admin_nqt_comment_info.comment,admin_nqt_comment_info.user_info_id,admin_nqt_user_info.username,admin_nqt_comment_info.created,admin_nqt_user_info.created as since,admin_nqt_user_info.thumbnail");
        $this->db->from("admin_nqt_comment_info");
        $this->db->join('admin_nqt_user_info',"admin_nqt_comment_info.user_info_id= admin_nqt_user_info.id",'left');
        
        $query = $this->db->get();
        return $query->result_array (); 
        // FOR DEBUG
        $debug = false;
        if($debug){
            echo $this->db->last_query();
            exit();
        }   
    }
    public function get_item_list($start=-1, $limit=-1){
        $result = '';
        $select = '1';
        $limit_statement = '';
        $where = 'admin_nqt_user_info.id = admin_nqt_comment_info.user_info_id';
        if($start > -1 && $limit > -1){
            $select = '*';
            $limit_statement = "LIMIT {$start}, {$limit}";
           
        }
        $query = "
                SELECT {$select}
                FROM admin_nqt_comment_info
                JOIN admin_nqt_user_info
                WHERE {$where}
                {$limit_statement}
            ";
        $query = $this->db->query($query);
        $result = $query->result_array();// pr($item_list,1);
        return $result;
    }
    public function get_list_menu(){
        $query = $this->db->query("
            SELECT * FROM admincp_menu_lang
            WHERE status = '1' and lang_code = '".$this->lang->default_lang()."'
            LIMIT 7
            ");
        return $query->result(); 

    }
    public function get_background(){
        $query = $this->db->query("
            SELECT * FROM admincp_background
            WHERE status = '1'
            ORDER BY created desc
            LIMIT 1
            ");
        return $query->result(); 

    }
    public function get_latest_news($lang_code,$limit_news){
        $this->db->select("*");
        $this->db->from("admin_nqt_articles_item_lang");
        $this->db->where('lang_code',$lang_code);
        $this->db->order_by('created',"desc");
        $this->db->limit($limit_news);
        $query = $this->db->get();
        return $query->result_array(); 
    }
    public function get_related_news(){
        $where = "lang_code = 'en' and admin_nqt_articles_item_lang.category_id = '1'";
        $this->db->select("admin_nqt_articles_item_lang.*");
        $this->db->from("admin_nqt_articles_item_lang");
        $this->db->join('admin_nqt_category_articles',"admin_nqt_category_articles.id = admin_nqt_articles_item_lang.category_id",'left');
        $this->db->where($where);
        $query = $this->db->get();
        return $query->result_array(); 
    }
    public function get_header_ticker(){
        $this->db->select("contents");
        $this->db->where("status", "1" );
        $this->db->order_by("id desc");
        $this->db->limit(1,0);
        $query = $this->db->get("header_ticker");
        return $query->result(); 
    }

    public function get_articles_featured(){
        $query=$this->db->query("
        SELECT admin_nqt_articles_item.slug_en, admin_nqt_articles_item.slug_cn, admin_nqt_articles_item.image, admin_nqt_articles_item_lang.title, admin_nqt_articles_item_lang.description
        FROM admin_nqt_articles_item INNER JOIN admin_nqt_articles_item_lang 
        ON admin_nqt_articles_item.id = admin_nqt_articles_item_lang.articles_id 
        where admin_nqt_articles_item.featured = 1 and admin_nqt_articles_item_lang.status = 1 and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."' and admin_nqt_articles_item.is_delete = 0 order by admin_nqt_articles_item.id desc");
        return $query->result(); 
    }
   
     public function get_articles_latest(){
        $query=$this->db->query("
        SELECT admin_nqt_articles_item.slug_en, admin_nqt_articles_item.slug_cn, admin_nqt_articles_item.image, admin_nqt_articles_item_lang.title, admin_nqt_articles_item_lang.description
        FROM admin_nqt_articles_item INNER JOIN admin_nqt_articles_item_lang 
        ON admin_nqt_articles_item.id = admin_nqt_articles_item_lang.articles_id 
        where admin_nqt_articles_item.featured = 0 and admin_nqt_articles_item_lang.status = 1 and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."' and admin_nqt_articles_item.is_delete = 0 order by admin_nqt_articles_item.id desc limit 6");
        return $query->result(); 
    }

    public function get_articles_country($country){
        $query=$this->db->query("
        SELECT admin_nqt_articles_item.slug_en, admin_nqt_articles_item.slug_cn, admin_nqt_articles_item.image, admin_nqt_articles_item_lang.title, admin_nqt_articles_item_lang.description
        FROM admin_nqt_articles_item INNER JOIN admin_nqt_articles_item_lang 
        ON admin_nqt_articles_item.id = admin_nqt_articles_item_lang.articles_id 
        where admin_nqt_articles_item.featured = 0 and admin_nqt_articles_item_lang.status = 1 and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."' and admin_nqt_articles_item.is_delete = 0 and admin_nqt_articles_item.country = '". $country ."' order by admin_nqt_articles_item.id desc limit 3");
        return $query->result(); 
    }

    public function get_articles_blog($slug){
        $query=$this->db->query("
        SELECT admin_nqt_articles_item.slug_en, admin_nqt_articles_item.slug_cn, admin_nqt_articles_item.image, admin_nqt_articles_item_lang.title, admin_nqt_articles_item_lang.description, admin_nqt_articles_item_lang.content, admin_nqt_articles_item_lang.id, admin_nqt_articles_item_lang.category_id
        FROM admin_nqt_articles_item INNER JOIN admin_nqt_articles_item_lang 
        ON admin_nqt_articles_item.id = admin_nqt_articles_item_lang.articles_id 
        where admin_nqt_articles_item_lang.slug = '".$slug."' and admin_nqt_articles_item_lang.status = 1 and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."' and admin_nqt_articles_item.is_delete = 0 order by admin_nqt_articles_item.id desc");
        return $query->result(); 
    }

    // feature new 
    public function get_articles_blog_feature_new(){
        $query = $this->db->query("
        SELECT admin_nqt_articles_item_lang.id, admin_nqt_articles_item_lang.slug
        FROM admin_nqt_articles_item INNER JOIN admin_nqt_articles_item_lang 
        ON admin_nqt_articles_item.id = admin_nqt_articles_item_lang.articles_id 
        where admin_nqt_articles_item_lang.status = 1 
        and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."'
        and admin_nqt_articles_item.featured = 1 and admin_nqt_articles_item.is_delete = 0 order by admin_nqt_articles_item.id desc limit 1
        ");
        return $query->result();
    }

    public function get_articles_blog_category($category_id,$articles_id){
        // Related article blog where category_id | not id post
        $query=$this->db->query("
        SELECT admin_nqt_articles_item.slug_en, admin_nqt_articles_item.slug_cn, admin_nqt_articles_item.image, admin_nqt_articles_item_lang.title, admin_nqt_articles_item_lang.description, admin_nqt_articles_item_lang.content, admin_nqt_articles_item_lang.id, admin_nqt_articles_item_lang.category_id
        FROM admin_nqt_articles_item INNER JOIN admin_nqt_articles_item_lang 
        ON admin_nqt_articles_item.id = admin_nqt_articles_item_lang.articles_id 
        where admin_nqt_articles_item_lang.category_id = '".$category_id."' and admin_nqt_articles_item_lang.status = 1 and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."' and not admin_nqt_articles_item_lang.id = '". $articles_id."' and admin_nqt_articles_item.is_delete = 0 order by admin_nqt_articles_item.id desc");
        return $query->result(); 
    }


    public function get_user_comment($articles_id){
        $query=$this->db->query("
        SELECT admin_nqt_comment_info.id, admin_nqt_comment_info.user_info_id, admin_nqt_user_info.username,
         admin_nqt_comment_info.created, admin_nqt_comment_info.comment, admin_nqt_comment_info.id_comment_parent, 
         admin_nqt_comment_info.like,
         admin_nqt_user_info.thumbnail
        FROM admin_nqt_comment_info INNER JOIN admin_nqt_user_info
        ON admin_nqt_comment_info.user_info_id = admin_nqt_user_info.id
        LEFT JOIN admin_nqt_articles_item_lang on admin_nqt_comment_info.id_artcles_item_lang = admin_nqt_articles_item_lang.id
        where admin_nqt_comment_info.status = 1 and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."' 
        and admin_nqt_articles_item_lang.id = '". $articles_id."' and admin_nqt_comment_info.id_comment_parent = '0'
        Order by admin_nqt_comment_info.created desc
        ");
        return $query->result(); 
    }

    public function get_user_comment_child($articles_id,$id_comment_parent){
        $query=$this->db->query("
        SELECT admin_nqt_comment_info.id, admin_nqt_comment_info.user_info_id, admin_nqt_user_info.username, admin_nqt_comment_info.created, admin_nqt_comment_info.comment, admin_nqt_comment_info.id_comment_parent,  admin_nqt_comment_info.like, admin_nqt_user_info.thumbnail
        FROM admin_nqt_comment_info INNER JOIN admin_nqt_user_info
        ON admin_nqt_comment_info.user_info_id = admin_nqt_user_info.id
        LEFT JOIN admin_nqt_articles_item_lang on admin_nqt_comment_info.id_artcles_item_lang = admin_nqt_articles_item_lang.id
        where admin_nqt_comment_info.status = 1 and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."' 
        and admin_nqt_articles_item_lang.id = '". $articles_id."' and admin_nqt_comment_info.id_comment_parent = '". $id_comment_parent."'
        Order by admin_nqt_comment_info.created asc
        ");
        return $query->result(); 
    }


    public function insert_user_comment($user_info_id,$id_artcles_item_lang,$comment){
        $data = array(
            'id' => '',
            'user_info_id' => $user_info_id,
            'id_artcles_item_lang' => $id_artcles_item_lang,
            'comment' => $comment,
            'status' => '1',
            'created' => date('Y-m-d H:i:s'),
        );
        $this->db->insert('admin_nqt_comment_info',$data);
    }
    public function insert_user_comment_child($user_info_id,$id_artcles_item_lang,$id_comment_parent,$comment){
        $data = array(
            'id' => '',
            'user_info_id' => $user_info_id,
            'id_artcles_item_lang' => $id_artcles_item_lang,
            'id_comment_parent' => $id_comment_parent,
            'comment' => $comment,
            'status' => '1',
            'created' => date('Y-m-d H:i:s'),
        );
        $this->db->insert('admin_nqt_comment_info',$data);
    }
    // public function update_like_comment($id_comment,$id_user,$like){
    //     $query = $this->db->query("SELECT `id`,`like` FROM `admin_nqt_comment_info`");


    //     $data = array(
    //         'id' => $id_comment,
    //         'like' => '|' . $id_user . '|' . $like
    //     );
    //     $this->db->update('admin_nqt_comment_info',$data);
    // }
    public function get_link_css(){
        $query = $this->db->query("
            SELECT *
            FROM admincp_style
            where status ='1'
            ORDER BY created desc
          
            ");
        return $query->result();
    }

    public function select_blog_view($slug){
        $query=$this->db->query("
         SELECT admin_nqt_articles_item_lang.view
        FROM admin_nqt_articles_item_lang 
        where admin_nqt_articles_item_lang.slug = '".$slug."' and admin_nqt_articles_item_lang.status = 1 and admin_nqt_articles_item_lang.lang_code = '". $this->lang->default_lang() ."' and admin_nqt_articles_item_lang.is_delete = 0 limit 1");   
        return $query->result(); 
    }

    public function update_blog_view($slug,$view){
        $view = $view+1;
        $data = array(
            'view' => $view,
        );
        $this->db->where("slug", $slug );
        $this->db->update('admin_nqt_articles_item_lang',$data);
    }
    
} 
	
	
	

