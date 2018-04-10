(function($){
$.fn.appendTooltip = function(message) {
  var content = '<a href="#" class="ctm" data-toggle="tooltip" title="'+message+'"></a>'
  this.wrap(content);
};

$.fn.submitFormHome = function() {
  var html = "<div class='spinner' style='width:100%'>";
    html +="<div id='homeSpinner'>";
    html +="<div id='homeSpinner_1' class='homeSpinner'></div>";
    html +="<div id='homeSpinner_2' class='homeSpinner'></div>";
    html +="<div id='homeSpinner_3' class='homeSpinner'></div>";
    html +="<div id='homeSpinner_4' class='homeSpinner'></div>";
    html +="<div id='homeSpinner_5' class='homeSpinner'></div>";
    html +="<div id='homeSpinner_6' class='homeSpinner'></div>";
    html +="<div id='homeSpinner_7' class='homeSpinner'></div>";
    html +="<div id='homeSpinner_8' class='homeSpinner'></div>";
    html +="</div></div>";
    spinner = this.find("div[class='spinner']");
    btn = this.find("button[type='submit']");
    group = btn.parent();
    group.html(html);
    msg_element = this.find("span.msg");
  $.ajax({
    type: 'POST',
    url: this.attr('data-action'),
    data: this.serialize(),
    cache: false,
    success: function(data) {
      spinner.remove();
      group.html(btn);
      obj = getJSONData(data);
      if(obj!=false) {
        _class = (obj.status==1) ? 'msg-success' : 'msg-error';
        msg_element.removeClass( 'msg-success msg-error');
        msg_element.addClass(_class);
        msg_element.html(obj.message);

        if(obj.hasOwnProperty('rdt')) {
          window.location.href = obj.rdt;
        }
      }
    },
    error: function() {
      spinner.remove();
    }
  });
};

$.fn.submitFormData = function(func_name) {
  // var url = '/'+this.attr('action').replace(/^\//, '');
  var url = this.attr('action');
  var formData = new FormData();
  if($("input[type='file']") && $("input[type='file']").val()) {
    var file_input_name = $("input[type='file']").attr('name');
    formData.append(file_input_name, $("input[type='file']")[0].files[0]);
  }else {console.log('empty');}
  // end for data
  var field_data = this.serializeArray();
  $.each(field_data, function(key, input) {
    formData.append(input.name, input.value);
  });
  toggleLoadingScreen();
  $.ajax({
    type: 'POST',
    url: url,
    data: formData,
    processData: false,
    contentType: false,
    success: function(data) {
      obj = getJSONData(data);
      // obj = JSON.parse(data);
      if(obj!=false) {
        if (typeof func_name === 'function'){
          func_name(data);
        }
        toggleLoadingScreen();
        if(obj.hasOwnProperty('page_title')) {
          document.title = obj.page_title;
        }
        if(obj.hasOwnProperty('rdt')) {
          window.location.href = obj.rdt;
        }
        showMessageNotify(obj);
      }
      else {
        toggleLoadingScreen();
      }
    },
    error: function() {
      toggleLoadingScreen();
    }
  });
};
$.fn.submitFormField = function(func_name) {
  // var url = '/'+this.attr('action').replace(/^\//, '');
  var url = this.attr('action');
  toggleLoadingScreen();
  $.ajax({
    type: 'POST',
    url: url,
    data: this.serialize(),
    success: function(data) {
      obj = getJSONData(data);
      // obj = JSON.parse(data);
      if(obj!=false) {
        if (typeof func_name === 'function'){
          func_name(data);
        }
        toggleLoadingScreen();
        if(obj.hasOwnProperty('page_title')) {
          document.title = obj.page_title;
        }
        if(obj.hasOwnProperty('rdt')) {
          window.location.href = obj.rdt;
        }
        showMessageNotify(obj);
      }
      else {
        toggleLoadingScreen();
      }
    },
    error: function() {
      toggleLoadingScreen();
    }
  });
};

$.fn.toggleLoadingMore = function() {
    var loadingHTML = "<div id='loadingMore' class='cssload-showmore'><span></span><span></span><span></span><span></span><span></span></div>";
    var _this = this;
  if($("#loadingMore").length) {
    $("#loadingMore").fadeOut(300, function(){$("#loadingMore").remove();_this.toggle();});
  }else {
    _this.toggle();
    _this.parent().append(loadingHTML);
    $("#loadingMore").animate({opacity: 1}, 300);
  }
}

$.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });

  return objectData;
};

