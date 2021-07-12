"use strict";

(function (w) {
  if (w.$) {
    w.slamFilterJsInit = function () {};
    return;
  }
  var _funcs = [];
  w.$ = function (f) {
    // add functions to a queue
    _funcs.push(f);
  };
  w.slamFilterJsInit = function () {
    // move the queue to jQuery's DOMReady
    while (f = _funcs.shift()) {
      f();
    }
  };
})(window);


$(function () {
  $.slamInherit = function (name, base, prototype) {
    if (!prototype) {
      prototype = base;
      base = $.SlamSmartFilter;
    }

    $[name] = function (wrapper, settings) {
      if (arguments.length) {
        this.init(wrapper, settings);
      }
    };

    var basePrototype = new base();
    basePrototype.options = $.extend({}, basePrototype.options);
    $[name].prototype = $.extend(true, basePrototype, {
      name: name
    }, prototype);

    $.fn[name] = function (options) {
      var filters = [];
      $(this).each(function () {
        var filter = new $[name](this, options);
        filters[filters.length] = filter;
      });
      return filters;
    };
  };

  $.SlamSmartFilter = function (wrapper, options) {
    if (arguments.length) {
      this.init(wrapper, options);
    }
  };

  $.SlamSmartFilter.prototype = {
    options: {
      ajaxURL: false,
      align: 'LEFT',
      modeftimeout: 0,
      urlDelete: false,
      callbacks: {
        init: false
      }
    },
    init: function init(wrapper, options) {
      this.wrapper = $(wrapper);
      this.options = $.extend(this.options, options);
      this.form = $('form', this.wrapper);
      this.timer = null;
      this.hint = null; // Кнопка 'еще' https://tppr.me/FGlGv

      this.initMore(); // Инит ренж инпута

      this.initRanges(); // Инит коллапса блоков фильтра

      this.initToggleProperties(); // Инит селектов

      this.initChoice(); // Инит обработчиков чекбоксов/селектов и тд

      this.initForm();

      if (typeof this.options.callbacks.init == 'function') {
        this.options.callbacks.init.call(this.wrapper, this.options);
      }
    },
    initMore: function initMore() {
      var _this = this,
          btn_more_template = '<a class="filter-more more" href="#"><span>Показать все</span><div class="more__btn"></div></a>',
          btn_more_class = 'filter-more',
          hide_class = 'form-group--hidden',
          root_class = 'sidebar-filter__item'; // Клик на кнопку 'еще'


      $(document).off('click', '.' + btn_more_class).on('click', '.' + btn_more_class, function (e) {
        e.preventDefault();
        var self = $(this);
        var text = self.find('span');

        if (self.hasClass('active') === true) {
          self.siblings('.' + hide_class).hide();
          self.siblings('.' + hide_class).removeClass('focus-in');
          text.text('Показать все');
          self.removeClass('active');
          $('html, body').animate({
            scrollTop: self.parents('.' + root_class).offset().top - 100
          });
        } else {
          self.siblings('.' + hide_class).show();
          self.siblings('.' + hide_class).addClass('focus-in');
          text.text('Скрыть');
          self.addClass('active');
        }
      }); // Проходим по всем блокам фильтра

      $('.init-more').each(function () {
        var $this = $(this),
            items = $this.find('.form-group'),
            show = 4;
        var maxLength = 4;

        if ($this.data('max-item') !== undefined && $this.data('max-item') > 0) {
          maxLength = $this.data('max-item');
          show = $this.data('max-item');
        } // Получаем в visible_items не скрытые контролы фильтра


        var visible_items = items.map(function callback(currentValue) {
          if (!items[currentValue].children[0].classList.contains('ajaxfilter-disabled')) {
            return items[currentValue];
          }
        });

        if (visible_items.length > maxLength) {
          // Если не скрытых контролов больше 4:
          // - добавляем класс 'init-more-with-btn' если нету
          if (!$this.hasClass('init-more-with-btn')) {
            $this.append(btn_more_template);
            $this.addClass('init-more-with-btn');
          } // - отображаем блок фильтра


          $this.parents('.' + root_class).show();
        } else if (visible_items.length == 0) {
          // Если не скрытых контролов нет(все контролы в блоке скрыты):
          // - скрываем блок фильтра

          /* Закоментировть следующий блок, для отключения скртыия элементов фильтра*/
          $this.parents('.' + root_class).hide();
        } else {
          // Если не скрытых контролов от 1 до 3
          // - убираем кнопку 'еще'
          $this.find('.' + btn_more_class).remove(); // - отображаем скрытые контролы

          visible_items.removeClass(hide_class); // - удаляем класс 'init-more-with-btn'

          $this.removeClass('init-more-with-btn'); // - отображаем блок фильтра

          $this.parents('.' + root_class).show();
        }

        if (visible_items.length == 1) {
          // Если не скрытый контрол 1
          // - добавляем ему класс 'single-checkbox'
          visible_items[0].classList.add('single-checkbox');
        }

        for (var i = 0; i < visible_items.length; i++) {
          // Проходим по всем видимым элементам
          if (i > show - 1) {
            // Если контрол не в диапазоне отображаемости
            // (стандартно 4 элемента, определяется переменной show)
            if (!visible_items[i].classList.contains(hide_class)) {
              // Если контрол не скрыт
              // - скрываему его
              visible_items[i].classList.add(hide_class);
            }
          } else {
            // Если контрол в диапазоне отображаемости
            if (visible_items[i].classList.contains(hide_class)) {
              // Если контрол скрыт
              // - отображаем его
              visible_items[i].classList.remove(hide_class);
            }
          }
        }
      });
    },
    initRanges: function initRanges() {
      var _this = this;

      $(".ajaxfilter-range input", _this.wrapper).each(function () {
        var slider = $(this);
        var min = parseFloat(slider.data('min'));
        var max = parseFloat(slider.data('max'));
        var diaposonNumbers = max - min;
        var parent = slider.parents('.ajaxfilter-num');
        var step = 1;
        if (diaposonNumbers / 20 < 1) step = Math.round(diaposonNumbers / 20 * 1000000) / 1000000;
        var inputFrom = $('.ajaxfilter-num-from', parent);
        var inputTo = $('.ajaxfilter-num-to', parent);
        var inputFrom2 = parent.find('.ajaxfilter-num-from');
        var inputTo2 = parent.find('.ajaxfilter-num-to');
        slider.ionRangeSlider({
          type: "double",
          //grid: true,
          step: step,
          hide_min_max: false,
          hide_from_to: false,
          prettify: false,
          onUpdate: function onUpdate(obj, slider) {
            /*console.log(obj.slider)*/
          },
          onChange: function onChange(obj, slider) {
            if (obj.from == min) {
              var set_min = parseFloat(min);
              inputFrom2.val(parseFloat(min));
            } else {
              var set_min = parseFloat(obj.from);
              inputFrom2.val(parseFloat(obj.from));
            }

            if (obj.to == max) inputTo2.val(parseFloat(max));else inputTo2.val(parseFloat(obj.to));
          },
          onFinish: function onFinish(obj, slider) {
            if (obj.from == min) inputFrom2.val(parseFloat(min));else inputFrom2.val(parseFloat(obj.from));
            if (obj.to == max) inputTo2.val(parseFloat(max));else inputTo2.val(parseFloat(obj.to));

            _this.keyup(inputFrom);
          }
        });
        var range_slider = slider.data("ionRangeSlider");
        inputFrom.on('change', function () {
          var from = inputFrom.val();
          if (!from.length) from = min;
          from = parseFloat(from);
          var to = inputTo.val();
          if (!to.length) to = max;
          to = parseFloat(to);

          if (from > to) {
            from = to;
            inputFrom.val(from);
          } else if (from == min) {
            inputFrom.val('');
          }

          range_slider.update({
            from: from,
            to: to
          });

          _this.keyup(inputFrom);
        });
        inputTo.on('change', function () {
          var from = inputFrom.val();
          if (!from.length) from = min;
          from = parseFloat(from);
          var to = inputTo.val();
          if (!to.length) to = max;
          to = parseFloat(to);

          if (from > to) {
            to = from;
            inputTo.val(to);
          } else if (to == max) {
            inputTo.val('');
          }

          range_slider.update({
            from: from,
            to: to
          });

          _this.keyup(inputTo);
        });
      });
    },
    initToggleProperties: function initToggleProperties() {
      var header_class = 'catalog-aside__item-header--tab',
          body_class = 'catalog-aside__item-body';
      $(document).off('click', '.' + header_class).on('click', '.' + header_class, function (e) {
        var $this = $(this);

        if ($this.hasClass("active")) {
          $this.removeClass("active");
          $this.siblings("." + body_class).fadeOut();
          $this.siblings("." + body_class).removeClass("active");
        } else {
          $this.addClass("active");
          $this.siblings("." + body_class).fadeIn();
        }
      });
    },
    initChoice: function initChoice() {
      var _this = this;

      var form = this.form;
      $('body').on('click', '.ajaxfilter-filter-choice, a.ajaxfilter-remove-link', function () {
        if ($(this).hasClass('ajaxfilter-remove-all-link')) {
          return;
        }

        var id = $(this).data('filter');
        var control = $('#' + id);
        var submit = false;

        if (control.is(':selected')) {
          control.prop('selected', false);
          submit = true;
        } else if (control.is(':checked')) {
          control.prop('checked', false);
          submit = true;
        } else if (control.is('a')) {
          control[0].click();
        } else if (control.is('input[type=text]')) {
          control.val('');
          if (_this.isAjax) control.trigger('change');else submit = true;
        }

        if (submit) {
          _this.form.data('clicked', 'set_filter');

          _this.form.find('#set_filter').removeClass('disabled');

          _this.form.submit();
        }

        return false;
      });
    },
    initForm: function initForm() {
      var _this = this;

      var form = this.form;
      form.on('click', 'input[type=submit], button[type=submit]', function () {
        form.data('clicked', $(this).attr('name'));
      });
      form.on('click', '.ajaxfilter-combo input[type="checkbox"], .ajaxfilter-radio input[type="radio"]', function () {
        _this.click($(this));
      });
      form.on('change', '.ajaxfilter-select select, .ajaxfilter-list select', function () {
        _this.click($(this));
      });
      $('.ajaxfilter-link .lvl2 a', this.wrapper).on('click', function () {
        var $this = $(this);
        var lvl2 = $this.closest('.lvl2');
        if (lvl2.hasClass('ajaxfilter-disabled') && !lvl2.hasClass('ajaxfilter-checked')) return false;
      });
      $('.ajaxfilter-disabled input[type="checkbox"], .ajaxfilter-disabled input[type="radio"], .ajaxfilter-disabled option', this.wrapper).each(function () {
        var $this = $(this);

        if (!$this.prop('checked')) {
          $this.prop('disabled', true);
        }
      });
      form.on('keypress', 'input[type="text"]', function (e) {
        if (e.which && e.which == 13 || e.keyCode && e.keyCode == 13) {
          form.trigger('submit');
          return false;
        } else {
          return true;
        }
      });
      form.on('submit', function () {
        if (_this.submitForm() == false) return false;
      });
    },
    submitForm: function submitForm() {
      var _this = this;

      var form = this.form;
      $(':input', form).filter(function () {
        var val = $(this).val();
        if (val) return val.length == 0;else return true;
      }).prop('disabled', true);
      $('select', form).filter(function () {
        return $(this).val() == '';
      }).prop('disabled', true);

      if (form.data('sef') == 'yes' && !$('input[name=bxajaxid]', _this.form).length) {
        var url = '';

        if (form.data('clicked') == 'del_filter') {
          url = _this.options.urlDelete;
        } else {
          var filter_part = _this.getSefUrl();

          if (filter_part) {
            var action = document.createElement('a');
            action.href = form.attr('action');
            var pathname = action.pathname;
            if (pathname.substr(0, 1) !== '/') pathname = '/' + pathname;
            url = pathname + 'filter/' + filter_part + action.search;
          } else url = form.attr('action');
        }

        window.location = url;
        return false;
      }
    },
    getSefUrl: function getSefUrl() {
      var form = this.form;
      var url = '';

      var _this = this;

      $('.lvl1 .ajaxfilter-filter-property-body', form).each(function () {
        var $this = $(this);
        var name = $this.data('name');

        if (name.length) {
          var values = '';

          if ($this.hasClass('ajaxfilter-num')) {
            var from = $('input.ajaxfilter-num-from', $this).val();
            if (from.length) values += '-from-' + parseFloat(from);
            var to = $('input.ajaxfilter-num-to', $this).val();
            if (to.length) values += '-to-' + parseFloat(to);
          } else if ($this.hasClass('ajaxfilter-combo') || $this.hasClass('ajaxfilter-radio')) {
            values = _this.getSefUrlValues($('input:checked', $this));
          } else if ($this.hasClass('ajaxfilter-select') || $this.hasClass('ajaxfilter-list')) {
            values = _this.getSefUrlValues($('option:selected', $this));
          } else if ($this.hasClass('ajaxfilter-link')) {
            values = _this.getSefUrlValues($('.ajaxfilter-checked a', $this));
          }

          if (values.length) {
            url += name + values + '/';
          }
        }
      });
      return url;
    },
    getSefUrlValues: function getSefUrlValues(items) {
      var values = '';
      var arValues = items.map(function () {
        var result = '';
        var value = $(this).data('value');
        if (typeof value != 'undefined') result = value;else result = $(this).val();
        if (result) return result;
      }).get();
      if (arValues.length) values = '-' + arValues.join('-or-');
      return values;
    },
    updateUrl: function updateUrl(params, values) {
      var form = this.form;
      var url = "";
      var bSef = form.data('sef') == 'yes';

      if (bSef) {
        var arParts = window.location.pathname.split("/");
        var baseurl = '/';
        var add = true;
        $.each(arParts, function (key, part) {
          if (part == 'filter' || part == 'index.php') add = false;
          if (add && part.length) baseurl += part + '/';
        });
        var sefUrl = this.getSefUrl();
        window.slamSefUrl = sefUrl;

        if (sefUrl.length) {
          url += 'filter/' + sefUrl;
        }

        if (window.location.search) url += window.location.search;
      }

      values.forEach(function (entry) {
        if (typeof params[entry.name] != 'undefined' && !$.isArray(params[entry.name])) {
          var first = params[entry.name];
          params[entry.name] = new Array();
          params[entry.name].push(first);
        }

        if ($.isArray(params[entry.name])) params[entry.name].push(entry.value);else params[entry.name] = entry.value;

        if (entry.name != 'ajax' && entry.name != 'SECTION_CODE' && !bSef) {
          if (url.length) url += '&';
          url += entry.name + '=' + entry.value;
        }
      });

      if (!bSef) {
        if (url.length) {
          url = '?' + url;
        } else {
          url = window.location.pathname;
        }
      }

      try {
        if (bSef) {
          url = baseurl + url;
          $('[name="ys-request-uri"]').val(url);
          history.pushState(null, null, window.location.origin + url);
        } else {
          history.pushState(null, null, url);
        }

        return params;
      } catch (e) {}

      location.hash = '#' + url;
      return params;
    },
    keyup: function keyup(input) {
      this.reload(input);
    },
    click: function click(checkbox) {
      var parent = checkbox.closest('.lvl2');

      if (checkbox.prop('checked')) {
        parent.addClass('ajaxfilter-checked');
        parent.parent().addClass('activate');
        setTimeout(function () {
          parent.parent().removeClass('activate');
          checkbox.parents('.ajaxfilter-filter-property-body').prepend(parent.parent());
          parent.parent().show();
        }, 400);
      } else {
        parent.removeClass('kombox-checked');
        parent.parent().addClass('deactivate');
        setTimeout(function () {
          parent.parent().removeClass('deactivate');
          parent.parent().insertAfter(parent.parents('.ajaxfilter-filter-property-body').find('.form-group:last'));
          parent.parent().show();
        }, 400);
      }

      this.reload(checkbox);
    },
    reload: function reload(input) {
      this.input = input;

      if (this.form.length) {// var values = new Array;
        // values[0] = {name: 'ajax', value: 'y'};
        //
        // this.gatherInputsValues(values, this.form.find('input, select, .ajaxfilter-link .lvl2 a'));
        //
        // $.ajax({
        // 	url: this.options.ajaxURL,
        // 	success: function (values) {
        // 		this.values2post(values)
        // 	},
        // 	error: function (jqXHR, exception) {
        // 		console.log('error', jqXHR, exception)
        // 	},
        // })
      }
    },
    postHandler: function postHandler(result) {
      if (result.ITEMS) {
        for (var PID in result.ITEMS) {
          var arItem = result.ITEMS[PID];

          if (arItem.SETTINGS.VIEW == 'SLIDER') {
            var control = $('#' + arItem.VALUES.MAX.CONTROL_ID);

            if (control.length) {
              if (control[0].hasAttribute('placeholder')) {
                if (typeof arItem.VALUES.MAX.RANGE_VALUE !== 'undefined') {
                  control.prop('placeholder', +arItem.VALUES.MAX.RANGE_VALUE);
                } else {
                  control.prop('placeholder', +arItem.VALUES.MAX.VALUE);
                }
              }

              var set_max = parseFloat(arItem.VALUES.MAX.RANGE_VALUE);
              var set_min = parseFloat(arItem.VALUES.MIN.RANGE_VALUE);
              var slider = control.closest('.lvl1').find('.ajaxfilter-range input');
              var range_slider = slider.data("ionRangeSlider");

              if (slider.length) {
                if (typeof arItem.VALUES.MAX.RANGE_VALUE !== 'undefined') {
                  set_max = parseFloat(arItem.VALUES.MAX.RANGE_VALUE);
                } else {
                  set_max = parseFloat(arItem.VALUES.MAX.VALUE);
                }

                if (typeof arItem.VALUES.MIN.RANGE_VALUE !== 'undefined') {
                  set_min = parseFloat(arItem.VALUES.MIN.RANGE_VALUE);
                } else {
                  set_min = parseFloat(arItem.VALUES.MIN.VALUE);
                }

                slider.data('min', set_min);
                slider.data('max', set_max);
                var to = control[0].placeholder,
                    from = $('#' + arItem.VALUES.MIN.CONTROL_ID)[0].placeholder;

                if (control[0].value) {
                  to = control[0].value;
                }

                if (typeof arItem.VALUES.MIN.RANGE_VALUE !== 'undefined' && $('#' + arItem.VALUES.MIN.CONTROL_ID)[0].value) {
                  from = $('#' + arItem.VALUES.MIN.CONTROL_ID)[0].value;
                } else {
                  from = parseFloat(arItem.VALUES.MIN.VALUE);
                }

                range_slider.update({
                  min: set_min,
                  max: set_max,
                  from: from,
                  to: to
                });
              }
            }

            control = $('#' + arItem.VALUES.MIN.CONTROL_ID);

            if (control.length) {
              if (control[0].hasAttribute('placeholder')) {
                if (typeof arItem.VALUES.MIN.RANGE_VALUE !== 'undefined') control.prop('placeholder', +arItem.VALUES.MIN.RANGE_VALUE);
              } else {
                control.prop('placeholder', +arItem.VALUES.MIN.VALUE);
              }
            }
          } else if (arItem.VALUES) {
            for (var i in arItem.VALUES) {
              var ar = arItem.VALUES[i];
              var control = $('#' + ar.CONTROL_ID);

              if (control.length) {
                var parent = control.closest('.lvl2');

                if (arItem.SETTINGS.VIEW == 'LIST' || arItem.SETTINGS.VIEW == 'SELECT') {
                  if (ar.DISABLED) {
                    control.addClass('ajaxfilter-disabled');
                  } else {
                    control.removeClass('ajaxfilter-disabled');
                  }

                  if (ar.CHECKED) {
                    control.addClass('ajaxfilter-checked');
                  } else control.removeClass('ajaxfilter-checked');

                  if (ar.CNT > 0 && !ar.CHECKED) control.text(ar.VALUE + ' (' + ar.CNT + ')');else control.text(ar.VALUE);
                } else {
                  if (ar.DISABLED) {
                    parent.addClass('ajaxfilter-disabled');
                  } else {
                    parent.removeClass('ajaxfilter-disabled');
                  }

                  if (ar.CHECKED) parent.addClass('ajaxfilter-checked');else parent.removeClass('ajaxfilter-checked');
                  if (ar.CNT > 0) parent.find('span.ajaxfilter-cnt').text(ar.CNT);else parent.find('span.ajaxfilter-cnt').text('');
                }

                if (ar.DISABLED && !ar.CHECKED) {
                  control.prop('disabled', true);
                } else {
                  control.prop('disabled', false);
                }

                if (control.is('a') && ar.HREF) {
                  control.attr('href', ar.HREF);
                }
              }
            }
          }
        }

        this.showModef(result);
      }
    },
    showModef: function showModef(result) {
      var modef = $('.js-modef', this.wrapper);
      var modef_num = $('.js-modef_num', this.wrapper);
      var modef_title = $('.num-title', this.wrapper);

      if (modef_num.length) {
        // Если фильтр не установлен, то не показываем кнопки внизу фильтра "Сбросить" и "Показать N товаров"
        // if(result['SET_FILTER'] === true){
        //     modef.show();
        // }else{
        //     modef.hide();
        // }
        // Если нет товаров для показа, то не показываем кнопку "Показать N товаров"
        // if(result.ELEMENT_COUNT > 0){
        //     modef.find('button').show();
        // }else{
        //     modef.find('button').hide();
        // }
        modef_num.html(result.ELEMENT_COUNT + '&nbsp;');
        modef_title.html(sklonenJs(result.ELEMENT_COUNT, 'товар', 'товара', 'товаров', false, true));
        var href = modef.find('a');
        var input = $(this.input);
        var curProp = input.closest('.lvl1').find('.for_modef');

        if (curProp.length) {
          modef.show();
          var lvl2 = input.closest('.lvl2');
          var top = 0;

          if (lvl2.length) {
            top = lvl2.position().top - lvl2.height() / 2;
          }

          modef.css({
            'top': top + 'px'
          });

          if (this.options.align == 'LEFT') {
            modef.css({
              'left': '-' + modef.outerWidth() + 'px'
            });
          } else {
            modef.addClass('modef-right');
            modef.css({
              'right': '-' + modef.outerWidth() + 'px'
            });
          }

          curProp.append(modef);

          if (this.options.modeftimeout > 0) {
            if (this.modeftimer) clearTimeout(this.modeftimer);
            this.modeftimer = setTimeout(function () {
              modef.hide();
            }, this.options.modeftimeout * 1000);
          }
        }
      }
    },
    gatherInputsValues: function gatherInputsValues(values, elements) {
      if (elements.length) {
        elements.each(function () {
          var el = $(this);

          if (el.is('a') && el.data('checked') == 'checked') {
            values[values.length] = {
              name: el.data('name'),
              value: el.data('value')
            };
          } else if (!el.prop('disabled') && el[0].type) {
            switch (el[0].type.toLowerCase()) {
              case 'text':
              case 'textarea':
              case 'password':
              case 'hidden':
                var val = el.val();
                if (val.length) values[values.length] = {
                  name: el.attr('name'),
                  value: el.val()
                };
                break;

              case 'radio':
              case 'checkbox':
                var val = el.val();
                if (el.prop('checked') && val.length) values[values.length] = {
                  name: el.attr('name'),
                  value: el.val()
                };
                break;

              case 'select-one':
              case 'select-multiple':
                el.find('option').each(function () {
                  var option = $(this);
                  if (option.prop('selected') && option.val().length) values[values.length] = {
                    name: el.attr('name'),
                    value: option.val()
                  };
                });
                break;

              default:
                break;
            }
          }
        });
      }
    },
    values2post: function values2post(values) {
      var post = new Object();
      var current = post;
      var i = 0;

      while (i < values.length) {
        var value = values[i].value;
        var name = values[i].name;
        var p = name.indexOf('[');

        if (p != -1) {
          name = values[i].name.substring(0, p);
        }

        if (typeof current[name] != 'undefined' && !$.isArray(current[name])) {
          var first = current[name];
          current[name] = new Array();
          current[name].push(first);
        }

        if ($.isArray(current[name])) current[name].push(value);else current[name] = value;
        current = post;
        i++;
      }

      return post;
    }
  };
  $.slamInherit('slamSmartFilter');
});


