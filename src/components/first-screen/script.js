


window.addEventListener('load', function (event) {

	//get coockie

	let resolve_age = 0;

	document.cookie.split(';').forEach(item => {
		if (item.includes('resolve_age=1')) {
			resolve_age = 1;
		}
	})

	if ($('body').hasClass('browser-safari')) {
		$('.first-screen-product').addClass('first-screen-product--no-backdrop');
	}


	window.preloadDevices = {
		white: [],
		black: [],
		pearl: [],
	}

	const animateDevice = {
		init: async function (fps) {
			return new Promise((resolve, reject) => {
				this.fps = fps
				for (let i = 0; i < 37; i++) {
					const white = new Image();
					const black = new Image();
					const pearl =  new Image();
					if (i < 10) i = '0' + i;
					white.src = `/local/templates/html/images/white-glo/white_device__enamel_white_heater_panel_${i}.png`,
					black.src = `/local/templates/html/images/black-glo/black_device__ebony_black_heater_panel_${i}.png`,
					pearl.src = `/local/templates/html/images/pearl-glo/white_device__pearl_white_heater_panel_${i}.png`,
					window.preloadDevices.white.push(white);
					window.preloadDevices.black.push(black);
					window.preloadDevices.pearl.push(pearl);
					if (i == 36) {
						white.onload = function () {
							resolve();
						}
					}
				}
			})
		},
		buildCanvas: function (name, selector, width, height) {
			this[name] = document.querySelector(selector).getContext('2d');
			this[name].canvas.width = width;
			this[name].canvas.height = height;
		},
		draw: function (name, initialFrame, frameQuantity, device, then) {
			const ctxWhite = this['white'];
			const ctxBlack = this['black'];
			const drawDeviceWhite = window.preloadDevices['pearl'];
			const drawDeviceBlack = window.preloadDevices['black'];
			let fps = this.fps;
			let rotationQuantity = 1;
			$('.first-screen-devices').removeClass('animation');
			let debounce = 10;
			function drawStep() {
				if (initialFrame % 37 === 1) rotationQuantity += 1;
				if (rotationQuantity == 6) return;
				requestAnimationFrame(drawStep);
				let now = Date.now();
				let elapsed = now - then;
				if (elapsed > fps) {
					// Get ready for next frame by setting then=now, but also adjust for your
					// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
					then = now - (elapsed % fps);
					ctxWhite.clearRect(0, 0, 320, 753);
					ctxBlack.clearRect(0, 0, 320, 753);
					ctxWhite.drawImage(drawDeviceWhite[initialFrame % 37], 0, 0, 262, 641);
					ctxBlack.drawImage(drawDeviceBlack[initialFrame % 37], 0, 0, 262, 641);
					initialFrame = initialFrame + 1;
				}
				fps += 0.1;
			}
			drawStep();
		}
	}

	animateDevice.buildCanvas('white', 'canvas.first-screen-devices__white', 262, 641);
	animateDevice.buildCanvas('black', 'canvas.first-screen-devices__black', 262, 641);




	if ($(window).width() > 576) {
		(async function () {
			const date = Date.now();
			await animateDevice.init(1000 / 60);
			$('.popup__control').slideDown({
				start: function () {
					$(this).css({
						display: "flex"
					})
				},
				duration: 200
			});
			$('.popup__preloader').removeClass('preloader');
			if (resolve_age) {
				animateDevice.draw('white', 0, 37, 'white', Date.now());
				return;
			}
			$('.js-popup-resolve').click(function () {
				animateDevice.draw('white', 0, 37, 'white', Date.now());
				$('body').removeClass('menu-opened');
				$('.popup').css({
					'display': 'none'
				})
			})
		})()
	} else {
		$('.popup__control').slideDown({
			start: function () {
				$(this).css({
					display: "flex"
				})
			},
			duration: 200
		});
		$('.popup__preloader').removeClass('preloader');
		$('.js-popup-resolve').click(function () {
			$('body').removeClass('menu-opened');
			$('.popup').css({
				'display': 'none'
			})
		})
	}

	$('.js-show-devices').click(function () {
		$('html, body').animate({
			scrollTop: $(`.catalog-main__devices`).offset().top,
			easing: 'ease'
		}, 2000);
	})
})


window.animateFs = async () => {

	await animateDevice.init(1000 / 60);
	if ($(window).width() > 576) {
		animateDevice.draw('white', 0, 37, 'white', Date.now());
	}
}

