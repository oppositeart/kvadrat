$(function(){
	
	// Browser resize
	$(window).resize(function(){
		sliderSize();
		mediaCntSize();
	});
	// Spinner
	spinner();
	// Spinner only numeric
	spinnerNumeric();
	// Modal window
	modalWindow();
	// Header Menu scroll
	headerScroll();
	// Mobile Menu
	mobileMenu();
	// Tabs
	tabsCreate();
	// Slider
	slider();
	//Checkbox
	checkbox();
	// Place inputs
	placeInputs();
	// Map popUp
	mapMarkClick();
});

// All images loaded
$(window).load(function(){
	sliderSize();
	mediaCntSize();
});

$(document).scroll(function(){
	modalFixedScroll();
});

// Size image container in Press content
function mediaCntSize(){
	$('.press .media').each(function(){
		$(this).height($(this).children('img').height());
		if ($(this).css('position') == 'absolute') {
			$(this).siblings('.description').css({'marginTop': $(this).height() + 40});
		}
		else {
			$(this).siblings('.description').css({'marginTop': 0});
		}
	});
}

// Spinner
function spinner(){
	var modalSpinner = $('.modal .spinner');
	modalSpinner.before('<div class="btn minus">-</div>');
	modalSpinner.after('<div class="btn plus">+</div>');
	$('.modal .input .btn').on('click', function() {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();

		if ($button.hasClass('plus')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
		// Don't allow decrementing below zero
		if (oldValue > 0) {
			var newVal = parseFloat(oldValue) - 1;
		} else {
			newVal = 0;
		}
	}
	  $button.parent().find('input').val(newVal);
	});
}

// Spinner only numeric
function spinnerNumeric(){
	$('.modal .spinner').keydown(function(e){
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) || 
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	});
}

// Modal window
function modalWindow(){
	var modal = $('.modal');
	var modalBg = modal.prev();
	$('.order-btn').click(function(){
		modalBg.fadeTo(500, 1, function(){
			$(this).show();
		});
		modal.css({'left': ($(window).width() / 2) - (modal.innerWidth() / 2)});
		modal.fadeTo(500, 1, function(){
			$(this).show();
		});
		modal.children('.close').click(function(){
			$(this).parent().hide();
			modalBg.hide();
		})
		modalBg.click(function(){
			modal.hide();
			modalBg.hide();
		});
	});
	
	$('.modal .btn.order').click(function(){
		var modalThx = $('.modal-thx');
		var modalThxBg = modalThx.prev();
		modalThxBg.fadeTo(500, 1, function(){
			$(this).show();
		});
		modalThx.css({'left': ($(window).width() / 2) - (modalThx.innerWidth() / 2)});
		modalThx.fadeTo(500, 1, function(){
			$(this).show();
			setTimeout(hide, 3000);
			modalThxBg.click(hide);
			function hide(){
				modalThx.hide();
				modalThxBg.hide();
				modal.hide();
				modalBg.hide();
			}
		});
	});
}

// Scroll restrict
function modalFixedScroll(){
	var modal = $('.modal');
	if ($(document).scrollTop() > (modal.scrollTop() + modal.innerHeight() - $(window).height() + 60) && modal.css('display') == 'block') {
		$(document).scrollTop(modal.scrollTop() + modal.innerHeight() - $(window).height() + 60);
	}
}

// Header Menu scroll
function headerScroll(){
	var header = $('.header');
	$(document).scroll(function(){
		if ($(document).scrollTop() > 0 && !header.hasClass('scroll')) {
			header.addClass('scroll');
		}
		if ($(document).scrollTop() <= 0 && header.hasClass('scroll')) {
			header.removeClass('scroll');
		}
	});
}

// Mobile Menu
function mobileMenu(){
	$('.menu-icon').click(function(){
		var body = $('body');
		var menu = $('.mobile-menu');
		
		if (body.css('position') !== 'absolute') {
			body.css({'position': 'absolute', 'left': menu.width() + 50});
			menu.height(body.height());
			menu.show();
			menu.click(function(){
				body.css({'position': 'initial', 'left': '0'});
				menu.hide();
			});
		}
		else {
			body.css({'position': 'initial', 'left': '0'});
			menu.height('auto');
			menu.hide();
		}
	});
}

// Tabs
function tabsCreate(){
	$('.tabs li').click(function(){
		$(this).siblings('.active').each(function(){
			$(this).removeClass('active');
		})
		$(this).parent().siblings('.item-container').children('.content.active').each(function(){
			$(this).removeClass('active');
		})
		$(this).addClass('active');
		$(this).parent().siblings('.item-container').children('.content:eq(' + $(this).index() +')').addClass('active');
	});
}

// Slider
var bxSlider;
function slider(){
	bxSlider = $('.slider').bxSlider({
		pager: false,
		responsive: false,
		onSliderLoad: function(){
			var slideImg = $('.bx-wrapper li img');
			if (slideImg.width() < $('.bx-wrapper').width()) {
				slideImg.css({'width': '100%', 'height': 'auto'});
			}
			if (slideImg.height() < $('.bx-wrapper').height()) {
				slideImg.css({'width': 'auto', 'height': '100%'});
			}
		}
	});
}

// Change slider size
function sliderSize(){
	bxSlider.reloadSlider();
}

// Checkbox
function checkbox(){
	$('.bill-menu input').iCheck({
		handle: 'checkbox'
	});
}

// Place inputs
function placeInputs(){
	if ($(window).width() <= 640) {
		$('.bill-menu .icheckbox').each(function(){
			$(this).siblings('.description').children('.title').prepend($(this));
		});
	}
}

// Map popUp
function mapMarkClick(){
	$('.restaurant .mark').click(function(){
		if ($(this).hasClass('show')) {
			$(this).removeClass('show');
		}
		else {
			$(this).addClass('show');
			if ($(this).offset().left < 200) {
				$(this).children('.description').css('left', 30);
			}
			else {
				$(this).children('.description').css('right', -30);
			}
		}
	});
}