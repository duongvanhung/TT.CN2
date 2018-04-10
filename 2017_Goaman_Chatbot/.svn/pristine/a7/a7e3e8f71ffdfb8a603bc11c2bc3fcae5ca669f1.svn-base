<?php
if($menu){
	foreach($menu as $v){
		$pos = strpos($perm[0]->permission,','.$v->id.'|');
		if($pos!=0){
			$pos = $pos + strlen($v->id);
		}else{
			$pos = 0;
		}
		if(substr($perm[0]->permission,$pos+2,3)!='---'){
?>
<li class="<?php if($this->uri->segment(2)==$v->name_function){ print 'active'; }?>"><a href="<?=PATH_URL_ADMIN.''.$v->name_function.'/'?>"><i class="<?=$v->icon?>"></i><span class="title"><?=$v->name?></span></a></li>
<?php }}} ?>