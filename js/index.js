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

let item = document.getElementById("items");
let total = document.querySelector("#total");
let agregar = document.querySelectorAll(".agregar");
let numerito = document.querySelector("#numerito");
let vaciar = document.querySelector("#vaciar");

let carrito;
if (localStorage.getItem("carrito") != null) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  carrito = [];
}
function botonizarAgregadoAlCarrito() {
  agregar.forEach((boton) => {
    boton.addEventListener("click", (el) => {
      const idBoton = el.currentTarget.id;
      const producto = arrayStock.find((elemento) => elemento.id == idBoton);
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
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        numerito.innerText = carrito.length;
        console.log(carrito);
        prodAgregadoToastify();
      }
    });
  });
}
botonizarAgregadoAlCarrito();
let carstorage = JSON.parse(localStorage.getItem("carrito"));

function agregarItem(caritems) {
  item.innerHTML = ""; //Limpia la Tabla
  totalTabla();
  caritems.forEach((elemento, id) => {
    let { nombre, precio, cantidad } = elemento;
    const tr = document.createElement("tr");
    item.appendChild(tr);

    const thNombre = document.createElement("th");
    tr.appendChild(thNombre);
    thNombre.innerText = nombre;
    /////////////////////////////////////////////////////////////////////////////////
    let thCantidad = document.createElement("th");

    let menos = document.createElement("button");
    menos.innerText = "-";
    menos.className = "btnbotoncitos";
    menos.onclick = function () {
      if (elemento.cantidad >= 1) {
        elemento.cantidad--; //Incrementa la Cantidad del elemento
        localStorage.setItem("carrito", JSON.stringify(carstorage)); //Almacena y actualiza el Carrito del Storage
      }
      if (elemento.cantidad === 0) {
        carstorage.splice(id, 1);
        localStorage.setItem("carrito", JSON.stringify(carstorage)); //Almacena y actualiza el Carrito del Storage
      }
      agregarItem(caritems); //Dibja la tabla
    };
    thCantidad.appendChild(menos);

    let span = document.createElement("span");
    span.innerText = cantidad;
    thCantidad.appendChild(span);
    span.className = "mx-2";
    tr.appendChild(thCantidad);

    let mas = document.createElement("button");
    mas.innerText = "+";
    mas.className = "btnbotoncitos";
    mas.onclick = function () {
      if (elemento.cantidad >= 1) {
        elemento.cantidad++; //Incrementa la Cantidad del elemento
        localStorage.setItem("carrito", JSON.stringify(carstorage)); //Almacena y actualiza el Carrito del Storage
      } //Dibja la tabla
      if (elemento.cantidad === 0) {
        carstorage.splice(id, 1);
        localStorage.setItem("carrito", JSON.stringify(carstorage)); //Almacena y actualiza el Carrito del Storage
      }
      agregarItem(caritems); //Dibja la tabla
    };
    thCantidad.appendChild(mas);
    /////////////////////////////////////////////////////////////////////////////////
    const thPrecio = document.createElement("th");
    tr.appendChild(thPrecio);
    thPrecio.innerText = precio;

    const thEliminar = document.createElement("th");
    tr.appendChild(thEliminar);
    const botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = '<i class="bi bi-trash3-fill"></i>';
    botonEliminar.classList.add("botonEliminar");
    botonEliminar.onclick = function () {
      carstorage.splice(id, 1);
      console.log(id);
      localStorage.setItem("carrito", JSON.stringify(carstorage));
      agregarItem(caritems);
    };
    thEliminar.appendChild(botonEliminar);
  });
}

agregarItem(carstorage);
function totalTabla() {
  total.innerText = carstorage.reduce(
    (acc, elemento) => acc + elemento.cantidad * elemento.precio,
    0
  );
}
function prodAgregadoToastify() {
  Toastify({
    text: "Producto Agregado al Carrito",
    className: "info",
    position: "left",
    style: {
      background: "linear-gradient(to right, green, green)",
    },
  }).showToast();
}
console.log(carstorage);

vaciar.addEventListener("click", () => {
  Swal.fire({
    title: "Desea vaciar el carrito?",
    text: "Esta Seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, vaciarlo!",
    cancelButtonText: "Cancelar!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Carrito Vacio!",
        text: "Todos los productos han sido eliminados.",
        icon: "success",
      });
      carrito = [];
      localStorage.removeItem("carrito");
      item.innerHTML = "";
      total.innerText = 0;
    }
  });
});

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
  carrito = [];
  localStorage.removeItem("carrito");
  item.innerHTML = "";
  total.innerText = 0;
});
