//Trae el JSON
fetch("./js/arraystock.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Hubo un problema al obtener los datos.");
    }
    return res.json();
  })
  .then((data) => {
    arrayStock = data;
    btnAgregarAlCarrito(arrayStock);
  })
  .catch((error) => {
    console.error("Hubo un error", error.mesage);
  });

let rows = document.getElementById("rows");
let total = document.querySelector("#total");
let agregar = document.querySelectorAll(".agregar");
let numerito = document.querySelector("#numerito");
let vaciar = document.getElementById("btnVaciar");
let botonpedido = document.getElementById("btnPedido");

let carrito;
if (localStorage.getItem("carrito") != null) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  carrito = [];
}
//Agrega los Rows en la Tabla
function agregarRow(arraycarrito) {
  arraycarrito.forEach((elemento, id) => {
    let { nombre, precio, cantidad } = elemento;
    let createrow = document.createElement("tr");
    createrow.innerHTML = `
              <th>${nombre}</th>
              <td><button class="btnbotoncitos btnmenos">-</button> ${cantidad} <button class="btnbotoncitos btnmas "> + </button></td>
              <td>${precio}</td>
              <td><button class="botonEliminar"><i class="bi bi-trash3-fill"></i></button></td>`;
    rows.appendChild(createrow);
    //Botoncito tachito de Eliminar
    createrow.querySelector(".botonEliminar").addEventListener("click", () => {
      carrito.splice(id, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      rows.innerHTML = ""; //Limpia la tabla
      agregarRow(carrito); //Dibja la tabla
    });
    //Botoncito de Cantidad Menos
    createrow.querySelector(".btnmenos").addEventListener("click", () => {
      if (elemento.cantidad >= 1) {
        elemento.cantidad--; //Disminuye la Cantidad del elemento
        localStorage.setItem("carrito", JSON.stringify(carrito)); //Almacena y actualiza el Carrito del Storage
      }
      if (elemento.cantidad === 0) {
        carrito.splice(id, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito)); //Almacena y actualiza el Carrito del Storage
      }
      rows.innerHTML = ""; //Limpia la tabla
      agregarRow(carrito); //Dibja la tabla
    });
    //Botoncito de Cantidad Mas
    createrow.querySelector(".btnmas").addEventListener("click", () => {
      if (elemento.cantidad >= 1) {
        elemento.cantidad++; //Aumenta la Cantidad del elemento
        localStorage.setItem("carrito", JSON.stringify(carrito)); //Almacena y actualiza el Carrito del Storage
      }
      if (elemento.cantidad === 0) {
        carrito.splice(id, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito)); //Almacena y actualiza el Carrito del Storage
      }
      rows.innerHTML = ""; //Limpia la tabla
      agregarRow(carrito); //Dibja la tabla
    });
  });
  totalTabla();
}
// Botones Agregar al Carrito
function btnAgregarAlCarrito(arrayStock) {
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
        }).showToast();
      } else {
        Toastify({
          text: "Producto Agregado al Carrito",
          className: "info",
          position: "left",
          style: {
            background: "linear-gradient(to right, green, green)",
          },
        }).showToast();
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        numerito.innerText = carrito.length;
      }
    });
    numerito.innerText = carrito.length;
  });
  agregarRow(carrito);
}
//Funcion que calcula el Total
function totalTabla() {
  let totalin = carrito.reduce(
    (acc, elemento) => acc + elemento.cantidad * elemento.precio,
    0
  );
  total.innerText = totalin;
}

//Boton para vaciar el carrito
vaciar.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay productos en el carrito!",
    });
  } else {
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
        rows.innerHTML = "";
        total.innerText = 0;
      }
    });
  }
});

//Boton para generar el pedido
botonpedido.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay productos en el carrito!",
    });
  } else {
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
    rows.innerHTML = "";
    total.innerText = 0;
  }
});
