/*BEGIN: DEBUG*/
function pr(message){
	if(console && console.log){
		console.log(message);
	}
}
function pr_test(message){
	var current_url = location.href;
	var is_debugging = current_url.indexOf('?test=1') != -1;
	if(is_debugging){
		pr(message);
	}
}
/*END: DEBUG*/


/*Begin: Popup vertical scrollbar */
// Problem caused by jele.modal() - Example: $("#modal-export").modal(); OR $("#modal-editor-icon").modal();
function popup_scrollbar_toggle_fix(){
	setTimeout(function(){
		$('body').css('overflow', 'visible');
	}, 500);
}

$(window).on("load", function() {
	// Popup - Fix missing vertical scrollbar
	popup_scrollbar_toggle_fix();
});
/*End: Popup vertical scrollbar*/

/*BEGIN: COOKIE */
var store_var = {};
var store_is_var = true;
var is_save_permanent = false;
var store_var_permanent = {};
function cookie_is_enabled(){
	return typeof(Storage) !== "undefined";
}

function cookie_get(key){
	var cookie_value = null;
	if(store_is_var){
		if(store_var && store_var[key]){
			cookie_value = store_var[key];
		}
	} else {
		if(Storage && localStorage.getItem(key)){
			cookie_value = localStorage.getItem(key);
		}
	}
	
	return cookie_value;
}
function cookie_get_html_body(page_id){
	return cookie_get("full_page_"+page_id);
}
function cookie_get_html_css(page_id){
	return cookie_get("full_css_"+page_id);
}
function cookie_get_html_script(page_id){
	return cookie_get("full_script_"+page_id);
}

function cookie_set(key, value){
	if(store_is_var){
		store_var[key] = value;
	} else {
		if(Storage){
			localStorage.setItem(key, value);
		}
	}
	if(is_permanent && is_save_permanent){
		store_var_permanent[key] = value;
	}
	return -1;
}
function cookie_set_html_body(page_id, value){
	return cookie_set("full_page_"+page_id, value);
}
function cookie_set_html_css(page_id, value){
	return cookie_set("full_css_"+page_id, value);
}
function cookie_set_html_script(page_id, value){
	return cookie_set("full_script_"+page_id, value);
}
function cookie_upload(url, json_text){
	var store_var_permanent_json = $.toJSON(store_var_permanent);
	// pr('cookie_upload - store_var_permanent_json');
	// pr(store_var_permanent_json);
	store_var_permanent = {}; // Reset
	$.post(url, {'cookie_data':store_var_permanent_json, 'json_text' : json_text},function(response){
		pr('response = ' + response);
	});
}
function cookie_download(url, callback_func){
	pr('cookie_download - url = ' + url);
	store_var_permanent = {}; // Reset
	$.post(url, {},function(response){
		var data_json = $.parseJSON(response);
		var store_var_permanent = $.parseJSON(data_json['cookie_data']);
		// pr('response = ' + response);
		// pr('cookie_download - store_var_permanent');
		// pr(store_var_permanent);
		if(Storage){
			var key_arr = ['full_page_page1', 'full_css_page1', 'full_script_page1'];
			for(var i=0; i<key_arr.length; i++){
				var key = key_arr[i];
				var value = '';
				if(store_var_permanent && store_var_permanent.hasOwnProperty(key)){
					value = store_var_permanent[key];
				}
				localStorage.setItem(key, value);
				pr('cookie_download - key = '+key);
				pr('cookie_download - value = '+value);
			}
		}
		
		if(callback_func && typeof(callback_func) =='function'){
			callback_func();
		}
	});
}

function cookie_delete(key){
	if(store_is_var){
		if(store_var && store_var[key]){
			delete store_var[key];
		}
	} else {
		if(Storage && localStorage.getItem(key)){
			localStorage.removeItem(key);
		}
	}
	
	return -1;
}
function cookie_delete_html_body(page_id){
	return cookie_delete("full_page_"+page_id);
}
function cookie_delete_html_css(page_id){
	return cookie_delete("full_css_"+page_id);
}
function cookie_delete_html_script(page_id){
	return cookie_delete("full_script_"+page_id);
}
function cookie_delete_old_data(){
	if(cookie_get('all_page_list')){
		cookie_delete('full_page_index');
		cookie_delete('full_css_index');
		cookie_delete('full_script_index');
		cookie_delete('all_page_list');
	}
}

