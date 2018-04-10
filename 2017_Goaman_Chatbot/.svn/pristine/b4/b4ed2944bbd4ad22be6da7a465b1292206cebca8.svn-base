/**
 *
 *
 * @author PIX Interaction
 * http://pix.com.vn
 */
 
document.addEventListener('DOMContentLoaded',function(){
  var _provider = document.getElementById("provider").value;
  hook_data(_provider.toLowerCase());

  document.getElementById("source_url").focus();
  //Select provider
  document.getElementById("provider").addEventListener("change", function(){
    var provider = this.value.toLowerCase();
    var providers = ['youtube', 'vimeo', 'soundcloud', 'mixcloud', 'hearthis'];
    // if(providers.indexOf(provider) <= 0) {
    //   alert('invalid');
    // }
    hook_data(provider);
  });
  
  //Button cancel click
  document.getElementById("dialog_cancel_btn").addEventListener("click", function(event){
    top.tinymce.activeEditor.windowManager.close();
  });

  //Button insert click
  document.getElementById("diablog_insert_btn").addEventListener("click", function(event){
    var url         = document.getElementById("source_url").value.trim();
    var provider    = document.getElementById("provider").value.trim();
    var response_data = get_oembed_data(url, provider);
    if(response_data.status == 0) {
    	alert(response_data.message);
    }
    var html = response_data.data.html;
    var html_element = convert_html_to_element(html);
    var custom_height = get_width_height(document.getElementById("iframe_height").value);
    var custom_width = get_width_height(document.getElementById("iframe_width").value);
    // var element_height = html_element.getAttribute("height");
    // var element_width = html_element.getAttribute("width");
    // Set height iframe
    if (custom_height) {
      html_element.setAttribute("height", custom_height);
    }
    // Set width iframe
    if (custom_width) {
      html_element.setAttribute("width", custom_width);
    }
    // Insert html to editor
    top.tinymce.activeEditor.execCommand('mceInsertContent', false, html_element.outerHTML);
    top.tinymce.activeEditor.windowManager.close();
  });
});

function get_oembed_data(url, provider) {
  var endpoint = 'get_oembed_data.php';
  var response = false;
  var data = new FormData();
  data.append('url', url);
  data.append('provider', provider);
  var request = new XMLHttpRequest();
  request.open('POST', endpoint , false);
  
  request.onload = function() {
    response = JSON.parse(request.responseText);
  };
  
  request.error = function(error) {
    console.log(eror);
  }
  request.send(data);
  // var html = response.data.html;
  // var iframe = convert_html_to_element(html);
  return response;
}

function render_options_by_provider(provider) {
  //todo phase 2
  var options = false;
  switch(provider.toLowerCase()) {
    case 'youtube': 
      options = {};
      break;
    case 'vimeo': 
      options = {};
      break;
    case 'soundcloud': 
      options = {};
      break;
    case 'mixcloud': 
      options = {};
      break;
    case 'hearthis': 
      options = {};
      break;
  }
}

function generate_html_result(url, height, width, options) {
  //todo phase 2
}

function convert_html_to_element(html, is_get_parent) {
  var temp_parent = document.createElement('p');
  temp_parent.innerHTML = html;
  return (is_get_parent == true) ? temp_parent : temp_parent.firstChild;
}

function get_width_height(value) {
  var result = false;
  var percent = (~value.indexOf("%")) ? "%" : "";
  result = isNaN(parseFloat(value)) ? false : parseFloat(value)+percent;
  return result;
}

function hook_data(provider) {
  var url = '';
  switch(provider.toLowerCase()) {
    case 'youtube': 
      url = 'https://www.youtube.com/watch?v=XGSy3_Czz8k';
      break;
    case 'vimeo': 
      url = 'https://vimeo.com/212722584';
      break;
    case 'soundcloud': 
      url = 'https://soundcloud.com/kodak-black/tunnel-vision-1';
      break;
    case 'mixcloud': 
      url = 'https://www.mixcloud.com/dublab_de/eine-stunde-soul-w-twit-one/';
      break;
    case 'hearthis': 
      url = 'https://hearthis.at/datatransmission/mix-of-the-day-the-golden-boy/';
      break;
  }
  // document.getElementById("source_url").value = url;
  document.getElementById("example").innerHTML = 'Example: <em>' + url + '</em>';
}