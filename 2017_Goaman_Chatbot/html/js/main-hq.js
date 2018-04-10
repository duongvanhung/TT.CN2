
$(document).ready(function () {
    $(".accordion-fix").on('click', function (e) {
        $(this).before("<div class='bu-tton-1'><button data-type='link' class='btn btn-default accordion'>New Button</button><span class='glyphicon glyphicon-trash delete-bt' aria-hidden='true'></span></div>");
        var button_delete = $('.delete-bt');
        $(button_delete).on('click', function (e) {
            var parent = this.parentElement;
            parent.remove();
        });
    });
    $(".img-gallery").on('click', function (e) {
        $('.add-box').before("<div class='fix-col'><div class='thumbnail'><img src='assets/images/blocks/team/default_image_choosing.png' alt='' data-type='image'><div class='caption'><div><h3 data-type='content' class='title'>Heading (required)</h3></div><span data-type='title' class='subtitle-1' style=''>Subtitle or description</span><div class='bu-tton-3'><button id='btn-id' class='btn btn-default accordion-3'>+ ADD BUTTON</button></div></div></div> <span class='glyphicon glyphicon-trash box-delete' aria-hidden='true'></span></div>");
        var box_delete = ('.box-delete');
        $(box_delete).on('click', function (e) {
            var parent = this.parentElement;
            parent.remove();
        });
        $(".accordion-3:last").on('click', function (e) {
            $(this).before("<div class='bu-tton-1'><button data-type='link' class='btn btn-default accordion'>New Button</button><span class='glyphicon glyphicon-trash btn-delete' aria-hidden='true'></span></div>");
            var btn_delete = ('.btn-delete');
            $(btn_delete).on('click', function (e) {
                var parent = this.parentElement;
                parent.remove();
            });
        });
    });
});
