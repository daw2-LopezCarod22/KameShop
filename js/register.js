import {cambiosMenus} from './cambiosMenu.js';
import { cerrarSesionToken } from './cerrarSesionToken.js';
cambiosMenus();
cerrarSesionToken();
document.getElementById('registrarse').onclick = function(){
    
    const user = {
        "username": document.getElementById('inputUsername').value,
        "email": document.getElementById('inputEmail').value,
        "password": document.getElementById('inputPassword').value,
        "roles":["normal"]
    };
    const url = `https://kameshop-api.herokuapp.com/auth/register`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8", 
            }
        })
        .then(response => response.json())
        .then(json => {
            if(json.username!=undefined){
                Swal.fire({
                    title: '¡Usuario registrado!',
                    text: 'Gracias por unirte, ya puedes iniciar sesion',
                    icon: 'success'
                }).then(function() {
                    window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Alguno de los campos tiene campos vacios o caracteres no validos, por favor, revisalo!',
                  }).then(function(){
                    window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io/html/register.html";
                  })
        }
        })
        .catch(err => console.log(err));

}