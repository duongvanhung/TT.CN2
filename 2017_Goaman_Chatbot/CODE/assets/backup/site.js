var curent_pos_menu_demo = 0;
var go_ele_page = false;
var cur_demo_type_3 = 0;
var preView = false;
$(document).ready(function(){
	$('body').on('click','.row-edit',function(){
		if(preView != false){
			$('#modal-editor-title').removeClass('fade in').removeAttr('role aria-hidden').css({'display':'none'});
			$('body').removeClass('modal-open');
		}else{
			$('#modal-editor-title').attr('role','dialog').attr('aria-hidden','true');
		}
	});
	//DemoMenu3();
	var aceEditors = new Array();
	var big_parent,div_image,div_image_bg;
	var old_html;
	var chk_required = 0;
	$("#container").sortable({
		start: function (event, ui) {
			old_html=ui.item.html();
		 	ui.item.html("<i style='font-weight:bold;font-size:30px;line-height:130px;color:#40cbff' class='fa fa-bars' aria-hidden='true'></i>");
            ui.item.css({'background':'white','text-align':'center','width':'260px','height':'130px',
	            '-webkit-box-shadow':'3px 3px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow':'3px 3px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow':'3px 3px 5px 0px rgba(0,0,0,0.75)',
	        });
        },
		revert: true,
		placeholder:{
			element: function(currentItem){
				return $('<div class="drop-section"></div>')[0];
			},
			update: function(container, p){
				return;
			}
	    },
		cursor: 'move',
		receive: function(e,ui){
			var required_header = document.documentElement.innerHTML.indexOf('data-required="header"');
			var required_contact = document.documentElement.innerHTML.indexOf('data-required="contact"');
			var current_header = ui.item[0].outerHTML.indexOf('data-required=&quot;header&quot;');
			var current_contact = ui.item[0].outerHTML.indexOf('data-required=&quot;contact&quot;');
			
			if(required_contact >0 && current_contact>0){
				alert('Contact has been existed. Delete the old contact and choose again.');
				chk_required = 1;
				ui.item.remove();
			}else if(required_header=='-1' && current_header=='-1'){
				alert('Please choose header firstly.');
				$('.show-aler-drag').click();
				chk_required = 1;
				ui.item.remove();
			}else if(required_header > 0 && current_header >0){
				alert('Header has been existed. Delete the old header annd choose again.');
				chk_required = 1;
				ui.item.remove();
			}else{
				chk_required = 0;
			}
			if(chk_required==0){
				//Replace content
				var random_number = Math.floor(Math.random() * 10000);
				
				var src_content = $(this).find('.row-block').attr('data-src');
				var src_id = $(this).find('.row-block').attr('data-id');
				var src_js = $(this).find('.row-block').attr('data-js');
				var src_css = $(this).find('.row-block').attr('data-css');

				$(this).children('.row-block').replaceWith('<div class="row-element" data-row-id="'+src_id+'">'+src_content+'<div class="frameCover"></div></div>');
				if(src_css!=''){
					// $('head .head_item_generated').remove(); // Fix for Chrome - But cause problem
					var list_css = src_css.split(";");
					for(var j=0;j<list_css.length;j++){
						var position_css = document.documentElement.innerHTML.indexOf(list_css[j]+'">');
						if(position_css=='-1'){
							var src_css_url = root+'assets/css/blocks/'+list_css[j] + '?r=' + random_number;
							$('head').append('<link class="head_item_generated" date-type="require" rel="stylesheet" href="'+ src_css_url +'">');
						}
					}
				}
				
				if(src_js!=''){
					var list_js = src_js.split(";");
					for(var i=0;i<list_js.length;i++){
						var position_js = document.documentElement.innerHTML.indexOf(list_js[i]+'"></script>');
						if(position_js=='-1'){
							var src_js_url = root+'assets/js/blocks/'+list_js[i] + '?r=' + random_number;
							// alert('src_js_url = ' + src_js_url);
							$('body').append('<script date-type="require" src="'+ src_js_url +'"></script>');
						}
					}
				}
				
				//Add Delete Block
				$('.frameCover').find('button.row-delete').remove();
				$('.frameCover').find('button.row-edit-inline').remove();
				$('.frameCover').find('button.row-save').remove();
				$('.frameCover').find('button.row-close').remove();
				$('.frameCover').find('button.row-edit-bg').remove();
				$('.frameCover').find('button.row-duplicate').remove();
				$('.frameCover').find('button.row-reset').remove();
				$('.row-chg-bg').find('div.setting-background-bt').remove();
				$('.frameCover').append('\
					<div class="setting-group-bt">\
						<div class="icon-list-item">\
							<i class="fa fa-cog" aria-hidden="true"></i>\
						</div>\
						<div class="clear-both"></div>\
						<div class="toggle-group-bt">\
							<button type="button" class="sectionoptions btn btn-lg" >section options</button>\
							<button type="button" class="row-duplicate btn btn-lg" ><i class="fa fa-copy"></i> Duplicate</button>\
							<button type="button" class="row-edit-inline btn btn-lg" ><i class="fa fa-code" aria-hidden="true"></i>source</button>\
							<button type="button" class="row-reset btn btn-lg" ><i class="fa fa-refresh"></i>reset</button>\
							<button type="button" class="row-delete btn btn-lg" ><i class="fa fa-trash"></i>REMOVE</button>\
						</div>\
					</div>\
					<div class="button-editor">\
						<button type="button" class="row-save btn btn-lg" style="display:none"><i class="fa fa-save"></i> Save</button>\
						<button type="button" class="row-close btn btn-lg" style="display:none"><i class="fa fa-times"></i> Close</button>\
					</div>\
				');
				$('.row-chg-bg').append('<div class="setting-background-bt"><button type="button" data-placement="bottom" data-toggle="tooltip" title="Edit image" class="row-edit-bg btn btn-lg" data-dialog="" ><i class="fa fa-picture-o"  aria-hidden="true"></i></button></div>');
				
				//Save and reset
				if(typeof(Storage) !== "undefined"){
					localStorage.setItem("data-row-"+src_id,src_content);
				}
				//reload remove event submit
				 $("form").submit(function(e){
					e.preventDefault();
				});
			}
		},
		//some edit
		stop: function(event,ui){
			if(chk_required==0){
				ui.item.html(old_html);
				ui.item.removeAttr("style");
				DymanicMenu();
				showhidecontainer();
			}
		}
    });
	
	$("#container").on("click", ".row-edit-inline", function(){
		$(this).parents("#container").sortable('disable');

		//built editor element
		theEditor = $('<div class="aceEditor"></div>');
		theEditor.uniqueId();
		if($(this).parents(".row-element").find('.row-builder').height()<=350){
			theEditor.height(350);
		}else{
			theEditor.height($(this).parents(".row-element").find('.row-builder').height());
		}

		$(this).parents(".row-element").append(theEditor);
		theId = theEditor.attr('id');
		var editor = ace.edit(theId);
		var content=$(this).parents(".row-element").html();
		content = $(content).get(0).outerHTML;
		editor.setValue(content);
		editor.setTheme("ace/theme/twilight");
		editor.getSession().setMode("ace/mode/html");
		editor.getSession().setUseWrapMode(true);
		aceEditors[theId] = editor;
		
		//Hide Element, icon
		$(this).parents(".row-element").find('.row-builder').hide();
		$(this).parents(".row-element").find('.frameCover .setting-group-bt').hide();
		$(this).parents(".row-element").find('.setting-background-bt').hide();
		
		
		
		//Show icon Editor
		$(this).parents(".row-element").find('.frameCover .row-save').show();
		$(this).parents(".row-element").find('.frameCover .row-close').show();
	});
	
	$("#container").on("click", ".row-save", function(){
		theId = $(this).parents(".row-element").find('.aceEditor').attr('id');
		
		theContent = aceEditors[theId].getValue();
		$(this).parents(".row-element").find('.row-builder').replaceWith(theContent);
		close_editor($(this));
		showhidecontainer();
	});
	var old_module_delete;
	$("#container").on("click", ".row-delete", function(){
		$("#modal-confirm-delete-module").modal();
		old_module_delete=$(this);
	});
	
	$("#container").on("click", ".row-close", function(){
		close_editor($(this));
		showhidecontainer();
	});

	// $("#popup_modal").on("click",".edit-link",function(){
	// 	old_modal=$(this).parents(".modal").attr("id");
	// 	$("#"+old_modal).modal("hide");
	// 	$("#modal-edit-text-mini").val($("#modal-edit-title").val());
	// 	$("#modal-editor-link-mini").modal();
	// });
	$("#popup_modal").on("click",".remove_source",function(){
		$("#modal-confirm-remove-item").modal();
	});
	$("#modal-confirm-remove-item").on("click",".confirm-remove-item-save",function(){
		big_parent.remove();
		$('.modal').modal('hide');
	});
	$("#popup_modal").on("click",".edit-remove",function(){
		big_parent.remove();
		$("#modal-editor-menu").modal('hide');
	});
	var old_page_delete;
	$("#popup_modal").on("click",".confirm-delete-page-save",function(){
		$(".index-menu-item[page-title='index']").click();
		var titlenamepageremove=old_page_delete.parent().find(".menu-item.index-menu-item").attr("page-title");
		old_page_delete.parents(".list_page").remove();
		removepage(titlenamepageremove);
		localStorage.removeItem("full_page_"+titlenamepageremove);
		localStorage.removeItem("full_script_"+titlenamepageremove);
		localStorage.removeItem("full_css_"+titlenamepageremove);
		localStorage.setItem("all_page_list",$('#all_page_list').val());
		$("#modal-confirm-delete-page").modal("hide");
		showhidecontainer();
	});
	$("#popup_modal").on("click",".confirm-delete-module-save",function(){
		old_module_delete.parents(".row-element").remove();
		$("#modal-confirm-delete-module").modal("hide");
		DymanicMenu();
		showhidecontainer();
	});
	$("#popup_modal").on("click",".edit-right",function(){
		if(big_parent.next().index()>0)
		{
			var datanew=big_parent.next().html();
			big_parent.next().html(big_parent.html());
			big_parent.html(datanew);
			big_parent.removeClass("menu__item--current");
			big_parent.next().addClass("menu__item--current");
			big_parent=big_parent.next();
		}
		else
		{
			$( big_parent.parent() ).prepend( big_parent.get() );
		}
		
	});
	$("#popup_modal").on("click",".edit-add",function(){
		$(big_parent.parent()).prepend("<li class='menu__item row-edit' data-type='menu'><a href='#'' class='menu__link'>New Menu</a></li>");
	});
	$("#popup_modal").on("click", "#modal-editor-all .text-select-font button", function(e){
		e.stopPropagation();
		$("#modal-edit-fontstyle").modal();
	});
	$("#popup_modal").on("click","#modal-editor-icon .remove_icon",function(){
		$("#modal-confirm-remove-icon").modal();
	});
	$("#popup_modal").on("click","#modal-editor-icon .input-search-icons button",function(){
		list_icons_load();
	})
	var icon_old_value=" ";
	var icon_old_text=" ";
	$("#popup_modal").on("click", ".edit-icon", function(){
		$("#modal-editor-icon").modal();
		icon_old_value=$("#modal-editor-icon .preview i").attr("class");
		icon_old_text=$("#modal-editor-icon .icon-preview span").html();
	});
	$("#popup_modal").on("click","#modal-editor-icon .close_source",function(){
		var preview_icon=$("#modal-editor-icon .preview i");
		var preview_icon1=$("#modal-editor-icon .icon-preview i");
		var preview_name_icon=$("#modal-editor-icon .icon-preview span");
		//
		preview_icon.removeClass();
		preview_icon1.removeClass();
		preview_name_icon.html(" ");
		//
		preview_icon.addClass(icon_old_value);
		preview_icon1.addClass(icon_old_value);
		preview_name_icon.html(icon_old_text);
	});
	$("#popup_modal").on("click","#modal-confirm-remove-icon .confirm-remove-item-icon",function(){
		$("#modal-confirm-remove-icon").modal("hide");
		$("#modal-editor-icon .preview i").removeClass();
		$("#modal-editor-icon .icon-preview i").removeClass();
		$("#modal-editor-icon .icon-preview span").html(" ");
	})
	
	// $("#popup_modal").on("click","#modal-editor-link-mini .close_source",function(){
	// 	$("#"+old_modal).modal("show");
	// })
	// $("#popup_modal").on("click","#modal-editor-link-mini .save_source_mini",function(){
	// 	$("#modal-editor-link-mini").modal("hide");
	// 	$("#"+old_modal).modal("show");
	// 	$("#modal-edit-title").val($("#modal-edit-text-mini").val());
	// })
	$("#container").on("click", "*[data-type]", function(e){
		// if(go_ele_page==true)
		// {
			// return false;
		// }
		//e.stopPropagation();
		e.preventDefault();
		big_parent = $(this);
		if(big_parent.attr("data-type")=='title'){
			$("#modal-editor-title").modal();
			//get element child
			if(big_parent.children().length>0)
			{
				old_data=big_parent.children().get( 0 );
			}

			if(big_parent.prop("tagName").toLowerCase() != "a"){
				$("#modal-editor-title .modal-edit-input-title .content-edit-link-title p").hide();
				$("#modal-editor-title .modal-edit-input-title .content-edit-link-title:nth-child(2)").hide();
			}
			else{
				$("#modal-editor-title .modal-edit-input-title .content-edit-link-title p").show();
				$("#modal-editor-title .modal-edit-input-title .content-edit-link-title:nth-child(2)").show();
				$("#modal-editor-title #modal-edit-url-mini").val(big_parent.attr("href"));
			}
		}
		if(big_parent.attr("data-type")=='link'){
			$("#modal-edit-text").val(big_parent.text().trim());
			$("#modal-edit-url").val(big_parent.attr('href'));
			$("#modal-editor-link").modal();
		}
		if(big_parent.attr("data-type")=='image'){
			$("#modal-edit-urlimage").val(big_parent.children('img').attr('src'));
			$("#modal-editor-image").modal();
		}
		if(big_parent.attr("data-type")=='content'){
			$("#modal-editor-content").modal();
		}
		if(big_parent.attr("data-type")=='icon'){
			$("#modal-editor-icon").modal();
		}
		if(big_parent.attr("data-type")=='button'){
			$("#modal-editor-text").modal();
			//reset icon
			if(big_parent.find(".fa").length>0)
			{
				var icon=big_parent.find(".fa").attr("class");
				$(".icon-preview i").removeClass().addClass(icon);
		        $(".icon-preview span").html(icon);
		        $(".preview i").removeClass().addClass(icon);
		        $("#list_icons .fa").removeClass("active");
		        $("#list_icons").find("."+icon.split(" ")[1]).addClass("active");
			}
			else
			{
				$(".icon-preview i").removeClass();
		        $(".icon-preview span").html(" ");
		        $(".preview i").removeClass();
			}
		}
		// if(big_parent.attr("data-type")=="bg"){
		// 	big_parent = $(this).parents(".row-chg-bg");
		// 	color_canvas=$("#modal-editor-bg").find(".radio-button.active").children().attr("data-color");
		// 	$("#canvas1").children().remove();
	 //        $("#canvas2").children().remove();
		// 	variance_canvas=0;
		// 	cell_size_canvas=40;
		// 	$("#myRange").val(0);
		// 	$("#myRange1").val(40);
		// 	//canvas1
		// 	var pattern = Trianglify({
		//  		width:369,
		//         height:210,
		//         x_colors:color_canvas,
		//         variance:variance_canvas,
	 //   		});
	 // 		$("#canvas1").append(pattern.canvas());
	 // 		//canvas2
	 // 		var pattern = Trianglify({
		//  		width: 369,
		//         height: 210,
		//         x_colors:color_canvas,
		//         cell_size:cell_size_canvas,
		//     });
		//  	$("#canvas2").append(pattern.canvas());

		// 	$("#modal-editor-bg").modal();
		// }
		if(big_parent.attr("data-type")=='menu'){
			$("#modal-editor-menu").modal();
		}
		if(big_parent.attr("data-type")=="option-menu"){
			$("#modal-editor-menu-effect").modal();
		}
		if(big_parent.attr("data-type")=="all"){
			$("#modal-editor-all").modal();
		}
	});

	$("#container").on("click", ".row-edit-bg", function(){
		big_parent = $(this).parents(".row-chg-bg");
		color_canvas=$("#modal-editor-bg").find(".radio-button.active").children().attr("data-color");
		$("#canvas1").children().remove();
        $("#canvas2").children().remove();
		variance_canvas=0;
		cell_size_canvas=40;
		$("#myRange").val(0);
		$("#myRange1").val(40);
		//canvas1
		var pattern = Trianglify({
	 		width:369,
	        height:210,
	        x_colors:color_canvas,
	        variance:variance_canvas,
   		});
 		$("#canvas1").append(pattern.canvas());
 		//canvas2
 		var pattern = Trianglify({
	 		width: 369,
	        height: 210,
	        x_colors:color_canvas,
	        cell_size:cell_size_canvas,
	    });
	 	$("#canvas2").append(pattern.canvas());

		$("#modal-editor-bg").modal();
	});
	
	$("#container").on("click", ".row-duplicate", function(){
		big_parent = $(this).parents(".row-element");
		$('#container').append(big_parent[0].outerHTML);
		showhidecontainer();
	});
	
	$("#container").on("click", ".row-reset", function(){
		var row_id = $(this).parents(".row-element").attr('data-row-id');
		$(this).parents(".row-element").find('.row-builder').replaceWith(localStorage.getItem("data-row-"+row_id));
		$('.row-chg-bg').append('<div class="setting-background-bt"><button type="button" data-placement="bottom" data-toggle="tooltip" title="Edit image" class="row-edit-bg btn btn-lg" data-dialog="" ><i class="fa fa-picture-o"  aria-hidden="true"></i></button></div>');
		showhidecontainer();
	});
	
	// $("#container").on("mouseenter", ".row-element", function(){
	// 	$(this).find('.frameCover').stop().fadeIn(400);
	// 	$(this).find('.setting-background-bt').stop().fadeIn(400);
	// });
	
	$("#container").on("mouseleave", ".row-element", function(){
		$(this).find('.frameCover').stop().fadeOut(400);
		$(this).find('.setting-background-bt').stop().fadeOut(400);
	});
	$("#container").on("mouseover", "*[data-type]", function(e){
		$(this).parents(".row-element").find('.frameCover').stop().fadeIn(400);
		$(this).parents(".row-element").find('.setting-background-bt').stop().fadeIn(400);
		if(go_ele_page==true){
			return false;
		}
		$("*[data-type]").css({"outline":"","cursor":"","outline-offset":""});
		if($(this).attr("data-type")!="bg")
		{
			$(this).css({"outline":"red dashed 3px","cursor":"pointer","outline-offset":"-3px"});
		}
		e.stopPropagation();
	});
	
	$("#container").on("mouseout", "*[data-type]", function(){
		$(this).css({"outline":"","cursor":"","outline-offset":""});
	});
	//Save Source
	$('.save_source').click(function(){
		if(big_parent.attr("data-type")=='title'){
			if(big_parent.parent("ul").length>0)
			{
				big_parent.children().css({"font-family":font_current,"color":color_current,"font-size":$("#modal-editor-title .text-font-size input").val(),"text-align":align_current});
				big_parent.children().text($("#modal-edit-title").val());
				big_parent.children().attr("href",$("#modal-edit-url-mini").val());
			}
			else
			{
				big_parent.css({"font-family":font_current,"color":color_current,"font-size":$("#modal-editor-title .text-font-size input").val(),"text-align":align_current});
				big_parent.text($("#modal-edit-title").val());
				big_parent.attr("href",$("#modal-edit-url-mini").val());
			}
			
		}
		if(big_parent.attr("data-type")=='link'){
			big_parent.text($("#modal-edit-text").val());
			big_parent.attr("href",$("#modal-edit-url").val());
		}
		if(big_parent.attr("data-type")=='image'){
			if(div_image && div_image.files && div_image.files[0]){
				var FR= new FileReader();
				FR.onload = function(e){
					big_parent.children('img').attr("src", e.target.result);
				};       
				FR.readAsDataURL(div_image.files[0]);
				$("#modal-edit-chooseimage").val('');
			}else{
				if($("#modal-edit-urlimage").val()!=''){
					big_parent.children('img').attr('src',$("#modal-edit-urlimage").val());
				}
			}
		}
		if(big_parent.attr("data-type")=='content'){
			big_parent.css({"font-family":font_current,"color":color_current,"font-size":$("#modal-editor-content .text-font-size input").val(),"text-align":align_current});
			big_parent.text($("#modal-edit-content").val());
			
		}
		if(big_parent.attr("data-type")=='bg'){
			if(div_image_bg && div_image_bg.files && div_image_bg.files[0]){
				var FR= new FileReader();
				FR.onload = function(e){
					big_parent.css({ 
						"background-image": "url("+e.target.result+")",
						"background-position": "center center",
						"background-size": "cover"
					});
				}
				FR.readAsDataURL(div_image_bg.files[0]);
				$("#modal-edit-choosebg").val('');
			}else{
				var width_trianglify = big_parent.outerWidth();
				var height_trianglify = big_parent.outerHeight();
				var pattern = Trianglify({
					width: width_trianglify,
					height: height_trianglify,
					cell_size: parseInt(cell_size_canvas),
					x_colors: color_canvas,
					variance: parseFloat(variance_canvas)
				}).png();
				var data_image = pattern.substr(pattern.indexOf('base64') + 7);
				$.post(root+'home/save_bg',{
					data64: data_image
				},function(res){
					big_parent.css('background-image', 'url("'+res+'")');
				});
			}
		}
		if(big_parent.attr("data-type")=='button')
		{
			var nameicon=$("#modal-editor-icon .preview i");
			var classicon=nameicon.attr("class");
			var split_classicon=classicon.split(" ");
			var styleicon=nameicon.attr("style");
			var namebutton=$("#modal-edit-button").val();
			big_parent.css({"font-family":font_current,"color":color_current,"font-size":$("#modal-editor-text .text-font-size input").val()});
			big_parent.children("i").remove();
			big_parent.html(namebutton);
			if(split_classicon.length > 1){
				big_parent.prepend("<i class='"+classicon+"' style='"+styleicon+";margin-right:5px;' ></i>");	
			}
			// if(nameicon!="")
			// {
			// 	big_parent.prepend("<i class='"+classicon+"' style='"+styleicon+";margin-right:5px;' ></i>");
			// }
		}
		if(big_parent.attr("data-type")=='menu')
		{
			var nameicon=$("#modal-editor-icon .preview i");
			var classicon=nameicon.attr("class");
			var styleicon=nameicon.attr("style");
			big_parent.css({"font-family":font_current,"color":color_current,"font-size":size_current});
			big_parent.find("i").remove();
			if(nameicon!="")
			{
				big_parent.children("a").html("<i class='"+classicon+"' style='"+styleicon+";margin-right:5px;' ></i>"+" "+$("#modal-edit-text").val());
			}
			else
			{
				//setting link
				big_parent.find("a").text($("#modal-edit-text").val());
			}
			big_parent.find("a").attr("href",$("#modal-edit-url").val());
			
		}
		if(big_parent.attr("data-type")=='all'){
			big_parent.css({"font-family":font_current,"color":color_current,"font-size":$("#modal-editor-all .text-font-size input").val(),"text-align":align_current});
			big_parent.children().css({"font-family":font_current,"color":color_current,"font-size":$("#modal-editor-all .text-font-size input").val(),"text-align":align_current});
		}
		$('.modal').modal('hide');
		
		
		// call function save change text menu
		ChangOptionModel(big_parent.attr('href'), $('#modal-edit-title').val());
		
		// call back function for menu type - 3 after 2 secon
		setTimeout(function(){
			if($('.navi-type-3').length > 0){
				// active menu DES&M0B option 3
				MenuOption($('.navi-type-3 .menu-des li'), $('.navi-type-3 .menu-mb li'));
				
				ActiveNavigation3();
				
			}
		}, 2000);
		
		
	});
	
	$('#modal-edit-chooseimage').change(function(){
		div_image = this;
	});
	
	$('#modal-edit-choosebg').change(function(){
		div_image_bg = this;
	});
	
	//Choose Page
	$("#page-top ul").on("click",".list_page a",function(e){
		if($(this).attr("contenteditable")!="true"){
			$(".list_page .menu-item.index-menu-item").each(function(){
				if($(this).attr("contenteditable")=="true"){
					//check name page exist
					var arraypagename = $("#all_page_list").val().split(",");
					for(var i=0;i<arraypagename.length;i++)
					{
						if($(this).html().trim()==arraypagename[i] && $(this).parent().find(".menu-item.index-menu-item").html().trim() != old_pagename){
							$(this).attr("title","name page exist");
							$(this).attr("data-original-title","name page exist");
							$(this).css("border-color","#f36161");
							$(this).tooltip("open");
							return false;
						}
					}
					//show icon
					showhideiconeditpage(true,$(this).parents(".list_page"));
					$(this).attr("contenteditable","false");
					renamepage($(this).parents(".list_page").find(".index-menu-item"));
					$(this).removeAttr("title data-original-title style");
					//save page with new name
					save_page();
					$(this).click();
				}
			})
			var page_name = $(this).attr('page-title');
			$(".list_page").removeClass("active");
			$(this).parent().addClass("active");
			$(".title-page-selected").html(page_name+".html");
			choose_page(page_name);
			showhidecontainer();
			return false;
		}
		var page_name = $(this).attr('page-title');
		$(".list_page").removeClass("active");
		$(this).parent().addClass("active");
		$(".title-page-selected").html(page_name+".html");
		choose_page(page_name);
		showhidecontainer();
		
	});
	//Add Page
	$('#btn-menu-add').click(function(){
		addpage();
	});
	//remove page
	$("#page-top ul").on("click",".edit-remove-page",function(e){
		$("#modal-confirm-delete-page").modal();
		old_page_delete=$(this);
		e.stopPropagation();
	});
	//change name page
	$("#page-top ul").on("click",".edit-change-name-page",function(e){
		showhideiconeditpage(false,$(this).parents(".list_page"));
		$(this).parent().find(".menu-item.index-menu-item").attr("contenteditable","true").focus();
		$(this).parent().find(".menu-item.index-menu-item").css({"border-style":"solid","border-width":"1px 1px 3px 1px","border-color":"#b5bbf4","cursor":"inherit"})
		old_pagename=$(this).parents(".list_page").find(".index-menu-item").html().trim();
		showhidecontainer();
		e.stopPropagation();
	});
	//change name page success
	$("#page-top ul").on("click",".edit-success-page",function(e){
		//check name page exist
		var arraypagename = $("#all_page_list").val().split(",");
		for(var i=0;i<arraypagename.length;i++)
		{
			if($(this).parent().find(".menu-item.index-menu-item").html().trim()==arraypagename[i] && $(this).parent().find(".menu-item.index-menu-item").html().trim() != old_pagename){
				$(this).parent().find(".menu-item.index-menu-item").attr("title","name page exist");
				$(this).parent().find(".menu-item.index-menu-item").attr("data-original-title","name page exist");
				$(this).parent().find(".menu-item.index-menu-item").css("border-color","#f36161");
				$(this).parent().find(".menu-item.index-menu-item").tooltip("open");
				return false;
			}
		}
		//show icon
		showhideiconeditpage(true,$(this).parents(".list_page"));
		$(this).parent().find(".menu-item.index-menu-item").attr("contenteditable","false");
		renamepage($(this).parents(".list_page").find(".index-menu-item"));
		$(this).parent().find(".menu-item.index-menu-item").removeAttr("title data-original-title style");
		//save page with new name
		save_page();
		$(this).parents(".list_page").find(".index-menu-item").click();
		showhidecontainer();
		e.stopPropagation();
	});

	//duplicate
	$("#page-top ul").on("click",".edit-duplicate-page",function(e){
		addpage();
		var namelocalstorageduplicate =$(this).parents(".list_page").find(".index-menu-item").html().trim();
		duplicate(namelocalstorageduplicate);
		showhidecontainer();	
	});
	
	
	// demo menu option 
	$('.type-menu-3-op a').click(function(){
		$('.type-menu-3-op a').removeClass('menu__item--current');
		$(this).addClass('menu__item--current');
		ActiveNavigation3Demo();
	});
	$('#btn-preview').click(function(){
		go_ele_page = true;
		preView = true;
		// hide hover menu option
		$('.hover-menu-change').css({'display':'none'});
		
		// chage position menu
		$('.commont-menu').css({'position': 'fixed'});
	});
	$('#btn-close-preview').click(function(){
		go_ele_page = false;
		preView = false;
		// show hover menu option
		$('.hover-menu-change').css({'display':'block'});
		
		// chage position menu
		$('.commont-menu').css({'position': 'static'}).removeClass('fix-menu-top-0');
	});
	

});


