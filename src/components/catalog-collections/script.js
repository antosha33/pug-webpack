
window.addEventListener('load', function (event) {


	function initOffers() {
		var offers = {

			buildMap: function buildMap() {
				var map = [];
				var row = 0;
				var col = 0;

				if (!(window.innerWidth > offers.screen_xs_max)) {
					return false;
				}

				this.items.each(function (index) {
					var self = $(this);
					if (!self.hasClass(offers.classDisableItem)) {

						var _checking = function _checking() {
							if (col === offers.cols) {
								col = 0;
								row++;
							}
							// добавляем строку если нету
							if (map[row] === undefined) {
									map[row] = [];
							}
							// проверяем текущую позицию, если она занята, то идем дальше
							if (map[row][col] !== undefined) {
								col++;
								_checking();
							}
						};
						_checking();

						if (self.hasClass(offers.classHeightItem)) {

							var _positionY = function _positionY(r, c) {
								var botRow = r + 1;
								if (map[botRow] === undefined) {
									map[botRow] = [];
								}
								if (c === offers.cols) {
									_positionY(botRow, 0);
								} else if (map[botRow][c] !== undefined || map[r][c] !== undefined) {
									_positionY(r, c + 1);
								} else {
									map[r][c] = self;
									//map[r][c] = 'T' + index;
									map[botRow][c] = 'B' + index;
								}
							};
							_positionY(row, col);
						} else if (self.hasClass(offers.classWidthItem)) {

							var _positionX = function _positionX(r, c) {

								var nextCol = c + 1;
								if (map[r] === undefined) {
									map[r] = [];
								}
								if (c === offers.cols || nextCol === offers.cols) {
									_positionX(r + 1, 0);
								} else if (map[r][c] !== undefined || map[r][nextCol] !== undefined) {
									_positionX(r, nextCol);
								} else {
									map[r][c] = self;
									//map[r][c] = 'L' + index;
									map[r][nextCol] = 'R' + index;
								}
							};
							_positionX(row, col);
						} else {
							map[row][col] = self;
							//map[row][col] = 'X' + index;
						}
					}
				});
				offers.map = map;
			},

			renderingMap: function renderingMap() {
				if (offers.map === undefined) {
					return false;
				}

				// добавить класс инициализации элементам
				offers.items.addClass(offers.classInitItem);

				if (window.innerWidth > offers.screen_xs_max) {
					// высота родительского блока
					offers.list.css('height', offers.itemHeight * offers.map.length - (offers.map.length - 1));

					// позиционирование элементов
					for (var _top = 0; _top < offers.map.length; _top++) {
						for (var _left = 0; _left < offers.map[_top].length; _left++) {
							var item = $(offers.map[_top][_left]);
							if (item.length) {
								item.css({
									'top': _top > 0 ? _top * offers.itemHeight - _top : _top * offers.itemHeight,
									'left': _left > 0 ? _left * (offers.list.outerWidth() / offers.cols) - _left : _left * (offers.list.outerWidth() / offers.cols)
								});
							}
						}
					}
				} else {
					// высота родительского блока
					offers.list.css('height', '');
					// позиционирование элементов
					this.items.css({
						'top': '',
						'left': ''
					});
				}
			},

			setCols: function setCols() {
				this.cols = 2;
				if (window.innerWidth >= 1200) {
					this.cols = 4;
				} else if (window.innerWidth >= 1024) {
					this.cols = 3;
				} else if (window.innerWidth >= 768) {
					this.cols = 2;
				}
			},

			initFilter: function initFilter() {
				var items = offers.filterBlock.find('.f-item');
				if (items.length) {
					items.each(function () {
						var self = $(this);
						var classSearch = self.data('type');
						var countBlock = self.find('.count');

						// записать колличество в фильтр
						if (classSearch) {
							var searchItems = offers.list.find('.' + classSearch);
							if (searchItems.length) {

								if (countBlock.length) {
									countBlock.html(searchItems.length);
								}

								self.on('click', function (e) {
									e.preventDefault();
									window.location.hash = classSearch;
									if (self.hasClass('active')) {
										return false;
									}
									items.removeClass('active');
									self.addClass('active');
									offers.items.addClass(offers.classDisableItem);
									searchItems.removeClass(offers.classDisableItem);

									/*offers.list.find('.' + offers.classDisableItem).css({
												'top': offers.itemHeight,
												'left': '50%'
												});*/

									offers.buildMap();
									offers.renderingMap();
								});
							} else if (!searchItems.length && classSearch === 'all') {

								self.on('click', function (e) {
									e.preventDefault();
									window.location.hash = classSearch;
									if (self.hasClass('active')) {
										return false;
									}
									items.removeClass('active');
									self.addClass('active');
									offers.items.removeClass(offers.classDisableItem);
									offers.buildMap();
									offers.renderingMap();
								});
							} else if (!searchItems.length && classSearch !== 'all') {
								self.hide();
							}
						} else {
							self.hide();
						}
					});
				}
			},

			init: function init() {
				// this.offers = $('.catalog-collections').not('.simple');
				// this.filterBlock = this.offers.find('.filter');
				this.list = $('.catalog-collections');
				this.items = this.list.find('.catalog-collections__item-wrap');
				// if (!this.filterBlock.length || !this.items.length) {
				// 	return false;
				// }
				offers.screen_xs_max = 0; // минимальная ширина позиционирования блоков
				offers.itemHeight = $(window).width() < 768 ? 200 : 437; // высота элемента
				offers.classInitItem = 'sort-on'; // класс инициализации для элемнтов
				offers.classDisableItem = 'disable'; // класс для неактивного элемента
				offers.classWidthItem = 'width-2'; // класс для элемента с двойной шириной
				offers.classHeightItem = 'height-2'; // класс для элемента с двойной высотой

				// offers.initFilter();


				offers.setCols();
				offers.buildMap();
				offers.renderingMap();
				// this.offers.removeClass('not-init');

				$(window).on('resize', function () {
					$(window).width() < 768 ? offers.itemHeight = 200 : offers.itemHeight = 437;
					offers.setCols();
					offers.buildMap();
					offers.renderingMap();
				});
			}
		};

		// call functions
		offers.init();
	}

	initOffers();
})