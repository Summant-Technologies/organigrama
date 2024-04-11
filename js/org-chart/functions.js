
// ****************** BUSCADORES DE LA PAGINA | SSE_G0_ORG_CHART ************************
function filterChart(e) {
  
  const valWu = document.getElementById("inputWu").value.toLowerCase().split(" ");
  const valNombre = document.getElementById("inputName").value.toLowerCase().split(" ");
  const valPalabrasClaves = document.getElementById("inputPalabrasClave").value.toLowerCase().split(" ");

  // busco si alguno de los dos es mayor a 3 y apartir de ahi hago la busqueda
  const cumpleReqBusqueda = valWu.some((term) => term.length > 3) || valNombre.some((term) => term.length > 3) || valPalabrasClaves.some((term) => term.length > 3);

  if (cumpleReqBusqueda) {
    // remuevo los que estaban marcados

    chart.clearHighlighting();

    // me traigo los nodos
    const data = chart.data();

    // los que estaban expandidos se contraen
    data.forEach((d) => (d._expanded = false));

    let ancestros; 
    // loopeo data y chequeo si d.name y d.area incluyen "term" que vendrian a ser las letras de la palabra
    data.forEach((d) => {
      if (
        (valWu.length === 0 || valWu.every((term) => d.area.toLowerCase().includes(term))) &&
        (valNombre.length === 0 || valNombre.every((term) => d.name.toLowerCase().includes(term))) &&
        (valPalabrasClaves.length == 0 || valPalabrasClaves.every((term) => d.palabrasClave.toLowerCase().includes(term)))
      ) {
        // si encuentra estos datos, a d lo expande y le remarca el borde
        
        d._upToTheRootHighlighted = true;
        d._highlighted = true;
        d._expanded = true;
        //chart.setUpToTheRootHighlighted(d.id);
      }
    });

    // renderizo el organigrama de vuelta
    
    chart.setActiveNodeCentered(true);
    chart.data(data).render().fit();
  }
}

/* ***************** ADDEVENTLISTENERS ************************* */

addEventListener('DOMContentLoaded', ()=>{
  let boton_desc_wu = document.getElementById('descripcion-wu')
  let agrupador_desc = document.getElementById('agrupador-desc-wu')

  boton_desc_wu.addEventListener('click', () => {
    agrupador_desc.classList.remove('d-none')
    boton_desc_wu.classList.add('d-none')
  })

  let boton_close_wu = document.getElementById('btn-close-wu')
  boton_close_wu.addEventListener('click', () => {
    boton_desc_wu.classList.remove('d-none')
    agrupador_desc.classList.add('d-none')
  })
})

/*********** SSE_G0_MENU_WU **************/
/* FILTRO EL ARRAY POR LA WU*/

function generarChartxWu(id_wu, nombre, descripcion, resp){
  console.log(id_wu, nombre, descripcion, resp)

  //const data = chart.data()
  const data = arrayCompleto // array completo es una variable global definida en sse_g0_org_chart.jsp
  //console.log(data, "array completo")
  //console.log(id_wu, "id wu")
  let id_parent_wu = encontrarParentIdPorIdWu(id_wu)
 // console.log(id_parent_wu, "id parent wu")

  let array_personas_wu = buscaDependencias(data, id_parent_wu) 
  //console.log(array_personas_wu, "array personas wu")

  //traigo todas las personas que tengan como id padre el id_parent_wu
  let registro_id_parent = data.find(item => item.id === id_parent_wu);
  //console.log(registro_id_parent, "reg parent")
  console.log(array_personas_wu)
  array_personas_wu.unshift(registro_id_parent)

  let result = array_personas_wu.find( (element) =>  element.id === id_parent_wu )
  //console.log(result)
  let temp = result.parentId;
  result.parentId = ""

  //console.log(arrayCompleto, "desp de ejecutar")
  chart.data(array_personas_wu)

  // chart.lastTransform.k = 1;
  // chart.lastTransform.x = 1;
  // chart.lastTransform.y = -14;
  // chart.initialZoom(1)
  
  chart.render()
  // console.log(registro_id_parent.id)
  chart.setCentered(result.id)
//   let g_chart = document.getElementsByClassName('chart')
//   g_chart[0].setAttribute("transform", "translate(-64,63) scale(1)") 
// //cada vez que clickeo un link de menu acomodo el chart para que se centre
//   let g_center_group = document.getElementsByClassName('center-group')
//   let transform = g_center_group[0].getAttribute('transform')
//   let nuevoTransform = transform.replace(/translate\([^)]*\)/, "translate(430.13281978710955,152.02197610477694)").replace(/scale\([^)]*\)/, " scale(0.5743491774985174)");
//   g_center_group[0].setAttribute('transform', nuevoTransform)

 
// console.log(g_chart,transform,nuevoTransform)

  result.parentId = temp

  nameAndDescriptionWu(nombre, descripcion, resp, id_wu)

}

