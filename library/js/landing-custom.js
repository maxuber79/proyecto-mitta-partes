jQuery(document).ready(function($) {
	$(window).scroll(function(){
		var posicionMenu = $('#header').offset();
		if ($(this).scrollTop() > 230) {
			$('#header').find('#target-form').addClass('show');
			$('#scroll-top').removeClass('hidden-btn').addClass('show-btn');
			$('#header').addClass('show-header');

			$('.wrapper-secondbrand').removeClass('hide-logo').addClass('show-logo');
			$('.custom-logo-link').addClass('hide-logo');
		} else{
			$('#target-form').removeClass('show');
			$('#scroll-top').removeClass('show-btn').addClass('hidden-btn');
			 $('#header').removeClass('show-header');
			 
			 $('.wrapper-secondbrand').removeClass('show-logo').addClass('hide-logo');
			 $('.custom-logo-link').removeClass('hide-logo');
		}});
		
		$('#target-form').click(function(){
			$('html,body').animate({scrollTop: $('#banner-principal').offset().top
		},1000);
			return false;
		});
	$('#scroll-top').click(function () {
		$('html, body').animate({scrollTop: 0}, 1000);
		return false;
	});

	$('#target-planes, .btn-sumaries ').click(function(){
		$('html,body').animate({scrollTop: $('#planes').offset().top
	},1000);
		return false;
	});

	/* $('body').tooltip({   
		selector: "[data-toggle='tooltip']",
		container: "body"
	  })
		//Popover, activated by clicking
		.popover({
		selector: "[data-toggle='popover']",
		container: "body",
		html: true
	  }); */

	AOS.init();

	//flipper
	/* $('.box-beneficios, .box-operator').click(function() {
		$(this).toggleClass('flipped');
	 }); */

	/**
	* @flipped condiciones
	*/
	$('.box').click(function(){
		$(this).toggleClass('flipped');
	});

	/**
	* @Collapse Menus
	*/
	$('.feature, .link-condiciones').on('click', function () {
		$('.collapse').collapse('hide');
	});

	/**
	* @flipped Generico
	*/
	/*$(function() {
		$('.card').click(function(){$(this).toggleClass('flipped');});
	});*/

	/**
	* @OwlCarousel
	*/
	/* $(".owl-carousel").owlCarousel({
		loop: true,
		margin: 10,
		nav: true,
		navClass: [ 'owl-prev', 'owl-next' ],
		//navContainer: 'custom-nav',
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		dots: true,
		autoplay: true,
		autoplayHoverPause: true,
		responsive:{
			0:{
				items: 1,
			},
			600:{
				items: 2,
				
			},
			1000:{
				items: 4,
				autoplay: false,
				mouseDrag: false
				
			}
		}
	}); */
	
	/**
	* @reduccion de textos
	*/ 
		$(".textMore").on('click', function(e) {
			var textMore = $('#leadMore').text().length
			//alert(textMore);
			e.preventDefault();
			$('#alert_password').toggle('fast');
			
			//if ($(this).text() == "Leer menos...") {
			//	$(this).text("Leer mas...");
			//} else {
			//	$(this).text("Leer menos...");
			//}
		});
		$('.textMore').tooltip();

	/**
	 * @Floating-labels
	 */
	$('.ffl-wrapper').floatingFormLabels( {
		formElements: 'input, textarea, select'
	});

	
});

/* var app = new Vue({
	el: '#inner-asegurados',
	data: {
	  message: '<p class="hola mundo">Hello Vue!</p>'
	}
  }) */
