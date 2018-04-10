function block_run_script_faq(block_jele, block_selector){
	$(document).ready(function(){
		$(".faq-item .faq-question").click(function(){
			if($(this).parent(".faq-item").hasClass("active"))
			{
				$(this).next(".faq-answer").slideUp();
				$(this).parent(".faq-item").removeClass("active");
			}
			else
			{
				$(this).next(".faq-answer").slideDown();
				$(this).parent(".faq-item").addClass("active");
			}
		});
	});
}
