function block_run_script_process_bar(block_jele, block_selector){
var array_canvas=[];

var canvas1 = document.getElementsByClassName('canvas-style-1');

for (var i = 0; i < canvas1.length; i++) {
    array_canvas.push($("#"+canvas1[i].id));
}
var canvas2 = document.getElementsByClassName('canvas-style-2');

for (var i = 0; i < canvas2.length; i++) {
    array_canvas.push($("#"+canvas2[i].id));
}
var canvas3 = document.getElementsByClassName('canvas-style-3');

for (var i = 0; i < canvas3.length; i++) {
    array_canvas.push($("#"+canvas3[i].id));
}
var canvas4 = document.getElementsByClassName('canvas-style-4');

for (var i = 0; i < canvas4.length; i++) {
    array_canvas.push($("#"+canvas4[i].id));
}

var canvas5 = document.getElementsByClassName('canvas-style-5');

for (var i = 0; i < canvas5.length; i++) {
    array_canvas.push($("#"+canvas5[i].id));
}

var flag=true;
$(window).on("load scroll",function(){
    if($(window).width()>1200){
        var window_offset_top = $(window).scrollTop();
        var window_offset_bottom =$(window).scrollTop() + $(window).height();
        var elementRemoveArray=[];
        var timeRunAnimate=0;
        for(var i=0;i<array_canvas.length;i++){
            var currentElement = array_canvas[i];
            //scroll show
            var element_offset_top = currentElement.offset().top;
            var element_offset_bottom= currentElement.offset().top + currentElement.height();
            if(element_offset_top >= window_offset_top && element_offset_bottom <= window_offset_bottom)
            {
                if(currentElement.attr("id").substring(0,14) == "canvas-style-1"){
                    progressBar1(array_canvas[i].attr("id"));
                    elementRemoveArray.push(i);
                }
                if(currentElement.attr("id").substring(0,14) == "canvas-style-2"){
                    progressBar2(array_canvas[i].attr("id"));
                    elementRemoveArray.push(i);
                }
                if(currentElement.attr("id").substring(0,14) == "canvas-style-3"){
                    progressBar3(array_canvas[i].attr("id"));
                    elementRemoveArray.push(i);
                }
                if(currentElement.attr("id").substring(0,14) == "canvas-style-4"){
                    progressBar4(array_canvas[i].attr("id"));
                    elementRemoveArray.push(i);
                }
                if(currentElement.attr("id").substring(0,14) == "canvas-style-5"){
                    progressBar5(array_canvas[i].attr("id"));
                    elementRemoveArray.push(i);
                }
            }
        }
        for(var i=elementRemoveArray.length - 1;i >= 0;i--){
            array_canvas.splice(elementRemoveArray[i], 1);
        }
    }
    else{
        if(flag){
            for (var i = 0; i < canvas1.length; i++) {
                progressBar1(canvas1[i].id);
            }
            for (var i = 0; i < canvas2.length; i++) {
                progressBar2(canvas2[i].id);
            }
            for (var i = 0; i < canvas3.length; i++) {
                progressBar3(canvas3[i].id);
            }
            for (var i = 0; i < canvas4.length; i++) {
                progressBar4(canvas4[i].id);
            }
            for (var i = 0; i < canvas5.length; i++) {
                progressBar5(canvas5[i].id);
            }
            flag=false;
        }
    }
});
//load the canvas-style-1
function progressBar1(canvasId) {
    //call interval
    var percCall;

    //start canvas
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    //get id canvas
    var idcanvas=$("#"+canvasId);

    //set width canvas
    $(idcanvas).attr("width", $(idcanvas).parent().width());

    //set percent
    var percent=idcanvas.parents(".content").find(".percent");

    // declare some variables
    var cWidth = idcanvas.parents(".content").find(".canvas").width();
    var cHeight = 8;
    var progressColor = $("#"+canvasId).attr("data-color");
    var rectangleColor = '#f9f9f9';
    var textColor = '#303030';
    var rawPerc = canvas.getAttribute('data-perc');
    var endperc = parseInt(rawPerc);
    var startperc = 0;
    
    var lineWidth = 3; // The 'brush' size


    function getPerc() {
        if(startperc < endperc) {
            startperc++;
        }
        else {
            clearInterval(percCall);
        }

        drawProgressBar();
    }

    function drawProgressBar() {
        //clear the canvas after every instance
        ctx.clearRect(0,0,cWidth,cHeight);

        // let's draw the background rectangle
        ctx.fillStyle = rectangleColor;
        ctx.lineWidth = lineWidth -3;

        ctx.fillRect(0, 0, cWidth, 8);

        ctx.fillStyle = progressColor;
        ctx.lineWidth = lineWidth;
        var fillVal = startperc / 100;
        // ctx.fillRect(0, 20, (fillVal * 380) ,8)
        ctx.fillRect(0, 0, (fillVal * cWidth) ,8);


        // let's get the text
        ctx.fillStyle = textColor;;
        percent.text(Math.floor(startperc)+'%');
    }

    percCall = setInterval(getPerc, 20);
}

//load the canvas-style-2
function progressBar2(canvasId) {
    var percCall;        
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    //get id canvas
    var idcanvas=$("#"+canvasId);

    //set width canvas
    $(idcanvas).attr("width", $(idcanvas).parent().width());

    //set percent
    var percent=idcanvas.parents(".content").find(".percent");

    // declare some variables
    var cWidth = idcanvas.parents(".content").find(".canvas").width();
    var cHeight = 11;

    // declare some variables
    var progressColor = idcanvas.attr("data-color");
    var rectangleColor = 'rgba(84,87,93,0.5)';
    var rawPerc = canvas.getAttribute('data-perc');
    var definition = canvas.getAttribute('data-text');
    var endperc = parseInt(rawPerc);
    var startperc = 0;
    //var endDegrees = (360*perc)/100;
    
    var lineWidth = 3; // The 'brush' size


    function getPerc() {
        if(startperc < endperc) {
            startperc++;
        }
        else {
            clearInterval(percCall);
        }

        drawProgressBar();
    }

    function drawProgressBar() {
        //clear the canvas after every instance
        ctx.clearRect(0,0,cWidth,cHeight);

        // let's draw the background rectangle
        ctx.fillStyle = rectangleColor;
        ctx.lineWidth = lineWidth -3;

        ctx.fillRect(0, 0, cWidth, 11);
        // let's draw the actual progressBar
        ctx.fillStyle = progressColor;
        ctx.lineWidth = lineWidth;
        var fillVal = startperc / 100;
        ctx.fillRect(0, 0, (cWidth * fillVal) ,11);
        percent.css("left",(cWidth * fillVal) - 18);

        percent.text(Math.floor(startperc)+'%');
    }

    percCall = setInterval(getPerc, 20);
}

//load the canvas-style-3
function progressBar3(canvasId) {
    var percCall;        
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    //get id canvas
    var idcanvas=$("#"+canvasId);

    //set width canvas
    $(idcanvas).attr("width", $(idcanvas).parent().width());

    //set percent
    var percent=idcanvas.parents(".content").find(".percent");

    // declare some variables
    var cWidth = idcanvas.parents(".content").find(".canvas").width();
    var cHeight = 26;
    var progressColor = idcanvas.attr("data-color");
    var rectangleColor = '#ffffff';
    var textColor = '#333333'
    var rawPerc = canvas.getAttribute('data-perc');
    var definition = canvas.getAttribute('data-text');
    var endperc = parseInt(rawPerc);
    var startperc = 0;
    //var endDegrees = (360*perc)/100;
    
    var lineWidth = 3; // The 'brush' size


    function getPerc3() {
        if(startperc < endperc) {
            startperc++;
        }
        else {
            clearInterval(percCall);
        }

        drawProgressBar3();
    }

    function drawProgressBar3() {
        
        //clear the canvas after every instance
        ctx.clearRect(0,0,cWidth,cHeight);
        
        //draw border
        ctx.fillStyle = "#f5f5f5";
        ctx.lineWidth = lineWidth -3;
        ctx.fillRect(0,0,cWidth,26);
        
        // let's draw the background rectangle
        ctx.fillStyle = rectangleColor;
        ctx.lineWidth = lineWidth -3;
        ctx.fillRect(10, 9, cWidth - 20, 8);
        // let's draw the actual progressBar
        ctx.fillStyle = progressColor;
        ctx.lineWidth = lineWidth;
        var fillVal = startperc / 100;
        ctx.fillRect(10, 9, fillVal * (cWidth-20) ,8);

        // let's get the text
        percent.text(Math.floor(startperc)+'%');
    }

    percCall = setInterval(getPerc3, 20);
}

// load the canvas-style-4
function progressBar4(canvasId) {
    var degreesCall;        
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    // declare some variables
    var cWidth = 150;
    var cHeight = 150;
    var progressColor = $("#"+canvasId).attr("data-color");
    var circleColor = '#5a565c';
    var textColor = '#ffffff'
    var rawPerc = canvas.getAttribute('data-perc');
    var definition = canvas.getAttribute('data-text');
    var perc = parseInt(rawPerc);
    var degrees = 0;
    var endDegrees = (360*perc)/100;
    
    var lineWidth = 3; // The 'brush' size


    
    function getDegrees4() {
        if(degrees < endDegrees) {
            degrees++;
        }
        else {
            clearInterval(degreesCall);
        }

        drawProgressBar4();
    }
    var abc=0;
    function drawProgressBar4() {
        //clear the canvas after every instance
        ctx.clearRect(0,0,cWidth,cHeight);

        // let's draw the background circle
        ctx.beginPath();
        ctx.strokeStyle = circleColor;
        ctx.lineWidth = lineWidth -3;
        ctx.arc(cHeight/2, cWidth/2, 70, 0, Math.PI*2, false);
        ctx.stroke();
        var radians = 0; // We need to convert the degrees to radians

        radians = degrees * Math.PI/180;
        // let's draw the actual progressBar
        ctx.beginPath();
        ctx.strokeStyle = progressColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(cHeight/2, cWidth/2, 70, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false);
        ctx.stroke();
         
        //let's get the small circle
        ctx.beginPath();
        ctx.strokeStyle = progressColor;
        ctx.lineWidth=6;
        ctx.arc(getPoint(cHeight/2,cWidth/2,70,radians - 90*Math.PI/180)[0], getPoint(cHeight/2,cWidth/2,70,radians - 90*Math.PI/180)[1], 3, -1.5,  2 * Math.PI,false);
        ctx.stroke();

        // let's get the text
        ctx.fillStyle = textColor;;
        ctx.font = '30px SourceSansPro-Regular';
        var outputTextPerc = Math.floor(degrees/360*100)+'%';
        var outputTextPercWidth = ctx.measureText(outputTextPerc).width;
        ctx.fillText(outputTextPerc, cWidth/2 - outputTextPercWidth/2, cHeight/2 +10);
        ctx.font = '16px SourceSansPro-Regular';
        var outputTextDefinitionWidth = ctx.measureText(definition).width;
        ctx.fillText(definition, cWidth/2 - outputTextDefinitionWidth/2, cHeight/2 +110);
    }

    degreesCall = setInterval(getDegrees4, 20/(degrees - endDegrees));
}

// load the canvas-style-5
function progressBar5(canvasId) {
    var degreesCall;        
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    // declare some variables
    var cWidth = 220;
    var cHeight = 220;
    var progressColor = $("#"+canvasId).attr("data-color");
    var circleColor = '#ffffff';
    var circleColor1 = "#eeeeee"
    var textColor = '#333333'
    var rawPerc = canvas.getAttribute('data-perc');
    var perc = parseInt(rawPerc);
    var degrees = 0;
    var endDegrees = (360*perc)/100;
    
    var lineWidth = 3; // The 'brush' size


    
    function getDegrees4() {
        if(degrees < endDegrees) {
            degrees++;
        }
        else {
            clearInterval(degreesCall);
        }

        drawProgressBar4();
    }
    
    function drawProgressBar4() {
        //clear the canvas after every instance
        ctx.clearRect(0,0,cWidth,cHeight);

        // let's draw the background circle
        ctx.beginPath();
        ctx.strokeStyle = circleColor;
        ctx.lineWidth = lineWidth -3;
        ctx.arc(cHeight/2, cWidth/2, 70, 0, Math.PI*2, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = circleColor1;
        ctx.lineWidth = lineWidth -3;
        ctx.arc(cHeight/2, cWidth/2, 60, 0, Math.PI*2, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = circleColor1;
        ctx.lineWidth = lineWidth -3;
        ctx.arc(cHeight/2, cWidth/2, 80, 0, Math.PI*2, false);
        ctx.stroke();

        var radians = 0; // We need to convert the degrees to radians

        radians = degrees * Math.PI/180;
        // let's draw the actual progressBar
        ctx.beginPath();
        ctx.strokeStyle = progressColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(cHeight/2, cWidth/2, 70, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false);
        
        ctx.stroke();
         
        

        // let's get the text
        ctx.fillStyle = textColor;;
        ctx.font = '30px SourceSansPro-Regular';
        var outputTextPerc = Math.floor(degrees/360*100)+'%';
        var outputTextPercWidth = ctx.measureText(outputTextPerc).width;
        ctx.fillText(outputTextPerc, cWidth/2 - outputTextPercWidth/2, cHeight/2 +10);
    }

    degreesCall = setInterval(getDegrees4, 10/(degrees - endDegrees));
}

function getPoint(c1,c2,radius,angle){
    return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
}
// $(window).on("load resize",function(){
//      if($(window).width()>1200)
//     {
       
//         $("canvas.circle").css("width",$(window).width()*0.25);
//     }
//     else if($(window).width()>=768)
//     {
//         $("canvas.circle").css("width",$(window).width()*45/100);
//     }
//     else
//     {
//          $("canvas.rectangle").css("width",$(window).width()*80/100);
//          $("canvas.circle").css("width",$(window).width());
//     }
// });
}
   