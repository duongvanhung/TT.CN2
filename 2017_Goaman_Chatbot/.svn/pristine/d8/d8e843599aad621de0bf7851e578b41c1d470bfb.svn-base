function block_run_script_comming_soon(block_jele, block_selector){
  $(document).ready(function(){
    $(".input__field.input__field--kaede").click(function(e){
      $(this).addClass("active");
      e.stopPropagation();
    });
    $("body").click(function(){
        $(".input__field.input__field--kaede").each(function(){
          if($(this).val()==""){
            $(this).removeClass("active");
        }
      });
    });
    var deadline = new Date(Date.parse(new Date()) + 47 * 24 * 60 * 60 * 1000);
    $(".clockdiv-countdown").each(function(){
      if($(this).hasClass("running")){

      }
      else{
        initializeClock($(this), deadline);
        $(this).addClass("running");
      }
    });
    // initializeClock('clockdiv', deadline);
  })
};
$(document).ready(function(){
    $(".clockdiv-countdown").removeClass("running");
});



function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {

  var daysSpan = id.find('.days');
  var hoursSpan = id.find('.hours');
  var minutesSpan = id.find('.minutes');
  var secondsSpan = id.find('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.html(t.days);
    hoursSpan.html(('0' + t.hours).slice(-2));
    minutesSpan.html(('0' + t.minutes).slice(-2));
    secondsSpan.html(('0' + t.seconds).slice(-2));
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}