
$(document).ready(function(){
	DemonListMenu();
});


function DymanicMenu(){
	var list_item = $('.js-dynamic-menu');
	var list_item_des = $('.js-dynamic-menu-des');
	var list_item_mob = $('.js-dynamic-menu-mobi');
	
	// call change menu desktop
	ChangeMenu(list_item,list_item_des);
	
	// call change menu tablet
	ChangeMenu(list_item,list_item_mob);
	
	setTimeout(function(){
		// call controll menu type 1
		if($('.navi-type-1').length > 0){
			// active menu DES&M0B option 1
			MenuOption($('.navi-type-1 .menu-des li'), $('.navi-type-1 .menu-mb li'));
		}
		if($('.navi-type-2').length > 0){
			// active menu DES&M0B option 2 
			MenuOption($('.navi-type-2 .menu-des li'), $('.navi-type-2 .menu-mb li'));
		}
		if($('.navi-type-3').length > 0){
			// active menu DES&M0B option 3
			MenuOption($('.navi-type-3 .menu-des li'), $('.navi-type-3 .menu-mb li'));
			
			ActiveNavigation3();
		}
		if($('.navi-type-4').length > 0){
			// active menu DES&M0B option 4
			MenuOption($('.navi-type-4 .menu-des li'), $('.navi-type-4 .menu-mb li'));
		}
		if($('.navi-type-5').length > 0){
			// active menu DES&M0B option 5
			MenuOption($('.navi-type-5 .menu-des li'), $('.navi-type-5 .menu-mb li'));
		}
	},2000);
	
	if($('.h-option-4').length > 0){
		setTimeout(function(){
			Video4();
			var h_video = $('#bgvid').height() + 82;
			var h_video_o = $('#bgvid').outerHeight();
			var parent = $('.h-option-4');
			parent.css({
				'height': h_video +'px'
			});
		}, 500);
	}
	
	if($('.counter').length > 0){
		$('.counter').counterUp({
			delay: 10,
			time: 1000
		});
	}
	
	// call back header 3
	if($('#header-3-slid').length>0){
		setTimeout(function(){
			$('#header-3-slid .responsiveGallery-wrapper').responsiveGallery({
			animatDuration: 600,
			flagrotate: 1,
			$btn_prev: $('#header-3-slid .responsiveGallery-btn_prev'),
			$btn_next: $('#header-3-slid .responsiveGallery-btn_next')
			});
		}, 500);
	}// end call back header 3
	
	// call slider header 8
	if($('.owl-carousel-h8').length>0){
		setTimeout(function(){
			$('.owl-carousel-h8').owlCarousel({
			 items : 1,
			itemsCustom : false,
			itemsDesktop : [1199,1],
			itemsDesktopSmall : [980,1],
			itemsTablet: [768,1],
			itemsTabletSmall: false,
			itemsMobile : [479,1],
			pagination:true,
			autoPlay:false,
			singleItem:true,
			 paginationSpeed : 400
			});
		}, 500);
	}// end check slider - 8
	
	// call Testimonial 2
	if($('.testimonial-option2').length > 0){
		var owl_buil = $(".owl-carousel");
        owl_buil.owlCarousel({
			items: 2,
			itemsDesktop: [1199,2],
			itemsDesktopSmall: [979,1],
			itemsTablet: [768,1],
			itemsMobile: [479,1]
        });
        // Custom Navigation Events
        $(".next").click(function(){
            owl.trigger('owl_buil.next');
        })
        $(".prev").click(function(){
            owl.trigger('owl_buil.prev');
        });
	}// end testinial 2
	
	
	// call testimial 3
	if($('.testimonial-option3 #responsive').length > 0){
		
		 $('#responsive').lightSlider({
            item:3,
            slideMargin: 0,
            loop:true,
            slideMove:1,
            pager:false,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed:600,
            responsive : [
                {
                    breakpoint:800,
                    settings: {
                        item:2,
                        slideMove:1,
                        slideMargin:6,
                      }
                },
                {
                    breakpoint:480,
                    settings: {
                        item:1,
                        slideMove:1
                      }
                }
            ]
        });
        $('.testimonial-option3 .pre').click(function(){
          $('#testimonial .testimonial-option3-content .lSPrev').click();
        });
        $('.testimonial-option3 .next').click(function(){
          $('#testimonial .testimonial-option3-content .lSNext').click();
        });
	}// end testinial 3
	
	
	// team 2
	if($('.team-style2').length > 0){
		 var owl = $(".team-style2");
          owl.owlCarousel({
            pagination:false,
            itemsCustom : [
              [0, 1],
              [600, 1],
              [992,2],
              [1200, 3],
            ]
          });

          $("#team .next").click(function(){
              owl.trigger('owl.next');
          })
          $("#team .pre").click(function(){
              owl.trigger('owl.prev');
          });
	}// end team 2
	
	// call team 3
	if($('.style3-slide').length > 0){
		var $slides = $('.style3-slide'),
      max = $slides.length - 1,
      center = 2,
      classNames = '';

  $('#wrap-slide').on('click', function(e) {
    // Was a btn clicked?

      // Update center position depending on which button was pressed
      
     // Update center position depending on which button was pressed
     switch (e.target.parentNode.id) {
       case 'btn-left':
         center = rotate(center + 1, max);
         $slides.parent().attr('class', 'sliding-left');
         break;
       case 'btn-right':
         center = rotate(center - 1, max);
         $slides.parent().attr('class', 'sliding-right');
         break;
     }

     // Update each slides class names
     $slides.each(function(i) {
       classNames = 'style3-slide';
       switch (i) {
         case rotate(center - 1, max):
           classNames += ' item-left';

           break;
         case rotate(center, max):
           classNames += ' item-center';

           break;
         case rotate(center + 1, max):
           classNames += ' item-right';

           break;
         case rotate(center + 2, max):
           classNames += ' item-right-bottom';

           break;
         case rotate(center - 2, max):
           classNames += ' item-left-bottom';

           break;
        default:
          if(center+2 > max) classNames += ' item-right-bottom';
          else classNames += ' item-left-bottom';
       }
       this.className = classNames;
     });
	});
	}// end team 3
	
	// call back blog-1
	if($('#blog1').length > 0){
		myowlcarousel("#blog1",".posts-slider",".posts-slider-items");
		resizeheightvideo("#blog1");
		playvideoblog("#blog1");
	} // end call blog-1
	
	if($("#blog2").length > 0){
		myowlcarousel("#blog2",".posts-slider",".posts-slider-items");
		resizeheightvideo("#blog2");
		playvideoblog("#blog2");
	}// end call blog-2
	
	
	if($('#blog3').length > 0){
		myowlcarousel("#blog3",".posts-slider",".posts-slider-items");
		resizeheightvideo("#blog3");
		playvideoblog("#blog3");
	}// end call blog-3
	
	if($('#blog4').length > 0){
		myowlcarousel("#blog4",".posts-slider",".posts-slider-items");
		resizeheightvideo("#blog4");
		playvideoblog("#blog4");
	}// end call blog-4
	
	if($('#blog5').length > 0){
		myowlcarousel("#blog5",".posts-slider",".posts-slider-items");
		resizeheightvideo("#blog5");
		playvideoblog("#blog5");
	}// end call blog-5
	

	if($('#blog_detail2').length > 0){
		myowlcarousel("#blog_detail2",".blog-detail-related-slider",".blog-detail-related-slideshow");
	}


	

	// call back demo2
	if($('#demo_2').length > 0){
		playvideoblog("#demo_2");
		resizeheightvideo("#demo_2");
	}//End demo2
	
	//call back demo3
	if($('#demo_3').length > 0){
		playvideoblog("#demo_3");
		resizeheightvideo("#demo_3");
	}// End demo3


//Feature 5
	if($('.feature5-js').length > 0 ){
		setTimeout(function(){
			$('.feature5-js').responsiveGallery({
	        animatDuration: 600,
	        $btn_prev: $('.responsiveGallery-btn_prev'),
	        $btn_next: $('.responsiveGallery-btn_next')
    		}, 700);
		});
			
	}// End feature5



//Video demo
	if($('#demo_1').length > 0 ){
	setTimeout(function(){
		( function() {
	
	'use strict';

	var bodyEl = document.body,
		videoWrap = document.querySelector('.video-wrap'),
		videoEl = videoWrap.querySelector('video'),
		playCtrl = document.querySelector('.action--play'),
		closeCtrl = document.querySelector('.action--close');

	function init() {
		initEvents();
	}

	function initEvents() {
		playCtrl.addEventListener('click', play);
		closeCtrl.addEventListener('click', hide);
		videoEl.addEventListener('canplaythrough', allowPlay);
		videoEl.addEventListener('ended', hide);
	}

	function allowPlay() {
		classie.add(bodyEl, 'video-loaded');
	}

	function play() {
		videoEl.currentTime = 0;
		classie.remove(videoWrap, 'video-wrap--hide');
		classie.add(videoWrap, 'video-wrap--show');
		setTimeout(function() {videoEl.play();}, 600);
	}

	function hide() {
		classie.remove(videoWrap, 'video-wrap--show');
		classie.add(videoWrap, 'video-wrap--hide');
		videoEl.pause();
	}

	init();

	})();
	}, 500);//End setTimeout
}//End video demo1
	
	if($('#feature5').lenght > 0){
		setTimeout(function(){
			$('.responsiveGallery-wrapper').responsiveGallery({
			animatDuration: 600,
			$btn_prev: $('.responsiveGallery-btn_prev'),
			$btn_next: $('.responsiveGallery-btn_next')
			});
		}, 3000); 
	}// end check feature5

	ScrollMenuDemo();
	
	// call function fix menu top 0
	FixmenuCrollDown();
	$('.commont-menu').css({'position': 'static'});
	
	ScrollWindowActiveMenuTop();
}// end function

