$(window).on("load scroll",function(){
	if($(window).scrollTop() > $(window).outerHeight()){
		$(".back-on-top").css("bottom","20px");
	}
	else{
		$(".back-on-top").css("bottom","-50px");
	}
	
});
$(window).on("load resize",function(){
	if($(window).width()>=768){
		$(".fancybox-video").fancybox({
		  maxWidth : 800,
		  maxHeight : 700,
		  fitToView : false,
		  width  : '70%',
		  height  : '70%',
		  autoSize : false,
		  closeClick : false,
		  openEffect : 'none',
		  closeEffect : 'none',
		  helpers: {
		   overlay: {
		     locked: false
		   }
		    }
		 });
	}
	else{
		$(".fancybox-video").fancybox({
		  maxWidth : 800,
		  maxHeight : 700,
		  fitToView : false,
		  width  : '70%',
		  height  : '70%',
		  autoSize : false,
		  closeClick : false,
		  openEffect : 'none',
		  closeEffect : 'none',
		  helpers: {
		   overlay: {
		     locked: false
		   }
		    }
		 });
	}

});
$(document).ready(function(){
	var body = $("html, body");
	$(".back-on-top").on("click",function(){
		body.stop().animate({scrollTop:0}, '1000', 'swing', function() { 
		});
	});
	body.css("overflow","hidden");
})
$(window).load(function(){
	var body = $("html, body");
	$(".loading-wrap").remove();
	body.removeAttr("style");
})
function mycarousel(id,itemdestop,itemtable,itemmobile,itemloop,dots,autoplay,itemmargin){
	try{
		$(id).find(".carousel").each(function(){
			if(itemdestop == 1 && itemtable == 1 && itemmobile == 1){
				var owl=$(this).find(".carousel-items").owlCarousel({
				 	singleItem:true,
					loop:itemloop,
					pagination:dots,
					autoPlay:autoplay,
					slideSpeed:1000,
					stopOnHover:true,
				});
				$(this).find(".carousel-prev").click(function(){
					 owl.trigger('owl.prev');
				});
				$(this).find(".carousel-next").click(function(){
					owl.trigger('owl.next');
				});
			}
			else{
				var owl=$(this).find(".carousel-items").owlCarousel({
					items:itemdestop,
					loop:itemloop,
					pagination:dots,
					autoPlay:autoplay,
					slideSpeed:1000,
					margin:itemmargin,
					stopOnHover:true,
					itemsDesktop :[1199,itemtable],
					itemsTablet :[767,itemmobile],
				});
				$(this).find(".carousel-prev").click(function(){
					 owl.trigger('owl.prev');
				});
				$(this).find(".carousel-next").click(function(){
					owl.trigger('owl.next');
				});
			}
			// $(this).on("click",".owl-item",function(){
			// 	alert($(this).index());
			// 	owl.data('owlCarousel').removeItem($(this).index());
			// })
		});
	}
	catch(err){
		console.log(err);
	}
}
/*---------------------------------------------------
			ANIMATE SCROLL
--------------------------------------------------*/
var array=[];
$(document).ready(function(){
	if($(window).width()>1200){
		$("*").each(function(){
			var attr = $(this).attr('data-animate');
			if (typeof attr !== typeof undefined && attr !== false) {
				array.push($(this));
				if(attr.split("-").length>1){
					$(this).children().css("opacity","0");
				}
				else{
					$(this).css("opacity","0");
				}
			}
		});
	}
});

$(window).on("load scroll",function(){
	if($(window).width()>1200){
		var window_offset_top = $(window).scrollTop();
		var window_offset_bottom =$(window).scrollTop() + $(window).height();
		var elementRemoveArray=[];
		var timeRunAnimate=0;
		for(var i=0;i<array.length;i++){
			var currentElement = array[i];
			var animateCss = array[i].attr("data-animate");
			var split = animateCss.split("-");
			//scroll show
			var element_offset_top = currentElement.offset().top;
			var element_offset_bottom= currentElement.offset().top + currentElement.height();
			if(element_offset_top >= window_offset_top && element_offset_top <= window_offset_bottom || element_offset_bottom <= window_offset_bottom && element_offset_bottom >= window_offset_top)
			{
				if(split.length>1){
					for(var j=0;j<currentElement.children().length ;j++){
						showSort(currentElement.children().eq(j),split[0],timeRunAnimate);
						timeRunAnimate+=200;
						removeClassAnimate(currentElement.children(),split[0]);
					}
					elementRemoveArray.push(i);
				}
				else{
					currentElement.removeAttr("style").addClass('animated '+animateCss);
					elementRemoveArray.push(i);
					removeClassAnimate(currentElement,animateCss);
				}
			}
		}
		for(var i=elementRemoveArray.length - 1;i >= 0;i--){
			array.splice(elementRemoveArray[i], 1);
		}
	}
});

function removeClassAnimate(id,animateCss){
	setTimeout(function(){
		id.removeClass("animated "+animateCss);
	}, 3000);
};

function showSort(currentElement,animateCss,timeRunAnimate){
	setTimeout(function(){
		currentElement.removeAttr("style").addClass('animated '+animateCss);
	},timeRunAnimate);
	
};
/*---------------------------------------------------
			END ANIMATE SCROLL
--------------------------------------------------*/


