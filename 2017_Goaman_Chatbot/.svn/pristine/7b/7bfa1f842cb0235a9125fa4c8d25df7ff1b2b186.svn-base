var sTimePicker = "div.date-time-picker";
    sHour = "div.date-time-picker input[type='text']#tp_h";
    sMinute = "div.date-time-picker input[type='text']#tp_m";
    sPeriod = "div.date-time-picker input[type='text']#tp_p";
    sButton = "div.date-time-picker button";
    sTextbox = "div.date-time-picker input[type='text']";
    minHour = 1;
    minMinute = 1;
    maxHour = 12;
    maxMinute = 59;
    hourInterval = 1;
    minuteInterval = 1;
    isShow = false;
    parentEle = null;

$(document).ready(function(){
  addHTML();
  buttonClick();
  triggerType();
  $('div.date-time-picker #tp_h, #tp_m').numeric();
});

$("body").click(function(e){
  if(!$(e.target).closest("input[type='text'], div.date-time-picker").length &&
      !$(e.target).is("input[type='text'], div.date-time-picker")) {
        hideTimePicker();
  }
});
window.addEventListener('resize', function(){hideTimePicker();}, true);

function appendTimePicker(top, left, element, value) {
    isShow = true;
    if(value=='') {
		cleanValue();
		$(sTimePicker).attr({'dt-ele':element});
	}else {
		$(sTimePicker).attr({'dt-ele':element, 'dt-val':value});
	}
    getValue();
    $(sTimePicker).slideDown(200);
    $(sTimePicker).css({"position": "absolute","top":top,"left":left,"z-index":1,"display":"block"});
};

$("input[type='text'].service-time").click(function(e){
	e.stopPropagation();
    if($(this).hasClass('disabled')) return false;// || $(this).attr('readonly')
    var element = $(this).attr('dt-ele');
    if(isShow && element!= parentEle) $(sTimePicker).css('display','none');
    // else hideTimePicker();
    var pos = $(this).offset();
    var top = (+pos.top) + (+$(this).outerHeight());
    left = pos.left;
    value = $(this).val();
    parentEle = element;
    appendTimePicker(top, left, element, value);
});

function buttonClick() {
  $(sButton).click(function(e){
      var act = $(this).attr('dt-act');
      switch(act) {
          case 'plus-h': plusHour();
              break;
          case 'plus-m': plusMinute();
              break;
          case 'plus-p': changePeriod();
              break;
          case 'sub-h': subHour();
              break;
          case 'sub-m': subMinute();
              break;
          case 'sub-p': changePeriod();
              break;
          case 'act-set': setValue();
              break;
          case 'act-clr': cleanValue();
              break;
      }
  });
}
function triggerType() {
  $(sTextbox).bind("paste keyup", function() {
    var val = $(this).val();
    len = val.length;
    id = $(this).attr('id');
    if(len > 2) val = val.substring(0, 2);
    len = val.length;
    switch(id) {
        case 'tp_h':
            if (isNaN(parseInt(val))) val = null;
            val = (val > maxHour) ? maxHour : val;
            break;
        case 'tp_m':
            if (isNaN(val)) val = 0;
            val = (val > maxMinute) ? maxMinute : val;
            break;
        case 'tp_p':
            val = val.toUpperCase();
            regex = /^[AMP]*$/;
            if(! regex.test(val)) val = val.substring(0, len-1);
            break;
    }
    $(this).val(val);
  });
  $(sTextbox).bind("change", function() {
    var val = $(this).val();
    len = val.length;
    id = $(this).attr('id');
    if(len > 2) val = val.substring(0, 2);
    len = val.length;
    switch(id) {
        case 'tp_h':
            if(val=='' || val < minHour) val = minHour;
              val = convertVal(val); break;
        case 'tp_m':
            if(val=='') val = minMinute;
              val = convertVal(val); break;
        case 'tp_p':
            switch(val) {
              case 'A': case 'AA': case 'AM': case 'MA': val = 'AM'; break;
              case 'P': case 'PP': case 'PM': case 'MP': val = 'PM'; break;
              default: val = 'AM';
            }
            break;
    }
    $(this).val(val);
  });
}
function addHTML() {
  var html = "<div class='date-time-picker' style='display: none;'>";
    html += "<div class='set-time'>Set Time</div>";
    html += "<div class='row'>";
    html += "<div class='col-xs-4'><button dt-act='plus-h' class='icon'>+</button></div>";
    html += "<div class='col-xs-4'><button dt-act='plus-m'  class='icon'>+</button></div>";
    html += "<div class='col-xs-4'><button dt-act='plus-p'  class='icon'>+</button></div>";
    html += "<div class='col-xs-4'><input id='tp_h' type='text' class='tp-val'></div>";
    html += "<div class='col-xs-4'><input id='tp_m' type='text' class='tp-val'></div>";
    html += "<div class='col-xs-4'><input id='tp_p' type='text' class='tp-val'></div>";
    html += "<div class='col-xs-4'><button dt-act='sub-h'  class='icon'>-</button></div>";
    html += "<div class='col-xs-4'><button dt-act='sub-m'  class='icon'>-</button></div>";
    html += "<div class='col-xs-4'><button dt-act='sub-p'  class='icon'>-</button></div>";
    html += "<div class='col-xs-6'><button dt-act='act-set'  class='btn-set-clear'>Set</button></div>";
    html += "<div class='col-xs-6'><button dt-act='act-clr'  class='btn-set-clear'>Clear</button></div>";
    html += "</div></div>";
    //$("section[class='photo-library custome-check']").before().append(html);
	$("section").before().append(html);
}

