export default () => {
	window.addEventListener('load', () => {
		(function() {
	
			new LazyLoad({
				elements_selector: ".lazy-video",
				threshold: 0
			});
		})();
		
	})
	
}
