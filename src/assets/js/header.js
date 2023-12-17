const adminHeader = `<header data-bs-theme="dark">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/admin.html">Admin Page</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>

          <button
            style="margin: 3px"
            class="btn btn-outline-light"
            type="button"
            onclick="window.location.replace('/html/create-diner.html')"
          >
            <!-- data-bs-toggle="modal" -->
            <!-- data-bs-target="#createDiner" -->

            상점 등록하기
          </button>

          <button
            style="margin: 3px"
            class="btn btn-outline-light"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#profileModal"
			onclick="toMyDiner()"
          >
            내 상점
          </button>

          <button
            onclick="remove()"
            class="btn btn-outline-light"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>`;

const userHeader = `<header data-bs-theme="dark">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">User Page</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>

          <button
            style="margin: 3px"
            class="btn btn-outline-light"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#"
          >
            Profile
          </button>

          <button
            onclick="remove()"
            class="btn btn-outline-light"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>`;

const indexHeader = `<header data-bs-theme="dark">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Food Web</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>

          <button
            style="margin: 3px"
            type="button"
            class="btn btn-outline-light"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Sign In
          </button>
          <button
            class="btn btn-outline-light"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#signupModal"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  </header>`;
