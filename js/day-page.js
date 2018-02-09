$(function() {	
	$('.gallery_slider').slick({
		lazyLoad: 'ondemand',
		infinite: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		cssEase: 'linear'
	});
	
	$('.gallery_slider-next').on('click', function() {
		$('.gallery_slider').slick('slickNext');
	});
	
	$('.gallery_slider-prev').on('click', function() {
		$('.gallery_slider').slick('slickPrev');
	});
	
});