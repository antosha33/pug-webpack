window.addEventListener( 'load', function( event ) {
	window.reinit.tabInPage = function() {
		if($('.js-tab-wrap').length) {
			let parent = $('.js-tab-wrap');
			parent.each(function() {
				const _this = $(this),
					trigger = _this.find('.js-tab-trigger'),
					tabbody = _this.find('.js-tab-body'),
					tabcont = tabbody.find('.js-tab-body-item');
				
				if(_this.hasClass('js-tab-wrap')) {
					const triggerCur = _this.find(trigger).filter('.active'),
						triggerIndex = triggerCur.index();
					if(!triggerCur.length) {
						tabcont.not(':first').hide();
						tabcont.first().addClass('active');
						trigger.first().addClass('active');
					}else{
						tabcont.hide().eq(triggerIndex).show().addClass('active');
					}
				} else {
					tabcont.hide();
				}
				
				trigger.on('click',function(e) {
					let _ = $(this);
					e.preventDefault();
					if(!_.hasClass('active')) {
						_.addClass('active').siblings().removeClass('active');
						let triggerA = parent.find(trigger).filter('.active');
						tabcont.hide().removeClass('active').eq($(triggerA).index()).fadeIn().addClass('active');
					} 
				});
			});
		}
	}

	window.reinit.tabInPage()
});