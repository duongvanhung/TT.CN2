<!-- <script type="text/javascript" src="<?=PATH_URL.'assets/editor/scripts/innovaeditor.js'?>"></script>
<script type="text/javascript" src="<?=PATH_URL.'assets/editor/scripts/innovamanager.js'?>"></script> -->
<script type="text/javascript" src="<?=PATH_URL.'assets/js/admin/'?>jquery.slugit.js"></script> 

<!-- <script type="text/javascript" src="<?=get_resource_url('assets/wysiwyg_editor/jquery-2.1.1.js')?>"></script> -->
<script src="<?=get_resource_url('assets/js/admin/uploader/jquery.plupload.queue.js')?>" type="text/javascript"></script>
<script type="text/javascript" src="<?=get_resource_url('assets/wysiwyg_editor/tinymce/tinymce.min.js')?>"></script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCiJHmYESPNUKsb6YIVaYIOivKZPTQnJ2M&amp;libraries=places"></script>

<script src="<?=PATH_URL.'assets/js/tags/'?>jquery-ui.min.js" type="text/javascript"></script>

<script src="<?=PATH_URL.'assets/js/'?>tag-it.js" type="text/javascript" charset="utf-8"></script>

<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<link href="<?=PATH_URL.'assets/css/'?>jquery.tagit.css" rel="stylesheet" type="text/css">
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
$(document).ready( function(){
    <?php foreach($all_lang as $key=>$val){ ?>
    $("#title<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp").slugIt({
        events: 'keyup blur',
        output: '#slug<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp',
        map: {'!':'-'},
        space: '-'
    });

    tinymce.init({    
            selector: '#content<?php echo ($key!='') ?  '_'.$key : '' ?>Admincp',
            plugins: "code, link, image, lists, preview, textcolor, pix_embed_online_media, responsivefilemanager",
            toolbar: ['undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect forecolor backcolor | bullist numlist outdent indent | link image | print preview media fullpage removeformat','pix_embed_online_media | responsivefilemanager'],
            external_filemanager_path:"<?=PATH_URL?>/filemanager/",
            filemanager_title:"Responsive Filemanager" ,
            relative_urls: false,
            //external_plugins: { "filemanager" : "assets/filemanager/plugin.min.js"}

              // toolbar: "anchor",
              // menubar: "insert"
        });
    //End FOR WYSIWYG content
    <?php } ?>
});

function save(){
    //IMPORTANT: Binding HTML-value editor to textarea content. - DO NOT REMOVE
    <?php foreach($all_lang as $key=>$val){ ?>
        var content_html = tinyMCE.get('content<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp').getContent();
        $('#content<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp').val(content_html);
    <?php } ?>
    var options = {
        beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse  // post-submit callback 
    };
    
    $('#frmManagement').ajaxSubmit(options);
}

function showRequest(formData, jqForm, options) {
    var form = jqForm[0];
    var content_html = '';
    <?php if(empty($id)) { ?>
    if (
        form.thumbnail_urlAdmincp.value == '' || 
        form.image_urlAdmincp.value == ''
    ) {
        $('#txt_error').html('Please Upload image.');
        show_perm_denied();
        return false;
    }
    <?php } ?>

    <?php foreach($all_lang as $key=>$val){ ?>
    if (
        form.title<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp.value == '' || 
        form.slug<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp.value == '' 

    ) {
        $('#txt_error').html('Please enter Title <?=$key?>.');
        show_perm_denied();
        return false;
    }
    if (      
        form.description<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp.value == ''
    ) {
        $('#txt_error').html('Please enter Description <?=$key?>.');
        show_perm_denied();
        return false;
    }
    if (
        form.content<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp.value == '<br />' || 
        form.content<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp.value == '' || 
        form.content<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp.value == "\n"

    ) {
        $('#txt_error').html('Please enter Content <?=$key?>.');
        show_perm_denied();
        return false;
    }

    <?php } ?>
//
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
    if(responseText[0]=='error-title<?php echo ($key!='') ?  '-_'.$key :  '' ?>-exists'){
        $('#txt_error').html('Title<?php echo ($key!='') ?  ' ('.mb_strtoupper($key).')' :  '' ?> already exists.');
        show_perm_denied();
        $('#title<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp').focus();
        return false;
    }
    
    if(responseText[0]=='error-slug<?php echo ($key!='') ?  '-_'.$key :  '' ?>-exists'){
        $('#txt_error').html('Slug<?php echo ($key!='') ?  ' ('.mb_strtoupper($key).')' :  '' ?> already exists.');
        show_perm_denied();
        $('#slug<?php echo ($key!='') ?  '_'.$key :  '' ?>Admincp').focus();
        return false;
    }
    <?php } ?>

    if(responseText[0]=='permission-denied'){
        $('#txt_error').html('Permission denied.');
        show_perm_denied();
        return false;
    }
}


