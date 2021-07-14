window.addEventListener( 'load', function( event ) {

    $('.js-personal-address .js-edit').on('click touch', function () {
        let _this = $(this),
            item = _this.closest('.js-pa-section'),
            itemBody = item.find('.pa-section__body');

        item.addClass('active');
        itemBody.slideDown();
    });

    $('.js-personal-address .js-save').on('click touch', function () {
        let _this = $(this),
            item = _this.closest('.js-pa-section'),
            itemBody = item.find('.pa-section__body');
        item.removeClass('active');
        itemBody.slideUp();
    });

    $('.js-personal-address .js-remove').on('click touch', function () {
        let _this = $(this),
            item = _this.closest('.js-pa-section'),
            itemBody = item.find('.pa-section__body');

        item.remove();
    });

    $('.js-personal-address .js-add').on('click touch', function () {
        $('.js-pa-section-new').css('display', 'block');
    });

});