$.fn.serializeJSON = function() {
  var arrayData, objectData, jsonData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });
  jsonData = JSON.stringify(objectData);
  return jsonData;
};
})(jQuery);

function toggleLoadingScreen() {
  var loadingHTML = "<div id='loadingLayout' class='wrap-popup-abc'><div id='loading-gif'><div class='cssload-bell'><div class='cssload-circle'><div class='cssload-inner'></div></div><div class='cssload-circle'><div class='cssload-inner'></div></div><div class='cssload-circle'><div class='cssload-inner'></div></div><div class='cssload-circle'><div class='cssload-inner'></div></div><div class='cssload-circle'><div class='cssload-inner'></div></div></div></div></div>";
  if($("#loadingLayout").length) {
    $("#loadingLayout").fadeOut(300, function(){$("#loadingLayout").remove();});
  }else {
    $("body").append(loadingHTML);
    $("#loadingLayout").animate({opacity: 1}, 300);
  }
}

function showMessageNotify(obj, timeout) {
  if(typeof timeout === 'undefined') {
    timeout=7000;
  }
  if(obj.hasOwnProperty('status') &&
    obj.hasOwnProperty('title') &&
    obj.hasOwnProperty('message')) {
    var d = new Date();
    var r_id = d.getTime();
    var cls = title = '';
    switch(parseInt(obj.status)) {
      case 1: cls = 'success'; break;
      case 0: cls = 'fail'; break;
      default: cls = 'info';
    }
    var msgHTML = "<div id='msg_noti_"+r_id+"' class='popup-notification'><div class='row'><div class='title-popup-notification'></div><div class='content'></div><div class='img-popup'></div></div><div class='line-popup-notification'></div><div class='button-close-popup' data-type='close-popup'></div></div>";
    $("body").append(msgHTML);
    $("#msg_noti_"+r_id).addClass(cls);
    $("#msg_noti_"+r_id+" div.title-popup-notification").text(obj.title);
    $("#msg_noti_"+r_id+" div.content").text(obj.message);
    setTimeout(function(){
        $("#msg_noti_"+r_id).remove();
    }, timeout);
    $("#msg_noti_"+r_id+" div.button-close-popup").click(function(){
        $(this).parent().remove();
    });
  }
}

function test() {
  setTimeout(function(){
  $("button[name='btn_show_more_review']").toggleLoadingMore();}, 2000);
}

function getJSONData(data) {
  try {return JSON.parse(data);}
  catch (error){return false;}
}

/******* EVENT CLICK DELETE BUTTON *******/
$("body").on("click","button[data-action='delete']", function(e){
  showPopupDeleteConfirm($(this));
});

function showPopupDeleteConfirm(element) {
  var type = element.attr("data-type");
  var val_code = element.attr("data-value");
  var url = element.attr("data-url");
  var title = 'Delete confirmation';
  var message = 'Are you sure you want to delete this item?';
  var html = "<div id='popup_confirmation_delete' class='wrap-popup-abc'><div class='popup-notification delete'><div class='row'><div class='title-popup-notification'></div><div class='content'></div><div class='img-popup'></div></div><div class='line-popup-notification'></div><div class='button-close-popup'></div><div class='row button-delete'> <button type='button' class='confirm'>Delete</button> <button type='button' class='cancel'>Cancel</button></div></div></div>";
  $("body").append(html);
  $("#popup_confirmation_delete").animate({opacity: 1}, 300);
  // $("#popup_confirmation_delete").animate({opacity: 1}, 300);
  $("#popup_confirmation_delete div.title-popup-notification").text(title);
  $("#popup_confirmation_delete div.content").text(message);
  $("#popup_confirmation_delete div.button-close-popup, button.cancel").click(function(){
      $("#popup_confirmation_delete").remove();
  });
  $("#popup_confirmation_delete button.confirm").click(function(){
      $("#popup_confirmation_delete").remove();
      var data = {val_code: val_code}
      toggleLoadingScreen();
      $.ajax({
        method:'POST',
        url:url,
        data:{input_val_code: val_code},
        success: function(data) {
          obj = getJSONData(data);
          // obj = JSON.parse(data);
          if(obj!=false) {
            toggleLoadingScreen();
            showMessageNotify(obj);
            if(obj.status==1) {
              switch(type) {
                case 'award':removeAwardImage(element);
                  break;
                case 'salon_photo':removeSalonPhoto(element);
                  break;
                case 'album':
                case 'style': removeAlbumStyle(element);
                  break;
              }
            }
          }
          else {
            toggleLoadingScreen();
          }
        }
      });
  });
}

