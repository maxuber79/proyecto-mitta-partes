/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Array Asistencias y Coberturas
 * */
var url_base = 'http://localhost/segurodobleayudaapi/';

var itemUno = "<div class=\"lista-beneficios\"><p class=\"card-text\"><i class=\"fa fa-check-circle icono-check\" aria-hidden=\"true\"></i> <strong><span class=\"beneficio featured-text\">Retorno al país por razones médicas hasta</span> <span class=\"value\">USD 30.000*</span><strong></p><p class=\"card-text\"><i class=\"fa fa-check-circle icono-check\" aria-hidden=\"true\"></i> <span class=\"beneficio\">Asistencia Médica por Accidentes hasta</span> <span class=\"value\">USD 8.000</span></p><p class=\"card-text\"><i class=\"fa fa-check-circle icono-check\" aria-hidden=\"true\"></i> <span class=\"beneficio\">Asistencia Médica por Enfermedad no preexistente</span><span class=\"value\">USD 8.000</span></p><p class=\"card-text\"><i class=\"fa fa-check-circle icono-check\" aria-hidden=\"true\"></i> <span class=\"beneficio\">Gastos odontológicos de urgencia hasta</span> <span class=\"value\">USD 300</span></p></div>";
var itemDos = "<div class=\"card-body\"><p class=\"card-text\">Asistencia Médica por Accidentes <br><span class=\"value\">€ 30.000</span></p><p class=\"card-text\">Asistencia Médica por Enfermedad <br><span class=\"value\">€ 30.000</span></p><p class=\"card-text\">Gastos Odontología de Urgencia <br><span class=\"value\">€ 1.200</span></p><p class=\"card-text\">Reembolso de Gastos por Vuelo Demorado <br><span class=\"value\">€ 100</span></p></div>";
var itemTres = "<div class=\"card-body\"><p class=\"card-text\">Asistencia Médica por Accidentes <br><span class=\"value\">USD 60.000</span></p><p class=\"card-text\">Asistencia Médica por Enfermedad <br><span class=\"value\">USD 60.000</span></p><p class=\"card-text\">Gastos Odontología de Urgencia <br><span class=\"value\">USD 3.000</span></p><p class=\"card-text\">Reembolso de Gastos por Vuelo Demorado <br><span class=\"value\">USD 400</span></p></div>";
var coberturas = [itemUno, itemDos,itemTres];

var urlSitioWS = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/';
//url de sitio original
var urlCargaPlan = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws/ws-set-conexion.php';
var sistemaOperativo = '';
var navegador = '';
var dispositivo = 'PC';
$(document).ready( function() {
	$('#cot_rut').rut({
		error_html: true,
		fn_error: function (input) {
			alert('El rut: ' + input.val() + ' es incorrecto.');
			//loadModal(1, 'Asegurado', 'El rut: ' + input.val() + ' es incorrecto', 1, '');
		}
	});

	$('#esperar').modal('show');
	setTimeout(function (inicio) {
		//console.log('inicio del modal');
		$('#esperar').modal('hide');
	}, 5000);
	function myStopFunction() {
  		clearTimeout(inicio);
	}
    var ua = new UAParser();
    //SO                                                                                               
    sistemaOperativo = ua.getOS().name + ' ' + ua.getOS().version;
    //Navegador
    navegador = ua.getBrowser().name + ' ' + ua.getBrowser().version;

    //Dispositivo
    if (ua.getDevice().type !== undefined) {
        dispositivo = ua.getDevice().type + ' ' + ua.getDevice().vendor + ' ' + ua.getDevice().model;
    }
	cargarPlan();
    
});

