<?php
	if(isset($this->lang->languages)){
		$all_lang = $this->lang->languages;
	}else{
		$all_lang = array(
			'' => ''
		);
	}
?>
<script type="text/javascript">
function save(){
	var options = {
		beforeSubmit:  showRequest,  // pre-submit callback 
		success:       showResponse  // post-submit callback 
    };
	$('#frmManagement').ajaxSubmit(options);
}

function showRequest(formData, jqForm, options) {
	var form = jqForm[0];
	<?php foreach($all_lang as $key=>$val){ ?>
	if(form.name<?php ($key!='') ? print '_'.$key : print '' ?>Admincp.value == '' || form.category_idAdmincp.value=='' || form.source<?php ($key!='') ? print '_'.$key : print '' ?>Admincp.value == ''){
		$('#txt_error').html('Please enter information.');
		show_perm_denied();
		return false;
	}
	<?php } ?>
	
	<?php if($id==0 || (isset($result->image) && $result->image=='')){ ?>
	if($('.form-upload').val() == ''){
		$('#txt_error').html('Please upload image.');
		show_perm_denied();
		return false;
	}
	<?php } ?>
}

function showResponse(responseText, statusText, xhr, $form) {
	responseText = responseText.split(".");
	token_value  = responseText[1];
	$('#csrf_token').val(token_value);
	if(responseText[0]=='success'){
		<?php if($id==0){ ?>
		location.href=root+module+"/#/save";
		<?php }else{ ?>
		if($('.form-upload').val() != ''){
			$.get('<?=PATH_URL_ADMIN.$module.'/ajaxGetImageUpdate/'.$id?>',function(data){
				var res = data.split("src=");
				$('.fancybox-button').attr('href',res[1]);
				$('.fancybox-button img').attr('src',data);
				$('.fileinput-filename').html('');
				$('.fileinput').removeClass('fileinput-exists');
				$('.fileinput').addClass('fileinput-new');
			});
		}
		show_perm_success();
		<?php } ?>
	}
	
	if(responseText[0]=='error-image'){
		$('#txt_error').html('Only upload image.');
		show_perm_denied();
		return false;
	}
	
	<?php foreach($all_lang as $key=>$val){ ?>
	if(responseText[0]=='error-name<?php ($key!='') ? print '-'.$key : print '' ?>-exists'){
		$('#txt_error').html('Name<?php ($key!='') ? print ' ('.mb_strtoupper($key).')' : print '' ?> already exists.');
		show_perm_denied();
		$('#name<?php ($key!='') ? print '_'.$key : print '' ?>Admincp').focus();
		return false;
	}
	<?php } ?>

	if(responseText[0]=='permission-denied'){
		$('#txt_error').html('Permission denied.');
		show_perm_denied();
		return false;
	}
}
</script>
<!-- BEGIN PAGE HEADER-->
<h3 class="page-title"><?=$this->session->userdata('Name_Module')?></h3>
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li><i class="fa fa-home"></i><a href="<?=PATH_URL_ADMIN?>">Home</a><i class="fa fa-angle-right"></i></li>
		<li><a href="<?=PATH_URL_ADMIN.$module?>"><?=$this->session->userdata('Name_Module')?></a><i class="fa fa-angle-right"></i></li>
		<li><?php ($this->uri->segment(4)=='') ? print 'Add new' : print 'Edit' ?></li>
	</ul>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN PAGE CONTENT-->
