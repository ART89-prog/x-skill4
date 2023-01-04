$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	$(document).on('change', '.error', function() {
        $(this).removeClass('error');
    })

    $('.js-form button').on('click', function(event){
        event.preventDefault();

        var dataForAjax = "action=form&";
        var addressForAjax = myajax.url;
        var valid = true;
        
        $(this).closest('form').find('input:not([type=submit]),textarea, select').each(function(i, elem) {
            if (this.value.length < 3 && $(this).hasClass('required')) {
                valid = false;
                $(this).addClass('error');
            }
            if ($(this).attr('name') == 'email' && $(this).hasClass('required')) {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if (!pattern.test($(this).val())) {
                    valid = false;
                    $(this).addClass('error');
                }
            }
            if ($(this).attr('name') == 'agree' && !$(this).prop("checked")) {
                $(this).addClass('error');
                valid = false;
            }

            if($(this).attr('name') == 'phone' && $(this).hasClass('required')) {
                if (!$(this).inputmask("isComplete"))
                {
                    valid = false;
                    $(this).addClass('error');
                }
            }  

            if($(this).attr('name') == 'radio' && $(this).prop("checked")) {
                if (i > 0) {
                    dataForAjax += '&';
                }
                dataForAjax += 'who=' + this.value;
            }  

            if (i > 0) {
                dataForAjax += '&';
            }
            dataForAjax += this.name + '=' + this.value;
        })

        if (!valid) {
            return false;
        }               

        $.ajax({
            type: 'POST',
            data: dataForAjax,
            url: addressForAjax,
            success: function(response) {
                $("form").trigger("reset");

                Fancybox.close()

                Fancybox.show([{
                    src: "#thanks",
                    type: 'inline'
                }])              
            }
        });      
    });

    

	var md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
        //$(".who_needs .item").data("aos-delay", "0");  
        let elements = document.querySelectorAll(".who_needs .item");      
        for (let elem of elements) {
		    elem.setAttribute("data-aos-delay", "100");
		}

		elements = document.querySelectorAll(".advantages .item");      
        for (let elem of elements) {
		    elem.setAttribute("data-aos-delay", "100");
		}
    }

	AOS.init();

	if($(".pre_title").length>0)
	{
		const scroller = scrollama();
		// setup the instance, pass callback functions
		scroller.setup({
			step: ".pre_title"
		})
		.onStepEnter((response) => {				
			setTimeout(() => $(response.element).removeClass("animate__heartBeat"), 0);
			setTimeout(() => $(response.element).addClass("animate__heartBeat"), 100);		
		})
		.onStepExit((response) => {	
		});

		//animate__fadeInUp

		// Заголовки
		if (window.innerWidth > 767) {
			const el = document.querySelectorAll('.js-key-features-badge')

			if (el.length) {
				el.forEach(element => {
					let parent = element.closest('.step'),
						scroller = scrollama()

					scroller.setup({
						step: parent,
						progress: true,
						offset: 1
					}).onStepProgress(response => {
						if (response.progress > 0.7) {
							element.style.setProperty('--progress', 1)
							parent.querySelector('.key-features__wrapper').style.setProperty('--progress', 1)
						} else {
							element.style.setProperty('--progress', response.progress)
							parent.querySelector('.key-features__wrapper').style.setProperty('--progress', response.progress)
						}
					})
				})
			}
		}
	}


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header .menu').toggleClass('show')
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')


	// Мини всплывающие окна
	$('.mini_modal_btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.modal_cont')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			parent.find('.mini_modal').addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('.mini_modal .close_btn').click((e) => {
		e.preventDefault()

		$('.mini_modal, .mini_modal_btn').removeClass('active')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}

	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline'
		}])
	})

	$('body').on('click', '.modal .close_btn', function (e) {
		e.preventDefault()

		Fancybox.close()
	})




	if (is_touch_device()) {
		// Подменю на тач скрине
		/*$('header .menu_item > a .arr').parent().addClass("sub_link");*/
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').on('click', function (e) {
			$('header .menu_item > a.sub_link').removeClass("active");
			$(this).addClass("active");
			const $dropdown = $(this).next();	
			console.log($dropdown.css('visibility'));		
			if ($dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')
				$dropdown.addClass('show')

				$('body').css('cursor', 'pointer')
			}
		})

		// Закрываем под. меню при клике за её пределами
		$(document).click((e) => {
			if ($(e.target).closest('.menu').length === 0) {
				$('header .menu .sub_menu').removeClass('show')

				$('body').css('cursor', 'default')
			}
		})

		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header .menu').removeClass('show')
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})






$(window).scroll(function () { // Когда страница прокручивается
	if($(".stats").length>0)
	{
	  	const scroller_num = scrollama();
		// setup the instance, pass callback functions
		scroller_num.setup({
			step: ".stats",
			offset: 0.8
		})
		.onStepEnter((response) => {				
			numAnimate()	
		})
		.onStepExit((response) => {	
		});
	}
});


function numAnimate(){
	$('.stats .item .val').spincrement({
        thousandSeparator: "",
        duration: 2000
    });
}



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})