window.animateToRegister = () => {

		$('.lazy-img').each(function(){const src = $(this).attr('data-src'); $(this).attr('src', src)})

		setTimeout( () => {
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#registr").offset().top
			}, 2000, 'linear', () => {
				setTimeout(() => {
					$([document.documentElement, document.body]).animate({
						scrollTop: $("#registr").offset().top
					}, 400);
				}, 150)
			});
		}, 0);

}

window.addEventListener('load', function (event) {

	$('.js-mob-menu').click(function () {
		$('body').toggleClass('menu-opened')
		$('.header-top__menu').toggleClass('active');
		$('.burger-icon').toggleClass('active');
	})




	$('.anchor[data-href="/#registr"]').click(function () {
		$('.header-top__menu').removeClass('active');
		$('body').removeClass('menu-opened');
		window.animateToRegister();
	})

});



