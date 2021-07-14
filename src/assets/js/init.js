const uiInits = {

	init: function () {
		!window.reinit && (window.reinit = {});
		!window.reinit.slider && (window.reinit.slider = {});
		// this.svgPolifill();
		this.browserCheck();
		this.vendorLoader();
		this.slider();
		this.oneevent();
		this.transition();
	},
	transition: function () {
		window.addEventListener('load', function (event) {
			$('body').removeClass('no-transition');
		})
	},
	oneevent: function () {

		/*
			window.oneevent({
				name: '__NAME__',
				event: {
					scroll: true,
					click: true,
					timeout: {
						delay: 1
					},
					mouseover: {
						trigger: '__SELECTOR__'
					}
				},
				callback: __CALLBACK__
			});
		*/

		window.oneevent = function (args = {}) {
			if (!args.name) {
				console.warn('vendorLoader: You must pass the name!');
				return;
			}
			// console.log(args.name)
			!window.vendor && (window.vendor = {});
			window.vendor[args.name] = {};
			window.vendor[args.name].enter = {};
			window.vendor[args.name].enter.timeout;
			window.vendor[args.name].enter.status = false;
			window.vendor[args.name].enter.operator = function () {

				if (!window.vendor[args.name].enter.status) {
					window.vendor[args.name].enter.status = true;
					clearTimeout(window.vendor[args.name].enter.timeout);
					$(document).off('scroll.vendor-' + args.name);
					$(document).off('click.vendor-' + args.name);
					$(document).off('mouseover.vendor-' + args.name);
					args.callback && args.callback()
				}
			};
			if (args.event.scroll) {
				$(document).on('scroll.vendor-' + args.name, function () {
					window.vendor[args.name].enter.operator();
				});
				var doc = document.documentElement;
				var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
				top > 100 && window.vendor[args.name].enter.operator();
			}

			if (args.event.click) {
				$(document).on('click.vendor-' + args.name, function () {
					window.vendor[args.name].enter.operator();
				});
			}

			if (args.event.mouseover) {
				$(document).on('mouseover.vendor-' + args.name, args.event.mouseover.trigger, function () {
					window.vendor[args.name].enter.operator();
				});
			}

			if (args.event.timeout) {
				window.vendor[args.name].enter.timeout = setTimeout(function () {
					window.vendor[args.name].enter.operator();
				}, args.event.timeout.delay || 3000)
			}
		}

	},
	vendorLoader: function () {


		const vendorloadStatus = {};

		window.vendorLoadStatus = vendorloadStatus;

		window.vendorLoader = function (args = {}) {
			if (!args.name) {
				console.warn('vendorLoader: You must pass the name!');
				return;
			}
			if (!args.path) {
				console.warn('vendorLoader: You must pass the path!');
				return;
			}

			!window.vendor && (window.vendor = {});
			!window.SITE_TEMPLATE_PATH && (window.SITE_TEMPLATE_PATH = '/local/templates/html/');
			window.vendor[args.name] = {};
			window.vendor[args.name].load = {};
			window.vendor[args.name].load.timeout;
			if (!vendorloadStatus[args.name]) {
				vendorloadStatus[args.name] = {};
				vendorloadStatus[args.name].load = {};
				vendorloadStatus[args.name].load.timeout = {};
				vendorloadStatus[args.name].load.status = false
			}
			vendorloadStatus[args.name].load.loading = function () {
				if (!vendorloadStatus[args.name].load.status) {
					vendorloadStatus[args.name].load.status = true
					clearTimeout(vendorloadStatus[args.name].load.timeout);
					$(document).off('scroll.vendor-' + args.name);
					$(document).off('click.vendor-' + args.name);
					$(document).off('mouseover.vendor-' + args.name);
					$.getScript((!args.http ? window.SITE_TEMPLATE_PATH : '') + args.path, args.callback || function () { });
				}

			};

			if (args.event.scroll) {
				$(document).on('scroll.vendor-' + args.name, function () {
					vendorloadStatus[args.name].load.loading();
				});
			}

			if (args.event.click) {
				$(document).on('click.vendor-' + args.name, function () {
					vendorloadStatus[args.name].load.loading();
				});
			}

			if (args.event.mouseover) {
				$(document).on('mouseover.vendor-' + args.name, args.event.mouseover.trigger, function () {
					vendorloadStatus[args.name].load.loading();
				});
			}

			if (args.event.timeout) {
				vendorloadStatus[args.name].load.timeout = setTimeout(function () {
					vendorloadStatus[args.name].load.loading();
				}, args.timeout || 3000)
			}
		}
	},

	// slider: function () {
	// 	window.slam_slider = function (args) {
	// 		const $slider_wrap = $(args.el);
	// 		const slider = $slider_wrap.find('.js-swiper-slider');
	// 		const tab = $slider_wrap.closest('.tab-pane:not(.active)');
	// 		const data = {
	// 			media: $slider_wrap.attr('data-media'),
	// 		};
	// 		const slider_prev = $slider_wrap.find('.js-swiper-button-prev');
	// 		const slider_next = $slider_wrap.find('.js-swiper-button-next');
	// 		const slider_pagination = $slider_wrap.find('.js-swiper-pagination');
	// 		let sliderLength = $slider_wrap.find('.swiper-slide').length;
	// 		let swiper = {};
	// 		!args.args.navigation && (args.args.navigation = {});
	// 		args.args.navigation.nextEl = slider_next;
	// 		args.args.navigation.prevEl = slider_prev;
	// 		!args.args.pagination && (args.args.pagination = {});
	// 		args.args.pagination.el = slider_pagination;
	// 		args.args.pagination.type = 'bullets';
	// 		args.args.pagination.dynamicBullets = sliderLength > 5;
	// 		args.args.pagination.clickable = true;

	// 		let swiper_init = function() {
	// 			swiper = new Swiper(slider, args.args)
	// 				// .on('imgLazyLoaded', function () {
	// 				// 	setTimeout(function () {
	// 				// 		swiper.update();
	// 				// 	}, 3000);
	// 				// 	setTimeout(function () {
	// 				// 		swiper.update();
	// 				// 	}, 1000);
	// 				// })
	// 		}

	// 		const init = function () {
	// 			if (tab.length > 0) {
	// 				let tab_id = tab.attr('id');
	// 				$('[data-target="#'+tab_id+'"]').on('shown.bs.tab', function (e) {
	// 					swiper_init()
	// 				})
	// 			} else {
	// 				swiper_init()
	// 			}
	// 		};

	// 		const destroy = function () {
	// 			swiper.destroy && swiper.destroy();
	// 			new LazyLoad({
	// 				threshold: 0,
	// 			}, $slider_wrap.find('.swiper-lazy'));
	// 		};

	// 		if ($slider_wrap.attr('data-media')) {
	// 			let handler_media = function (state) {
	// 				if (state) {
	// 					init();
	// 				} else {
	// 					destroy()
	// 				}
	// 			};
	// 			window.check_media(data.media, handler_media)
	// 		} else {
	// 			init();
	// 		}
	// 		return swiper;
	// 	};

	// 	window.slam_slider_with_nav = function(args) {
	// 		const $slider_wrap = $(args.el);
	// 		console.log($(args.el))
	// 		console.log($slider_wrap)
	// 		const $slider_nav = $slider_wrap.find('.js-swiper-nav');
	// 		const $slider_main = $slider_wrap.find('.js-swiper-main');
	// 		let swiper_nav;
	// 		let swiper_main;
	// 		swiper_nav = $slider_nav.length > 0 && window.slam_slider({
	// 			el: $slider_nav,
	// 			args: args.args_nav
	// 		}).on('transitionEnd', function(e,slider) {
	// 			$slider_nav.find('.swiper-slide-thumb-active').length < 1 && $slider_nav.find('.swiper-slide-active').addClass('swiper-slide-thumb-active');
	// 		});

	// 		swiper_main = window.slam_slider({
	// 			el: $slider_main,
	// 			args: {
	// 				thumbs: {
	// 					swiper: swiper_nav
	// 				},
	// 				...args.args_main
	// 			}
	// 		});

	// 		return {main: swiper_main, nav: swiper_nav}
	// 	}
	// },
	slider: function () {

		window.slam_slider = function (args) {
			const $slider_wrap = $(args.el);
			const slider = $slider_wrap.find('.js-swiper-slider')[0];
			const data = {
				media: $slider_wrap.attr('data-media'),
			};
			const slider_prev = $slider_wrap.find('.js-swiper-button-prev');
			const slider_next = $slider_wrap.find('.js-swiper-button-next');
			const slider_pagination = $slider_wrap.find('.js-swiper-pagination');

			let swiper = {};
			!args.args.navigation && (args.args.navigation = {});
			!args.args.pagination && (args.args.pagination = {});
			// args.args.pagination.el = slider_pagination[0];
			// args.args.pagination.type = 'bullets';
			// args.args.pagination.dynamicBullets = true;
			// args.args.pagination.clickable = true;


			const init = function () {
				swiper = new Swiper(slider, args.args)
					.on('imgLazyLoaded', function () {
						setTimeout(function () {
							swiper.update();
						}, 300)
					});
				setTimeout(function () {
					swiper.update();
				}, 1000)
			};

			const destroy = function () {
				swiper.destroy && swiper.destroy();
				new LazyLoad({
					threshold: 0,
				}, $slider_wrap.find('.swiper-lazy'));
			};


			if ($slider_wrap.attr('data-media')) {
				let handler_media = function (state) {
					if (state) {
						init();
					} else {
						destroy()
					}
				};

				window.check_media(data.media, handler_media)

			} else {
				init();
			}

			return swiper;
		}

	},
	media: function () {
		window.check_media = function (media, callback) {
			const breakpoint = window.matchMedia(media);
			const breakpointChecker = function () {
				if (breakpoint.matches === true) {
					callback(true);
				} else if (breakpoint.matches === false) {
					callback(false)
				}
			};
			breakpoint.addListener(breakpointChecker);
			breakpointChecker();
		};
		window.media = function (mediaString) {
			return window.matchMedia(mediaString).matches
		};
	},
	svgPolifill: function () {
		// svg sprites
		svg4everybody && svg4everybody();
	},

	browserCheck: function () {
		// проверка браузера
		const userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") > -1) {
			// "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
			document.querySelector('body').classList.add('browser-mozzila');
		} else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
			//"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
			document.querySelector('body').classList.add('browser-opera');
		} else if (userAgent.indexOf("Trident") > -1) {
			// "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
			document.querySelector('body').classList.add('browser-ie');
		} else if (userAgent.indexOf("Edge") > -1) {
			// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
			document.querySelector('body').classList.add('browser-edge');
		} else if (userAgent.indexOf("Chrome") > -1) {
			// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
			document.querySelector('body').classList.add('browser-chrome');
		} else if (userAgent.indexOf("Safari") > -1) {
			// "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
			document.querySelector('body').classList.add('browser-safari');
		}
		// проверка на МАС платформу
		if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
			document.querySelector('body').classList.add('platform-mac');
		}
	},

};

export default uiInits
