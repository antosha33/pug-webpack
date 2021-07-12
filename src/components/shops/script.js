window.addEventListener('load', function (event) {

	$('.js-shop-type-select').click(function(){
		$(this).toggleClass('active');
	})

	let isOpened = false;
	$('.js-map-open').click(function(){
		if(isOpened == false){
			$(this).text('Свернуть карту');
		}else{
			$(this).text('Раскрыть карту');
		}

		$('.shops__map').toggleClass('active');
		isOpened = !isOpened;
	})
});