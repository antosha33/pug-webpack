window.addEventListener( 'load', function( event ) {

    $('.tabs__title').on('click touch', function (){
       let _this = $(this),
           activeTitle = _this.index(),
           parent = _this.closest('.tabs');
        parent.find('.tabs__title').removeClass('active');
        _this.addClass('active');
       parent.find('.tabs__block').removeClass('active');
       parent.find('.tabs__block').eq(activeTitle).addClass('active');
    });

});
