import {cambiosMenus} from './cambiosMenu.js';
cambiosMenus(true);
var idUsuario = window.location.search.split('?')[1];
var token = localStorage.getItem('token');
const url = `http://localhost:8000/users/${idUsuario}`;
if (idUsuario=='crear'){
    document.getElementById('titulo').innerHTML = `<h5 class="card-title">Crear nuevo usuario:</h5>`

    var inputUsername = `<input id="inputUsername" type="text" size="40" name="nombreCompleto">`    
    document.getElementById('username').innerHTML += inputUsername;
    var inputEmail = `<input id="inputEmail" type="text" size="40" name="email">`    
    document.getElementById('correo').innerHTML += inputEmail;
    var inputPassword = `<input id="inputPassword" type="text" size="40" name="password">`    
    document.getElementById('password').innerHTML += inputPassword;

    document.getElementById('botonFinal').innerHTML = `<button id="crearUsuario" type="button" class="btn btn-primary">Crear usuario</button>`

    var select = `<select id="inputRol" name="transporte">
                            <option selected>Administrador</option>
                            <option>Usuario</option>
                        </select>`
    document.getElementById('rol').innerHTML += select;
    document.getElementById('crearUsuario').onclick = function(){
        var username = document.getElementById('inputUsername').value;
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;
        var rol = document.getElementById('inputRol').options[document.getElementById('inputRol').selectedIndex].text;
        crearUsuario(username, email, password, rol);
    }
}else{
    fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8", 
            "Authorization": 'BEARER '+token //Agregado
        }
    })
    .then(response => response.json())
    .then(json => {
        var inputUsername = `<input id="inputUsername" type="text" value=${json.username} size="40" name="nombreCompleto">`    
        document.getElementById('username').innerHTML += inputUsername;
        var inputEmail = `<input id="inputEmail" type="text" value=${json.email} size="40" name="email">`    
        document.getElementById('correo').innerHTML += inputEmail;
        var inputPassword = `<input id="inputPassword" type="text" value=${json.password} size="40" name="password">`    
        document.getElementById('password').innerHTML += inputPassword;
        
        if(json.roles[0]=='admin'){
            var select = `<select id="inputRol" name="transporte">
                            <option selected>Administrador</option>
                            <option>Usuario</option>
                        </select>`
        } else {
            var select = `<select id="inputRol" name="transporte">
                            <option>Administrador</option>
                            <option selected>Usuario</option>
                        </select>`    
        }
        document.getElementById('rol').innerHTML += select;

        document.getElementById('guardarCambios').onclick = function(){
            var username = document.getElementById('inputUsername').value;
            var email = document.getElementById('inputEmail').value;
            var password = document.getElementById('inputPassword').value;
            var rol = document.getElementById('inputRol').options[document.getElementById('inputRol').selectedIndex].text;
            guardarCambiosEdit(username , email, password, rol, idUsuario);
        }
    }) 
}

function guardarCambiosEdit(username, email, password, rol, id){
    var token = localStorage.getItem('token');
    if(rol=='Administrador'){
        rol='admin';
    } else {
        rol='normal';
    }
    var usuario = {
        "username": username,
        "email": email,
        "password": password,
        "roles": [rol]
    }
    const url = `http://localhost:8000/users/${id}`;
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
                title: '¡Usuario modificado!',
                text: `El usuario ${username} ha sido modificado correctamente`,
                icon: 'success'
            }).then(function() {
                window.location.href = "administrarUsuarios.html";
            });
        })
        .catch(err => console.log(err));
}

function crearUsuario(username, email, password, rol){
    const user = {
        "username": username,
        "email": email,
        "password": password,
        "roles":[rol]
    };
    const url = `http://localhost:8000/users`;
    fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8", 
            "Authorization": 'BEARER '+token //Agregado
        }
    })
    .then(response => response.json())
    .then(json => {
        Swal.fire({
            title: '¡Usuario creado!',
            text: `El usuario ${username} ha sido creado correctamente`,
            type: 'success'
        }).then(function() {
            window.location.href = "administrarUsuarios.html";
        });
    })
    .catch(err => console.log(err));
}