function cookie_transfer_to_var(){
	pr('cookie_transfer_to_var start');
	store_is_var = false;
	cookie_get_page_list();
	if(page_list){
		$.each(page_list, function(page_id, page_name){
			store_is_var = false;
			var html_body = cookie_get_html_body(page_id);
			var html_css = cookie_get_html_css(page_id);
			var html_script = cookie_get_html_script(page_id);
			
			store_is_var = true;
			cookie_set_html_body(page_id, html_body);
			cookie_set_html_css(page_id, html_css);
			cookie_set_html_script(page_id, html_script);
			
		})
	}
	store_is_var = true;
	pr('cookie_transfer_to_var - reset store_is_var');
	// pr('cookie_transfer_to_var - store_var');
	// pr(store_var);
	
}
function cookie_clear_cookie(){
	var key_arr = new Array();
	for ( var i = 0; i < localStorage.length; i++ ) {
		key_arr.push(localStorage.key(i));
	}
	pr('cookie_clear_cookie - key_arr');
	pr(key_arr);
	store_is_var = false;
	for ( var i = 0; i < key_arr.length; i++ ) {
		cookie_delete(key_arr[i]);
	}
	store_is_var = true;
}
function cookie_transfer_to_cookie(){
	pr('cookie_transfer_to_cookie start');
	
	cookie_clear_cookie();
	if(page_list){
		pr('cookie_transfer_to_cookie - loop before - page_list');
		pr(page_list);
		// pr('cookie_transfer_to_cookie - store_var');
		// pr(store_var);
		$.each(page_list, function(page_id, page_name){
			pr('cookie_transfer_to_cookie - loop - page_id = ' + page_id);
			
			store_is_var = true;			
			var html_body = cookie_get_html_body(page_id);
			var html_css = cookie_get_html_css(page_id);
			var html_script = cookie_get_html_script(page_id);
			
			store_is_var = false;
			cookie_set_html_body(page_id, html_body);
			cookie_set_html_css(page_id, html_css);
			cookie_set_html_script(page_id, html_script);
		})
	}
	store_is_var = false;
	cookie_set_page_list();
	
	store_is_var = true; // Reset store_is_var
	
	pr('cookie_transfer_to_cookie - end');	
}
/*END: COOKIE */

var page_list = null; // Set by cookie_get_page_list()
var page_default_id = 'page1';
var page_default_name = 'index';
var page_current_id = null;
var page_current_name = null;
function page_list_update_current_id(page_id){
	page_current_id = page_id;
	if(page_id==page_default_id){
		page_current_name = page_default_name;
	} else if(page_list && page_list[page_id]){
		page_current_name = page_list[page_id];
	}
	cookie_set_page_list();
}
function page_list_update_current_name(page_name){
	if(page_list && page_list[page_current_id]){
		page_current_name = page_name;
		page_list[page_current_id] = page_name;
	}
}
function page_list_get_page_previous_id(){
	pr('page_list_get_page_previous_id - page_current_id = ' + page_current_id);
	pr('page_list_get_page_previous_id - page_list');
	pr(page_list);
	var page_previous_id = '';
	var page_id_temp = '';
	$.each(page_list, function(page_id, page_name){
		if(!page_previous_id){
			if(page_id == page_current_id){
				page_previous_id = page_id_temp; // Stop here.
			} else {
				page_id_temp = page_id;
			}
		}
	});
	return page_previous_id;
}

function page_list_add(page_id, page_name){
	page_list[page_id] = page_name;
	
	var html = '<li class="list_page" id="'+page_id+'">\
		<a href="#" page-title="'+page_name+'" class="menu-item index-menu-item">\
			'+page_name+'\
		</a>\
		<button class="edit-change-name-page">\
			<i class="fa fa-cog" aria-hidden="true"></i>\
		</button>\
		<button class="edit-duplicate-page">\
			<i class="fa fa-files-o" aria-hidden="true"></i>\
		</button>\
		<button class="edit-remove-page">\
			<i class="fa fa-trash" aria-hidden="true"></i>\
		</button>\
		<button class="edit-success-page">\
			<i class="fa fa-floppy-o" aria-hidden="true"></i>\
		</button>\
	</li>';
	return html;
}
function page_list_delete(page_id){
	pr('page_list_delete - page_id = ' + page_id);
	if(page_list && page_list[page_id]){
		delete page_list[page_id];
	}
}

