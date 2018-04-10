<!DOCTYPE html>
<html>
<head>
	<title>Editor demo</title>
	<script type="text/javascript" src="<?=get_resource_url('assets/wysiwyg_editor/jquery-2.1.1.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/admin/uploader/jquery.plupload.queue.js')?>" type="text/javascript"></script>
	<script type="text/javascript" src="<?=get_resource_url('assets/wysiwyg_editor/tinymce/tinymce.min.js')?>"></script>
	<script type="text/javascript">
		tinymce.init({
		    selector: '#mytextarea',
		    plugins: "code, link, image, lists, preview, textcolor, pix_embed_online_media, responsivefilemanager",
		    toolbar: ['undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect forecolor backcolor | bullist numlist outdent indent | link image | print preview media fullpage removeformat','pix_embed_online_media | responsivefilemanager'],
		    external_filemanager_path:"../filemanager/",
   			filemanager_title:"Responsive Filemanager" ,
   			relative_urls: false,
   			// external_plugins: { "filemanager" : "/filemanager/plugin.min.js"}
			  // toolbar: "anchor",
			  // menubar: "insert"
		});
	</script>
</head>
<body>
	<h1>TinyMCE Quick Start Guide</h1>
	<form method="post">
		<textarea id="mytextarea"></textarea>
	</form>

</body>
</html>