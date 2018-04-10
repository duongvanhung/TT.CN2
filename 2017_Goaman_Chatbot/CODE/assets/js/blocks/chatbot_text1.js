
function block_run_script_team(block_jele, block_selector){
	$(document).ready(function(){
		//slide
		mycarousel(block_selector +" .team_1",1,1,1,true,true,3000,false);
		mycarousel(block_selector +" .team_2",3,2,1,true,true,3000,false);
		
		setTimeout(function(){
			// Hide
			$(block_selector + ' .owl-item:nth-child(1)').css('visibility','hidden');
			$(block_selector + ' .owl-item:nth-child(3)').css('visibility','hidden');
			$(block_selector + ' .carousel-prev').css('visibility','hidden');
			$(block_selector + ' .carousel-next').css('visibility','hidden');
		}, 1);
	});

}