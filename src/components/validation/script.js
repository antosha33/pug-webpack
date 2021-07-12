window.addEventListener('load', function (event) {



	$('.js-show-pass').each(function(){
		let isShown = false 
		$(this).click(function(){
			$(this).closest('.form-group').find('input').attr('type', !isShown ? 'text' : 'password');
			isShown = !isShown;
		})
	})

	const checkPattern = (value) => {

		const bvPart1 = 'Пароль должен быть не менее 10 символов длиной.';
		const bvPart2 = 'Пароль должен содержать латинские символы верхнего регистра (A-Z).';
		const bvPart3 = `Пароль должен содержать знаки пунктуации (,.<>/?;:'"[]{}|~!@#$%^&*()_+=-).`;
		const bvPart4 = 'Пароль должен содержать латинские символы нижнего регистра (a-z).';
		const bvMessage = [];

		if (value.length < 10){
			bvMessage.push(bvPart1)
		}

		const regex = new RegExp('(?=.*[A-Z])', 'g');

		if (!value.match(regex)) {
			bvMessage.push(bvPart2);
		}

		const regex2 = new RegExp('(?=.*(,|\\.|<|>|\\/|\\?|;|:|"|\\[|\\]|\\{|\}|\\|\\||~|\\!|@|#|\\$|%|\\^|&|\\*|\\(|\\)|_|\\+|=|-))', 'g');

		if (!value.match(regex2)) {
			bvMessage.push(bvPart3);
		}

		const regex3 = new RegExp('(?=.*[a-z])', 'g');

		if (!value.match(regex3)) {
			bvMessage.push(bvPart4);
		}

		$('input[data-password="password"]').closest('.form-group').find('.help-block[data-bv-validator="callback"]').text(bvMessage.join(''));

		return bvMessage;
	}


	var validation = function () {

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


					if ($this.find('input[data-password="password"]').length) {
						$this.find('input[data-password="password"]').on('input', function () {

							if (!checkPattern($(this).val()).length) {
								$this.data('bootstrapValidator').updateStatus($this.find('input[data-password="password"]'), 'VALID', null);
							} else {
								setTimeout(() => {
									$this.data('bootstrapValidator').updateStatus($this.find('input[data-password="password"]'), 'INVALID', null);
								}, 10)
							}
						})
					}
					
					if ($this.find('input[data-password="password-identical"]').length) {
						$this.find('input[data-password="password-identical"]').on('input', function () {
							if ($this.find('input[data-password="password"]').val() == $this.find('input[data-password="password-identical"]').val()) {
								$this.data('bootstrapValidator').updateStatus($this.find('input[data-password="password-identical"]'), 'VALID', null);
							} else {
								setTimeout(() => {
									$this.data('bootstrapValidator').updateStatus($this.find('input[data-password="password-identical"]'), 'INVALID', null);
								}, 10)
							}
						})
					}

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
				$.getScript('/local/templates/html/js/vendor/bootstrapValidator.min.js', BVInit);
			}
		}

		// загрузка(по необходимости) и инит маски телефона
		function loaderInputmask() {

			if ($('input[type="tel"]').inputmask) {
				inputmaskInit()
			} else {
				loadedFlag.inputmask = false;
				$.getScript('/local/templates/html/js/vendor/jquery.inputmask.min.js', inputmaskInit);
			}
		}


		$(document).on('mouseover touchstart touchend', '.bv-form', function () {
			if (loadedFlag.BV && loadedFlag.inputmask) {
				loaderBV();
				loaderInputmask();

			}
		})
	};
	validation();


});


