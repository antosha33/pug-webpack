window.addEventListener('load', function (event) {
	const inputsfile = Array.from(document.querySelectorAll('.input__file'));

	inputsfile.forEach((input) => {
		const closest = input.closest('.input-file-group');
		const choosen = closest.querySelector('.choosen-file');
		const button = closest.querySelector('.input__file-button');
		input.addEventListener('change', function () {
			choosen.innerHTML = '';
			const createIcon = (id) => {
				return `
			<svg width="22px" height="22px" class="icon" alt="${id}">
			<use xlink:href="${id}"/>
			</svg>`
			}
			if (this.files.length) {
				for (key in this.files) {
					if (this.files[key].name && key !== 'item') {
						$('.choosen-files-wrap').addClass('active');
						const item = document.createElement('div');
						item.setAttribute('class', 'choosen-file__item');
						item.innerHTML = this.files[key].name;
						const ext = this.files[key].name.match(/\..{3}$/g)[0].split('.').join('');
						choosen.append(item);
					}
				}
				button.classList.remove('empty');
				button.querySelector('span').innerHTML = "Добавить ещё файлы"
			};

		})
	})

})