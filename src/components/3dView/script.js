window.addEventListener('load', function (event) {


	let listeners = [];


	window.threeDViewInit = function () {

		if (listeners.length) {
			listeners.forEach(item => item());
			listeners = [];
		}

		const imageLoadPromises = [];

				if (!window.preloadDevices && $(window).width() > 1023) {
					window.preloadDevices = {
						white: [],
						black: [],
						pearl: [],
					}
					for (let i = 0; i < 37; i++) {
						if (i < 10) i = '0' + i;
						const promWhite = new Promise ( (resolve, reject) => {
							const white = new Image();
							white.src = `/local/templates/html/images/white-glo/white_device__enamel_white_heater_panel_${i}.png`;
							window.preloadDevices.white.push(white);
							white.onload = () => resolve();
						})
						
						imageLoadPromises.push(promWhite);

						const  promBlack = new Promise ( (resolve, reject) => {
							const black = new Image();
							black.src = `/local/templates/html/images/black-glo/black_device__ebony_black_heater_panel_${i}.png`,
							window.preloadDevices.black.push(black);
							black.onload = () => resolve();
						})

						imageLoadPromises.push(promBlack);
					
						if (i < 35) {
							const promPearl =  new Promise ( (resolve, reject) => {
								const pearl = new Image();
								pearl.src = `/local/templates/html/images/pearl-glo/white_device__pearl_white_heater_panel_${i}.png`,
								window.preloadDevices.pearl.push(pearl);
								pearl.onload = () => resolve();
							})
							imageLoadPromises.push(promPearl);
						}
					}
					console.log()
				}






		$('.js-3d-view').each(function () {

			(async () => {
				await Promise.all(imageLoadPromises);
				const initialFrame = $(this).attr('data-initial-frame');
				const deviceType = $(this).attr('data-device-type');
				const frameCount = deviceType === 'pearl' ? 35 : 37;
				const chunk = $('.js-3d-view').outerWidth() / frameCount;
				const imageWrapper = $(this).find('.product-card__image .product-card__image-img');

				function moveHandler(ev) {

					const dbounce = (func, timeout) => {
						let cooldown = false;
						return function () {
							if (!cooldown) {
								cooldown = true
								func();
								setTimeout(() => {
									cooldown = false
								}, timeout)
							}
						}
					}

					const currentFrame = (Math.round((ev.clientX - $(this).offset().left) / chunk) + +initialFrame) % frameCount;

					const whiteDbounce = dbounce(() => {
						imageWrapper.append(window.preloadDevices.white[currentFrame])
					}, 500)
					const blackDbounce = dbounce(() => imageWrapper.append(window.preloadDevices.black[currentFrame]), 500)
					const pearlDbounce = dbounce(() => imageWrapper.append(window.preloadDevices.pearl[currentFrame]), 500)


					// if (currentFrame == 0 || currentFrame == frameCount) return
					imageWrapper.html('');
					if (deviceType === 'white') {
						whiteDbounce();
						return;
					}
					if (deviceType === 'black') {
						blackDbounce();
						return;
					}
					if (deviceType === 'pearl') {
						pearlDbounce();
						return;
					}
				}
				$(this)[0].addEventListener('mousemove', moveHandler);

				listeners.push(() => {
					$(this)[0].removeEventListener('mousemove', moveHandler)
				})
			})();
		})


	}


	window.oneevent({
		name: '3dViewInit',
		event: {
			scroll: true,
			timeout: true,
			timeout: {
				delay: 3000,
			}
		},
		callback: () => {
			if ($(window).width() < 1024) return;
			window.threeDViewInit();
		}
	})



});
