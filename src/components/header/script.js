window.addEventListener('load', function (event) {

	setTimeout(() => {
		$('.header').css({
			'position': 'sticky'
		})
	}, 100)

	$('.js-mobile-menu-trigger').click(function () {
		$(this).closest('.header').find('.mob-menu').toggleClass('active');
	})
	$('.header-main__search').click(function () {
		$(this).addClass('active');
	})
	let scrollTop = $(window).scrollTop();
	let timeout = null
	$(window).scroll(function () {
		if (timeout) clearTimeout(timeout);
		if ($(window).scrollTop() > scrollTop + 75) {
			$('.header').addClass('sticky');
			scrollTop = $(window).scrollTop();
		}

		if ($(window).scrollTop() < scrollTop - 70) {
			setTimeout(() => {
				scrollTop = $(window).scrollTop();
			}, 300)

			$('.header').removeClass('sticky');
		}
		if ($('body').hasClass('main-page')) {
			if ($(window).scrollTop() <= 0) {
				$('.header-bottom').css({
					'border-bottom': '1px solid transparent'
				})
			} else {

				$('.header-bottom').css({
					'border-bottom': '1px solid #000'
				})
			}
		}
	})
});


window.addEventListener('load', function (event) {


	const inputsfile = Array.from(document.querySelectorAll('.input__file'));

	console.log(inputsfile);
	if (inputsfile.length) {
		inputsfile.forEach((input) => {

			const $bxInputWrap = $(input).closest('.webform-field-upload')
			$bxInputWrap
				.find('.webform-small-button')
				.text('Прикрепить файл')
				.addClass(['input__file-button', 'empty'])
				.removeClass(['btn', 'btn-primary', 'webform-small-button', 'webform-button-upload']);

			const $fileInput = $bxInputWrap.closest('.file-input')
			$fileInput.addClass('file-input--mod');
			$fileInput.find('.webform-field-upload-list').addClass('webform-field-upload-list--mod');

			const extArray = [];

			const addExt = () => {
				$fileInput.find('ol li').each(function(index){
					$(this).prepend(extArray[index]);
				})
			}

			function handler() {
				let count = 0;
				$fileInput.find('ol li').addClass('choosen-file__item');
				
				if (this.files.length) {
					for (key in this.files) {

						if (this.files[key].name && key !== 'item') {
							const ext = this.files[key].name.match(/\..{3}$/g)[0].split('.').join('');
							const newIconDiv = document.createElement('span');
							$(newIconDiv).addClass('ext-icon');
							const newImg = new Image();
							newImg.src = `/local/templates/html/images/i-${ext}.svg`;
							newIconDiv.append(newImg)
							extArray.push(newIconDiv);
						}

					}
					$bxInputWrap.find('.webform-small-button').text('Добавить ещё файл +')
				};

				setTimeout(() => {
					addExt();
					$('.input__file').each(function(){
						$(this)[0].addEventListener('change', handler);
					})
				}, 1000)


			}



			input.addEventListener('change', handler)
		})
	}


})