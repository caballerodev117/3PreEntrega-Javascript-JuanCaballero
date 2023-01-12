/* Funcionalidad Shopping cart */
let productosLS = localStorage.getItem("productos-carrito");
productosLS = JSON.parse(productosLS);

const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#contenedor-carrito");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-compra");
let botonesEliminar = document.querySelectorAll(".producto-boton");
const botonVaciar = document.querySelector("#boton-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#boton-comprar");

cargarProductosCarrito();

botonVaciar.addEventListener("click", vaciarCarrito);
botonComprar.addEventListener("click", comprarCarrito);

function cargarProductosCarrito() {
    if (productosLS  && productosLS.length > 0){

        carritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosLS.forEach(producto => {
            const carritoDiv = document.createElement("div");
            carritoDiv.classList.add("carrito-producto")
            carritoDiv.innerHTML = `
                <img class="carrito-img" src="${producto.img}" alt="${producto.nombre}">
                <div>
                <small>Nombre</small>
                <p><strong>${producto.nombre}</strong></p>
                </div>
                <div>
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div>
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div>
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <div>
                    <button class="producto-boton" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
                </div>`;
            
            contenedorCarritoProductos.append(carritoDiv);
    
        });
    
    } else {
    
        carritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

function actualizarBotonesEliminar(){

    botonesEliminar = document.querySelectorAll(".producto-boton");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProductoCarrito);
    });

}

function eliminarProductoCarrito(e){
        
    const idBoton = e.currentTarget.id;
    const indexProducto = productosLS.findIndex(producto => producto.id == idBoton);

    productosLS.splice(indexProducto, 1);

    cargarProductosCarrito();

    localStorage.setItem("productos-carrito", JSON.stringify(productosLS));
}

function vaciarCarrito(){
        
    productosLS.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosLS));
    cargarProductosCarrito();
}

function actualizarTotal(){
    const totalCalculado =  productosLS.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    contenedorTotal.textContent = `$${totalCalculado}`;
}

function comprarCarrito(){
    productosLS.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosLS));
    
    carritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}