function nameAndDescriptionWu(nombre, descripcion, resp, id_wu){
  // console.log(id_wu)
  let nombreP = document.getElementById('nombre-wu');
  let descWu = document.getElementById('desc-wu');
  let editBtn = document.getElementsByClassName('btn-edit')[0];
  let guardarWuBtn = document.getElementsByClassName('guardar-wu')[0];
  let textArea = document.getElementById('desc-wu');

    if(activeUser == resp){
      editBtn.classList.remove('d-none')
      guardarWuBtn.classList.remove('d-none')
      textArea.disabled = false;
      guardarWuBtn.onclick = function(event){
      event.preventDefault()
      grabarDescWu(id_wu) // agregar la funcion grabar aca tiene que traer lo que esta actualizado en el text area y grabarlo en la tabla:D
    }
    }else{
      
        if( !editBtn.classList.contains('d-none') || !guardarWuBtn.classList.contains('d-none') ){
          editBtn.classList.add('d-none')
          guardarWuBtn.classList.add('d-none')
          textArea.disabled = true;
        }

    }
    
    nombreP.textContent = nombre
    
    if( descripcion == null){
      descWu.textContent = "Aún no se ha cargado la descripción de esta unidad, si sos el responsable vas a poder editarla haciendo click en el boton ubicado a la derecha del nombre."
    }else{
      descWu.textContent = descripcion
    }
    

  }


  function grabarDescWu(idWu){
    // traigo el contenido del textarea
    var descripcion = $("#desc-wu").val();

    // realizo la solicitud AJAX
    $.ajax({
        type: "POST",
        url: "../jsp/graba/sse_g0_graba_desc_wu.jsp", 
        data: {
            descripcion: descripcion,
            idWu: idWu
        },
        success: function (data) {
            // manejo la respuesta del servidor
            //console.log(data);
        },
        error: function (error) {
            console.error("Error en la solicitud AJAX: " + error);
        }
    });

}


function fetchDataChart(){
      $.ajax({
          url: '../jsp/sse_g0_carga_datos.jsp',
          type: 'GET',
          success: function(data) {
            try{
              // console.log(orgJSON)
              // console.log(data)

              return data.orgJSON;
            }catch(e){
              console.log("Error" + e)
            }
          },
          error: function() {
              alert('Error al cargar el contenido del JSP');
          }
      });
}

function encontrarParentIdPorIdWu(id_wu) {
  const array = arrayCompleto
  const unidad = array.find((persona) => (persona.idWu === id_wu ) && (persona.responsable == 1) );

  if(unidad != undefined){
      if (unidad.id != null) {
        return unidad.id;
      }
  }
  return null;
}

function buscaDependencias(data, parentId) {
  let dependencias = [];
  for (const item of data) {
      if (item.parentId === parentId) {
          dependencias.push(item);
          // Llama recursivamente para encontrar la conexion entre los nodos
          dependencias.push(...buscaDependencias(data, item.id));
      }
  }
  return dependencias;
}

function cambiarMenu(event){
  const btnMenu = document.querySelectorAll('.btn-menu')
  const id = event.target.dataset.id
  const tabMenu = document.querySelectorAll('.tab-menu')

  console.log(btnMenu)
  if(id){
    btnMenu.forEach(btn => {
      btn.classList.remove('btn-seleccionado')
      // console.log(btn)
    })
    event.target.classList.add('btn-seleccionado')

    console.log("entro id")

    tabMenu.forEach( contenido => {
      contenido.classList.remove("active")
    })

    let menuActivo = document.getElementById(id)
    menuActivo.classList.add("active")
  }
}

