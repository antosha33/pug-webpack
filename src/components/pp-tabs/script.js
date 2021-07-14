window.addEventListener( 'load', function( event ) {
    if (!window.reinit) {
        window.reinit = {};
    }
    if (!window.reinit.slider) {
        window.reinit.slider = {};
    }
    window.reinit.slider.smSlider = function() {
        $('.js-pp-sm-slider').each(function(i,el){
            let slider = el;
            let length = slider.querySelectorAll('.swiper-slide').length;
            let sliderSm = window.slam_slider({
                el: el,
                args: {
                    autoHeight: false,
                    lazy: true,
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 25,
                    watchOverflow: true,
                }
            })

        });
    };
    window.oneevent({
        name: 'smSlider',
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
        callback: window.reinit.slider.smSlider
    });

    //реинит слайдеров в табах
    $('.js-pp-tabs').on('click touch','.tabs__title', function () {
        let $tab = $('.js-pp-tabs'),
            $slider_arr = $tab.find('.swiper-container-initialized');
        $slider_arr.each(function (i, el) {
            el.swiper && el.swiper.update && el.swiper.update()
        })
    });

    //рейтинг
    let Circle = function(sel){
        let circles = document.querySelectorAll(sel);
        [].forEach.call(circles,function(el){
            let valEl = parseFloat(el.getAttribute('data-percent'));
            valEl = valEl*150/100;
            el.innerHTML = '<svg width="60" height="60">' +
                '<circle transform="rotate(-90)" r="25" cx="-30" cy="30" />' +
                '<circle transform="rotate(-90)" style="stroke-dasharray:'+valEl+'px 150px;" r="25" cx="-30" cy="30" />' +
                '</svg>';

        });
    };
    Circle('.js-circle');

    //сборное меню для товаров из коллекции
    let itemsList = $('.js-options-group--more .option'),
        itemsWrap = $('.js-options-group--more'),
        btnMore = false;
    itemsList.map(function (index){
        if(window.innerWidth < 575) {
            if(index > 1) {
                itemsList.eq(index).addClass('hitem hidden');
            }
        } else {
            if(index > 4) {
                itemsList.eq(index).addClass('hitem hidden');
            }
        }

    })
    btnMore = !btnMore;
    if(btnMore) {
        itemsWrap.append('<span class="tabs-section__more js-more"><span class="icon"></span></span>');
    }
    $('.js-options-group--more').on('click touch', '.js-more', function (){
        let _this = $(this);
        if(_this.hasClass('active')) {
            $('.js-options-group--more .option.hitem').addClass('hidden');
            _this.removeClass('active');
        } else {
            itemsList.removeClass('hidden');
            _this.addClass('active');
        }

    });

    //раскр + скролл вверх
    $('.js-options-group--more .option').each(function (){

    })

});
