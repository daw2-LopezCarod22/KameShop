import {cambiosMenus} from './cambiosMenu.js';
cambiosMenus();
if(window.location.search.split('?')[1]){
    var idProducto = window.location.search.split('?')[1];
    fetch(`https://kameshop-api.herokuapp.com/${idProducto}`)
    .then((resultado) => resultado.json())
    .then((json) => editarProducto(json, idProducto));
}

function editarProducto(json, id){
    document.querySelector('h5').innerText = 'Editar producto';
    document.getElementById('nombre').innerHTML = `<input id="inputNombre" value="${json.nombre_producto}" type="text" size="40" name="nombreProducto" required>`;
    document.getElementById('fabricante').innerHTML = `<input id="inputFabricante" value="${json.fabricante}" type="text" size="40" name="fabricanteProducto" required>`;
    document.getElementById('descripcion').innerHTML = `<textarea class="card-text" id="inputDescripcion" name="descripcionProducto" required>${json.descripcion}</textarea>`
    document.getElementById('botonConfirmacion').innerHTML = `<button id="crearProducto" type="button" class="btn btn-primary">Modificar producto</button>`;
    document.getElementById('stock').innerHTML = `<input id="inputStock" min="1" type="number" value=${json.stock} onkeypress="return event.charCode >= 48 && event.charCode <= 57">`;
    document.getElementById('precio').innerHTML = `<input id="inputPrecio" min="0" step="any" value=${json.precio} type="number" name="precioProducto" required>`;
    var inputTipo = document.getElementById('inputTipo');
    switch(json.tipo_producto){
        case 'Figuras': 
            inputTipo.innerHTML=`<option selected value="Figuras">Figuras</option>
                                <option value="Manga">Manga</option>
                                <option value="DVD/Blu-Ray">DVD/Blu-Ray</option>
                                <option value="Merchandising">Merchandising</option>`
            break;

        case 'Manga':
            inputTipo.innerHTML=`<option value="Figuras">Figuras</option>
                                <option selected value="Manga">Manga</option>
                                <option value="DVD/Blu-Ray">DVD/Blu-Ray</option>
                                <option value="Merchandising">Merchandising</option>`
            break;

        case 'DVD/Blu-Ray':
        inputTipo.innerHTML=`<option value="Figuras">Figuras</option>
                            <option value="Manga">Manga</option>
                            <option selected value="DVD/Blu-Ray">DVD/Blu-Ray</option>
                            <option value="Merchandising">Merchandising</option>`
        break;

        case 'Merchandising':
        inputTipo.innerHTML=`<option value="Figuras">Figuras</option>
                            <option value="Manga">Manga</option>
                            <option value="DVD/Blu-Ray">DVD/Blu-Ray</option>
                            <option selected value="Merchandising">Merchandising</option>`
        break;
    }


    document.getElementById('crearProducto').onclick = function(){
        const archivo = document.getElementById('archivo').files[0]
        var f = new FormData() 
        f.append('files' , archivo)
        f.append('type' , 'producto')
        var token = localStorage.getItem('token')
        
        var url="https://kameshop-api.herokuapp.com/files/upload"
        fetch(url, {
            method: "POST",
            body: f,
            headers: {
                "Authorization": 'BEARER '+token //Agregado
                },
        })
        .then(response => response.json())
        .then(json => {
            if(json.code==11000){ 
                alert('El archivo ya existe')
            } else {
                editarImagen(json.data[0].newFile);
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    function editarImagen(objetoImagen){
        var token = localStorage.getItem('token');
        var producto = {
            "nombre_producto": document.getElementById('inputNombre').value,
            "tipo_producto": document.getElementById('inputTipo').value,
            "fabricante": document.getElementById('inputFabricante').value,
            "precio": document.getElementById('inputPrecio').value,
            "images": objetoImagen.url,
            "stock": document.getElementById('inputStock').value,
            "descripcion": document.getElementById('inputDescripcion').value
        }
        const url = `https://kameshop-api.herokuapp.com/productos/${id}`;
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(producto),
            headers: {
                "Content-type": "application/json; charset=UTF-8", 
                "Authorization": 'BEARER '+token //Agregado
            }
        })
        .then(response => response.json())
        .then(json => {
            Swal.fire({
                title: 'Producto modificado!',
                text: 'El producto ha sido modificado correctamente',
                icon: 'success'
            }).then(function() {
                window.location.href = `http://127.0.0.1:5501/html/producto.html?${id}`;
            });
        })
        .catch(err => console.log(err));
    }
}

document.getElementById('crearProducto').onclick = function(){
    const archivo = document.getElementById('archivo').files[0]
    var f = new FormData() 
    f.append('files' , archivo)
    f.append('type' , 'producto')
    var token = localStorage.getItem('token')
    
    var url="https://kameshop-api.herokuapp.com/files/upload"
    fetch(url, {
        method: "POST",
        body: f,
        headers: {
            "Authorization": 'BEARER '+token //Agregado
            },
    })
    .then(response => response.json())
    .then(json => {
        if(json.code==11000){ 
            alert('El archivo ya existe')
        } else {
            crearProducto(json.data[0].newFile);
        }
    })
    .catch(error => {
        console.error(error)
    })
};

function crearProducto(objetoImagen){
    var token = localStorage.getItem('token');
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var producto = {
        "nombre_producto": document.getElementById('inputNombre').value,
        "tipo_producto": document.getElementById('inputTipo').value,
        "fabricante": document.getElementById('inputFabricante').value,
        "precio": document.getElementById('inputPrecio').value,
        "images": objetoImagen.url,
        "stock": document.getElementById('inputStock').value,
        "fechaAgregado": dateTime,
        "descripcion": document.getElementById('inputDescripcion').value
    }
    const url = `https://kameshop-api.herokuapp.com/productos`;
    fetch(url, {
        method: "POST",
        body: JSON.stringify(producto),
        headers: {
            "Content-type": "application/json; charset=UTF-8", 
            "Authorization": 'BEARER '+token //Agregado
        }
    })
        .then(response => response.json())
        .then(json => {
            Swal.fire({
                title: '¡Producto creado!',
                text: `El producto ${json.nombre_producto} ha sido creado correctamente`,
                icon: 'success'
            }).then(function() {
                window.location.href = `http://127.0.0.1:5501/html/producto.html?${json.id}`;
            });
        })
        .catch(err => console.log(err));
}