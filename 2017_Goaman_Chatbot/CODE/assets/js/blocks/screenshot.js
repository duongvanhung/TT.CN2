function block_run_script_screenshot(block_jele, block_selector){
	$(window).ready(function(){
		mycarousel(block_selector + " .screenshot_2",4,3,1,true,true,3000,false);
	});
	$(window).ready(function(){
		$(".screenshot_3", block_selector).find(".carousel").each(function(){
			var owl=$(this).find(".carousel-items").owlCarousel({
				singleItem:true,
				loop:true,
				pagination:false,
				autoplay:false,
				slideSpeed:1000,
				afterAction:afterAction,
			});
			var screenshot_3 = $(".screenshot_3", block_selector);
			function afterAction(){
				var current = this.currentItem;
				var current_item= $(".screenshot_3 .owl-item", block_selector).eq(current).find("img").attr("data-text");
				$(".screenshot_3", block_selector).find(".screenshot-counter.active").removeClass("active");
				$(".screenshot_3", block_selector).find(".screenshot-counter[data-text='"+current_item+"']").addClass("active");
			}
			$(this).find(".carousel-prev").click(function(){
				owl.trigger('owl.prev');
			});
			$(this).find(".carousel-next").click(function(){
				owl.trigger('owl.next');
			});
		});
	})
}