window.addEventListener('load', function (event) {
	$('.nav--footer .nav-link').click(function(){
		$(this).toggleClass('active');
		$(this).next().find('.nav-lvl2-list').toggleClass('active');
	})
})