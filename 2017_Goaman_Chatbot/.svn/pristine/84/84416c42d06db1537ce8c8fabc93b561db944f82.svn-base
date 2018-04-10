jQuery(document).ready(function($) {
	
	tinymce.PluginManager.add('pix_embed_online_media', function(editor, url) {
		
		editor.addButton('pix_embed_online_media', {
			image: url + '/images/icon.png',
			tooltip: 'Embed Online Media',
			onclick: open_pix_embed_online_media
		});
		
		function open_pix_embed_online_media() {
			editor.windowManager.open({
				title: 'Embed Online Media',
				width: 600,
				// height: 'auto',
				url: url+'/pix_embed_online_media.php'
			})
		}

	});

});