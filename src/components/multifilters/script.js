window.addEventListener( 'load', function( event ) {

    $('.js-multifilter .multifilter__head').on('click touch', function (e){
        if($(e.target).hasClass('clear')) {
            return
        }
        let _this = $(this),
            parent = _this.closest('.js-multifilter');
        $('.js-multifilter').removeClass('open');
        if(parent.hasClass('open')) {
            parent.removeClass('open');
        } else {
            parent.addClass('open');
        }
    });

    $('.js-multifilter .clear').on('click touch', function (){
       let _this = $(this),
            item = _this.closest('.js-multifilter');
        item.removeClass('open');
        item.removeClass('active');
        item.find('input[type=checkbox]').prop('checked', false);
    });

    $('.js-multifilter input[type=checkbox]').on('change', function (){
        let _this = $(this),
            parent = _this.closest('.js-multifilter'),
            countBox = parent.find('b'),
            group = _this.closest('.sidebar-filter__content'),
            activeItems = parseInt(group.find('input:checked').length);

        switch (activeItems) {
            case 0:
                countBox.html('');
                parent.removeClass('active');
                break;
            case 1:
                countBox.html(_this.next().html());
                parent.addClass('active');
                break;
            default:
                countBox.html(activeItems);
                parent.addClass('active');
        }


    });

    //-
    $(document).on('click touch', function (e){
        let _target = $(e.target);
        if(
            _target.hasClass('js-multifilter')||
            _target.closest('.js-multifilter').length
        ) {
            return
        }
        $('.js-multifilter').removeClass('open');
    })
});
