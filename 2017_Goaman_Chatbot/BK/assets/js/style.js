$(window).on("load",function(){
	mycarousel(".carousel-home-1",1,1,1,true,false,5000);
	mycarousel(".list-post",3,3,1,true,false,5000);
});
$(window).on("load resize",function(){
	$("body").removeAttr("style");
	$(".signup-right").removeClass("active");
	//câu dưới là <1025 thì chạy giao diện mobile....oke hk
	if($(window).width() < 1025 || navigator.userAgent.match(/iPad/i) != null){//ipad ngang tro xuong
		$(".main-content").css("margin-left","auto");

		$(".mobile-menu").show();

		$(".top-menu").hide();
		$(".side-menu").hide();
	}
	else{
		//chỗ này là chạy giao diện pc
		$(".mobile-menu").hide();

		$(".top-menu").show();
		$(".side-menu").show();
	}
	
	setTimeout(function(){
		$(".mobile-menu .wrap-slide-text").width($(".mobile-top-menu").width() - $(".mobile-menu .logo").outerWidth() - $(".mobile-menu .icon-show-menu-mobile").outerWidth() - $(".mobile-menu .text-logo").outerWidth() - $(".mobile-menu .mobile-menu-right-icon").outerWidth() - 15);
		$(".top-menu .wrap-slide-text").width($(".top-menu").width() - ( $(".top-menu .logo").outerWidth() + $(".top-menu .text-logo").outerWidth() + $(".top-menu .wrap-login").outerWidth() ) - 15);
	},400);
});

