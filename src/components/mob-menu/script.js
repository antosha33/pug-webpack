window.addEventListener('load', function (event) {
	$(document).on('click', '.nav--mobile .nav-link', function () {
		$(this).toggleClass('opened');
		$(this).next().toggleClass('opened');
	})
	$(document).on('click', '.nav--mobile .nav-lvl2-link', function () {
		console.log($(this).closest('.nav-lvl2-item').find('.nav-lvl3-item').toArray().length);
		if($(this).closest('.nav-lvl2-item').find('.nav-lvl3-item').toArray().length > 7){
			$(this).closest('.nav-lvl2-item').find('.show-more').css({'display': 'flex'});
			$(this).closest('.nav-lvl2-item').find('.show-more').click(function(){
				$(this).closest('.nav-lvl2-item').find('.nav-lvl3-list').addClass('show-all');
				$(this).remove();
			})
		}
		$(this).toggleClass('opened');
		$(this).next().toggleClass('opened');
	})
});
