window.addEventListener( 'load', function( event ) {
	var validation= function () {

		let loadedFlag = {
			BV: true,
			inputmask: true
		};

		function BVInit() {
			$('.bv-form:not(.bv-form-initialized)')
				.on('init.form.bv', function (e) {
					let $this = $(this);
					$this.addClass('bv-form-initialized');
					loadedFlag.BV = true;
				})
				.bootstrapValidator({
					feedbackIcons: {
						valid: 'bv-icon-ok',
						invalid: 'bv-icon-not',
						validating: 'bv-icon-refresh'
					},
				});
		}

		function inputmaskInit() {
			$('input[type="tel"]:not(.inputmask-initialized)').inputmask({
				mask: "+375 (99) 999-99-99",
				clearMaskOnLostFocus: false
			}).addClass('inputmask-initialized');
			$('.js-form-control--data:not(.inputmask-initialized)').inputmask({
				mask: "99.99.9999"
			}).addClass('inputmask-initialized');
			loadedFlag.inputmask = true;
		}

		// загрузка(по необходимости) и инит валидатора
		function loaderBV() {
			if ($('.bv-form').bootstrapValidator) {
				BVInit()
			} else {
				loadedFlag.BV = false;
				$.getScript('./js/vendor/bootstrapValidator.min.js', BVInit);
			}
		}

		// загрузка(по необходимости) и инит маски телефона
		function loaderInputmask() {

			if ($('input[type="tel"]').inputmask) {
				inputmaskInit()
			} else {
				loadedFlag.inputmask = false;
				$.getScript('./js/vendor/jquery.inputmask.min.js', inputmaskInit);
			}
		}


		$(document).on('mouseover touchstart touchend', '.bv-form', function () {
			if (loadedFlag.BV && loadedFlag.inputmask) {
				loaderBV();
				loaderInputmask();
			}
		})
	};
	validation()
});
