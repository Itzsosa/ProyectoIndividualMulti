var fromulario = document.getElementById("formulario");
var alertaError = document.getElementById("alertError");
var alertWarning = document.getElementById("alertWarning");

fromulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores de los campos de entrada
  let cedula = document.getElementById("cedula").value;
  let nombre = document.getElementById("nombre").value;
  let apellidopaterno = document.getElementById("apellidoPaterno").value;
  let apellidomaterno = document.getElementById("apellidoMaterno").value;
  let telefono = document.getElementById("telefono").value;
  let telefonoCelular = document.getElementById("telefonoCelular").value;
  let correo = document.getElementById("correo").value;
  let nacionalidad = document.getElementById("nacionalidad").value;
  let direccion = document.getElementById("direccion").value;
  let fechaNacimiento = document.getElementById("fechaNacimiento").value;
  let sexo = document.getElementById("sexo").value;
  let idCarrera = document.getElementById("idCarrera").value;
  let usuario = document.getElementById("usuario").value;

  var datosEnviar = {
    cedula: cedula,
    correoelectronico: correo,
    telefono: telefono,
    telefonocelular: telefonoCelular,
    fechanacimiento: fechaNacimiento,
    sexo: sexo,
    direccion: direccion,
    nombre: nombre,
    apellidopaterno: apellidopaterno,
    apellidomaterno: apellidomaterno,
    nacionalidad: nacionalidad,
    idCarreras: idCarrera,
    usuario: usuario,
  };

  fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarEstudiantes.php", {
    method: "POST",
    body: JSON.stringify(datosEnviar),
  })
    .then(function (response) {
      //Manejo la respuesta de la API
      if (response.ok) {
        window.location.href = "listaEstudiantes.html";
      } else {
        alertaError.hidden = false;
      }
    })
    .catch(function (error) {
      console.log(error);
      alertaError.hidden = false;
    });
});
