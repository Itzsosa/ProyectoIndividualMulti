var fromulario = document.getElementById("formulario");
var alertaError = document.getElementById("alertError");
var alertWarning = document.getElementById("alertWarning");

fromulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores de los campos de entrada
  let nombre = document.getElementById("nombre").value;

  var datosEnviar = {
    nombre: nombre,
  };

  console.log(datosEnviar);
  fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarGrupo.php", {
    method: "POST",
    body: JSON.stringify(datosEnviar),
  })
    .then(function (response) {
      //Manejo la respuesta de la API
      if (response.ok) {
        //cambiar alert
        window.location.href = "listaGrupos.html";
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
