window.addEventListener( 'load', function( event ) {
    if (!window.reinit) {
        window.reinit = {};
    }
    if (!window.reinit.slider) {
        window.reinit.slider = {};
    }
    window.reinit.slider.commentsSlider = function() {

        $('.js-comments-slider').each(function(i,el){
            let slider = el;
            let length = slider.querySelectorAll('.swiper-slide').length;
            window.slam_slider({
                el: el,
                args: {
                    autoHeight: false,
                    lazy: true,
                    loop: length > 6,
                    slidesPerView: 6,
                    spaceBetween: 25,
                    watchOverflow: true,
                    breakpoints: {
                        1440: {
                            loop: length > 6,
                            spaceBetween: 25,
                            slidesPerView: 6,
                        },
                        1200: {
                            loop: length > 5,
                            spaceBetween: 25,
                            slidesPerView: 5,
                        },
                        1024: {
                            loop: length > 4,
                            spaceBetween: 25,
                            slidesPerView: 4,
                        },
                        768: {
                            loop: length > 3,
                            spaceBetween: 30,
                            slidesPerView: 3,
                            simulateTouch: true,
                        },
                        0: {
                            spaceBetween: 16,
                            loop: length > 1,
                            simulateTouch: false,
                            slidesPerView: 'auto',
                        }
                    }
                }
            })

        });
    };
    //window.reinit.slider.commentsSlider();

    window.oneevent({
        name: 'commentsSlider',
        event: {
            scroll: true,
            click: true,
            mousedown: true,
            timeout: {
                delay: 6000
            },
            mouseover: {
                trigger: 'body'
            },
            touchstart: true
        },
        callback: window.reinit.slider.commentsSlider
    });


});
