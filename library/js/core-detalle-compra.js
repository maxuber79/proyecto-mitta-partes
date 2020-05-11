var url_base = 'http://localhost/segurodobleayudaapi/';
var url_ws = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/quiero-prepararme/';
$(document).ready(function () {
    $('#esperar').modal('show');
    verificarTC();
	
	
});
$('#tab_asegurado').click(function () {
    window.location = url_base +'asegurado/';
});

$('#tab_beneficiario').click(function () {
    window.location = url_base + 'beneficiarios/';
});

$('#btn_nueva_tc').click(function (e) {
    window.location = url_base +'mis-tc/';
});
$('#btn_cambio_plan').click(function (e) {
    window.location = url_base + 'cambio-plan/';
});
$('#btn_cotratar').click(function (event) {
    event.preventDefault();
    console.log('Redirección a Felicidades!');

    var urlDatos = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/oncologico/ws-set-datos.php';

    var dbData = {
        option: 'datos_plan',
        tc_id: $('#tctc_id').val(),
        tc_tipo: $('#tctc_tipo').val(),
        etapa: 9
    };

    //AJAX
    jQuery.ajax({
        type: "POST",
        url: urlDatos,
        data: dbData,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.retorno.Bien == '1') {
				var email = $('#mail_despacho').val()
				var datos = {
					email: email
				};
				var num_operacion = jQuery('#numero_operacion').val();
				apiCRM('ET06', 6, num_operacion, datos);
				
                window.location = url_base +'felicitaciones/';
            } else {
                alert('Error al comprar poliza.');
            }

        },
        error: function (result) {
            console.log(result);
        },
        failure: function (result) {
            console.log(result);
        }
    });
	window.location = url_base +'felicitaciones/';
});

$('#coberturas').click(function () {
    var cobertura = $('#coberturas').is(':checked');
    if (cobertura) {
        $("#btn_cotratar").prop('disabled', false);
    } else {
        $("#btn_cotratar").prop('disabled', true);
    }


});
//loadModal(1, 'Beneficiarios', 'Debe verificar si existe TC asociada al cliente...', 1, '');

function verificarTC() {
	debugger;
	var urlVerificaTC = url_ws + 'ws-verifica-tc.php';

    //ajax
    var dbData = {option: 'verifica_tc',
        etapa: 4
    };
    jQuery.ajax({
        type: "POST",
        url: urlVerificaTC,
        data: dbData,
        dataType: 'json',
        success: function (data) {
            console.log('Beneficiarios OK');
            console.log(data);
            $('#esperar').modal('hide');
            if (data.Mensajes.MensajeItem.Id == 0) {
                console.log('tiene TC');
                var tc = '';

                if (data.Sdt_tc.SDT_TC.Estado !== 'VIGENTE') {
                    console.log('SIN TC VIGENTE');
                    window.location = url_base +'mis-tc/';
                }
                var idTC = data.Sdt_tc.SDT_TC.IdTrj;
                var tipoTC = data.Sdt_tc.SDT_TC.Tipo;

                switch (tipoTC) {
                    case 'VI':
                        tc = '<input type="hidden" id="tctc_id" value="' + idTC + '"><input type="hidden" id="tctc_tipo" value="' + tipoTC + '" ><img src="../wp-content/themes/dobleayudaAPI/images/visa.png" alt="" style="max-width: 25%; "/>';
                        break;
                    case 'DI':
                        tc = 'Diners Club';
                        break;
                    case 'MA':
                        tc = '<input type="hidden" id="tctc_id" value="' + idTC + '"><input type="hidden" id="tctc_tipo" value="' + tipoTC + '" ><img src="../wp-content/themes/dobleayudaAPI/images/mastercard.png" style="max-width: 25%; " alt=""/>';
                        break;
                    case 'MG':
                        tc = 'Magna';
                        break;
                    case 'AM':
                        tc = '<input type="hidden" id="tctc_id" value="' + idTC + '"><input type="hidden" id="tctc_tipo" value="' + tipoTC + '" ><img src="../wp-content/themes/dobleayudaAPI/images/amex.png" style="max-width: 25%; " alt=""/>';
                        break;
                }

                $('#numero_tc').html(data.Sdt_tc.SDT_TC.NroTarjeta);

                $('#tipo_tc').html(tc);
            }

            if (data.Mensajes.MensajeItem.Id != 0) {
                console.log('SIN TC');
                window.location = url_base +'agregar-tc';
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