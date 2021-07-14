window.addEventListener( 'load', function( event ) {
    window.vendorLoader({
        name: 'rangeSlider',
        path: 'js/vendor/ion.rangeSlider.min.js',
        event: {
            scroll: true,
            click: true,
            mouseover: {
                trigger: '.ajaxfilter-range'
            }
        }
    });
});
