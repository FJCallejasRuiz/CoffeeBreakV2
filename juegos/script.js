document.addEventListener("DOMContentLoaded", function() {
    const ourGamesLink = document.querySelector(".enlacesTexto");
    const dropdown = document.querySelector(".dropdown-content");
    const header = document.querySelector(".cabecera");

    dropdown.addEventListener('mouseleave', removePadding);
    function removePadding() {
        dropdown.style.display = "none";
        header.style.paddingBottom = "0";
    }

    ourGamesLink.addEventListener("click", function() {
        if (dropdown.style.display === "none" || dropdown.style.display === "") {
            dropdown.style.display = "block";
            header.style.paddingBottom = "30px";
        } else {
            dropdown.style.display = "none";
            header.style.paddingBottom = "0";
        }
        
    });

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'u') {
            event.preventDefault();
            window.location.href = '/informacion/informacion.html';
        }else if (event.ctrlKey && event.key === 'c'){
            event.preventDefault();
            window.location.href = '/merchandise/cart.html';
        }else if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            window.location.href = '/merchandise/merchandise.html';
        } else if  (event.ctrlKey && event.key === 'g') {
            event.preventDefault();
            const juegos = [
                '/juegos/juego1/juego.html',
                '/juegos/juego2/juego.html',
                '/juegos/juego3/juego.html',
                '/juegos/juego4/juego.html'
            ];
            const juegoAleatorio = juegos[Math.floor(Math.random() * juegos.length)];
            window.location.href = juegoAleatorio;
        } 
    });

    const subir = document.getElementById('subir');
        function scrollHandler() {
            if (window.pageYOffset > 100) {
                subir.style.display = 'block';
            } else {
                subir.style.display = 'none';
            }
        }
        window.addEventListener('scroll', scrollHandler);
        subir.addEventListener('click', function() {
            window.scrollTo(
            {
                top: 0,
                behavior: 'smooth'
            });
        });






});