$(window).on("load",function(){
	
	/*-----show hide side menu pc*/
	$(".side-menu").on("mouseenter",function(){
		if($(window).width() >= 1025 && navigator.userAgent.match(/iPad/i) == null){
			$(this).addClass("active");
			$(".side-menu-item").css("opacity","1");
			$(".img-mobile-search").css("opacity","1");
		}
	});
	$(".side-menu").on("mouseleave",function(){
		if($(window).width() >= 1025 && navigator.userAgent.match(/iPad/i) == null){
			$(this).removeClass("active");
			$(".side-menu-item").css("opacity","0");
			$(".img-mobile-search").css("opacity","0");
		}
	});

	/*------show hide side menu mobile*/
	$(".mobile-top-menu .icon-show-menu-mobile").on("click",function(){
		if($(".mobile-side-menu").hasClass("active")){
			$(".mobile-side-menu").removeClass("active");

			$(".wrap-side-menu").removeClass("active");
		}else{
			$(".mobile-side-menu").addClass("active");
			$(".wrap-side-menu").addClass("active");
			$("li.side-menu-item").css("opacity","1");
		}
	});
	$(".profile-title").on('click',function(){
		$(".profile-title").removeClass("active");
		$(this).addClass("active");
		$(".mobile-side-menu").removeClass("active");
		$(".wrap-side-menu").removeClass("active");
	});
	$(".wrap-side-menu").on("click",function(){
		$(".mobile-side-menu").removeClass("active");
		$(".wrap-side-menu").removeClass("active");
	});
	$(".mobile-menu-right-icon").on("click",function(){
		if($(".mobile-right-menu").hasClass("active")){
			$(".mobile-right-menu").removeClass("active");
		}else{
			$(".mobile-right-menu").addClass("active");
		}
	});

	/*show hide sign up*/
	$(".signup , .login").on("click",function(){
		//check content active
		var contentSignupFormActive = $(".signup-right").hasClass("active");
		//check what is click button (signup or login)
		var signup = $(this).hasClass("signup");

		$(".signup-right").addClass("active");
		$('body').css("overflow","hidden");
		//check signup has active
		if(signup){
			if(contentSignupFormActive){
				if($("#signup-form").hasClass('active')){
					$(".signup-right").removeClass("active");
					$('body').css("overflow","auto");
				}else{
					$(".signup-right .nav-tabs a[href='#signup-form']").click();
				}
			}else{
				$(".signup-right .nav-tabs a[href='#signup-form']").click();
			}
		}else{
			if(contentSignupFormActive){
				if($("#login-form").hasClass('active')){
					$(".signup-right").removeClass("active");
					$('body').css("overflow","auto");
				}else{
					$(".signup-right .nav-tabs a[href='#login-form']").click();
				}
			}else{
				$(".signup-right .nav-tabs a[href='#login-form']").click();
			}
		}
	});
	$(".mobile-signup , .mobile-login").on("click",function(){
		//check content active
		var contentSignupFormActive = $(".signup-right").hasClass("active");
		//check what is click button (signup or login)
		var signup = $(this).hasClass("mobile-signup");

		$(".signup-right").addClass("active");
		$('body').css("overflow","hidden");
		//check signup has active

		$(".mobile-side-menu").removeClass("active");
		$(".wrap-side-menu").removeClass("active");
		if(signup){
			if(contentSignupFormActive){
				if($("#signup-form").hasClass('active')){
					$(".signup-right").removeClass("active");
					$('body').css("overflow","auto");
				}else{
					$(".signup-right .nav-tabs a[href='#signup-form']").click();
				}
			}else{
				$(".signup-right .nav-tabs a[href='#signup-form']").click();
			}
		}else{
			if(contentSignupFormActive){
				if($("#login-form").hasClass('active')){
					$(".signup-right").removeClass("active");
					$('body').css("overflow","auto");
				}else{
					$(".signup-right .nav-tabs a[href='#login-form']").click();
				}
			}else{
				$(".signup-right .nav-tabs a[href='#login-form']").click();
			}
		}
	});

	// close (show - hide) sign up
	$(".close-signup").on("click",function(){
		if($(".signup-right").hasClass("active")){
			$(".signup-right").removeClass("active");
			$('body').css("overflow","auto");
		}else{
			$(".signup-right").addClass("active");
		}
	});


	$(".mobile-login").on("click",function(){
		if($(".login-right").hasClass("active")){
			$(".login-right").removeClass("active");
		}else{
			$(".login-right").addClass("active");
		}
	});
	$(".mobile-login").on("click",function(){
		$('.login-right').css("z-index","2");
	});

	// close (show - hide) login
	$(".close-login").on("click",function(){
		if($(".login-right").hasClass("active")){
			$(".login-right").removeClass("active");
			$('body').css("overflow","auto");
		}else{
			$(".login-right").addClass("active");
		}
	});

	// step signup next button
	$('.signup-next-btn').on("click",function(){
		var step = $(this).closest(".section-form").attr("data-step");
		var flag = true;
		$('.section-form[data-step="'+ step +'"] .alert-error').remove();

		$('.section-form[data-step="'+ step +'"] input').each(function(){
			checkvalidate($(this));
		});

		if($('.section-form[data-step="'+ step +'"]').find(".alert-error").length == 0){
			step++;
			$('.section-form[data-step="'+ step +'"]').addClass("active");
		}
	});

	//step signup pre button
	$('.signup-pre-btn').on("click",function(){
		$(this).closest(".section-form").removeClass("active");
	});
	

	$('.step2 li a').on("click", function() {
		$(this).css("color","#f39200");
	});
	$('.step2 li a').on("click", function() {
		$(this).css("color","#f39200");
	});


    $(".icon-find img").on("click",function(){
		if($(".search-find-icon").hasClass("active")){
			$(".search-find-icon").removeClass("active");
		}else{
			$(".search-find-icon").addClass("active");
			if($(".search-fire-icon").hasClass("active")){
				$(".search-fire-icon").removeClass("active");
			}
			if($(".search-music-icon").hasClass("active")){
				$(".search-music-icon").removeClass("active");
			}
		}
	});

    $(".icon-fire img").on("click",function(){
		if($(".search-fire-icon").hasClass("active")){
			$(".search-fire-icon").removeClass("active");
		}else{
			$(".search-fire-icon").addClass("active");
			if($(".search-find-icon").hasClass("active")){
				$(".search-find-icon").removeClass("active");
			}
			if($(".search-music-icon").hasClass("active")){
				$(".search-music-icon").removeClass("active");
			}
		}
	});
    $(".icon-music img").on("click",function(){
		if($(".search-music-icon").hasClass("active")){
			$(".search-music-icon").removeClass("active");
		}else{
			$(".search-music-icon").addClass("active");
			if($(".search-find-icon").hasClass("active")){
				$(".search-find-icon").removeClass("active");
			}
			if($(".search-fire-icon").hasClass("active")){
				$(".search-fire-icon").removeClass("active");
			}
		}
	});
	// $(".profile-setting").on("click",function(){
	// 	//alert('a');
	// 	//console.log($("#user_type_id").val());
	// 	// var i = $("#user_type_id").val();
	// 	// 	for(i=1;i<=7;i++){
	// 	// 		$("#url_profile").attr('readonly','readonly');
	// 	// 	}
	// 	// 	$("#url_profile").removeAttr('readonly');
	// 	switch($("#user_type_id").val()){
	// 		case '1':
	// 		$("#url_profile").attr('readonly','readonly');
	// 		break;
	// 		case '2','3': 
	// 		$("#url_profile").removeAttr('readonly');

	// 	}
	// });
	$('input:radio[name="gender"]').change(function(){
   	switch($(this).val()){
   		case '1':
   		$('.url').show();
   		$('.founder').hide();
   		$('.biiography').show();
   		$('.shortbio').show();
   		$('.status').show();
   		$('.marketing').show();
   		$('.contact').show();
   		$('.distributor').hide();
   		$('.facebook').show();
   		$('.twitter').show();
   		$('.bandcamp').show();
   		$('.soundcloud').show();
   		$('.mixcloud').show();
   		$('.itunes').hide();
   		$('.beatport').hide();
   		break;
   		case '2':
   		$('.url').show();
   		$('.founder').show();
   		$('.biiography').show();
   		$('.shortbio').show();
   		$('.status').show();
   		$('.marketing').hide();
   		$('.contact').show();
   		$('.distributor').hide();
   		$('.facebook').show();
   		$('.twitter').show();
   		$('.bandcamp').show();
   		$('.soundcloud').show();
   		$('.mixcloud').show();
   		$('.itunes').show();
   		$('.beatport').show();
   		break;
   		case '3':
   		$('.url').show();
   		$('.founder').show();
   		$('.biiography').show();
   		$('.shortbio').show();
   		$('.status').show();
   		$('.marketing').show();
   		$('.contact').show();
   		$('.distributor').show();
   		$('.facebook').show();
   		$('.twitter').show();
   		$('.bandcamp').show();
   		$('.soundcloud').show();
   		$('.mixcloud').show();
   		$('.itunes').show();
   		$('.beatport').show();
   		break;
   		case '4':
   		$('.url').show();
   		$('.founder').hide();
   		$('.biiography').show();
   		$('.shortbio').show();
   		$('.status').show();
   		$('.marketing').show();
   		$('.contact').show();
   		$('.distributor').hide();
   		$('.facebook').show();
   		$('.twitter').show();
   		$('.bandcamp').show();
   		$('.soundcloud').show();
   		$('.mixcloud').show();
   		$('.itunes').hide();
   		$('.beatport').hide();
   		break;
   		case '5':
   		$('.url').show();
   		$('.founder').show();
   		$('.biiography').show();
   		$('.shortbio').show();
   		$('.status').show();
   		$('.marketing').show();
   		$('.contact').show();
   		$('.distributor').show();
   		$('.facebook').show();
   		$('.twitter').show();
   		$('.bandcamp').show();
   		$('.soundcloud').show();
   		$('.mixcloud').show();
   		$('.itunes').show();
   		$('.beatport').show();
   		break;
   		case '6':
   		$('.url').hide();
   		$('.founder').hide();
   		$('.biiography').hide();
   		$('.shortbio').hide();
   		$('.status').hide();
   		$('.marketing').hide();
   		$('.contact').hide();
   		$('.distributor').hide();
   		$('.facebook').hide();
   		$('.twitter').hide();
   		$('.bandcamp').hide();
   		$('.soundcloud').hide();
   		$('.mixcloud').hide();
   		$('.itunes').hide();
   		$('.beatport').hide();
   		break;
   		case '7':
   		$('.url').hide();
   		$('.founder').hide();
   		$('.biiography').hide();
   		$('.shortbio').hide();
   		$('.status').hide();
   		$('.marketing').hide();
   		$('.contact').hide();
   		$('.distributor').hide();
   		$('.facebook').hide();
   		$('.twitter').hide();
   		$('.bandcamp').hide();
   		$('.soundcloud').hide();
   		$('.mixcloud').hide();
   		$('.itunes').hide();
   		$('.beatport').hide();
   		break;
   	}
});
})
$(window).on("load resize",function(){
	//height signup wrap
	$(".signup-right .tab-content").height($(".signup-wrap").outerHeight() -  $(".tab-menu-signup").outerHeight());
	$(".profile--tab .tab-content").height($(".profile-wrap").outerHeight() -  $(".tab-profile").outerHeight());
})


