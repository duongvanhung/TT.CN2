function block_run_script_blog(block_jele, block_selector){
	$(document).ready(function(){
		//slide
		mycarousel(block_selector+" .blog1",1,1,1,true,false,3000,false);
		mycarousel(block_selector+" .blog2",1,1,1,true,false,3000,false);
		mycarousel(block_selector+" .blog3",1,1,1,true,false,3000,false);
		mycarousel(block_selector+" .blog4",1,1,1,true,false,3000,false);
		mycarousel(block_selector+" .blog5",1,1,1,true,false,3000,false);
		mycarousel(block_selector+" .blog_detail2",1,1,1,true,false,3000,false);
	});
}



