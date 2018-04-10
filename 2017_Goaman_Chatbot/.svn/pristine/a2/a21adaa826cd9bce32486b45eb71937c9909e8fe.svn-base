<script type="text/javascript">

function save(){
	var options = {
		beforeSubmit:  showRequest,  // pre-submit callback 
		success:       showResponse  // post-submit callback 
    };
	$('#frmManagement').ajaxSubmit(options);
}

function showRequest(formData, jqForm, options) {
	var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	var form = jqForm[0];
	var phoneInput = form.phone.value;
	if(phoneInput != ""){
		if(!phoneRegex.test(phoneInput)){
			$('#txt_error').html('Phone format not match!!!');
			$('#loader').fadeOut(300);
			show_perm_denied();
			return false;
		}
	}
	if(form.firstname.value == '' || form.lastname.value == '' || form.email.value == '' <?php if($id == 0){ ?>  || form.password.value == '' <?php } ?>){
		$('#txt_error').html('Please enter information!!!');
		$('#loader').fadeOut(300);
		show_perm_denied();
		return false;
	}
	<?php if($id==0){ ?>
	if(form.firstname.value == ''){
		$('#txt_error').html('Please enter information!!!');
		$('#loader').fadeOut(300);
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
		show_perm_success();
	}

	if(responseText[0]=='permission-denied'){
		$('#txt_error').html('Permission denied.');
		show_perm_denied();
		return false;
	}
	
	if(responseText[0]=='error-email-exists'){
		$('#txt_error').html('Email already exists.');
		show_perm_denied();
		$('#email').focus();
		return false;
	}
	if(responseText[0]=='fail_validate'){
		var html = '';
		for (var i = 1; i < responseText.length; i++) {
			html += responseText[i];
		}
		$('#txt_error').html(html);
		show_perm_denied();
	}
}

function get_cities(countryID, city_id = 0){
	if(countryID == 0){
		$('#city').val('0').prop('disabled', 'disabled');
		return;
	}
	$.post('<?=PATH_URL_ADMIN.'admincp_users/ajaxLoadCities/'?>',{
		'countryID': countryID,
		'cityID': city_id,
		csrf_token: token_value
	},function(data){
		$('#city').html(data).prop('disabled', false);
	});

}

function showProUserType(userRole){
	if(userRole == <?=USER_ROLE_PRO?>){
		$('#proUserRole').fadeIn('800');
	} else {
		$('#proUserRole').fadeOut('800');
	}
}

$(document).ready(function() {
	// $('#country').select2();
	// $('#city').select2();
	$('#city').prop('disabled', 'disabled');
	$('#proUserRole').hide();

	get_cities($('#country').val(), <?=isset($result->city_id) ? $result->city_id : 0 ?>);

	var userRole = $('#user_role').val();
	if(userRole == <?=USER_ROLE_PRO ?>){
		$('#proUserRole').show();
	}


});
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
										<input <?php if(isset($result->status)){ if($result->status==1){ ?>checked="checked"<?php }}else{ ?>checked="checked"<?php } ?> type="checkbox" name="status">
									</label>
								</div>
							</div>
						</div>

						
						<div class="form-group">
							<label class="control-label col-md-3">Facebook ID <span class="required" aria-required="true">*</span></label>
							<div class="col-md-9"><input value="<?=$result->uid?>" type="text" name="firstname" id="firstname" class="form-control"/></div>
						</div>

						<div class="form-group">
							<label class="control-label col-md-3">Conversation <span class="required" aria-required="true">*</span></label>
						</div>
						
						<?php 
							if($question0){
							?>
							<div class="form-group">
								<label class="control-label col-md-3">Answer</label>
								<div class="col-md-9">
									<input value="<?=$question0[0]->answer?>" type="text" name="lastname" id="lastname" class="form-control"/>
								</div>
							</div>
							<?php
							}
						?>
								
							<?php
							if(!empty($conversation)){
								foreach($conversation as $conver){
									?>
									<div class="form-group">
										<label class="control-label col-md-3">Question: <?=$conver->question_id?> </label>
										<div class="col-md-9">
											<input value="<?=$conver->question?>" type="text" name="lastname" id="lastname" class="form-control"/>
										</div>
									</div>
									<div class="form-group">
										<label class="control-label col-md-3">Answer:</label>
										<div class="col-md-9">
											<input value="<?=$conver->answer?>" type="text" name="lastname" id="lastname" class="form-control"/>
										</div>
									</div>
									<?php
								}
							}
						?>
						
					</div>
				</form>
				<!-- END FORM-->
			</div>
		</div>
		<!-- END EXAMPLE TABLE PORTLET-->
	</div>
</div>
<!-- END PAGE CONTENT-->

<style type="text/css">
	#cropic_element {
		height: 200px;
		width: 200px;
	}

	#preview_image{
		margin-top: 10px;
	}
</style>


<script>
    var croppicHeaderOptions = {
            
            uploadUrl:"<?=get_resource_url('img_upload_to_file.php')?>",
            cropUrl:"<?=get_resource_url('img_crop_to_file.php')?>",
            uploadData:{'prefix':'avatar_'},
            enableMousescroll:true,
            customUploadButtonId:'cropContainerHeaderButton',
            outputUrlId:'input_thumbnail_url',
            modal:true,
            rotateControls: false,
            doubleZoomControls:false,
            imgEyecandyOpacity:0.4,
            onBeforeImgUpload: function(){ },
            onAfterImgUpload: function(){ appendOriginImageAward(); },
            onImgDrag: function(){ },
            onImgZoom: function(){ },
            onBeforeImgCrop: function(){ },
            onAfterImgCrop:function(){appendAward(); },
            onReset:function(){ onResetCropic(); },
            onError:function(errormessage){ console.log('onError:'+errormessage) }
    }   
    var croppic = new Croppic('cropic_element', croppicHeaderOptions);
    function appendOriginImageAward() {
        var url_origin = $("div#croppicModalObj > img").attr('src');
        $('#input_image_url').val(url_origin);
        $("#preview_image_fancybox").attr("href", $('#input_image_url').val());
    }
    function appendAward(){
        $("#preview_image").attr("src", $('#input_thumbnail_url').val());
        $("#preview_image").show();
    }
    function onResetCropic(){
    	$('#input_image_url').val('');
    	$('#input_thumbnail_url').val('');
    	$("#preview_image_fancybox").attr("href", '');
    	$("#preview_image").attr("src", '');
    }
   
</script>