// function fix menu on scrolling
function FixmenuCrollDown(){
	var header_top = $('.header-page').height() - 150;
	var target_ele = $('.commont-menu');
		$(window).on('scroll', function(){
			if(go_ele_page){
				var cur_top = $(window).scrollTop();
				if(cur_top >= header_top){
					target_ele.addClass('fix-menu-top-0');
				}else{
					target_ele.removeClass('fix-menu-top-0');
				}
			}else{return false;}
		});
	
}// end function 


function ScrollMenuDemo(){
	var list_ele = $('.commont-menu .js-dynamic-menu-des a');
	$('body').on('click', '.commont-menu .js-dynamic-menu-des a', function(){
		var target_ele = $(this).attr('href');
		var height_ele = $(target_ele).offset().top;
		if(go_ele_page){
			$('html, body').stop().animate({
			scrollTop: $(target_ele).offset().top
			}, (height_ele <= 300) ? 1500 : (height_ele/500) * 250);
		}else{
			return false;
		}
	});
}// end function




function rotate(i, max) {
    if (i < 0) return max;
    if (i > max) return 0;
    return i;
  }


function ChangOptionModel(option_change, newname){
	var list_option = $('.js-dynamic-menu');
	list_option.each(function(i,val){
		var id = '#' + $(this).attr('id');
		if(id == option_change){
			$(this).attr('menu-name', newname);
		}// end if
	});// end each list_option
	
} // end function

