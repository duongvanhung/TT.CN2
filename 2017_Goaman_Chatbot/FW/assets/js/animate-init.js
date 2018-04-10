/***************** Waypoints ******************/

$(document).ready(function() {
	imgBannerSMP();
	
});


/* Banner MOBILE Script */
var smpSlideLI = $('#smpSlider ul li');
var smpSlideNUM = smpSlideLI.length;
var smpLideTimer = 5000 //Zoom every 5s;
var ct = 1;
function imgBannerSMP(){	
	var currSlide = smpSlideLI.eq(0);
	imgBannerSMPshow(currSlide);	
	var count = 1;
	setInterval(function() {
		if(count>2){count=0;}
		currSlide = smpSlideLI.eq(count);
		imgBannerSMPshow(currSlide);
		count += 1;
		
	}, smpLideTimer);	
}

function imgBannerSMPshow(slideLi){
	var smpCurrSlide = slideLi;
	$(smpCurrSlide).waypoint(function() {
		smpSlideLI.hide();
		$(smpCurrSlide).show();
		smpSlideLI.removeClass('animated zoomIn');
		$(smpCurrSlide).addClass('animated zoomIn');
	}, {
		offset: '75%'
	});
}