$(document).ready(function() {
    var gURLRest = 'http://certivtaweb.segchile.cl/vtaonline/rest/srv_get_cotiza_id';
    var gURLPost = 'http://certivtaweb.segchile.cl/vtaonline/aProcPostVta01_vtaonline.aspx?';
    
                    var rutCanal = '81836800';//'83380000';//'76620816'// '76620816' Estos son llamado segchile;
                    var vKey = 'a123'; //'VTAONL_A123_Banchile';
                    var vTipo = 'AV';
                    var gParmSeguro = '';
                    var gRestMsgCadena = '';
                    var gParmTipo = vTipo;
                    var fechaYMD = '';
                    var fechaHMS = '';
                    var sistemaOperativo = 'none';
                    var codArea = 'none';
                    var numTelefono = 'none';
                    var navegador = 'none';
                    var dispositivo = 'none';
    
    var gInternetPrices = [
   /*Países Limitrofes*/
[
    [0.44,0.64,0.81,0.97,1.55,1.79,3.73,6.34,8.94,14.33],
    [0.67,0.97,1.22,1.47,2.36,2.71,5.64,10.21,14.42,23.14],
    [0.83,1.21,1.51,1.82,2.91,3.37,6.01,13.15,18.56,29.81],
    [1.01,1.45,1.80,2.18,3.67,3.80,6.29,13.65,19.29,30.97],
    [1.18,1.69,2.12,2.55,4.08,4.70,9.76,19.49,27.49,44.14],
    [1.62,2.34,2.93,3.51,5.63,6.49,13.48,25.83,36.42,58.47]
    
],
/*europa*/
[ 
    [1.64,1.91,2.10,2.52,3.64,4.18,4.94,8.04,11.36,18.21],
    [2.05,3.14,3.68,4.42,6.20,7.13,8.48,12.97,18.33,29.38],
    [3.60,4.74,6.24,7.49,10.52,12.10,13.97,18.78,26.53,42.55],
    [3.96,5.21,6.86,8.24,11.58,13.31,15.36,21.71,30.67,49.21],
    [4.32,5.69,7.49,8.99,12.63,15.13,16.76,24.72,34.92,56.04],
    [5.30,6.47,8.32,9.98,14.08,16.19,18.76,25.72,35.92,57.04]
],
/*resto del mundo*/
[ 
    
    [1.97,2.29,2.52,3.02,4.36,5.02,5.92,10.13,14.30,22.91],
    [2.46,3.77,4.42,5.30,7.44,8.56,10.18,16.34,23.06,36.95],
    [4.32,5.69,7.49,8.99,12.63,15.13,16.76,23.64,33.37,53.50],
    [4.50,5.92,7.80,9.36,13.15,15.13,17.46,27.32,38.58,61.83],
    [4.68,6.16,8.11,9.73,13.68,15.73,18.16,31.11,43.91,70.42],
    [6.36,7.76,9.98,11.98,16.89,19.42,22.51,32.11,44.91,71.42]
]
];
                                       $(document).ready(function () {
                                           //console.log("ready!");
                                           $('#aev_run').rut();
                                           //Fecha YYYYMMDD
                                           var fecha = new Date();
                                           var mes = pad((fecha.getMonth() + 1), 2);
                                           var dia = pad(fecha.getDate(), 2);
                                           //console.log(fecha);
                                           fechaYMD = fecha.getFullYear() + mes + dia;
                                           //console.log(fechaYMD);
                                           //HORA HH:MM:SS
                                           var hora = pad(fecha.getHours(), 2);
                                           var minutos = pad(fecha.getMinutes(), 2);
                                           var segundos = pad(fecha.getSeconds(), 2);
                                           fechaHMS = hora + ':' + minutos + ':' + segundos;
                                           //console.log(fechaHMS);
                                           
                                           var ua = new UAParser();
                                           //SO                                                                                               
                                           sistemaOperativo = ua.getOS().name +' '+ ua.getOS().version;
                                           //console.log(sistemaOperativo);
                                           //Navegador
                                           navegador = ua.getBrowser().name +' ' +ua.getBrowser().version;
                                           //console.log(navegador);
                                           //Dispositivo
                                           if(ua.getDevice().type !== undefined){
                                               dispositivo = ua.getDevice().type +' '+ ua.getDevice().vendor + ' ' +ua.getDevice().model;
                                           }
                                           //console.log(dispositivo);                                           
                                           
                                       });
    
                                       //Eventos click
                                       $('#btn_aev').click(function (event) {
                                           event.preventDefault();
                                           var value = '<div class="invalid-feedback"> Debe ingresar un teléfono valido. </div>';
                                           var phone = $('#aev_phone');
                                           var email = $('#aev_email').val();
    
                                           var fullname = $('#aev_fullname');
                                           var run = $('#aev_run');
                                           var days = $('#aev_days');
                                           var insured = $('#aev_insured');
                                           var forms = $('.needs-validation');
    
                                           var largo = phone.val().length;
    
                                           if (fullname[0].checkValidity() && run[0].checkValidity() && days[0].checkValidity() && insured[0].checkValidity()) {
                                               var error = false;
    
    
                                               if (largo > 0 && largo < 9) {
                                                   forms.addClass('was-validated');
                                                   error = true;
                                               } else {
                                                   forms.removeClass('was-validated');
                                               }
    
                                               var nombreCompleto = $.trim(fullname.val());
    
                                               if (nombreCompleto.replace(/ +(?= )/g, '').split(" ").length < 3) {
                                                   fullname.val('');
                                                   forms.addClass('was-validated');
                                                   fullname.focus();
                                                   error = true;
    
                                               }
    
                                               if (!error) {
                                                   //set variables
                                                   if (largo == 9) {
    
                                                       codArea = phone.val().substring(0, 1);
                                                       numTelefono = phone.val().substring(1, 9);
                                                   }
                                                   //cálculo de valores plan
                                                   var pricePlanUno = parseFloat(gInternetPrices[0][insured.val() - 1][days.val() - 1]).toFixed(2);
                                                   var pricePlanDos = parseFloat(gInternetPrices[1][insured.val() - 1][days.val() - 1]).toFixed(2);
                                                   var pricePlanTres = parseFloat(gInternetPrices[2][insured.val() - 1][days.val() - 1]).toFixed(2);
                                                   //plan 1
                                                   $('#precio_uno').html(pricePlanUno);
                                                   //plan 2
                                                   $('#precio_dos').html(pricePlanDos);
                                                   //plan 3
                                                   $('#precio_tres').html(pricePlanTres);
    												
                                                  // VALOR PLANES EN PESOS
                                                  /* Agregar puntos y decimales a un valor numerico */
                                                  var formatNumber = {
														 separador: ".", // separador para los miles
														 sepDecimal: ',', // separador para los decimales
														 formatear:function (num){
														 num +='';
														 var splitStr = num.split('.');
														 var splitLeft = splitStr[0];
														 var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
														 var regx = /(\d+)(\d{3})/;
														 while (regx.test(splitLeft)) {
														 splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
														 }
														 return this.simbol + splitLeft + splitRight;
														 },
														 new:function(num, simbol){
														 this.simbol = simbol ||'';
														 return this.formatear(num);
														 }
														}
                                                //Llamar a la UF desde el input
                                                   var obtenerUF = $('#valueUF').val();
                                                // Cambiar ',' por '.' a la UF
                                                   obtenerUF = obtenerUF.toString().replace(',', '.');
                                                //Llamar al valor del plan uno
                                                   var valorPLAN_uno = $('#precio_uno').html();
                                                //Llamar al valor del plan dos
                                                   var valorPLAN_dos =  $('#precio_dos').html();
                                                //Llamar al valor del plan tres
                                                   var valorPLAN_tres = $('#precio_tres').html();												   
                                                  
                                                  //valor pesos plan uno
                                                   var resultadoFinal_uno = parseFloat(obtenerUF) * parseFloat(valorPLAN_uno);
                                                   //$('#valor_pesos_uno').html(Math.round(resultadoFinal_uno));
                                                   $('#valor_pesos_uno').html(formatNumber.new(Math.round(resultadoFinal_uno)));
                                                  // valor pesos plan dos
                                                   var resultadoFinal_dos = parseFloat(obtenerUF) * parseFloat(valorPLAN_dos);
                                                   //$('#valor_pesos_dos').html(Math.round(resultadoFinal_dos));
                                                  $('#valor_pesos_dos').html(formatNumber.new(Math.round(resultadoFinal_dos)));
                                                  //valor pesos plan tres
                                                  var resultadoFinal_tres = parseFloat(obtenerUF) * parseFloat(valorPLAN_tres);
                                                   //$('#valor_pesos_tres').html(Math.round(resultadoFinal_tres));  
												   $('#valor_pesos_tres').html(formatNumber.new(Math.round(resultadoFinal_tres)));
												   
                                                   $('#div_plan').slideDown('slow');
                                                   //SDG
                                                   $('html, body').animate({
                                                      scrollTop: $('#div_plan').offset().top -50
                                                   }, 1000);

                                                   // mensaje de envio email usuario
                                                   $('#info-alert').fadeTo(8000, 400).slideUp(500, function() { 
                                                        $(this).slideUp(500);
                                                   });
                                                   //guardado de datos
                                                   var urlGuardaDatos = "../wp-content/themes/THEME-LANDINGPAGE-SEGCHILE/ws/ws-set-conexion.php";
                                                   
                                                   var dbData = {
                                                                option: 'cotiza_plan',
                                                                dias: days.val(),
                                                                nombres: fullname.val(),
                                                                run: run.val(),
                                                                mail: email,
                                                                telefono: phone.val(),
                                                                asegurados: insured.val()
                                                       
                                                            };
    
                                                            //AJAX
                                                            jQuery.ajax({
                                                                type: "POST",
                                                                url: urlGuardaDatos,
                                                                data: dbData,
                                                                dataType: 'json',
                                                                success: function (data) {
                                                                    if (data.estado == 'OK') {
                                                                        console.log(data);
                                                                    } else {
                                                                        console.log(data.mensaje);
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
    
                                           } else {
                                               forms.addClass('was-validated');
    
                                               if (insured[0].checkValidity()) {
                                                   insured.focus();
                                               }
                                               if (days[0].checkValidity()) {
                                                   days.focus();
                                               }
                                               if (run[0].checkValidity()) {
                                                   run.focus();
                                               }
                                               if (fullname[0].checkValidity()) {
                                                   fullname.focus();
                                               }
                                           }    
    
                                       });
                                       //comprar
                                       $('#aev_comprar_uno').click(function (event) {
                                           event.preventDefault();
    
                                           var fullname = $('#aev_fullname');
                                           var run = $('#aev_run');
                                           var days = $('#aev_days');
                                           var insured = $('#aev_insured');
    
                                           var lPlan = '01';
                                           var seg = '33100026';
                                           var separator = '.';
                                           var arrRun = run.val().split(separator);
                                           var IDlanding = 'AV_XXXXXXXXXX';
    
                                           var rutFormat = arrRun[0] + arrRun[1] + arrRun[2];
                                           console.log(rutFormat);
                                           var email = $('#aev_email').val();
    
                                           if (email == '') {
                                               email = 'none';
                                           }
    
                                           if (callRest(rutCanal, gParmSeguro, vKey, gParmTipo, seg, insured.val(), days.val(), rutFormat, fullname.val())) {
                                               rutFormat = rutFormat.replace('-', '');
    
                                               var postURL = gURLPost + 'C,' + gRestMsgCadena + ',' + insured.val() + ',' + gRestPag_Idtrx + ',,' + vKey + ',' + fullname.val() + ',100,' + days.val() + ',' + rutFormat + ',,' + seg + ',' + navegador + ',' + dispositivo + ',' + sistemaOperativo + ',' + fechaYMD + ',' + fechaHMS + ',' + email + ',' + codArea + ',' + numTelefono + ',' + IDlanding;
                                               //console.log(postURL);
                                               window.open(postURL, '_self');
                                           }
                                           else {
                                               //jQuery('#error-message').html('Error enviando los datos.');
                                               //enableButton();
                                               gProcessing = false;
                                           }    
                                       });
                                       $('#aev_comprar_dos').click(function (event) {
                                           event.preventDefault();
    
                                           var fullname = $('#aev_fullname');
                                           var run = $('#aev_run');
                                           var days = $('#aev_days');
                                           var insured = $('#aev_insured');
    
                                           var lPlan = '02';
                                           var seg = '33100022';
                                           var separator = '.';
                                           var arrRun = run.val().split(separator);
                                           var IDlanding = 'AV_XXXXXXXXXX';
    
                                           var rutFormat = arrRun[0] + arrRun[1] + arrRun[2];
                                           console.log(rutFormat);
                                           var email = $('#aev_email').val();
    
                                           if (email == '') {
                                               email = 'none';
                                           }
    
                                           if (callRest(rutCanal, gParmSeguro, vKey, gParmTipo, seg, insured.val(), days.val(), rutFormat, fullname.val())) {
                                               rutFormat = rutFormat.replace('-', '');
    
    
                                               var postURL = gURLPost + 'C,' + gRestMsgCadena + ',' + insured.val() + ',' + gRestPag_Idtrx + ',,' + vKey + ',' + fullname.val() + ',100,' + days.val() + ',' + rutFormat + ',,' + seg + ',' + navegador + ',' + dispositivo + ',' + sistemaOperativo + ',' + fechaYMD + ',' + fechaHMS + ',' + email + ',' + codArea + ',' + numTelefono + ',' + IDlanding;
                                               window.open(postURL, '_self');
                                           }
                                           else {
                                               //jQuery('#error-message').html('Error enviando los datos.');
                                               //enableButton();
                                               gProcessing = false;
                                           }
    
                                       });
                                       $('#aev_comprar_tres').click(function (event) {
                                           event.preventDefault();
    
                                           var fullname = $('#aev_fullname');
                                           var run = $('#aev_run');
                                           var days = $('#aev_days');
                                           var insured = $('#aev_insured');
                                           
                                           var lPlan = '03';
                                           var seg = '33100021';
                                           var separator = '.';
                                           var arrRun = run.val().split(separator);
                                           var IDlanding = 'AV_XXXXXXXXXX';
    
                                           var rutFormat = arrRun[0] + arrRun[1] + arrRun[2];
                                           console.log(rutFormat);
                                           var email = $('#aev_email').val();
    
                                           if (email == '') {
                                               email = 'none';
                                           }
    
                                           if (callRest(rutCanal, gParmSeguro, vKey, gParmTipo, seg, insured.val(), days.val(), rutFormat, fullname.val())) {
                                               rutFormat = rutFormat.replace('-', '');
    
    
                                               var postURL = gURLPost + 'C,' + gRestMsgCadena + ',' + insured.val() + ',' + gRestPag_Idtrx + ',,' + vKey + ',' + fullname.val() + ',100,' + days.val() + ',' + rutFormat + ',,' + seg + ',' + navegador + ',' + dispositivo + ',' + sistemaOperativo + ',' + fechaYMD + ',' + fechaHMS + ',' + email + ',' + codArea + ',' + numTelefono + ',' + IDlanding;
                                               window.open(postURL, '_self');
                                           }
                                           else {
                                               //jQuery('#error-message').html('Error enviando los datos.');
                                               //enableButton();
                                               gProcessing = false;
                                           }
                                       });
                                       //COMPRAR
                                       //Funciones
                                       function soloNumeros(evt) {
                                           evt = (evt) ? evt : window.event;
                                           var charCode = (evt.which) ? evt.which : evt.keyCode;
                                           if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                               return false;
                                           }
                                           return true;
                                       }
    function callRest(pRut, pSeguro, pLlave, pTipo, pPlan, pNroViajeros, pDiasViaje, pRutUsuario, pNombreCompleto) {
                                           var body = JSON.stringify({"IngresoDatosIN": {"Rut": pRut, "Seguro": pPlan, "Llave": pLlave, "Tipo": pTipo, "GrupoFam": pNroViajeros, "Cobertura": pDiasViaje, "RutCliente": pRutUsuario, "NombreCliente": pNombreCompleto, "Banco": "C", "Origen": "100", "Id": "1"}});
                                           var lReturn = false;
    
                                           console.log(body);
    
                                           jQuery('#error-message').html('Procesando...');
                                           jQuery.ajax({
                                               url: gURLRest,
                                               data: body,
                                               type: 'POST',
                                               dataType: 'json',
                                               contentType: 'application/json',
                                               async: false,
                                               cache: false,
                                               success: function (data) {
                                                   gRestMsgCadena = data.MsgCadena;
                                                   gRestPag_Idtrx = data.Pag_Idtrx;
    
                                                   console.log('gRestMsgCadena ' + gRestMsgCadena);
                                                   console.log('gRestPag_Idtrx  ' + gRestPag_Idtrx);
    
                                                   if ((gRestMsgCadena != '') && (gRestPag_Idtrx != '')) {
                                                       lReturn = true;
                                                   }
                                               },
                                               error: function (xhr, ajaxOptions, thrownError) {
                                                   console.log(xhr, ajaxOptions, thrownError);
                                               }
                                           });
                                           return lReturn;
                                       }
    
                                       function pad(str, max) {
                                           str = str.toString();
                                           return str.length < max ? pad("0" + str, max) : str;
                                       }
    
                                       function enableButton() {
                                           $('#btn-continuar').css('opacity', '1');
                                       }
    });