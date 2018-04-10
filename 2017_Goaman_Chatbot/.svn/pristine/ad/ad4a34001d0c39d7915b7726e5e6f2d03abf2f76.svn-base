$(document).ready(function () {
    $(".accordion-quick").on('click', function (e) {
        $(".bu-tton-quick").before("<div class='bu-tton-1-quick'><button data-type='link' class='btn btn-default accordion-quick'>New Button</button><span class='glyphicon glyphicon-trash delete-bt-remove-quick' aria-hidden='true'></span></div>");
        var button = document.getElementsByClassName('delete-bt-remove-quick');
        for (var i = 0; i < button.length; i++) {
            button[i].addEventListener("click", function () {
                var parent = this.parentElement;
                parent.remove();
            });
        }
    });
});