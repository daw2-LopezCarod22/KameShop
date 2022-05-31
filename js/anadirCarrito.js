function anadirCarrito(producto, vieneDeProducto){
    if(localStorage.getItem("token") != null){
        Swal.fire({
            title: `¡Añadido al carrito!`,
            text: `¡${producto.nombre_producto} ha sido añadido al carrito!`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'green',
            cancelButtonText: 'Seguir comprando',
            confirmButtonText: 'Finalizar compra'
            }).then((result) => {
                var carritoLocal = JSON.parse(localStorage.getItem('carrito'));
                var cantidadProducto = 1;
                for(var i=0;i<carritoLocal.length;i++){
                    if(carritoLocal[i].nombre_producto==producto.nombre_producto){
                        cantidadProducto = carritoLocal[i].cantidad;
                        cantidadProducto++;
                        carritoLocal.splice(i, 1);
                    }
                }
                var carrito = 
                    {
                        nombre_producto: `${producto.nombre_producto}`,
                        precio: `${producto.precio}`,
                        cantidad: cantidadProducto,
                        stock: `${producto.stock}`,
                        images: `${producto.images}`
                    }
                    console.log(carrito);
                carritoLocal.push(carrito);
                localStorage.setItem('carrito', JSON.stringify(carritoLocal));
                return result;
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io/html/carrito.html";
                }
            })
        } else {
            Swal.fire({
                title: `¡Sesion no iniciada!`,
                text: `Debes iniciar sesion para comprar`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: 'green',
                cancelButtonText: 'Seguir navegando',
                confirmButtonText: 'Iniciar sesion'
                }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "https://daw2-lopezcarod22.github.io/kameshop.github.io/html/login.html";
                }})
        }
}

export { anadirCarrito }