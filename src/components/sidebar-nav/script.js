window.addEventListener( 'load', function( event ) {

    $('.js-toggle-sn .more-link').on('click touch', function () {
        let _this = $(this),
            btnTextBox = _this.find('.text'),
            _thisEl = _this.closest('.js-toggle-sn').find('.sidebar-nav__list');
        if(_this.hasClass('active')){
            _this.removeClass('active');
            btnTextBox.html('Показать все');
            _thisEl.removeClass('active');
        } else {
            _this.addClass('active');
            btnTextBox.html('Скрыть');
            _thisEl.addClass('active');
        }
    })

});
