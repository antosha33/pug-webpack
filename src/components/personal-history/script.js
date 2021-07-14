window.addEventListener( 'load', function( event ) {

    $('.js-ph-item .ph-item__num').on('click touch', function (){
        let _this = $(this),
            _thisEl = _this.closest('.js-ph-item'),
            _thisElBody = _thisEl.find('.ph-item__body');
        if(_thisEl.hasClass('active')){
            _thisEl.removeClass('active');
            _thisElBody.slideUp();
        } else {
            _thisEl.addClass('active');
            _thisElBody.slideDown();
        }
    });

});
