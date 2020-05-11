var url_site = 'http://localhost/segurodobleayudaapi/';
var url_ws = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/quiero-prepararme/';
$(document).ready(function () {
    listarTC();
});

$('#btn_volver').click(function (e) {
    window.location = url_site + 'confirmar-compra/';
});

$('#btn_tc').click(function (e) {
    $('#form_new_tc').show();
    $('#mostrar_form_tc').hide();
    $('#ocultar_form_tc').show();
});

$('#btn_no_tc').click(function (e) {
    $('#form_new_tc').hide();
    $('#mostrar_form_tc').show();
    $('#ocultar_form_tc').hide();
});

$('#btn_add_tc').click(function (event) {

    event.preventDefault();

    var urlTC = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-add-tc.php';
    var hoy = new Date();
    var mes = hoy.getMonth() + 1;
    var year = hoy.getFullYear();
    var numTC = $('#tc_numero').val();
    var fecha = $('#tc_fecha').val();
    var tipo = $("#tc_tipo").val();
    var tcValid = isValidTC(numTC);
    var mmYYValid = validateMMYY(fecha);


    if (tcValid && mmYYValid)
    {
        //obtener mes y año de la TC
        var mesTC = fecha.split("/")[0];
        var yearTC = fecha.split("/")[1];
        var yearYY = year.toString().substr(2, 2);
        console.log('año' + yearYY);
        //validamos que año sean superior al actual
        //validamos que año sean igual o superior al actual
        if ((yearTC == yearYY && parseInt(mesTC) >= parseInt(mes)) || (yearTC > yearYY)) {
            console.log('debería registrar la TC en el servicio.');
            var semilla = '';
            var idSem = 0;
            //obtenemos semilla
            //
            var dbData = {
                option: 'semilla',
                tipo_tc: tipo
            };
            //AJAX
            jQuery.ajax({
                type: "POST",
                url: urlTC,
                data: dbData,
                dataType: 'json',
                async: false,
                success: function (data) {
                    console.log(data);
                    semilla = data.Sdt_semillatc.Semilla;
                    idSem = data.Sdt_semillatc.Id;

                },
                error: function (result) {
                    console.log(result);
                },
                failure: function (result) {
                    console.log(result);
                }
            });

            //guardamos TC
            addTC(semilla, idSem, yearTC, mesTC);

        } else {
            //mensaje de error al cliente
            console.log('Fecha no valida');
        }
    }
    else
    {
        //mensaje de error al cliente
        console.log('Número de tarjeta no valido.');
    }
});

$("#tc_numero").keyup(function (e) {
    var num = $(this).val().toString();
    var charCount = num.length;

    /* VALIDACION DE TIPO */
    if (charCount == 1) {
        if (num == "4") {
            //$("#tc_type").html("VISA");
            $("#tc_tipo").val("VI");
        }
    }
    //DI = Diners Club
    //MA = MasterCard
    //MG = Magna
    //AM = American Express
    if (charCount == 2) {
        if (num == "34" || num == "37") {
            //$("#tc_type").html("AMEX");
            $("#tc_tipo").val("AM");
        } else if (num == "51" || num == "55" || num == "53") {
            //$("#tc_type").html("MASTER CARD");
            $("#tc_tipo").val("MA");
        }
    }
    if (charCount == 3) {
        if (num == "644") {
            //$("#tc_type").html("DISCOVER");
            $("#tc_tipo").val("DI");
        }
    }
    if (charCount == 4) {
        if (num == "6011") {
            //$("#tc_type").html("DISCOVER");
            $("#tc_tipo").val("DI");
        }
    }
    /* !VALIDACION DE TIPO */

    /* ALGORITMO */
    if (charCount == 13 || charCount == 14 || charCount == 15 || charCount == 16) {
        var valid = isValid(num, charCount);
        if (valid) {
            //$("#tc_type").html("valida");
            $("tc_numero").addClass('valid');
        } else {
            //$("#tc_type").html("invalida");
            $("tc_numero").parent('div').addClass('has-error');
        }
    } else {
        //$("#tc_type").html("invalida");
        $("tc_numero").parent('div').addClass('has-error');
    }
    /* !ALGORITMO */
});

$('#tc_numero').blur(function (e) {
    var numTC = $('#tc_numero').val();

    if (!isValidTC(numTC)) {
        alert('Número Tarjeta de Crédito invalido!');
    }
});

