//declaracion de variable
var contenidoTablaResultado = document.querySelector("#resultados");

function cargarDatos() {
  fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaCurso.php")
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
    //console.log("valor", valor);
    contenidoTablaResultado.innerHTML += `
      <tr class="table-primary">
        <td scope="row">${valor.id}</td>
        <td>${valor.nombre}</td>
        <td>${valor.descripcion}</td>
        <td>${valor.tiempo}</td>
        <td>${valor.usuario}</td>
        <td>
          <button type="button" class="btn btn-success" onClick="mostrarDetallesCurso('${valor.id}','${valor.nombre}','${valor.descripcion}','${valor.tiempo}','${valor.usuario}')">Detalles</button>
          <button type="button" class="btn btn-primary" 
          onClick="modificarCurso('${valor.id}','${valor.nombre}','${valor.descripcion}','${valor.tiempo}','${valor.usuario}')"
          >Editar</button> 
          <button type="button" class="btn btn-danger" onClick="mostrarModalBorrarCurso('${valor.id}','${valor.nombre}')">Borrar</button>
        </td>
      </tr>`;
  }
}

//, nombre, descripcion, tiempo,usuario
const myModal = new bootstrap.Modal(document.getElementById("modalId"));
function modificarCurso(id, nombre, descripcion, tiempo, usuario) {
  myModal.show();

  document.getElementById("cursoId").value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("tiempo").value = tiempo;
  document.getElementById("usuario").value = usuario;
}

var formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores de los campos de entrada
  let nombre = document.getElementById("nombre").value;
  let descripcion = document.getElementById("descripcion").value;
  let tiempo = document.getElementById("tiempo").value;
  let id = document.getElementById("cursoId").value;
  let usuario = document.getElementById("usuario").value;

  var datosEnviar = {
    id: id,
    nombre: nombre,
    descripcion: descripcion,
    tiempo: tiempo,
    usuario: usuario,
  };

  if (
    nombre.trim() === "" ||
    descripcion.trim() === "" ||
    tiempo.trim() === ""
  ) {
    alert("Por favor, complete todos los campos.");
    return;
  }
  console.log(datosEnviar);
  fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarCursos.php", {
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
function mostrarModalBorrarCurso(id, nombre) {
  modalEliminar.show();

  document.getElementById("cursoIdEliminar").value = id;
  document.getElementById("nombreEliminar").value = nombre;
}

function borrarCurso() {
  let id = document.getElementById("cursoIdEliminar").value;
  var datosEnviar = {
    id: id,
  };

  fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarCursos.php", {
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
function mostrarDetallesCurso(id, nombre, descripcion, tiempo, usuario) {
  modalDetalles.show();

  document.getElementById("cursoIdDetalles").value = id;
  document.getElementById("nombreDetalles").value = nombre;
  document.getElementById("descripcionDetalles").value = descripcion;
  document.getElementById("tiempoDetalles").value = tiempo;
  document.getElementById("usuarioDetalles").value = usuario;
}

cargarDatos();
