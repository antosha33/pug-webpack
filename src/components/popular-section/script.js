window.addEventListener( 'load', function( event ) {
    if (!window.reinit) {
        window.reinit = {};
    }
    if (!window.reinit.slider) {
        window.reinit.slider = {};
    }
    window.reinit.slider.pslider = function() {
        if($(window).width() < 768) {
            return
        }
        $('.js-popular-section-slider').each(function(i,el){
            var slider = el;
            var length = slider.querySelectorAll('.swiper-slide').length;
            let popularSwiper = window.slam_slider({
                el: el,
                args: {
                    autoHeight: false,
                    lazy: true,
                    loop: length > 6,
                    //slidesPerView: 6,
                    slidesPerView: 'auto',
                    //spaceBetween: 25,
                    spaceBetween: 0,
                    pagination: false,
                    watchOverflow: true,
                    breakpoints: {
                        1630: {
                            loop: length > 6,
                            //spaceBetween: 25,
                            //slidesPerView: 6,
                        },
                        1440: {
                            loop: length > 5,
                            //spaceBetween: 25,
                            //slidesPerView: 5,
                        },
                        1200: {
                            loop: length > 4,
                            //spaceBetween: 25,
                            //slidesPerView: 4,
                        },
                        768: {
                            loop: length > 3,
                            //spaceBetween: 25,
                            //slidesPerView: 3,
                            simulateTouch: true,
                        },
                        0: {
                            loop: length > 1,
                            slidesPerView: "auto",
                            spaceBetween: 0,
                        }
                    }
                }
            })


        });
    };


    window.oneevent({
        name: 'pslider',
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
        callback: window.reinit.slider.pslider
    });


});
