let carousels = {
	// ex_1: {
	// 	positions: [1, 2, 3],
	// 	halfContainer: 25,
	// 	currentItem: 0,
	// }
};

document.querySelectorAll('.carousel').forEach((carousel, i) => {
	carousels[i] = {}

	carousels[i].getPositions = () => {
		carousels[i].positions = [];
		carousel.querySelectorAll('img').forEach((img) => {
			carousels[i].positions.push([
				img.offsetLeft,
				img.offsetLeft + img.offsetWidth,
			]);
		});
		carousels[i].halfContainer = carousel.offsetWidth / 2;
	};
	carousels[i].getPositions();

	carousels[i].move = function(direction)  {
		carousels[i].currentScrollLeft = carousel.scrollLeft;
		carousels[i].currentScrollright =
			carousel.scrollLeft + carousel.offsetWidth;

		if (carousels[i].currentScrollLeft == 0 && direction == 'next') {
			carousels[i].currentItem = 1;
		} else if (
			carousels[i].currentScrollRight == carousel.scrollWidth &&
			direction == 'prev'
		) {
			carousels[i].currentItem = carousels[i].positions.length - 2;
		} else {
			carousels[i].currentMiddlePosition =
				carousels[i].currentScrollLeft + carousels[i].halfContainer;

			for (let j = 0; j < carousels[i].positions.length; j++) {
				if (
					carousels[i].currentMiddlePosition >=
						carousels[i].positions[j][0] &&
					carousels[i].currentMiddlePosition <
						carousels[i].positions[j][1]
				) {
					carousels[i].currentItem = j;
					if (direction == 'next') {
						carousels[i].currentItem++;
					} else if (direction == 'prev') {
						carousels[i].currentItem--;
					}
				}
			}
		}

		try {
			carousel.scrollTo({
				left: carousels[i].positions[carousels[i].currentItem][0],
				behavior: 'smooth',
			});
		} catch(e) {}
	};

	carousel.parentElement.querySelectorAll('.carousel-btn').forEach((button) => {
		if (button.classList.contains('carousel-next')) {
			button.addEventListener('click', () => {
				carousels[i].move('next');
			});
		} else if (button.classList.contains('carousel-prev')) {
			button.addEventListener('click', () => {
				carousels[i].move('prev');
			});
		}
	});

	window.addEventListener('resize', carousels[i].getPositions());
});
