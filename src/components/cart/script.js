window.addEventListener('load', function (event) {
	$('.js-cart-form-section .tab-list__item').click(function () {
		const dataTarget = $(this).attr('data-target');
		$(this).closest('.js-cart-form-section').find('.cart-form-section__tab').fadeOut(0);
		$(this).closest('.js-cart-form-section').find(`.cart-form-section__tab[data-tab=${dataTarget}]`).fadeIn(0);
	})

	// var orderInfoWaypoibt = new Waypoint({
	// 	element: document.querySelector('.js-order-info-form'),
	// 	offset: `-${$('.js-order-info-form').height()}`,
	// 	handler: function (direction) {
	// 		if ($(window).width() >= 1200) return;
	// 		$('.js-order-info-form .order-info__button').toggleClass('fixed-button');
	// 	}
	// })

	$('.js-delivery-terminal').change(function () {
		if ($(this).val() != '') {
			$('.js-delivery-adress').attr('disabled', 'true');
			$('.js-delivery-adress').closest('.form-group').attr('disabled', 'true');
		} else {
			$('.js-delivery-adress').removeAttr('disabled');
			$('.js-delivery-adress').closest('.form-group').removeAttr('disabled', 'true');
		}
	})
	$('.js-delivery-adress').change(function () {
		if ($(this).val() != '') {
			$('.js-delivery-terminal').attr('disabled', 'true');
			$('.js-delivery-terminal').closest('.form-group').attr('disabled', 'true');
		} else {
			$('.js-delivery-terminal').removeAttr('disabled');
			$('.js-delivery-terminal').closest('.form-group').removeAttr('disabled', 'true');
		}
	})

	$('.js-equal-checkbox').change(function () {
		console.log($(this).is(":checked"));
		if ($(this).is(":checked")) {
			if ($('.js-payer-form-control').val()) {
				const value = $('.js-payer-form-control').val();
				$('.js-recipient-form-control').val(value);
				$('.js-recipient-form-control').attr('disabled', 'true');
				$('.js-recipient-form-control').closest('.form-group').attr('disabled', 'true');
			}
		} else {
			$('.js-recipient-form-control').val('');
			$('.js-recipient-form-control').removeAttr('disabled', 'true');
			$('.js-recipient-form-control').closest('.form-group').removeAttr('disabled', 'true');
		}

	})


	let timeout = null;

	$('.js-to-order-info').click(function () {
		$([document.documentElement, document.body]).animate({
			scrollTop: $('.js-sticky-order-info').offset().top - $('.header').height() - 20
		}, 1000);
		setTimeout(() => {
			$('.js-to-order-info').css({
				'display': 'none'
			})
		}, 1100)
	})

	$(window).scroll(function () {
		if($(window).width() < 1200)
		$('.js-to-order-info').css({
			'display': 'block'
		})
	})
})