$(document).ready(function () {
    $('#rec_rut').rut();
});

$('#rec_rut').blur(function () {
    console.log('RUT BLUR');
});

$('#btn_recuperar').click(function (event) {
    console.log('btn_recuperar');
    event.preventDefault();
    $('#div_actualizar_pass').show();
    $('#parent').hide('fast');

    var urlRecuperar = "../wp-content/themes/dobleayudaAPI/ws/login-segchile/ws-valida-cliente.php";

    var run = jQuery('#rec_rut').val().replace('.', '').replace('.', '').split("-");
    var rut = run[0];
    console.log(rut);

    var dbData = {option: 'valida_usuario',
        rut: rut};

    console.log('recuperar clave');

    jQuery.ajax({
        type: "POST",
        url: urlRecuperar,
        data: dbData,
        dataType: 'json',
        success: function (data) {
            console.log('valida usuario OK');
            console.log(data);
            if (data.Mensajes.MensajeItem.Id == 80) {
                console.log('Registro');
                window.location = 'http://localhost/segurodobleayudaapi/registro/';
            }
            data.Sdt_datosclienteventawp.EMail
            jQuery('#mail_usuario').html(data.Sdt_datosclienteventawp.EMail);

        },
        error: function (result) {
            console.log(result);
        },
        failure: function (result) {
            console.log(result);
        }
    });
});

$('#btn_actualizar_pass').click(function (event) {
    event.preventDefault();
    //campos
    var urlActualiza = "../wp-content/themes/dobleayudaAPI/ws/login-segchile/ws-update-pass.php";
    var codigo = $('#rec_codigo');
    var pass = $('#rec_pass');
    var repass = $('#rec_re_pass');

    //validar
    if (codigo[0].checkValidity() && pass[0].checkValidity() && repass[0].checkValidity()) {
        if (pass.val() == repass.val()) {
            //consumo WS
            var dbData = {option: 'update_pass',
                pass: pass.val(),
                temporal: codigo.val(),
                repass: repass.val()
            };

            console.log('Actualizar PASS');

            jQuery.ajax({
                type: "POST",
                url: urlActualiza,
                data: dbData,
                dataType: 'json',
                success: function (data) {
                    console.log('update pass  OK');
                    console.log(data);

                    if (data.Mensajes.MensajeItem.Id == 0) {
                        alert('La contraseña fue actualizada correctamente.');
                        window.location = 'http://localhost/segurodobleayudaapi/login/';
                        
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
            alert('La contraseña y su verificación son distintas.');
        }

    }
});