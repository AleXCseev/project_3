$(function () {
	$('.reviews__wrapper').slick({
		dots: true,
		slidesToShow: 1,
		slideToScroll: 1,
		variableWidth: true,
		centerMode: true,
		arrows: false,
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
})