function choose_page(page_name){
	var page_active = $('#page_active').val();
	if(page_name!=page_active){
		save_page();
		$('html').find('link[date-type="require"]').remove();
		$('html').find('script[date-type="require"]').remove();
		$('.head-page-text').html(page_name+'.html');
		$('#page_active').val(page_name);

		if(typeof(Storage) !== "undefined" && localStorage.getItem("full_page_"+page_name) != '' && localStorage.getItem("full_page_"+page_name) != null){
			$('#container').html(localStorage.getItem("full_page_"+page_name));
			if(localStorage.getItem("full_script_"+page_name) != '' && localStorage.getItem("full_script_"+page_name) != null){
				$('body').append(localStorage.getItem("full_script_"+page_name));
			}
			if(localStorage.getItem("full_css_"+page_name) != '' && localStorage.getItem("full_css_"+page_name) != null){
				$('head').append(localStorage.getItem("full_css_"+page_name));
			}
		}else{
			$('#container').html('');
		}
	}
}

function get_page(page_name){
	$('html').find('link[date-type="require"]').remove();
	$('html').find('script[date-type="require"]').remove();

	if(typeof(Storage) !== "undefined" && localStorage.getItem("full_page_"+page_name) != '' && localStorage.getItem("full_page_"+page_name) != null){
		$('#container').html(localStorage.getItem("full_page_"+page_name));
		if(localStorage.getItem("full_script_"+page_name) != '' && localStorage.getItem("full_script_"+page_name) != null){
			$('body').append(localStorage.getItem("full_script_"+page_name));
		}
		if(localStorage.getItem("full_css_"+page_name) != '' && localStorage.getItem("full_css_"+page_name) != null){
			$('head').append(localStorage.getItem("full_css_"+page_name));
		}
	}else{
		$('#container').html('');
	}
}