<div class="row">
	<div class="col-md-12">
		<!-- BEGIN EXAMPLE TABLE PORTLET-->
		<div class="portlet box grey-cascade">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-globe"></i>Form Information
				</div>
			</div>
			
			<div class="portlet-body form">
				<div class="form-body notification" style="display:none">
					<div class="alert alert-success" style="display:none">
						<strong>Success!</strong> The page has been saved.
					</div>
					
					<div class="alert alert-danger" style="display:none">
						<strong>Error!</strong> <span id="txt_error"></span>
					</div>
				</div>
				
				<!-- BEGIN FORM-->
				<form id="frmManagement" action="<?=PATH_URL_ADMIN.$module.'/save/'?>" method="post" enctype="multipart/form-data" class="form-horizontal form-row-seperated">
					<input type="hidden" value="<?=$this->security->get_csrf_hash()?>" id="csrf_token" name="csrf_token" />
					<input type="hidden" value="<?=$id?>" name="hiddenIdAdmincp" />
					<div class="form-body">
						<div class="form-group">
							<label class="control-label col-md-3">Status</label>
							<div class="col-md-9">
								<div class="checkbox-list">
									<label class="checkbox-inline">
										<div class="checkbox"><span><input <?php if(isset($result->status)){ if($result->status==1){ ?>checked="checked"<?php }}else{ ?>checked="checked"<?php } ?> type="checkbox" name="statusAdmincp"></span></div>
									</label>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-3">Order</label>
							<div class="col-md-9">
								<div class="checkbox-list">
									<label class="checkbox-inline">
										<div class="checkbox">
											<span><input value="<?=!empty($result->porder) ? $result->porder : '0'?>" type="text" name="porderAdmincp"></span>
										</div>
									</label>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-3">Image <span class="required" aria-required="true">*</span></label>
							<div class="col-md-3">
								<div class="fileinput fileinput-new" data-provides="fileinput">
									<div class="input-group input-large">
										<div class="form-control uneditable-input input-fixed input-medium" data-trigger="fileinput">
											<i class="fa fa-file fileinput-exists"></i>&nbsp; <span class="fileinput-filename">
											</span>
										</div>
										<span class="input-group-addon btn default btn-file">
										<span class="fileinput-new">
										Select file </span>
										<span class="fileinput-exists">
										Change </span>
										<input class="form-upload" type="file" name="fileAdmincp[image]">
										</span>
										<a href="javascript:;" class="input-group-addon btn red fileinput-exists" data-dismiss="fileinput">
										Remove </a>
									</div>
									<?php if(isset($result->image)){ if($result->image!=''){ ?>
									<div class="fileinput-new thumbnail">
										<a class="fancybox-button" href="<?=PATH_URL.DIR_UPLOAD_BLOCKS.$result->image?>"><img alt="" src="<?=resizeImage(PATH_URL.DIR_UPLOAD_BLOCKS.$result->image,250)?>" /></a>
									</div>
									<?php }} ?>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-3">Category <span class="required" aria-required="true">*</span></label>
							<div class="col-md-2">
								<select class="form-control" name="category_idAdmincp">
									<option value="">--- Choose Category ---</option>
									<?php
										if($category){
											foreach($category as $v){
									?>
									<option <?php if(isset($result->category_id)){if($result->category_id==$v->id){ print 'selected="selected"'; }} ?> value="<?=$v->id?>"><?=$v->name?></option>
									<?php }} ?>
								</select>
							</div>
						</div>
						<?php if(isset($this->lang->languages)){ ?>
						<div class="form-group last" style="padding-bottom:0;">
							<label class="control-label col-md-3">Language</label>
							<div class="col-md-9">
								<ul class="nav nav-tabs">
									<?php $flag = false; ?>
									<?php foreach ($all_lang as $key => $value) { ?>
										<li class="<?= $flag == false ? 'active' : ''; $flag = true; ?>"><a href="#<?=$value?>" data-toggle="tab" aria-expanded="true"><?=ucwords($value)?></a></li>
									<?php } ?>
								</ul>
							</div>
						</div>
						<?php } ?>
						<div class="tab-content">
							<?php $flag = false; ?>
							<?php
								foreach ($all_lang as $key => $value){
									$name = ($key!='') ? 'name_'.$key : 'name';
									$js = ($key!='') ? 'src_js_'.$key : 'src_js';
									$css = ($key!='') ? 'src_css_'.$key : 'src_css';
									$source = ($key!='') ? 'source_'.$key : 'source';
									$json = ($key!='') ? 'json_'.$key : 'json';
							?>
							<div class="tab-pane fade <?=$flag == false ? 'active in' : ''; $flag = true; ?>" id="<?=$value?>">
								<div class="form-group">
									<label class="control-label col-md-3">Name<?php ($key!='') ? print ' ('.mb_strtoupper($key).')' : print '' ?> <span class="required" aria-required="true">*</span></label>
									<div class="col-md-9"><input data-required="1" value="<?php if(isset($result->$name)) { print $result->$name; }else{ print '';} ?>" type="text" name="name<?php ($key!='') ? print '_'.$key : print '' ?>Admincp" id="name<?php ($key!='') ? print '_'.$key : print '' ?>Admincp" class="form-control"/></div>
								</div>
								
								<div class="form-group">
									<label class="control-label col-md-3">HTML<?php ($key!='') ? print ' ('.mb_strtoupper($key).')' : print '' ?> <span class="required" aria-required="true">*</span></label>
									<div class="col-md-9"><textarea data-required="1" name="source<?php ($key!='') ? print '_'.$key : print '' ?>Admincp" cols="" rows="9"><?php if(isset($result->$source)) { print $result->$source; }else{ print '';} ?></textarea></div>
								</div>
								
								<div class="form-group">
									<label class="control-label col-md-3">JSON<?php ($key!='') ? print ' ('.mb_strtoupper($key).')' : print '' ?> <span class="required" aria-required="true">*</span></label>
									<div class="col-md-9"><textarea data-required="1" name="json<?php ($key!='') ? print '_'.$key : print '' ?>Admincp" cols="" rows="9"><?php if(isset($result->$json)) { print $result->$json; }else{ print '';} ?></textarea></div>
								</div>
								
								<div class="form-group">
									<label class="control-label col-md-3">Javascript<?php ($key!='') ? print ' ('.mb_strtoupper($key).')' : print '' ?></label>
									<div class="col-md-9"><input data-required="1" value="<?php if(isset($result->$js)) { print $result->$js; }else{ print '';} ?>" type="text" name="js<?php ($key!='') ? print '_'.$key : print '' ?>Admincp" class="form-control"/></div>
								</div>
								
								<div class="form-group last">
									<label class="control-label col-md-3">CSS<?php ($key!='') ? print ' ('.mb_strtoupper($key).')' : print '' ?></label>
									<div class="col-md-9"><input data-required="1" value="<?php if(isset($result->$css)) { print $result->$css; }else{ print '';} ?>" type="text" name="css<?php ($key!='') ? print '_'.$key : print '' ?>Admincp" class="form-control"/></div>
								</div>
							</div>
							<?php } ?>
						</div>
					</div>
					<div class="form-actions">
						<div class="row">
							<div class="col-md-offset-3 col-md-9">
								<button onclick="save()" type="button" class="btn green"><i class="fa fa-pencil"></i> Save</button>
								<a href="<?=PATH_URL_ADMIN.$module.'/#/back'?>"><button type="button" class="btn default">Cancel</button></a>
							</div>
						</div>
					</div>
				</form>
				<!-- END FORM-->
			</div>
		</div>
		<!-- END EXAMPLE TABLE PORTLET-->
	</div>
</div>
<!-- END PAGE CONTENT-->