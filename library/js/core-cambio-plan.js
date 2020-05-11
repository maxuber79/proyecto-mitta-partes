var url_base = 'http://localhost/segurodobleayudaapi/';
$(document).ready(function () {
    //$('#esperar').modal('show');
});
$('#tab_asegurado').click(function () {
    window.location = url_base + 'asegurado/';
});
$('#tab_beneficiario').click(function () {
    window.location = url_base + 'beneficiarios/';
});
$('#btn_volver').click(function (e) {
    window.location = url_base + "confirmar-compra/";
});
function modificarPlan(num) {
    var urlCambioPlan = 'http://localhost/segurodobleayudaapi/wp-content/themes/dobleayudaAPI/ws/accidentes-personales/ws-cambia-plan.php';
    var plan = pad(num.toString(), 2);
    var dbData = {
        option: 'cambio_plan',
        codigo_plan: plan,
        etapa: 8
    };
    //AJAX
    jQuery.ajax({
        type: "POST",
        url: urlCambioPlan,
        data: dbData,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            window.location = url_base + 'confirmar-compra/';
        },
        error: function (result) {
            console.log(result);
        },
        failure: function (result) {
            console.log(result);
        }
    });
}
