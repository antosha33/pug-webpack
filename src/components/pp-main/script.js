window.addEventListener( 'load', function( event ) {

    //скроллы по странице
    $('.js-scroll-to').on('click touch', function (){
        let _this = $(this),
            _thisId = _this.attr('data-to'),
            _thisBlock = $('#'+_thisId);
        if(_thisBlock.hasClass('tabs__block')){
            _thisBlock.closest('.tabs').find('.tabs__block').removeClass('active');
            _thisBlock.addClass('active');
            let activeIndex = _thisBlock.index();
            _thisBlock.closest('.tabs').find('.tabs__title').removeClass('active');
            _thisBlock.closest('.tabs').find('.tabs__title').eq(activeIndex).addClass('active');
        }

        $('html,body').animate({scrollTop: _thisBlock.offset().top - 150});

    })

    //наведение на список
    $('.ob__ph-item').on('mouseenter', function (){
        let _this = $(this),
            _thisData = _this.attr('data-item-no');
        $(`.tl-item[data-item-no]`).removeClass('active');
        $(`.tl-item[data-item-no=${_thisData}]`).addClass('active');
    });
    $('.ob__ph-item').on('mouseleave', function (){
        let _this = $(this),
            _thisData = _this.attr('data-item-no');
        $(`.tl-item[data-item-no]`).removeClass('active');
    });

    //наведение на тултипы
    $('.tl-item').on('mouseenter', function (){
        let _this = $(this),
            _thisData = _this.attr('data-item-no');
        $(`.ob__ph-item[data-item-no]`).removeClass('active');
        $(`.ob__ph-item[data-item-no=${_thisData}]`).addClass('active');
    });
    $('.tl-item').on('mouseleave', function (){
        let _this = $(this),
            _thisData = _this.attr('data-item-no');
        $(`.ob__ph-item[data-item-no]`).removeClass('active');
    });


    $('.ob__link.more a').on('click touch', function (){
        let _this = $(this),
            parent = _this.closest('.ob');
        parent.find('.ob__collapse').slideDown();
        _this.closest('.ob__link').css('display','none');
        parent.find('.less').css('display', 'block');
    });
    $('.ob__link.less a').on('click touch', function (){
        let _this = $(this),
            parent = _this.closest('.ob');
        parent.find('.ob__collapse').slideUp();
        _this.closest('.ob__link').css('display','none');
        parent.find('.more').css('display', 'block');
    });

    //мобильные тултипы
    $('.js-open-tooltips').on('click touch', function (){
        $('.ob__mobile-img').html('');
        let _this = $(this),
            _thisIndex = _this.attr('data-index'),
            _thisImg = _this.attr('data-img'),
            activeOb = $('.ob[data-slide-tab='+_thisIndex+']');
        $('.ob[data-slide-tab]').removeClass('visible');
        activeOb.find('.ob__mobile-img').append(`<img src="${_thisImg}" alt="img">`)
        activeOb.addClass('visible');
        let collection = $(this).next().clone().appendTo('.ob__mobile-img');
    });

    $('.js-close-tooltips').on('click touch', function (){
        $('.ob[data-slide-tab]').removeClass('visible');
    })
});
