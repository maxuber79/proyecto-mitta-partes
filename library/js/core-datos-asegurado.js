var urlSite = 'http://localhost/segurodobleayudaapi/';

$(document).ready(function () {
	setCampos();
    loadConfiguration();
	$('#esperar').modal('show');
    setTimeout(function () {
        $('#esperar').modal("hide");
    }, 2000);
	
	// limpiar inputs de inicio
	$('#aseg_nombres').val('');
	$('#aseg_email').val('');
	
	dummyCotiza();
	
});

$('#btn_asegurado').on('click', function (e) {
    //tomamos valores desde input
    var nombres = $('#aseg_nombres');
    var run = $('#aseg_run');
    var fechaNacimiento = $('#aseg_fec_nacimiento');
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    if (regex.test($('#aseg_email').val().trim())) {
        alert('Correo validado');
    } else {
        alert('La direccón de correo no es válida');
    }

    e.preventDefault();
    //validar rut
    var ruuun = $.rut.formatear(run.val());
    var runn = $.rut.validar(ruuun);

    if (nombres[0].checkValidity() && runn && fechaNacimiento[0].checkValidity()) {

        var rut = run.val().replace('.', '').replace('.', '');
        var fecha = fechaNacimiento.val();
        var rute = $('#tr_edicion').val();
        var cantAseg = $('#cantidad_asegurados').text();
        var aseg = cantAseg;

        if ((rute === run.val())) {
            if (parseInt(cantAseg) > 0) {
                aseg = parseInt(cantAseg) - 1;
            }
            if (parseInt(aseg) == 0) {
                $('#mensaje-asegurados').hide();
                $('#mostrarAddasegurados').hide();
                $('#addAsegurado').hide();
            }
        }
        if (rute === '') {
            if (parseInt(cantAseg) > 0) {
                aseg = parseInt(cantAseg) - 1;
            }
        }

        if (parseInt(aseg) == 0) {
            $('#mensaje-asegurados').hide();
            $('#mostrarAddasegurados').hide();
            $('#addAsegurado').hide();
            $('#btn_continuar').show();
        } else {
            $('#btn_continuar').hide();
        }
        var cantidadtxt = $('#cot_asegurados').val();

        if (parseInt(cantidadtxt) == 3 && parseInt(aseg) == 2) {
            $('#btn_continuar').show();
        }
        if (parseInt(cantidadtxt) == 4 && parseInt(aseg) == 2) {
            $('#btn_continuar').show();
        }

        $('#cantidad_asegurados').text(aseg);

        if (parseInt(aseg) === 1) {
            $('#texto_asegurodos').text('asegurado');
        }
        $('#tr_edicion').val('');
        //-------------------------------
        var rute = run.val().replace('.', '').replace('.', '').split('-')[0];
        var rut_grilla = rute;
        $('#fila_' + rut_grilla + '').remove();
        $('#tbl_asegurados').find('.mostrarGrillaAsegurados').append('<div class="col-xs-12" style="margin:5px 0" id="fila_' + rut_grilla + '"><a href="#" id="grilla_cliente" onclick="activePagador(this); return false;" class="seleccion_asegurado"><div class="col-xs-2 col-sm-1 col-md-1 text-center"><span id="icon-pagador" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Haz seleccionado al pagador"></span></div><div class="col-xs-6 col-sm-4 col-md-4"><input type="hidden" id="rut" value="' + run.val() + '"><input type="hidden" id="nombres" value="' + nombres.val() + '"><input type="hidden" id="fec_nacimiento" value="' + fechaNacimiento.val() + '"><span class="value-grilla text-capitalize">' + nombres.val() + '</span></div><div class="hidden-xs col-sm-2 col-md-2"><span class="value-grilla tdocultar">' + run.val() + '</span></div><div class="hidden-xs col-sm-2 col-md-2"><span class="value-grilla tdocultar">' + fecha + '</span></div><div class="col-xs-4 col-sm-3 col-md-3"><div class="wrapper-btnGrilla"><button onclick="editarTR(this); return false;" class="btn-grilla"><i class="fa fa-pencil-square-o modificar-icono"></i> <span class="hidden-xs">Modificar</span></button><button onclick="confirmaEliminarTR(\'' + run.val() + '\'); return false;" class="btn-grilla"><i class="fa fa-minus-circle modificar-icono"></i> <span class="hidden-xs">Eliminar</span></button></div></div></a></div>');
        $('#div_table_asegurados').show();
        //-------------------------------
        //limpiar datos del formulario
        nombres.val('');
        run.val('');
        fechaNacimiento.val('');

    } else {
        var mensaje = '';
        var separador = '';

        if (!fechaNacimiento[0].checkValidity()) {
            mensaje = 'Fecha de nacimiento es obligatoria.';
            separador = '<br>';
            $(fechaNacimiento).parent('div').addClass('has-error');
            $(fechaNacimiento).focus();
        }

        if (!nombres[0].checkValidity()) {
            mensaje = 'Nombre y apellido es obligatorio.' + separador + mensaje;
            separador = '<br>';
            $(nombres).parent('div').addClass('has-error');
            $(nombres).focus();
        }

        if (!runn) {
            mensaje = 'Rut es obligatorio.' + separador + mensaje;
            separador = '<br>';
            $(run).parent('div').addClass('has-error');
            $(run).focus();
        }

        loadModal(2, 'Asegurados', mensaje, 1, '');
    }
});