//eventos click
$(document).ready(function(){
    $('#btn_cotizar').on('click', function(e) {
        e.preventDefault(); 
        var value = '<div class="invalid-feedback">Debe ingresar un teléfono valido.</div>';

        var fullname = $('#cot_fullname');
		var rut = $('#cot_rut');
        var email = $('#cot_email');
        var edad = $('#cot_edad');
		var phone = $('#cot_celular');
		
		 var plan = jQuery('#cod_plan').val();//falta input

        var forms = $('.needs-validation');
		
        var fRut = $.rut.formatear(rut.val());
        var valRut = $.rut.validar(fRut);

        if (fullname[0].checkValidity() && valRut && email[0].checkValidity() && edad[0].checkValidity()) {
            var error = false;
            
            //Iniciar modal en evento cotizar click
            var nombreCompleto = $.trim(fullname.val());
            
            if (nombreCompleto.length < 3) {
                fullname.val('');
                forms.addClass('was-validated');
                fullname.focus();
                error = true;
            }
            
            var contieneclass = $('#spinner-wait').hasClass( 'hidden-spinner' );

            if ( !error ) { 
 				
				$('#esperar').modal('show');     

                //guardado de datos
                var urlGuardaDatos = urlSitioWS + 'ws-set-conexion.php';
                var objCotiza = {
					option: 'cotiza_plan',
					cod_plan: plan,
					nombres: fullname.val(),
					run: rut.val(),
					mail: email.val(),
					telefono: phone.val(),
					edad: edad.val()
				};     

                //AJAX UNO
                jQuery.ajax({
                    type: "POST",
                    url: urlGuardaDatos,
                    data: objCotiza,
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                    
                        console.log('carga_plan_cotiza');
                        console.log(data);	
						//Scroll to div planes
						$('html, body').animate({
    						scrollTop: $('#div_plan').offset().top
  						}, 1000)
						
                        //Mostrar el div de los planes
						$('#div_plan').slideDown('slow', function() {
                        	$('#esperar').modal('hide');
                    	}); ;
						
						 $('html, body').animate({
                            scrollTop: $('#div_plan').offset().top -50
                          }, 1000);

                         // mensaje de envio email usuario
                         $('#info-alert').fadeTo(8000, 400).slideUp(500, function() { 
                            $(this).slideUp(500);
                         });
						
                        
                    },
                    error: function (result) {
                        console.log(result);
                    },
                    failure: function (result) {
                        console.log(result);
                    }
                });
                                                
            }
            
        } else {
            
            forms.addClass('was-validated');	
            
            if (!fullname[0].checkValidity()) {
                fullname.focus();
                console.log('input vacio');
            }
            if (!edad[0].checkValidity()) {
                edad.focus();
                console.log('input vacio');
            }
            if (!email[0].checkValidity()) {
                email.focus();
                console.log('input vacio');
            }	
            
        }
        
    });
});
//FUNCIONES
function comprarPlan(codplan) {
    jQuery('#esperar').modal('show');
    console.log(codplan);
    var plan = pad(codplan.toString(), 2);
    jQuery('#cod_plan').val(plan);

    var run = jQuery('#cot_rut').val().replace('.', '').replace('.', '').split("-");
    var rut = run[0];
    console.log(rut);

    //ser2
    var urlServicioDos = urlSitioWS +"ws-set-conexion.php";

    console.log('comprar plan');

    var fullname = $('#cot_fullname');
		var rut = $('#cot_rut');
        var email = $('#cot_email');
        var edad = $('#cot_edad');
		var phone = $('#cot_celular');
	
    var forms = $('.needs-validation');
    
    var fRut = $.rut.formatear(rut.val());

    var valRut = $.rut.validar(fRut);

    if (fullname[0].checkValidity() && edad[0].checkValidity() && email[0].checkValidity()) {
        //validar 3 nombres 

        var nombreCompleto = $.trim(fullname.val());

        if (nombreCompleto.replace(/ +(?= )/g, '').split(" ").length < 3) {
            fullName.val('');
            forms.addClass('was-validated');
            fullname.focus();
            error = true;

        } else {

            var dbData = {
                option: 'servicio_dos',
                cod_plan: codplan,
                nombres: fullname.val(),
                run: rut.val(),
                mail: email.val(),
                telefono: phone.val(),
                edad: edad.val()
            };

            //AJAX
            jQuery.ajax({
                type: "POST",
                url: urlServicioDos,
                data: dbData,
                dataType: 'json',
                success: function (data) {
                    if (data.estado == 'OK') {
                        console.log(data);
						window.location = url_base + 'asegurado/';
                    } else {
                        console.log(data.mensaje);
                    }
                },
                error: function (result) {
                    console.log(result);
                },
                failure: function (result) {
                    console.log(result);
                }
            });
        }

    } else {
        forms.addClass('was-validated');
        if (!fullName[0].checkValidity()) {
            console.log('falta nombre');
        }

        if (valRut) {
            console.log('falta rut');
            jQuery('.rut-container').append('<div class="invalid-feedback">Debe ingresar un rut valido.</div>')
        }
        if (!email[0].checkValidity()) {
            console.log('falta email');
        }

        alert('Debe completar los campos obligatorios');
    }
}

