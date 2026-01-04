// CaosNews - UI helpers (login state + dark mode)
$(document).ready(function () {

  // --- Login state in navbar ---
  function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  function getUserName() {
    return localStorage.getItem('userName') || '';
  }

  function renderNavbarAuth() {
    if (isLoggedIn()) {
      $('#loginLink').hide();
      $('#userDropdown').show();
      $('#userName').text(getUserName() || 'Usuario');
    } else {
      $('#loginLink').show();
      $('#userDropdown').hide();
      $('#userName').text('');
    }
  }

  // Logout
  $('#logoutBtn').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    renderNavbarAuth();
    // redirige al inicio
    window.location.href = "CaosNew.html";
  });

  renderNavbarAuth();

  // --- Dark mode persisted ---
  const saved = localStorage.getItem('modoOscuro');
  if (saved === 'true') {
    document.body.classList.add('oscuro');
    if (document.getElementById("darkModeSwitch")) {
      document.getElementById("darkModeSwitch").checked = true;
    }
  } else if (saved === 'false') {
    document.body.classList.remove('oscuro');
    if (document.getElementById("darkModeSwitch")) {
      document.getElementById("darkModeSwitch").checked = false;
    }
  }
});

// Debe ser global porque lo llamas desde onclick=""
window.modooscuro = function () {
  const body = document.body;
  body.classList.add("transition");
  body.classList.toggle("oscuro");

  const isDark = body.classList.contains("oscuro");
  localStorage.setItem('modoOscuro', isDark ? 'true' : 'false');

  const sw = document.getElementById("darkModeSwitch");
  if (sw) sw.checked = isDark;

  // Quita transición para que no afecte otros cambios
  setTimeout(() => body.classList.remove("transition"), 400);
};
