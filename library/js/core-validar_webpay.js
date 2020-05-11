var urlSite = 'http://localhost/segurodobleayudaapi/';
var urlWebPay = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/asistenciaenviaje/ws-webpay-buscar.php';

$(document).ready(function () {
    validaWebPay();
});

function validaWebPay() {

    var codOC = getParameterByName('oc');

    var dbWebPay = {
        option: 'wp',
        oc: codOC

    };

    //ajax webpay
    jQuery.ajax({
        type: "POST",
        url: urlWebPay,
        data: dbWebPay,
        dataType: 'json',
        success: function (data) {
            console.log('WebPay  OK');
            console.log(data);
            
			if(data.estado == 'OK'){
				if (data.retorno.Datos.TBKTrnExit == '0') {
                var URL = urlSite + 'felicitaciones';

                window.location = URL;
            }else{
				var URL =  urlSite + 'fracaso';

                window.location = URL;
			}
			} else{
				var URL =  urlSite + 'fracaso';

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
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}