$('#btn_pagar').on('click', function (e) {
	e.preventDefault();
    // mostrar modal wait
    $('#esperar').modal('show');
    setTimeout(function () {
        $('#esperar').modal("hide");
    }, 5000);
    //validar input contratante
    var existe_pagador = false;
   $('.seleccion_asegurado').each(function(){
	   // check class
	   if( $(this).hasClass('active-pagador') ){
		   existe_pagador = true;
	   }
   });
	var rut;
    var nombre;
	if(existe_pagador){
		rut = $(".active-pagador").find('#rut');
		nombre = $('.active-pagador').find('#nombres');
	}else{
		rut = $('#nombre_pagador');
		nombre = $('#run_pagador');
	}
	
    var phone = $('#contratante_fono');
    var mail = $('#contratante_mail');
    var remail = $('#contratante_mail_confirmar');
    var ruuun = $.rut.formatear(rut.val());
    var runv = $.rut.validar(ruuun);
    e.preventDefault();

    if (runv && mail[0].checkValidity() && remail[0].checkValidity() && phone[0].checkValidity()) {
        //SI redireccionar a webpay
        var urlContratante = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/asistenciaenviaje/ws-up-contratante.php';
        var urlWebpay = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/asistenciaenviaje/ws-webpay.php';
        var urlCotizacion = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/asistenciaenviaje/ws-up-cotizacion.php';
        var dbWebPay = {option: 'webpay'};

        saveInsurance();
		
        var rutc = rut.val().split('-');
        var fechaini = $('#date_ini').val().replace('/', '').replace('/', '');
        var fechafin = $('#date_fin').val().replace('/', '').replace('/', '');
        var objContratante = {
            option: 'up-contratante',
            rut: rutc[0].toString().replace('.', '').replace('.', ''),
            dv: rutc[1],
            nombre: nombre.val(),
            email: mail.val(),
            phone: phone.val(),
            fechaini: fechaini,
            fechafin: fechafin
        };

        var objCotizacion = {
            option: 'up-contizacion',
            nombre: nombre.val(),
            phone: phone.val()
        };

        if (mail.val() === remail.val()) {
            //ajax up cotizacion
            jQuery.ajax({
                type: "POST",
                url: urlCotizacion,
                data: objCotizacion,
                dataType: 'json',
                success: function (data) {
                    //console.log('UP Cotizacion');
                    //console.log(data);
                },
                error: function (result) {
                    console.log(result);
                },
                failure: function (result) {
                    console.log(result);
                }
            });
            //actualizar contratante
            //ajax actualizar contratante
            jQuery.ajax({
                type: "POST",
                url: urlContratante,
                data: objContratante,
                dataType: 'json',
                async: false,
                success: function (data) {

                },
                error: function (result) {
                    console.log(result);
                },
                failure: function (result) {
                    console.log(result);
                }
            });
            //ajax webpay
            jQuery.ajax({
                type: "POST",
                url: urlWebpay,
                data: dbWebPay,
                dataType: 'json',
                success: function (data) {
                    if (data.estado === 'OK') {
                        var exito = data.retorno.Parminput.TBK_URL_EXITO;
                        var URL = data.retorno.Parminput.URL;
                        URL = URL.replace(exito, urlSite + 'validar-pago/?oc=');
                        //URL = URL.replace('tbk-normal', 'tbk-normal_SG');
                        window.location = URL;
                    }
                },
                error: function (result) {
                    console.log(result);
                },
                failure: function (result) {
                    console.log(result);
                }
            });
        } else {
            //alert('E-mail no coinciden');
            loadModal(2, 'Asegurados', 'E-mail no coinciden', 1, '');
            $(mail).parent('div').addClass('has-error');
            $(remail).parent('div').addClass('has-error');
            $(remail).focus();
        }
    } else {
        var mensaje = '';
        var separador = '';

        if (!runv) {
            $(rut).parent('div').addClass('has-error');
            $(rut).focus();
            mensaje = 'Campo Rut es obligatorio.';
            separador = '<br>';
        }

        if (!nombre[0].checkValidity()) {
            $(nombre).parent('div').addClass('has-error');
            $(nombre).focus();
            mensaje = mensaje + separador + 'Campo Nombre es obligatorio.';
            separador = '<br>';
        }

        if (!phone[0].checkValidity()) {
            $(phone).parent('div').addClass('has-error');
            $(phone).focus();
            var tel = phone.val().trim();
            if (tel.length < 9 && tel.length > 0) {
                mensaje = mensaje + separador + 'Campo Teléfono no tiene el formato correcto.';
                separador = '<br>';
            } else {
                mensaje = mensaje + separador + 'Campo Teléfono es obligatorio.';
                separador = '<br>';
            }
        }

        if (!mail[0].checkValidity()) {
            $(mail).parent('div').addClass('has-error');
            $(mail).focus();
            mensaje = mensaje + separador + 'Campo E-Mail es obligatorio.';
            separador = '<br>';
        }

        if (!remail[0].checkValidity()) {
            $(remail).parent('div').addClass('has-error');
            $(remail).focus();
            mensaje = mensaje + separador + 'Campo Confirmar E- Mail es obligatorio.';
            separador = '<br>';
        }

        //NO mensajes al usuario
        //alert(mensaje);
        loadModal(2, 'Asegurados', mensaje, 1, '');
    }
});

/* 
 * @ MOSTAR INPUTS DEL PAGADOR
 */
