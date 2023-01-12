const productos = [
    {
        id: 1,
        nombre: "Pimentones 250 grs",
        precio: 8400,
        img: "./img/productos/01.png"
    },
    {
        id: 2,
        nombre: "Remolachas 300 grs",
        precio: 6200,
        img: "./img/productos/02.png"
    },
    {
        id: 3,
        nombre: "Zanahorias 300 grs",
        precio: 10650,
        img: "./img/productos/03.png"
    },
    {
        id: 4,
        nombre: "Tomates 300 grs",
        precio: 7300,
        img: "./img/productos/04.png"
    },
    {
        id: 5,
        nombre: "Miel Orgánica 500 grs",
        precio: 35600,
        img: "./img/productos/05.png"
    },

]

const carritoProductos = document.querySelector("#productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const cantidad = document.querySelector("#cantidad-productos");

cargarProductos(productos);

/*Funciones*/
function cargarProductos(productos) {

    carritoProductos.innerHTML = "";

    productos.forEach( producto => {

        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML += `
            <div class="descripcion">
                <img class="centered" src="${producto.img}" alt="${producto.nombre}">
                <p><b>${producto.nombre}</b></p>
                <p>$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">AGREGAR</button>
            </div>`;

        carritoProductos.append(item);

    });

    actualizarBotonesAgregar();

}

let productosEnCarrito;
const productosEnCarritoLS = localStorage.getItem("productos-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarCantidad();
} else{
    productosEnCarrito = [];
}

function agregarProductoCarrito(e){
        
    const idBoton = e.currentTarget.id;
    const productoAgregar = productos.find(producto => producto.id == idBoton);

    if (productosEnCarrito.some(producto => producto.id == idBoton)){
        const indexProducto = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[indexProducto].cantidad += 1;
    } else{
        productoAgregar.cantidad = 1;
        productosEnCarrito.push(productoAgregar);
    }

    actualizarCantidad();

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCantidad(){
    let num = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad , 0);
    cantidad.innerText = num;
}

function actualizarBotonesAgregar(){

    botonesAgregar = document.querySelectorAll(".producto-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarProductoCarrito);
    });

}