function cookie_get_page_list(){
	var page_config = cookie_get("page_config");
	try {
		page_config_json = $.parseJSON(page_config);
	} catch(err) {
		pr(err.message);
	}
	if(page_config_json && page_config_json['page_current_id']){
		page_current_id = page_config_json['page_current_id'];
	} else {
		page_current_id = page_default_id;
		page_current_name = page_default_name;
	}
	if(page_config_json && page_config_json['page_list']){
		page_list = page_config_json['page_list'];
	}
	if(!page_list || Object.keys(page_list).length == 0){
		page_list = {};
		page_list[page_default_id] = page_default_name;
	}
	
	pr('cookie_get_page_list - page_list');
	pr(page_list);
	pr('cookie_get_page_list - page_current_id = ' + page_current_id);
}
function cookie_set_page_list(){
	var page_config_json = {'page_current_id' : page_current_id, 'page_list' : page_list};
	var page_config = $.toJSON(page_config_json);
	cookie_set("page_config", page_config);
}

$(document).ready(function(){
    // menu control
    $('body').click(function(){
        if( $('.menu-container').hasClass('opened') ){
            $('.menu-icon').trigger('click');
        }
    });
    $('.menu-container').click(function(e){
        e.stopPropagation();
    });
   	//add new fix hover show
   	$('#nav-menu').mouseover(function(){
   		$('.menu-container').addClass('opened');
   	});
    $('.menu-icon').click(function(){
        // $('.menu-container').toggleClass('opened');
        if( !$('.menu-container').hasClass('opened') ){
            $('.menu-expand').removeClass('active');
        }
    });
	
	$('#nav-menu').mouseleave(function(){
		$('.menu-expand').removeClass('active');
		$('.menu-container').removeClass('opened');
	})
	
    $('.menu-container li.block-select').click(function(){
        $('.menu-container li.block-select').removeClass('active');
        $(this).addClass('active');

        $('.menu-expand').addClass('active');
    });

    // set modal popup content max height and scrollable
    $('.modal').on('show.bs.modal', function() {
        $(this).show();
        setModalMaxHeight(this);
    });

    $(window).resize(function() {
        if ($('.modal.in').length != 0) {
            setModalMaxHeight($('.modal.in'));
        }
    });

    // button click open dialog
    $('.btn').click(function(e){
        var modal_id = $(this).attr('data-dialog');
        //$('#'+modal_id).modal({backdrop: "static"});
        $('#'+modal_id).modal();
    });

    // markup modal
    $('#export-markup-modal .modal-footer .btn').click(function(e){
        if( $(this).attr('id') === 'btn-save-markup'){

        }
        if( $(this).attr('id') === 'btn-buy-markup'){

        }
        if( $(this).attr('id') === 'btn-export-markup'){

        }
        
        $('#export-markup-modal').modal('hide');

    });
	
	$('#btn-export').click(function(){
		// $("#modal-alert-purchase").modal();
		$("#modal-export").modal();
	})
	
	$('#btn-save-permanent').click(function(){
		save_page_permanent();
	})

    //choose background popup
    $("#myRange").change(function(){
		$('#bg_variance').val($(this).val());
    });
    $("#myRange1").change(function(){
        $('#bg_cell_size').val($(this).val());
    });
    $(".choose-color > div > div").click(function(){
        $(".choose-color > div > div").removeClass("active");
        $(this).addClass("active");
        // $('#bg_color').val($(this).children("img").attr("data-color"));
        color_canvas=$(this).children("img").attr("data-color");
        $("#canvas1").children().remove();
        $("#canvas2").children().remove();
        //canvas 2
        var pattern = Trianglify({
	        width: $("#modal-editor-bg .choose-color-right #canvas2").width(),
	        height: 210,
	        x_colors:color_canvas,
	        cell_size:parseFloat(cell_size_canvas),
	    });
	    $("#canvas2").append(pattern.canvas());
	    //canvas 1
	    var pattern = Trianglify({
	 		width:369,
	        height:210,
	        x_colors:color_canvas,
	        variance:parseFloat(variance_canvas),
   		});
 		$("#canvas1").append(pattern.canvas());
    });
	$('#btn-save').click(function(){
		pr('save button click - start');
		cookie_transfer_to_cookie();
		store_is_var = false;
		save_page();
		store_is_var = true; // Reset store_is_var
		pr('save button click - Reset store_is_var');
		
		save_button_toggle(false);
		
		showhidenotification();
	})
	
	$('#btn-preview').click(function(){
		$('#container').sortable('disable');
		$('#header-builder').hide();
		$('#nav-menu').hide();
		$('#popup_modal').hide();
		$('.frameCover').css('visibility', 'hidden');
		$('#btn-close-preview').show();
		$('.row-element').css('cursor', 'auto');
		// $('#container').css('padding',0.1);
		$("#container").off("mouseenter",'.row-edit');
		$("main").animate({
			'margin-top': 0,
			'padding-top': 0,
			'padding-right': 0,
			'padding-bottom': 0,
			'padding-left': 0
		}, 800,function(){
			$('.head-list-page').css('position','fixed');
			$('.head-list-page').css('top',0);
		});
	})
	
	$('#btn-close-preview').click(function(){
		$('#btn-close-preview').hide();
		$('#container').sortable('enable');
		$('#header-builder').show();
		$('#nav-menu').show();
		$('#popup_modal').show();
		$('.frameCover').css('visibility', 'visible');
		$('.row-element').css('cursor', 'move');
		$('.head-list-page').css('position','relative');
		$('.head-list-page').css('top','');
		// $('#container').css('margin-top',0);
		// $('#container').css('padding',15);
		// $("#container").on("mouseenter", ".row-edit", function(){
		// 	$(this).append('<div class="row-edit-hover"></div>');
		// });
		$("main").animate({
			'margin-top': 74,
			// 'padding-top': 10,
			// 'padding-right': 10,
			// 'padding-bottom': 10,
			// 'padding-left': 10
		}, 800);
	})
	
	$('#btn-empty').click(function(){
		// $('#container').html('');
		$('#container .row-element').remove();
		$('html').find('script[date-type="require"]').remove();
		$('html').find('link[date-type="require"]').remove();
		
		save_button_toggle(true);
	})
	
	// PAGE - OPEN (COOKIE)
	save_button_toggle(false);
	 
	cookie_delete_old_data();
	
	// Get HTML Nếu có Save	
	// FIRST LOAD
	if(is_permanent){
		cookie_download(cookie_download_url, cookie_first_load);
	} else {
		cookie_first_load();
	}
	
	
	
	$('#chg_icons').change(function(){
		list_icons_load();
	});
	$('#search_icons').keypress(function (e) {
		var key = e.which;
		if(key == 13)  // the enter key code
		{
			list_icons_load();
		}
	});   
	list_icons_load();
	
	//Import
	// import_zip();
});
function cookie_first_load(){
	cookie_transfer_to_var();
	
	if(page_list){
		// pr(page_list);
		$.each(page_list, function(page_id, page_name){
			// Add menu of page
			if(page_id != page_default_id){
				var html = page_list_add(page_id, page_name);
				$(html).insertBefore($("#btn-menu-add").parent());
			}
		})
	}
	// page_load_content(page_current_id);
	
	// Trigger choose_page
	var page_id = page_current_id;
	page_current_id = ''; // Reset page_current_id
	pr('Reset page_current_id');
	choose_page_trigger(page_id);
}

