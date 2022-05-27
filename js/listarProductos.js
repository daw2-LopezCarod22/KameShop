import {borrarProducto} from './borrarProducto.js';
import {anadirCarrito} from './anadirCarrito.js'

function listarProductos(vieneDe){
    fetch(`http://localhost:8000/productos`)
        .then((resultado) => resultado.json())
        .then((json) => añadirProducto(json, vieneDe));
}

function añadirProducto(jsonProducto, vieneDe){
    console.log(jsonProducto)
    for(var i=0;i<jsonProducto.length;i++){
        var producto = `<div class=" col mb-5">
                            <div class="card h-100">
                                <a class="productos" href="http://127.0.0.1:5501/html/producto.html?${jsonProducto[i].id}">
                                    <img class="img-thumbnail" src="${jsonProducto[i].images}" alt="imagen del producto" />
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <h5 class="fw-bolder">${jsonProducto[i].nombre_producto}</h5>
                                            ${jsonProducto[i].precio}€
                                        </div>
                                    </div>
                                </a>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center">
                                        <span id="AddCarrito${jsonProducto[i].id}" class="btn btn-outline-dark mt-auto">Añadir al carrito</span>
                                    </div>
                                    <div id="opcionesCompra${jsonProducto[i].id}" class="text-center py-3">
                                    </div>
                                </div>
                            </div>
                        </div>`
        if(vieneDe=='busqueda'){
            if(jsonProducto[i].tipo_producto==window.location.search.split('?')[1]){
                document.getElementById('producto').innerHTML += producto;
            }
        } else {
            document.getElementById('novedades').innerHTML += producto;
        }
        if(localStorage.getItem("username") == 'admin'){
            if(jsonProducto[i].tipo_producto==window.location.search.split('?')[1]||vieneDe==null){
                var buttonBorrar = `<button id="buttonBorrar${jsonProducto[i].id}" class="btn btn-danger">
                                    </button>`
                var buttonEditar = `<a href="http://127.0.0.1:5501/html/crearProducto.html?${jsonProducto[i].id}">
                                        <button class="btn btn-success">
                                            <i class="fa-solid fa-pencil"></i>
                                        </button>
                                    </a>`
                var opcionesCompra = document.getElementById('opcionesCompra'+jsonProducto[i].id);
                opcionesCompra.innerHTML+=buttonEditar;
                opcionesCompra.innerHTML+=buttonBorrar;
            }
        }
    }
    for(let i in jsonProducto){
        let idProducto = jsonProducto[i].id;
        let nameProducto = jsonProducto[i].nombre_producto;
        if(localStorage.getItem("username") == 'admin'){     
            let botonBorrar = document.createElement('i');
            botonBorrar.classList.add('fa-solid','fa-trash');
            botonBorrar.id = jsonProducto[i].id + 'Borrar';
            if(vieneDe=='busqueda'){
                if(jsonProducto[i].tipo_producto==window.location.search.split('?')[1]){
                    document.getElementById('buttonBorrar'+jsonProducto[i].id).appendChild(botonBorrar);
                    document.getElementById(jsonProducto[i].id + 'Borrar').onclick=function(){
                        borrarProducto(idProducto, nameProducto);
                    };
                }   
            } else {
                document.getElementById('buttonBorrar'+jsonProducto[i].id).appendChild(botonBorrar);
                document.getElementById(jsonProducto[i].id + 'Borrar').onclick=function(){
                    borrarProducto(idProducto, nameProducto);
                };
            }
        }
        if(vieneDe=='busqueda'){
            if(jsonProducto[i].tipo_producto==window.location.search.split('?')[1]){
                document.getElementById('AddCarrito'+jsonProducto[i].id).onclick=function(){
                    anadirCarrito(jsonProducto[i]);
                }
            }
        } else {
            document.getElementById('AddCarrito'+jsonProducto[i].id).onclick=function(){
                anadirCarrito(jsonProducto[i]);
            } 
        }
    }
}
export {listarProductos}