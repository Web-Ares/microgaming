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
        $('.newest-games__slider').each(function () {
            Slider($(this));
        });
        $('.top-casinos-country').each(function () {
            Slider($(this));
        });

        $.each($('.slots__pirate'), function () {
            new Pirate($(this))
        });
        $(window).on({
            'load':function(){
                if($(window).width() >= 1006){
                    $('.aside-inform').clone().appendTo(".site_drop-down");
                    $('.site_drop-down').addClass('site_full-aside');
                    $('.site_drop-down').removeClass('site_drop-down');
                    $('.top-games_down').clone().appendTo(".top-games_aside-down");
                    $('.top-games_aside-down').addClass('top-games_aside-top');
                    $('.top-games_aside-down').removeClass('top-games_aside-down');
                }
            },
            'resize':function(){
                if($(window).width() >= 1006){
                    $('.aside-inform').clone().appendTo(".site_drop-down");
                    $('.site_drop-down').addClass('site_full-aside');
                    $('.site_drop-down').removeClass('site_drop-down');
                    $('.top-games_down').clone().appendTo(".top-games_aside-down");
                    $('.top-games_aside-down').addClass('top-games_aside-top');
                    $('.top-games_aside-down').removeClass('top-games_aside-down');
                }
            }
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
            _btn = _obj.children('a'),
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

                _btn.on({
                    click: function () {
                        if(_windowWidth<=749) {
                            if (_obj.hasClass('mobile-active')) {
                                _sub.slideUp(500);
                                _obj.removeClass('mobile-active');
                            } else {
                                $('.menu li').removeClass('mobile-active');
                                $('.menu li ul').slideUp(500);
                                $(this).parent('li').addClass('mobile-active');
                                _sub.slideDown(500);
                            }
                            return false
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
            _paginator2 = obj.find($('.newest-games__points')),
            _window = $(window),
            _windowWidth = $(window).width(),
            _swiper = null,
            _obj = obj;


        //private methods
        var _addEvents = function () {

            },
            _init = function () {
                _addEvents();
            };
        if (_obj.hasClass('swiper-promo')){
            var _swiperPromo = new Swiper(_obj, {
                slidesPerView: 1,
                autoplay: 5000,
                pagination: _paginator,
                loop: true,
                paginationClickable: true
            });
        }
        if (_obj.hasClass('newest-games__slider')){
            var _swiperSlider = new Swiper(_obj, {
                pagination: '.newest-games__points',
                paginationClickable: true,
                slidesPerView: 5,
                autoplay: 10000,
                spaceBetween: 0,
                loop: false,
                breakpoints: {
                    1024: {
                        slidesPerView: 3
                    }
                }
            });
        }
        if (_obj.hasClass('top-casinos-country')){
            _window.on({
                load: function () {
                    if (_windowWidth <= 1006) {
                        _swiper = new Swiper(_obj, {
                            slidesPerView: 'auto',
                            loopedSlides: 40,
                            loop: true,
                            paginationClickable: true,
                            nextButton: _next,
                            prevButton: _prev
                        });
                    }
                },
                resize: function () {
                    _windowWidth = $(window).width();
                    if (_windowWidth <= 1006) {
                        if(_swiper===null)
                        _swiper = new Swiper(_obj, {
                            slidesPerView: 'auto',
                            loopedSlides: 40,
                            loop: true,
                            paginationClickable: true,
                            nextButton: _next,
                            prevButton: _prev
                        });
                    } else {
                        if(_swiper!==null){
                            _swiper.destroy(false,true);
                            _swiper = null;
                        }
                    }
                }

            })
        }
        //public properties

        //public methods

        _init();
    };

    var Pirate = function (obj) {
        this.obj = obj;
        this.body = $('body');
        this.pirateEye = $('.slots__pirate-eye');
        this.pirateWhite = $('.slots__pirate-white');
        this.pirateBonus = $('.slots__bonus');

        this.init();
    };
    Pirate.prototype = {
        init: function () {
            var self = this;
            self.core = self.core();
            self.core.build();
        },
        core: function () {
            var self = this;

            return {
                build: function () {
                    self.core.AddEvents();
                },
                AddEvents: function () {
                    self.body.on({
                        mousemove: function (e) {
                            var centerX = self.pirateEye.offset().left + 12,
                                centerY = self.pirateWhite.offset().top + 10;
                            if (( e.pageX - centerX ) < 0) {
                                var x = 7 + 7 * ( ( e.pageX - centerX ) / centerX ),
                                    y = 6 + 6 * ( ( e.pageY - centerY ) / centerY );
                                if (x < 0) {
                                    x = 0
                                }
                                if (x > 14) {
                                    x = 14
                                }
                                if (y < 0) {
                                    y = 0
                                }
                                if (y > 12) {
                                    y = 12
                                }
                                $(this).find('.slots__pirate-pupil').css({
                                    'left': x,
                                    'top': y
                                })
                            } else {
                                var x = 7 + 7 * ( ( e.pageX - centerX ) / ( $(window).width() - centerX ) ),
                                    y = 6 + 6 * ( ( e.pageY - centerY ) / ( $(window).height() - centerY ) );
                                if (x < 0) {
                                    x = 0
                                }
                                if (x > 14) {
                                    x = 14
                                }
                                if (y < 0) {
                                    y = 0
                                }
                                if (y > 12) {
                                    y = 12
                                }
                                $(this).find('.slots__pirate-pupil').css({
                                    'left': x,
                                    'top': y
                                })
                            }

                        }

                    });

                    self.obj.on({
                        click: function () {
                            if (!self.pirateBonus.hasClass('active')) {
                                self.pirateBonus.addClass('active');
                                return false;
                            } else {
                                self.pirateBonus.removeClass('active');
                                return false;
                            }
                        }
                    })

                }
            };
        }
    };

})();
