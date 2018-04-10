function block_run_script_portfolio(block_jele, block_selector){
	$(window).ready(function(){
		tabsmenu(block_selector +" .portfolio_1");


		// $("#portfolio_2 .tabs-content-item").addClass("active").queue(function(){
		// 	mycarousel("#portfolio_2",3,2,1,true,true,true,30).dequeue();
		// }).removeClass("active").queue(function(){
		// 	$("#portfolio_2 .tabs-content-item:nth-child(1)").addClass("active").dequeue();
		// });


		mycarousel(block_selector +" .portfolio_2",3,2,1,true,true,true,30);
		$(block_selector +" .portfolio_2 .tabs-content-item").removeClass("active");
		$(block_selector +" .portfolio_2 .tabs-content-item:nth-child(1)").addClass("active");


		tabsmenu(block_selector+ " .portfolio_2");
		//fancybox
		$(".fancybox").fancybox({
			maxWidth : "80%",
			maxHeight: "80%",
			helpers: {
				overlay: {
			    	locked: false
				}
			}
		});
		//portfolio_3
		tabsmenu(block_selector+ " .portfolio_3");
	});
}
//add animate and remove animate 
function animateTabContent(currentElement,timeRunAnimate){
	setTimeout(function(){
		currentElement.removeAttr("style").addClass('animated zoomIn');
	},timeRunAnimate);
	setTimeout(function(){
		currentElement.removeClass('animated zoomIn');
	},timeRunAnimate + 1000);
}
function tabsmenu(id){

	var tabContent=$(id+" .tabs-content .tabs-content-item");
	var tabMenu=$(id+" .tabs-menu .tabs-menu-item");

	tabMenu.on("click touchstart",function(){

		var dataTab = $(this).attr("data-tab");

		//remove all class active
		tabMenu.removeClass("active");
		tabContent.removeClass("active");

		//active current tabs-menu
		$(this).addClass("active");

		//active current tabs-content
		var tabCurrentActive = $(id+" .tabs-content .tabs-content-item[data-tab='"+dataTab+"']");
		tabCurrentActive.addClass("active");

		//show item animate
		tabCurrentActive.children().css("opacity","0");
		var timeRunAnimate=0;
		for(var i=0;i<tabCurrentActive.children().length;i++){
			animateTabContent(tabCurrentActive.children().eq(i),timeRunAnimate);
			timeRunAnimate +=100;
		}
	}) 
}