$('#tab_asegurado').click(function () {
    window.location = url_site + 'asegurado/';
});

$('#tab_beneficiario').click(function () {
    window.location = url_site + 'beneficiarios/';
});

function isValidTC(numTC) {
    var num = numTC;
    var charCount = num.length;
    var validTC = false;

    /* ALGORITMO */
    if (charCount == 13 || charCount == 14 || charCount == 15 || charCount == 16) {
        var valid = isValid(num, charCount);
        if (valid) {
            //$("#tc_type").html("valida");
            $("tc_numero").addClass('valid');
            validTC = true;
        } else {
            $("tc_numero").parent('div').addClass('has-error');
            validTC = false;
        }
    } else {
        $("tc_numero").parent('div').addClass('has-error');
        validTC = false;
    }

    return validTC;
}

function isValid(ccNum, charCount) {
    var double = true;
    var numArr = [];
    var sumTotal = 0;
    for (i = 0; i < charCount; i++) {
        var digit = parseInt(ccNum.charAt(i));

        if (double) {
            digit = digit * 2;
            digit = toSingle(digit);
            double = false;
        } else {
            double = true;
        }
        numArr.push(digit);
    }

    for (i = 0; i < numArr.length; i++) {
        sumTotal += numArr[i];
    }
    var diff = eval(sumTotal % 10);
    console.log(diff);
    console.log(diff == "0");
    return (diff == "0");
}

function toSingle(digit) {
    if (digit > 9) {
        var tmp = digit.toString();
        var d1 = parseInt(tmp.charAt(0));
        var d2 = parseInt(tmp.charAt(1));
        return (d1 + d2);
    } else {
        return digit;
    }
}

function validateMMYY(cadena) {
    var reg = new RegExp("(((0[123456789]|10|11|12)/(([1]|[2]|[3][0-9]))))");

    if (reg.test(cadena))
        return true;
    else
        return false;
}

