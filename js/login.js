import {cambiosMenus} from './cambiosMenu.js';
cambiosMenus();
document.getElementById('login').onclick=function(){
    const user = {
        "email": document.getElementById('inputEmail').value,
        "password": document.getElementById('inputPassword').value
    };
    const url = `https://kameshop-api.herokuapp.com/auth/login`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8", 
            }
        })
        .then(response => response.json())
        .then(json => {
            const token = json.token;
            const refreshToken = json.refreshToken;
            const username = json.username;
            const carrito = JSON.stringify([]);
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('carrito', carrito)
            verMisDatos();
        })
        .catch(err => console.log(err));
}

function verMisDatos(){
    const url = `https://kameshop-api.herokuapp.com/auth/me/`;
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
            const username = json.username;
            if(username!=undefined){
                localStorage.setItem('username', username);
                window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Email o contraseña incorrecta!',
                  }).then(function(){
                    localStorage.clear();
                  }).then(function(){
                    window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io/html/login.html";
                })
            }
        })
        .catch(err => console.log(err));
}