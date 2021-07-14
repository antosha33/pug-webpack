window.addEventListener( 'load', function( event ) {
    //console.log('init connected-sliders');

    if (!window.reinit) {
        window.reinit = {};
    }
    if (!window.reinit.slider) {
        window.reinit.slider = {};
    }

    window.reinit.slider.gallerySlider = function() {
        if($('.js-connected-sliders').length) {
            //console.log('Есть слайдер для реинита');

            window.slam_slider_with_nav({
                $el: $('.js-connected-sliders'),
                args_main: {
                    autoHeight: false,
                    lazy: true,
                    loop: false,
                    slidesPerView: 1,
                    spaceBetween: 15,
                    watchOverflow: true,
                },
                args_nav: {
                    // direction: 'vertical',
                    autoHeight: false,
                    lazy: true,
                    loop: false,
                    slidesPerView: 6,
                    spaceBetween: 15,
                    watchOverflow: true,
                },
            })

        } else {
            //console.log('Нет слайдера для реинита');
        }
        if($('.js-connected-sliders-big').length) {
            //console.log('Есть слайдер для реинита');

            window.slam_slider_with_nav({
                $el: $('.js-connected-sliders-big'),
                args_main: {
                    autoHeight: false,
                    lazy: true,
                    loop: false,
                    slidesPerView: 1,
                    spaceBetween: 15,
                    watchOverflow: true,
                },
                args_nav: {
                    // direction: 'vertical',
                    autoHeight: false,
                    lazy: true,
                    loop: false,
                    slidesPerView: 9,
                    spaceBetween: 15,
                    watchOverflow: true,
                },
            })

        } else {
            //console.log('Нет слайдера для реинита');
        }
    };

    window.reinit.slider.gallerySlider();
});
