# webpack-box

### Заметки/доработки
+ добавить префиксы к scss
+ разобрать стили swiper
+ как добавлять картинки background-image() в css? путь - ошибка (пример insta-section) - как вариант использовать data-image
+ dev картинки копировать local
+ inject critical
+ phpstorm - ctrl+s
+ inlude-style/ inlude-script для режима 
+ ДОБАВИТЬ компоненты для модалок auth reg etc оговоренные с бэком
+ доработать GRID для динамиской настройки колонок

### Команды сборки:
+ npm run dev - режим разработки
+ npm run build - режим сборки
+ npm run injectCritical - запустить после build перед тестированием на скорость
+ npm run dev2 - режим разработки с параллельной компиляцией в local/templates/html без минификации

### Структура

#### components/ -> (все компоненты)
##### component-name/ -> (обычный компонент, добавляется через include)
+ component-name.pug - имя pug-файла = имя компонента по БЭМ
+ ajax__component-name.pug - ajax-часть компонента
+ critical.scss - файл критических стилей компонента
+ style.scss - основной файл стилей компонента + @import("--mod.scss")
+ --mod.scss - мод. стили, @import в style.scss/critical.scss родительского компонента
+ script.js - файл скриптов компонента


#### mixins/ ->
+ mixin-name/



