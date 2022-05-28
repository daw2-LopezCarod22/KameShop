import {cambiosMenus} from './cambiosMenu.js';
cambiosMenus(true);
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
            Swal.fire({
                title: '¡Usuario registrado!',
                text: 'Gracias por unirte, ya puedes iniciar sesion',
                icon: 'success'
            }).then(function() {
                window.location.href = "../index.html";
            });
        })
        .catch(err => console.log(err));

}