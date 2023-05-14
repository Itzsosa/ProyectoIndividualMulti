function llenarHeaderFooter() {
  var headerParcial = document.querySelector("#headerParcial");

  headerParcial.innerHTML += `
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="/index.html">Lista de Elementos</a>
    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
      data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
      <ul class="navbar-nav me-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/curso/listaCursos.html">Cursos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/estudiante/listaEstudiantes.html">Estudiantes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profesor/listaProfesores.html">Profesores</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/grupo/listaGrupos.html">Grupos</a>
        </li>
      </ul>
    </div>
  </div>
  </nav>`;

  var footerParcial = document.querySelector("#footerParcial");

  footerParcial.innerHTML += `
  <div class="container">
  <p class="float-end mb-1">
    <a href="#">Back to top</a>
  </p>
  <p class="mb-1">Josue Sosa Araya &copy; Bootstrap</p>
  </div>`;
}

llenarHeaderFooter();
