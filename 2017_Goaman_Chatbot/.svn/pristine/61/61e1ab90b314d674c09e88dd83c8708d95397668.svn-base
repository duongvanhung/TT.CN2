function block_run_script_team(block_jele, block_selector) {
    $(document).ready(function () {
        $(".accordion").on('click', function (e) {
            $(block_selector + " .bu-tton").before("<div class='bu-tton-1'><button data-type='link' class='btn btn-default accordion'>New Button</button><span class='glyphicon glyphicon-trash delete-bt-remove' aria-hidden='true'></span></div>");
            var button = document.getElementsByClassName('delete-bt-remove');
            for (var i = 0; i < button.length; i++) {
                button[i].addEventListener("click", function () {
                    var parent = this.parentElement;
                    parent.remove();
                });
            }
        });
    });
}