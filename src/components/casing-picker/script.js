window.addEventListener('load', function (event) {

	// window.vendorLoader({
	// 	name: 'waypoint',
	// 	path: 'js/vendor/noframework.waypoints.min.js',
	// 	event: {
	// 		scroll: 'true',
	// 	},
	// 	callback: function () {
	// 		// initWaypoint();
	// 	}
	// });

	$('.casing-picker__casing').click(function(){
		$(this).toggleClass('active');
	})
})