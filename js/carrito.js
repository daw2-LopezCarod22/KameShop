import {cambiosMenus} from './cambiosMenu.js';
import { cerrarSesionToken } from './cerrarSesionToken.js';
cambiosMenus();
cerrarSesionToken();
var carrito = JSON.parse(localStorage.getItem('carrito'));
actualizarDatos()
if(carrito.length==0){
    document.getElementById('productosCarrito').innerHTML+=`<p class="center">El carrito esta vacio</p><p class="center">¿Porque no aprovechas para comprar algo?</p>`;
}
for(let i=0;i<carrito.length;i++){
    console.log(carrito[i].nombre_producto)
    let restar = carrito[i].nombre_producto+'-';
    let sumar = carrito[i].nombre_producto+'+';
    let htmlCarrito = `<div class="card w-100">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-5 col-md-2">
                                        <img class="img-thumbnail" src="${carrito[i].images}" alt="">
                                        <div class="quantity">
                                            </br>
                                            <div class="input-group">
                                                <span>
                                                    <button type="button" class="btn btn-danger">
                                                    <span id="${restar}">-</span>
                                                    </button>
                                                </span>
                                                <input id="${carrito[i].nombre_producto}cantidad" type="text" size="1" name="cantidad" value="${carrito[i].cantidad}" min="1" max="100">
                                                <span>
                                                    <button type="button" class="btn btn-success">
                                                        <span id="${sumar}">+</span>
                                                    </button>
                                                </span>
                                            </div>
                                            </br>
                                        </div>    
                                    </div>
                                    <div class="col-7 col-md-10 py-md-5">
                                        <p class="fw-bold right">${carrito[i].nombre_producto}</p>
                                        <p class="fw-bold right">${carrito[i].precio}€</p>
                                        <p class="right">
                                            <button id="${carrito[i].nombre_producto}borrar">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>`
        document.getElementById('productosCarrito').innerHTML+=htmlCarrito;
}

for(let i=0;i<carrito.length;i++){
    console.log(carrito)
    document.getElementById(`${carrito[i].nombre_producto}-`).onclick = function(){
        if(document.getElementById(`${carrito[i].nombre_producto}cantidad`).value>1){
            document.getElementById(`${carrito[i].nombre_producto}cantidad`).value--;
            let carritoLocal = JSON.parse(localStorage.getItem('carrito'));
            carritoLocal.splice(i, 1);
            let carritoArray = {
                                    nombre_producto: `${carrito[i].nombre_producto}`,
                                    precio: `${carrito[i].precio}`,
                                    cantidad: document.getElementById(`${carrito[i].nombre_producto}cantidad`).value,
                                }
            carritoLocal.push(carritoArray);
            localStorage.setItem('carrito', JSON.stringify(carritoLocal));
            recargar();
        }
    }

    document.getElementById(`${carrito[i].nombre_producto}+`).onclick = function(){
        document.getElementById(`${carrito[i].nombre_producto}cantidad`).value++;
        let carritoLocal = JSON.parse(localStorage.getItem('carrito'));
        carritoLocal.splice(i, 1);
        let carritoArray = 
                {
                    nombre_producto: `${carrito[i].nombre_producto}`,
                    precio: `${carrito[i].precio}`,
                    cantidad: document.getElementById(`${carrito[i].nombre_producto}cantidad`).value,
                }
        carritoLocal.push(carritoArray);
        localStorage.setItem('carrito', JSON.stringify(carritoLocal));
        recargar();
    }

    document.getElementById(`${carrito[i].nombre_producto}borrar`).onclick = function(){
        let carritoLocal = JSON.parse(localStorage.getItem('carrito'));
        carritoLocal.splice(i, 1);
        localStorage.setItem('carrito', JSON.stringify(carritoLocal))
        recargar();
    }
}

function actualizarDatos(){
    var sumaCantidad = carrito.reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue.cantidad), 0);
    var sumaPrecio = carrito.reduce((previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue.precio), 0);
    var precioTotal = sumaCantidad * sumaPrecio;
    var precioTotalConEnvio = precioTotal+3.99;
    document.getElementById('cantidadArticulos').innerText = sumaCantidad + ' Articulos';
    document.getElementById('precioTotal').innerText = precioTotal + ' €';
    document.getElementById('totalConEnvio').innerText = precioTotalConEnvio + ' €'
}

function recargar(){
    location.reload();
}
