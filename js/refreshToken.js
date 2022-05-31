document.getElementById('footer').onclick = function(){
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
            console.log(json)
                refrescarToken(json.username, json.email, json.roles, localStorage.getItem('refreshToken'));
            }
        )
        .catch(err => console.log(err));
}

function refrescarToken(username, email, roles, refreshToken){
    console.log(username);
    console.log(email);
    console.log(roles);
    console.log(refreshToken);
    console.log(localStorage.getItem('token'))

    const user = {
        "username": username,
        "email": email,
        "roles": roles,
        "refreshToken": refreshToken,
    };
    console.log(user);
    const url = `http://localhost:8000/auth/token`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8", 
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(`tu nuevo token es ${json.refreshToken} - ${json.token}`)
        })
        .catch(err => console.log(err));
}
