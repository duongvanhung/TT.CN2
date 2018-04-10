<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/ui/jquery-ui-git.js"></script>
<script type="text/javascript" src="includes/pix_youtube.js"></script>
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/themes/smoothness/jquery-ui.css" />
<link rel="stylesheet" href="includes/pix_youtube.css" />
<div>
    <div>
        <select>
            <option>Youtube</option>
            <option>Vimeo</option>
            <option>Soundcloud</option>
            <option>Mixcloud</option>
        </select>
        <label for="youtube_url"><strong>Youtube URL:</strong> </label>
        <input type="text" id="youtube_url" name="youtube_url" placeholder="Enter Youtube URL" value="https://www.youtube.com/watch?v=XGSy3_Czz8k">
    </div>
    <div>
        <div><strong>Options:</strong></div>
        <span>
            <input type="checkbox" id="youtube_autoplay" name="youtube_autoplay" value="0">
            <label for="youtube_autoplay">Autoplay</label>
        </span>
        <span>
            <input type="checkbox" id="youtube_controls" name="youtube_controls" value="0">
            <label for="youtube_controls">Show control</label>
        </span>
        <span>
            <input type="checkbox" id="youtube_rel" name="youtube_rel" value="0">
            <label for="youtube_rel">Show related videos</label>
        </span>
        <span>
            <input type="checkbox" id="youtube_showinfo" name="youtube_showinfo" value="0">
            <label for="youtube_showinfo">Show info video</label>
        </span>
    </div>
</div>
<br />
<button id="youtube_cancel" class="btn-default">Cancel</button> 
<button id="youtube_insert" class="btn-primary">Insert and Close</button>
<button id="clicked">CLicked</button>
<script type="text/javascript">
jQuery(document).ready(function($) {
    var youtube_regex = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    $("#clicked").click(function(e){
        var url = $("#youtube_url").val();
        var match = url.match(youtube_regex);
        var video_id = false;
        if (match) {
            video_id = match[2];
        } else {
            video_id = 'false';
        }

        // GetVimeoIDbyUrl(url);
        // GetYoutubeIdbyUrl(url);
        GetSounCloudbyUrl(url);

        // xhr.send();
        // get_oembed(url);
        // alert('video id ' + video_id);
    });


});

function GetVimeoIDbyUrl(url) {
  var endpoint = 'https://vimeo.com/api/oembed.json?url=' + url;
  var id = 'false';
  var request = new XMLHttpRequest();
  request.open('GET', endpoint , false);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      if(response.video_id) {
        id = response.video_id;
      }
    }
  };
  request.send();
  console.log('vimeo id ' + id);
  return id;
}

function GetYoutubeIdbyUrl(url) {
    var endpoint = 'http://www.youtube.com/oembed?format=json&url=' + url;
    var id = 'false';
    var request = new XMLHttpRequest();
    request.open('GET', endpoint , true);
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    // request.setRequestHeader("Origin", "*");
    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      console.log(response);
      if(response.title) {
        id = response.title;
      }
    }
    };
    request.onerror = function (error) {
        console.log(error);
    };
    request.send();
    console.log('youtube id ' + id);
    return id;
}

function GetSounCloudbyUrl(url) {
    var endpoint = 'http://www.soundcloud.com/oembed?format=json&url=' + url;
  var id = 'false';
  var request = new XMLHttpRequest();
  request.open('GET', endpoint , false);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      console.log(response);
      if(response.title) {
        id = response.title;
      }
    }
  };
  request.send();
  console.log('soundcloud id ' + id);
  return id;
}

</script>
<!-- 

<iframe src="https://www.youtube.com/embed/XGSy3_Czz8k" width="420" height="345">

 -->