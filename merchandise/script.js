document.addEventListener("DOMContentLoaded", function() {

    //toda la logica del carrito
    const cart = {
        products: [],

        //variable para añadir el producto
        addProduct: function(product) {
            //si está añádelo
            const hayProducto = this.products.find(p => p.id === product.id);
            if (hayProducto) {
                hayProducto.quantity += 1; //aqui añadimos uno
            } else {
                product.quantity = 1; // Si no, lo creamos como 1
                this.products.push(product); //y lo subimos a products
            }
            this.saveCart();
            this.updateCartDropdown();
            //guardamos y actualizamos
        },


        removeProduct: function(productId) {
            //la misma logica que antes pero quitando
            const Indexproducto = this.products.findIndex(p => p.id === productId);
            if (Indexproducto !== -1) {
                //si la cantidad en el array del producto es superior a 1, le bajamos 1, de no ser así splice o "remover"
                if (this.products[Indexproducto].quantity > 1) {
                    this.products[Indexproducto].quantity -= 1;
                } else {
                    this.products.splice(Indexproducto, 1);
                }
            }
            this.saveCart();
            this.updateCartDropdown();
        },

        //guardamos como JSON el producto
        saveCart: function() {
            localStorage.setItem('cart', JSON.stringify(this.products));
        },

        //cargamos el JSON 
        loadCart: function() {
            //cogemos del localstorage el item cart, que es elque guardamos arriba con el json
            const savedCart = localStorage.getItem('cart');
            //si está lo metemos a productos y updatemos, para que al cargar ponga en el carrito lo que ya habia.
            if (savedCart) {
                this.products = JSON.parse(savedCart);
                this.updateCartDropdown();
            }
        },

        //funcion que llamamos todo el rato para la logica de cosas
        updateCartDropdown: function() {
            //cogemos el ul de la lista
            const contenedorCarrito = document.querySelector('.cart-items');
            contenedorCarrito.innerHTML = ''; // Limpiar los elementos actuales
        
            //si el array estuviese vacío, ponemos un texto para incitar a la compra jeje
            if (this.products.length === 0) {
                const carritoVacioARellenar = document.createElement('li');
                carritoVacioARellenar.textContent = "Carrito vacío ¿Por qué no añades algo?";
                carritoVacioARellenar.style.padding = '20px';
                carritoVacioARellenar.style.textAlign = 'center';
                //y lo metemos como hijo al ul
                contenedorCarrito.appendChild(carritoVacioARellenar);
            } else {
                //que no es cero? es decir que hay algo, pos inicializamos las cosas a mostrar.
                let subtotal = 0; 
        
                //pasamos por cada objeto del array
                this.products.forEach(product => {
                    //en cada uno creamos un li con los datos del producto y lo metemos como hijo en formato.
                    const li = document.createElement('li');
                    li.style.padding = '10px';
                    li.textContent = `${product.name} - ${product.quantity}x | ${product.price} €`;
                    contenedorCarrito.appendChild(li);
        
                    //despues guardamos para justo ahora una variable con todas las veces que se repite para calcular el precio.
                    subtotal += product.price * product.quantity;
                });
        
                //forzamos que el punto esté en la posicion 2 para decimales.
                subtotal = subtotal.toFixed(2);
        
                //ahora creamos el elemento que meteremos abajo bonito con sus estilos y todo y la variable con la cantidad guardada.
                const subtotalElement = document.createElement('li');
                subtotalElement.textContent = `Subtotal: ${subtotal} €`;
                subtotalElement.style.fontWeight = 'bold'; 
                subtotalElement.style.borderTop = '1px solid #ccc'; //una linea que sino era lioso
                subtotalElement.style.paddingTop = '10px';
        
                //Lo añadimos
                contenedorCarrito.appendChild(subtotalElement);
            }
        }
    };
    
    //cuando se pulsa al botón de comprar se llama a esta función, que coge this producto y se guarda su imagen, el texto y el precio.
    const buyButtons = document.querySelectorAll('.comprar');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const productId = productElement.querySelector('img').id; // Asume que cada imagen de producto tiene un id único
            const productName = productElement.querySelector('p').textContent;
            const productPrice = productElement.querySelector('.descripcion').textContent.trim().split(' ')[0]; //para quitarle el precio que sino era una risa calcular el subtotal
            const productImage = productElement.querySelector('img').src;
            //variable donde guardar perse el objeto con todo lo que hemos cogido
            const product = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                quantity: 1
            };  
            
            //lo añadimos al carrito.
            cart.addProduct(product);
        });
    });

    //sin mas coge this del botón que pulsas y lo quita
    const deleteButtons = document.querySelectorAll('.eliminar');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const productId = productElement.querySelector('img').id; // Asegúrate de que el ID está en el <img>
            cart.removeProduct(productId);
        });
    });

    cart.loadCart();

    //fin de logica del carrito







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
