$(document).ready(function() {
    
    $('#table_documentos').on('click', '.eliminar', function (event) {
        event.preventDefault()
        if ($(this).on('click')) {
            $('#modalEliminar').modal('show');
            $(this).closest('tr').remove();
            setTimeout(function () {
                $('#modalEliminar').modal('hide');
            }, 5000);
        }
    });
    // $('body').on('click', '.estoyseguro', function () {
        
    //     $('#modalEliminar').modal('hide');
    //     $('body').find('#table_documentos').closest('tr').remove();
    // })
    
});


    
/* $(this).closest('tr').remove();
$('#modalEliminar').modal('show'); */

