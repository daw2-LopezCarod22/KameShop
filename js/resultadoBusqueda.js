import {cambiosMenus} from './cambiosMenu.js';
import {listarProductos} from './listarProductos.js';
import { cerrarSesionToken } from './cerrarSesionToken.js';

cerrarSesionToken();
var categoria = window.location.search.split('?')[1];
document.querySelector('h2').innerText = categoria;
cambiosMenus();
listarProductos('busqueda');
