var curent_pos_menu = 0;
var curent = 0;
wow = new WOW(
    {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       false,       // default
        live:         true        // default
    }
    );
wow.init();
$(document).ready(function(){
	
	if($('.navi-type-3').length > 0){
		$('.navi-type-3 .menu-des li > a').hover(function(){
			ActiveNavigation3Hover($(this));
		}, function(){
			ActiveNavigation3();
		});
	}
	

	ScrollWindowActiveMenuTop();
	
		// menu mobile
			$( "#nav-toggle" ).click(function(event){
				event.stopPropagation();
				var show_item;
				var hide_item;
				if($('.menu-mb').hasClass('active-mb')){
					clearTimeout(hide_item);
					hide_item = setTimeout(function(){
						$('.menu-mb li').fadeOut();
					},500);	
				}
				$(this).toggleClass( "active-menu" );
				$('.menu-mb').toggleClass('active-mb');
				clearTimeout(show_item);
				if($('.menu-mb').hasClass('active-mb')){
					$('.menu-mb li').each(function(i,val){
						show_item = setTimeout(function(){
							$('.menu-mb li').eq(i).fadeIn(400);
						}, 80*i);
					});
				}
			});// end click
		// close menu mobile on click body
			$('body').click(function(){
				if($( "#nav-toggle" ).hasClass('active-menu')){
					$( "#nav-toggle" ).click();
				}
			});// end body click
	
	// active menu DES&M0B option 1
	MenuOption($('.navi-type-1 .menu-des li'), $('.navi-type-1 .menu-mb li'));
	
	// active menu DES&M0B option 2 
	MenuOption($('.navi-type-2 .menu-des li'), $('.navi-type-2 .menu-mb li'));
	
	// active menu DES&M0B option 3
	MenuOption($('.navi-type-3 .menu-des li'), $('.navi-type-3 .menu-mb li'));

	// active menu DES&M0B option 4
	MenuOption($('.navi-type-4 .menu-des li'), $('.navi-type-4 .menu-mb li'));
	
	// active menu DES&M0B option 5
	MenuOption($('.navi-type-5 .menu-des li'), $('.navi-type-5 .menu-mb li'));
	
	
    
	
	// video 4
	Video4();
	
	// loading page 4
	//setTimeout(function(){
		//$('#container-loading').css({'opacity':'1'});
	//},100);
	//setTimeout(function(){
	//	$('.bg-loadding').fadeOut(300);
	//},800);
	
	//active navigation type 3
	ActiveNavigation3();
	MobileClickNavigation();
	
	// call slider header 8
	if($('.owl-carousel-h8').length>0){
		// $('.owl-carousel-h8').owlCarousel({
			 // items : 1,
			// itemsCustom : false,
			// itemsDesktop : [1199,1],
			// itemsDesktopSmall : [980,1],
			// itemsTablet: [768,1],
			// itemsTabletSmall: false,
			// itemsMobile : [479,1],
			// pagination:true,
			// autoPlay:false,
			// singleItem:true,
			 // paginationSpeed : 400
		// });
		
		mycarousel("#slider-page-builder",1,1,1,true,false,3000,false);
	}
	
	// header 4 video
	if($('.play-vides').length>0){
		// $('.play-vides').click(function(){
			// if($(this).hasClass('play--vide')){
				// $(this).removeClass('play--vide');
				// $('.bg-h-4-des').animate({
					// 'opacity': 1
				// },300);
			// }else{
				// $(this).addClass('play--vide');
				// $('.bg-h-4-des').animate({
					// 'opacity': 0
				// },400);
			// }
		// });
		
		$('.play-vides').click(function(){
			if($(this).hasClass('play--vide')){
				$(this).removeClass('play--vide');
				$('.bg-h-4-des').animate({
					'opacity': 1
				},300);
				$('.page-custom-4 > img').animate({
					'opacity': 1
				},400);
			}else{
				$(this).addClass('play--vide');
				$('.bg-h-4-des').animate({
					'opacity': 0
				},400);
				$('.page-custom-4 > img').animate({
					'opacity': 0
				},400);
			}
		});
		
		var button_play = document.getElementById("bgvid");
			$('.play-vides').click(function(){
			if (button_play.paused) {
				button_play.play();
			} else {
				button_play.pause();
			}
		});
	}
	
	// call slider header 9
	if($('.owl-carousel-h9').length>0){
		// $('.owl-carousel-h9').owlCarousel({
			// items : 1,
			// itemsCustom : false,
			// itemsDesktop : [1199,1],
			// itemsDesktopSmall : [980,1],
			// itemsTablet: [768,1],
			// itemsTabletSmall: false,
			// itemsMobile : [479,1],
			// pagination:true,
			// autoPlay:false,
			// singleItem:true
		// });
		setTimeout(function(){
			 $('.owl-carousel-h9').owlCarousel({
			 items : 1,
			itemsCustom : false,
			 itemsDesktop : [1199,1],
			itemsDesktopSmall : [980,1],
			 itemsTablet: [768,1],
			 itemsTabletSmall: false,
			itemsMobile : [479,1],
			 pagination:true,
			 autoPlay:false,
			singleItem:true
			});
		},400);
		
	}
	
	
	// call slider header 10
	if($('#dg-container').length>0){
		$('#dg-container').gallery({autoplay	:	true});
		var w_parent = $('.slider-h-10-right').width();
	}
	
	
	//fontEndPixSliderMobile();
	//AutoRunfontEndPixSliderMobile();
	
	ScrollMenu();
	
	
	
});// end ready
function block_run_script_feature(block_jele, block_selector){
	$(document).ready(function(){
		// feature5
		mycarousel(block_selector+" .slider-feature-5",1,1,1,true,true,3000,false);
	})
}