function cargarPlan() {
	console.log('CARGAR PLAN');
	var urlCargaPlan = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/asistenciaenviaje/ws-carga-plan.php';//urlSitioWS + 'ws-carga-plan.php';
	var dbData = {
		option: 'carga_plan',
		so: sistemaOperativo,
		navegador: navegador,
		dispositivo: dispositivo
	};
	//ajax
	jQuery.ajax({
		type: "POST",
		url: urlCargaPlan,
		data: dbData,
		dataType: 'json',
		success: function (data) {
			console.log(data);
			if (data.ValorUF !== '' || data.ValorUF !== null || data.ValorUF !== undefined ) {

				var fechaUF = data.FechaUF.split("T")[0].split("-");
				jQuery("#fecha_uf").html(fechaUF[2] + "/" + fechaUF[1] + "/" + fechaUF[0]);
				var valorUF = data.ValorUF.toString().replace(".", ",");
				jQuery("#valor_uf").html(numberFormat(valorUF));
				jQuery('#cot_edad').attr('max', data.EdadMaxima);
				
				var planes = data.Planes.Plan;
				jQuery.each(planes, function (i, item) {
					//
					var cobertura = '';
					var coberturas = data.Coberturas.Cobertura;
					jQuery.each(coberturas, function (e, cob) {
                        
						//validar por plan
						if (cob.Plan == planes[i].CodigoPlan) {
							console.log('Tipo Cobertura');
							if (cob.TipoCober == 'C') {
								cobertura = cobertura + "<p class=\"card-text\"><i class=\"fa fa-check-circle box-icon\" aria-hidden=\"true\"></i><span class=\"sumary\">" + cob.DesCober + "</span><span class=\"value\">UF " + cob.MontoCob + "</span></p>";
							} else {
								  cobertura = cobertura + "<p class=\"card-text\"><i class=\"fa fa-check-circle box-icon\" aria-hidden=\"true\"></i><span class=\"sumary\">" + cob.DesCober + "</span></p>";
							}
						}
					});
					//

					var plan ="<div class=\"col-xs-12 col-sm-12 col-md-4 col-lg-4\"><div id=\"box-plan\" class=\"card box-plan\"><div class=\"card-header\"><span class=\"highlighted\">"+ planes[i].DescripcionPlan +"</span></div><div class=\"card-body\"><p class=\"card-text\">"+ cobertura +"</p></div><div class=\"card-footer\"><div class=\"wrapper-uf\"><span class=\"style-pesos\">$ <span id=\"valor_pesos_tres\" class=\"valor_pesos_tres\">"+ numberFormat(Math.round(planes[i].PrimaPeso)) +"</span></span><span class=\"value-uf\">UF <span id=\"precio_tres\" class=\"precio_tres\">"+ planes[i].Prima +"</span></span></div><div class=\"wrapper-btn\"><input type=\"button\" class=\"btn btn-cotizar\" onclick=\"comprarPlan("+ planes[i].CodigoPlan +");\" value=\"Comprar\"></div></div></div></div>";
					$("#div_det_plan").append(plan);
				});
				$('#esperar').modal('hide');

			} else {
				console.log(data.mensaje);
			}
		},
		error: function (result) {
			console.log(result);
		},
		failure: function (result) {
			console.log(result);
		}
	});
}

function check(input) {

    var characterReg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    var inputVal = $(input).val();
    if (characterReg.test(inputVal)) {
        $(input).val(inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
    }
}
//v1.3 20191017