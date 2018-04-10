function block_run_script_video(block_jele, block_selector) {
    $('.save_source').on('click', function () {
        var fim = $(block_selector + ' .aa').text();
        alert(fim);
        $(block_selector + ' .box-img-video').remove();
        $(block_selector + ' .box-video').html('<video controls class="style-video"><source src="' + fim + '" type="video/mp4">Your browser does not support the video tag.</video>');
    });
}