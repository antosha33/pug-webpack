window.addEventListener('load', function (event) {
	$('.js-casing-title').click(function(){
		$(this).closest('.js-casing-item').toggleClass('active');
	})

	$('.js-casing-tabs').click(function(ev){
		let tabIndex = null;
		$(this).find('.casing-tabs__item').removeClass('active');
		const currentTab = ev.target;
		$(currentTab).addClass('active');
		const tabs = $(this).find('.casing-tabs__item').toArray();
		tabs.forEach((tab, ind) => {
			if(tab === currentTab) tabIndex = ind;
		})
		$(this).closest('.casing__content').find('.js-casing-tab').fadeOut(0);
		$($(this).closest('.casing__content').find('.js-casing-tab').toArray()[tabIndex]).fadeIn(0);
	})
});

