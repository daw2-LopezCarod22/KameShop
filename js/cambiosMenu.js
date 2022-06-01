import {logout} from './logout.js';
function cambiosMenus(){
    if(localStorage.getItem("token") != null){
        var botonCarrito = `<a id="carrito" href="https://daw2-lopezcarod22.github.io/kameshop.github.io/html/carrito.html"><form class="d-flex">
                                <button class="btn btn-outline-dark" type="button">
                                    <i class="bi-cart-fill me-1"></i>
                                    Carrito
                                    <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                                </button>
                            </a>`
        document.getElementById('carrito').innerHTML = botonCarrito;
        var botonCerrarSesion = `<button type="button" id="logout" class="sesion btn btn-danger">Cerrar Sesion</button>`
        document.getElementById('listaMenu').innerHTML += botonCerrarSesion;
        var botonMiPerfil = `<a href="https://daw2-lopezcarod22.github.io/kameshop.github.io/html/miPerfil.html"><button type="button" class="sesion btn btn-success">Mi perfil</button></a>`
        document.getElementById('listaMenu').innerHTML += botonMiPerfil;
        if(localStorage.getItem("username") == 'admin'){
            var botonPanelAdministrador = `<a href="https://daw2-lopezcarod22.github.io/kameshop.github.io/html/panelAdministrador.html"><button type="button" id="panelAdministrador" class="sesion btn btn-secondary">Panel de administrador</button></a>`
            document.getElementById('listaMenu').innerHTML += botonPanelAdministrador;
        }
        document.getElementById('logout').onclick = function(){
            logout();
        }
    } else{
        var botonIniciarRegistrarse = `<button type="button" class="sesion btn btn-primary"><a href="https://daw2-lopezcarod22.github.io/kameshop.github.io/html/login.html">Iniciar Sesion</a></button>
        <button type="button" class="sesion btn btn-success"><a href="https://daw2-lopezcarod22.github.io/kameshop.github.io/html/register.html">Registrarse</a></button>`
        document.getElementById('listaMenu').innerHTML += botonIniciarRegistrarse;
    }
}
export {cambiosMenus}