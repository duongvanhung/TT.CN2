(function($) {
    $(function() {
        var jcarousel = $('.jcarousel');
        jcarousel.each(function(index) {
            var element = $(this);
            element
            .on('jcarousel:reload jcarousel:create', function () {
                var width = element.innerWidth();
                if(typeof carouselWidth === 'function') {
                    width = carouselWidth(width);
                } else {
                     if(width >= 945) {
                         width = 183;
                    }
                    else if (width >= 600) {
                        width = width / 3;
                    } else if (width >= 350) {
                        width = width / 2;
                    }
                }
               
               
                element.jcarousel('items').css('width', width + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            });
        $('.jcarousel-control-prev').eq(index)
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next').eq(index)
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination').eq(index)
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
        });
        
    });
})(jQuery);