function mycarousel(id,itemdestop,itemtable,itemmobile,itemloop,dots,autoplay){
	try{
		$(id).find(".carousel").each(function(){

			if(itemdestop == 1 && itemtable == 1 && itemmobile == 1){
				$(this).css('display','block');
				var owl=$(this).find(".carousel-items").slick({
					infinite:itemloop,
					arrows:false,
					dots:dots,
					autoplay:autoplay,
					autoplaySpeed:5000,
					 onBeforeChange: function() {
					
					}
				});


				$(this).find(".carousel-prev").click(function(){
					owl.slick('slickPrev');
				});
				$(this).find(".carousel-next").click(function(){
					owl.slick('slickNext');
				});
			
			}

			else{
				var owl=$(this).find(".carousel-items").slick({
					slidesToShow:itemdestop,
					infinite:itemloop,
					arrows:false,
					dots:dots,
					autoplay:autoplay,
					responsive:[
						{
							breakpoint:1199,
							settings:{
								slidesToShow:itemtable
							}
						},
						{
							breakpoint:767,
							settings:{
								slidesToShow:itemmobile
							}
						}
					]
				});
				$(this).find(".carousel-prev").click(function(){
					owl.slick('slickPrev');
				});
				$(this).find(".carousel-next").click(function(){
					owl.slick('slickNext');
				});
			}
		});
	}
	catch(err){
		console.log(err);
	}
}


