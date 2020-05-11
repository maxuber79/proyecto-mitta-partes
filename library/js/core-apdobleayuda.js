/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url_base = 'http://localhost/segurodobleayudaapi/';
var url_ws = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/quiero-prepararme/';
//url de sitio original
var urlCargaPlan = url_ws + 'ws-set-conexion.php';
var sistemaOperativo = '';
var navegador = '';
var dispositivo = 'PC';
$(document).ready( function() {
	$('#esperar').modal('show');
	setTimeout(function (inicio) {
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

//FUNCIONES
function comprarPlan(codplan) {
	jQuery('#esperar').modal('show');
	//console.log(codplan);
	var plan = pad(codplan.toString(), 2);
	jQuery('#cod_plan').val(plan);
	
	//API CRM
	/* var datos = {
		full_name: '. . .',
		email: '.',
		run: '.-.',
		phone: '900000000',
		edad: 18
	};
	var num_operacion = jQuery('#numero_operacion').val();
	apiCRM('ET01', 1, num_operacion, datos); */
	//API CRM
	
    //ser2
    var urlServicioDos = url_ws +"ws-set-conexion.php";
	//console.log('comprar plan');
	//debugger;
	var dbData = {
		option: 'servicio_dos',
		cod_plan: codplan,
		nombres: '. . .',
		run: '.-.',
		mail: '.',
		telefono: '.',
		edad: '18'
	};
	//AJAX
	jQuery.ajax({
		type: "POST",
		url: urlServicioDos,
		data: dbData,
		dataType: 'json',
		success: function (data) {
			if (data.estado == 'OK') {
				//console.log(data);
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

function cargarPlan() {
	//console.log('CARGAR PLAN');
	var urlCargaPlan = url_ws + 'ws-carga-plan.php';
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

			if (data.ValorUF !== '' || data.ValorUF !== null || data.ValorUF !== undefined ) {
				var fechaUF = data.FechaUF.split("T")[0].split("-");
				jQuery("#fecha_uf").html(fechaUF[2] + "/" + fechaUF[1] + "/" + fechaUF[0]);
				var valorUF = data.ValorUF.toString().replace(".", ",");
				jQuery("#valor_uf").html(numberFormat(valorUF));
				jQuery('#cot_edad').attr('max', data.EdadMaxima);
				jQuery("#numero_operacion").val(data.NumeroOperacion);

				var planes = data.Planes.Plan;
				var comparacion_planes = '';

				//planes
				jQuery.each(planes, function (e, plan) {
					//
					var cobertura = '';
					var coberturas = data.Coberturas.Cobertura;
				

					jQuery.each(coberturas, function (e, cob) {
						//validar por plan
						console.log(coberturas);

						//if (cob.Plan == planes[i].CodigoPlan) {
							if (cob.Plan == plan.CodigoPlan) {
							console.log('Tipo Cobertura');
							if (cob.TipoCober == 'C') {
								cobertura = cobertura + "<p class=\"card-text\"><i class=\"fa fa-check-circle box-icon\" aria-hidden=\"true\"></i><span class=\"sumary\">" + cob.DesCober + "<span class=\"value\">UF " + cob.MontoCob + "</span></span></p>";
							} else {
								  cobertura = cobertura + "<p class=\"card-text\"><i class=\"fa fa-check-circle box-icon\" aria-hidden=\"true\"></i><span class=\"sumary\">" + cob.DesCober + "</span></p>";
							}
						}
					});
					//



					comparacion_planes = comparacion_planes + "<div class=\"col-xs-12 col-sm-12 col-md-4 col-lg-4\"><div id=\"box-plan\" class=\"card box-plan bg-plan\"><div class=\"card-header\"><h3 class=\"title-header\">" + plan.DescripcionPlan + "</h3><div class=\"wrapper-values\"><span class=\"value-pesos\"><span class=\"peso\">$</span> <span id=\"valor_pesos_tres\" class=\"valor_pesos\">" + numberFormat(plan.PrimaPeso) + "</span><sub class=\"mes\">/mensual</sub></span><span class=\"value-uf\"><span class=\"uf\">UF</span> <span id=\"precio_tres\" class=\"valor_uf\">" + plan.Prima + "</span><sub class=\"mes\">/mensual</sub></span></div></div><div class=\"card-body\"><p class=\"card-text\">"+ cobertura +"</p></div><div class=\"card-footer\"><div class=\"wrapper-btn btn-center\"><input type=\"button\" class=\"btn btn-full success\" onclick=\"comprarPlan("+plan.CodigoPlan+");\" value=\"Comprar\"></div></div></div></div>";
				});

				$("#div_det_plan").append(comparacion_planes);
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

function numberFormat(num) {
    // Variable que contendra el resultado final
    var numero = num.toString();
    var resultado = "";
    // Si el numero empieza por el valor "-" (numero negativo)
    if (numero[0] == "-")
    {
        // Cogemos el numero eliminando los posibles puntos que tenga, y sin
        // el signo negativo
        nuevoNumero = numero.replace(/\./g, '').substring(1);
    } else {
        // Cogemos el numero eliminando los posibles puntos que tenga
        nuevoNumero = numero.replace(/\./g, '');
    }

    // Si tiene decimales, se los quitamos al numero
    if (numero.indexOf(",") >= 0)
        nuevoNumero = nuevoNumero.substring(0, nuevoNumero.indexOf(","));
    // Ponemos un punto cada 3 caracteres
    for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)
        resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + resultado;
    // Si tiene decimales, se lo añadimos al numero una vez forateado con 
    // los separadores de miles
    if (numero.indexOf(",") >= 0)
        resultado += numero.substring(numero.indexOf(","));
    if (numero[0] == "-")
    {
        // Devolvemos el valor añadiendo al inicio el signo negativo
        return "-" + resultado;
    } else {
        return resultado;
    }
}
//v1.3 20191017