$(document).ready(function() {                              
    $('#time_from, #time_to').timepicker(); 
});
</script>
<!-- BEGIN PAGE HEADER-->
<h3 class="page-title"><?=$this->session->userdata('Name_Module')?></h3>
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li><i class="fa fa-home"></i><a href="<?=PATH_URL_ADMIN?>">Home</a><i class="fa fa-angle-right"></i></li>
        <li><a href="<?=PATH_URL_ADMIN.$module?>"><?=$this->session->userdata('Name_Module')?></a><i class="fa fa-angle-right"></i></li>
        <li><?php echo ($this->uri->segment(4)=='') ?  'Add new' :  'Edit' ?></li>
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

                        <?php /*get avatar url*/
                            $image_url = ( ! empty($result->image) ) ? get_resource_url($result->image) : '';
                            $thumbnail_url = ( ! empty($result->thumbnail) ) ? get_resource_url($result->thumbnail) : null;
                        ?>
                        <div class="form-group">
                            <label class="control-label col-md-3">Image <span class="required" aria-required="true">*</span></label>
                            <div class="col-md-3">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="input-group input-large">
                                        <div class="col-md-4 col-xs-12">
                                           <div>
                                                <input type="button" name="input_avatar" value="Select File" class="update-img-upload " id="cropContainerHeaderButton" />
                                                <!-- image thumbnail -->
                                                <input type="hidden" id="input_thumbnail_url" name="thumbnail_urlAdmincp">
                                                <!-- image original -->
                                                <input type="hidden" id="input_image_url" name="image_urlAdmincp">

                                            </div>
                                            <div class="img-profile">
                                                <div id="cropic_element" style="display:none"></div>
                                                <a class="fancybox-button" id="preview_image_fancybox" href="<?=$image_url?>">
                                                    <img id="preview_image" src="<?=$thumbnail_url?>"> 
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div class="form-group">
                            <label class="control-label col-md-3">Featured</label>
                            <div class="col-md-9">
                                <div class="checkbox-list">
                                    <label class="checkbox-inline">
                                        <div class="checkbox"><span><input <?php if(isset($result->featured)){ if($result->featured==1){ ?>checked="checked"<?php }}else{ ?>checked="checked"<?php } ?> type="checkbox" name="featured"></span></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                    
                        <div class="form-group">
                                <label class="control-label col-md-3">Featured from</label>
                                <div class="col-md-3">
                                    <div class="input-group input-large date-picker input-daterange" data-date-format="yyyy-mm-dd">
                                        <input value="<?php echo(isset($result->featured_from)) ? date("Y-m-d",strtotime($result->featured_from)) : '' ?>" type="date" name="featured_from_date" id="date_from" class="form-control"/>
                                    </div>
                                </div>
                           
                                <label class="control-label col-md-1">Time</label>
                                <div class="col-md-3">                      
                                    <div>
                                        <input value="<?php echo(isset($result->featured_from)) ? date("h:i A",strtotime($result->featured_from)) : '' ?>" type="text" name="featured_from_time" id ='time_from'  class="form-control center"/>
                                    </div>
                                </div>
                         </div>

                        <div class="form-group">
                                <label class="control-label col-md-3">Featured to</label>
                                <div class="col-md-3">
                                    <div class="input-group input-large date-picker input-daterange" data-date-format="yyyy-mm-dd">
                                        <input value="<?php echo(isset($result->featured_to)) ? date("Y-m-d",strtotime($result->featured_to)) : '' ?>" type="date" name="featured_to_date" id="date_to" class="form-control"/>
                                    </div>
                                </div>
                           
                                <label class="control-label col-md-1">Time</label>
                                <div class="col-md-3">                      
                                    <div>
                                        <input value="<?php echo(isset($result->featured_to)) ? date("h:i A",strtotime($result->featured_to)) : '' ?>" type="text" name="featured_to_time" id='time_to'  class="form-control center"/>
                                    </div>
                                </div>
                         </div>


                        <div class="form-group">
                            <label class="control-label col-md-3">Category <span class="required" aria-required="true">*</span></label>
                            <div class="col-md-9">
                                <select onChange="getPerm(this.value)" class="form-control" name="categoryAdmincp" id="groupAdmincp">
                                    <?php
                                        if(!empty($list_category)){
                                            foreach($list_category as $value){
                                    ?>
                                    <option 
                                        <?php echo ( isset($result->category_id) && ($result->category_id == $value->id) ) ? 'selected' : ''; ?> 
                                        value="<?=$value->id?>">
                                            <?=$value->name?>
                                    </option>
                                    <?php } } ?>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <script type="text/javascript">
                                function initialize4() {
                                var options = {types: ['(regions)']};
                                var input = document.getElementById('countryAdmincp');
                                var autocomplete = new google.maps.places.Autocomplete(input , options);
                                    google.maps.event.addListener(autocomplete, 'place_changed', 
                                        function() {
                                        var address_components=autocomplete.getPlace().address_components;
                                        var city='';
                                        var country='';
                                        for(var j =0 ;j<address_components.length;j++)
                                         {
                                        city =address_components[0].short_name;
                                        if(address_components[j].types[0]=='country')
                                        {
                                           country=address_components[j].short_name;
                                        }
                                        }
                                         //document.getElementById('data').innerHTML="City Name : <b>" + city + "</b> <br/>Country Name : <b>" + country + "</b>";
                                        document.getElementById('articles-country').value = country;
                                        document.getElementById('articles-city').value = city;
                                        });
                                }
                                google.maps.event.addDomListener(window, 'load', initialize4);
                            </script>
                            <label class="control-label col-md-3">
                                Location
                                <span class="required" aria-required="true">*</span>
                            </label>
                            <div class="col-md-9">
                                <input data-required="1" type="text" class="form-control" 
                                    name="countryAdmincp" 
                                    id="countryAdmincp" 
                                    value="<?php echo(isset($result->location) ? $result->location : '') ?>"
                                    />
                                <input type="hidden" name="country" id="articles-country" value="<?php echo(isset($result->country) ? $result->country : '') ?>">
                                <input type="hidden" name="city" id="articles-city" value="<?php echo(isset($result->city) ? $result->city : '') ?>">

                            </div>
                        </div>
                            <div class="form-group">
                            <script type="text/javascript">
                                $(document).ready(function() {
                                    $("#tagsAdmincp").tagit({ 
                                        autocomplete: {delay: 0, minLength: 2},
                                        showAutocompleteOnFocus: false,
                                        removeConfirmation: false,
                                        caseSensitive: true,
                                        allowDuplicates: false,
                                        allowSpaces: false,
                                        readOnly: false,
                                        tagLimit: null,
                                        singleField: false,
                                        singleFieldDelimiter: ',',
                                        singleFieldNode: null,
                                        tabIndex: null,
                                        placeholderText: null,

                                        // Events
                                        beforeTagAdded: function(event, ui) {
                                            console.log(ui.tag);
                                        },
                                        afterTagAdded: function(event, ui) {
                                            console.log(ui.tag);
                                        },
                                        beforeTagRemoved: function(event, ui) {
                                            console.log(ui.tag);
                                        },
                                        onTagExists: function(event, ui) {
                                            console.log(ui.tag);
                                        },
                                        onTagClicked: function(event, ui) {
                                            console.log(ui.tag);
                                        },
                                        onTagLimitExceeded: function(event, ui) {
                                            console.log(ui.tag);
                                        }
                                    });
                                });
                            </script>
                                    <label class="control-label col-md-3">
                                        Tags 
                                      
                                    </label>
                                    <div class="col-md-9" data-name="tags-input">
                                        <input data-required="1" type="text" class="form-control"
                                            name="tagsAdmincp" 
                                            id="tagsAdmincp" 
                                            value="<?php echo (isset($result->tags) ? $result->tags : '') ?>"/>
                                            
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
                                    $title = ($key!='') ? 'title_'.$key : 'title';
                                    $slug = ($key!='') ? 'slug_'.$key : 'slug';

                                    $title_lable = ($key!='') ?  ' ('.mb_strtoupper($key).')' :  '';
                                    $title_id = ($key!='') ?  '_'.$key :  '';

                                    $slug_lable = ($key!='') ?  ' ('.mb_strtoupper($key).')' :  '';
                                    $slug_id = ($key!='') ?  '_'.$key :  '';

                                    $description_lable = ($key!='') ?  ' ('.mb_strtoupper($key).')' :  '';
                                    $description_id = ($key!='') ?  '_'.$key :  '';

                                    $content_lable = ($key!='') ?  ' ('.mb_strtoupper($key).')' :  '';
                                    $content_id = ($key!='') ?  '_'.$key :  '';


                                    //$country = ($key!='') ? 'country_'.$key : 'country';
                                    //description, content
                            ?>
                            <div class="tab-pane fade <?=$flag == false ? 'active in' : ''; $flag = true; ?>" id="<?=$value?>">
                                <div class="form-group">
                                    <label class="control-label col-md-3">
                                        Title<?php echo $title_lable ?> 
                                        <span class="required" aria-required="true">*</span>
                                    </label>
                                    <div class="col-md-9">
                                        <input data-required="1" type="text" class="form-control" 
                                            name="title<?php echo $title_id ?>Admincp" 
                                            id="title<?php echo $title_id ?>Admincp"
                                            value="<?php echo (isset($result->data_lang[$key]->title) ? $result->data_lang[$key]->title : '') ?>"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">
                                        Slug<?php echo $slug_lable ?> 
                                        <span class="required" aria-required="true">*</span>
                                    </label>
                                    <div class="col-md-9">
                                        <input data-required="1" type="text" class="form-control" 
                                            name="slug<?php echo $slug_id ?>Admincp" 
                                            id="slug<?php  echo $slug_id ?>Admincp" 
                                            value="<?php echo (isset($result->data_lang[$key]->slug) ? $result->data_lang[$key]->slug : '') ?>"
                                            />
                                            </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">
                                        Description<?php echo $description_lable ?> 
                                        <span class="required" aria-required="true">*</span>
                                    </label>
                                    <div class="col-md-9">
                                        <textarea data-required="1" cols="" rows="6" maxlength="300" placeholder="Enter no more than 300 characters"
                                            name="description<?php echo $description_id ?>Admincp"><?php echo (isset($result->data_lang[$key]->description) ? $result->data_lang[$key]->description : '') ?></textarea>
                                    </div>
                                </div>
                                <div class="form-group last">
                                    <label class="control-label col-md-3">
                                        Content<?php echo $content_lable ?>
                                        <span class="required" aria-required="true">*</span>
                                    </label>
                                    <div class="col-md-9">
                                        <textarea data-required="1" cols="" rows="8" 
                                                name="content<?php echo $content_id ?>Admincp" 
                                                id="content<?php echo $content_id ?>Admincp"><?php echo (isset($result->data_lang[$key]->content) ? $result->data_lang[$key]->content : '') ?></textarea>
                                    </div>
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

<style type="text/css">
    #cropic_element {
        height: 200px;
        width: 200px;
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
            onAfterImgCrop:function(){ appendAward(); },
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