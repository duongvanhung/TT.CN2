<style>
html,body{margin:0;padding:0}
li{list-style-type:none;}
li img{max-width:100%}
#container{margin:0 auto;min-height:500px}
.placeholder{background:gray;opacity:0.5}
</style>
<div id="blocks" style="float:left;width:10%;text-align:center;border-right:solid 1px #000">
	<?php
		if($blocks){
			foreach($blocks as $v){
	?>
	<li class="row-block" data-src="<?=$v->source?>" data-js="<?=$v->src_js?>" data-css="<?=$v->src_css?>" data-id="<?=$v->id?>"><img style="max-width:180px" alt="" src="<?=PATH_URL.DIR_UPLOAD_BLOCKS.$v->image?>" /></li>
	<?php }} ?>
	
	<li><a data-toggle="modal" href="#modal-export">Export Template</a></li>
</div>

<div id="container" style="float:left;width:89.9%;padding:0 2%"></div>