$('#ingresarPagador').on('click', function (e) {
    e.preventDefault();
	$('#nombre_pagador').prop('required',true);
    $('.wrp-addPagador').slideToggle('fast', function () {
        console.log('mostrar el pagador');
		$('#grilla_cliente').removeClass('active-pagador');
		//$('#icon-pagador').html().remove();		
		$('#icon-pagador').empty()
		
    });
});

/* 
 * @ SELECCIONAR ROW DEL PAGADOR EN LISTA DE ASEGURADOS
 */
var pagador = $('#grilla_pagador');
var pagadorclass = $('#grilla_pagador').hasClass('active-pagador');

function activePagador(row) {
	
	var row_pagador = $('#grilla_cliente');
	var buscandoRut = row_pagador.find('#rut').val();
	console.log(buscandoRut);
	var rute = buscandoRut.replace('.', '').replace('.', '').split('-')[0];
	//console.log(rute);
	var rut_grilla = rute;
	//console.log(rut_grilla);
    $('.active-pagador').removeClass('active-pagador');
	$('.d-inline-block').each(function(){
	   // check class
	   $(this).empty();
		  
   });
	$('').empty();
    $(row).toggleClass('active-pagador');
	var icono = '<i class="fas fa-credit-card fa-lg"></i>';    
	$('.active-pagador').find('#icon-pagador').html(icono);
	
}

//new script
$('#mas_asegurados').click(function (e) {
    e.preventDefault();
    $('#form_asegurado').show();
});

//datos contratante
$('#contratante_rut').blur(function () {
    var rutContratante = $('#contratante_rut').val().toString().replace('.', '').replace('.', '').replace('-', '');
    getDatos(rutContratante);
});
$('#date_ini').blur(function () {
    var date = $('#date_ini').val();

    if (date.length === 8 && date.indexOf('/') < 0) {

        var day = date.substring(0, 2);
        var month = date.substring(2, 4);
        var year = date.substring(4, date.length);
        var fecha = day + '/' + month + '/' + year;
        $('#date_ini').val(fecha);
    }

    var valid = validarFechaIni();
    if (valid) {
        $('#btn_continuar').show();
        var cant = $('#cantidad_asegurados').text();

        if (parseInt(cant) > 0) {
            $('#addAsegurado').show();
            $('#mostrarAddasegurados').collapse('show');
        }
    } else {
        $('#btn_continuar').hide();
        $('#addAsegurado').hide();
        $('#mostrarAddasegurados').collapse('hide');
    }
});

//modificacion cotizacion
$('#dias_cot').change(function () {
    actualizarDias();
    calcularPrima();
});
$('#viajeros_cot').change(function () {
    actualizarViajeros();
    calcularPrima();
});

$('#coberturas').click(function () {
    var cobertura = $('#coberturas').is(':checked');
    if (cobertura) {
        $("#btn_pagar").prop('disabled', false);
    } else {
        $("#btn_pagar").prop('disabled', true);
    }
});

$('#aseg_run').blur(function () {
    loadConfiguration();
});

