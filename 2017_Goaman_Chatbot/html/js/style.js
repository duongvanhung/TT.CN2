"use strict";
var flag_click_menu;
$(document).ready(function(){
	// click menu mobile top nav
	$('#top_menu').click(function(){				
		if(!flag_click_menu){
			flag_click_menu = true;
			$('#top_menu').toggleClass('menu-open');
			setTimeout(function(){			
				flag_click_menu = false;
			},300);
		}				
	});	
	// click menu
	$('#navbar li').click(function(){		
		if( !$(this).attr('id') ){
			$('#navbar li').removeClass('active');
			$(this).addClass('active');
		}		
	});

	//fancybox popup video
	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 700,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers: {
			overlay: {
			  locked: false
			}
		  }
	});
});
$(document).ready(function(){
  $(window).on('load resize', function(){
   var w_element_top = $('.js-width-top').width();
   var w_element_bottom = $('.js-width-bottom').width();
   var w_parent_blk = $('.blk-parent-center').width();
   
    // width line top left
    $('.line-left-top').css({
     'width': ((w_parent_blk/2) - (w_element_top/2) + 3) + 'px'
    });
    // width line top right
    $('.line-right-top').css({
     'width': ((w_parent_blk/2) - (w_element_top/2) + 10) + 'px'
    }); 
    // width line bottom left
    $('.line-left-bottom').css({
     'width': ((w_parent_blk/2) - (w_element_bottom/2) + 10) + 'px'
    });
    // width line bottom right
    $('.line-right-bottom').css({
     'width': ((w_parent_blk/2) - (w_element_bottom/2) + 10) + 'px'
    }); 
  });
});
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}