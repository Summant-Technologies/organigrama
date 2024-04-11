
addEventListener('DOMContentLoaded', ()=>{
    $(document).ready(function() {
        $.ajax({
            url: '../jsp/sse_g0_menu_wu.jsp',
            type: 'GET',
            success: function(data) {
                // Inserta el contenido del JSP en un elemento div con el id 'contenido'
                $('#menu-wu').html(data);
            },
            error: function() {
                alert('Error al cargar el contenido del JSP');
            }
        });
    });

})
