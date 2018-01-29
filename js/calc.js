/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
(function(factory) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {
		// Browser globals
		factory( jQuery.datepicker );
	}
}(function(datepicker) {
	datepicker.regional.ru = {
		closeText: "Закрыть",
		prevText: "&#x3C;Пред",
		nextText: "След&#x3E;",
		currentText: "Сегодня",
		monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
		"Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
		monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
		"Июл","Авг","Сен","Окт","Ноя","Дек" ],
		dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
		dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
		dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
		weekHeader: "Нед",
		dateFormat: "dd.mm.yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};
	datepicker.setDefaults(datepicker.regional.ru);
	return datepicker.regional.ru;
}));

$(function() {
	var URL = 'http://ocrimea.local';
	
	//получение списков отелей, кол-ва человек
	$.ajax({
		url: URL + '/wp-admin/admin-ajax.php?action=get-calc-data',
		type: 'GET',
		success: function(res){
			console.log(res);

            from.datepicker("option", "minDate", new Date(res.date_min * 1000));
            from.datepicker("option", "maxDate", new Date(res.date_max * 1000));
            to.datepicker("option", "minDate", new Date(res.date_min * 1000));
            to.datepicker("option", "maxDate", new Date(res.date_max * 1000));
			//заполнение списка экскурсий
			if (res.excursion) {
                for (var key in res.excursion) {
                	if (res.excursion[key]) {
                        var item = res.excursion[key];
                        $('.form-calc_city-block .items_block').append('<li class="form-calc_checkbox checkbox checkbox__2">' +
                            '<input type="checkbox" name="data[excursion][]" id="city-' + key + '" checked value="' + item.id + '">' +
                            '<label for="city-' + key + '">' + item.title + '</label>' +
                            '</li>');
					}
                }
            }

            //заполнение списка отелей
            if (res.hotel) {
                for (var key in res.hotel) {
                	if (res.hotel[key]) {
                        var item = res.hotel[key];
                        $('select[name="data[hotel]"]').append('<option value="' + item.id + '" data-date-min="'+item.date_min+'" data-date-max="'+item.date_max+'">' + item.title + '</option>');
					}
                }
            }

			//заполнение количества взрослых
			if (res.max_grownups) {
                for (var i = 1; i <= res.max_grownups; i++){
                    $('#grownups').append('<option value="'+i+'">'+i+'</option>');
                }
			}

			//заполнение количества детей
			if (res.max_children) {
                for (var i = 0; i <= res.max_children; i++){
                    $('#children').append('<option value="'+i+'">'+i+'</option>');
                }
			}

			//заполнение количества номеров с 1-местным размещением
			if (res.one_person_numbers) {
                for (var i = 0; i <= res.one_person_numbers; i++){
                    $('#one_person_numbers').append('<option value="'+i+'">'+i+'</option>');
                }
			}
		}
	});
	
	//отправка данных для подсчета стоимости
	var formData;
	$('.form-calc').on('submit',function(e){
		e.preventDefault();
        calculated(0);
        enabledSubmit();
	});
	
	//отметить все экскурсии
	$('.all_excursions').on('click', function(e) {
		e.preventDefault();
		$('.form-calc_city-block input').prop("checked", true);
        disabledSubmit();
	});
	
	//снять метки со всех экскурсий
	$('.clear_excursions').on('click', function(e) {
		e.preventDefault();
		$('.form-calc_city-block input').prop("checked", false);
        disabledSubmit();
	});

	//выбор отеля
    $('#hotel.form-calc_select-el').on('change', function(){
        if($('#hotel.form-calc_select-el option:selected').hasClass('disabled')) {
            $('.form-calc_date-el').parent('.form-calc_select-box').addClass('invalid');
            $('.price_note').html('Объект не доступен в выбранные даты. Пожалуйста, выберите другие даты или объект.').addClass('invalid');
        } else {
            $('.form-calc_date-el').parent('.form-calc_select-box').removeClass('invalid');
            $('.price_note').html('').removeClass('invalid');
        }
    });
	
	//показать / скрыть трансфер
	$('.form-calc_transfer-block #transfer').change(function(){
		if($(this).prop("checked")) {
			$('.form-calc_transfer-col.form-calc_select-box').css('display', 'block');
		} else{
			$('.form-calc_transfer-col.form-calc_select-box').css('display', 'none');
		}
	});

    $(document).on('change', '.form-calc_select-el, .form-calc_checkbox input', function () {
        disabledSubmit();
    });
	
	$('.form-calc_btn-edit').on('click', function() {
        calculated(1);
	});

	function calculated(status) {
		if(status === 0) {
            var btnCalc1 = $('.form-calc_btn-submit');
            var btnCalc2 = $('.form-calc_btn-request');
            var btnCalc3 = $('.form-calc_btn-edit');
		}
        formData = new FormData($('.form-calc').get(0)); //получение данных формы
        $(".form-calc input, .form-calc select").parent('.form-calc_select-box').removeClass('invalid');
        $.ajax({
            url: URL + '/wp-admin/admin-ajax.php?action=calculate-tour',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(res){
                var data = res.data;
                if(res.result){
                    for (var key in data.excursion_impossible) {
                        var id = data.excursion_impossible[key];
                        $('#city-'+id).attr('checked',false);
                    }

                    var total_price = data.excursion_price + data.feed_price + data.hotel_price + data.transfer_price; //сложение общей стоимости
                    $('.form-calc_price').html((total_price+' ').replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ")+" рублей*");
                    $('.price_note').html('* Ориентировочная стоимость путевки на '+data.total_peoples+' человек, в соответствие с выбранными вами параметрами. Окончательную стоимость уточняйте у вашего менеджера.').removeClass('invalid');
                    if(status === 0) {
                        btnCalc1.css('display','none');
                        btnCalc2.css('display','block');
                        btnCalc3.css('display','block');
					}
					if(status === 1) {
                        enabledSubmit();
					}
                } else {
                    for (var key in data) {
                        var item = data[key];
                        $('[name="data['+key+']"]').parent('.form-calc_select-box').addClass('invalid');
                        $('.price_note').html('Некоторые поля заполнены неверно!').addClass('invalid');
                    }
                    if (typeof res.message == "string") {
                        $('.price_note').html(res.message);
                    }
                }
            }
        });
    }
	
	//скрыть кнопку отправки формы если не приняты условия
	$('.form-calc_checkbox #agreement').change(function(){
		if($(this).prop("checked")) {
			$('.calc-popup_btn-submit').css('display', 'inline-block');
		} else{
			$('.calc-popup_btn-submit').css('display', 'none');
		}
	});
	
	$('.calc_submit_form').on('submit',function(e){
		e.preventDefault();
		if($('.form-calc_checkbox #agreement').prop("checked")) {
			var userData = $(this).serializeArray();
			if (typeof formData != "undefined") {
				userData.forEach(function(item){
					formData.append(item.name,item.value+"");
				});
				formData.append("submit_calc_form","1");
				$(".calc_submit_form input").css('border-color','#c4d9e2');
				$.ajax({
					url: '/wp-admin/admin-ajax.php?action=calculate-tour',
					type: 'POST',
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
					success: function(res){
						var data = res.data;
						if(res.result){
							$(".sect-10-calc").attr("type","button").html("Заявка успешно отправлена");
						} else {
							for (var key in data) {
								var item = data[key];
								$('[name="data['+key+']"]').parent('.calc-popup_input-text').addClass('invalid');
							}
						}
					}
				});
			}
		}
	});

    var dateFormat = "dd.mm.yy",
        dateSettings = {
            defaultDate: "+1w",
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: dateFormat
        },
        from = $("#first-date").datepicker(dateSettings).on( "change", function() {
            var inputDateFrom = getDate(this);
            to.datepicker("option", "minDate", inputDateFrom);
            disabledOptions(inputDateFrom / 1000);
            disabledSubmit();
        }),
        to = $("#last-date").datepicker(dateSettings).on("change", function() {
            var inputDateTo = getDate(this);
            from.datepicker("option", "maxDate", inputDateTo);
            disabledOptions(inputDateTo / 1000);
            disabledSubmit();
        });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value );
        } catch( error ) {
            date = null;
        }
        return date;
    }

    function disabledOptions(date) {
        $('select[name="data[hotel]"] option').each(function (i, el) {
            var min = $(el).data('date-min');
            var max = $(el).data('date-max');
            if(!(date > min && date < max)) {
                $(el).addClass('disabled');
            } else {
                $(el).removeClass('disabled');
            }

        });
    }

    var toggleSubmit = false;

    function disabledSubmit() {
        toggleSubmit = true;
        $('.form-calc_btn-request').attr('disabled', toggleSubmit);
    }

    function enabledSubmit() {
        toggleSubmit = false;
        $('.form-calc_btn-request').attr('disabled', toggleSubmit);
    }
	
});
