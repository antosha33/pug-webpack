window.addEventListener('load', function (event) {

	const initAnimation = ($elem) => {
		$elem.css({
			opacity: '0'
		})
		if($elem[0]){
			new Waypoint({
				element: $elem[0],
				handler: function (direction) {
					$elem.addClass('fadeInUpAnimate');
				},
				offset: '70%'
			});
		}
	}

	const elements = ['.system__tempretures','.control','.technology', '.catalog-main__devices','.shop-advantages', '.glo-instagram__item', '.where-to-buy__offline', ]

	initAnimation($('.system__tempretures'));
	initAnimation($('.control'));
	initAnimation($('.technology'));
	initAnimation($('.catalog-main__devices'));
	initAnimation($('.shop-advantages'));
	initAnimation($('.glo-instagram__item'));
	initAnimation($('.where-to-buy__offline'));
	initAnimation($('.where-to-buy__online'));
});
