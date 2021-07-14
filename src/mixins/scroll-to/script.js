(function () {
	$(document).on('click', '.js-scroll-to', function () {
		let $this = $(this);
		let target_selector = $this.attr('data-target') || $this.attr('href');
		let $this_target = $(target_selector);
		let $this_offset = $this.attr('data-offset') || 0;

		if(target_selector === '#js-brand-prods' || '#js-brand-order') {
			$this.closest('div').css('display', 'none');
		}
		$('html, body').animate({
			scrollTop: $this_target.offset().top - $this_offset
		}, 500);
	})
})();
