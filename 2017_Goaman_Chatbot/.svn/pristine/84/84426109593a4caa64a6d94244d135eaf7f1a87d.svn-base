$(document).ready(function(){
	validate();
});
function validate() {
    $.validator.addMethod('isname', function (value, element) {
        return (value.match(/\d+/) == null) ? true : false;
    }, 'No number');
    $("#login-form").validate({
        validClass: "has-success",
        errorClass: "frm-error",
        rules: {
            
            username: {
                required:true,
                },
            password: {
                required : true
            }
        },
        messages: {
            
            
            username: {
                required: "Please enter your username or email",

                }, 
            password: {
                required : "Please enter password"
            }    
        },
        submitHandler: function(form) {
 
        },
        errorPlacement: function(error, element) {
            element.attr("data-original-title", error.text());
            element.tooltip();
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeAttr('data-original-title');
            $(element).removeClass(errorClass);//.addClass(validClass);
        }
    });
};