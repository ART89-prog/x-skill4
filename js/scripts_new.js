$(() => {

    Fancybox.defaults.autoFocus = false
    Fancybox.defaults.dragToClose = false

    $("header .btn a").on('click', function(event){
        event.preventDefault();
        Fancybox.close()

        Fancybox.show([{
            src: "#demo",
            type: 'inline'
        }])   
    });




    // Фото с маркерами
	$('.image .btn').click(function(e){
		e.preventDefault()

		let parent = $(this).closest('.image')
		let info = $(this).data('info')

		if( $(this).parents('.item').hasClass('active') ) {
			parent.find('.item').removeClass('active')
			parent.find('.info').hide()
		} else {
			parent.find('.item').removeClass('active')
			parent.find('.info').hide()

			$(this).parents('.item').addClass('active')
			parent.find(info).fadeIn(300)
		}
	})

	$('.image .close').click(function(e){
		e.preventDefault()

		let parent = $(this).closest('.image')

		parent.find('.item').removeClass('active')
		parent.find('.info').hide()
	})



	if ('function' === typeof MediaPlayer) {
		[].forEach.call(document.querySelectorAll('audio[controls]'), function (media) {
			player = media.player = new MediaPlayer(media, {
				svgs: {
					play: 'images/sprite.svg#ic_play',
					pause: 'images/sprite.svg#ic_pause',
				},
			})
		})		
	}


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

    
    if($(".slider").length>0){
        $('.slider').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1279,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }


    $('.help-search .vacancy.accordion .block_head button').click(function(){
		$('.help-search .vacancy.accordion .data').slideToggle(300); 
	});


    if ('function' === typeof MediaPlayer) {
		[].forEach.call(document.querySelectorAll('audio[controls]'), function (media) {
			player = media.player = new MediaPlayer(media, {
				svgs: {
				    play: 'https://xskill.com/wp-content/themes/raten/images/sprite.svg#ic_play',
					pause: 'https://xskill.com/wp-content/themes/raten/images/sprite.svg#ic_pause'
				},
			})
		})		
	}


    

    $("#js_number_student").ionRangeSlider({  
        from: 9,
        values: [5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,110,120,130,140,150,175,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,3000,3500,4000,4500,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,20000,25000,30000,40000,45000,50000],
        skin: "round",
        onChange: function (data) {
            calculate()
        },
    });

    $("#js_our_courses").ionRangeSlider({        
        min: 1,
        max: 4,
        from: 2,
        step: 1,
        skin: "round",
        onChange: function (data) {
            calculate()
        },
    });

    $("#js_trainer").ionRangeSlider({        
        min: 5,
        max: 30,
        from: 10,
        step: 1,
        skin: "round",
        onChange: function (data) {
            calculate()
        },
    });

    $("#js_simulator").ionRangeSlider({        
        min: 1,
        max: 8,
        from: 4,
        step: 1,
        skin: "round",
        onChange: function (data) {
            calculate()
        },
    });

    $(".js_our_courses").on('change', function (e) {
        $(".our_courser_hide").slideToggle();
        calculate()
    })

    $(".js_trainer").on('change', function (e) {
        $(".trainer_hide").slideToggle();
        calculate()
    })

    $(".js_simulator").on('change', function (e) {
        $(".simulator_hide").slideToggle();
        calculate()
    })

    $(".js_check").on('change', function (e) {        
        calculate()
    })

    $(".js_admin").on('change', function (e) {        
        calculate()
    })
    
    calculate()
})

function calculate(){
    let number_student = $("#js_number_student").val();
    let total = 0
    let base_cost = 125;
    // базовая стоимость

    if(number_student<10)
    {
    	base_cost = 1000;
    }	
    else if(number_student<20)
    {
    	base_cost = 900;
    }	
    else if(number_student<30)
    {
    	base_cost = 800;
    }
	else if(number_student<50)
    {
    	base_cost = 700;
    }	
    else if(number_student<100)
    {
    	base_cost = 600;
    }
	else if(number_student<500)
    {
    	base_cost = 500;
    }
	else if(number_student<1500)
    {
    	base_cost = 400;
    }	
    else{
    	base_cost = 300;
    }

    $(".js-base").html(number_student*base_cost+" руб. <br><i>"+base_cost+" руб. для "+number_student+" чел.</i>"); 
    $(".js-count-student").text(number_student);

    total += number_student*base_cost;

    // если курсы выбраны
    if($(".js_our_courses").prop("checked")){
        let out_courses = $("#js_our_courses").val();
        $(".js-count-courses").html(out_courses *10000 +" руб.<br><i>+"+out_courses+" курса по softskills для "+number_student+"  чел.</i>");

        total += 10000*out_courses;

        // если установлена проверка ДЗ
        /*if($(".js_check").prop("checked")){
            $(".js-check").text("Да");
            total += number_student*500*out_courses;
        }
        else
        {
            $(".js-check").text("Нет");
        }*/

    }
    else
    {
        $(".js-count-courses").text(0);
        //$(".js-check").text("Нет");
    }
	
	     // если симуляторы выбраны
    if($(".js_simulator").prop("checked")){
        let simulator = $("#js_simulator").val();
        $(".js-simulator").html(5000*simulator+" руб.<br><i>+"+simulator+" аудио-книги кратко для "+number_student+" чел.</i>");      
        total += 5000*simulator; 
    }
    else
    {
        $(".js-simulator").text(0);     
    }

    // если тренажеры выбраны
    if($(".js_trainer").prop("checked")){
        let trainer = $("#js_trainer").val();
        $(".js-trainer").html(3000*trainer+" руб.<br><i>+"+trainer+" актуальных тренажеров для "+number_student+" чел.</i>");      
        total += 3000*trainer; 
    }
    else
    {
        $(".js-trainer").text(0);     
    }




    /*if($(".js_admin").prop("checked")){  */     
   /*     $(".js-admin").html(number_student * 30 + " руб.<br><i>30 руб. * "+number_student+" чел.</i>");       
        total += number_student * 30; */
    /*}
    else
    {
        $(".js-admin").text("Нет");     
    }  */  
/*
    if($(".js_admin").prop("checked")){      
        $(".js-admin2").html("&nbsp;0 руб.<br><i>бесплатно</i>");      
    }
    else
    {
        $(".js-admin2").text("Нет");     
    } 
*/
    if(total<15000)
    {
        total = 15000;
    }
    $(".js-sum").text(total)


}