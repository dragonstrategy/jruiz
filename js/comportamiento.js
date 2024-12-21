// Array de productos
const productos = [
    {
        imagen: "imagenes/remeras/remera1.jpg",
        nombre: "Remera BTC basica",
        precio: "$20.00"
    },
    {
        imagen: "imagenes/remeras/remera2.jpg",
        nombre: "Remera Multi Color",
        precio: "$22.00"
    },
    {
        imagen: "imagenes/remeras/remera3.jpg",
        nombre: "Remera Pixel",
        precio: "$25.00"
    },
    {
        imagen: "imagenes/remeras/remera4.jpg",
        nombre: "Remera BTC Pastel",
        precio: "$30.00"
    }
];

// Contenedores
const productosContenedor = document.getElementById("productos-contenedor");
const carritoContenedor = document.getElementById("carrito-contenedor");
const carritoSeccion = document.getElementById("carrito-seccion");

// Carrito de compras
let carrito = [];

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();

        // Mostramos la sección del carrito si hay productos
        if (carrito.length > 0) {
            carritoSeccion.style.display = "block";
        }
    }
}

// Función para mostrar los productos
function mostrarProductos(productos) {
    productosContenedor.innerHTML = ""; // Limpiamos el contenedor

    for (let i = 0; i < productos.length; i += 4) {
        const fila = document.createElement("div");
        fila.classList.add("fila");

        const grupoProductos = productos.slice(i, i + 4);
        grupoProductos.forEach(producto => {
            const productoHTML = `
                <div class="producto">
                    <div class="producto-imagen">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <label>${producto.nombre}</label>
                        <p class="precio">${producto.precio}</p>
                        <button class="btn-agregar" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            `;
            fila.innerHTML += productoHTML;
        });

        productosContenedor.appendChild(fila);
    }

    // Agregamos eventos a los botones de agregar
    document.querySelectorAll(".btn-agregar").forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Función para agregar al carrito
function agregarAlCarrito(event) {
    const nombre = event.target.getAttribute("data-nombre");
    const precio = event.target.getAttribute("data-precio");
    const imagen = event.target.getAttribute("data-imagen");

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya está, aumentamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no está, lo agregamos con cantidad 1
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    // Guardamos el carrito en localStorage
    guardarCarrito();

    // Mostramos la sección del carrito si está oculta
    if (carritoSeccion.style.display === "none") {
        carritoSeccion.style.display = "block";
    }

    // Actualizamos el carrito visual
    mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    carritoContenedor.innerHTML = ""; // Limpiamos el carrito

    let total = 0;

    carrito.forEach((producto, index) => {
        const precioNumerico = parseFloat(producto.precio.replace('$', '').replace(',', ''));
        const totalProducto = precioNumerico * producto.cantidad;
        total += totalProducto;

        const productoHTML = `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-miniatura">
                <div>
                    <p>${producto.nombre} - ${producto.precio}</p>
                    <label>Cantidad: </label>
                    <input type="number" value="${producto.cantidad}" min="1" class="input-cantidad" data-index="${index}">
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                </div>
                <p class="total-producto">Total: $${totalProducto.toFixed(2)}</p>
            </div>
        `;
        carritoContenedor.innerHTML += productoHTML;
    });

    // Mostrar el total
    const totalHTML = `
        <div class="total-carrito">
            <p>Total: $${total.toFixed(2)}</p>
        </div>
    `;
    carritoContenedor.innerHTML += totalHTML;

    // Agregamos eventos a los botones de eliminar y de cantidad
    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

    document.querySelectorAll(".input-cantidad").forEach(input => {
        input.addEventListener("change", cambiarCantidad);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(event) {
    const index = event.target.getAttribute("data-index");
    carrito.splice(index, 1); // Eliminamos el producto del array

    // Guardamos el carrito actualizado en localStorage
    guardarCarrito();

    // Si el carrito está vacío, ocultamos la sección
    if (carrito.length === 0) {
        carritoSeccion.style.display = "none";
    }

    // Actualizamos el carrito visual
    mostrarCarrito();
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(event) {
    const index = event.target.getAttribute("data-index");
    const nuevaCantidad = parseInt(event.target.value);

    if (nuevaCantidad > 0) {
        carrito[index].cantidad = nuevaCantidad;
        guardarCarrito();
        mostrarCarrito();
    }
}

// Inicialización
cargarCarrito();
mostrarProductos(productos);


