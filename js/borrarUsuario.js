function borrarUsuario(username, id){
    Swal.fire({
    title: `¿Estas seguro de eliminar al usuario ${username}?`,
    text: "¡Esta accion no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
    }).then((result) => {
    if (result.isConfirmed) {
        confirmarEliminar(username, id);
    }})
}

function confirmarEliminar(username, id){
    const url = `https://kameshop-api.herokuapp.com/users/${id}`;
    var token = localStorage.getItem('token')
    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8", 
            "Authorization": 'BEARER '+token //Agregado
        }
    })
    .then(response => response.json())
    .then(json => {
        Swal.fire({
            text:'¡Eliminado!',
            title:`El usuario ${username} ha sido eliminado`,
            icon:'success'
        }).then(function(){
            window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io/html/administrarUsuarios.html";
        })
    })
    .catch(err => console.log(err));
}

export {borrarUsuario}