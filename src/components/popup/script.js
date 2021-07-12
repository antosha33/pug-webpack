window.addEventListener('load', function (event) {

	if(!$('body').hasClass('index')){
		$('.popup__preloader').removeClass('preloader');
		$('.popup__control').slideDown({
			start: function () {
				$(this).css({
					display: "flex"
				})
			},
			duration: 200
		});
	} 

	function setCookie(name, value, days, seconds) {
		var expires;
		var maxAage;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else if(seconds) {
			expires = "";
			maxAage = "; max-age=" + seconds;
		}else{
			expires = "";
			maxAage = "";
		}
		document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + maxAage + "; path=/";
	}

	$('.js-popup-resolve').click(function () {
		setCookie('resolve_age', '1', false, 600)
		// document.cookie = "resolve_age=1";
		if (!$('body').hasClass('index')) {
			$('body').removeClass('menu-opened');
			$('.popup').css({
				'display': 'none'
			})
		}
	})

	$('.js-popup-reject').click(function () {
		document.cookie = "resolve_age=0";
		$('.popup__control').slideUp(200)
		$('.popup__descr').text('Извините, доступ на сайт разрешен только лицам, достигших возраста 18+')
	});

});