$(function () {
  $.slamInherit('slamAjaxSmartFilter', $.slamSmartFilter, {
    options: {
      ajax_enable: 'Y'
    },
    init: function init(wrapper, options) {
      if (window.location.hash != '') {
        if (!(window.history && history.pushState)) {
          var uri = window.location.hash.replace('#', '');
          window.location.href = document.location.pathname + uri;
        }
      }

      $.SlamSmartFilter.prototype.init.call(this, wrapper, options);
      var bSef = this.form.data('sef') == 'yes';
      if (bSef) window.slamSefUrl = this.getSefUrl();else window.slamSefUrl = '';
      this.isAjax = true;

      var _this = this;

      if (this.isAjax) {
        $('a.showchild', this.form).on('click', function () {
          _this.form.data('clicked', 'set_filter');

          _this.submitForm();

          return false;
        });
        this.form.on('click', 'a.ajaxfilter-del-filter', function () {
          _this.form.data('clicked', 'del_filter');

          _this.submitForm();

          return false;
        });
        $('.js-scroll-to-top').on('click', function () {
          if ($('.ajax-nav-item').length > 0) {
            $("HTML, BODY").animate({
              scrollTop: $('.catalog-product-list').offset().top - 80
            }, 200);
          }
        });
        this.form.on('click', '.ajaxfilter-link .lvl2 a', function () {
          var $this = $(this);
          var lvl2 = $this.closest('.lvl2');
          if (lvl2.hasClass('ajaxfilter-disabled') && !lvl2.hasClass('ajaxfilter-checked')) return false;

          if ($this.data('checked') == 'checked') {
            $this.data('checked', '');
            lvl2.removeClass('ajaxfilter-checked');
          } else {
            $this.data('checked', 'checked');
            lvl2.addClass('ajaxfilter-checked');
          }

          _this.form.data('clicked', 'set_filter');

          _this.form.find('#set_filter').removeClass('disabled');

          _this.submitForm();

          return false;
        });
      }
    },
    ShowHideModueLoadingIcon: function ShowHideModueLoadingIcon() {
      $('.ajax-result').addClass('filter-preloader');
    },
    reload: function reload(input) {
      this.input = input;

      if (this.form.length) {
        var values = new Array();
        this.gatherInputsValues(values, this.form.find('input, select, .ajaxfilter-link .lvl2 a'));
        this.catalogLoading(values);
      }
    },
    submitForm: function submitForm() {
      var form = this.form;

      if (form.data('clicked') == 'set_filter') {
        if (form.find('#set_filter').hasClass('disabled')) return false;
      }

      if (this.isAjax) {
        var values = new Array();

        if (form.data('clicked') == 'del_filter') {
          form.find('input[type=text]').val('');
          var checkboxes = form.find('input[type=checkbox], input[type=radio]');
          checkboxes.prop('checked', false);
          checkboxes.closest('span.checked').removeClass('checked');
          form.find('select').each(function () {
            var select = $(this);
            select.find('option').prop('selected', false).removeAttr('selected');
            select.find('option:first').prop('selected', true).attr('selected', 'selected');
            select.val('');
          });
          form.find('.ajaxfilter-link .lvl2 a').each(function () {
            var link = $(this);
            var lvl2 = link.closest('.lvl2');
            lvl2.removeClass('ajaxfilter-checked');
            link.data('checked', '');
          });
          form.find('.ajaxfilter-range div').ionRangeSlider("reset");
        }

        if (this.form.length) {
          this.gatherInputsValues(values, this.form.find('input, select, .ajaxfilter-link .lvl2 a'));
          this.catalogLoading(values);
        }

        return false;
      } else {
        return $.SlamSmartFilter.prototype.submitForm.call(this);
      }
    },
    catalogLoading: function catalogLoading(values) {
      var _this = this;

      _this.ShowHideModueLoadingIcon();

      var params = {
        'filter_ajax': 'y'
      };

      _this.updateUrl(params, values); 
      // $.post(_this.options.ajaxURL, params, function (data) {
      // 	var regFilter = /<\!--START SLAM_SMART_FILTER-->([\s\S]*?)<\!--END SLAM_SMART_FILTER-->/gim;
      // 	var strFilter = regFilter.exec(data);
      // 	var jsonString = strFilter[0].replace('<!--START SLAM_SMART_FILTER-->', '').replace('<!--END SLAM_SMART_FILTER-->', '').toString().replace(/'/g, '\"')
      //
      //
      // 	if (strFilter != null) {
      // 		var jsonFilter = JSON.parse(jsonString);
      // 		_this.postHandler(jsonFilter);
      // 	}
      //
      // 	$(document).trigger('onSlamFilterCatalogLoading', [data])
      // 	_this.initChoice();
      // 	_this.initMore();
      // 	_this.initSelectStyler();
      // 	reinitSomeStuffAfterAjax();
      // 	//_this.ShowHideModueLoadingIcon();
      // 	// if(jQuery().styler) {
      // 	//     $('.custom-select select, .jqselect select').styler();
      // 	//     $('.custom-select select, .jqselect select').trigger('refresh');
      // 	// }
      // 	// if(jQuery().customSelect()) {
      // 	//     $('.custom-select select').customSelect('reinit');
      // 	// }
      // })

    },
    initSelectStyler: function initSelectStyler() {
      var select_input = $('.custom-select');
      select_input.length && select_input.styler && select_input.styler();
    },
    postHandler: function postHandler(result) {
      var form = this.form;

      if (result.SET_FILTER || this.change) {
        form.find('.ajaxfilter-del-filter').removeClass('disabled');
      } else if (!this.change) {
        form.find('.ajaxfilter-del-filter').addClass('disabled');
      }

      $.SlamSmartFilter.prototype.postHandler.call(this, result);
    }
  });
});



