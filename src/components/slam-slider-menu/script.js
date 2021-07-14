window.addEventListener('load', function () {
   if (!window.reinit) {
      window.reinit = {};
    }
    if (!window.reinit.slider) {
      window.reinit.slider = {};
    }
  
    window.reinit.slider.menuSlider = function() {
      let fsSlider = $('.js-slider-menu');
      if (fsSlider.length && !fsSlider.hasClass('inited') && fsSlider.hasClass('js-slider-active')) {
        fsSlider.each(function(i,el) {
          let slider = el;
          let length = slider.querySelectorAll('.swiper-slide').length;
          let swiper = window.slam_slider({
            el: el,
            args: {
              autoHeight: false,
              lazy: true,
              slidesPerView: 'auto',
              centeredSlides: false,
              // spaceBetween: 20,
              loop: false,
              watchOverflow: true,
              simulateTouch: true,
            }
            
          })
        });
        fsSlider.addClass('inited')
      }
    };

    window.reinit.slider.menuSlider();
})