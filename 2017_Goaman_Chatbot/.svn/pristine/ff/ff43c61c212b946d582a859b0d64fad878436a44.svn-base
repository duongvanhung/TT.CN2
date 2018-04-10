function block_run_script_tag(block_jele, block_selector) {
    $(block_selector + " .add-btn-bt").off("click").on("click", function() {
        $(block_selector + " .add-before-block").before("<div class='row'><div class='col-sm-2 col-md-2 reponsive'></div><div class='col-sm-8 col-md-8 reponsive-fix'><div class='content'><div class='col-sm-6 col-md-6 box-tag'><div class='tag-inner'><input class='tag form-control' type='text' value='' placeholder='Input question' data-role='tagsinput' /></div></div><div class='col-sm-6 col-md-6 box-input-answer'><div class='input-answer'><input type='text' class='form-control'></div></div></div><span class='glyphicon glyphicon-trash delete-bt-remove' aria-hidden='true'></span></div><div class='col-sm-2 col-md-2 reponsive'></div></div>")
        try {
            $(block_selector + " .tag:last").tagsinput({
                allowDuplicates: true
            });
        } catch (parentElement) {

        }
        var button_delete = $(block_selector + " .delete-bt-remove");
        $(button_delete).on("click", function(e) {
            var parent = this.parentElement.parentElement;
            parent.remove();
        });
    });

};