// croll menu
function ScrollMenu(){
	// var list_ele = $('.commont-menu .js-dynamic-menu-des a');
	// list_ele.click(function(){
		// var target_ele = $(this).attr('href');
		// var height_ele = $(target_ele).offset().top;
			// $('html, body').animate({
			// scrollTop: $(target_ele).offset().top
			// }, (height_ele <= 300) ? 1500 : (height_ele/500) * 250);
		
	// });
	var list_ele = $('.commont-menu .js-dynamic-menu-des a');
	list_ele.click(function(){
		var target_ele = $(this).attr('href');
		var height_ele = $(target_ele).offset().top;
		var time_scroll = 0;
		if(height_ele - $(window).scrollTop() < 0){
			time_scroll = (height_ele - $(window).scrollTop()) * (-1);
		}else{
			time_scroll = height_ele - $(window).scrollTop();
		}
			$('html, body').stop().animate({
			scrollTop: $(target_ele).offset().top
			}, (height_ele <= 300) ? 900 : (time_scroll/500) * 250);
		
	});
}// end function 



// slider-h10-pix-font-end
function fontEndPixSliderMobile(){
	var slider = $('.pix-fontend-nc');
	var item = $('.pix-fontend-nc .item-');
	var item_left = $('.pix-fontend-nc .item-.left-sli');
	var item_right = $('.pix-fontend-nc .item-.right-sli');
	
	// event onload and resize
	$(window).on('resize', function(){
		slider = $('.pix-fontend-nc');
		// item_left 
		item_left.css({
			'width': (slider.width()/2 - 60) + 'px'
		});
		// item_right 
		item_right.css({
			'width': (slider.width()/2 - 60) + 'px'
		});
	});
	
	// window onload 
		// item_left 
	item_left.css({
		'width': (slider.width()/2 - 60) + 'px'
	});
		// item_right 
	item_right.css({
		'width': (slider.width()/2 - 60) + 'px'
	});
	
} //end function

