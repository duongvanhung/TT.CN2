/**
 *
 *
 * @author Josh Lobe
 * http://ultimatetinymcepro.com
 */
 
jQuery(document).ready(function($) {
	
	// Declare window variable
	// var this_youtube_window = top.tinymce.activeEditor;
	
	// Set focus to 'search' field
	$('#youtube_source').focus();
	
	// Action buttons
	$('#youtube_cancel').click(function() {
		
		this_youtube_window.windowManager.close();
	});
	$('#youtube_insert').click(function() {
		
		// Get link from input box
		this_link = $('#youtube_url').val();
		this_link = this_link.replace('http:','');
		this_link = this_link.replace('watch?v=','embed/');
		
		// If no link.. alert user
		if(this_link == '') {
			
			alert('Please select a video; or enter a "YouTube Url" video link.');
			return false;
		}
		
		
		// Get user defined width and height
		this_width = $('#youtube_width').val();
		this_height = $('#youtube_height').val();
		
		// Get checkbox values
		autoplay = $('#youtube_autoplay').is(':checked');
		rel = $('#youtube_rel').is(':checked');
		
		// Add appropriate options if user selected
		if(autoplay != false || rel != false) {
			this_link += '?showinfo=1';
		}
		if(autoplay == true) {
			this_link += '&autoplay=1';
		}
		if(rel == true) {
			this_link += '&rel=1';
		}
		
		// Assemble final link
		final_link = '<iframe width="'+this_width+'" height="'+this_height+'" src="'+this_link+'" frameborder="0" allowfullscreen></iframe>';
		
		this_youtube_window.execCommand('mceInsertContent', !1, final_link);  // Insert content into editor
		this_youtube_window.windowManager.close();  // Close window
	});
	
	// Determine if enter key was pressed on search field
	$("#queryinput").keyup(function(event){
		if(event.keyCode == 13){
			$("#search_youtube").click();  // Run 'Search' button function
		}
	});

	function make_youtube_url() {
		//https://youtu.be/oVwEiNdpKeE?t=52s
		//https://www.youtube.com/watch?v=oVwEiNdpKeE&t=355s
		// var youtube_url = $("#youtube_url").val();
		// alert('length video '+youtube_url.length());
		if(youtube_url.length == 0) {
			return false;
		}
		var video_id = '';
		var endpoint = 'https://www.youtube.com/embed/';
		var autoplay = ($('#youtube_autoplay').is(':checked') == true) ? '&autoplay=1' : '';
		var controls = ($('#youtube_controls').is(':checked') == true) ? '&controls=1' : '';
		var showinfo = ($('#youtube_showinfo').is(':checked') == true) ? '&showinfo=1' : '';
		var rel = ($('#youtube_rel').is(':checked') == true) ? '&rel=1' : '';
		var result = endpoint + video_id + autoplay + controls + showinfo + rel;
		return result;
	}
	
	// Convert seconds to h:m:s
	function convertSeconds(s) {
		var h = Math.floor(s/3600);
		s -= h*3600;
		var m = Math.floor(s/60);
		s -= m*60;
		return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); // Zero padding on minutes and seconds
	}
	
});