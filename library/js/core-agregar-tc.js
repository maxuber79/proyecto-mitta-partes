$(document).ready(function () {
    //$('#esperar').modal('show');

});

$('#btn_add_tc').click(function (event) {

    event.preventDefault();
	
    var urlTC = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/quiero-prepararme/ws-add-tc.php';
    var hoy = new Date();
    var mes = hoy.getMonth() + 1;
    var year = hoy.getFullYear();
    var numTC = $('#tc_numero').val();
    var fecha = $('#tc_fecha').val();
    var tipo = $("#tc_tipo").val();
    //var tcValid = isValidTC(numTC);
    var mmYYValid = validateMMYY(fecha);


    if (mmYYValid)
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
                    //console.log(data);
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
        var mensaje = '';
        if (!tcValid) {
            mensaje = 'Número de tarjeta no valido.';
        }
        if (!mmYYValid) {
            mensaje = mensaje + '\nFecha o formato de fecha no valido.';
        }

        alert(mensaje);
    }
});

function validateMMYY(cadena) {
    var reg = new RegExp("(((0[123456789]|10|11|12)/(([1]|[2]|[3][0-9]))))");
   
    if (reg.test(cadena))
        return true;
    else
        return false;
}

function addTC(key, id, year, month) {
	
    $('#btn_add_tc').prop('disabled', true);
    var urlTC = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/quiero-prepararme/ws-add-tc.php';
    var tipo = $("#tc_tipo").val();
    var idSem = id; //obtener del servicio anterior
    var numTC = $('#tc_numero').val();
		
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
                    window.location = 'http://localhost/segurodobleayudaapi/confirmar-compra/';
                }
            },
            error: function (result) {
                console.log(result);
                $('#btn_add_tc').prop('disabled', false);
            },
            failure: function (result) {
                console.log(result);
                $('#btn_add_tc').prop('disabled', false);
            }
        });
}

 $(function() {
	 $('#tc_numero').validateCreditCard(function(result) {
		 if(result.valid){
			 $('#btn_add_tc').prop('disabled', false);
		 } else {
			 $('#btn_add_tc').prop('disabled', true);
		 }
		 if(result.card_type !== null){
			 switch(result.card_type.name){//DI = Diners Club//MG = Magna//AM = American Express
				 case 'mastercard':
					 $("#tc_tipo").val('MA');
					 break;
				 case 'visa':
					 $("#tc_tipo").val('VI');
					 break;
			 }
		 }
		 
		 //debugger;
		 $('.log').html('Card type: ' + (result.card_type == null ? '-' : result.card_type.name)
						+ '<br>Valid: ' + result.valid
						+ '<br>Length valid: ' + result.length_valid
						+ '<br>Luhn valid: ' + result.luhn_valid);
	 });
 });