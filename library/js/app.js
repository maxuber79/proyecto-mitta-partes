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

//MESSAGE
function loadModal(tipo, titulo, mensaje, boton, btnaction) {
    $("#message").empty();
    //Variables configuración
    //tipo = 0 modal default
    //tipo = 1 modal warning
    //tipo = 2 modal danger
    //tipo = 3 modal success
    //tipo = 4 modal info
    var classcontent = '';
    var classheader = '';

    switch (tipo) {
        case 1:
            classcontent = 'panel-warning';
            classheader = 'panel-heading';
            break;
        case 2:
            classcontent = 'panel-danger';
            classheader = 'panel-heading';
            break;
        case 3:
            classcontent = 'panel-success';
            classheader = 'panel-heading';
            break;
        case 4:
            classcontent = 'panel-info';
            classheader = 'panel-heading';
            break;
    }

    //boton
    var btnCerrar = "";
    var btnOK = "";
    if (boton === 1) {
        btnCerrar = "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-default\">Cerrar</button>";
    }

    if (btnaction != '') {
        btnOK = btnaction;
    }

    //modal
    var html = "<div id=\"modal_message\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\">"
            + "<div class=\"modal-dialog\">"
            + "<div class=\"modal-content " + classcontent + "\">"
            + "<div class=\"modal-header " + classheader + "\">"
            + "<button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">"
            + "<span aria-hidden=\"true\">&times;</span>"
            + "</button>"
            + "<h4 id=\"myModalLabel\" class=\"modal-title\">" + titulo + "</h4>"
            + "</div>"
            + "<div class=\"modal-body\">" + mensaje + "</div>"
            + "<div class=\"modal-footer\">"
            + btnCerrar
            + btnOK
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>";

    $("#message").append(html);

    $('#modal_message').modal('show');
}

/*function apiCRM(crm_etapa, etapa, folio, datos){
	//AJAX CRM
	var urlWSCRM = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-api-crm.php';
	var dbData = {
		etapa_crm: crm_etapa,
		tipo_seguro: 2,
		folio: folio,
		etapa: etapa,
		datos:datos
	};
	jQuery.ajax({
		type: "POST",
		url: urlWSCRM,
		data: dbData,
		dataType: 'json',
		async: true,
		success: function (data) {
			//console.log('API_CRM');
			console.log(data);                   
			},
		error: function (result) {
			console.log(result);
		},
		failure: function (result) {
			console.log(result);
		}
	});
}*/