function close_editor(e){
	e.parents("#container").sortable('enable');
	e.parents(".row-element").find('.aceEditor').remove();
	e.parents(".row-element").find('.frameCover .setting-group-bt').show();
	e.parents(".row-element").find('.setting-background-bt').show();
	e.parents(".row-element").find('.frameCover .row-save').hide();
	e.parents(".row-element").find('.frameCover .row-close').hide();
	e.parents(".row-element").find('.row-builder').show();
	
}

function export_template(){
	$('.modal').modal('hide');
	myloading();
	save_page();
	var all_page = $('#all_page_list').val();
	var arr_split = all_page.split(',');
	$.each(arr_split, function(key,value){
		get_page(value);
		$('#container').html(localStorage.getItem("full_page_"+value));
		var data = $('#container');
		var data_old = $('#container').html();
		var data_script = '';
		var data_css = '';
		data.find('.frameCover').remove();
		data.find('.setting-background-bt').remove();
		data.find('.row-builder').unwrap();
		if($('html').find('script[date-type="require"]').length>0){
			$.each($('html').find('script[date-type="require"]'), function(k,v){
				if(k==0){
					data_script = v.src;
				}else{
					data_script += ';'+v.src;
				}
			});
		}
		if($('html').find('link[date-type="require"]').length>0){
			$.each($('html').find('link[date-type="require"]'), function(k,v){
				if(k==0){
					data_css = v.href;
				}else{
					data_css += ';'+v.href;
				}
			});
		}
		$.post(root+'export',{
			total_page: arr_split.length,
			page_num: key,
			page_name: value,
			data: data.html(),
			data_script: data_script,
			data_css: data_css,
			title: $('#export_title').val(),
			description: $('#export_description').val(),
			keywords: $('#export_keyword').val()
		},function(res){
			if(key==(arr_split.length)-1){
				var page_active = $('#page_active').val();
				$('#container').html(localStorage.getItem("full_page_"+page_active));
				location.href=res;
				$(".modal-loading").remove();
				$("html").removeAttr("style");
			}
		});
	});
}

