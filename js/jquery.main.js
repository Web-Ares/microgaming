(function(){

    $(function () {
        toTop = new ToTop();
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
})();
