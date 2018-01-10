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
	
	$(document).on('click', '.js-tgl-social-1', function() {
		switchPopup('.popup_social-1');
	});
	
	$(document).on('click', '.js-tgl-social-2', function() {
		switchPopup('.popup_social-2');
	});
	
	$(document).on('click', '.js-tgl-map', function() {
		switchPopup('.popup_map');
	});
	
	$(document).on('click', '.js-tgl-menu', function() {
		switchPopup('.mobile-menu');
	});
	
	$('.s4-slider').slick({
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.s4-slider-desc',
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	
	$('.sect-4_slider-next').on('click', function() {
		$('.s4-slider').slick('slickNext');
	});
	
	$('.sect-4_slider-prev').on('click', function() {
		$('.s4-slider').slick('slickPrev');
	});
	
	$(window).ready(function() {
		var selectDay = localStorage.getItem('selectDay') ? Number(localStorage.getItem('selectDay'))-1 : 0;
		$('.s4-slider').slick('slickGoTo', selectDay);
	});
	
	$('.s4-slider-desc').slick({
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		fade: true,
		asNavFor: '.s4-slider',
		swipe: false
	});
	
	/* Аккордеон 8 секция */
	var allAccordionItem = $('.accordion_item');
	var allAccordionTitle = $('.accordion_title');
	var allAccordionData = $('.accordion_data');
	
	allAccordionTitle.click(function() {
		var thisAccordionItem = $(this).parent();
		
		if(thisAccordionItem.hasClass('open')) {
			thisAccordionItem.removeClass('open');
			thisAccordionItem
				.children(".accordion_data")
				.slideUp("slow");
		} else {
			allAccordionData.slideUp("slow");
			allAccordionItem.removeClass('open');
			thisAccordionItem.addClass('open');
			thisAccordionItem
				.children(".accordion_data")
				.slideDown("slow");
		}
	});
	
	var goToSlide = function(scrollTop, speed) {
        $('html, body').animate({scrollTop: scrollTop}, speed);
	}
	
	$('.nav li, .scroll-sect').on('click', function(e) {
		e.preventDefault();
		var thisScrollTop = $(window).scrollTop();
		var thisSlide = Number($(this).data('slide'));
		var scrollSect = $('.sect-' + thisSlide);
		var scrollTop = scrollSect.offset().top;
		var speed = Math.abs(thisScrollTop - scrollTop);
		goToSlide(scrollTop, speed <= 2000 ? speed : 2000);
	});
	
});