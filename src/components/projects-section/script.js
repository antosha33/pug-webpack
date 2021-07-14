window.addEventListener( 'load', function( event ) {
    if (!window.reinit) {
        window.reinit = {};
    }
    if (!window.reinit.slider) {
        window.reinit.slider = {};
    }
    window.reinit.slider.projectsSlider = function() {
        $('.js-projects-slider').each(function(i,el){
            let slider = el;
            let length = slider.querySelectorAll('.swiper-slide').length;
            window.slam_slider({
                el: el,
                args: {
                    autoHeight: false,
                    lazy: true,
                    loop: length > 2,
                    slidesPerView: 2,
                    spaceBetween: 25,
                    watchOverflow: true,
                    breakpoints: {
                        1024: {
                            loop: length > 2,
                            spaceBetween: 70,
                            slidesPerView: 2,
                        },
                        768: {
                            loop: length > 2,
                            spaceBetween: 30,
                            slidesPerView: 2,
                            simulateTouch: true,
                        },
                        0: {
                            spaceBetween: 0,
                            loop: length > 1,
                            simulateTouch: false,
                            slidesPerView: "auto",
                        }
                    }
                }
            })

        });
    };
    //window.reinit.slider.projectsSlider();

    window.oneevent({
        name: 'projectsSlider',
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
        callback: window.reinit.slider.projectsSlider
    });

});
