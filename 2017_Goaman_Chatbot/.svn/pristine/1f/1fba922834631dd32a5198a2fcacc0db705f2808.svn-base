
$(document).ready(function(){
	DemonListMenu();
});


function DymanicMenu(){
	if($('[menu-name="feature"]').length > 0){
		//$('.wow').removeClass('fadeInDown fadeInUp fadeInLeft flipInX fadeInRight'); 
	}
	
	
	
	$('body').on('click', '#modal-option-change-menu .list-item-menu a', function(){
		return false;
	});
	
	$('body').on('click', '#modal-option-change-menu .type-menu-2-op a', function(){
		$('#modal-option-change-menu .type-menu-2-op a').removeClass('effect-zoom');
		$(this).addClass('effect-zoom');
	});
	
	// hover menu typ3 animation
	if($('.navi-type-3').length > 0){
		$('.navi-type-3 .menu-des li > a').hover(function(){
			ActiveNavigation3Hover($(this));
		}, function(){
			ActiveNavigation3();
		});
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
		if($('.navi-type-1').length > 0 && $('.header-page').length > 0){
			// active menu DES&M0B option 1
			MenuOption($('.navi-type-1 .menu-des li'), $('.navi-type-1 .menu-mb li'));
		}
		if($('.navi-type-2').length > 0 && $('.header-page').length > 0){
			// active menu DES&M0B option 2 
			MenuOption($('.navi-type-2 .menu-des li'), $('.navi-type-2 .menu-mb li'));
		}
		if($('.navi-type-3').length > 0 && $('.header-page').length > 0){
			// active menu DES&M0B option 3
			MenuOption($('.navi-type-3 .menu-des li'), $('.navi-type-3 .menu-mb li'));
			
			ActiveNavigation3();
		}
		if($('.navi-type-4').length > 0 && $('.header-page').length > 0){
			// active menu DES&M0B option 4
			MenuOption($('.navi-type-4 .menu-des li'), $('.navi-type-4 .menu-mb li'));
		}
		if($('.navi-type-5').length > 0 && $('.header-page').length > 0){
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
	
	//demo
	if($(window).width() > 1200){
		var col_right=$("#demo_2 .col-right");
		var col_left =$("#demo_2 .col-left");
		if(col_right.outerHeight() < 670 && col_left.outerHeight() < 670){
			col_right.css("height","670px");
			col_left.css("height","670px");
		}
		else{
			if(col_right.outerHeight() > col_left.outerHeight()){
				col_left.css("height",col_right.outerHeight());
				col_right.css("height",col_right.outerHeight())
			}
			else{
				col_right.css("height",col_left.outerHeight());
				col_left.css("height",col_left.outerHeight());
			}
		}
		// $("#demo_2 .col-right").css("height",$("#demo_2 .col-left").height()-1);
	}
	
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
	
	// feature5
	if($('#slider-feature-5').length>0){
		//mycarousel("#slider-feature-5",1,1,1,true,false,3000,false);
		setTimeout(function(){
			$('#slider-feature-5').owlCarousel({
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
	}
	
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
	
	ScrollMenuDemo();
	
	// call function fix menu top 0
	FixmenuCrollDown();
	$('.commont-menu').css({'position': 'static'});
	
	if($('.header-page').length > 0){
		setTimeout(function(){
			ScrollWindowActiveMenuTop();
		}, 1000);
	}
	
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
					target_ele.css({'height': '71px', 'padding-top':'22px'});
				}else{
					target_ele.removeClass('fix-menu-top-0');
					target_ele.css({'height': '102px', 'padding-top':'30px'});
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
				type.append('<li class="menu__item menu__item--current row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
			}else{
				type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
			}
			
		});// end each
		if(type.hasClass('js-dynamic-menu-mobi')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li><a href="#'+ $(this).parent().attr('id') +'" class="menu__item--current" data-type="title">' + $(this).attr('menu-name') + '</a></li>');
				}else{
					type.append('<li><a href="#'+ $(this).parent().attr('id') +'" class="row-edit" data-type="title">' + $(this).attr('menu-name') +'</a></li>');
				}
			})// end each
		}
	}
	
	if(type.attr('menu-type') == 'navi2'){
		if(type.hasClass('js-dynamic-menu-des')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="menu__item--current effect-zoom" >' + $(this).attr('menu-name') + '</a></li>');
				}else{
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="">'+ $(this).attr('menu-name') +'</a></li>');
				}
			})// end each
		}
		if(type.hasClass('js-dynamic-menu-mobi')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li><a href="#'+ $(this).parent().attr('id') +'" class="menu__item--current" data-type="title">' + $(this).attr('menu-name') + '</a></li>');
				}else{
					type.append('<li><a href="#'+ $(this).parent().attr('id') +'" class="row-edit" data-type="title">' + $(this).attr('menu-name') +'</a></li>');
				}
			})// end each
		}
	}// end check type navi-2
	
	if(type.attr('menu-type') == 'navi3'){
		if(type.hasClass('js-dynamic-menu-des')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li class="row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="menu__item--current">'+ $(this).attr('menu-name') +'</a></li>');
				}else{
					type.append('<li class="row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="">'+ $(this).attr('menu-name') +'</a></li>');
				}
			});
			type.append('<li class=""><span></span><span></span><span></span></li>');
		}
		
		if(type.hasClass('js-dynamic-menu-mobi')){
				list.each(function(i,val){
					if(i == 0){
						type.append('<li><a href="#'+ $(this).parent().attr('id') +'" class="menu__item--current row-edit" data-type="option-menu">' + $(this).attr('menu-name') + '</a></li>');
					}else{
						type.append('<li><a href="#'+ $(this).parent().attr('id') +'" class="row-edit" data-type="option-menu">' + $(this).attr('menu-name') +'</a></li>');
					}
				})// end each
		}
	}// end check type navi-3
	
	if(type.attr('menu-type') == 'navi4'){
		if(type.hasClass('js-dynamic-menu-des')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li class="menu__item menu__item--current row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
				}else{
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#' + $(this).parent().attr('id') + '" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
				}
			});
		}
		
		if(type.hasClass('js-dynamic-menu-mobi')){
				list.each(function(i,val){
					if(i == 0){
						type.append('<li class="menu__item menu__item--current"><a class="menu__link row-edit" href="#'+ $(this).parent().attr('id') +'" data-type="title">'+ $(this).attr('menu-name') +'</a></li>');
					}else{
						type.append('<li class="menu__item"><a href="#'+ $(this).parent().attr('id') +'" class="menu__link row-edit" data-type="title">'+ $(this).attr('menu-name') +'</a></li>');
					}
				})// end each
		}
	}// end check type navi-4
	
	
	if(type.attr('menu-type') == 'navi5'){
		if(type.hasClass('js-dynamic-menu-des')){
			list.each(function(i,val){
				if(i == 0){
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="menu__link menu__item--current">'+ $(this).attr('menu-name') +'</a></li>');
				}else{
					type.append('<li class="menu__item row-edit" data-type="title"><a href="#'+ $(this).parent().attr('id') +'" class="menu__link">'+ $(this).attr('menu-name') +'</a></li>');
				}
			});
		}
		
		if(type.hasClass('js-dynamic-menu-mobi')){
				list.each(function(i,val){
					if(i == 0){
						type.append('<li><a class="menu__item--current" href="#'+ $(this).parent().attr('id') +'">'+ $(this).attr('menu-name') +'</a></li>');
					}else{
						type.append('<li><a href="#'+ $(this).parent().attr('id') +'">'+ $(this).attr('menu-name') +'</a></li>');
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
		if($('.header-page').length > 0){
			ScrollWindowActiveMenuTop();
		}
		
		
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