function showTimePicker() {

}

function hideTimePicker() {
  $(sTimePicker).slideUp(200);
  isShow = false;
}

function plusHour() {
  var h = parseInt($(sHour).val()) + (+hourInterval);
  if (h > maxHour) {
      h = minHour;
      changePeriod();
  }
  $(sHour).val(convertVal(h));
}

function subHour() {
  var h = parseInt($(sHour).val()) - (+hourInterval);
  if (h < minHour) {
      h = maxHour;
      changePeriod();
  }
  $(sHour).val(convertVal(h));
}

function plusMinute() {
  var m = parseInt($(sMinute).val()) + (+minuteInterval);
  if (m > maxMinute) {
    m = minMinute;
    plusHour();
  }
  $(sMinute).val(convertVal(m));
}

function subMinute() {
  var m = parseInt($(sMinute).val()) - (+minuteInterval);
  if (m < minMinute) {
    m = maxMinute;
    subHour();
  }
  $(sMinute).val(convertVal(m));
}

function changePeriod() {
  var p = $(sPeriod).val().toUpperCase();
  switch(p) {
      case 'AM': p = 'PM'; break;
      case 'PM': p = 'AM'; break;
  }
  $(sPeriod).val(p);
}

function getValue() {
  var value = $("div.date-time-picker").attr('dt-val');
  var dt = value.match(/\d{1,2}|[AMP]+/g);
    $(sHour).val(convertVal(dt[0]));
    $(sMinute).val(convertVal(dt[1]));
    $(sPeriod).val(dt[2]);
}

function setValue() {
    var ele = $("div.date-time-picker").attr('dt-ele');
    val = $('#tp_h').val()+':'+$('#tp_m').val()+' '+$('#tp_p').val();
    $("input[type='text'][dt-ele='"+ele+"']").val(val);
	// $("div.date-time-picker").attr('dt-val', val);
    hideTimePicker();
}
function cleanValue() {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var p = (h>=12)?"PM":"AM";
    h = addZero((h + 11) % 12 + 1);
    $(sHour).val(h);
    $(sMinute).val(m);
    $(sPeriod).val(p);
	val = h+':'+m+' '+p;
	$("div.date-time-picker").attr('dt-val', val);
    //((h + 11) % 12 + 1);
    // var dt = (new Date()).toLocaleTimeString().match(/\d{1,2}|[AMP]+/g);
    // $(sHour).val(convertVal(dt[0]));
    // $(sMinute).val(convertVal(dt[1]));
    // $(sPeriod).val(dt[3]);
}
function addZero(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}
function convertVal(val) {
  var val = val.toString();
  if(val.length < 2 && parseInt(val)<10) {
    val = "0"+val;
  }
  return val;
}
