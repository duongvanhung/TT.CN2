
function block_run_script_list(block_jele, block_selector) {
    $(block_selector + " .accordion-button").on('click', function (e) {
        $(block_selector + " .block-location-bt").before("<div class='button-child'><h5 data-type='title' class='media-heading'>Enter button name</h5><span class='glyphicon glyphicon-trash delete-bt-remove' aria-hidden='true'></span></div>");
        var button = $(block_selector + ' span.delete-bt-remove');
        button.on('click', function (e) {
            var parent = $(this).parent();
            parent.remove();
        });
    });
    $(block_selector + " .accordion-text").on('click', function (e) {
        $(block_selector + " .block-location-txt").before("<article class='bg-white'><div class='content-info'><div class='media'><div class='media-body'><h5 data-type='title' class='media-heading'>Heading (required)</h5><p data-type='content'>Subtitle or description</p><a class='link-web' href='#' data-type='link'>Url</a><div class='bt'><button data-type='button' class='btn btn-default'>Add button</button></div></div><div class='media-right'><img data-type='image' src='assets/images/blocks/team/img_chosing.png' class='media-object'></div></div><span class='glyphicon glyphicon-trash delete-bt-remove' aria-hidden='true'></span></div></article>");
        var button = $(block_selector + ' span.delete-bt-remove');
        button.on('click', function (e) {
            var parent = $(this).parent();
            parent.remove();
        });
    });
};
