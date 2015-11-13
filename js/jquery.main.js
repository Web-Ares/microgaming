(function(){

    var toTop = null,
        accordion = null;

    $(function () {
        toTop = new ToTop();
        accordion = new Accordion();
        $('.site__header').each(function () {
            mobileMenu($(this));
        });
        $('.swiper-promo').each(function () {
            Slider($(this));
        });
        $('.sub-menu').each(function () {
            subMenu($(this));
        });
        $('.games-slider').each(function () {
            Slider($(this));
        });
    });

    var mobileMenu = function (obj) {
        //private properties
        var _obj = obj,
            _menu = $('.menu'),
            _openBtn = $('.menu-icon'),
            _closeBtn = $('.close-menu'),
            _site = $('.site'),
            _window = $(window),
            _windowWidth = $(window).width();

        //private methods
        var _addEvents = function () {
                _window.on({
                    resize: function () {
                        _windowWidth = $(window).width();
                        if(_windowWidth<=1006){
                            _obj.removeClass('open-menu');
                            _openBtn.removeClass('close-menu');
                        } else {
                            _menu.css('display','block');
                            _menu.removeClass('mobile-menu');
                        }

                    }
                });
                _openBtn.on({
                    click: function () {
                        if (_openBtn.hasClass('close-menu')){
                            _openBtn.removeClass('close-menu');
                            _obj.removeClass('open-menu');
                        } else {
                            _openBtn.addClass('close-menu');
                            _obj.addClass('open-menu');
                            _menu.addClass('mobile-menu');
                        }
                    }
                });
            },
            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var subMenu = function (obj) {
        //private properties
        var _obj = obj,
            _site = $('.site'),
            _sub = _obj.children('ul'),
            _window = $(window),
            _windowWidth = $(window).width();

        //private methods
        var _addEvents = function () {

                _windowWidth = $(window).width();

                _window.on({
                    resize: function () {
                        if(_windowWidth<=749){
                            //$('.header__menu li').removeClass('active');
                            //$('.header__menu li ul').css('display','none');
                            _sub.css('display','block');
                        }
                    }
                });

                _obj.on({
                    click: function () {
                        if (_obj.hasClass('mobile-active')){
                            _sub.slideUp(500);
                            _obj.removeClass('mobile-active');
                        } else {
                            $('.menu li').removeClass('mobile-active');
                            $('.menu li ul').slideUp(500);
                            $(this).addClass('mobile-active');
                            _sub.slideDown(500);
                        }
                        return false
                    }
                });
            },
            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

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

    var Slider = function (obj) {

        //private properties
        var _self = this,
            _next = obj.find($('.swiper-button-next')),
            _prev = obj.find($('.swiper-button-prev')),
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
        if (_obj.hasClass('games-slider')){
            var swiper = new Swiper(_obj, {
                slidesPerView: 'auto',
                loop: true,
                autoplay: 5000,
                paginationClickable: true,
                nextButton: _next,
                prevButton: _prev
            });
        }
        //public properties

        //public methods

        _init();
    };

})();
