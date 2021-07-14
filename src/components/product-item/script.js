window.addEventListener( 'load', function( event ) {
    if (!window.reinit) {
        window.reinit = {};
    }
    window.reinit.productItemCarousel = function() {

        let dots = $('.js-product-carousel');

        dots.on('mouseenter','.product-item__carousel_control', function (){
            let _this = $(this),
                _thisIndex = _this.index(),
                _thisParent = _this.closest('.product-item__carousel-items');
            _thisParent.find('.product-item__img-carousel').removeClass('active');
            _thisParent.find('.product-item__img-carousel').eq(_thisIndex).addClass('active');
        });

    };
    window.reinit.productItemCarousel();

    let colorsList = $('.product-item__colors .color');
    colorsList.on('click touch', function (){
        let _this = $(this),
            _thisProduct = _this.closest('.product-item'),
            activeIndex = _this.index(),
            _thisColorList = _this.closest('.product-item__colors').find('.color');
        _thisColorList.removeClass('active');
        _this.addClass('active');
        let imgsList = _this.attr('data-imgs');
        if(imgsList === 'undefined' || imgsList === undefined){
            imgsList = [];
        } else {
            imgsList = imgsList.split(',');
        }
        let domImgs = '',
            domDots = '<div class="product-item__carousel_controls">';
        let i = 0;
        imgsList.map(function(item){
            if(i==0) {
                domImgs = domImgs + `<span class="product-item__img-carousel active"><img src="${item}" alt="img"></span>`;

            } else {
                domImgs = domImgs + `<span class="product-item__img-carousel"><img src="${item}" alt="img"></span>`;
            }
            domDots = domDots + '<div class="product-item__carousel_control"></div>';
            i++;
        });
        domDots = domDots + '</div>';
        let carouselContainers = _thisProduct.find('.product-item__carousel-items'),
            thisContainer = carouselContainers.eq(activeIndex);
        if(thisContainer.html().length == 0){
            thisContainer.append(domImgs).append(domDots);
        }
        carouselContainers.removeClass('active');
        thisContainer.addClass('active');

    })

});
