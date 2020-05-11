var url_base = 'http://localhost/segurodobleayudaapi/';
$(document).ready(function () {

    $('#ben_rut').rut({
        required : false,
        error_html: true,
        fn_error: function (input) {
            if(input.val() !== ''){
                loadModal(1, 'Asegurado', 'El rut: ' + input.val() + ' es incorrecto', 1, '');
            }
        }
    });

	loadConfiguracion();
	//API CRM
	var datos;
	var num_operacion = jQuery('#numero_operacion').val();
	//apiCRM('ET04', 4, num_operacion, datos);

});
$('#btn_beneficiario').click(function (event) {
event.preventDefault();
var nombre = $('#ben_nombres');
var apellidos = $('#ben_apellidos');
var parentesco = $('#ben_parentesco');
var participacion = $('#ben_participacion');

var mail = $('#ben_email');
var celular = $('#ben_celular');
var run = $('#ben_rut');

var valRut = true;

if (run.val() !== '') {
    var fRut = $.rut.formatear(run.val());

    valRut = $.rut.validar(fRut);
}

if (valRut && nombre[0].checkValidity() && apellidos[0].checkValidity() && parentesco[0].checkValidity() && participacion[0].checkValidity()) {

    var part = $('#ben_total_participacion').val();
    console.log('Total Participacion');
    console.log(part);
    console.log('Participacion form');
    console.log(participacion.val());
    var suma = parseInt(part) + parseInt(participacion.val());
    console.log('% Participación');
    console.log(suma);
    if (suma <= 100) {
        if (suma == 100) {
            $('#form_beneficiarios').hide();
        }
        $('#ben_total_participacion').val(suma);
        $('#div_beneficiarios').show();
        //agregar beneficiario a la tabla
        var txtParentesco = $('#ben_parentesco option:selected').text();
        $('#tbl_beneficiarios > tbody').append('<tr><td><input type="hidden" id="mail" value="' + mail.val() + '"><input type="hidden" id="rut" value="' + fRut + '"><input type="hidden" id="celular" value="' + celular.val() + '"><input type="hidden" id="nombres" value="' + nombre.val() + '"><input type="hidden" id="nombres" value="' + nombre.val() + '"><input type="hidden" id="apellidos" value="' + apellidos.val() + '">' + nombre.val() + ' ' + apellidos.val() + '</td><td class="text-center"><input type="hidden" id="id_parentesco" value="' + parentesco.val() + '">' + txtParentesco + '</td><td class="text-center"><input type="hidden" id="val_participacion" value="' + participacion.val() + '">' + participacion.val() + '%</td><td class="text-center"><a class="table-icon" href="#" onclick="editarTR(this); return false;"><i class="fa fa-pencil-square-o modificar-icono"></i></a><a class="table-icon" href="#" onclick="eliminarTR(this); return false;"><i class="fa fa-user-times modificar-icono"></i></a></td></tr>');
        //Editar <a href="#" onclick="editarTR(tr); return false;"><span><i class="fa fa-pencil-square-o"></i></span></a>
        //limpiar datos del formulario
        nombre.val('');
        apellidos.val('');
        participacion.val('');
        mail.val('');
        celular.val('');
        run.val('');
        $('#ben_parentesco').prop('selectedIndex', 0);

    } else {
        loadModal(1, 'Beneficiario', '% de participación supera el 100%', 1, '');
    }
} else {
    if (!participacion[0].checkValidity()) {
		
        $(participacion).parent('div').addClass('has-error');
        $(participacion).focus();
	}
	

/* 	jQuery(function() {
		jQuery( "#formulario_de_prueba" ).validate({
				
	 }); */







    if (!parentesco[0].checkValidity()) {
        $(parentesco).parent('div').addClass('has-error');
        $(parentesco).focus();
    }

    if (!apellidos[0].checkValidity()) {
        $(apellidos).parent('div').addClass('has-error');
        $(apellidos).focus();
    }
    if (!nombre[0].checkValidity()) {
        $(nombre).parent('div').addClass('has-error');
        $(nombre).focus();
    }

    if (!valRut) {
        $(run).parent('div').addClass('has-error');
        $(run).focus();
    }
    loadModal(1, 'Beneficiario', 'Debe completar todos los campos obligatorios', 1, '');
}
});

