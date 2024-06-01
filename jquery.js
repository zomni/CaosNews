$(document).ready(function() {
    function isLoggedIn() {
        return localStorage.getItem('loggedIn') === 'true';
    }

    function getLoggedInUserName() {
        return localStorage.getItem('userName');
    }

    function showUserName() {
        if (isLoggedIn()) {
            $('#userDropdown').show();
            $('#loginLink').hide();
            $('#userName').text(getLoggedInUserName());
        } else {
            $('#userDropdown').hide();
            $('#loginLink').show();
        }
    }

    function logout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('noticias'); // Elimina las noticias guardadas
        window.location.reload();
    }

    function showAddNewsSection() {
        if (isLoggedIn()) {
            $('#addNewsSection').show();
            $('#userDropdown').show();
            $('#loginLink').hide();
            $('#userName').text(getLoggedInUserName());
        } else {
            $('#addNewsSection').hide();
            $('#userDropdown').hide();
            $('#loginLink').show();
        }
    }

    function mostrarMensajeExito() {
        alert("¡Formulario enviado correctamente!");
    }

    $("#bEnviar").click(function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
        var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
        var nombre = $("#itNombre").val();
        var correo = $("#itMail").val();
        var contraseña = $("#itContraseña").val();

        if (nombre === "") {
            $("#mensaje1").fadeIn();
            return false;
        } else {
            $("#mensaje1").fadeOut();
        }

        if (correo === "" || !expr.test(correo)) {
            $("#mensaje2").fadeIn();
            return false;
        } else {
            $("#mensaje2").fadeOut();
        }

        if (contraseña === "") {
            $("#mensaje3").fadeIn();
            return false;
        } else {
            $("#mensaje3").fadeOut();
        }

        // Simulación de inicio de sesión exitoso
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', nombre);
        mostrarMensajeExito();
        showAddNewsSection();
    });

    $("#addNoticiaBtn").click(function() {
        if (!isLoggedIn()) {
            alert("Debe iniciar sesión para agregar noticias.");
            window.location.href = "Login.html";
            return;
        }

        var titulo = $("#tituloNoticia").val();
        var descripcion = $("#descripcionNoticia").val();
        var imagen = $("#imagenNoticia")[0].files[0];
        var fecha = new Date().toISOString().split('T')[0]; // Obtener la fecha actual

        if (titulo !== "" && descripcion !== "" && imagen) {
            var reader = new FileReader();
            reader.onloadend = function() {
                var noticia = {
                    titulo: titulo,
                    descripcion: descripcion,
                    imagen: reader.result,
                    fecha: fecha
                };

                // Obtener noticias existentes del LocalStorage
                var noticias = JSON.parse(localStorage.getItem('noticias')) || [];

                // Agregar la nueva noticia
                noticias.push(noticia);

                // Guardar de nuevo en LocalStorage
                localStorage.setItem('noticias', JSON.stringify(noticias));

                // Mostrar la noticia en la página
                mostrarNoticias();

                // Limpiar campos
                $("#tituloNoticia").val('');
                $("#descripcionNoticia").val('');
                $("#imagenNoticia").val('');
            }
            reader.readAsDataURL(imagen);
        } else {
            alert("Por favor, ingrese el título, la descripción y seleccione una imagen.");
        }
    });

    function mostrarNoticias() {
        var noticias = JSON.parse(localStorage.getItem('noticias')) || [];
        var noticiasHtml = '';

        noticias.forEach(function(noticia) {
            noticiasHtml += '<div class="noticia">';
            noticiasHtml += '<h3>' + noticia.titulo + '</h3>';
            noticiasHtml += '<p>' + noticia.descripcion + '</p>';
            if (noticia.imagen) {
                noticiasHtml += '<img src="' + noticia.imagen + '" alt="' + noticia.titulo + '" class="img-fluid">';
            }
            noticiasHtml += '<small>' + noticia.fecha + '</small>';
            noticiasHtml += '</div>';
        });

        $('#noticiasDestacadas').html(noticiasHtml);
    }

    // Comprobar si el usuario está logueado al cargar la página
    showUserName();
    showAddNewsSection();
    mostrarNoticias();

    // Evento de logout
    $("#logoutBtn").click(function() {
        logout();
    });
    
    // Funcion para abrir las cards
    $('#modal-container').load('modal.html');

    $('.card').click(function(){
        $('.biografia').hide();
        $(this).find('.biografia').show();
    });
});

function modooscuro() {
    var oscuro = document.body;
    oscuro.classList.add("transition");
    oscuro.classList.toggle("oscuro");

    var darkModeSwitch = document.getElementById("darkModeSwitch");
    if (oscuro.classList.contains("oscuro")) {
        darkModeSwitch.checked = true;
        localStorage.setItem('modoOscuro', 'true');
    } else {
        darkModeSwitch.checked = false;
        localStorage.setItem('modoOscuro', 'false');
    }
    
    // Elimina la clase 'transition' después de que se complete la transición
    setTimeout(function() {
        oscuro.classList.remove("transition");
    }, 500);
}

// Inicializa el modo oscuro basado en el almacenamiento local
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('modoOscuro') === 'true') {
        document.body.classList.add('oscuro');
        document.getElementById("darkModeSwitch").checked = true;
    } else {
        document.getElementById("darkModeSwitch").checked = false;
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> d0f03d825b8a1587c9279266a2a5b0cc2b9fd3c1
