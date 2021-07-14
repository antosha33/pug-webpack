window.addEventListener( 'load', function( event ) {
    $('.js-personal-data .form-control').css('pointer-events','none');
    $('.js-personal-data .js-edit').on('click touch', function (){
        $('.js-personal-data .form-control').attr('readonly', false).css('pointer-events','all');
        $('.js-personal-data .js-save').css('display','inline-block');
        $('.js-personal-data .js-edit').css('display','none');
        $('.js-personal-data .form-control--datepicker').css('pointer-events','all');
    });
    $('.js-personal-data .js-save').on('click touch', function (){
        $('.js-personal-data .form-control').attr('readonly', true).css('pointer-events','none');
        $('.js-personal-data .js-edit').css('display','inline-block');
        $('.js-personal-data .js-save').css('display','none');
        $('.js-personal-data .form-control--datepicker').css('pointer-events','none');
    });
});