(function () {
  var $sidebar_filter = $('.sidebar-filter');

  if ($sidebar_filter.length > 0) {
		setPositionFilterSubmit();
    
    if ($(window).width() < 1200) {
      openFilter();
    }

    if ($(window).width() >= 1199) {
      $(document).on('scroll', setPositionFilterSubmit);
    }
    $(window).resize(function () {
      if ($(window).width() >= 1199) {
        $(document).on('scroll', setPositionFilterSubmit);
      }
    });
  }
	function setPositionFilterSubmit() {
		var $sidebar_filter = $('.sidebar-filter');
		var $sidebar_filter_submit = $sidebar_filter.find('.submit-filter');
		var w_height = $(window).height();
		if ($sidebar_filter[0] && $sidebar_filter_submit[0]) {
			var sidebar_filter_rect = $sidebar_filter[0].getBoundingClientRect();
			var sidebar_filter_submit_rect = $sidebar_filter_submit[0].getBoundingClientRect();
			if (sidebar_filter_submit_rect.y - w_height <= -50 || sidebar_filter_rect.y - w_height > -150) {
				$sidebar_filter_submit.removeClass('submit-filter--fixed');
			} else {
				$sidebar_filter_submit.addClass('submit-filter--fixed');
			}
		}
	}
	
	function openFilter() {
		var filterToogleBtn = $('.js-btn-toggle[data-target=".sidebar-filter__block"]');
			filterToogleBtn.click(function () {
				if($(this).hasClass('active')){
					$('body').removeClass('filter-active');
				}else{
					$('body').addClass('filter-active');
				}
		});
	}
  $(document).on('mouseover', '.filter-reset', function () {
    var $this = $(this);
    var $this_head = $this.closest('.sidebar-filter__head');
    $this_head.addClass('reset-hover');
  });
  $(document).on('mouseout', '.filter-reset', function () {
    var $this = $(this);
    var $this_head = $this.closest('.sidebar-filter__head');
    $this_head.removeClass('reset-hover');
  });

  var test_num_input = function test_num_input(value) {
    return /^\d*\.?\d*$/.test(value);
  };

  $(document).on('input keydown keyup mousedown mouseup select contextmenu drop', '.ajaxfilter-num-from, .updateFrom, .ajaxfilter-num-to', function () {
    if (test_num_input(this.value)) {
      this.oldValue = this.value;
      this.oldSelectionStart = this.selectionStart;
      this.oldSelectionEnd = this.selectionEnd;
    } else if (this.hasOwnProperty("oldValue")) {
      this.value = this.oldValue;
      this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
    } else {
      this.value = "";
    }
  });
  $(document).on('click', '.mob-btn--active-filter', function () {
    $('.mob-btn--active-filter').removeClass('mob-btn--active-filter');
    $('body').removeClass('filter-opened');
    $('.sidebar-filter__block').removeClass('show');
    return false;
  });

  $(document).on('click', '.filter-more', function () {
    var $this = $(this);
    if ($this.hasClass('active')) {
      var $visible = $this.parents('.sidebar-filter__item').find('.form-group--visible');
      var count = $visible.length;
      $visible.addClass('form-group--hidden');
      $visible.removeClass('form-group--visible');
      $this.find('span').text('Показать все ' + count);
      $this.removeClass('active');
    } else {
      var $hidden = $this.parents('.sidebar-filter__item').find('.form-group--hidden');
      var count = $hidden.length;
      $hidden.addClass('form-group--visible');
      $hidden.removeClass('form-group--hidden');
      $this.find('span').text('Скрыть ' + count);
      $this.addClass('active');
    }
    return false;
  });

  $('.sidebar-filter__item.closed').find('.sidebar-filter__content').hide();
  $('.sidebar-filter__head .filter-reset').on('click', function (e) {
    e.stopPropagation();
  });
  $('.sidebar-filter__head').on('click', function (e) {
    if (!$(e.target).closest('.tooltip').length) {
      $(this).parent().toggleClass('closed');
      $(this).parent().find('.sidebar-filter__content').slideToggle();
    }
  });
  var range_sl = $(".range-slider");

  var range_input_set_value = function range_input_set_value(input) {
    var $this = $(input);
    var input_val = input.value.split(';');
    var $parent, $input_from, $input_to;
    $parent = $this.parents('.sidebar-filter__item');
    $input_from = $parent.find('.updateFrom');
    $input_to = $parent.find('.updateTo');
    $input_from.val(input_val[0]);
    $input_to.val(input_val[1]);
  };

  if (range_sl.length > 0) {
    var sliders = [];
    range_sl.on('change', function (data) {
      range_input_set_value(this);
    });

    for (var i = 0; i < range_sl.length; i++) {
      range_sl.parent().eq(i).parents('.sidebar-filter__item').attr('data-range-index', i);
      $('[data-range-index="' + i + '"]').find('.range-slider').addClass('range-index-' + i + '');
      $('.range-slider').ionRangeSlider && $('.range-slider').ionRangeSlider({
        onStart: function onStart(data) {
          var $this = data.input;
          var input_val = [data.from, data.to];
          var $parent, $input_from, $input_to;
          $parent = $this.parents('.sidebar-filter__item');
          $input_from = $parent.find('.updateFrom');
          $input_to = $parent.find('.updateTo');
          $input_from.val(input_val[0]);
          $input_to.val(input_val[1]);
        }
      });
      sliders[i] = $('[data-range-index="' + i + '"]').find('.range-slider').data("ionRangeSlider");
    }

    $('.updateFrom').on('change keyup', function () {
      var $this = $(this),
          index = $this.parents('.sidebar-filter__item').attr('data-range-index'),
          val = $this.val();
      sliders[index].update({
        from: val
      });
    });
    $('.updateTo').on('change keyup', function () {
      var $this = $(this),
          index = $this.parents('.sidebar-filter__item').attr('data-range-index'),
          val = $this.val();
      sliders[index].update({
        to: val
      });
    });
  }
})();
