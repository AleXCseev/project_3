$(function () {
	AOS.init();

	$('[data-fancybox]').fancybox({
		loop: true,
	});

	$('.reviews__wrapper').slick({
		dots: true,
		slidesToShow: 1,
		slideToScroll: 1,
		variableWidth: true,
		centerMode: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000,
		// adaptiveHeight: true
	});

	$.raty.path = 'img/raty';
	$('.modal__raiting').raty({
		half: true,
		space: false,
	});

	$("reviews .order__link").click(function () {
		$.fancybox.open($(".modal"), {
			infobar: false,
		})
	})

	function carousel(selector, mark) {
		if ($(window).width() <= 660) {
			var acarousel = $(selector).acarousel();

			$(selector).swipe({
				swipeStatus: function (event, phase, direction) {
					if (phase == "end") {
						//сработает через 20 пикселей то число которое выбрали в threshold
						if (direction == 'left') {
							//сработает при движении влево
							var move = acarousel.move(-1)
							changeActive(move);
						}
						if (direction == 'right') {
							//сработает при движении вправо
							var move = acarousel.move(1);
							changeActive(move);
						}
					}
				},
				triggerOnTouchEnd: false,
				threshold: 20,
			});

			function changeActive(move) {
				var index = acarousel.getPos(move).index;
				$(mark + " .move").removeClass("active").eq(index).addClass("active");
			}
			changeActive();

			$(".move").click(function () {
				if (acarousel.isAnim()) return false;
				var index = $(".move").index(this);
				var move = acarousel.moveByIndex(index);
				changeActive(move);
				return false;
			});

			$(window).resize(function () {
				acarousel.init();
			});
		}
	}

	carousel(".galary__wrapper", ".move__mark");
})

