<?php
if($category){
	foreach($category as $v){
?>
<li class="block-select"><a href="javascript:get_block(<?=$v->id?>)" class="menu-item"><?=$v->name?></a></li>
<?php }} ?>