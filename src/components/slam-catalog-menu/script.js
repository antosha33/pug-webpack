window.addEventListener('load', function () {

	let pageX = 0;
	let currentItem = null;


	function throttle(func, ms) {

		let isThrottled = false,
			savedArgs,
			savedThis;

		function wrapper() {


			if (isThrottled) { // (2)
				savedArgs = arguments;
				savedThis = this;
				return;
			}

			func.apply(this, arguments); // (1)

			isThrottled = true;

			setTimeout(function () {
				isThrottled = false; // (3)
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = savedThis = null;
				}
			}, ms);
		}

		return wrapper;
	}

	const mouseenterHandler = function () {
		const img = new Image;
		img.src = $(this).attr('data-img');
		img.onload = () => {
			// $('.catalog-menu-banner').fadeOut(200);
			$('.catalog-menu-banner').html('');
			$('.catalog-menu-banner').append(img);
			// $('.catalog-menu-banner').fadeIn(200);
		}
	}

	$(document).on('mouseenter', '.nav-lvl2-item', throttle(mouseenterHandler, 300))

	const hoverHanler = (el) => {
		console.log(el);
		// $('.js-slam-menu .nav-item .catalog-menu-banner').fadeOut(100);
		// el.find('.catalog-menu-banner').fadeIn(100);
		$('.js-slam-menu .nav-item').removeClass('active');
		el.addClass('active');
	}


	$(document).on('mousemove', '.js-slam-menu .nav-list', function (ev) {
		if (pageX == 0) {
			currentItem = $(ev.target).closest('.nav-item');
			pageX = ev.pageX;
		}
		setTimeout(() => {
			pageX = ev.pageX;
		}, 100)
		if (ev.pageX > pageX + 10) {
			return;
		} else {
			if (currentItem[0] == $(ev.target).closest('.nav-item')[0]) return;
			if (!$(ev.target).hasClass('nav-item')) return;
			hoverHanler($(ev.target).closest('.nav-item'));
			currentItem = $(ev.target).closest('.nav-item');
		}
	})

	if ($(window).width() <= 1366) {
		document.addEventListener('touchstart', function (ev) {
			if ($(ev.target).closest('.js-slam-menu .nav-item.has-nav').length != 0) {
				if ($(ev.target).closest('.js-slam-menu .nav-item').hasClass('touch-ev')) {
					return;
				}
				$('.slam-menu .nav-item').removeClass('active');
				$('.slam-menu .nav-item').removeClass('touch-ev');
				$(ev.target).closest('.js-slam-menu .nav-item').addClass('active');
				$(ev.target).closest('.js-slam-menu .nav-item').addClass('touch-ev');
				ev.stopPropagation();
				ev.preventDefault();
			}
		}, { passive: false });
	}

	let isSlamCatalogMenuOpened = false;
	$('.js-catalog-main-menu').click(function () {
		if (!isSlamCatalogMenuOpened) {
			$(this).addClass('active');
			$(this).closest('.header-main-menu').find('.js-slam-menu-wrap').addClass('active');
			$(this).closest('.header-menu-wrap').addClass('active');
			isSlamCatalogMenuOpened = true;
		} else {
			$(this).removeClass('active');
			$(this).closest('.header-main-menu').find('.js-slam-menu-wrap').removeClass('active');
			$(this).closest('.header-menu-wrap').removeClass('active');
			isSlamCatalogMenuOpened = false;
		}

	})
	$('body').click(function (ev) {
		if ($(ev.target).closest('.js-catalog-main-menu').length != 0) return;
		if ($(ev.target).closest('.js-slam-menu-wrap').length <= 0) {
			$('.js-catalog-main-menu').removeClass('active');
			$('.js-slam-menu-wrap').removeClass('active');
			isSlamCatalogMenuOpened = false;
		}
	})
})
