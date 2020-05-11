var urlWebPay = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/asistenciaenviaje/ws-webpay-info.php';
var sistemaOperativo = '';
var navegador = '';
var dispositivo = 'PC';

$(document).ready(function () {
    //$('#esperar').modal('show');


    var ua = new UAParser();
    //SO                                                                                               
    sistemaOperativo = ua.getOS().name + ' ' + ua.getOS().version;
    //Navegador
    navegador = ua.getBrowser().name + ' ' + ua.getBrowser().version;

    //Dispositivo
    if (ua.getDevice().type !== undefined) {
        dispositivo = ua.getDevice().type + ' ' + ua.getDevice().vendor + ' ' + ua.getDevice().model;
    }
	
	//API CRM
	var datos;
	var num_operacion = jQuery('#numero_operacion').val();
	apiCRM('ET07', 7, num_operacion, datos);
	//API CRM

});