$(document).ready(function () {
    $('#login_rut').rut();
    console.log('rut');
});

$('#login_run').blur(function () {
    console.log('RUT BLUR--');
});

$('#btn_login').click(function (event) {

    event.preventDefault();
    var urlLogin = "../wp-content/themes/dobleayudaAPI/ws/login-segchile/ws-login.php";
    var rut = $('#login_rut').val().replace('.', '').replace('.', '').split('-');
    var password = $('#login_pass');
    var run = rut[0];

    //validar rut y pass no esten vacios
    if (password[0].checkValidity()) {
        var dbData = {option: 'login_usuario',
            rut: run,
            pass: password.val()
        };

        jQuery.ajax({
            type: "POST",
            url: urlLogin,
            data: dbData,
            dataType: 'json',
            success: function (data) {
                    console.log(data.Mensajes.MensajeItem.Id);
                switch (data.Mensajes.MensajeItem.Id) {
                    case '0':
                        console.log('Login Exitoso');
                        console.log(data);
                        window.location = 'http://localhost/segurodobleayudaapi/asegurado/';
                        break;
                    case '80':
                        alert('Usuario no registrado');
                        window.location = 'http://localhost/segurodobleayudaapi/registro/';
                        break;
                    case '81':
                        alert('La contraseña ingresada es incorrecta');
                        break;
                    default:
                        alert('Ocurrió un error al logearse');
                        break;
                }
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

function soloNumeros(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
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
    // Si tiene decimales, se lo añadimos al numero una vez formateado con              // los separadores de miles
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

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}