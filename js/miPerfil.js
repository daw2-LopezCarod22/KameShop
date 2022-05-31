import {cambiosMenus} from './cambiosMenu.js';
cambiosMenus();
const url = `http://localhost:8000/auth/me/`;
var token = localStorage.getItem('token')
fetch(url, {
    method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8", 
        "Authorization": 'BEARER '+token //Agregado
    }
})
.then(response => response.json())
.then(json => {
    var inputUsername = `<input id="inputUsername" disabled value=${json.username} type="text" size="40" name="nombreCompleto" required>`
    document.getElementById('username').innerHTML += inputUsername;
    var inputEmail = `<input id="inputEmail" type="text" value=${json.email} size="40" name="correoElectronico" required>`
    document.getElementById('correo').innerHTML += inputEmail;
    var inputPassword = `<input id="inputPassword" value=${json.password} type="text" size="40" name="password" required>`
    document.getElementById('password').innerHTML += inputPassword;
    document.getElementById('guardarCambios').onclick = function(){
        guardarCambiosPefil();
    }
})
.catch(err => console.log(err));


function guardarCambiosPefil(){
    var token = localStorage.getItem('token');
    var usuario = {
        "email": document.getElementById('inputEmail').value,
        "password": document.getElementById('inputPassword').value
    }
    const url = `http://localhost:8000/auth/update`;
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(usuario),
        headers: {
            "Content-type": "application/json; charset=UTF-8", 
            "Authorization": 'BEARER '+token //Agregado
        }
    })
    .then(response => response.json())
    .then(json => {
        Swal.fire({
            title: '¡Perfil Actualizado!',
            text: `Tu perfil ha sido actualizado correctamente`,
            type: 'success'
        }).then(function() {
            window.location.href = "miPerfil.html";
        });
    })
    .catch(err => console.log(err));
}