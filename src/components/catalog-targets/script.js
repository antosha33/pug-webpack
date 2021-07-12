window.addEventListener( 'load', function( event ) {


	window.reinit.showMoreTargets = function() {
		const targetCatalog = $('.js-catalog-targets');
		const targetTrig = $('.js-target-trigger');
		targetTrig.on('click', function() {
			targetTrig.toggleClass('active');
			targetCatalog.toggleClass('active');
		});
	};

	window.reinit.showMoreTargets()
});