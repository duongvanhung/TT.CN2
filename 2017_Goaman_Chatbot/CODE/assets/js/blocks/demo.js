$(window).on("load",function(){ 
	if($(window).width() > 1200){
		var col_right=$("#demo_2 .col-right");
		var col_left =$("#demo_2 .col-left");
		if(col_right.outerHeight() < 670 && col_left.outerHeight() < 670){
			col_right.css("height","670px");
			col_left.css("height","670px");
		}
		else{
			if(col_right.outerHeight() > col_left.outerHeight()){
				col_left.css("height",col_right.outerHeight());
				col_right.css("height",col_right.outerHeight())
			}
			else{
				col_right.css("height",col_left.outerHeight());
				col_left.css("height",col_left.outerHeight());
			}
		}
		// $("#demo_2 .col-right").css("height",$("#demo_2 .col-left").height()-1);
	}
})



