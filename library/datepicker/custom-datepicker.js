$(document).ready(function() {
	$('.datepicker').datepicker({
		format: 'dd/mm/yyyy',
		language: 'es',
		autoclose: true,
		disableTouchKeyboard: true,
		Readonly: true
	});



	$(function() {
		var output = $('#output')[0];
		
		$(document).on('input', 'input[type="range"]', function(e) {
			  output.innerHTML = e.currentTarget.value;
		});
		
		$('input[type=range]').rangeslider({
		  polyfill: false
		});
	  });

});