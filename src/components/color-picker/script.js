window.addEventListener('load', function (event) {

	function ColorPicker(picker) {
		this.currentPicker = picker;
		this.init();
	}

	ColorPicker.prototype.init = function () {
		this.setCurrentColor();
		this.chooseColor();
		this.nextColor();
	}

	ColorPicker.prototype.setCurrentColor = function () {
		this.currentPicker.find('.casing-color').eq(0).addClass('active');
		const bigImg = this.currentPicker.find('.casing-color').eq(0).attr('data-img');
		this.currentPicker.find('.js-choosed-color').attr('src', bigImg);
	}

	ColorPicker.prototype.changeColor = function (img) {
		this.currentPicker.find('.js-choosed-color').attr('src', img).fadeOut(100);
		this.currentPicker.find('.js-choosed-color').on('load', function () {
			$(this).fadeIn(100);
		});
	}

	ColorPicker.prototype.chooseColor = function () {
		this.currentPicker.find('.casing-color').click((ev) => {
			this.currentPicker.find('.casing-color').removeClass('active');
			$(ev.currentTarget).addClass('active');
			const bigImg = $(ev.currentTarget).attr('data-img');
			this.changeColor(bigImg);
		})
	}

	ColorPicker.prototype.nextColor = function () {
		this.currentPicker.find('.js-color-picker-next').click(() => {
			let currentColor = 0;
			this.currentPicker.find('.casing-color').each(function (inxd) {
				if ($(this).hasClass('active')) currentColor = inxd + 1;
			})
			this.currentPicker.find('.casing-color').removeClass('active');
			if (currentColor === this.currentPicker.find('.casing-color').toArray().length) currentColor = 0;
			this.currentPicker.find('.casing-color').eq(currentColor).addClass('active');
			const bigImg = this.currentPicker.find('.casing-color').eq(currentColor).attr('data-img');
			this.changeColor(bigImg);
		})
	}

	$('.js-casing-picker').click(function () {

		const tab = $(this).attr('data-target');
		const colorPicker = $(`.js-casing-picker-body[data-target=${tab}] .color-picker`)

		if($(window).width() < 1200){
			$('.js-modal-body-color-picker').html('');
			const colorPickerClone = colorPicker.clone();
			$('.js-modal-body-color-picker').append([colorPickerClone]);
			new LazyLoad({
				elements_selector: ".js-modal-body-color-picker .lazy-img",
			});
			$('.casing-picker-modal').modal();
			return;
		}

		if (!$(this).hasClass('active')) {
			$('.js-casing-picker').removeClass('active');
		}
		$(this).toggleClass('active');


		$('.js-casing-picker-body .color-picker').css(
			{
				'display': 'none',
			}
		)

		colorPicker.css({
			'display': 'flex',
		}).find('.js-color-picker');


		if (!colorPicker.hasClass('inited')) {
			colorPicker.addClass('inited');
			new ColorPicker(colorPicker);
		}
	})

	$('.color-picker__choose').click(function () {
		$('.js-casing-picker').removeClass('active');
		$('.js-casing-picker-body .color-picker').css(
			{
				'display': 'none',
			}
		)
	})

	$(".casing-picker-modal").on('shown.bs.modal', function () {
		const colorPicker = $(`.js-color-picker`)
			colorPicker.addClass('inited');
			new ColorPicker(colorPicker);
	});

})