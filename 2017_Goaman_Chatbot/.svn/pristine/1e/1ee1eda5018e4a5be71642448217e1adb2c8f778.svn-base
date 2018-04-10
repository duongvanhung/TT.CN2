function block_run_script_text(block_jele, block_selector) {
    console.log('block_run_script_text - block_selector = ' + block_selector);
    $(block_selector + " .accordion").on('click', function (e) {
        console.log(block_selector + " .accordion");
        $(block_selector + " .box-bt-fix").before("<div class='button-bt'><h5 data-type='button' class='media-heading'>Enter button name</h5><span class='glyphicon glyphicon-trash delete-bt-remove' aria-hidden='true'></span></div>");
        var button = $(block_selector + ' span.delete-bt-remove');
        button.on('click', function (e) {
            var parent = $(this).parent();
            parent.remove();
        });
    });

    $(block_selector + " .glyphicon-trash").on('click', function (e) {
        var parent = $(this).parent();
        parent.remove();
    });
    $(block_selector + " .accordion-text").on('click', function (e) {
        $(block_selector + " .box-text-fix").before("<div class='in-put'><div class='all' data-type='all'><p data-type='content' class='text'>Content (required)</p><span class='glyphicon glyphicon-trash delete-bt-remove' aria-hidden='true'></span></div></div>");
        var button = $(block_selector + ' span.delete-bt-remove');
        button.on('click', function (e) {
            var parent = $(this).parent();
            parent.remove();
        });
    });

}
