function cerrarSesionToken(){
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
        if(json.username==null&&localStorage.getItem('token')!=null){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡La sesion se ha caducado, por favor, vuelve a iniciar sesion!',
            }).then(function(){
                localStorage.clear();
            }).then(function(){
                window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io/html/login.html";
            })
        }
    })
    .catch(err => console.log(err));
}

export { cerrarSesionToken }