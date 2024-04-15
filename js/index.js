const arrayStock = [
  { id: 1, nombre: "Nueces", precio: 1500, cantidad: 1 },
  { id: 2, nombre: "Porotos", precio: 850, cantidad: 1 },
  { id: 3, nombre: "Pimenton", precio: 500, cantidad: 1 },
  { id: 4, nombre: "Tomates", precio: 1200, cantidad: 1 },
  { id: 5, nombre: "Mani", precio: 1100, cantidad: 1 },
  { id: 6, nombre: "Curry", precio: 1800, cantidad: 1 },
  { id: 7, nombre: "Almendras", precio: 2500, cantidad: 1 },
  { id: 8, nombre: "Romero", precio: 500, cantidad: 1 },
];

const item = document.querySelector("#items");
let agregar = document.querySelectorAll(".agregar");
let numerito = document.querySelector("#numerito");
let botonEliminar = document.querySelectorAll(".botonEliminar");
let vaciar = document.querySelector("#vaciar");
let total = document.querySelector("#total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let idBoton;
console.log(carrito);

// Función que muestra un Toastify cuando se agrega un producto
const clickToastify = () => {
  Toastify({
    text: "Producto Agregado al Carrito",
    className: "info",
    position: "left",
    style: {
      background: "linear-gradient(to right, green, green)",
    },
  }).showToast();
};

// Agregar evento de click a todos los botones para un Toastify
agregar.forEach((boton) => {
  boton.addEventListener("click", agregarProducto);
});
agregaElementoAlCarrito();
// Función que agrega un producto al carrito
function agregarProducto(el) {
  const idBoton = el.currentTarget.id;
  const productoAgregadoCarrito = arrayStock.find(
    (elemento) => elemento.id == idBoton
  ); //busca el elemento que coincide con el id del boton
  /* busca si hay un elemento con el mismo id */
  if (carrito.some((elemento) => elemento.id == idBoton)) {
    Toastify({
      text: "Producto ya agregado elija Otro",
      className: "info",
      position: "left",
      style: {
        background: "linear-gradient(to right, red, red)",
      },
    }).showToast(); //muestra un toastify cuando se agrega un producto ya agregado repetido !!!
  } else {
    clickToastify();
    carrito.push(productoAgregadoCarrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    numerito.innerText = carrito.length; // muestra el numero de elementos en el carrito
    agregaElementoAlCarrito(); // Agregar el nuevo elemento al carrito
  }
}

// Agrega los elementos al carrito y muestra un toastify cuando se agrega un nuevo elemento
function agregaElementoAlCarrito() {
  item.innerHTML = ""; // Limpiar el contenido del carrito antes de agregar los elementos
  carrito.forEach((elemento) => {
    let { nombre, cantidad, precio } = elemento;

    let tr = document.createElement("tr");
    item.appendChild(tr);

    let thNombre = document.createElement("th");
    tr.appendChild(thNombre);
    thNombre.innerText = nombre;

    let thCantidad = document.createElement("th");
    tr.appendChild(thCantidad);
    thCantidad.innerText = cantidad;

    let thPrecio = document.createElement("th");
    tr.appendChild(thPrecio);
    thPrecio.innerText = precio;

    let thEliminar = document.createElement("th");
    tr.appendChild(thEliminar);
    thEliminar.innerHTML =
      '<button class="botonEliminar"><i class="bi bi-trash3-fill"></i></button>';
    let eliminar = document.querySelector(".botonEliminar");
    eliminar.onclick = function () {
      let indice = carrito.find((el) => el.id == idBoton);
      carrito.splice(indice, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      agregaElementoAlCarrito();
    };
  });
  actualizarTotal();
}

vaciar.addEventListener("click", () => {
  Swal.fire({
    title: "Desea vaciar el carrito?",
    text: "Esta Seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, vaciarlo!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Carrito Vacio!",
        text: "Todos los productos han sido eliminados.",
        icon: "success",
      });
      vaciarCarrito();
    }
  });
});

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  numerito.innerText = carrito.length;
  agregaElementoAlCarrito(); // Actualizar el carrito después de vaciarlo
}

function actualizarTotal() {
  total.innerText = carrito.reduce((acc, el) => acc + el.precio, 0);
}

let botonpedido = document.querySelector("#generarPed");
botonpedido.addEventListener("click", () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "su pedido ha sido generado",
    text: "Gracias por su compra!!!",
    showConfirmButton: false,
    timer: 3000,
  });
});