var namepagenew;
function addpage()
{
	var page_number_max = 1;
	$(".list_page").each(function(){
		var pagename = $(this).children("a").attr("page-title");
		if(pagename.indexOf("Page") == 0){
			var page_number = parseInt(pagename.replace("Page",""));
			if(page_number >  page_number_max){
				page_number_max = page_number;
			}
		}
	});
	number = page_number_max +1;
	$('<li class="list_page">\
		<a href="#" page-title="Page'+number+'" class="menu-item index-menu-item">\
			Page'+number+'\
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
	</li>').insertBefore($("#btn-menu-add").parent());
	$("#all_page_list").val($("#all_page_list").val()+",Page"+number);
	namepagenew="Page"+number;
}

function removepage(titlenamepageremove)
{
	var split=$("#all_page_list").val().split(",");
	var sum="index";
	for(var i=1;i<split.length;i++)
	{
		if(split[i] != titlenamepageremove)
		{
			sum=sum+","+split[i];
		}
	}
	$("#all_page_list").val(sum);
}
function showhideiconeditpage(boolean,id){
	if(boolean==false)
	{
		$(id).find(".edit-change-name-page").hide();
		$(id).find(".edit-duplicate-page").hide();
		$(id).find(".edit-remove-page").hide();
		$(id).find(".edit-success-page").show();
	}
	else
	{
		$(id).find(".edit-change-name-page").show();
		$(id).find(".edit-duplicate-page").show();
		$(id).find(".edit-remove-page").show();
		$(id).find(".edit-success-page").hide();
	}
}
var old_pagename;
function renamepage(id){
	//rename all_list_page
	removepage(old_pagename);
	$("#all_page_list").val($("#all_page_list").val()+","+id.html().trim());
	//remove local storage
	localStorage.removeItem("full_page_"+old_pagename);
	localStorage.removeItem("full_script_"+old_pagename);
	localStorage.removeItem("full_css_"+old_pagename);
	//rest
	$("#page_active").val(id.html().trim());
	$(id).attr("page-title",id.html().trim());
}
function duplicate(id)
{
	localStorage.setItem("full_page_"+namepagenew,localStorage.getItem("full_page_"+id));
	if(localStorage.getItem("full_css_"+id)!=null)
	{
		localStorage.setItem("full_css_"+namepagenew,localStorage.getItem("full_css_"+id));	
	}
	if(localStorage.getItem("full_script_"+id)!=null)
	{
		localStorage.setItem("full_script_"+namepagenew,localStorage.getItem("full_script_"+id));	
	}
}

function showhidecontainer()
{
	if($("#container").find("section").length>0)
	{
		$("#container").addClass("changed");
	}
	else
	{
		$("#container").removeClass("changed");
	}
}
$(document).ready(function(){
	showhidecontainer();
	$("#import-file-page").uploadFile({
		url: root+"home/import",
		multiple: false,
		dragDrop: false,
		maxFileCount: 1,
		fileName: "importFile",
		onSubmit:function(files){
			myloading();
		},
		onSuccess:function(files,data,xhr,pd){
			import_zip(data);
			showhidenotification();
			showhidecontainer();
			// $("#eventsmessage").html($("#eventsmessage").html()+"<br/>Success for: "+JSON.stringify(data));
		}
	});
	 $("#btn-menu-export-import").click(function(){
	 		$("#import-file-page").find("input").click();
	 })
});


$('body').on('click', '.commont-menu .menu-des li', function(){
	//$(this).position().left + ($(this).width()/2) + 10;
	DemoMenu3($(this).position().left + ($(this).width()/2));
});

$('body').on('hover', '.commont-menu .menu-des li', function(){
	alert($(this).attr('style'));
});

// Active navigation 3
function DemoMenu3(para){
	
	var ele_span = $('.navi-type-3 .menu-des li:last-child span');
	var pos_left = 0;
	var status = '';

	// check elemet exist
	pos_left = para;
	
	
	if(pos_left > cur_demo_type_3){
		status = 'right';
		cur_demo_type_3 = pos_left;
	}else{
		status = 'left';
		cur_demo_type_3 = pos_left;
	}
	if(status == 'left'){
		ele_span.eq(0).stop().animate({
		'left': (pos_left - 10) + 'px'
		},700);
		ele_span.eq(1).stop().animate({
			'left': pos_left + 'px'
		},750);
		ele_span.eq(2).stop().animate({
			'left': (pos_left + 10) + 'px'
		},900);
	}else{
		ele_span.eq(0).stop().animate({
		'left': (pos_left - 10) + 'px'
		},900);
		ele_span.eq(1).stop().animate({
			'left': pos_left + 'px'
		},750);
		ele_span.eq(2).stop().animate({
			'left': (pos_left + 10) + 'px'
		},700);
	}
	
}// end function