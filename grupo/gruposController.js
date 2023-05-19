//declaracion de variabe
var contenidoTablaResultado = document.querySelector("#resultados");

function cargarDatos() {
  fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaGrupo.php")
    .then((respuesta) => respuesta.json()) //recibe los datos em formato json
    .then((datosrespuesta) => {
      setTable(datosrespuesta.data); //lo envio a la funcion de abajo
      // console.log('Datos', datosrespuesta.data);
    })
    .catch(console.log);
}

function setTable(datos) {
  console.log("Datos", datos);

  for (const valor of datos) {
    contenidoTablaResultado.innerHTML += `
      <tr class="table-dark">
        <td scope="row">${valor.id}</td>
        <td>${valor.nombre}</td>
        <td>
          <button type="button" class="btn btn-success" onClick="mostrarDetallesGrupo('${valor.id}','${valor.nombre}')">Detalles</button>
          <button type="button" class="btn btn-primary" 
          onClick="modificarGrupo('${valor.id}','${valor.nombre}')"
          >Editar</button>
          <button type="button" class="btn btn-danger" onClick="mostrarModalBorrarGrupo('${valor.id}','${valor.nombre}')">Borrar</button>
        </td>
      </tr>`;
  }
}

const myModal = new bootstrap.Modal(document.getElementById("modalId"));
function modificarGrupo(id, nombre) {
  myModal.show();

  document.getElementById("grupoId").value = id;
  document.getElementById("nombre").value = nombre;
}

var formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores de los campos de entrada
  let id = document.getElementById("grupoId").value;
  let nombre = document.getElementById("nombre").value;

  var datosEnviar = {
    id: id,
    nombre: nombre,
  };

  console.log(datosEnviar);
  fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarGrupo.php", {
    method: "POST",
    body: JSON.stringify(datosEnviar),
  })
    .then(function (response) {
      //Manejo la respuesta de la API
      if (response.ok) {
        myModal.hide(); // Oculta el modal
        contenidoTablaResultado.innerHTML = ""; // Limpia el contenido de la tabla
        cargarDatos(); // Vuelve a cargar los datos actualizados
      } else {
        alert("Error al enviar los datos.");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Error al enviar los datos Catch");
    });
});

//Se crea el modal fuera de las funciones para apuntar a el modal a la hora de cerrarlo

const modalEliminar = new bootstrap.Modal(
  document.getElementById("modalEliminar")
);
function mostrarModalBorrarGrupo(id, nombre) {
  modalEliminar.show();

  document.getElementById("grupoIdEliminar").value = id;
  document.getElementById("nombreEliminar").value = nombre;
}

function borrarGrupo() {
  let id = document.getElementById("grupoIdEliminar").value;
  var datosEnviar = {
    id: id,
  };

  fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarGrupo.php", {
    method: "POST",
    body: JSON.stringify(datosEnviar),
  })
    .then(function (response) {
      //Manejo la respuesta de la API
      if (response.ok) {
        modalEliminar.hide(); // Oculta el modal
        contenidoTablaResultado.innerHTML = ""; // Limpia el contenido de la tabla
        cargarDatos(); // Vuelve a cargar los datos actualizados
      } else {
        alert("Error al enviar los datos.");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Error al enviar los datos Catch");
    });
}

const modalDetalles = new bootstrap.Modal(
  document.getElementById("modalDetalles")
);
function mostrarDetallesGrupo(id, nombre) {
  modalDetalles.show();

  document.getElementById("grupoIdDetalles").value = id;
  document.getElementById("nombreDetalles").value = nombre;
}

cargarDatos();
