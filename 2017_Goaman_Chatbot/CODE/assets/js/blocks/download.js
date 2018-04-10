
$(window).on("load",function(){
	$(".download-number").removeClass("finish_count_up");
})

$(window).on("scroll",function(){
	var window_offset_top = $(window).scrollTop();
	var window_offset_bottom =$(window).scrollTop() + $(window).height();

	$('.download-number').each(function () {

		var element_offset_top = $(this).offset().top;
		var element_offset_bottom= $(this).offset().top + $(this).height();
		if(element_offset_top >= window_offset_top && element_offset_bottom <= window_offset_bottom && !$(this).hasClass("finish_count_up"))
		{
			$(this).prop('Counter',0).animate({
		        Counter: $(this).text()
		    }, {
		        duration: 1500,
		        easing: 'swing',
		        step: function (now) {
		            $(this).children().text(Math.ceil(now));
		        }
		    });
		    $(this).addClass("finish_count_up");
		}
	});
})
