(function(){

    $(function () {
        toTop = new ToTop();
        accordion = new Accordion();
    });

    var toTop = null,
        accordion = null;

    var ToTop = function () {

        //private properties
        var _self = this,
            _btn = $('<div class="to-top"/>'),
            _scroller = $('html,body'),
            _window = $(window);

        //private methods
        var addBtn = function () {
                $('body').append(_btn);
            },
            addEvents = function () {
                _btn.on({
                    click: function () {
                        _self.scrollToTop();
                    }
                });

                _window.on({
                    scroll: function () {
                        checkBtn();
                    }
                });
            },
            checkBtn = function () {
                if (_window.scrollTop() <= 150) {
                    _btn.removeClass('to-top_shown');
                    _btn.addClass('to-top_hide');
                    setTimeout(function () {
                        _btn.removeClass('to-top_hide');
                    }, 550);
                } else {
                    _btn.removeClass('to-top_hide');
                    _btn.addClass('to-top_shown');
                }
            },
            init = function () {
                addBtn();
                checkBtn();
                addEvents();
            };

        //public properties

        //public methods
        _self.scrollToTop = function () {
            _scroller.animate({
                scrollTop: 0
            }, {
                duration: 1000,
                easing: 'easeInOutQuad'
            });
        };

        init();
    };

    var Accordion = function () {

        //private properties
        var _self = this,
            _dl = $('.faq dl');

        //private methods
        var addEvents = function () {
                _dl.on({
                    click: function () {
                        var cutItem = $(this),
                            dt = cutItem.find('dt');

                        if( dt.next().css('display') == 'none'){
                            dt.next().slideDown(300);
                            dt.addClass('active');
                        }
                        else{
                            dt.next().slideUp(300);
                            dt.removeClass( 'active' )
                        }
                    }
                });
            },
            init = function () {
                addEvents();
            };

        init();
    };


$(function(){
    var Slider = function (obj) {

        //private properties
        var _self = this,
            _paginator = obj.find($('.swiper-promo__pagination')),
            _paginator2 = obj.find($('.games-slider__points')),
            _obj = obj;

        //private methods
        var _addEvents = function () {

            },
            _init = function () {
                _addEvents();
            };
        if (_obj.hasClass('swiper-promo')){
            var swiper = new Swiper(_obj, {
                slidesPerView: 1,
                autoplay: 5000,
                pagination: _paginator,
                loop: true,
                paginationClickable: true
            });
        }
        if (_obj.hasClass('games-slider')){
            var swiper = new Swiper(_obj, {
                slidesPerView: 1,
                pagination: _paginator2,
                loop: true,
                autoplay: 5000,
                paginationClickable: true
            });
        }
        //public properties

        //public methods

        _init();
    };

    $('.swiper-promo').each(function () {
        Slider($(this));
    });

    $('.games-slider').each(function () {
        Slider($(this));
    });


});

})();
