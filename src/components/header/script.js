window.addEventListener('load', function (event) {

    //alert
    $('.js-close-alert').on('click touch', function(){
        $('.js-top-alert').slideUp();
    });

    //скролл меню тенюшка
    $(window).on('scroll', function () {
        let headerMiddle = $('.header-middle'),
            maxScrollTop = 100;//с учетом баннера и топ меню
        if (maxScrollTop < $(this).scrollTop()) {
            maxScrollTop = $(this).scrollTop();
            headerMiddle.addClass('scroll');
        } else {
            maxScrollTop = $(this).scrollTop();
            headerMiddle.removeClass('scroll');
        }
    });

    //header-bottom
    //показать меню по ховеру
    $('.header-bottom .nav-link[data-slam-ajax]').on('mouseenter', function (){
        let dropNav = $('.header-drop'),
            _thisIndex = $(this).closest('.nav-item').index();
        dropNav.addClass('active');
        dropNav.find('.header-drop__inner').removeClass('active');
        dropNav.find('.data-drop-'+_thisIndex).addClass('active');
        $('.mob-overlay').addClass('active');
        $('body').addClass('overflow');
    });
    //header-catalog-drop
    //показать меню по клику
    $('.header-action__catalog-btn').on('click touch', function (e) {
        let dropNav = $('.header-drop'),
            dropCatNav = $('.header-catalog-drop'),
            _this = $(this);
        if(_this.hasClass('active')){
            _this.removeClass('active');
            dropCatNav.removeClass('active');
            $('.mob-overlay').removeClass('active');
            $('body').removeClass('overflow');
        } else {
            _this.addClass('active');
            dropNav.removeClass('active');
            dropCatNav.addClass('active');
            $('.mob-overlay').addClass('active');
            $('body').addClass('overflow');
        }

    });
    //убрать менюшку по ховеру вне кнопок и области менюшки
    $(document).on('mousemove', function (e) {
        let dropNav = $('.header-drop'),
            _target = $(e.target),
            link = $('.header-bottom .nav-link[data-slam-ajax]');
        if($('.header-catalog-drop').hasClass('active')) {
            return
        }
        if(
            _target.closest('.header-drop').length ||
            _target.closest('.header-bottom').length ||
            _target.hasClass('header-drop') ||
            _target.hasClass('nav-link')
        ){
            return
        } else {
            dropNav.removeClass('active');
            $('.mob-overlay').removeClass('active');
            $('body').removeClass('overflow');
        }
    });
    //убрать менюшку по клику вне кнопок и области менюшки
    $(document).on('click touch', function (e) {
        let dropCatNav = $('.header-catalog-drop'),
            _target = $(e.target),
            link = $('.header-bottom .nav-link[data-slam-ajax]');
        if(
            _target.closest('.header-action__catalog-btn').length ||
            _target.closest('.header-catalog-drop').length ||
            _target.hasClass('header-action__catalog-btn') ||
            _target.hasClass('header-catalog-drop')
        ){
            return
        } else {
            $('.header-action__catalog-btn').removeClass('active');
            dropCatNav.removeClass('active');
            $('.mob-overlay').removeClass('active');
            $('body').removeClass('overflow');
        }
    });
    //смена фотки по ховеру
    $(document).on('mouseenter','.header-drop__nav [data-drop-img]', function (){
        let _this = $(this),
            thisImg = _this.attr('data-drop-img');
        _this.closest('.header-drop__inner').find('.header-drop__img').attr('src',thisImg);
    });

    //desctop search
    $('.header-search__input').on('input', function () {
        $('.js-search-clear').addClass('active');
    });
    $('.js-search-clear').on('click touch', function () {
        $('.header-search__input').val('');
        $('.js-search-clear').removeClass('active');
    });
    //mobile-search
    $('.js-toggle-search').on('click touch', function () {
        let _this = $(this),
            searchFieldBox = $('.js-search-field-box');

        if(searchFieldBox.hasClass('active')){
            _this.removeClass('active');
            searchFieldBox.removeClass('active');

        } else {
            _this.addClass('active');
            searchFieldBox.addClass('active');
        }
    });
    $(document).on('touch click', function (e){
        let _target = $(e.target);
        if(
            _target.hasClass('js-toggle-search') ||
            _target.hasClass('js-search-field-box') ||
            _target.closest('.js-toggle-search').length ||
            _target.closest('.js-search-field-box').length
        ) {
            return
        } else {
            $('.js-toggle-search').removeClass('active');
            $('.js-search-field-box').removeClass('active');
        }
    });

    //mobile-drop-nav
    $('.js-open-mob-nav').on('click touch', function (){
       let _this = $(this),
           navBody = $('.header-mob-drop');
       _this.addClass('active');
       navBody.addClass('active');
       $('body').addClass('overflow-mob');
        $('.mob-overlay').addClass('active-mob');

    });
    $(document).on('click touch','.js-close-mob-nav', function (){
        let _this = $(this),
            navBody = $('.header-mob-drop');
        $('.js-open-mob-nav').removeClass('active');
        navBody.removeClass('active');
        $('body').removeClass('overflow-mob');
        $('.mob-overlay').removeClass('active-mob');
    });

    //кнопка каталога в моб меню
    $(document).on('click touch', '.js-mob-catalog-btn', function (){
        let _this = $(this),
            navBody = $(document).find('.header-mob-drop__catalog-nav');
        if(_this.hasClass('active')) {
            _this.removeClass('active');
            navBody.removeClass('active');
        } else {
            _this.addClass('active');
            navBody.addClass('active');
        }
    });

    //второй уровень меню каталога/мобильн
    $(document).on('click touch', '.header-mob-drop__catalog-nav .nav-link', function (ev){
			ev.preventDefault();
        let _this = $(this),
            navBody = _this.next();
        if(_this.hasClass('open')) {
            _this.removeClass('open');
            navBody.removeClass('open');
        } else {
            _this.addClass('open');
            navBody.addClass('open');
        }
    });

    //дополнительное меню/мобильное
    $(document).on('click touch', '.header-mob-drop__sec-nav .nav-link', function (){
        let _this = $(this),
            navBody = _this.next();
        if(_this.hasClass('open')) {
            _this.removeClass('open');
            navBody.removeClass('open');
        } else {
            _this.addClass('open');
            navBody.addClass('open');
        }
    });


});

