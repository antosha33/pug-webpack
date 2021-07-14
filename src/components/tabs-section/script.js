window.addEventListener( 'load', function( event ) {

    $('.js-options-group .option').on('click touch', function () {
        let _this = $(this);
        _this.closest('.js-options-group').find('.option').removeClass('active');
        _this.addClass('active');
    });



});
