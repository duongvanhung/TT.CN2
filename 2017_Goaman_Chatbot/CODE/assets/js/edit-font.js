var color_current;
var font_current;
var align_current;
var size_current;
var link_current;
var title_current;
var color_canvas;
var variance_canvas;
var cell_size_canvas;
var old_modal;
var old_data;
$(document).ready(function(){
    //change link
    
    // change size and font-family
    $(".dropdown-menu li").click(function(){
        $(this).parents(".btn-group").children("button").html($(this).html());
        $(this).parents(".btn-group").children("button").attr("data-font",$(this).attr("data-font"));
        if($(this).parents(".text-select-font"))
        {
            font_current=$(this).parents(".btn-group").children("button").attr("data-font");
        }
        if($(this).parents(".text-font-size"))
        {
            size_current=$(this).parents(".btn-group").children("button").html();
        }
    });
    $("#modal-edit-fontstyle .modal-body p").click(function(){
        $("#modal-editor-all .btn-group button").html($(this).html());
        $("#modal-editor-all .btn-group button").attr("data-font",$(this).attr("data-font"));
        font_current=$(this).attr("data-font");
        $("#modal-edit-fontstyle").modal("hide");
    })
    //change color
    $(".text-color input").change(function(){
        color_current=$(this).val();
    });
    //change align
    var align=1;
    $(".text-align").click(function(){
        align++;
        if(align==1)
        {
            align_current="left";
            $(this).children(".fa").attr("class","fa fa-align-left");
        }
        else if(align==2)
        {
            align_current="center";
            $(this).children(".fa").attr("class","fa fa-align-center");
        }
        else{
            align_current="right";
             $(this).children(".fa").attr("class","fa fa-align-right");
             align=0;
             return false;
        }
    });
    //get value
    $("#container").on("click", "*",function(e){
        big_parent = $(this);
        // font_current=big_parent.css("font-family").split("-")[0];
        font_current =big_parent.css("font-family");
        size_current=big_parent.css("font-size");
        color_current=big_parent.css("color");
        align_current=big_parent.css("text-align");
        title_current=big_parent.text().trim();
        if(big_parent.attr("data-type")=='title')
        {
            $("#modal-edit-text").val(big_parent.text().trim());
        }
        //-----
        // $(".text-select-font button").html(font_current);
        $(".text-select-font button").html(font_current);

        $(".text-font-size input").val(size_current);
        // $(".text-font-size button").html(size_current);
        $(".text-color input").val(rgb2hex(color_current));
        $("#modal-edit-text").val(title_current);
        $("#modal-edit-title").val(title_current);
        $("#modal-edit-content").val(title_current);
        $("#modal-edit-button").val(title_current);
        // $("#modal-edit-text-mini").val(title_current);
        //edit icon
        if(big_parent.find(".fa").length>0){
            $("#modal-editor-icon .preview .fa").css("font-size",big_parent.find(".fa").css("font-size"));
            $(".edit-size input").val(big_parent.find(".fa").css("font-size").split("px")[0]);
        }
        else
        {
            $("#modal-editor-icon .preview .fa").css("font-size",size_current);
            $(".edit-size input").val(size_current.split("px")[0]);
        }
        if(align_current=="left" || align_current=="start")
        {
            align=1;
            $(".text-align").children(".fa").attr("class","fa fa-align-left");
        }
        else if(align_current=="center")
        {
            align=2;
            $(".text-align").children(".fa").attr("class","fa fa-align-center");
        }
        else
        {
            align=3;
            $(".text-align").children(".fa").attr("class","fa fa-align-right");
        }
    });
    
});
//click get value icon
$(document).ready(function(){
    $("#modal-editor-icon").on("click",".col-xs-2 .fa",function(){
        $("#modal-editor-icon .col-xs-2 .fa").removeClass("active");
        $(this).addClass("active");
        var name_icon=$(this).attr("class").split(" ")[1];
        $(".icon-preview i").removeClass().addClass("fa "+name_icon);
        $(".icon-preview span").html(name_icon);
        $(".preview i").removeClass().addClass("fa "+name_icon);
        
    });
});
$("#modal-editor-icon .edit-size input").change(function(){
    if($(this).val()>40){
        $("#modal-editor-icon .preview .fa").css("font-size","40px");
        $(this).val("40");
    }
    else if($(this).val()==0)
    {
        $("#modal-editor-icon .preview .fa").css("font-size","1px");
        $(this).val("1");
    }
    else
    {
        $("#modal-editor-icon .preview .fa").css("font-size",$(this).val()+"px");
    }
});
 $('#modal-editor-icon .edit-size input').keydown(function(event) {
    // Allow special chars + arrows 
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 
        || event.keyCode == 27 || event.keyCode == 13 
        || (event.keyCode == 65 && event.ctrlKey === true) 
        || (event.keyCode >= 35 && event.keyCode <= 39)){
            return;
    }else {
        // If it's not a number stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault(); 
        }   
    }
});


//canvas background
$(document).on("input change","#myRange",function(){
    $("#canvas1").children().remove();
    variance_canvas=$(this).val();
    var pattern = Trianglify({
        width:$("#modal-editor-bg .choose-color-left #canvas1").width(),
        height: 210,
        x_colors:color_canvas,
        variance:parseFloat(variance_canvas),
    });
    $("#canvas1").append(pattern.canvas());
 });

 $(document).on("input change","#myRange1",function(){
    $("#canvas2").children().remove();
    cell_size_canvas=$(this).val();
    var pattern = Trianglify({
        width: $("#modal-editor-bg .choose-color-right #canvas2").width(),
        height: 210,
        x_colors:color_canvas,
        cell_size:parseFloat(cell_size_canvas),
    });
    $("#canvas2").append(pattern.canvas());
 });
 //edit setting
 $("#container").on("click", ".icon-list-item", function(){
    $(this).nextAll().slice(0, 2).slideToggle();
});
$("#container").on("mouseleave",".setting-group-bt",function(){
    $(this).children(".toggle-group-bt").slideUp();
    $(".toggle-group-bt").slideUp();
});
//loading
function myloading(){
    $("html").append("<div class='modal-loading'></div>");
};
myloading();
$(window).on("load",function(){
    $(".modal-loading").remove();
    $("html").removeAttr("style");

    var array_icon=new Array();
    var list_icons=$("#list_icons");
    for(var i=0;i<$("#list_icons").children().length;i++){
        array_icon.push(list_icons.children().eq(i).children().attr("class").split(" ")[1]);
    }
    $('#search_icons').autocomplete({source:array_icon});
});
$(document).ready(function(){
    $('[data-tooltip="tooltip"]').tooltip();
    $("#export_keyword").tagging();
});
///rgb to hex
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}