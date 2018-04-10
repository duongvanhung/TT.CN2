function block_run_script_testimonial(block_jele, block_selector){
	$(window).ready(function(){
		mycarousel(block_selector +" .testimonial_1",1,1,1,true,true,3000,false);
		mycarousel(block_selector +" .testimonial_2",2,1,1,true,true,3000,30);
		mycarousel(block_selector +" .testimonial_3",3,2,1,true,true,false,30);
	})
}
