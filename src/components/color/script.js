window.addEventListener( 'load', function( event ) {
    $('.js-colors-list .color').on('click touch', function () {
        let _this = $(this),
            _thisList = _this.closest('.js-colors-list');
        _thisList.find('.color').removeClass('active');
        _this.addClass('active');
    })

});