/*** SSE_G0_VER_PERFIL FUNCTIONS ***/

// function grabarDesc(){
//      // traigo el contenido del textarea
//      var descripcion = $("#desc-perfil").val();

//      // realizo la solicitud AJAX
//      $.ajax({
//          type: "POST",
//          url: "../jsp/graba/sse_g0_graba_descripcion.jsp", 
//          data: {
//              descripcion: descripcion
//          },
//          success: function (data, textStatus, jqXHR) {
//              // manejo la respuesta del servidor
//              resolve(jqXHR.status) 
//              //return jqXHR.status;
//          },
//          error: function (error) {
//              console.error("Error en la solicitud AJAX: " + error);
//          }
//      });

// }

function grabarDesc() {
  return new Promise(function (resolve, reject) {
      // traigo el contenido del textarea
      var descripcion = $("#desc-perfil").val();

      // realizo la solicitud AJAX
      $.ajax({
          type: "POST",
          url: "../jsp/graba/sse_g0_graba_descripcion.jsp",
          data: {
              descripcion: descripcion
          },
          success: function (data, textStatus, jqXHR) {
              if (jqXHR.status === 200) {
                  resolve(jqXHR.status);
              } else {
                  reject(jqXHR.status);
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              reject(jqXHR.status);
          }
      });
  });
}

// function grabarTags(){
//   let tagEdit = document.querySelector('input[name=ejemplo]')
//   let valueTag = tagEdit.value
//   let jsonTag = JSON.parse(valueTag)
//   let palabrasClave = jsonTag.map(element => element.value)
//   let stringSeparado = "";
//   palabrasClave.forEach(texto =>{
//     stringSeparado += "," + texto;
//   } )

//   console.log(stringSeparado)
//   // Realiza la solicitud AJAX

//   $.ajax({
//       type: "POST",
//       url: "../jsp/graba/sse_g0_graba_tags.jsp", // Cambia esto por la ruta correcta a tu script JSP de procesamiento
//       data: {
//           palabrasClave: stringSeparado
//       },
//       success: function (data) {
//           // Manejar la respuesta del servidor
//           console.log(data);
//       },
//       error: function (error) {
//           console.error("Error en la solicitud AJAX: " + error);
//       }
//   });

// }

function grabarTags(id_person) {


    return new Promise(function (resolve, reject) {
        let tagEdit = document.querySelector('input[name=ejemplo]');
        let valueTag = tagEdit.value;
        let jsonTag = JSON.parse(valueTag);
        let palabrasClave = jsonTag.map(element => element.value);
        let stringSeparado = palabrasClave.join(',');

        // Realiza la solicitud AJAX
        $.ajax({
            type: "POST",
            url: "../jsp/graba/sse_g0_graba_tags.jsp",
            data: {
                palabrasClave: stringSeparado
            },
            success: function (data, textStatus, jqXHR) {
                // Resuelve la promesa con el status solamente
                
                resolve(jqXHR.status);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Rechaza la promesa con el status en caso de error
                reject(jqXHR.status);
            }
        });
    });

    
}


/* ############ HIDE LEFT MENU ################### */

function ocultarMenu() {
  var menuElement = document.getElementById("left-menu");
  let btnShowMenu = document.getElementsByClassName('btn-show-menu')[0]
  let rightContainer = document.getElementById('right-container')

  rightContainer.classList.remove("col-md-8", "col-lg-8");
  rightContainer.classList.add("col-md-12", "col-lg-12");
  let agrupador = document.getElementById('agrupador')
  agrupador.style.left = "22%";

  // console.log(btnShowMenu)
  
  menuElement.style.display = "none";
  btnShowMenu.style.display = "block";
}
function mostrarMenu() {
  var menuElement = document.getElementById("left-menu");
  let btnShowMenu = document.getElementsByClassName('btn-show-menu')[0]
  let rightContainer = document.getElementById('right-container')
  let agrupador = document.getElementById('agrupador')

  agrupador.style.left = "15%";
  rightContainer.classList.remove("col-md-12", "col-lg-12");
  rightContainer.classList.add("col-md-8", "col-lg-8");
  

  menuElement.style.display = "block";
  // console.log(btnShowMenu)
  btnShowMenu.style.display = "none";
}