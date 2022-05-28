import {cambiosMenus} from './cambiosMenu.js';
import {anadirCarrito} from './anadirCarrito.js'

cambiosMenus();
var idProducto = window.location.search.split('?')[1];
fetch(`https://kameshop-api.herokuapp.com/productos/${idProducto}`)
.then((resultado) => resultado.json())
.then((json) => mostrarProducto(json));

function mostrarProducto(producto){
    var productoHTML = `<img class="img-fluid border border-2 rounded" src="${producto.images}" alt="imagen del producto">
                            <h2>${producto.nombre_producto}</h2>
                            <p class="fw-bold">${producto.precio}€</p>
                            <p>Fabricante: ${producto.fabricante}</p>
                            <p>Descripcion: </p>
                            <p>${producto.descripcion}</p>
                            <div class="row">
                                <div class="col-6 text-danger">
                                    <p>¡${producto.stock} restantes en stock!</p>
                                </div>
                                <div class="col-6">
                                    <span id="AddCarrito${producto.id}" type="button" class="btn btn-primary">Añadir al carrito</span>
                                </div>
                            </div>`
    document.getElementById('producto').innerHTML += productoHTML;
    document.getElementById('AddCarrito'+producto.id).onclick=function(){
        anadirCarrito(producto);
    } 
}