$('#btn_comprar').click(function (event) {
	event.preventDefault();
	var urlBeneficiarios = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-datos-beneficiarios.php';
	var beneficiarios = new Array();
	var participacion = $('#ben_total_participacion').val();
	
	if (participacion == 100) {
		$('#tbl_beneficiarios tbody tr').each(function () {
			var nombre = $(this).find('#nombres').val();
			var apellidos = $(this).find('#apellidos').val();
			var participacion = $(this).find('#val_participacion').val();
			var parentesco = $(this).find('#id_parentesco').val();
			var rut = $(this).find('#rut').val();
			var beneficiario;
			if(rut === undefined || rut === 'undefined'){
				rut = '.-.';
			}
			beneficiario = {
				nombres: nombre,
				apellidos: apellidos,
				participacion: participacion,
				parentesco: parentesco,
				rut: rut
			};
			
			beneficiarios.push(beneficiario);
		});
		
		//API CRM
		//Beneficiarios CRM
		var beneficiariosCRM = new Array();
		$('#tbl_beneficiarios tbody tr').each(function () {
			var nombre = $(this).find('#nombres').val();
			var apellidos = $(this).find('#apellidos').val();
			var participacion = $(this).find('#val_participacion').val();
			var parentesco = $(this).find('#id_parentesco').val();
			var rut = $(this).find('#rut').val();
			var email = '.';
			if($(this).find('#mail').val() !== ''){
				email = $(this).find('#mail').val();
			}
			var celular = '900000000';
			if($(this).find('#celular').val() !== ''){
				celular = $(this).find('#celular').val();
			}
			var beneficiarioCRM;
			if(rut === undefined || rut === 'undefined'){
				rut = '.-.';
			}
			beneficiarioCRM = {
				nombres: nombre,
				apellidos: apellidos,
				participacion: participacion,
				parentesco: parentesco,
				rut: rut,
				email: email,
				phone: celular
			};
			
			beneficiariosCRM.push(beneficiarioCRM);
		});
		//Beneficiariso CRM
		var datosCRM = {
			beneficiarios: beneficiariosCRM
		};
		var num_operacion = jQuery('#numero_operacion').val();
		//apiCRM('ET05', 5 , num_operacion, datosCRM);
		//ajax
		var dbData = {
			option: 'lst_beneficiarios',
			etapa: 4,
			beneficiarios: beneficiarios
		};
		console.log(dbData);
		jQuery.ajax({
			type: "POST",
			url: urlBeneficiarios,
			data: dbData,
			dataType: 'json',
			async: false,
			success: function (data) {
				//console.log('Beneficiarios OK');
				window.location = url_base + 'confirmar-compra/';
			},
			error: function (result) {
				console.log(result);
			},
			failure: function (result) {
				console.log(result);
			}
		});
	} else {
		loadModal(2, 'Beneficiarios', 'Total de la participación debe ser igual a 100%', 1, '');
	}
});

$('#tab_asegurado').click(function () {
	window.location = url_base + 'asegurado/';
});

function editarTR(tr) {
	console.log('Editar');
	//debugger;
	var porcentaje = $(tr).parents("tr").find('#val_participacion').val();
	var totalPart = $('#ben_total_participacion').val();
	var diferencia = parseInt(totalPart) - parseInt(porcentaje);
	$('#ben_total_participacion').val(diferencia);
	if (diferencia == 0) {
		$('#div_beneficiarios').hide();
	}
	$('#form_beneficiarios').show();
	//Add valores al formulario para editarlos.
	$('#ben_nombres').val($(tr).parents("tr").find('#nombres').val());
	$('#ben_apellidos').val($(tr).parents("tr").find('#apellidos').val());
	$('#ben_parentesco').val($(tr).parents("tr").find('#id_parentesco').val());
	$('#ben_participacion').val($(tr).parents("tr").find('#val_participacion').val());
	$('#ben_email').val($(tr).parents("tr").find('#mail').val());
	$('#ben_celular').val($(tr).parents("tr").find('#celular').val());
	if($(tr).parents("tr").find('#rut').val() !== 'undefined'){
		$('#ben_rut').val($(tr).parents("tr").find('#rut').val());
	}
	
	$(tr).parents("tr").remove();
}

function confirmaEliminarTR(th) {
	var btnConfirma = "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-default\" onclick=\"eliminarTR(th); return false;\">OK</button>";
	loadModal(2, 'Beneficiarios', 'Esta seguro que desea eliminar el beneficiario', 0, btnConfirma);
}

function eliminarTR(th) {
	//event.preventDefault();
	console.log('eliminar');
	var porcentaje = $(th).parents("tr").find('#val_participacion').val();
	console.log(porcentaje);
	
	var totalPart = $('#ben_total_participacion').val();
	var diferencia = parseInt(totalPart) - parseInt(porcentaje);
	$('#ben_total_participacion').val(diferencia);
	$('#form_beneficiarios').show();
	if (diferencia == 0) {
		$('#div_beneficiarios').hide();
	}
	$(th).parents("tr").remove();
}

function loadConfiguracion(){
	//wizard
	$('#li_tarifa').removeClass('active');
	$('#tarifa').removeClass('active');
	$('#li_beneficiarios').addClass('active');
	$('#beneficiarios').addClass('active');
	$('.progress-bar').css('width', '75%');
}