function AutoRunfontEndPixSliderMobile(){
	var auto_run = null;
	var items = $('.pix-fontend-nc .item-');
	var item = $('.pix-fontend-nc .item-');
	
	auto_run =  setInterval(function(){
		var item_right = $('.pix-fontend-nc .item-.right-sli');
		var item_left = $('.pix-fontend-nc .item-.left-sli');
		var item_center = $('.item-.center-sli');
		
		if(item_right.next().length > 0){
			
		}else{
			item_left.removeClass('left-sli').fadeOut(400);
			item.eq(0).addClass('right-sli').fadeIn(100);
			item_center.removeClass('center-sli').addClass('left-sli');
			item_right.removeClass('.right-sli').addClass('center-sli');
			
		}
		// item_left.removeClass('left-sli').fadeOut(200);
		// item_center.removeClass('center-sli').addClass('left-sli');
		// item_right.removeClass('.right-sli').addClass('center-sli');
		// item_right.next().addClass('right-sli').fadeIn(100);
		fontEndPixSliderMobile();
	},2000);
	
	//clearInterval(auto_run);
}


// function CrollActive
function ScrollWindowActiveMenuTop(){
	var list_component = $('.js-dynamic-menu');
	var list_menu = $('.commont-menu .menu-des li');
	var index_active = 0;
	var time_run_active;
	var myVar_type3;
	$(window).on("load scroll",function(e){
		var pos_win = $(window).scrollTop();
		list_component.each(function(i,val){
			if(pos_win >= $(this).offset().top && pos_win <= ($(this).height() + $(this).offset().top)){
				index_active = i;
			}
		});
		
			// forEach list menu
			list_menu.removeClass('menu__item--current').find('a').removeClass('menu__item--current effect-zoom');
			list_menu.eq(index_active).addClass('menu__item--current').find('a').addClass('menu__item--current');
			var menu_cur = $('.menu-des');
			if(menu_cur.attr('menu-type') != 'navi2'){
				menu_cur.find('a').removeClass('effect-zoom');
			}else{
				list_menu.eq(index_active).addClass('menu__item--current').find('a').addClass('menu__item--current effect-zoom');
			}
			
			//ActiveNavigation3();
			clearTimeout(myVar_type3);
			myVar_type3 = setTimeout(function(){
				ActiveNavigation3();
			}, 800);

		
	});// end on
}// end function 


// Active navigation 3
function ActiveNavigation3(){
	var ele_span = $('.navi-type-3 .nav-page-cur-js .menu-des li:last-child span');
	var ele_active = $('.nav-page-cur-js .menu-des li .menu__item--current');
	var pos_left = 0;
	var status = '';

	// check elemet exist
	if ($(ele_active).length>0) {
		pos_left = ele_active.position().left + (ele_active.width()/2) + 10;
	}
	
	if(pos_left > curent_pos_menu){
		status = 'right';
		curent_pos_menu = pos_left;
	}else{
		status = 'left';
		curent_pos_menu = pos_left;
	}
	if(status == 'left'){
		ele_span.eq(0).stop().animate({
		'right': (pos_left - 10) + 'px'
		},700);
		ele_span.eq(1).stop().animate({
			'right': pos_left + 'px'
		},750);
		ele_span.eq(2).stop().animate({
			'right': (pos_left + 10) + 'px'
		},900);
	}else{
		ele_span.eq(0).stop().animate({
		'right': (pos_left - 10) + 'px'
		},900);
		ele_span.eq(1).stop().animate({
			'right': pos_left + 'px'
		},750);
		ele_span.eq(2).stop().animate({
			'right': (pos_left + 10) + 'px'
		},700);
	}
	
}// end function

// Click menu mobile Navigation 3
function MobileClickNavigation(){
	$('.navi-type-3 .menu-mb li').click(function(){
		$('.navi-type-3 .menu-des li').eq($(this).index()).removeClass('menu__item--current');
		$('.navi-type-3 .menu-des li').find('a').removeClass('menu__item--current');
		$('.navi-type-3 .menu-des li').eq($(this).index()).find('a').addClass('menu__item--current');
		
		$('.navi-type-3 .menu-des li:last-child').css({'display':'none'});
		$('.navi-type-3 .menu-des li a').click(function(){
			$('.navi-type-3 .menu-des li:last-child').css({'display':'block'});
			$('.navi-type-3 .menu-des li:last-child span').css({'bottom':'20px'});
		});
	});
}


