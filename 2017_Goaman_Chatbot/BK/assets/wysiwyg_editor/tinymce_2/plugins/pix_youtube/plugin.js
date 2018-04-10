jQuery(document).ready(function($) {
	
	tinymce.PluginManager.add('pix_youtube', function(editor, url) {
		
		editor.addButton('pix_youtube', {
			image: url + '/images/youtube.png',
			tooltip: 'YouTube Video',
			onclick: open_pix_youtube
		});
		
		function open_pix_youtube() {
			editor.windowManager.open({
				title: 'Embed YouTube Video',
				width: 600,
				height: 400,
				url: url+'/pix_youtube.html'
			})
		}

	});

});