function listarTC() {
    var urlTC = url_ws + 'ws-add-tc.php';

    var dbData = {
        option: 'lst_tc'
    };
    //AJAX
    jQuery.ajax({
        type: "POST",
        url: urlTC,
        data: dbData,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data);
           // console.log(data.Sdt_tc.SDT_TC.NroTarjeta);
           // console.log(data.Sdt_tc.SDT_TC);
            if (Array.isArray(data.Sdt_tc.SDT_TC)) {
                console.log('Es Array');

                $.each(data.Sdt_tc.SDT_TC, function (index, value) {

                    var preferida = '<a href="#" onclick="return false;"><span><i class="ti-check-box"></i></span></a>';

                    if (value.Defecto !== 1) {
                        preferida = '<a href="#" onclick="preferidaTC(this); return false;"><span><i class="ti-na"></i></span></a>';
                    }

                    var tipoTC = value.Tipo;
                    var tc = 'Visa';

                    switch (tipoTC) {
                        case 'VI':
                            tc = '<img src="../wp-content/themes/dobleayudaAPI/images/visa.png" alt="" style="max-width: 15%; "/>';
                            break;
                        case 'DI':
                            tc = 'Diners Club';
                            break;
                        case 'MA':
                            tc = '<img src="../wp-content/themes/dobleayudaAPI/images/mastercard.png" style="max-width: 15%; " alt=""/>';
                            break;
                        case 'MG':
                            tc = 'Magna';
                            break;
                        case 'AM':
                            tc = '<img src="../wp-content/themes/dobleayudaAPI/images/amex.png" style="max-width: 15%; " alt=""/>';
                            break;
                    }

                    var trTC = '<tr><td><input type="hidden" value="' + value.IdTrj + '" id="tc_lst_id">' + value.NroTarjeta + '  <input type="hidden" value="' + tipoTC + '" id="tc_tipo">  ' + tc + '</td><td style="text-align: center;">' + preferida + '  </td><td style="text-align: center;"> <a href="#" onclick="eliminarTC(this); return false;"><span><i class="ti-trash"></i></span></a></td></tr>';
                    $('#tc_lst > tbody').append(trTC);
                });

            } else {
                console.log('No Es Array');
                //tipo TC
                var tipoTC = data.Sdt_tc.SDT_TC.Tipo;
                var tc = 'Visa';
                var preferida = '<a href="#" onclick="return false;"><span><i class="ti-check-box"></i></span></a>';

                if (data.Sdt_tc.SDT_TC.Defecto !== 1) {
                    preferida = '<a href="#" onclick="preferidaTC(this); return false;"><span><i class="ti-na"></i></span></a>';
                }

                switch (tipoTC) {
                    case 'VI':
                        tc = '<img src="../wp-content/themes/dobleayudaAPI/images/visa.png" alt="" style="max-width: 15%; "/>';
                        break;
                    case 'DI':
                        tc = 'Diners Club';
                        break;
                    case 'MA':
                        tc = '<img src="../wp-content/themes/dobleayudaAPI/images/mastercard.png" style="max-width: 15%; " alt=""/>';
                        break;
                    case 'MG':
                        tc = 'Magna';
                        break;
                    case 'AM':
                        tc = '<img src="../wp-content/themes/dobleayudaAPI/images/amex.png" style="max-width: 15%; " alt=""/>';
                        break;
                }
                var trTC = '<tr><td><input type="hidden" value="' + data.Sdt_tc.SDT_TC.IdTrj + '" id="tc_lst_id">' + data.Sdt_tc.SDT_TC.NroTarjeta + '  <input type="hidden" value="' + tipoTC + '" id="tc_tipo">  ' + tc + '</td><td style="text-align: center;">' + preferida + ' </td><td style="text-align: center;"> <a href="#" onclick="eliminarTC(this); return false;"><span><i class="ti-trash"></i></span></a></td></tr>';
                $('#tc_lst > tbody').append(trTC);

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

function addTC(key, id, year, month) {
    var urlTC = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-add-tc.php';
    var tipo = $("#tc_tipo").val();
    var idSem = id; //obtener del servicio anterior
    var numTC = $('#tc_numero').val();

    if (!isValidTC(numTC)) {
        alert('Número Tarjeta de Crédito invalido!');
    } else {
        var dbData = {
            option: 'add_tc',
            tipo_tc: tipo,
            num_tc: numTC,
            id_tc: idSem,
            mes_TC: month,
            anno_TC: '20' + year,
            semilla: key

        };
        //AJAX
        jQuery.ajax({
            type: "POST",
            url: urlTC,
            data: dbData,
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log(data);
                if (data.Mensajes.MensajeItem.Id !== "0") {
                    alert('Error al agregar Tarjeta.');
                } else {
                    alert('Tarjeta agregada correctamente.');
                    $("#tc_tipo").val('');
                    $('#tc_numero').val('');
                    $('#tc_fecha').val('');
                    window.location = url_site + 'confirmar-compra/';
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


}

function eliminarTC(tc) {
    console.log('Eliminar TC');
    var idTC = $(tc).parents("tr").find('#tc_lst_id').val();
    var tipoTC = $(tc).parents("tr").find('#tc_tipo').val();
    console.log(idTC);
    console.log(tipoTC);

    var urlTC = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-add-tc.php';

    var dbData = {
        option: 'mod_tc',
        tipo_tc: tipoTC,
        id_tc: idTC
    };

    //AJAX
    jQuery.ajax({
        type: "POST",
        url: urlTC,
        data: dbData,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data.Mensajes.MensajeItem.Id);

            if (data.Mensajes.MensajeItem.Id == '0') {
                alert('Tarjeta eliminada correctamente.');
                location.reload();
            } else {
                alert('Error al eliminar tarjeta, favor intentelo nuevamente.');
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

function preferidaTC(tc) {
    console.log('Predeterminada TC');
    var idTC = $(tc).parents("tr").find('#tc_lst_id').val();
    var tipoTC = $(tc).parents("tr").find('#tc_tipo').val();
    console.log(idTC);
    console.log(tipoTC);

    var urlTC = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-add-tc.php';

    var dbData = {
        option: 'pre_tc',
        tipo_tc: tipoTC,
        id_tc: idTC
    };

    //AJAX
    jQuery.ajax({
        type: "POST",
        url: urlTC,
        data: dbData,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data.Mensajes.MensajeItem.Id);

            if (data.Mensajes.MensajeItem.Id == '0') {
                alert('Tarjeta modificada correctamente.');
                location.reload();
            } else {
                alert('Error al modificar tarjeta, favor intentelo nuevamente.');
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