// header 4 control video
function Video4(){
		var h_video = $('#bgvid').height() + 82;
		var h_video_o = $('#bgvid').outerHeight();
		var parent = $('.h-option-4');
		parent.css({
			'height': h_video_o +'px'
		});
		
		$(window).on("resize load", function(){
					var h_video = $('#bgvid').height() + 82;
					var h_video_o = $('#bgvid').outerHeight();
					var parent = $('.h-option-4');
					parent.css({
						'height': h_video_o +'px'
					});
					
			});
				var button_play = document.getElementById("bgvid");
				$('.play-vides').click(function(){
				  if (button_play.paused) {
					button_play.play();
				  } else {
					button_play.pause();
				  }
				});
}// end function video 4




// active menu destop and mobile
function MenuOption(par_des, par_mb){
			var item_menu = par_des;
			var item_menu_mb = par_mb;
			
			
			item_menu.click(function(){
				item_menu.removeClass('menu__item--current');
				$(this).addClass('menu__item--current');
				item_menu.find('a').removeClass('menu__item--current effect-zoom');
				$(this).find('a').addClass('menu__item--current');
				
				$('.navi-type-2 .menu-des li').eq($(this).index()).find('a').addClass('effect-zoom');
				
				item_menu_mb.find('a').removeClass('menu__item--current');
				item_menu_mb.removeClass('menu__item--current');
				item_menu_mb.eq($(this).index()).find('a').addClass('menu__item--current');
				
				ActiveNavigation3();
				
				
			});// end click destop
			
			item_menu_mb.click(function(){
				item_menu_mb.find('a').removeClass('menu__item--current effect-zoom');
				$(this).find('a').addClass('menu__item--current');
				item_menu_mb.removeClass('menu__item--current');
				
				$('.navi-type-2 .menu-mb li').eq($(this).index());
				item_menu.find('a').removeClass('menu__item--current');
				item_menu.removeClass('menu__item--current');
				item_menu.eq($(this).index()).find('a').addClass('menu__item--current');
				item_menu.eq($(this).index()).addClass('menu__item--current');
				
				event.stopPropagation();
			});// end click mobile
		}// end function
		
// active memu destop

// Active navigation 3
function ActiveNavigation3Hover(parathis){
	var ele_span = $('.navi-type-3 .menu-des li:last-child span');
	var ele_active = parathis;
	var pos_left = 0;
	var status = '';
	// check elemet exist
	if ($(ele_active).length > 0) {
		pos_left = ele_active.position().left + (ele_active.width()/2) + 10;
	}

	if(pos_left > curent){
		status = 'right';
		curent = pos_left;
	}else{
		status = 'left';
		curent = pos_left;
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

(function() {
			[].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
				var menuItems = menu.querySelectorAll('.menu__link'),
					setCurrent = function(ev) {
						ev.preventDefault();

						var item = ev.target.parentNode; // li

						// return if already current
						if (classie.has(item, 'menu__item--current')) {
							return false;
						}
						// remove current
						classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
						// set current
						classie.add(item, 'menu__item--current');
					};

				[].slice.call(menuItems).forEach(function(el) {
					el.addEventListener('click', setCurrent);
				});
			});

			[].slice.call(document.querySelectorAll('.link-copy')).forEach(function(link) {
				link.setAttribute('data-clipboard-text', location.protocol + '//' + location.host + location.pathname + '#' + link.parentNode.id);
				new Clipboard(link);
				link.addEventListener('click', function() {
					classie.add(link, 'link-copy--animate');
					setTimeout(function() {
						classie.remove(link, 'link-copy--animate');
					}, 300);
				});
			});
		})(window);

// loading page


