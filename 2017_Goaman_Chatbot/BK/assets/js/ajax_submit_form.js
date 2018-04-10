function TriggeredKey(e)
    {
        var keycode;
        if (window.event) keycode = window.event.keyCode;
        if (window.event.keyCode = 13 ) return false;
    }
 //Signup fix bug
$("#signup-form").submit(function(e) {
    var url = "ajax/signup"; // the script where you handle the form input.
    var root = $("#btn-login").attr("data-url") + url;   
    $.ajax({
           type: "POST",
           url: root,
           data: $("#signup-form").serialize(), // serializes the form's elements.
           success: function(data)
           {  
              if(data == 1)
              {
                $('#myModal').modal('show');
                $('.modal-body').html('Successfully !');

              }
              else if(data == 0)
              {
                $('#myModal').modal('show');
                $('.modal-body').html('Your Email already exists!');
              }
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$(document).ready(function(){
    $('#login-form').validate(); // form validation  
    $(document).on('click','#btn-login',function(){
      var url = "ajax/login"; 

      var root = $("#btn-login").attr("data-url") + url;   
      //alert(root);
        if($('#login-form').valid()){
          $.ajax({
            type: "POST",
            url: root,
            data: $("#login-form").serialize(), // serializes the form's elements.
            success: function(data) {
              var obj = JSON.parse(data);
              //alert(data);
               if(obj.status == 1)  {
                if(obj.hasOwnProperty('rdt')){
                  // window.location.replace(obj.rdt);
                  window.location.href = obj.rdt;
                }
               //  //window.location.replace(root);
               }
               else
               {
                 $('#logerror').html('The email or password you entered is incorrect.');
                     $('#logerror').addClass("error");
               }
             }
          });
        }
       return false;
    });
  });

//update ajax account setting
$(document).ready(function(){
    $('#account-setting-form').validate(); // form validation  
    $(document).on('click','#btn-update-account',function(){
      var url = "ajax/update"; 
      var root = $("#btn-update-account").attr("data-url") + url;   
      alert(root);   
        if($('#account-setting-form').valid()){
          $.ajax({
            type: "POST",
            url: root,
            data: $("#account-setting-form").serialize(), // serializes the form's elements.
            success: function(data) {
              var obj = JSON.parse(data);
              //alert(data);
               if(obj.status == 1)  {
                if(obj.hasOwnProperty('rdt')){
                   $('#myModal').modal('show');
                $('.modal-body').html('Successfully !');
                }
               //  //window.location.replace(root);
               }
               else
               {
                   $('#myModal').modal('show');
                $('.modal-body').html('Error !');
               }
             }
          });
        }
       return false;
    });
  });

//this is changePassword
function save(){
	var currentPass = $('#currentPass').val();
	var newPass = $('#newPass').val();
	var confirmPass = $('#confirmNewPass').val();
  var url = 'ajax/changePassword';
	 var root = $(".submit-btn-profile").attr("data-url") + url;  
	 var directPassword = $(".submit-btn-profile").attr("data-url");  
  
	if(currentPass && newPass && confirmPass)
	{ 
		$.ajax
		(
			{
				type : 'POST',
				url: root,
				data:
				{
					'currentPass': currentPass, 
					'newPass': newPass,
					'confirmPass': confirmPass
				},
				success: function(data)
				{
					myObj = JSON.parse(data);
					if(myObj.success==true){
						alert("Success!");
						setTimeout(function(){window.location.href=directPassword},100);							
					}else{
						alert("fail!");
					}
				}
			}
		)
		
	}
}

$(document).ready(function(){
    $('#subscription-setting-form').validate(); // form validation  
    $(document).on('click','#btn-subscription',function(){
      var url = "ajax/subscription"; 
      var root = $("#btn-subscription").attr("data-url") + url;      
        
		if($('#subscription-setting-form').valid()){
			$.ajax({
				type: "POST",
				url: root,
				data: $("#subscription-setting-form").serialize(), 
				success: function(data) {
              var obj = JSON.parse(data);
               if(obj.status == 1)  {
                if(obj.hasOwnProperty('rdt')){
                   $('#myModal').modal('show');
                $('.modal-body').html('Successfully !');
                }
               }
               else
               {
                   $('#myModal').modal('show');
                $('.modal-body').html('Error !');
               }
             }
			});
        }
       return false;
    });
});

//comment
$(document).on('click','#btn-comment',function(){

      var url = "ajax/comment"; 
      var root = $("#btn-comment").attr("data-url") + url;      
      $.ajax({
        type: "POST",
        url: root,
        data: $("#comment-box").serialize(), 
        success: function(data) {
             //  var obj = JSON.parse(data);
             //   if(obj.status == 1)  {
             //    if(obj.hasOwnProperty('rdt')){
             //       $('#myModal').modal('show');
             //    $('.modal-body').html('Successfully !');
             //    }
             //   }
             //   else
             //   {
             //       $('#myModal').modal('show');
             //    $('.modal-body').html('Error !');
             //   }
             }
      });
       return false;
});

$(document).ready(function(){
    $('#for-got-pass').validate(); // form validation  
  $(document).on('click','#for-got-password',function(){
      var url = "/ajax/for-got-password"; 
      var root = $("#for-got-password").attr("data-url");      
        
    if($('#for-got-pass').valid()){
      $.ajax({
        type: "POST",
        url: url,
        data: $("#for-got-pass").serialize(), 
        success: function(data) {
              var obj = JSON.parse(data);
               if(obj.status == 1)  {
                if(obj.hasOwnProperty('rdt')){
                   $('#myModal').modal('show');
                $('.modal-body').html('Successfully !');
                }
               }
               else
               {
                   $('#myModal').modal('show');
                  $('.modal-body').html('Error !');
               }
             }
      });
        }
       return false;
    });
});