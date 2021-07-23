window.addEventListener('load', function (event) {

	$('.header-main__search').click(function (event) {
		$(this).addClass('active');
	})
	$('.header-main__search .search__close').click(function (ev) {
		ev.stopPropagation();
		$('.header-main__search').removeClass('active');
	})
});