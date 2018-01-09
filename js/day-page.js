$(function() {
	/* ИМГ В СВГ */
	$('img.img-svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			var $svg = $(data).find('svg');

			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}

			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			$svg = $svg.removeAttr('xmlns:a');

			if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			$img.replaceWith($svg);

		}, 'xml');
	});
	
	/* Показать/Скрыть попап */
	var switchPopup = function(block) {
		var popup = $(block);
		
		if(popup.hasClass('display')) {
			popup.removeClass('visible');
			setTimeout(function() {
				popup.removeClass('display');
				$('html').css('overflow', 'auto');
			}, 300);
		} else {
			popup.addClass('display');
			setTimeout(function() {
				popup.addClass('visible');
			}, 1);
			$('html').css('overflow', 'hidden');
		}
	}
	
	$(document).on('click', '.js-tgl-callback', function() {
		switchPopup('.popup_callback');
	});
	
	$('.gallery_slider').slick({
		lazyLoad: 'ondemand',
		infinite: false,
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