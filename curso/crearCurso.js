var fromulario = document.getElementById("formulario");
var alertaError = document.getElementById("alertError");
var alertWarning = document.getElementById("alertWarning");

fromulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores de los campos de entrada
  let nombre = document.getElementById("nombre").value;
  let descripcion = document.getElementById("descripcion").value;
  let tiempo = document.getElementById("tiempo").value;

  var datosEnviar = {
    nombre: nombre,
    descripcion: descripcion,
    tiempo: tiempo,
    usuario: "Itzsosa",
  };

  if (
    nombre.trim() === "" ||
    descripcion.trim() === "" ||
    tiempo.trim() === ""
  ) {
    alertWarning.hidden = false;
    return;
  }
  console.log(datosEnviar);
  fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarCursos.php", {
    method: "POST",
    body: JSON.stringify(datosEnviar),
  })
    .then(function (response) {
      //Manejo la respuesta de la API
      if (response.ok) {
        //cambiar alert
        window.location.href = "listaCursos.html";
      } else {
        //cambiar alert
        alertaError.hidden = false;
      }
    })
    .catch(function (error) {
      //cambiar alert
      console.log(error);
      alertaError.hidden = false;
    });
});