function list_icons_load(){
	var icon_option_value = $('#chg_icons').val();
	var icon_search_keyword = $('#search_icons').val();
	$.post(root+'home/get_icons', {'category_id' : icon_option_value, 'keyword' : icon_search_keyword},function(res){
		$('#list_icons').html(res);
	});
}

function content_replace_random(content,content_type_name){
	var random_number = Math.floor(Math.random() * 10000);
	
	// var content = content.replace(/\.css\?r=(.*?)"/g, '.XX?R=000');
	var pattern = new RegExp('\\.' + content_type_name + '(.*?)"', "g"); // Better than ?r=(.*?)"
	content = content.replace(pattern, '.'+content_type_name+'?r='+random_number+'"');
	return content;
}

function import_zip(res){
	var obj_import = jQuery.parseJSON(res);
	var all_page = '';
	$.each(obj_import.page, function(key,value){
		if(key==0){
			all_page = value;
		}else{
			all_page = all_page+','+value;
		}
		if(value!='index'){
			$('<li class="list_page">\
				<a href="#" page-title="'+value+'" class="menu-item index-menu-item">\
					'+value+'\
				</a>\
				<button class="edit-change-name-page">\
					<i class="fa fa-cog" aria-hidden="true"></i>\
				</button>\
				<button class="edit-duplicate-page">\
					<i class="fa fa-files-o" aria-hidden="true"></i>\
				</button>\
				<button class="edit-remove-page">\
					<i class="fa fa-trash" aria-hidden="true"></i>\
				</button>\
				<button class="edit-success-page">\
					<i class="fa fa-check-square-o" aria-hidden="true"></i>\
				</button>\
			</li>').insertBefore($("#btn-menu-add").parent());
		}else{
			$('#container').html(obj_import.body.index);
			$('head').append(obj_import.css.index);
			$('body').append(obj_import.js.index);
		}
		if(obj_import.body[value]!=""){
			cookie_set_html_body(value, obj_import.body[value]);
		}
		if(obj_import.css[value]!=""){
			cookie_set_html_css(value, obj_import.css[value]);
		}
		if(obj_import.js[value]!=""){
			cookie_set_html_script(value, obj_import.js[value]);
		}
	})
	$('#all_page_list').val(all_page);
	$(".modal-loading").remove();
	$("html").removeAttr("style");
}

