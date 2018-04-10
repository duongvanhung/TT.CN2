<?php if($blocks){ ?>
<ul id="blocks">
	<?php 
	foreach($blocks as $v){
		$data_header = $v->category_id == CATEGORY_HEADER ? 'data-header="1"' : '';
	?>
	<li class="row-block" data-src="<?=$v->source?>" data-js="<?=$v->src_js?>" data-css="<?=$v->src_css?>" data-id="<?=$v->id?>" <?=$data_header?>><img alt="" src="<?=resizeImage(PATH_URL.DIR_UPLOAD_BLOCKS.$v->image,235)?>" /></li>
	<?php
	}
	?>
</ul>
<?php } ?>
<script type="text/javascript">
$("#blocks li").draggable({
	connectToSortable: "#container",
	revert: "invalid",
	helper: "clone"
});	
</script>