var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}
if ((is_chrome)&&(is_opera)) {is_chrome=false;}


// check validate
function checkvalidate(input){
	validate(input);
	input.on("keyup change",function(){
		input.next(".alert-error").remove();
		validate(input);
	});
}

function validate(input){
	//check empty
	if(input.attr("data-required") == "true" && !input.val() ){
		var dataError = input.attr("data-error") || "Error";
		input.after("<div class='alert-error'>"+dataError+"</div>");
		input.css("border-color","#f39200");
		return false;
	}
	//check regex
	if(input.attr("data-required") == "true" && input.val().length < 4 ){
		var dataError = "Enter 4 or more characters";
		input.after("<div class='alert-error'>"+dataError+"</div>");
		input.css("border-color","#f39200");
		return false;
	}
	var regex = /[^\w\s]/gi;
	if(input.attr("data-check") == "true" && regex.test(input.val()) == true){
		var dataError = "No special characters";
		input.after("<div class='alert-error'>"+dataError+"</div>");
		input.css("border-color","#f39200");
		return false;
	}
	//check type email
	if(input.attr("type") == "email"){
		if(isValidEmailAddress(input.val()) != true){
			input.after("<div class='alert-error'> Enter a vaild email address</div>");
			input.css("border-color","#f39200");
			return false;
		}
	}
	//check type radio
	if(input.attr("type") == "radio"){
		var name = input.attr("name");
		if(!input.parent().find("input[name="+name+"]:checked").val()){
			input.parent().find("input[name="+name+"]").next(".alert-error").remove();
			input.after("<div class='alert-error'> Please checked your type username</div>");
			input.css("border-color","#f39200");
			return false;
		}
	}
	input.removeAttr("style");
	return true;
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

//profile
$(window).on("load",function(){
    $(".menu-profile-right").on("click",function(){
			$(".menu-profile-toggle").toggle(200);
    });
    /*show hide sign up*/
	$(".profile-tickets").on("click",function(){
		$(".profile-tickets-detail").show();
	});
	/*show hide profile tickets*/
	$(".profile-tickets").on("click",function(){
		if($(".profile-tickets-detail").hasClass("active")){
			$(".profile-tickets-detail").removeClass("active");
			$('body').css("overflow","auto");
		}else{
			$(".profile-tickets-detail").addClass("active");
			if($(".profile-view-detail").hasClass("active")){
				$(".profile-view-detail").removeClass("active");
			}
			if($(".profile-setting-detail").hasClass("active")){
				$(".profile-setting-detail").removeClass("active");
			}
			$('body').css("overflow","hidden");
		}
	});

	/*show hide profile view*/
	$(".profile-view, .author").on("click",function(){
		if($(".profile-view-detail").hasClass("active")){
			$(".profile-view-detail").removeClass("active");
			$('body').css("overflow","auto");
		}else{
			$(".profile-view-detail").addClass("active");
			if($(".profile-tickets-detail").hasClass("active")){
				$(".profile-tickets-detail").removeClass("active");
			}
			if($(".profile-setting-detail").hasClass("active")){
				$(".profile-setting-detail").removeClass("active");
			}
			$('body').css("overflow","hidden");
		}
	});

	/*show hide profile setting*/
	$(".profile-setting").on("click",function(){
		if($(".profile-setting-detail").hasClass("active")){
			$(".profile-setting-detail").removeClass("active");
			$('body').css("overflow","auto");
		}else{
			$(".profile-setting-detail").addClass("active");
			if($(".profile-view-detail").hasClass("active")){
				$(".profile-view-detail").removeClass("active");
			}
			if($(".profile-tickets-detail").hasClass("active")){
				$(".profile-tickets-detail").removeClass("active");
			}
			$('body').css("overflow","hidden");
		}
	});


	// close (show - hide) profile
	$(".close-profile").on("click",function(){
		$(".profile--tab").removeClass("active");
		$(".profile--tab").removeAttr('style');
		$('body').css("overflow","auto");
	});
	
	$(".remove-btn-profile").on("click",function(){
		$(".delete-success").css("display","block");
	});


	

	$(".view-artists").on("click",function(){
		$(".toggle-artists").toggle(500);
	});
	$(".view-labels").on("click",function(){
		$(".toggle-labels").toggle(500);
	});
	$(".view-artists-1").on("click",function(){
		$(".toggle-artists-1").toggle(500);
	});
	$(".view-labels-1").on("click",function(){
		$(".toggle-labels-1").toggle(500);
	});


	
	$('.action').on('mouseenter', function() {
	    $(this).find('.action-hover').html('Remove').css("color","#ffa200");
	});
	$('.action').on('mouseleave', function() {
	    $(this).find('.action-hover').html('Favourite').css("color","#fff");
	});

	$(".button-minus").on("click", function() {
        $(this).parents(".input-group").find(".input-value").val(parseInt($(this).parents(".input-group").find(".input-value").val()) - 1);
    });

	$(".button-plus").on("click", function() {
        $(this).parents(".input-group").find(".input-value").val(parseInt($(this).parents(".input-group").find(".input-value").val()) + 1);
    });
	



  
});

//blog/{slug-post}: replace content color
// jQuery(document).ready(function($) {
// 	var a =$('.text-center-content-blog *').length;
// 	console.log(a);
// 	var content = $('.text-center-content-blog p').attr('style');

// 	var replaces = content.replace('#222222', 'white' ); // black-> white
// 	$('.redm-blog .text-center-content-blog p').attr('style',content + ';color:white');
// });


// jQuery(document).ready(function($) {
// 	$(window).load(carousel_items_description).resize(setTimeout(carousel_items_description,1000));
// 	//$(window).on("load resize",carousel_items_description);
// 	function carousel_items_description(){
// 		if( $(window).innerWidth() < 940 ){
// 			var a = $('.carousel-items-description').length;
// 			for( i = 0; i < a; i++){
// 				if($('.carousel-items-description').eq(i).height() > max ){
// 					max = $('.carousel-items-description').eq(i).height();
// 				}
// 			}
// 			$('.carousel-items-description').css('min-height',max + 'px');
// 		} else{
// 			$('.carousel-items-description').css('min-height','108px');	
// 		}
// 	}
	
	
// });



// Blog: load box comment 
jQuery(document).ready(function($) {
$("#ajax_loadcomment").load(function(e) {
	var url = $(this).attr('data-ajax-load-comment'); // /(en|cn)/ajax_comment
  
    $.ajax({
           type: "POST",
           url: url,

           data:'articles_id=' + $('#ajax_loadcomment').data('ajax-load-comment-id'), 
           success: function(data)
           { // start success

               $('#ajax_loadcomment').html(data); // show response from the php script.

                // Click ajax comment reply
               	$("[data-comment-child-reply]").click(function(event) {
				    var url = $(this).data('ajax-load-comment-link'); // /(en|cn)/ajax_comment_reply
				    var datas = $(this).data('comment-child-reply');
				    var href = $(this).attr('href');
				  	var array = datas.split(",");
					var data1 = array[0];
					var data2 = array[1];


					
				    $.ajax({
				           type: "POST",
				           url: url,
				        	data:'articles_id=' + data1 + '&id_comment_parent=' + data2, 
				           success:function(result){
				           		if($('* .div-comment-form-reply').hasClass('active')){
				           			$('* .div-comment-form-reply').removeClass('active');
				           		};
				           		$('.span-apperance-comment').removeClass('hidden');
				           		$('.div-ajax-load-reply-' + data2 + ' .div-comment-form-reply').addClass('active').html(result);

				           	
			           			$('a[href="'+ href +'"][data-comment-child-reply]').on('click', function(e) {
									e.preventDefault(); 
									$('html, body').animate({
									  scrollTop: $(this.hash).offset().top - 200
									}, 300, function(){ // Speed
									 // window.location.hash = hash; // Change link url #
									});
								});

				           		// load commnet reply
				           		$(".form-user-comment-reply").submit(function(e) {
								    var url = $(this).attr('action'); 
								    $.ajax({
								           type: "POST",
								           url: url,
								           data: $(this).serialize(), 
								         });

								    e.preventDefault();
								    $('.form-user-comment-reply textarea').val('');
								    setTimeout(function(){
								    	$("#ajax_loadcomment").load();
								    },10);
								});


				           }
				    });

				    e.preventDefault();
				}); //

           }// end success
         });

    e.preventDefault();
});
// Blog: Default load comment
$("#ajax_loadcomment").load();
});


// Blog: Submit form comment and load box comment
$("#form-user-comment").submit(function(e) {
    var url = $(this).attr('action'); 
    $.ajax({
           type: "POST",
           url: url,
           data: $(this).serialize(), 
         });

    e.preventDefault();
    $('#form-user-comment textarea').val('');
    setTimeout(function(){
    	$("#ajax_loadcomment").load();
    },10);
});


// setting country user
function initialize2() {
 options = {types: ['(regions)']};
 var input = document.getElementById('country-user'); //
 var autocomplete = new google.maps.places.Autocomplete(input , options);
                                
	google.maps.event.addListener(autocomplete, 'place_changed', 
	function() {
	var address_components=autocomplete.getPlace().address_components;
	var city='';
	var country='';
	for(var j =0 ;j<address_components.length;j++) {
		city =address_components[0].short_name;
	
		if(address_components[j].types[0]=='country')
		{
		   country=address_components[j].short_name;
		   console.log(address_components[j]);
		}
	}
		 //document.getElementById('data').innerHTML="City Name : <b>" + city + "</b> <br/>Country Name : <b>" + country + "</b>";
		document.getElementById('country-hide').value = country;
		document.getElementById('city-hide').value = city;

	});
}
 google.maps.event.addDomListener(window, 'load', initialize2);

