window.addEventListener( 'load', function( event ) {

    if (!window.reinit) {
        window.reinit = {};
    }
    if (!window.reinit.slider) {
        window.reinit.slider = {};
    }

    //вертикальные превьюшки
    window.reinit.slider.productPage = function() {
        if($('.js-product-connected-sliders').length) {
            //console.log('Есть слайдер для реинита');
            window.slam_slider_with_nav({
                $el: $('.js-product-connected-sliders'),
                args_main: {
                    autoHeight: false,
                    lazy: true,
                    loop: false,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    watchOverflow: true,
                },
                args_nav: {
                    centerInsufficientSlides: true,
                    direction: 'vertical',
                    autoHeight: false,
                    lazy: true,
                    loop: false,
                    slidesPerView: 5,
                    spaceBetween: 10,
                    watchOverflow: true,
                },
            })
        } else {
            //console.log('Нет слайдера для реинита');
        }
    };
    window.reinit.slider.productPage();

    //горизонтальные превьюшки
    window.reinit.slider.productPageHoriz = function() {
        if($('.js-product-connected-sliders--horiz').length) {
            //console.log('Есть слайдер для реинита');
            window.slam_slider_with_nav({
                $el: $('.js-product-connected-sliders--horiz'),
                args_main: {
                    autoHeight: false,
                    lazy: true,
                    loop: false,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    watchOverflow: true,
                },
                args_nav: {
                    centerInsufficientSlides: true,
                    //direction: 'vertical',
                    autoHeight: false,
                    lazy: true,
                    loop: false,
                    slidesPerView: 5,
                    spaceBetween: 16,
                    watchOverflow: true,
                },
            })
        } else {
            //console.log('Нет слайдера для реинита');
        }
    };

    window.reinit.slider.productPageHoriz();
});
