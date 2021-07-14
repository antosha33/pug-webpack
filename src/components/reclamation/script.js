window.addEventListener('load', function (event) {

	$('.js-reclamation-tabs .tab-list__item').click(function(){
		const dataTarget = $(this).attr('data-target');
		$('.js-reclamation-tabs .reclamation-tab').fadeOut(0);
		$('.js-reclamation-tabs').find(`[data-tab=${dataTarget}]`).fadeIn(0);
	})
})