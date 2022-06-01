import {borrarUsuario} from './borrarUsuario.js';
import {cambiosMenus} from './cambiosMenu.js';
import { cerrarSesionToken } from './cerrarSesionToken.js';
cambiosMenus();
cerrarSesionToken();
var token = localStorage.getItem('token');
    const url = `https://kameshop-api.herokuapp.com/users`;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8", 
            "Authorization": 'BEARER '+token //Agregado
        }
    })
    .then(response => response.json())
    .then(json => {
        for(let i in json){
            let fichaUsuario = `<div class="card w-100">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-4">
                                                <p>${json[i].username}</p>
                                            </div>
                                            <div class="col-4">
                                                <p>Rol: ${json[i].roles[0]}</p>
                                            </div>
                                            <div class="col-4">
                                                <button class="btn btn-success">
                                                <a class="sesion" href="https://daw2-lopezcarod22.github.io/kameshop.github.io/html/editarUsuarioAdmin.html?${json[i].id}"><i id="${json[i].id}Editar" class="fa-solid fa-pencil"></i></a>
                                                </button>
                                                <button id="buttonBorrar${json[i].id}" class="btn btn-danger">

                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            document.getElementById('contenedorUsuarios').innerHTML += fichaUsuario;
        }
        for(let i in json){
            let idUsuario = json[i].id;
            let usernameUsuario = json[i].username;
            let botonBorrar = document.createElement('i');
            botonBorrar.classList.add('fa-solid','fa-trash');
            botonBorrar.id = json[i].id + 'Borrar';
            document.getElementById('buttonBorrar'+json[i].id).appendChild(botonBorrar);
            document.getElementById(json[i].id + 'Borrar').onclick=function(){
                borrarUsuario(usernameUsuario, idUsuario);
            };
        }
    })