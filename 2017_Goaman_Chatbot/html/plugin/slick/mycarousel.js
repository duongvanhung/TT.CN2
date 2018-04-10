function mycarousel(id,itemdestop,itemtable,itemmobile,itemloop,dots,autoplay,rowsitem){
	try{ 
		rowsitem = rowsitem || 1;
		$(id).find(".carousel").each(function(){
			if(itemdestop == 1 && itemtable == 1 && itemmobile == 1){
				var owl=$(this).find(".carousel-items").slick({
					rows:rowsitem,
					infinite:itemloop,
					arrows:false,
					dots:dots,
					autoplay:autoplay,
					autoplaySpeed:2000,

				});
				$(this).find(".carousel-prev").click(function(){
					owl.slick('slickPrev');
				});
				$(this).find(".carousel-next").click(function(){
					owl.slick('slickNext');
				});
			}
			else{
				var owl=$(this).find(".carousel-items").slick({
					rows:rowsitem,
					slidesToShow:itemdestop,
					slidesToScroll:itemdestop,
					infinite:itemloop,
					arrows:false,
					dots:dots,
					autoplay:autoplay,
					autoplaySpeed:3000,
					responsive:[
						{
							breakpoint:1199,
							settings:{
								slidesToShow:itemtable,
								slidesToScroll:itemtable
							}
						},
						{
							breakpoint:767,
							settings:{
								slidesToShow:itemmobile
							}
						}
					]
				});
				$(this).find(".carousel-prev").click(function(){
					owl.slick('slickPrev');
				});
				$(this).find(".carousel-next").click(function(){
					owl.slick('slickNext');
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
$(window).on("load",function(){
	mycarousel(".slider-offers",2,2,1,true,true,false,5); //home page1
	mycarousel(".slider-open-enjoy",1,1,1,true,true,true,1);
	mycarousel(".slider-new-event",2,2,1,true,false,false,1);
	mycarousel(".slider-post",2,2,1,true,false,false,1);
	mycarousel(".slider-about",2,2,1,true,false,true,2); 
});
// carousel opacity first and last
$(window).on("load",function(){
	var owl=$(".slider-item-food-eat").find(".carousel-items").slick({
		slidesToShow:5,
		infinite:true,
		arrows:false,
		dots:false,
		autoplay:true,
		autoplaySpeed:2000,
		responsive:[
			{
				breakpoint:1199,
				settings:{
					slidesToShow:3,
				}
			},
			{
				breakpoint:767,
				settings:{
					slidesToShow:2
				}
			},
			{
				breakpoint:480,
				settings:{
					slidesToShow:1
				}
			}
		]
	});

	owl.on('afterChange', function(){
		showCenter();
	});
	showCenter();

	function showCenter(){
		var count = 0;
		$(".slider-item-food-eat .slick-active").each(function(){
			if(count > 0 && count < $(".slider-item-food-eat .slick-active").length - 1 || $(window).width() <= 1198){
				$(this).css("opacity","1");

			}else{
				$(this).css("opacity","0.5");
			}
			count++;
		});
	}
		
});

$(window).on("load",function(){
	$(".slider-perfect-menu").find(".carousel").each(function(){
		var owl1=$(this).find(".carousel-items").slick({
			slidesToShow:2,
			infinite:true,
			arrows:false,
			dots:false,
			autoplay:true,
			autoplaySpeed:2000,
			responsive:[
				{
					breakpoint:1199,
					settings:{
						slidesToShow:1,
					}
				},
				{
					breakpoint:767,
					settings:{
						slidesToShow:1
					}
				}
			]

		});

		$(this).find(".carousel-prev").click(function(){
			owl1.slick('slickPrev');
		});
		$(this).find(".carousel-next").click(function(){
			owl1.slick('slickNext');
		});
		owl1.on('afterChange', function(){
			showActive();
		});
	});
	
	showActive();

	function showActive(){
		if($(".slider-perfect-menu .carousel-items").hasClass("slick-current")){
			$(".slider-perfect-menu .item-perfect-coffee").css("border-color","red");
		}
			// $(".slider-perfect-menu .carousel-item").on("mouseenter",function(){
			// 	$(".slider-perfect-menu .carousel-item").removeClass("active");
			// 	$(this).addClass("active");			
			// });
	}
		
});