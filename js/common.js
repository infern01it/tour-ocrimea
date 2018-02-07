(function($) {
	/* Показать/Скрыть попап
	 * В jQuery объект передается блок попапа
	 * 1 параметр - класс кнопки по которой будет появляться/исчезать попап (typeof string)
	 * 2 параметр - время анимации появления/исчезновения попапа (typeof number)
	 */
	$.fn.switchPopup = function(btn, time) {		
		var $popup = this;
		$(document).on('click', btn, function() {
			var $scrollWidth = window.innerWidth - document.documentElement.clientWidth
			var $time = typeof time === 'number' ? time : 300;
			
			if($popup.hasClass('display')) {
				$popup.removeClass('visible');
				setTimeout(function() {
					$popup.removeClass('display');
					$('html').css({
						'padding-right': 0,
						'overflow': 'auto'
					});
				}, $time);
			} else {
				$popup.addClass('display');
				setTimeout(function() {
					$popup.addClass('visible');
				}, 1);
				$('html').css({
					'padding-right': $scrollWidth,
					'overflow': 'hidden'
				});
			}
		});
	};
})(jQuery);

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
	
	$(".lazyload").lazyload();
	
	$('.popup_callback').switchPopup('.js-tgl-callback', 300);
	$('.popup_social-1').switchPopup('.js-tgl-social-1', 300);
	$('.popup_social-2').switchPopup('.js-tgl-social-2', 300);
	$('.popup_map').switchPopup('.js-tgl-map', 300);
	$('.mobile-menu').switchPopup('.js-tgl-menu', 300);
	
	/* TODO: Настройки слайдеров 4й и 10й секций - Начало */
	var s4SliderSettings = {
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
	};
	var s4SliderDescSettings = {
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		fade: true,
		asNavFor: '.s4-slider',
		swipe: false
	};
	/* TODO: Настройки слайдеров 4й и 10й секций - Конец */
	
	/* TODO: Слайдер 4я секция - Начало */
	$('.js-s4sl').slick(s4SliderSettings);
	$('.js-s4sl-next').on('click', function() {
		$('.js-s4sl').slick('slickNext');
	});
	$('.js-s4sl-prev').on('click', function() {
		$('.js-s4sl').slick('slickPrev');
	});
	$('.js-s4sl-desc').slick(s4SliderDescSettings);
	/* TODO: Слайдер 4я секция - Конец */
	
	
	/* TODO: Слайдер 10я секция - Начало */
	$('.js-s10sl').slick(s4SliderSettings);
	$('.js-s10sl-next').on('click', function() {
		$('.js-s10sl').slick('slickNext');
	});
	$('.js-s10sl-prev').on('click', function() {
		$('.js-s10sl').slick('slickPrev');
	});
	$('.js-s10sl-desc').slick(s4SliderDescSettings);
	/* TODO: Слайдер 10я секция - Конец */
	
	
	/* TODO: Слайдер 12я секция - Начало */
	var s12SliderSettings = {
		infinite: false,
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1
				}
			}
		]
	};
	$('.js-s12sl').slick(s12SliderSettings);
	$('.js-s12sl-next').on('click', function() {
		$('.js-s12sl').slick('slickNext');
	});
	$('.js-s12sl-prev').on('click', function() {
		$('.js-s12sl').slick('slickPrev');
	});
	/* TODO: Слайдер 12я секция - Конец */
	
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
	
	
	function toggleCalcBtn() {
		if($(window).scrollTop() >= 50) {
			$('.calc-btn').addClass('display');
			setTimeout(function() {
				$('.calc-btn').addClass('visible');
			}, 1);
		} else {
			$('.calc-btn').removeClass('display');
			setTimeout(function() {
				$('.calc-btn').removeClass('visible');
			}, 300);
		}
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
	
	var contentSections = $('.sect');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
		toggleCalcBtn();
	});

	function updateNavigation() {
		contentSections.each(function(i, el){
			$this = $(this);
			var activeSection = Number($(el).data('nav'));
			if (($this.offset().top - $(window).height()/2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop())) {
				$('.nav li[data-slide="'+activeSection+'"]')
					.addClass('display');
				setTimeout(function() {
					$('.nav li[data-slide="'+activeSection+'"]')
						.addClass('visible');
				}, 1);
			} else {
				$('.nav li[data-slide="'+activeSection+'"]')
					.removeClass('display')
					.removeClass('visible');
			}
		});
	}
	
});