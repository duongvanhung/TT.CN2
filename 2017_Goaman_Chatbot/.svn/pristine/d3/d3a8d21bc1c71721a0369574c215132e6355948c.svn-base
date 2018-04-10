$(document).ready(function() {
	var reply = $(".reply");
	var aa = $(".test");
	var content = $(".content");
	var box1 = "<div class='comment-reply clearfix'><a class='comment-hover-img' href='#''><img class='comment-reply-img' src='http://localhost:85/2017_REDM/CODE/assets/images/img-cm.jpg?r=1494211749'></a><textarea id='comment-reply-box' name='comment'></textarea></div>";                   
    var box2 = "<div class='comment-action'><input class='test' type='button' name='' value='Cancel'><input id='btn-comment' data-url='http://localhost:85/2017_REDM/CODE/' type='button' name='comment' value='Post'></div>";
	$(reply).on("click",function(){
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(".comment-reply").remove();
				$(".comment-action").remove();		
			}
			 else {
				$(this).addClass('active');
				$(this).after(box1, box2);
				$(this).remove();
			}
	});
	$(aa).on("click",function(){
			alert('test');
	});
});