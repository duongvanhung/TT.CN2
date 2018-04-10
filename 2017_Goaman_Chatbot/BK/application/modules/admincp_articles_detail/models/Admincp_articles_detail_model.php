<?php
class Admincp_articles_detail_model extends CI_Model {
	private $module = 'admincp_articles_detail';
	private $table = 'admin_nqt_articles_item';
	private $table_lang = 'admin_nqt_articles_item_lang';
	private $field_parent_id = 'articles_id';
	private $table_category = 'admin_nqt_category_articles';

	function getsearchContent($limit,$page){
		$this->db->select('*');
		$this->db->limit($limit,$page);
		$this->db->order_by($this->input->post('func_order_by'),$this->input->post('order_by'));
		if($this->input->post('content')!=''){
			$this->db->where('(`title_vi` LIKE "%'.$this->input->post('content').'%" OR `title_en` LIKE "%'.$this->input->post('content').'%")');
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
		
		#check soft delete
		$this->db->where('is_delete', 0);
		
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
			$this->db->where('(`title_vi` LIKE "%'.$this->input->post('content').'%" OR `title_en` LIKE "%'.$this->input->post('content').'%")');
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
		
		#check soft delete
		$this->db->where('is_delete', 0);
		
		$query = $this->db->count_all_results(PREFIX.$this->table);

		if($query > 0){
			return $query;
		}else{
			return false;
		}
	}
	
	function getDetailManagement($id){
		// $this->db->select(PREFIX.$this->table.'.*, id AS data_lang');
		$this->db->select('*');
		
		#check soft delete
		$this->db->where('is_delete', 0);
		
		$this->db->where('id',$id);
		$query = $this->db->get(PREFIX.$this->table);

		if($query->result()){
			$result = $query->row();
			
			$this->db->select('*');
			$this->db->where($this->field_parent_id, $id);
			$query = $this->db->get(PREFIX.$this->table_lang);
			$temp = NULL;
			if($query->result()) {
				foreach ($query->result() as $key => $item) {
					$temp[$item->lang_code] = $item;
				}
			}
			//make data_lang property in result object. IMPORTANT!!!!
			$result->data_lang = $temp;
			return $result;
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

		//default data
		$_current_lang_code = '';
		$_status = ($this->input->post('statusAdmincp')=='on') ? 1 : 0;
		$_created = $_updated = date('Y-m-d H:i:s',time());
		$_created_by = $_updated_by = ''; //TO DO
		$data_lang = $data_lang_temp = array();
		$_image_url = $_thumbnail_url = '';
		$_location = $this->input->post('countryAdmincp');
		$_country = $this->input->post('country');
		$_city = $this->input->post('city');

		$_tags = $this->input->post('tagsAdmincp');

		// feauted
		$_featured = ($this->input->post('featured')=='on') ? 1 : 0;
		$_featured_from = date("Y-m-d H:i:s",strtotime($this->input->post('featured_from_date') . ' ' . $this->input->post('featured_from_time')));
		$_featured_to = date("Y-m-d H:i:s",strtotime($this->input->post('featured_to_date') . ' ' . $this->input->post('featured_to_time')));


		if( ! empty($this->input->post('thumbnail_urlAdmincp')) ) {
			$pre_url = $this->input->post('thumbnail_urlAdmincp');
			$_thumbnail_url = move_file_from_url('admin_nqt_articles_item', $pre_url, TRUE);
		}

		if( ! empty($this->input->post('image_urlAdmincp')) ) {
			$pre_url = $this->input->post('image_urlAdmincp');
			$_image_url = move_file_from_url('admin_nqt_articles_item', $pre_url, FALSE);
		}

		$category_id = $this->input->post('categoryAdmincp');
		// pr($this->input->post(), 1);
		if($this->input->post('hiddenIdAdmincp')==0){
			//Kiểm tra đã tồn tại chưa?
			foreach($all_lang as $key=>$val){
				if($key!=''){
					$_current_lang_code = $key;
					$key = '_'.$key;
					$keyerror = '-'.$key;
				}else{
					$key = '';
					$keyerror = '';
				}

				$checkData = $this->checkData($this->input->post('title'.$key.'Admincp'),$key);
				if($checkData){
					print 'error-title'.$keyerror.'-exists.'.$this->security->get_csrf_hash();
					exit;
				}
				
				$checkSlug = $this->checkSlug($this->input->post('slug'.$key.'Admincp'),$key);
				if($checkSlug){
					print 'error-slug'.$keyerror.'-exists.'.$this->security->get_csrf_hash();
					exit;
				}
			}
			
			$data['category_id']= $category_id;
			$data['thumbnail']  = $_thumbnail_url;
			$data['image']      = $_image_url;
			$data['status']     = $_status;
			$data['created']    = $_created;
			$data['location']   = $_location;
			$data['country']    = $_country;
			$data['city']      	= $_city;
			$data['tags']    	= $_tags;

			// featured
			$data['featured'] = $_featured;
			$data['featured_from'] = $_featured_from;
			$data['featured_to'] = $_featured_to;
		
			foreach($all_lang as $key=>$val){
				$_current_lang_code = $key;
				$key = ($key != '') ? '_' . $key : $key;
				$subfix = $key . 'Admincp';

				$data['title'.$key] = trim(htmlspecialchars($this->input->post('title' . $subfix)));
				$data['slug'.$key] = trim($this->input->post('slug' . $subfix));
				//make data language
				$data_lang_temp['title'] = trim(htmlspecialchars($this->input->post('title' . $subfix)));
				$data_lang_temp['slug'] = trim($this->input->post('slug' . $subfix));
				$data_lang_temp['location'] = $_location;
				$data_lang_temp['country'] = $_country;
				$data_lang_temp['city'] = $_city;
				$data_lang_temp['tags'] = $_tags;
				$data_lang_temp['created'] = $_created;
				$data_lang_temp['status'] = $_status;
				$data_lang_temp['lang_code'] = $_current_lang_code;
				//different fields
				$data_lang_temp['thumbnail']  = $_thumbnail_url;
				$data_lang_temp['image']      = $_image_url;
				$data_lang_temp['category_id']= $category_id;
				$data_lang_temp['description'] = trim($this->input->post('description' . $subfix));
				$data_lang_temp['content'] = trim($this->input->post('content' . $subfix));
				//END different fields
				$data_lang[] = $data_lang_temp;
				unset($data_lang_temp);
			}
			//pr($data_lang, 1);
			//DO INSERT DATA
			if($this->db->insert(PREFIX.$this->table,$data)){
				$insert_id = $this->db->insert_id();
				//Insert data language
				foreach ($data_lang as $key => $item) {
					$item[$this->field_parent_id] = $insert_id;
					$this->db->insert(PREFIX.$this->table_lang, $item);
				}
				//End insert data language
				modules::run('admincp/saveLog',$this->module,$insert_id,'Add new','Add new');
				return true;
			}
		}else{
			$result = $this->getDetailManagement($this->input->post('hiddenIdAdmincp'));
			// pr($result);
			// pr(json_decode(json_encode($result), true), 1);
			//Kiểm tra đã tồn tại chưa?
			foreach($all_lang as $key=>$val){
				if($key!=''){
					$_current_lang_code = $key;
					$key = '_'.$key;
					$keyerror = '-'.$key;
				}else{
					$key = '';
					$keyerror = '';
				}
				$title = 'title'.$key;
				$slug = 'slug'.$key;
				if($result->$title!=$this->input->post('title'.$key.'Admincp')){
					$checkData = $this->checkData($this->input->post('title'.$key.'Admincp'),$key,$this->input->post('hiddenIdAdmincp'));
					if($checkData){
						print 'error-title'.$keyerror.'-exists.'.$this->security->get_csrf_hash();
						exit;
					}
				}
				
				if($result->$slug!=$this->input->post('slug'.$key.'Admincp')){
					$checkSlug = $this->checkSlug($this->input->post('slug'.$key.'Admincp'),$key,$this->input->post('hiddenIdAdmincp'));
					if($checkSlug){
						print 'error-slug'.$keyerror.'-exists.'.$this->security->get_csrf_hash();
						exit;
					}
				}
			}
			
			//Xử lý xóa hình khi update thay đổi hình
			if($fileName['image']==''){
				$fileName['image'] = $result->image;
			}else{
				@unlink(BASEFOLDER.DIR_UPLOAD_NEWS.$result->image);
			}
			

			if( ! empty($_thumbnail_url) ) {
				$data['thumbnail'] = $_thumbnail_url;
			}
			if( ! empty($_image_url) ) {
				$data['image'] = $_image_url;
			}
			$data['status'] = $_status;
			$data['updated'] = $_updated;
			$data['category_id']= $category_id;
			$data['location'] = $_location;
			$data['country'] = $_country;
			$data['city'] = $_city;

			$data['tags']    	= $_tags;

			// featured
			$data['featured'] = $_featured;
			$data['featured_from'] = $_featured_from;
			$data['featured_to'] = $_featured_to;

			foreach($all_lang as $key=>$val){
				$_current_lang_code = $key;
				$key = ($key != '') ? '_' . $key : $key;
				$subfix = $key . 'Admincp';

				$data['title'.$key] = trim(htmlspecialchars($this->input->post('title' . $subfix)));
				$data['slug'.$key] = trim($this->input->post('slug' . $subfix));
				//make data language
				$data_lang_temp['title'] = trim(htmlspecialchars($this->input->post('title' . $subfix)));
				$data_lang_temp['slug'] = trim($this->input->post('slug' . $subfix));
				$data_lang_temp['updated'] = $_created;
				$data_lang_temp['status'] = $_status;
				$data_lang_temp['lang_code'] = $_current_lang_code;
				//different fields
				if( ! empty($_thumbnail_url) ) {
					$data_lang_temp['thumbnail'] = $_thumbnail_url;
				}
				if( ! empty($_image_url) ) {
					$data_lang_temp['image'] = $_image_url;
				}
				$data_lang_temp['category_id']= $category_id;
				$data_lang_temp['location'] = $_location;
				$data_lang_temp['country'] = $_country;
				$data_lang_temp['city'] = $_city;

				$data_lang_temp['tags'] = $_tags;
				$data_lang_temp['description'] = trim($this->input->post('description' . $subfix));
				$data_lang_temp['content'] = trim($this->input->post('content' . $subfix));
				//END different fields
				$data_lang[] = $data_lang_temp;
				unset($data_lang_temp);
			}
			//pr($data_lang, 1);
			$update_id = $this->input->post('hiddenIdAdmincp');
			$old_value[] = $result;
			unset($data['created'], $data['updated']);
			modules::run('admincp/saveLog',$this->module,$this->input->post('hiddenIdAdmincp'),'','Update', $old_value, $data);

			//DO UPDATE DATA
			$this->db->where('id', $update_id);
			if($this->db->update(PREFIX.$this->table,$data)){
				//Update data in table language
				foreach ($data_lang as $key => $item) {
					$lang_code = $item['lang_code'];
					unset($item['lang_code']);
					$this->db->where('lang_code', $lang_code);
					$this->db->where($this->field_parent_id, $update_id);
					$this->db->update(PREFIX.$this->table_lang, $item);
				}
				//end update data language
				return true;
			}
		}
		return false;
	}


	function softDeleteData ($id) {
		$data ['is_delete'] = 1;
		$this->db->where('id', $id);
		if ($this->db->update (PREFIX.$this->table, $data)) {
			modules::run('admincp/saveLog',$this->module,$id,'Delete','Delete');
			//Soft-delete data in table language
			$this->db->where ($this->field_parent_id, $id);
			$this->db->update (PREFIX.$this->table_lang, $data);
			//end soft-delete data language
			return TRUE;
		}
		return FALSE;
	}
	
	function checkData($title,$lang,$id=0){
		$this->db->select('id');
		$this->db->where('title'.$lang,$title);
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
	
	function checkSlug($slug,$lang,$id=0){
		$this->db->select('id');
		$this->db->where('slug'.$lang,$slug);
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
	
	function getData($limit,$start){
		$this->db->select('*');
		$this->db->where('status',1);
		$this->db->limit($limit,$start);
		$query = $this->db->get(PREFIX.$this->table);

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function getTotal(){
		$this->db->select('id');
		$this->db->where('status',1);
		$query = $this->db->count_all_results(PREFIX.$this->table);

		if($query > 0){
			return $query;
		}else{
			return false;
		}
	}
	
	function getDetail($slug){
		$this->db->select('*');
		$this->db->where('status',1);
		$this->db->where('slug_'.$this->lang->lang(),$slug);
		$this->db->limit(1);
		$query = $this->db->get(PREFIX.$this->table);

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}
	
	function getOther($id){
		$this->db->select('*');
		$this->db->where('status',1);
		$this->db->where_not_in('id',array($id));
		$this->db->limit(5);
		$this->db->order_by('id','random');
		$query = $this->db->get(PREFIX.$this->table);

		if($query->result()){
			return $query->result();
		}else{
			return false;
		}
	}

	function getCategories() {
		$result = FALSE;
		$all_lang = (isset($this->lang->languages)) ? $this->lang->languages : array('' => '');

		$this->db->select('*');
		$this->db->where('status',1);
		#check soft delete
		$this->db->where('is_delete', 0);
		$query = $this->db->get(PREFIX.$this->table_category);

		if($query->result()){
			$result = $query->result();
			foreach ($result as $key => $value) {
				$title_merge = '';
				foreach ($all_lang as $key => $lang) { 
					$_title = 'title_' . $key;
					$title_merge .= strtoupper($key) . ': ' . $value->$_title . ' | ';
				}
				$title_merge = substr($title_merge, 0, -3);
				// echo $title_merge;
				// $title_merge = $value->title_vi . ' | VI: ' . $value->title_en;
				$value->title_merge = $title_merge;
				$value->name = $title_merge;
			}
		}
		return $result;
	}
}