function ChangeMenu(list,type){
	
	type.empty();
	
	// check type menu current
	if(type.attr('menu-type') == 'navi1'){
		list.each(function(i,val){
			if(i == 0){
				type.append('<li class="menu__item menu__item--current row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
			}else{
				type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
			}
			
		});// end each
		if(type.hasClass('js-dynamic-menu-mobi')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li><a href="#'+ $(this).attr('id') +'" class="menu__item--current" data-type="title">' + $(this).attr('menu-name') + '</a></li>');
				}else{
					type.append('<li><a href="#'+ $(this).attr('id') +'" class="row-edit" data-type="title">' + $(this).attr('menu-name') +'</a></li>');
				}
			})// end each
		}
	}
	
	if(type.attr('menu-type') == 'navi2'){
		if(type.hasClass('js-dynamic-menu-des')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="menu__item--current" >' + $(this).attr('menu-name') + '</a></li>');
				}else{
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="">'+ $(this).attr('menu-name') +'</a></li>');
				}
			})// end each
		}
		if(type.hasClass('js-dynamic-menu-mobi')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li><a href="#'+ $(this).attr('id') +'" class="menu__item--current" data-type="title">' + $(this).attr('menu-name') + '</a></li>');
				}else{
					type.append('<li><a href="#'+ $(this).attr('id') +'" class="row-edit" data-type="title">' + $(this).attr('menu-name') +'</a></li>');
				}
			})// end each
		}
	}// end check type navi-2
	
	if(type.attr('menu-type') == 'navi3'){
		if(type.hasClass('js-dynamic-menu-des')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li class="row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="menu__item--current">'+ $(this).attr('menu-name') +'</a></li>');
				}else{
					type.append('<li class="row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="">'+ $(this).attr('menu-name') +'</a></li>');
				}
			});
			type.append('<li class=""><span></span><span></span><span></span></li>');
		}
		
		if(type.hasClass('js-dynamic-menu-mobi')){
				list.each(function(i,val){
					if(i == 0){
						type.append('<li><a href="#'+ $(this).attr('id') +'" class="menu__item--current row-edit" data-type="option-menu">' + $(this).attr('menu-name') + '</a></li>');
					}else{
						type.append('<li><a href="#'+ $(this).attr('id') +'" class="row-edit" data-type="option-menu">' + $(this).attr('menu-name') +'</a></li>');
					}
				})// end each
		}
	}// end check type navi-3
	
	if(type.attr('menu-type') == 'navi4'){
		if(type.hasClass('js-dynamic-menu-des')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li class="menu__item menu__item--current row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
				}else{
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#' + $(this).attr('id') + '" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
				}
			});
		}
		
		if(type.hasClass('js-dynamic-menu-mobi')){
				list.each(function(i,val){
					if(i == 0){
						type.append('<li class="menu__item menu__item--current"><a class="menu__link row-edit" href="#'+ $(this).attr('id') +'" data-type="title">'+ $(this).attr('menu-name') +'</a></li>');
					}else{
						type.append('<li class="menu__item"><a href="#'+ $(this).attr('id') +'" class="menu__link row-edit" data-type="title">'+ $(this).attr('menu-name') +'</a></li>');
					}
				})// end each
		}
	}// end check type navi-4
	
	
	if(type.attr('menu-type') == 'navi5'){
		if(type.hasClass('js-dynamic-menu-des')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="menu__link menu__item--current">'+ $(this).attr('menu-name') +'</a></li>');
				}else{
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).attr('id') +'" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
				}
			});
		}
		
		if(type.hasClass('js-dynamic-menu-mobi')){
				list.each(function(i,val){
					if(i == 0){
						type.append('<li><a class="menu__item--current" href="#'+ $(this).attr('id') +'">'+ $(this).attr('menu-name') +'</a></li>');
					}else{
						type.append('<li><a href="#'+ $(this).attr('id') +'">'+ $(this).attr('menu-name') +'</a></li>');
					}
				})// end each
		}
	}// end check type navi-5
	
	
	
}// end function 


