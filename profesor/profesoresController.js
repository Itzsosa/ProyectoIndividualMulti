var contenidoTablaResultado = document.querySelector("#resultados");

function cargarDatos() {
  fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaProfesores.php")
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
    console.log("valor", valor);
    contenidoTablaResultado.innerHTML += `
      <tr class="table-danger">
        <td scope="row">${valor.id}</td>
        <td>${valor.cedula}</td>
        <td>${valor.nombre}</td>
        <td>${valor.apellidopaterno}</td>
        <td>${valor.apellidomaterno}</td>
        <td>${valor.correoelectronico}</td>
        <td>${valor.telefono}</td>
        <td>${valor.nacionalidad}</td>
        <td>
          <button type="button" class="btn btn-success" 
          onClick="mostrarDetallesCurso('${valor.id}','${valor.cedula}','${valor.nombre}','${valor.correoelectronico}','${valor.telefono}',
          '${valor.telefonocelular}','${valor.fechanacimiento}','${valor.sexo}','${valor.direccion}','${valor.apellidopaterno}',
          '${valor.apellidomaterno}','${valor.nacionalidad}',
          '${valor.idCarreras}','${valor.usuario}')">Detalles</button>
          <button type="button" class="btn btn-primary" 
          onClick="mostrarModificarProfesor('${valor.id}','${valor.cedula}','${valor.nombre}','${valor.correoelectronico}','${valor.telefono}',
          '${valor.telefonocelular}','${valor.fechanacimiento}','${valor.sexo}','${valor.direccion}','${valor.apellidopaterno}',
          '${valor.apellidomaterno}','${valor.nacionalidad}',
          '${valor.idCarreras}','${valor.usuario}')"
          >Editar</button>
          <button type="button" class="btn btn-danger" onClick="mostrarModalBorrarProfesor('${valor.id}','${valor.cedula}','${valor.nombre}','${valor.apellidopaterno}',
          '${valor.apellidomaterno}')">Borrar</button>
        </td>
      </tr>`;
  }
}

const myModal = new bootstrap.Modal(document.getElementById("modalId"));
function mostrarModificarProfesor(
  id,
  cedula,
  nombre,
  correoelectronico,
  telefono,
  telefonocelular,
  fechanacimiento,
  sexo,
  direccion,
  apellidopaterno,
  apellidomaterno,
  nacionalidad,
  idCarreras,
  usuario
) {
  myModal.show();

  document.getElementById("id").value = id;
  document.getElementById("cedula").value = cedula;
  document.getElementById("nombre").value = nombre;
  document.getElementById("correo").value = correoelectronico;
  document.getElementById("telefono").value = telefono;
  document.getElementById("telefonoCelular").value = telefonocelular;
  document.getElementById("nacionalidad").value = nacionalidad;
  document.getElementById("fechaNacimiento").value = fechanacimiento;
  document.getElementById("sexo").value = sexo;
  document.getElementById("direccion").value = direccion;
  document.getElementById("apellidoPaterno").value = apellidopaterno;
  document.getElementById("apellidoMaterno").value = apellidomaterno;
  document.getElementById("idCarrera").value = idCarreras;
  document.getElementById("usuario").value = usuario;
}

var formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores de los campos de entrada
  let id = document.getElementById("id").value;
  let cedula = document.getElementById("cedula").value;
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let telefono = document.getElementById("telefono").value;
  let telefonocelular = document.getElementById("telefonoCelular").value;
  let nacionalidad = document.getElementById("nacionalidad").value;
  let fechanacimiento = document.getElementById("fechaNacimiento").value;
  let sexo = document.getElementById("sexo").value;
  let direccion = document.getElementById("direccion").value;
  let apellidopaterno = document.getElementById("apellidoPaterno").value;
  let apellidomaterno = document.getElementById("apellidoMaterno").value;
  let idCarreras = document.getElementById("idCarrera").value;
  let usuario = document.getElementById("usuario").value;

  var datosEnviar = {
    id: id,
    cedula: cedula,
    nombre: nombre,
    correoelectronico: correo,
    telefono: telefono,
    telefonocelular: telefonocelular,
    fechanacimiento: fechanacimiento,
    sexo: sexo,
    direccion: direccion,
    apellidopaterno: apellidopaterno,
    apellidomaterno: apellidomaterno,
    nacionalidad: nacionalidad,
    idCarreras: idCarreras,
    usuario: usuario,
  };

  console.log(datosEnviar);
  fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarProfesores.php", {
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

const modalEliminar = new bootstrap.Modal(
  document.getElementById("modalEliminar")
);
function mostrarModalBorrarProfesor(
  id,
  cedula,
  nombre,
  apellidopaterno,
  apellidomaterno
) {
  modalEliminar.show();

  document.getElementById("idEliminar").value = id;
  document.getElementById("cedulaEliminar").value = cedula;
  document.getElementById("nombreCompleto").value =
    nombre + " " + apellidopaterno + " " + apellidomaterno;
}

function borrarProfesor() {
  let id = document.getElementById("idEliminar").value;
  var datosEnviar = {
    id: id,
  };

  fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarProfesores.php", {
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
      alert("Error al enviar los datos");
    });
}

const modalDetalles = new bootstrap.Modal(
  document.getElementById("modalDetalles")
);
function mostrarDetallesCurso(
  id,
  cedula,
  nombre,
  correoelectronico,
  telefono,
  telefonocelular,
  fechanacimiento,
  sexo,
  direccion,
  apellidopaterno,
  apellidomaterno,
  nacionalidad,
  idCarreras,
  usuario
) {
  modalDetalles.show();

  document.getElementById("idDetalles").value = id;
  document.getElementById("cedulaDetalles").value = cedula;
  document.getElementById("nombreDetalles").value = nombre;
  document.getElementById("correoDetalles").value = correoelectronico;
  document.getElementById("telefonoDetalles").value = telefono;
  document.getElementById("telefonoCelularDetalles").value = telefonocelular;
  document.getElementById("nacionalidadDetalles").value = nacionalidad;
  document.getElementById("fechaNacimientoDetalles").value = fechanacimiento;
  document.getElementById("sexoDetalles").value = sexo;
  document.getElementById("direccionDetalles").value = direccion;
  document.getElementById("apellidoPaternoDetalles").value = apellidopaterno;
  document.getElementById("apellidoMaternoDetalles").value = apellidomaterno;
  document.getElementById("idCarreraDetalles").value = idCarreras;
  document.getElementById("usuarioDetalles").value = usuario;
}

cargarDatos();
