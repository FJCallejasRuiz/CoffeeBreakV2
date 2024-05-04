document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartData = localStorage.getItem('cart');

    if (cartData) {
        const products = JSON.parse(cartData);
        let subtotal = 0;

        products.forEach(product => {
            const li = document.createElement('li');
            li.className = "list-group-item product d-flex align-items-center";

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.style.width = '100px';
            img.className = "me-3";

            const productDetails = document.createElement('div');
            const productName = document.createElement('p');
            productName.textContent = product.name;
            productName.className = "    mb-1";
            const productInfo = document.createElement('p');
            productInfo.textContent = `${product.quantity}x - ${product.price} €`;
            productInfo.className = "mb-0";
            productDetails.appendChild(productName);
            productDetails.appendChild(productInfo);

            li.appendChild(img);
            li.appendChild(productDetails);
            cartItemsContainer.appendChild(li);

            subtotal += product.price * product.quantity;
        });

        subtotal = subtotal.toFixed(2);
        const subtotalElement = document.createElement('li');
        subtotalElement.textContent = `Subtotal: ${subtotal} €`;
        subtotalElement.style.fontWeight = 'bold';
        subtotalElement.className = "list-group-item";
        cartItemsContainer.appendChild(subtotalElement);

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirmar Compra';
        confirmButton.className = "btn btn-success mt-2";
        confirmButton.addEventListener('click', function() {
            alert('Compra confirmada!');
        });

        const confirmButtonContainer = document.createElement('li');
        confirmButtonContainer.className = "list-group-item";
        confirmButtonContainer.appendChild(confirmButton);
        cartItemsContainer.appendChild(confirmButtonContainer);
    } else {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Tu carrito está vacío.';
        emptyMessage.className = "list-group-item";
        cartItemsContainer.appendChild(emptyMessage);
    }





    

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