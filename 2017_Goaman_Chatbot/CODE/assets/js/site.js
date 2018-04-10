var curent_pos_menu_demo = 0;
var go_ele_page = false;
var cur_demo_type_3 = 0;
var preView = false;

$(document).ready(function () {
    $('body').on('click', '.row-edit', function () {
        if (preView != false) {
            $('#modal-editor-title').removeClass('fade in').removeAttr('role aria-hidden').css({ 'display': 'none' });
            $('body').removeClass('modal-open');
        } else {
            $('#modal-editor-title').attr('role', 'dialog').attr('aria-hidden', 'true');
        }
    });
   
    //DemoMenu3();
    var aceEditors = new Array();
    var big_parent, div_image, div_image_bg, div_image_link;
    var old_html;
    var chk_required = 0;

    $(".block-select").on('click', function () {
        $("#container").sortable("enable");
    });
    $("#container").sortable({
        items: ".row-element:not(.disable-sortble)",
        start: function (event, ui) {
            old_html = ui.item.html();
            ui.item.html("<i style='font-weight:bold;font-size:30px;line-height:130px;color:#40cbff' class='fa fa-bars' aria-hidden='true'></i>");
            ui.item.css({
                'background': 'white', 'text-align': 'center', 'width': '260px', 'height': '130px',
                '-webkit-box-shadow': '3px 3px 5px 0px rgba(0,0,0,0.75)',
                '-moz-box-shadow': '3px 3px 5px 0px rgba(0,0,0,0.75)',
                'box-shadow': '3px 3px 5px 0px rgba(0,0,0,0.75)',
            });

        },
        revert: true,
        placeholder: {
            element: function (currentItem) {
                return $('<div class="drop-section"></div>')[0];
            },
            update: function (container, p) {
                return;
            }
        },
        cursor: 'move',

        // BLOCK - ADD
        receive: function (e, ui) {
            // pr(ui.item[0]);
            var required_header = document.documentElement.innerHTML.indexOf('data-required="header"');
            required_header = 1; // TODO: Ignore required header
            var required_contact = document.documentElement.innerHTML.indexOf('data-required="contact"');
            var current_header = ui.item[0].outerHTML.indexOf('data-required=&quot;header&quot;');
            var current_contact = ui.item[0].outerHTML.indexOf('data-required=&quot;contact&quot;');
            chk_required = 0;
            if (required_contact > 0 && current_contact > 0) {
                chk_required = 1;
                ui.item.remove();

            } else if (required_header == '-1' && current_header == '-1') {
                if (page_current_id == page_default_id) {
                    $('.show-aler-drag').click();
                    $(".row-block.ui-draggable.ui-draggable-handle").remove();
                    chk_required = 1;
                    ui.item.remove();
                }
            } else if (required_header > 0 && current_header > 0) {
                $('#modal-alert-multi-header').modal();
                $(".row-block.ui-draggable.ui-draggable-handle").remove();
                chk_required = 1;
                ui.item.remove();

            } else {
                chk_required = 0;

            }
            if (chk_required == 0) {
                //Replace content
                var drop_jele = $(this).find('.row-block');
                var src_content = drop_jele.attr('data-src'); // IMPORTANT
                // pr('src_content = ' + src_content);
                var src_id = drop_jele.attr('data-id'); // IMPORTANT

                var block_id = src_id;
                pr('block_id = ' + block_id);

                // Check duplicate block
                var block_duplicate_count = block_count(block_id);
                pr('block_duplicate_count = ' + block_duplicate_count);
                var is_block_duplicate = block_duplicate_count > 0;

                var src_js = drop_jele.attr('data-js');
                var src_css = drop_jele.attr('data-css');
                var data_header = drop_jele.attr("data-header");

                block_add(drop_jele, src_id, src_content, src_css, src_js, data_header);

                $('*[data-type="bg"]').append('<div class="setting-background-bt"><button type="button" data-placement="bottom" data-toggle="tooltip" title="Edit image" class="row-edit-bg btn btn-lg" data-dialog="" ><i class="fa fa-picture-o"  aria-hidden="true"></i></button></div>');

                // End drag drop

                $("#container").sortable("disable");

                // Disable drag and drop
                // Save and reset
                // Cookie management
                // cookie_set("data-row-"+block_generated_id,src_content); // For BLOCK - RESET
                // pr('BLOCK - ADD - For BLOCK - RESET - store_var');
                // pr(store_var);

                //reload remove event submit
                $("form").submit(function (e) {
                    e.preventDefault();

                });

            }
            save_button_toggle(true);

        },

        //some edit
        stop: function (event, ui) {
            if (chk_required == 0) {

                ui.item.html(old_html);
                ui.item.removeAttr("style");
                DymanicMenu();
                showhidecontainer();
            }
        }
    });

    $("#container").on("click", ".row-edit-inline", function () {
        $(this).parents("#container").sortable('disable');
        //built editor element
        theEditor = $('<div class="aceEditor"></div>');
        theEditor.uniqueId();
        if ($(this).parents(".row-element").find('.row-builder').height() <= 350) {
            theEditor.height(350);
        } else {
            theEditor.height($(this).parents(".row-element").find('.row-builder').height());
        }

        $(this).parents(".row-element").append(theEditor);
        theId = theEditor.attr('id');
        var editor = ace.edit(theId);
        var content = $(this).parents(".row-element").html();
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

    $("#container").on("click", ".row-save", function () {
        theId = $(this).parents(".row-element").find('.aceEditor').attr('id');

        theContent = aceEditors[theId].getValue();
        $(this).parents(".row-element").find('.row-builder').replaceWith(theContent);
        close_editor($(this));
        showhidecontainer();
    });
    var old_module_delete;
    var menu_name_delete;
    $("#container").on("click", ".row-delete", function () {
        menu_name_delete = $(this).parents(".row-element").find(".row-builder").attr("menu-name");
        $("#modal-confirm-delete-module").modal();
        old_module_delete = $(this);
    });

    $("#container").on("click", ".row-close", function () {
        close_editor($(this));
        showhidecontainer();
    });

    // $("#container").on("click",".hover-menu-change",function(){
    // var bnt_click = $('.menu-option-ad');
    // var chose_menu = $('.chose-item-menu-list li');
    // $('.block-list-op-menu').css({
    // 'opacity': 1,
    // 'z-index': 9
    // });

    // // call show list menu chose after 500s
    // setTimeout(function(){
    // chose_menu.each(function(i, val){
    // var tam = $(this);
    // setTimeout(function(){
    // tam.css({
    // '-webkit-transform': 'translate(0px)',
    // '-moz-transform': 'translate(0px)',
    // '-ms-transform': 'translate(0px)',
    // 'transform': 'translate(0px)',
    // 'opacity': 1,
    // 'z-index': 9
    // });
    // }, 150 * i);
    // });// end each
    // }, 500);// end setTimeout
    // $("#modal-option-change-menu").modal();
    // })


    // $("#popup_modal").on("click",".edit-link",function(){
    // 	old_modal=$(this).parents(".modal").attr("id");
    // 	$("#"+old_modal).modal("hide");
    // 	$("#modal-edit-text-mini").val($("#modal-edit-title").val());
    // 	$("#modal-editor-link-mini").modal();
    // });
    $("#popup_modal").on("click", ".remove_source", function () {
        $("#modal-confirm-remove-item").modal();
    });
    $("#modal-confirm-remove-item").on("click", ".confirm-remove-item-save", function () {
        big_parent.remove();
        $('.modal').modal('hide');
    });
    $("#popup_modal").on("click", ".edit-remove", function () {
        big_parent.remove();
        $("#modal-editor-menu").modal('hide');
    });
    var old_page_delete;
    $("#popup_modal").on("click", ".confirm-delete-page-save", function () {
        pr('Delete page confirm click');
        // $(".index-menu-item[page-title='index']").click();
        // var page_id = old_page_delete.parent().find(".menu-item.index-menu-item").attr("page-title"); // titlenamepageremove
        var page_id = old_page_delete.parent().attr("id"); // titlenamepageremove
        pr('page_id = ' + page_id);
        old_page_delete.parents(".list_page").remove();
        // removepage(page_id);
        var page_previous_id = '';
        if (page_id == page_current_id) {
            var page_previous_id = page_list_get_page_previous_id();
            pr('page_previous_id = ' + page_previous_id);
        }
        page_list_delete(page_id);

        // Cookie management
        cookie_delete_html_body(page_id);
        cookie_delete_html_css(page_id);
        cookie_delete_html_script(page_id);
        // cookie_set("all_page_list",$('#all_page_list').val()); // TODO?
        cookie_set_page_list();

        $("#modal-confirm-delete-page").modal("hide");
        showhidecontainer();

        if (page_previous_id) {
            page_current_id = ''; // Reset page_current_id
            pr('Reset page_current_id');
            choose_page_trigger(page_previous_id);
        }
    });

    // BLOCK - DELETE
    $("#popup_modal").on("click", ".confirm-delete-module-save", function () {
        var block_jele = old_module_delete.parents(".row-element");
        var block_id = block_jele.attr('data-row-id');

        // First - Remove block
        block_jele.remove();

        // Second - Remove resources (css, js)
        var block_duplicate_count = block_count(block_id);
        if (block_duplicate_count == 0 && $("#container section[menu-name='" + menu_name_delete + "']").length <= 0) {
            var resource_class_name = 'head_item_generated_' + block_id;
            $('.' + resource_class_name).remove();
        }

        $("#modal-confirm-delete-module").modal("hide");
        DymanicMenu();
        showhidecontainer();

        save_button_toggle(true);
    });
    $("#popup_modal").on("click", ".edit-right", function () {
        if (big_parent.next().index() > 0) {
            var datanew = big_parent.next().html();
            big_parent.next().html(big_parent.html());
            big_parent.html(datanew);
            big_parent.removeClass("menu__item--current");
            big_parent.next().addClass("menu__item--current");
            big_parent = big_parent.next();
        }
        else {
            $(big_parent.parent()).prepend(big_parent.get());
        }

    });
    $("#popup_modal").on("click", ".edit-add", function () {
        $(big_parent.parent()).prepend("<li class='menu__item row-edit' data-type='menu'><a href='#'' class='menu__link'>New Menu</a></li>");
    });
    $("#popup_modal").on("click", "#modal-editor-all .text-select-font button", function (e) {
        e.stopPropagation();
        $("#modal-edit-fontstyle").modal();
    });
    $("#popup_modal").on("click", "#modal-editor-icon .remove_icon", function () {
        $("#modal-confirm-remove-icon").modal();
    });
    $("#popup_modal").on("click", "#modal-editor-icon .input-search-icons button", function () {
        list_icons_load();
    })
    var icon_old_value = " ";
    var icon_old_text = " ";
    $("#popup_modal").on("click", ".edit-icon", function () {
        $("#modal-editor-icon").modal();
        icon_old_value = $("#modal-editor-icon .preview i").attr("class");
        icon_old_text = $("#modal-editor-icon .icon-preview span").html();
    });
    $("#popup_modal").on("click", "#modal-editor-icon .close_source", function () {
        var preview_icon = $("#modal-editor-icon .preview i");
        var preview_icon1 = $("#modal-editor-icon .icon-preview i");
        var preview_name_icon = $("#modal-editor-icon .icon-preview span");
        //
        preview_icon.removeClass();
        preview_icon1.removeClass();
        preview_name_icon.html(" ");
        //
        preview_icon.addClass(icon_old_value);
        preview_icon1.addClass(icon_old_value);
        preview_name_icon.html(icon_old_text);
    });
    $("#popup_modal").on("click", "#modal-confirm-remove-icon .confirm-remove-item-icon", function () {
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
    $("#container").on("click", "*[data-type]", function (e) {
        // if(go_ele_page==true)
        // {
        // return false;
        // }
        if (preView == true) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        big_parent = $(this);

        var data_type = big_parent.attr("data-type");
        pr_test('data_type = ' + data_type);

        // Hide Blocks/Url
        $('.card').hide();
        pr('Hide Blocks/Url');
        if (data_type == 'title') { // 
           
            $("#modal-editor-title").modal();
            //get element child
            if (big_parent.children().length > 0) {
                old_data = big_parent.children().get(0);
            }

            if (big_parent.prop("tagName").toLowerCase() != "a") {
                $("#modal-editor-title .modal-edit-input-title .content-edit-link-title p").hide();
                $("#modal-editor-title .modal-edit-input-title .content-edit-link-title:nth-child(2)").hide();
            }
            else {
                $("#modal-editor-title .modal-edit-input-title .content-edit-link-title p").show();
                $("#modal-editor-title .modal-edit-input-title .content-edit-link-title:nth-child(2)").show();
                $("#modal-editor-title #modal-edit-url-mini").val(big_parent.attr("href"));
            }
        }
        if (data_type == 'link') {
            if (big_parent.attr("data-type-sub") != 'video') {
                // Show Blocks/Url
                //$('.card').show();
                pr('Show Blocks/Url');
            }
            $("#modal-edit-text").val(big_parent.text().trim());
            $("#modal-edit-url").val(big_parent.attr('href'));
            $("#modal-editor-link").modal();
        }
        if (data_type == 'image') {
            div_image = big_parent.attr('src');
            $("#modal-edit-urlimage").val(big_parent.attr('src'));
            $("#modal-editor-image").modal();
            return;
        }
        if (data_type == 'content') {
            $("#modal-editor-content").modal();
            return;
        }
        if (data_type == 'icon') {
            $("#modal-editor-icon").modal();
            return;
        }
        if (data_type == 'button') {
            $('.card').show();
            $("#modal-editor-text").modal();
            //reset icon
            if (big_parent.find(".fa").length > 0) {
                var icon = big_parent.find(".fa").attr("class");
                $(".icon-preview i").removeClass().addClass(icon);
                $(".icon-preview span").html(icon);
                $(".preview i").removeClass().addClass(icon);
                $("#list_icons .fa").removeClass("active");
                $("#list_icons").find("." + icon.split(" ")[1]).addClass("active");
            }
            else {
                $(".icon-preview i").removeClass();
                $(".icon-preview span").html(" ");
                $(".preview i").removeClass();
            }
			
			var link_url = big_parent.attr('data-payload');
			pr('link_url = ' + link_url);
			$("#modal-editor-text #tags").val(link_url);
			
            return;
        }
        // if(data_type=="bg"){
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
        if (data_type == 'menu') {
            $("#modal-editor-menu").modal();
            return;
        }
        if (data_type == "option-menu") {
            $("#modal-editor-menu-effect").modal();
            return;
        }
        if (data_type == "all") {
            $("#modal-editor-all").modal();
            return;
        }
        if (data_type == "image-link") {
            div_image_link = big_parent.attr('src');
            $("#modal-edit-imagelink-url").val(big_parent.attr('src'));
            $("#modal-edit-imagelink-link").val(big_parent.parent("a").attr("href"));
            $("#modal-editor-image-link").modal();
            return;
        }
    });

    $("#container").on("click", ".row-edit-bg", function () {
        big_parent = $(this).parents(".row-chg-bg");
        color_canvas = $("#modal-editor-bg").find(".radio-button.active").children().attr("data-color");
        $("#canvas1").children().remove();
        $("#canvas2").children().remove();
        variance_canvas = 0;
        cell_size_canvas = 40;
        $("#myRange").val(0);
        $("#myRange1").val(40);
        //canvas1
        var pattern = Trianglify({
            width: 369,
            height: 210,
            x_colors: color_canvas,
            variance: variance_canvas,
        });
        $("#canvas1").append(pattern.canvas());
        //canvas2
        var pattern = Trianglify({
            width: 369,
            height: 210,
            x_colors: color_canvas,
            cell_size: cell_size_canvas,
        });
        $("#canvas2").append(pattern.canvas());

        $("#modal-editor-bg").modal();
    });

    // BLOCK - DUPLICATE
    $("#container").on("click", ".row-duplicate", function () {
        var block_jele = $(this).parents(".row-element");
        var src_id = block_jele.attr('data-row-id'); // IMPORTANT
        pr('BLOCK - DUPLICATE - src_id = ' + src_id);
        var block_html = block_raw_html_restore(block_jele, true);
        pr('BLOCK - DUPLICATE - block_html = ' + block_html);
        block_add(block_jele, src_id, block_html);
        showhidenotificationduplicate();
        block_run_script_all();
        showhidecontainer();
    });

    // BLOCK - RESET
    $("#container").on("click", ".row-reset", function () {
        var block_jele = $(this).parents(".row-element");
        var block_generated_id = block_jele.attr('id');
        pr('Block reset button click - block_generated_id = ' + block_generated_id);

        // Cookie management
        var block_html_body = cookie_get("data-row-" + block_generated_id);
        // pr('Block reset button click - block_html_body = ' + block_html_body);
        block_jele.find('.row-builder').replaceWith(block_html_body);
        $('.row-chg-bg').append('<div class="setting-background-bt"><button type="button" data-placement="bottom" data-toggle="tooltip" title="Edit image" class="row-edit-bg btn btn-lg" data-dialog="" ><i class="fa fa-picture-o"  aria-hidden="true"></i></button></div>'); // TODO - WHAT IS IT?
        showhidecontainer();
    });

    // $("#container").on("mouseenter", ".row-element", function(){
    // 	$(this).find('.frameCover').stop().fadeIn(400);
    // 	$(this).find('.setting-background-bt').stop().fadeIn(400);
    // });

    $("#container").on("mouseleave", ".row-element", function () {
       // $(this).find('.frameCover').stop().fadeOut(400);
        //$(this).find('.setting-background-bt').stop().fadeOut(400);
    });
    $("#container").on("mouseover", "*[data-type]", function (e) {
        if (preView == true) {
            //$(this).find('.frameCover').stop().fadeOut(400);
            //$(this).find('.setting-background-bt').stop().fadeOut(400);
            //return;
        }
        $(this).parents(".row-element").find('.frameCover').stop().fadeIn(400);
        $(this).parents(".row-element").find('.setting-background-bt').stop().fadeIn(400);
        if (go_ele_page == true) {
            return false;
        }
        $("*[data-type]").css({ "outline": "", "cursor": "", "outline-offset": "" });
        if ($(this).attr("data-type") != "bg") {
            $(this).css({ "outline": "red dashed 3px", "cursor": "pointer", "outline-offset": "-3px" });
        }
        e.stopPropagation();
    });

    $("#container").on("mouseout", "*[data-type]", function () {
        $(this).css({ "outline": "", "cursor": "", "outline-offset": "" });
    });

    //Save Source
    $('.save_source').click(function () {
        save_button_toggle(true); // Allow Save change

        if (big_parent.attr("data-type") == 'title') {
            if (big_parent.parent("ul").length > 0) {
                big_parent.children().css({ "font-family": font_current, "color": color_current, "font-size": $("#modal-editor-title .text-font-size input").val(), "text-align": align_current });
                big_parent.children().text($("#modal-edit-title").val());
                big_parent.children().attr("href", $("#modal-edit-url-mini").val());
            }
            else {
                big_parent.css({ "font-family": font_current, "color": color_current, "font-size": $("#modal-editor-title .text-font-size input").val(), "text-align": align_current });
                big_parent.text($("#modal-edit-title").val());
                big_parent.attr("href", $("#modal-edit-url-mini").val());
            }

        }
        if (big_parent.attr("data-type") == 'link') {
            var link_text = $("#modal-edit-text").val();
            var link_url = $("#modal-edit-url").val();
            if (big_parent.attr("data-type-sub") == 'video') {
                pr('data-type-sub = video');
                var block_jele = big_parent.closest('.row-element');
                var video_jele = block_jele.find('video');
                video_jele.attr('src', link_url);
                video_jele[0].load();
            } else {
                big_parent.text(link_text);
                big_parent.attr("href", link_url);
            }


        }
        if (big_parent.attr("data-type") == 'image') {
            if (div_image && div_image.files && div_image.files[0]) {
				// Show image directly
                var FR = new FileReader();
                FR.onload = function (e) {
                    big_parent.attr("src", e.target.result); // Show image
					
					// Upload image to get url
					var data64_image = e.target.result;
					$.post(file_image_upload_url, {'data64_image' : data64_image}, function(response){
						pr('Handle image - response = ' + response);
						if(response){
							var image_url = response;
							big_parent.attr("src", image_url);
						}
					});
                };
                FR.readAsDataURL(div_image.files[0]);
                $("#modal-edit-chooseimage").val('');
            } else {
                if ($("#modal-edit-urlimage").val() != '') {
                    big_parent.attr('src', $("#modal-edit-urlimage").val());
                }
            }
        }
        if (big_parent.attr("data-type") == 'content') {
            big_parent.css({ "font-family": font_current, "color": color_current, "font-size": $("#modal-editor-content .text-font-size input").val(), "text-align": align_current });
            big_parent.text($("#modal-edit-content").val());

        }
        if (big_parent.attr("data-type") == 'bg') {
            if (div_image_bg && div_image_bg.files && div_image_bg.files[0]) {
                var FR = new FileReader();
                FR.onload = function (e) {
                    big_parent.css({
                        "background-image": "url(" + e.target.result + ")",
                        "background-position": "center center",
                        "background-size": "cover"
                    });
                }
                FR.readAsDataURL(div_image_bg.files[0]);
                $("#modal-edit-choosebg").val('');
            } else {
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
                $.post(root + 'home/save_bg', {
                    data64: data_image
                }, function (res) {
                    big_parent.css('background-image', 'url("' + res + '")');
                });
            }
        }
        if (big_parent.attr("data-type") == 'button') {
            var nameicon = $("#modal-editor-icon .preview i");
            var classicon = nameicon.attr("class");
            var split_classicon = classicon.split(" ");
            var styleicon = nameicon.attr("style");
            var namebutton = $("#modal-edit-button").val();
            big_parent.css({ "font-family": font_current, "color": color_current, "font-size": $("#modal-editor-text .text-font-size input").val() });
            big_parent.children("i").remove();
            big_parent.html(namebutton);
            if (split_classicon.length > 1) {
                big_parent.prepend("<i class='" + classicon + "' style='" + styleicon + ";margin-right:5px;' ></i>");
            }
			var link_url = $("#modal-editor-text #tags").val();
			pr('link_url = ' + link_url);
			big_parent.attr('data-payload', link_url);
            // if(nameicon!="")
            // {
            // 	big_parent.prepend("<i class='"+classicon+"' style='"+styleicon+";margin-right:5px;' ></i>");
            // }
        }
        if (big_parent.attr("data-type") == 'menu') {
            var nameicon = $("#modal-editor-icon .preview i");
            var classicon = nameicon.attr("class");
            var styleicon = nameicon.attr("style");
            big_parent.css({ "font-family": font_current, "color": color_current, "font-size": size_current });
            big_parent.find("i").remove();
            if (nameicon != "") {
                big_parent.children("a").html("<i class='" + classicon + "' style='" + styleicon + ";margin-right:5px;' ></i>" + " " + $("#modal-edit-text").val());
            }
            else {
                //setting link
                big_parent.find("a").text($("#modal-edit-text").val());
            }
            big_parent.find("a").attr("href", $("#modal-edit-url").val());

        }
        if (big_parent.attr("data-type") == 'all') {
            big_parent.css({ "font-family": font_current, "color": color_current, "font-size": $("#modal-editor-all .text-font-size input").val(), "text-align": align_current });
            big_parent.children().css({ "font-family": font_current, "color": color_current, "font-size": $("#modal-editor-all .text-font-size input").val(), "text-align": align_current });
        }

        if (big_parent.attr("data-type") == "image-link") {
            if (div_image_link && div_image_link.files && div_image_link.files[0]) {
                var FR = new FileReader();
                FR.onload = function (e) {
                    big_parent.attr("src", e.target.result);
                };
                FR.readAsDataURL(div_image_link.files[0]);
                $("#modal-edit-chooseimagelink").val('');
            } else {
                if ($("#modal-edit-imagelink-url").val() != '') {
                    big_parent.attr('src', $("#modal-edit-imagelink-url").val());
                }
            }
            big_parent.attr("src", $("#modal-edit-imagelink-url").val());
            big_parent.parent("a").attr("href", $("#modal-edit-imagelink-link").val());
        }
        if (big_parent.attr("data-type") == "icon") {
            var nameicon = $("#modal-editor-icon .preview i");
            var classicon = nameicon.attr("class");
            var split_classicon = classicon.split(" ");
            var styleicon = nameicon.attr("style");
            big_parent.html("<i class='" + classicon + "' style='" + styleicon + ";'></i>");
        }




        $('.modal').modal('hide');


        // call function save change text menu
        ChangOptionModel(big_parent.attr('href'), $('#modal-edit-title').val());

        // call back function for menu type - 3 after 2 secon
        setTimeout(function () {
            if ($('.navi-type-3').length > 0) {
                // active menu DES&M0B option 3
                // MenuOption($('.navi-type-3 .menu-des li'), $('.navi-type-3 .menu-mb li'));

                // ActiveNavigation3();

            }
        }, 2000);
    });
    $('#modal-edit-chooseimage').change(function () {
        div_image = this;
    });

    $('#modal-edit-choosebg').change(function () {
        div_image_bg = this;
    });

    $("#modal-edit-chooseimagelink").change(function () {
        div_image_link = this;
    })

    //Choose Page
    $("#page-top ul").on("click", ".list_page a", function (e) {
        var page_id = $(this).parent().attr('id');
        var page_name = $(this).attr('page-title');
        pr('Page menu click - page_id = ' + page_id);
        if ($(this).attr("contenteditable") != "true") {
            $(".list_page .menu-item.index-menu-item").each(function () {
                if ($(this).attr("contenteditable") == "true") {
                    //check name page exist
                    $.each(page_list, function (page_id, page_name) {
                        if ($(this).html().trim() == page_name && $(this).parent().find(".menu-item.index-menu-item").html().trim() != page_current_name) {
                            $(this).attr("title", "name page exist");
                            $(this).attr("data-original-title", "name page exist");
                            $(this).css("border-color", "#f36161");
                            $(this).tooltip("open");
                            return false;
                        }
                    });

                    //show icon
                    showhideiconeditpage(true, $(this).parents(".list_page"));
                    $(this).attr("contenteditable", "false");
                    renamepage($(this).parents(".list_page").find(".index-menu-item"));
                    $(this).removeAttr("title data-original-title style");
                    //save page with new name
                    // save_page(); // TODO - NO NEED
                    $(this).click();
                }
            })

            $(".list_page").removeClass("active");
            $(this).parent().addClass("active");
            // $(".title-page-selected").html(page_name+".html");
            choose_page(page_id);
            showhidecontainer();
            return false;
        }

        $(".list_page").removeClass("active");
        $(this).parent().addClass("active");
        $(".title-page-selected").html(page_name + ".html");
        choose_page(page_id);
        showhidecontainer();

    });
    //Add Page
    $('#btn-menu-add').click(function () {
        addpage(true);
    });
    //remove page
    $("#page-top ul").on("click", ".edit-remove-page", function (e) {
        $("#modal-confirm-delete-page").modal();
        old_page_delete = $(this);
        e.stopPropagation();
    });

    //change name page
    $("#page-top ul").on("click", ".edit-change-name-page", function (e) {
        showhideiconeditpage(false, $(this).parents(".list_page"));
        $(this).parent().find(".menu-item.index-menu-item").attr("contenteditable", "true").focus();
        $(this).parent().find(".menu-item.index-menu-item").css({ "border-style": "solid", "border-width": "1px 1px 3px 1px", "border-color": "#b5bbf4", "cursor": "inherit" })
        showhidecontainer();
        e.stopPropagation();
    });

    //change name page success
    $("#page-top ul").on("click", ".edit-success-page", function (e) {
        var page_menu_name_jele = $(this).parent().find(".menu-item.index-menu-item");
        //check name page exist
        $.each(page_list, function (page_id, page_name) {
            if (page_menu_name_jele.html().trim() == page_name && page_menu_name_jele.html().trim() != page_current_name) {
                $(this).parent().find(".menu-item.index-menu-item").attr("title", "name page exist");
                $(this).parent().find(".menu-item.index-menu-item").attr("data-original-title", "name page exist");
                $(this).parent().find(".menu-item.index-menu-item").css("border-color", "#f36161");
                $(this).parent().find(".menu-item.index-menu-item").tooltip("open");
                return false;
            }
        });

        //show icon
        showhideiconeditpage(true, $(this).parents(".list_page"));
        $(this).parent().find(".menu-item.index-menu-item").attr("contenteditable", "false");
        renamepage(page_menu_name_jele);
        $(this).parent().find(".menu-item.index-menu-item").removeAttr("title data-original-title style");
        //save page with new name
        $(".header-children-page-breadcum").find("li").eq(1).html($(this).parent().find(".menu-item.index-menu-item").html());
        // save_page(); // TODO - NO NEED
        $(this).parents(".list_page").find(".index-menu-item").click();
        showhidecontainer();
        e.stopPropagation();
    });

    // PAGE - DUPLICATE
    $("#page-top ul").on("click", ".edit-duplicate-page", function (e) {
        pr('duplicate button click');
        var page_id_new = addpage(false);
        pr('duplicate button click - page_id_new = ' + page_id_new);
        if (page_id_new) {
            var page_id = $(this).parents(".list_page").attr('id');
            duplicate(page_id, page_id_new);
            choose_page_trigger(page_id_new);
        }
        showhidecontainer();
    });


    // demo menu option 
    $('.type-menu-3-op a').click(function () {
        $('.type-menu-3-op a').removeClass('menu__item--current');
        $(this).addClass('menu__item--current');
        ActiveNavigation3Demo();
    });
    $('#btn-preview').click(function () {
        go_ele_page = true;
        preView = true;
        // hide hover menu option
        $('.hover-menu-change').css({ 'display': 'none' });

        // chage position menu
        $('.commont-menu').css({ 'position': 'fixed', 'left': '0', 'top': 0, 'padding-left': '40px', 'padding-right': '40px', 'z-index': 999 });
    });
    $('#btn-close-preview').click(function () {
        go_ele_page = false;
        preView = false;
        // show hover menu option
        $('.hover-menu-change').css({ 'display': 'block' });

        // chage position menu
        $('.commont-menu').css({ 'position': 'static', 'padding-left': '0px', 'padding-right': '0px' }).removeClass('fix-menu-top-0');
        //$('.commont-menu').css({'padding-top:': '30px', 'height': '102px'});

    });
    var flag_add_element = true;
    // demo menu top 0 or 80px
    $(window).scroll(function () {
        if (preView) {
            if ($(window).scrollTop() < 75) {
                $('.commont-menu').css({ 'position': 'static' });
                $('.height-102').remove();
            } else {
                if (flag_add_element) {
                    $('.header-page').prepend('<div class="height-102" style="height:102px"></div>');
                    flag_add_element = false;
                }
                $('.commont-menu').css({ 'position': 'fixed', 'left': '0', 'top': '0', 'padding-left': '40px', 'padding-right': '40px', 'z-index': 999, 'width': '100%' });
            }// end else
        } else {
            $('.commont-menu').css({ 'position': 'static' });
        }

    }); // end window
 
});

function choose_page_trigger(page_id) {
    pr('choose_page_trigger - page_id = ' + page_id);
    setTimeout(function () {
        $('#' + page_id + ' > a').trigger('click');
    }, 200);
}
function choose_page(page_id) {
    pr('choose_page - page_id = ' + page_id + ' - page_current_id = ' + page_current_id);
    if (page_id != page_current_id) {
        if (page_current_id) {
            save_page(); // First, save current page
            save_button_toggle(true);
        }

        page_list_update_current_id(page_id); // Then, update page_current_id, page_current_name
        pr('choose_page - update page_current_id = ' + page_current_id);

        $('html').find('link[date-type="require"]').remove();
        $('html').find('script[date-type="require"]').remove();
        $('.head-page-text').html(page_id + '.html');

        var html_body = cookie_get_html_body(page_id);
        var html_css = cookie_get_html_css(page_id);
        var html_script = cookie_get_html_script(page_id);
        if (html_body) {
            $('#container').html(html_body);
            if (html_css) {
                $('head').append(html_css);
            }
            if (html_script) {
                $('body').append(html_script);
            }

            setTimeout(function () {
                block_run_script_all();
            }, 1000)
        } else {
            $('#container').html('');
        }
    }
}

function get_page_content_arr(page_id) {
    var return_arr = {};
    return_arr['html_body'] = cookie_get_html_body(page_id);
    return_arr['html_css'] = cookie_get_html_css(page_id);
    return_arr['html_script'] = cookie_get_html_script(page_id);
    return return_arr;
}

function close_editor(e) {
    e.parents("#container").sortable('enable');
    e.parents(".row-element").find('.aceEditor').remove();
    e.parents(".row-element").find('.frameCover .setting-group-bt').show();
    e.parents(".row-element").find('.setting-background-bt').show();
    e.parents(".row-element").find('.frameCover .row-save').hide();
    e.parents(".row-element").find('.frameCover .row-close').hide();
    e.parents(".row-element").find('.row-builder').show();

}

// PAGE - EXPORT - FOR LOCAL OPEN
function export_extract_css_script(html, is_css) {
    var content = '';

    var pattern_begin = is_css ? 'href="' : 'src="';
    var pattern_end = '">';
    var pattern = new RegExp(pattern_begin + '(.*?)' + pattern_end, "g");
    var match_arr = html.match(pattern);
    if (match_arr && match_arr.length) {
        for (var i = 0; i < match_arr.length; i++) {
            var line = match_arr[i];
            line = line.substring(pattern_begin.length, line.length - pattern_end.length);
            if (i > 0) {
                content += ';';
            }
            content += line;
        }
    }

    return content;
}

function export_template() {
    var error_label_jele = $('#modal-export .export-item-input .error-validate');
    var purchase_code = $('#export_code').val();
    if ($.trim(purchase_code) == '') {
        error_label_jele.html('Please enter purchase code!');
        error_label_jele.show();
    } else {
        error_label_jele.hide();

        $.post(root + 'export_buyer_save', { purchase_code: purchase_code }, function (data) {
            if (data) {
                var json_data = $.parseJSON(data);
                if (json_data['message'] == 'success') {
                    export_template_download();
                } else {
                    error_label_jele.html('Invalid purchase code!');
                    error_label_jele.show();
                }
            }
        });
    }
}
function export_template_download() {
    $('.modal').modal('hide');
    myloading();
    save_page();
    var all_page = $('#all_page_list').val();
    var arr_split = all_page.split(',');
    var total_page = Object.keys(page_list).length;
    var export_allow = true;
    $.each(page_list, function (page_id, page_name) {
        pr('each page_list - page_id = ' + page_id);
        if (!export_allow) {
            return;
        }

        var content_arr = get_page_content_arr(page_id);
        var data_html = content_arr.html_body;
        var html_css = content_arr.html_css;
        // pr('html_css = ' + html_css);
        var data_css = export_extract_css_script(html_css, true);
        // pr('data_css = ' + data_css);

        var html_script = content_arr.html_script;
        // pr('html_script = ' + html_script);
        var data_script = export_extract_css_script(html_script, false);
        // pr('data_script = ' + data_script);

        var page_num = parseInt(page_id.replace('page', ''));
        pr('page_num = ' + page_num);
        $.post(root + 'export', {
            total_page: total_page,
            page_num: page_num,
            page_name: page_id,
            data: data_html,
            data_script: data_script,
            data_css: data_css,
            title: $('#export_title').val(),
            description: $('#export_description').val(),
            keywords: $('#export_keyword').val()
        }, function (data) {
            if (data) {
                var json_data = $.parseJSON(data);
                if (json_data['message'] == 'success') {
                    pr('json_data');
                    pr(json_data);
                    if (page_num == total_page) {
                        if (json_data['download_url']) {
                            location.href = json_data['download_url']; // To download exported zip file
                            $(".modal-loading").remove();
                            $("html").removeAttr("style");
                        }
                    } else {
                        if (!json_data['continue']) {
                            export_allow = false;
                        }
                    }
                }
            }
        });
    });
}


function addpage(is_choose_page_trigger) {
    pr('addpage');
    var page_id = 0;

    // Create new page_id
    var page_count = $(".list_page").length;
    page_count++;
    page_id = 'page' + page_count;
    pr('addpage - page_id = ' + page_id);
    // page_current_id = page_id; // TODO - NO NEED - WRONG???

    // Create page_name
    var page_number_max = 1;
    $(".list_page").each(function () {
        var pagename = $(this).children("a").attr("page-title");
        if (pagename.indexOf("Page") == 0) {
            var page_number = parseInt(pagename.replace("Page", ""));
            if (page_number > page_number_max) {
                page_number_max = page_number;
            }
        }
    });
    number = page_number_max + 1;
    page_name = 'Group' + number;

    // Add menu of page
    var html = page_list_add(page_id, page_name);
    $(html).insertBefore($("#btn-menu-add").parent());

    if (is_choose_page_trigger) {
        choose_page_trigger(page_id);
    }

    return page_id;
}

/*
function removepage(page_id)
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
	

}*/

function showhideiconeditpage(boolean, id) {
    if (boolean == false) {
        $(id).find(".edit-change-name-page").hide();
        $(id).find(".edit-duplicate-page").hide();
        $(id).find(".edit-remove-page").hide();
        $(id).find(".edit-success-page").show();
    }
    else {
        $(id).find(".edit-change-name-page").show();
        $(id).find(".edit-duplicate-page").show();
        $(id).find(".edit-remove-page").show();
        $(id).find(".edit-success-page").hide();
    }
}
var old_pagename;
function renamepage(jele) { // Old param is id
    /*
	//rename all_list_page
	// removepage(old_pagename);
	page_list_delete(page_current_id); // TODO
	
	$("#all_page_list").val($("#all_page_list").val()+","+id.html().trim());
	
	// Cookie management
	cookie_delete_html_body(old_pagename);
	cookie_delete_html_css(old_pagename);
	cookie_delete_html_script(old_pagename);
	
	//rest
	$("#page_active").val(id.html().trim()); // TODO
	*/

    var page_name = jele.html().trim();
    page_list_update_current_name(page_name);
    jele.attr("page-title", page_name);
}
function duplicate(page_id, page_id_new) {
    // Cookie management
    cookie_set_html_body(page_id_new, cookie_get_html_body(page_id));
    var html_css = cookie_get_html_css(page_id);
    var html_script = cookie_get_html_script(page_id);
    if (html_css) {
        cookie_set_html_css(page_id_new, html_css);
    }
    if (html_script) {
        cookie_set_html_script(page_id_new, html_script);
    }
}

function showhidecontainer() {
    if ($("#container").find("section").length > 0) {
        $("#container").addClass("changed");
    }
    else {
        $("#container").removeClass("changed");
    }
}
$(document).ready(function () {
    showhidecontainer();
    $("#import-file-page").uploadFile({
        url: root + "home/import",
        multiple: false,
        dragDrop: false,
        maxFileCount: 1,
        fileName: "importFile",
        onSubmit: function (files) {
            myloading();
        },
        onSuccess: function (files, data, xhr, pd) {
            import_zip(data);
            showhidenotification();
            showhidecontainer();
            // $("#eventsmessage").html($("#eventsmessage").html()+"<br/>Success for: "+JSON.stringify(data));
        }
    });
    $("#btn-menu-export-import").click(function () {
        $("#import-file-page").find("input").click();
    })
});


$('body').on('click', '.commont-menu .menu-des li', function () {
    //$(this).position().left + ($(this).width()/2) + 10;
    DemoMenu3($(this).position().left + ($(this).width() / 2));
});

$('body').on('hover', '.commont-menu .menu-des li', function () {
    alert($(this).attr('style'));
});

// Active navigation 3
function DemoMenu3(para) {

    var ele_span = $('.navi-type-3 .menu-des li:last-child span');
    var pos_left = 0;
    var status = '';

    // check elemet exist
    pos_left = para;


    if (pos_left > cur_demo_type_3) {
        status = 'right';
        cur_demo_type_3 = pos_left;
    } else {
        status = 'left';
        cur_demo_type_3 = pos_left;
    }
    if (status == 'left') {
        ele_span.eq(0).stop().animate({
            'left': (pos_left - 10) + 'px'
        }, 700);
        ele_span.eq(1).stop().animate({
            'left': pos_left + 'px'
        }, 750);
        ele_span.eq(2).stop().animate({
            'left': (pos_left + 10) + 'px'
        }, 900);
    } else {
        ele_span.eq(0).stop().animate({
            'left': (pos_left - 10) + 'px'
        }, 900);
        ele_span.eq(1).stop().animate({
            'left': pos_left + 'px'
        }, 750);
        ele_span.eq(2).stop().animate({
            'left': (pos_left + 10) + 'px'
        }, 700);
    }

}// end function
//---------------AutoComplete UI
$(function () {
    var availableTags = [
      "Block-1",
      "Block-2",
      "Block-3",
      "Block-4",    
    ];
    $("#tags").autocomplete({
        source: availableTags
    });
});