window.addEventListener( 'load', function( event ) {

    $('.about-section__toggle-link').on('click touch', function (){
        let _thisBodyHeight = $('.about-section__toggle');
        if(_thisBodyHeight.hasClass('active')) {
            _thisBodyHeight.removeClass('active');
        } else {
            _thisBodyHeight.addClass('active');
        }
    })
});
