$(document).ready(function () {
	const vigetWrap = $('.pages-viget');
	const vigetBtn = $('.pages-viget__btn');

	vigetBtn.on('click', function() {
		vigetWrap.toggleClass('open');
	});

	$(document).on('click', function(e) {
		if (!$(e.target).closest(vigetWrap).length) {
			vigetWrap.removeClass('open');
		}
		e.stopPropagation();
	});
});