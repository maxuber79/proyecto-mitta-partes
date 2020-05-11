jQuery(document).ready(function ($) { 
    $(window).scroll(function () { 
        var posicionMenu = $('#header').offset(); 
        if ($(this).scrollTop() > 500) { 
            $('#header').find('#target-form').addClass('show'); 
            $('#header').addClass('show-header');
            $(this).find('.custom-logo').attr('src', 'http://pruebasegurooncologico.segchile.cl/wp-content/uploads/2019/01/seg-chile-white.png');
        } else { 
            $('#target-form').removeClass('show'); 
            $('#header').removeClass('show-header');
        } 
    }); 
$('#target-form').click(function () { 
    $('html,body').animate({ 
        scrollTop: $('#banner-principal, #scroll_up').offset().top 
    }, 'slow'); 
        return false; 
    }); 
});
