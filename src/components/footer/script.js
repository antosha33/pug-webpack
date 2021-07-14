window.addEventListener( 'load', function( event ) {
    $('.js-f-title').on('click touch', function () {
        let _this = $(this);
        if(_this.hasClass('active')) {
            _this.removeClass('active');
            _this.next().removeClass('active').slideUp();
        } else {
            _this.addClass('active');
            _this.next().addClass('active').slideDown();
        }

    })
});
