document.getElementById('footer').onclick = function(){
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
        "refreshToken": refreshToken,
    };
    console.log(user);
    const url = `https://kameshop-api.herokuapp.com/auth/token`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
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