// PAGE - SAVE (COOKIE)
function save_button_toggle(is_enable){
	// $('#btn-save').prop('disabled', !is_enable); // TODO
}
function save_page(){
	pr('save_page');
	page_current_id = page_default_id;
	pr('page_current_id default = page_default_id = ' + page_default_id);
	if(cookie_is_enabled()){
		pr('save_page - page_current_id = ' + page_current_id);
		var data_html = '';
		var data_script = '';
		var data_css = '';
		
		// Cookie management
		pr('save_page - block_raw_html_arr');
		pr(block_raw_html_arr);
		data_html = block_raw_html_restore_all();
		// pr('data_html = ' + data_html);
		if(data_html){
			cookie_set_html_body(page_current_id, data_html);
		} else {
			cookie_delete_html_body(page_current_id);
		}
		if($('html').find('script[date-type="require"]').length>0){
			$.each($('html').find('script[date-type="require"]'), function(k,v){
				var tag_html = v.outerHTML;
				if(k==0){
					data_script = tag_html;
				} else {
					data_script += "\r\n" + tag_html;
				}
			});
		}

		if($('html').find('link[date-type="require"]').length>0){
			$.each($('html').find('link[date-type="require"]'), function(k,v){
				var tag_html = v.outerHTML;
				if(k==0){
					data_css = tag_html;
				} else {
					data_css += "\r\n" + tag_html;
				}
			});
		}
		
		// Cookie management
		if(data_script!=''){
			cookie_set_html_script(page_current_id, data_script);
		} else {
			cookie_delete_html_script(page_current_id);
		}
		if(data_css!=''){
			cookie_set_html_css(page_current_id, data_css);
		} else {
			cookie_delete_html_css(page_current_id);
		}
		cookie_set_page_list();
	}
}

function save_page_permanent(){
	pr('save_page_permanent');
	is_save_permanent = true;
	save_page();
	is_save_permanent = false;
	var json_text = block_raw_html_tojson_all();
	setTimeout(function(){
		cookie_upload(cookie_upload_url, json_text);
	}, 500);
}

function get_block(id){
	$.post('home/get_blocks',{
		id:id
	},function(data){
		$('.menu-expand').html(data);
	});
}

function setModalMaxHeight(element) {
    this.$element     = $(element);  
    this.$content     = this.$element.find('.modal-content');
    var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
    var dialogMargin  = $(window).width() < 768 ? 20 : 60;
    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
    var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
    var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
    var maxHeight     = contentHeight - (headerHeight + footerHeight);

    this.$element
    .find('.modal-body').css({
      'max-height': maxHeight,
      'overflow-y': 'auto'
    });
}


function showhidenotification(){
	$("body").append('\
	<div class="alert alert-success fade in">\
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
		<strong>Success!</strong> save successfully. \
	</div>\
	');
	setTimeout(function() {
	  $('.alert-success').fadeOut(function(){
	  		$(this).remove();
	  })
	}, 1500);
}
function showhidenotificationduplicate(){
	$("body").append('\
	<div class="alert alert-success fade in">\
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
		<strong>Success!</strong> duplicate successfully. \
	</div>\
	');
	setTimeout(function() {
	  $('.alert-success').fadeOut(function(){
	  		$(this).remove();
	  })
	}, 1500);
}