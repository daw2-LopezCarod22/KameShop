function darBienvenida(){
    console.log(localStorage)
    var bienvenida = document.createElement('h2');
    var username = localStorage.getItem('username')
    bienvenida.innerText=`¡Bienvenido ${username}!`;
    bienvenida.classList.add('text-info', 'text-center');
    document.getElementById('bienvenida').appendChild(bienvenida);
}

export {darBienvenida}