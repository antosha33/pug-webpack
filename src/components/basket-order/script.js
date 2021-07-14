window.addEventListener( 'load', function( event ) {

    $('[data-person]').on('click touch', function () {
        let _this = $(this).attr('data-person');
        $('[data-field]').css('display', 'none');
        $('[data-field='+_this+']').css('display', 'block');
    })

    $('.js-basket-order .js-delivery input').on('change', function (){
        let _this = $(this);
        $('.js-basket-order .js-delivery input').closest('.bo-del').find('.bo-del__options').slideUp();
        _this.closest('.bo-del').find('.bo-del__options').slideDown();
    });

    $('.js-promo-box .promocode-box__text').on('click touch', function (){
        $(this).css('display', 'none');
        $('.js-promo-box .promocode-box__field').css('display', 'block');
    });

});
