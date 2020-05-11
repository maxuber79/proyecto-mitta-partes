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

var url_ws = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/quiero-prepararme/';
//url de sitio original
var urlCargaPlan = url_ws + 'ws-set-conexion.php';
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

//FUNCIONES
function comprarPlan(codplan) {
    jQuery('#esperar').modal('show');
    console.log(codplan);
    var plan = pad(codplan.toString(), 2);
    jQuery('#cod_plan').val(plan);

    //ser2
    var urlServicioDos = url_ws +"ws-set-conexion.php";

    console.log('comprar plan');

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

function cargarPlan() {
	console.log('CARGAR PLAN');
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
			//console.log(data);
			if (data.ValorUF !== '' || data.ValorUF !== null || data.ValorUF !== undefined ) {

				var fechaUF = data.FechaUF.split("T")[0].split("-");
				jQuery("#fecha_uf").html(fechaUF[2] + "/" + fechaUF[1] + "/" + fechaUF[0]);
				var valorUF = data.ValorUF.toString().replace(".", ",");
				jQuery("#valor_uf").html(numberFormat(valorUF));
				jQuery('#cot_edad').attr('max', data.EdadMaxima);
				//debugger;
				var planes = data.Planes.Plan;
				var planes_arr = new Array();
				var rangos_arr = new Array();
				var edad_arr = new Array();
				var comparacion_cabecera = '';
				var comparacion_row = '';
				
				var comparacion_fila = '';
				var comparacion_comprar = '';
				jQuery.each(planes, function (i, item) {
					var comparacion_rangos = '';
					var comparacion_precios = '';
					//valor plan
					//debugger;
					switch(item.CodigoPlan){
						case '01':
							jQuery('.monto_uno').text(numberFormat(item.MontoPeso));
							break;
						case '02':
							jQuery('.monto_dos').text(numberFormat(item.MontoPeso));
							break;
						case '03':
							jQuery('.monto_tres').text(numberFormat(item.MontoPeso));
							break;
					}
					//var comparacion_planes = data.Planes.Plan;
					if(!planes_arr.includes(item.CodigoPlan)){
						planes_arr.push(item.CodigoPlan);
					}

					jQuery.each(planes, function (e, cob) {
						//validar por plan
						if (cob.CodigoPlan == item.CodigoPlan) {
							if(!comparacion_cabecera.includes(cob.DescripcionPlan)){
								comparacion_cabecera = comparacion_cabecera + "<div class=\"divTableCell text-head\">"+cob.DescripcionPlan+"</div>";
								comparacion_comprar = comparacion_comprar + "<div class=\"divTableCell btn-comprar\"><a href=\"#\" onclick=\"comprarPlan("+cob.CodigoPlan+");\" class=\"btn-get-started\">COMPRAR</a></div>";
							}
						}
					});
					//edades
					if(!rangos_arr.includes(item.CargMax)){
						rangos_arr.push(item.CargMax);
						
						var min = 18;
						if(item.CargaMin > 0){
							min = item.CargaMin;
						}
						var texto = "<div class=\"divTableCell edad\">" + min + " - " + item.CargMax + "</div>";
						var rangomaximo = item.CargMax;
						
						var rangos = {rango:rangomaximo,txt:texto};
						edad_arr.push(rangos);
					}
				});
				//precios
				jQuery.each(rangos_arr, function (e, edad) {
					var row = '';
					//console.log(edad);
					var edad_txt = '' + edad + '';
					//rango edad
					jQuery.each(edad_arr, function (e, obj) {
						if(obj.rango == edad){
							row = obj.txt;
						}
					});
					//valor plan
					jQuery.each(planes, function (e, objPlan) {
						if(objPlan.CargMax == edad){
							row = row + "<div class=\"divTableCell valor-pesos\">$" + numberFormat(objPlan.PrimaPeso) + " <sub class=\"uf\">/ " + objPlan.Prima + " UF</sub></div>";
						}
					});
					comparacion_row = comparacion_row + "<div class=\"divTableRow\">" + row + "</div>";
				});
				//
				comparacion_cabecera = "<div class=\"divTableRow bg-table\" ><div class=\"divTableCell text-head\">Edad</div>" + comparacion_cabecera + "</div>";
				var row_comprar = "<div class=\"divTableRow\"><div class=\"divTableCell celda\">&nbsp;</div>" + comparacion_comprar + "</div>";
				var comparacion_div = comparacion_cabecera + comparacion_row + row_comprar;
				//append div compara precios
				$("#div_compara_precios").append(comparacion_div);
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