$(function(){
    var slider = $( '.ares-slider'),
        slider2 = $( '.games-slider' );

    new AresSlider1( {
        obj: slider,
        items: slider.find( '.ares-slider__item' ),
        btnNext: slider.find( '.ares-slider__next' ),
        btnPrev: slider.find('.ares-slider__prev')
    } );

    slider2.each( function(){

        var curItem = $( this );

        new AresSlider1( {
            obj: curItem,
            items: curItem.find( '.games-slider__item' ),
            btnNext: curItem.find( '.games-slider__prev' ),
            btnPrev: curItem.find('.games-slider__prev'),
            visibleCount: 1,
            indent: 0.0111607142857143
        } );
    } );

});

var AresSlider1 = function( params ){
    this.obj = params.obj;
    this.elems = {
        btnPrev: params.btnPrev,
        btnNext: params.btnNext,
        items: params.items
    };
    this.action = false;
    this.duration = params.duration || 5000;

    this.init();
};
AresSlider1.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this,
            elems = self.elems;

        return {
            build: function(){
                var count = elems.items.length,
                    i,
                    points = $( '<ul class="ares-slider__points"></ul>' );

                if ( self.obj.hasClass('games-slider') ){
                    points = $( '<ul class="games-slider__points"></ul>' );
                }


                for( i = 0; i < count; i++ ){
                    points.append( '<li></li>' );
                }
                self.obj.append( points );

                elems.points = points.find( 'li' );

                elems.points.eq( 0 ).addClass( 'active' );
                elems.items.eq( 0 ).css( { display: 'block' } );

                self.core.controls();

                self.core.slideToNext();
            },
            slideToNext: function(){
                self.timer = setTimeout( function(){
                    elems.btnNext.trigger( 'click' );
                }, self.duration );
            },
            controls: function(){
                elems.btnPrev.on( {
                    'click': function(){
                        var index = ( ( elems.points.filter( '.active' ).index() - 1 ) == -1 ) ? (elems.points.length - 1) :( elems.points.filter( '.active' ).index() - 1 );

                        self.slideTo( index );
                    }
                } );
                elems.btnNext.on( {
                    'click': function(){
                        var index = ( ( elems.points.filter( '.active' ).index() + 1 ) == elems.points.length )? 0:( elems.points.filter( '.active' ).index() + 1 );

                        self.slideTo( index );
                    }
                } );
                elems.points.on( {
                    'click': function(){
                        var curItem = $( this );

                        if( !curItem.hasClass( 'active' ) ){
                            self.slideTo( curItem.index() );
                        }
                    }
                } );
                self.obj.on( {
                    'mouseover': function(){
                        clearTimeout( self.timer );
                    },
                    'mouseleave': function(){
                        self.core.slideToNext();
                    }
                } );
                $(window).on({
                    resize: function(){
                        var picHeight = elems.items.height();
                        self.obj.css({
                            'height': picHeight
                        })
                    },

                    load: function(){
                        var picHeight = elems.items.height();
                        self.obj.css({
                            'height': picHeight
                        })
                    }
                })
            }
        };
    },
    slideTo: function( index ) {
        var self = this,
            elems = self.elems,
            activeIndex = elems.points.filter( '.active' ).index(),
            direction,
            curW = self.obj.width(),
            activeItem = elems.items.eq( activeIndex ),
            activePoint = elems.points.eq( activeIndex ),
            newItem = elems.items.eq( index),
            newPoint = elems.points.eq( index );

        clearTimeout( self.timer );
        if( !self.action ){
            self.action = true;

            if( activeIndex < index ){
                direction = 1;
            } else {
                direction = -1;
            }

            if( activeIndex == 0 && index == ( elems.points.length - 1 ) ){
                direction = -1;
            } else if ( activeIndex == ( elems.points.length - 1 )  && index == 0 ){
                direction = 1;
            }

            activePoint.removeClass( 'active' );
            newPoint.addClass( 'active' );

            newItem.css( {
                display: 'block',
                left: curW * -direction
//                opacity: 0
            } );
            activeItem.animate( {
                left: curW * direction
//                opacity: 0
            }, 500, function() {
                $( this ).css( { display: 'none' } );
                self.action = false;
                self.core.slideToNext();
            } );
            newItem.animate( {
                left: 0
//                opacity: 1
            }, 500 );
        }

    }
};