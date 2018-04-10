function block_run_script_gallery(block_jele, block_selector) {
	pr('CALL block_run_script_gallery');
    $(block_selector + " .accordion-fix").off( "click").on('click', function (e) {
        $(this).before("<div class='bu-tton-1'><button data-type='button' class='btn btn-default accordion'>Enter button name</button><span class='glyphicon glyphicon-trash delete-bt' aria-hidden='true'></span></div>");
        var button_delete = $(block_selector + ' .delete-bt');
        $(button_delete).on('click', function (e) {
            var parent = this.parentElement;
            parent.remove();
        });
    });
    $(block_selector + " .fix-icon").off( "click").on('click', function (e) {
        $(block_selector + ' .add-box').before("<div class='fix-col'><div class='thumbnail'><img class='img-choosing' src='assets/images/blocks/team/default_image_choosing.png' alt='' data-type='image'><div class='caption'><div><h4 data-type='title' class='title'>Heading (required)</h4></div><p data-type='content' class='subtitle-1' style=''>Subtitle or description</p><div class='bu-tton-2'><button id='btn-id' class='btn btn-default accordion-fix'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp;ADD BUTTON</button></div></div></div> <span class='glyphicon glyphicon-trash box-delete' aria-hidden='true'></span></div>");
        var box_delete = (block_selector + ' .box-delete');
        $(box_delete).on('click', function (e) {
            var parent = this.parentElement;
            parent.remove();
        });
        // $(block_selector + " .accordion-3:last").on('click', function (e) {
            // $(this).before("<div class='bu-tton-1'><button data-type='button' class='btn btn-default accordion'>Enter button name</button><span class='glyphicon glyphicon-trash btn-delete' aria-hidden='true'></span></div>");
            // var btn_delete = (block_selector + ' .btn-delete');
            // $(btn_delete).on('click', function (e) {
                // var parent = this.parentElement;
                // parent.remove();
            // });
        // });
		pr('block_selector = ' + block_selector);
		block_run_script_gallery(block_jele, block_selector);
    });
};
