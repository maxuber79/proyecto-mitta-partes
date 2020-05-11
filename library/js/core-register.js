$(document).ready(function () {
    $('#reg_rut').rut();
    //
    var dt = new Date();
    // Display the month, day, and year. getMonth() returns a 0-based number.
    var month = pad(dt.getMonth() + 1, 2);
    var day = pad(dt.getDate(), 2);
    var year = (dt.getFullYear() - 18);

    var fecha = year + '-' + month + '-' + day;

    //$('#reg_fnacimiento').val(fecha);
    $('#reg_fnacimiento').attr('max', fecha);
});

$('#reg_rut').blur(function () {
    console.log('RUT BLUR..');
});

$('#btn_registrate').click(function (event) {
    event.preventDefault();
    var urlCreaUsuario = "../wp-content/themes/dobleayudaAPI/ws/login-segchile/ws-set-usuario.php";
    
    $('#btn_registrate').prop('disabled', true);

    var forms = $('.needs-validation');

    var rut = $('#reg_rut');
    var nombre = $('#reg_nombres');
    var apellidos = $('#reg_apellidos');
    var telefono = $('#reg_telefono');
    var email = $('#reg_email');
    var fnacimiento = $('#reg_fnacimiento');
    var pass = $('#reg_pass');
    var repass = $('#reg_re_pass');
    var tyc = $('#reg_tyc');
    var genero = $('input:radio[name=reg_genero]:checked');
    var autorizo = $('input:radio[name=reg_publicidad]:checked');
    var residencia = $('#reg_residencia').is(':checked');


    var rutV = $.rut.validar($.rut.formatear(rut.val()));


    if (nombre[0].checkValidity() && apellidos[0].checkValidity() && rutV && email[0].checkValidity() && fnacimiento[0].checkValidity() && pass[0].checkValidity() && repass[0].checkValidity() && tyc[0].checkValidity() && autorizo[0].checkValidity() && residencia) {
        //largo contraseña
        //contraseñas iguales
        //confirmaPassword();
        var ap = $.trim(apellidos.val());
        if (ap.replace(/ +(?= )/g, '').split(" ").length < 2) {
            apellidos.val('');
            forms.addClass('was-validated');
            $('#btn_registrate').prop('disabled', false);
            apellidos.focus();
            error = true;

        } else {
            var run = rut.val().replace('.', '').replace('.', '').split("-")[0];
            var dv = rut.val().split("-")[1];
            ap = ap.toString().split(" ");
            var apaterno = ap[0];
            var amaterno = ap[1];
            //var fNacTem = fnacimiento.val().split("-");
            //var fNac = fNacTem[2] +'-'+fNacTem[1]+'-'+fNacTem[0];
            var gene = '1';
            if (genero.val() == 'M') {
                gene = '2';
            }

            var dbData = {option: 'crea_usuario',
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

            console.log(dbData);

            jQuery.ajax({
                type: "POST",
                url: urlCreaUsuario,
                data: dbData,
                dataType: 'json',
                success: function (data) {
                    console.log('Crea usuario OK');
                    console.log(data);


                    if (data.Mensajes.MensajeItem.Id == '0') {
                        alert('Usuario creado correctamente.');
                        window.location = 'http://localhost/segurodobleayudaapi/asegurado/';
                    } else {
                        alert('Error al crear usuario');
                    }
                },
                error: function (result) {
                    console.log(result);
                    $('#btn_registrate').prop('disabled', false);
                },
                failure: function (result) {
                    console.log(result);
                    $('#btn_registrate').prop('disabled', false);
                }
            });
        }
    } else {
        forms.addClass('was-validated');
        $('#btn_registrate').prop('disabled', false);
    }
});

function confirmaPassword() {
    var pass = $('#reg_pass').val();
    var repass = $('#reg_re_pass').val();

    if (pass !== repass) {
        //alert('Las contraseñas deben coincidir.');
        alert('Contraseña y reingreso contraseña no iguales');
        //$('#reg_re_pass').val('');
        //$('#reg_pass').focus();
    }
}

function largoPassword() {
    var pass = $('#reg_pass').val();
    if (pass.length < 6) {
        alert('La contraseña debe tener un largo mínimo de 6 caracteres');
        //$('#reg_pass').focus();
    }
}

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

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}