function DemonListMenu(){
	var bnt_click = $('.menu-option-ad');
	var chose_menu = $('.chose-item-menu-list li');
	$('body').on('click', '.hover-menu-change', function(){
		$('.block-list-op-menu').css({
			'opacity': 1,
			'z-index': 9
		});
		
		// call show list menu chose after 500s
		setTimeout(function(){
			chose_menu.each(function(i, val){
				var tam = $(this);
				setTimeout(function(){
					tam.css({
						'-webkit-transform': 'translate(0px)',
						'-moz-transform': 'translate(0px)',
						'-ms-transform': 'translate(0px)',
						'transform': 'translate(0px)',
						'opacity': 1,
						'z-index': 9
					});
				}, 150 * i);
			});// end each
		}, 500);// end setTimeout
		
	});// end on
	
	// click item menu
	$('body').on('click', '.chose-item-menu-list li', function(){
		$('.chose-item-menu-list li').removeClass('chose-menu');
		$(this).addClass('chose-menu');
		var curent_menu = $(this).index();
		$('.block-list-op-menu .list-item-menu').css({
			'opacity': 0,
			'z-index': -1
		});
		$('.block-list-op-menu .list-item-menu').eq(curent_menu).css({
			'opacity': 1,
			'z-index': 10
		});
		
		
		
	});
	
	
	$('body').on('click', '.type-menu-5-op a', function(){
		$('.type-menu-5-op a').removeClass('menu__item--current');
		$(this).addClass('menu__item--current');
	});
	
	// close popup option menu
	$('body').on('click', '.bnt-menu-cancal', function(){
		$('.cls-md-menu').click();
	});
	
	// press accept
	$('body').on('click', '.bnt-menu-accept', function(){
		var type_menu = $('.chose-item-menu-list .chose-menu').attr('data-type-menu');
		var menu_comment = $('.menu-page-cur');
		// remove all class navi-type-
		menu_comment.removeClass("navi-type-1 navi-type-2 navi-type-3 navi-type-4 navi-type-5 fix-menu-3");
		menu_comment.removeClass("menu-option-1 menu-option-2 menu-option-3 menu-option-4 menu-option-5");
		
		var nav_head = $('nav.nav-page-cur-js');
		nav_head.removeClass('menu menu--viola menu--sebastian');
		
		
		// check type-menu add attr tuong ung
		if(type_menu == "type-menu-1"){
			menu_comment.addClass('navi-type-1 menu-option-1');
			nav_head.addClass('menu menu--viola');
			$('.js-dynamic-menu-des').attr('menu-type', 'navi1');
			$('.js-dynamic-menu-mobi').attr('menu-type', 'navi1');
		}
		if(type_menu == "type-menu-2"){
			menu_comment.addClass('navi-type-2 menu-option-2');
			$('.js-dynamic-menu-des').attr('menu-type', 'navi2');
			$('.js-dynamic-menu-mobi').attr('menu-type', 'navi2');
		}
		if(type_menu == "type-menu-3"){
			menu_comment.addClass('navi-type-3 menu-option-3 fix-menu-3');
			$('.js-dynamic-menu-des').attr('menu-type', 'navi3');
			$('.js-dynamic-menu-mobi').attr('menu-type', 'navi3');
		}
		if(type_menu == "type-menu-4"){
			menu_comment.addClass('navi-type-4 menu-option-4'); 
			nav_head.addClass('menu menu--sebastian');
			$('.js-dynamic-menu-des').attr('menu-type', 'navi4');
			$('.js-dynamic-menu-mobi').attr('menu-type', 'navi4');
		}
		if(type_menu == "type-menu-5"){
			menu_comment.addClass('navi-type-5 menu-option-5');
			$('.js-dynamic-menu-des').attr('menu-type', 'navi5');
			$('.js-dynamic-menu-mobi').attr('menu-type', 'navi5');
		}
		
		var list_item = $('.js-dynamic-menu');
		var list_item_des = $('.js-dynamic-menu-des');
		var list_item_mob = $('.js-dynamic-menu-mobi');
		
		// call change menu desktop
		ChangeMenu(list_item,list_item_des);
	
		// call change menu tablet
		ChangeMenu(list_item,list_item_mob);
		
		
		setTimeout(function(){
		// call controll menu type 1
		if($('.navi-type-1').length > 0){
			// active menu DES&M0B option 1
			MenuOption($('.navi-type-1 .menu-des li'), $('.navi-type-1 .menu-mb li'));
		}
		if($('.navi-type-2').length > 0){
			// active menu DES&M0B option 2 
			MenuOption($('.navi-type-2 .menu-des li'), $('.navi-type-2 .menu-mb li'));
		}
		if($('.navi-type-3').length > 0){
			// active menu DES&M0B option 3
			MenuOption($('.navi-type-3 .menu-des li'), $('.navi-type-3 .menu-mb li'));
			setTimeout(function(){
				ActiveNavigation3();
			}, 500);
			
			
			
		}
		if($('.navi-type-4').length > 0){
			// active menu DES&M0B option 4
			MenuOption($('.navi-type-4 .menu-des li'), $('.navi-type-4 .menu-mb li'));
		}
		if($('.navi-type-5').length > 0){
			// active menu DES&M0B option 5
			MenuOption($('.navi-type-5 .menu-des li'), $('.navi-type-5 .menu-mb li'));
		}
	},1000);
		
		// close popup
		$('.cls-md-menu').click();
		
		
		// call function scroll menu active 
		ScrollWindowActiveMenuTop();
		
	});
}// end function


function ActiveNavigation3Demo(){
	var ele_span = $('li.demo-buble i');
	var ele_active = $('.type-menu-3-op a.menu__item--current');
	var pos_left = 0;
	var status = '';
	
	// check elemet exist
	if ($(ele_active).length>0) {
		pos_left = ele_active.position().left + (ele_active.width()/2) + 10;
	}

	if(pos_left > curent_pos_menu_demo){
		status = 'right';
		curent_pos_menu_demo = pos_left;
		
	}else{
		status = 'left';
		curent_pos_menu_demo = pos_left;
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

