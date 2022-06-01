import {cambiosMenus} from './cambiosMenu.js';
import { listarProductos } from './listarProductos.js';
import { cerrarSesionToken } from './cerrarSesionToken.js';
cerrarSesionToken();

if(localStorage.getItem("token") != null){
    var bienvenida = document.createElement('h2');
    var username = localStorage.getItem('username')
    bienvenida.innerText=`¡Bienvenido ${username}!`;
    bienvenida.classList.add('text-info', 'text-center');
    document.getElementById('bienvenida').appendChild(bienvenida);
}
listarProductos();
cambiosMenus();