function loadConfiguration() {

    $('#aseg_run').rut({
        error_html: true,
        fn_error: function (input) {
            $('#aseg_run').addClass('is-invalid');
            $('#aseg_run').removeClass('is-valid');
            $('#aseg_run').removeClass('was-validated form-control:valid');
        },
        fn_validado: function (input) {
            $('#aseg_run').removeClass('is-invalid');
            $('#aseg_run').addClass('is-valid');
        }
    });
	
	var ruuun = $.rut.formatear(jQuery('#aseg_run').val());
	var run = ruuun.replace('.', '').replace('.', '').split("-");
	var rut = run[0];
	var codplan = '01';
    var cantAseg = $('#cantidad_asegurados').text();

    if (parseInt(cantAseg) === 1) {
        $('#texto_asegurodos').text('asegurado');
    }

    var asegurados = $('#cot_asegurados').val();
    var aseguradostxt = $('#cot_asegurados_txt').val();
    var dias = $('#cot_dias').val();
    var diastxt = $('#cot_dias_txt').val();

    $('#dias_cot').prop('selectedIndex', dias);
    $('#dias_cot option[value="' + dias + '"]').text(diastxt);
    $('#dias_cot_pagar option[value="' + dias + '"]').text(diastxt);
    $('#viajeros_cot').prop('selectedIndex', asegurados);
    $('#viajeros_cot option[value="' + asegurados + '"]').text(aseguradostxt);
    $('#dias_cot_pagar').prop('selectedIndex', dias);
    $('#viajeros_cot_pagar').prop('selectedIndex', asegurados);
    $('#viajeros_cot_pagar option[value="' + asegurados + '"]').text(aseguradostxt);
    $("#btn_pagar").prop('disabled', true);
    //buscar ensesion rut y codigo plan
    var urlValidaUsuario = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-valida-cliente.php';
    var dbDataUsu = {
        option: 'valida_usuario',
        rut: rut,
        codigo_plan: codplan
    };

    jQuery.ajax({
        type: "POST",
        url: urlValidaUsuario,
        data: dbDataUsu,
        dataType: 'json',
        async: false,
        success: function (data) {
            //98 session cerrada
            if (data.Mensajes.MensajeItem.Id == 80) {
                jQuery('#div_genero').show();
                jQuery('#div_recontrasena').show();
                jQuery('#div_autorizo').show();
                jQuery('#div_tyc').show();
                jQuery('#div_domicilio').show();
                jQuery('#div_aseg_contrasena').show();
                jQuery('#div_fec_nacimiento').show();
                jQuery('#div_olvidar_contrasena').hide();//new seleccion
                jQuery('.user_new').show();// new seleccion
               /* $('#alert_password').fadeTo(8000, 400).slideUp(500, function() { //new seleccion
                    $(this).slideUp(9000);
                 });*/

				jQuery('#div_recontrasena').show();
                jQuery('#div_deportes').show();
                
				//console.log('Registro');
				//mostrar solo input para usuario que necesite registrarse
				jQuery('#btn_continuar').hide();
				jQuery('#btn_registro').show();
				
			}
			if (data.Mensajes.MensajeItem.Id == 0) {
				//console.log('Login');
				//ocultar campos de registro
				//Sololectura
				//ocultar
				jQuery('#div_genero').hide();
				jQuery('#div_recontrasena').hide();
				jQuery('#div_autorizo').hide(); 
				jQuery('#div_tyc').hide(); 
				jQuery('#div_domicilio').hide();
				//mostrar botón 
                jQuery('#div_fec_nacimiento').show();
                //jQuery('#div_fec_nacimiento').show();

                jQuery('#div_olvidar_contrasena').show();//nueva seleccion
                jQuery('.user_old').show();
                
  

                jQuery('#div_aseg_contrasena').show();                
				jQuery('#div_deportes').show();
				if(data.Sdt_datosclienteventawp.Genero == 'Femenino'){
					jQuery('#reg_genero1').prop('checked',true);
				} else {
					jQuery('#reg_genero2').prop('checked',true);
				}
				jQuery('#btn_registro').hide();
				jQuery('#btn_continuar').show();
			}

			if (data.Mensajes.MensajeItem.Id == 98) {
				console.log('Session Cerrada');
				//mensaje al usaurio y retornar al inicio
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

function setCampos(){
	//INI ocultar todos los campos
	jQuery('#div_fec_nacimiento').hide();
	jQuery('#div_aseg_contrasena').hide();
    jQuery('#div_deportes').hide();
    jQuery('#div_olvidar_contrasena').hide();//nueva seleccion
    jQuery('.user_new').hide();
    jQuery('.user_old').hide();
    jQuery('#alert_password').hide();

	jQuery('#div_dps').hide();
	jQuery('#div_genero').hide();
	jQuery('#div_recontrasena').hide();
	jQuery('#div_autorizo').hide();
	jQuery('#div_tyc').hide();
	jQuery('#div_domicilio').hide();
	jQuery('#reg_genero1').hide();
	jQuery('#reg_genero2').hide();
	jQuery('#btn_registro').hide();
	jQuery('#btn_continuar').hide();
	//FIN ocultar todos los campos
}

function calcularPrima() {
    //nuevo plan
    var urlCambioPlan = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/asistenciaenviaje/ws-set-cambio-plan.php';
    var dbCambioPLan = {
        option: 'cambio_plan',
        etapa: '2'
    };
    jQuery.ajax({
        type: "POST",
        url: urlCambioPlan,
        data: dbCambioPLan,
        dataType: 'json',
        success: function (data) {
            var valorUf = $('#cot_valorUF').val();
            var valorPesos = valorUf * data.retorno.Salida.Dato6;
            var primaUF = data.retorno.Salida.Dato6;
            $('#det_prima_uf').html(primaUF);
            $('#det_prima_pesos').html(valorPesos);
        },
        error: function (result) {
            console.log(result);
        },
        failure: function (result) {
            console.log(result);
        }
    });
}

//modificacion cotizacion
function editarTR(tr) {
    var cantAseg = $('#cantidad_asegurados').text();
    var aseg = cantAseg;
    aseg = parseInt(cantAseg) + 1;

    if (parseInt(aseg) > 0) {
        $('#mensaje-asegurados').show();
        $('#mostrarAddasegurados').show();
    }

    $('#cantidad_asegurados').text(aseg);
    $('#btn_continuar').hide();

    //Add valores al formulario para editarlos.
    $('#aseg_nombres').val($(tr).parents("a").find('#nombres').val());
    $('#aseg_fec_nacimiento').val($(tr).parents("a").find('#fec_nacimiento').val());
    $('#aseg_run').val($(tr).parents("a").find('#rut').val());
    //temp rut
    var rute = $(tr).parents("a").find('#rut').val();
    $('#tr_edicion').val(rute);
}

function eliminarTR() {
    //event.preventDefault();
    var rutEliminar = $('#rut_eliminar').val();
    $('#form_beneficiarios').show();
    var aseguradosTbl = 0;
    var rute = rutEliminar.replace('.', '').replace('.', '').split('-')[0];
    var rut_grilla = rute;
    $('#fila_' + rut_grilla + '').remove();
    var tbl = aseguradosTbl - 1;
    if (tbl === 0) {
        $('#btn_continuar').hide();
    }

    //sumar un asegurado
    var cantAseg = $('#cantidad_asegurados').text();
    var aseg = cantAseg;
    aseg = parseInt(cantAseg) + 1;
    $('#cantidad_asegurados').text(aseg);

    if (parseInt(aseg) === 1) {
        $('#texto_asegurodos').text('asegurado');
    }

    if (parseInt(aseg) > 0) {
        $('#mensaje-asegurados').show();
        $('#addAsegurado').show();
    }
}

function confirmaEliminarTR(th) {
    $('#rut_eliminar').val(th);
    var btnConfirma = "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-default\" onclick=\"eliminarTR(); return false;\">OK</button>";

    loadModal(2, 'Asegurados', 'Está seguro que desea eliminar el asegurado', 0, btnConfirma);
}

function formatearRUT() {
    var runTemp = $('#aseg_run').val();
    var rt = runTemp.split("-");
    var rUno = '';
    var rDos = '';
    var rTres = '';

    try {
        if (!rt[0].toString().includes('.')) {
            if (rt[0].length == 7) {
                rUno = rt[0].substring(0, 1);
                rDos = rt[0].substring(1, 4);
                rTres = rt[0].substring(4, 7);
            } else {
                rUno = rt[0].substring(0, 2);
                rDos = rt[0].substring(2, 5);
                rTres = rt[0].substring(5, 8);
            }
            var rDv = rt[1];
            $('#aseg_run').val(rUno + '.' + rDos + '.' + rTres + '-' + rDv);
        }
    }
    catch (error) {
        if (!rt[0].toString().indexOf('.') > -1) {
            if (rt[0].length == 7) {
                rUno = rt[0].substring(0, 1);
                rDos = rt[0].substring(1, 4);
                rTres = rt[0].substring(4, 7);
            } else {
                rUno = rt[0].substring(0, 2);
                rDos = rt[0].substring(2, 5);
                rTres = rt[0].substring(5, 8);
            }
            var rDv = rt[1];
            $('#aseg_run').val(rUno + '.' + rDos + '.' + rTres + '-' + rDv);
        }
    }
}

function verificaContratante() {

    var rutWS = $('#ws_rut').val();
    var rut = $('#aseg_run').val();
    var existe = false;

    if (rut.includes(".")) {
        rut = rut.replace('.', '').replace('.', '');
    }

    if (rut.includes("-")) {
        var arr = rut.split('-');
        rut = arr[0];
    } else {
        var largo = rut.length;
        var end = largo - 1;

        rut = rut.substring(0, end);
    }
    //validamos que no exista
    $('#tbl_asegurados tbody tr').each(function () {

        var rutTbl = $(this).find('#rut').val();

        if (rutTbl.includes(".")) {
            rutTbl = rutTbl.replace('.', '').replace('.', '');
        }

        if (rutTbl.includes("-")) {
            var arr = rutTbl.split('-');
            rutTbl = arr[0];
        } else {
            var largo = rutTbl.length;
            var end = largo - 1;
            rutTbl = rutTbl.substring(0, end);
        }
        if (rutTbl === rut) {
            loadModal(2, 'Asegurados', 'Rut ya ingresado.', 1, '');
            existe = true;
            return true;
        }
    });
    //validamos que no exista
    if (existe) {
        $('#aseg_run').val('');
    } else {
        if (rut === rutWS) {
            var nombre = $('#ws_nombre').val() + ' ' + $('#ws_apepat').val() + ' ' + $('#ws_apemat').val();
            var genero = $('#ws_genero').val();
            var fecha = $('#ws_fecha').val().split('T');

            $('#aseg_nombres').val(nombre); //nombre completo
            $('#aseg_genero').val(genero); //genero
            $('#aseg_fec_nacimiento').val(fecha[0]); //
            //ocultamos select relación familiar
            $('#aseg_parentesco').val('03');
            $('#aseg_parentesco').parent().parent().hide();

        }
    }
}

function getDatos(rutC) {

    $('#tbl_asegurados tbody tr td').each(function () {
        var nombres = $(this).find('#nombres').val();
        if (nombres !== undefined) {
            var rut = $(this).find('#rut').val().toString().replace('.', '').replace('.', '').replace('-', '');

            if (rut === rutC) {
                if (nombres !== undefined) {
                    $('#contratante_nombre').val(nombres);

                }
            }
        }
    });
}


function validarFechaIni() {
    var temp = new Date();
    var hoy = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
    var iniTemp = $('#date_ini').val().split('/');
    var mes = parseInt(iniTemp[1]) - 1;
    var ini = new Date(iniTemp[2], mes, iniTemp[0]);

    if (!(ini.getTime() >= hoy.getTime())) {
        loadModal(2, 'Fecha inicio viaje', 'Fecha inicio viaje debe ser igual o mayor a la fecha de hoy.', 1, '');
        return false;
    } else {
        var day = pad(ini.getDate(), 2);
        var month = pad(ini.getMonth() + 1, 2);
        var year = pad(ini.getFullYear(), 2);
        $('#date_ini_pagar').val(day + '/' + month + '/' + year);
        return true;
    }
}


$('#addAsegurado').click(function (e) {
    e.preventDefault();
    $('#mostrarAddasegurados').show();
});


function IsNumeric(input, keyCode) {
    if (keyCode == 16) {
        isShift = true;
    }
    //Allow only Numeric Keys.
    if (((keyCode >= 48 && keyCode <= 57) || keyCode == 8 || keyCode <= 37 || keyCode <= 39 || (keyCode >= 96 && keyCode <= 105)) && isShift == false) {
        if ((input.value.length == 2 || input.value.length == 5) && keyCode != 8) {
            input.value += seperator;
        }
        return true;
    }
    else {
        return false;
    }
}

function ValidateDateFormat(input, keyCode) {
    var dateString = input.value;
    if (keyCode == 16) {
        isShift = false;
    }
    var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    //Check whether valid dd/MM/yyyy Date Format.
    if (regex.test(dateString) || dateString.length == 0) {
        ShowHideError(input, "none");
    } else {
        ShowHideError(input, "block");
    }
}

function ShowHideError(textbox, display) {
    var row = textbox.parentNode.parentNode;
    var errorMsg = row.getElementsByTagName("span")[0];
    if (errorMsg != null) {
        errorMsg.style.display = display;
    }
}

//validacion fecha en input
//optimizada para movil
var isShift = false;
var seperator = "/";

$('#date_ini').keypress(function () {
    var inputs = $('#date_ini');

    //Loop through all INPUT elements.
    for (var i = 0; i < inputs.length; i++) {
        //Check whether the INPUT element is TextBox.
        if (inputs[i].type == "text") {
            //Check whether Date Format Validation is required.
            if (inputs[i].className.indexOf("date-format") != 1) {

                //Set Max Length.
                inputs[i].setAttribute("maxlength", 10);

                //Only allow Numeric Keys.
                inputs[i].onkeydown = function (e) {
                    return IsNumeric(this, e.keyCode);
                };

                //Validate Date as User types.
                inputs[i].onkeyup = function (e) {
                    ValidateDateFormat(this, e.keyCode);
                };
            }
        }
    }
});

$('#aseg_fec_nacimiento').keypress(function () {
    var inputs = $('#aseg_fec_nacimiento');

    //Loop through all INPUT elements.
    for (var i = 0; i < inputs.length; i++) {
        //Check whether the INPUT element is TextBox.
        if (inputs[i].type == "text") {
            //Check whether Date Format Validation is required.
            if (inputs[i].className.indexOf("date-format") != 1) {

                //Set Max Length.
                inputs[i].setAttribute("maxlength", 10);

                //Only allow Numeric Keys.
                inputs[i].onkeydown = function (e) {
                    return IsNumeric(this, e.keyCode);
                };

                //Validate Date as User types.
                inputs[i].onkeyup = function (e) {
                    ValidateDateFormat(this, e.keyCode);
                };
            }
        }
    }
});

$('#aseg_fec_nacimiento').blur(function () {
    var date = $('#aseg_fec_nacimiento').val();

    if (date.length === 8 && date.indexOf('/') < 0) {

        var day = date.substring(0, 2);
        var month = date.substring(2, 4);
        var year = date.substring(4, date.length);
        var fecha = day + '/' + month + '/' + year;
        $('#aseg_fec_nacimiento').val(fecha);
    }
});

function saveInsurance() {
    var urlAsegurados = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/asistenciaenviaje/ws-datos-asegurados.php';
    var asegurados = new Array();
    // mostrar modal wait
    $('#esperar').modal('show');
    setTimeout(function () {
        console.log('inicio del modal');
        $('#esperar').modal("hide");
    }, 5000);
    //---------------------------
    //contar la cantidad de asegurados y contrastarlo con el valor edad de sesion-
    var cantAsegurados = 0;
    var maxEdad = 18;

    $('.seleccion_asegurado').each(function () {
        var nombres = $(this).find('#nombres').val();
        if (nombres !== undefined) {
            var rut = $(this).find('#rut').val();
            rut = rut.toString().replace('.', '').replace('.', '');
            var fecha = $(this).find('#fec_nacimiento').val().replace('/', '').replace('/', '');

            if (nombres !== undefined) {
                var asegurado = {
                    nombres: nombres,
                    fecha_nacimiento: fecha,
                    rut: rut
                };

                asegurados.push(asegurado);
                cantAsegurados = cantAsegurados + 1;
            }
        }
    });
    //fechas viaje
    var fechaini = $('#date_ini').val().replace('/', '').replace('/', '');
    var fechafin = $('#date_fin').val().replace('/', '').replace('/', '');
    var dbAsegurados = {
        option: 'lst_beneficiarios',
        etapa: 2,
        fechaini: fechaini,
        fechafin: fechafin,
        asegurados: asegurados
    };

    //Ajax
    jQuery.ajax({
        type: "POST",
        url: urlAsegurados,
        data: dbAsegurados,
        dataType: 'json',
        async: false,
        success: function (data) {
            //activar tab pagador
            $('#li_tarifa').removeClass('active');
            $('#tarifa').removeClass('active');
            $('#li_contratacion').addClass('active');
            $('#contratacion').addClass('active');
            $('.progress-bar').css('width', '75%');
        },
        error: function (result) {
            console.log(result);
        },
        failure: function (result) {
            console.log(result);
        }
    });

    var cotAsegurados = jQuery('#cot_asegurados').val();
    var cotAseguradostxt = $('#cot_asegurados_txt').val();
    var cotEdad = jQuery('#cot_edad').val();

    //guardar asegurados en session
    //modificar valor plan
    //modificar valor cantidad asegurados y recargar página
    //al recargar página leer sesion para cargar los asegurados ya registrados.
    jQuery('#cot_asegurados').val(cantAsegurados);
    jQuery('#cot_edad').val(maxEdad);
    jQuery('#det_cantidad').html(cantAsegurados);
    jQuery('#det_edad').html(maxEdad);
    //----------------------------------------
    $('#div_table_asegurados').hide();
    $('#div_contratante').show();
}

//declaracion de deportes
jQuery('#check_deportes_no').click(function () {
        if (jQuery('#check_deportes_no').is(':checked')) {
            console.log('Seleccionado');
            jQuery('#btn_continuar').prop('disabled', false);
			jQuery('#btn_registro').prop('disabled', false);
        } else {
            console.log('No seleccionado');
            jQuery('#btn_continuar').prop('disabled', true);
			jQuery('#btn_registro').prop('disabled', true);
        }
    });

jQuery('#check_deportes_si').click(function () {
    if (jQuery('#check_deportes_si').is(':checked')) {
        console.log('Seleccionado');
        jQuery('#btn_continuar').prop('disabled', false);
        jQuery('#btn_registro').prop('disabled', false);

    } else {
        console.log('No seleccionado');
        jQuery('#btn_continuar').prop('disabled', true);
        jQuery('#btn_registro').prop('disabled', true);
    }
});

jQuery('input[name=declaracion]').click(function () {
    if (jQuery('#declaracion_si').is(':checked')) {
        console.log('Si - Seleccionado');
        jQuery('#si_declaracion').show(); //.prop('disabled', false);
        jQuery('#no_declaracion').hide();
        jQuery('#btn_continuar').prop('disabled', true);
        jQuery('#btn_registro').prop('disabled', true);
        jQuery('#check_deportes_si').prop("checked", false);
        jQuery('#check_deportes_no').prop("checked", false);
    }

    if (jQuery('#declaracion_no').is(':checked')) {
        console.log('No - seleccionado');
        jQuery('#no_declaracion').show(); //prop('disabled', true);
        jQuery('#si_declaracion').hide();
        jQuery('#btn_continuar').prop('disabled', true);
        jQuery('#btn_registro').prop('disabled', true);
        jQuery('#check_deportes_si').prop("checked", false);
        jQuery('#check_deportes_no').prop("checked", false);
    }
});

$('#btn_continuar').click(function (event) {
    event.preventDefault();
    debugger;
    var urlLogin = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/login-segchile/ws-login.php';
    var rutV = $.rut.formatear($('#aseg_run').val());
    var rut = rutV.replace('.', '').replace('.', '').split('-');
    var password = $('#aseg_contrasena');
    var run = rut[0];
    //validar rut y pass no esten vacios
    if (password[0].checkValidity()) {
        var dbData = {
            option: 'login_usuario',
            rut: run,
            pass: password.val()
        };
        jQuery.ajax({
            type: "POST",
            url: urlLogin,
            data: dbData,
            dataType: 'json',
            async: false,
            success: function (data) {
                debugger;
                //TODO eliminar
                setDatosContratante();
                identificacionCliente();
                //TODO eliminar

                /*Borrar comentarios
                switch (data.Mensajes.MensajeItem.Id) {
                	case '0':
                		//console.log(data);
                		//llamar a metodo que guarda declaracion
                		setDatosContratante();
                		identificacionCliente();
                		//API CRM
                		break;
                	case '81':
                		alert('La contraseña ingresada es incorrecta');
                		break;
                	default:
                		alert('Ocurrió un error al logearse');
                		break;
                }*/
                $('#esperar').modal('hide');
            },
            error: function (result) {
                console.log(result);
            },
            failure: function (result) {
                console.log(result);
            }
        });
    } else {
        alert('Rut y Clave son obligatorias.');
    }
});

$('#btn_registro').click(function (event) {
    event.preventDefault();
    var urlCreaUsuario = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/login-segchile/ws-set-usuario.php';
    var forms = $('.needs-validation');
    var rut = $('#aseg_run');
    var nombre = $('#aseg_nombres');
    //todo ver division nombre apellidos
    var telefono = $('#reg_telefono');
    var email = $('#aseg_email');
    var fnacimiento = $('#aseg_fec_nacimiento');
    var pass = $('#aseg_contrasena');
    var repass = $('#aseg_recontrasena');
    var tyc = $('#reg_tyc');
    var genero = $('input:radio[name=reg_genero]:checked');
    var autorizo = $('input:radio[name=reg_publicidad]:checked');
    var residencia = $('input:radio[name=reg_residencia]:checked');
    var rutV = $.rut.validar($.rut.formatear(rut.val()));

    if (nombre[0].checkValidity() && rutV && email[0].checkValidity() && pass[0].checkValidity() && repass[0].checkValidity() && tyc[0].checkValidity() && autorizo[0].checkValidity()) {
        if (pass.val() === repass.val() && pass.val().length > 5) {
            var ap = $.trim(nombre.val());
            var run = rut.val().replace('.', '').replace('.', '').split("-")[0];
            var dv = rut.val().split("-")[1];
            ap = ap.toString().split(" ");
            var apaterno = '.';
            var amaterno = '.';
            var gene = '1';
            if (genero.val() == 'M') {
                gene = '2';
            }
            var dbData = {
                option: 'crea_usuario',
                rut: run,
                dv: dv,
                nombres: nombre.val(),
                apellidop: apaterno,
                apellidom: amaterno,
                fecha: fnacimiento.val(),
                mail: email.val(),
                pass: pass.val(),
                genero: gene,
                autorizo: autorizo.val()
            };
            jQuery.ajax({
                type: "POST",
                url: urlCreaUsuario,
                data: dbData,
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        console.log('Usuario creado correctamente.');
                        setDatosContratante();
                        //API CRM
                        identificacionCliente();
                    } else {
                        console.log('Error al crear usuario');
                    }
                },
                error: function (result) {
                    console.log(result);
                },
                failure: function (result) {
                    console.log(result);
                }
            });
        } else {
            alert('Contraseñas no coinciden.');
        }
    } else {
        forms.addClass('was-validated');
    }
});

function setDatosContratante() {
    event.preventDefault();
    var urlDatos = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-set-datos.php';
    var nombres = $('#aseg_nombres');
    var run = $('#aseg_run');
    var fechaNacimiento = $('#aseg_fec_nacimiento');
    var genero = $("input[type='radio'][name='reg_genero']:checked");
    var mail = $('#aseg_email');
    var runn = $.rut.validar(run.val());

    if (nombres[0].checkValidity() && runn && fechaNacimiento[0].checkValidity() && genero && mail[0].checkValidity()) {
        var rut = run.val().replace('.', '').replace('.', '');
        var tmpFecha = fechaNacimiento.val().split('-');
        var fecha = tmpFecha[2] + tmpFecha[1] + tmpFecha[0];
        var dbData = {
            option: 'datos_plan',
            etapa: 1,
            nombres: nombres.val(),
            run: rut,
            mail: mail.val(),
            fecha_nacimiento: fecha,
            genero: genero.val()
        };

        //AJAX
        jQuery.ajax({
            type: "POST",
            url: urlDatos,
            data: dbData,
            dataType: 'json',
            success: function (data) {
                //console.log(data);
                if (data.estado == 'OK') {
                    //console.log(data);
                    window.location = 'https://certisegurodobleayudaapi.segchile.cl/confirmar-compra/';
                } else {
                    alert(data.mensaje);
                }
            },
            error: function (result) {
                console.log(result);
            },
            failure: function (result) {
                console.log(result);
            }
        });
    } else {

        if (!fechaNacimiento[0].checkValidity()) {
            $(fechaNacimiento).parent('div').addClass('has-error');
            $(fechaNacimiento).focus();
        }

        if (!mail[0].checkValidity()) {
            $(mail).parent('div').addClass('has-error');
            $(mail).focus();
        }

        if (!nombres[0].checkValidity()) {
            $(nombres).parent('div').addClass('has-error');
            $(nombres).focus();
        }
        if (!genero[0].checkValidity()) {
            $(genero).parent('div').addClass('has-error');
            $(genero).focus();
        }
        if (!runn) {
            console.log(run.val());
        }
        alert('Faltan campos requeridos..');
    }
}

/* reduccion de textos */
$(".more").on('click', function () {
    // cambiar la visibilidad de complete
    $(".complete").toggle('fast');
    // cambiar el texto del boton dependiendo del texto actual
    if ($(this).text() == "← Leer menos") {
        $(this).text("Leer mas →");
    } else {
        $(this).text("← Leer menos");
    }
});

/* mostrar o ocultar contraseña */
$('#mostrar-pass').click(function () {
    if ($(this).hasClass('fa-eye')) {
        $('.pass1').removeAttr('type');
        $('#mostrar-pass').addClass('fa-eye-slash').removeClass('fa-eye');
    } else {
        //Establecemos el atributo y valor
        $('.pass1').attr('type', 'password');
        $('#mostrar-pass').addClass('fa-eye').removeClass('fa-eye-slash');

    }
});

$('#mostrar-repass').click(function () {
    if ($(this).hasClass('fa-eye')) {
        $('.pass2').removeAttr('type');
        $('#mostrar-repass').addClass('fa-eye-slash').removeClass('fa-eye');
    } else {
        //Establecemos el atributo y valor
        $('.pass2').attr('type', 'password');
        $('#mostrar-repass').addClass('fa-eye').removeClass('fa-eye-slash');
    }
});

//API CRM
function dummyCotiza() {
    //API CRM
    var primauf = 1.1;
    var primapesos = 1;
    /*if($('#cot_planUF').val() !== ''){
       primauf = $('#cot_planUF').val();
    }
    
    if($('#cot_valorPesos').val() !== ''){
    	primapesos = $('#cot_valorPesos').val();
    }*/
    var datos = {
        prima_pesos: primapesos,
        prima_uf: primauf,
        plan: $('#cot_codigo_plan').val()
    };
    var num_operacion = jQuery('#numero_operacion').val();
    //apiCRM('ET02', 2, num_operacion, datos);
    //API CRM
}
/*
 * 3 Identificación Cliente
 * */
function identificacionCliente() {
    //TODO
    //"DeclaracionDeporteActividadRiesgosaSeguroAccidentePersonal" => true,
    //"DeclaracionVeracidadSeguroAccidentePersonal" => true
    //
    var genero = $("input[type='radio'][name='reg_genero']:checked");
    var valgenero = 1;
    if (genero.val() === 'M') {
        valgenero = 2;
    }
    var autorizo = $('input:radio[name=reg_publicidad]:checked');
    var val_autorizo = false;
    if (autorizo.val() === 'S') {
        val_autorizo = true;
    }

    var datos = {
        nombres: $('#aseg_nombres').val(),
        rut: $('#aseg_run').val().replace('.', '').replace('.', ''),
        email: $('#aseg_email').val(),
        phone: '900000000',
        fecha_nacimiento: $('#aseg_fec_nacimiento').val(),
        genero: valgenero,
        autorizo_publicidad: val_autorizo

    };
    var num_operacion = jQuery('#numero_operacion').val();
    //apiCRM('ET03', 3, num_operacion, datos);
}
