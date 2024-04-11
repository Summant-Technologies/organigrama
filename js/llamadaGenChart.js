// function fetchData(url, targetElementId) {
//     return new Promise((resolve, reject) => {
//       $.ajax({
//         url: url,
//         type: 'GET',
//         success: function(data) {
//           $(`#${targetElementId}`).html(data);
//           resolve();
//         },
//         error: function() {
//           reject(new Error('Error al cargar el contenido del JSP'));
//         }
//       });
//     });
//   }
  
//   document.addEventListener('DOMContentLoaded', () => {

//     Promise.all([
//       addAuditRegister(),
//       fetchData('../jsp/sse_g0_gen_chart.jsp', 'container-chart'),
//       fetchData('../jsp/sse_g0_menu_wu.jsp', 'menu-wu'),
//     ])
//     .catch((error) => {
//       console.error(error);
//       // Maneja errores aquí si es necesario
//     });
   
//   });
  
// function addAuditRegister() {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//         type: "POST",
//         url: "../jsp/graba/sse_g0_graba_audit.jsp", 
//         success: function (data) {
//             // manejo la respuesta del servidor
//             console.log(data, " -> Esto es audit register");
//         },
//         error: function (error) {
//             console.error("Error en la solicitud AJAX: " + error);
//         }
//     });
//   });
// }