import {cambiosMenus} from './cambiosMenu.js';
import { cerrarSesionToken } from './cerrarSesionToken.js';
cambiosMenus();
cerrarSesionToken();
document.getElementById('finalizarCompra').onclick = function(){
    const carrito = JSON.stringify([]);
    localStorage.setItem('carrito', carrito)
    Swal.fire({
        title: 'Pedido realizado!',
        text: 'Gracias por confiar en nosotros, en breve tu pedido sera enviado a tu domicilio',
        icon: 'success'
    }).then(function() {
        window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io";
    });
}