function removeAlbumStyle(element) {
  var item_del = element.closest('.item-photo');
  item_del.css({
    'opacity': '0.01',
    'transform': 'translate(-20px , -30px)'
  });
  setTimeout(function(){
    item_del.remove();
  },1001);
}
function removeSalonPhoto(element) {
  var item_del = element.closest('.profile-library');
  item_del.remove();
}
function removeAwardImage(element) {
  var item_del = element.closest('.award-library');
  item_del.remove();
}

/******* EVENT CLICK SHOWMORE BUTTON *******/
$("body").on("click","button[data-action='showmore']", function(e){
  var type = $(this).attr("data-type");
  var val = $(this).attr("data-value");
  var url = $(this).attr("data-url");
  $(this).toggleLoadingMore();
  doShowmoreData($(this));
});

function doShowmoreData(element) {
  var type = element.attr("data-type");
  var val = element.attr("data-value");
  var url = element.attr("data-url");
  $.ajax({
        method:'POST',
        url:url,
        data:{input_page: val},
        success: function(data) {
          obj = getJSONData(data);
          // obj = JSON.parse(data);
          if(obj!=false) {
            // toggleLoadingScreen();
            showMessageNotify(obj);
            if(obj.status==1) {
              var html = obj.html;
              switch(type) {
                case 'review':showmoreReview(obj);
                  break;
                case 'portfolio':showmorePortfolio(obj);
                  break;
                case 'album':
                case 'style': removeAlbumStyle(element);
                  break;
              }
            }
          }
          element.toggleLoadingMore();
        }
      });
}

function showmoreReview(obj) {
  $(obj.html).insertBefore($("#div_showmore_review"));//.parent(".col-xs-12")
  if(obj.is_last) $("#div_showmore_review").remove();
}

function showmorePortfolio(obj) {
  $(obj.html).insertBefore($("#div_showmore_portfolio"));//.parent(".col-xs-12")
  if(obj.is_last) $("#div_showmore_portfolio").remove();
}

function toggleLoadingMore() {
  var loadingHTML = "<div id='loadingMore' class='cssload-showmore'><span></span><span></span><span></span><span></span><span></span></div>";
  if($("#loadingMore").length) {
    $("#loadingMore").fadeOut(300, function(){$("#loadingMore").remove();});
  }else {
    $("body").append(loadingHTML);
    $("#loadingMore").animate({opacity: 1}, 300);
  }
}

/******* EVENT CLICK PUBLISH BUTTON *******/
// $("body").on("click","button[data-value='publish']", function(e){
	// showPopupPublish($(this));
// });

function showPopupPublish(element) {
  var type = element.attr("data-type");
  var val_code = element.attr("data-value");
  var url = element.attr("data-url");
  var title = 'Notification';
  var message = 'Your number of balance is empty. Do you want to increase your balance through buying package?';
  var html = "<div id='popup_confirmation_publish' class='wrap-popup-abc'><div class='popup-notification delete'><div class='row'><div class='title-popup-notification'></div><div class='content'></div><div class='img-popup'></div></div><div class='line-popup-notification'></div><div class='button-close-popup'></div><div class='row button-delete'> <button type='button' class='confirm'>OK</button> <button type='button' class='cancel'>Cancel</button></div></div></div>";
  $("body").append(html);
  $("#popup_confirmation_publish").animate({opacity: 1}, 300);
  // $("#popup_confirmation_delete").animate({opacity: 1}, 300);
  $("#popup_confirmation_publish div.title-popup-notification").text(title);
  $("#popup_confirmation_publish div.content").text(message);
  $("#popup_confirmation_publish div.button-close-popup, button.cancel").click(function(){
      $("#popup_confirmation_publish").remove();
  });
  $("#popup_confirmation_publish button.confirm").click(function(){
		window.location.href = ''+url+'payment/payment-more-services';
  });
}