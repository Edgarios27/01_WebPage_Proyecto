const menuIcon = document.querySelector('.simbolo_hamburguesa'); //linea 35
const menuBurger = document.querySelector('.menu_nav') //linea 17
const menuCerrar = document.querySelector('.cerrar') //linea 19

menuIcon.addEventListener('click', function () {

    menuBurger.classList.toggle('menu_hidden');//linea 17

});

menuCerrar.addEventListener('click', function () {

    menuBurger.classList.toggle('menu_hidden');//linea 17
});
//COMIENZO CARRITO
//PARA DESPLEGAR EL CARRITO
const btnCart = document.querySelector('.container_icon');//linea 51
const containerCartProducts = document.querySelector('.container-cart-products');
btnCart.addEventListener('click', () => {

    containerCartProducts.classList.toggle('hidden-cart');//linea
});
//
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container_productos');
const empty_car = document.querySelector('.empty_car');
let allProducts = []
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('.cart-items-count');
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn_add_cart')) {
        console.log(e.target.parentElement);
        const product = e.target.parentElement
        const parentProduct = product.parentElement;
        const img = parentProduct.querySelector('figure img').src;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
            imagen: img,
        }
        console.log(infoProduct);

        const exists = allProducts.some(product => product.title === infoProduct.title);

        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    product.imagen++;
                    return product;
                } else {
                    return product;
                }
            })
            console.log('esta');

            allProducts = [...products];
        }
        else {
            console.log('no esta');
            //si no estaba en nuestro carrito 
            allProducts = [...allProducts, infoProduct];
        }
        showHTML();

        console.log(allProducts);
        // -----Sacar Src Img para mostrarla en el carrito----- 
        //accedemos al elemento abuelo del boton que contiene a product y la imagen
        console.log(product.parentElement);
        console.log(img);
    }
})

//eliminamos un producto 
//añadimos un evento listener de tipo click a cada row de nuestro producto
//comprobamos si el click se ha hecho en el icono de eliminar producto 
rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon_close')) {
        //nos dirigimos al elemento padre y guardamos el titulo lo logico es tener un id determinado
        const producto = e.target.parentElement;
        //aplicamos .trim() para ocultar espacios en caso de que existan
        //si tenemos espacios no nos podra  comparar correctamente en la funcion.filters
        const n_product = producto.querySelector('p').textContent.trim();
        console.log(n_product);
        console.log(n_product.length);

        //buscamos en el array el elemento con titulo igual y lo eliminamos de la lista de articulos del carrito
        //lo suyo es que cada  elementos tuviesen un ID unico 
        allProducts = allProducts.filter(
            product => product.title !== n_product
        );
        showHTML();
        console.log(allProducts);
        //llamamos a la funcion showHTML para que vuelva a actualizar los elementos del carrito quitando
        //el articulo que acabamos de eliminar 

    }
});
////////////////////////////////////////////////////////
//Funcion para añadir html a nuestro carrito con productos nuevos 

const showHTML = () => {

    //modificamos la propiedad display para mostrar solo el texto de carrito vacio cuando 
    //esta vacio por eso comprobamos que no hay ningun articulo en el carrito

    if (allProducts.length == 0) {
        empty_car.style.display = 'block';
    } else {
        empty_car.style.display = 'none';
    }

    //colocamos texto si no tenemos nada en el carrito
    //comprobamos si esta vacio comprobando que no nuestro array de articulos no tiene elementos
    let total = 0;
    let totalOfProducts = 0;

    //limpiamos el html contenido en rowproduct

    rowProduct.innerHTML = '';
    //recorremos el array de productos con el metodo foreach
    allProducts.forEach(product => {

        //creamos con el dom un nuevo elemento html de tipo div
        const productoCreado = document.createElement('div');

        //le damos la clase cart-product que es la que hemos añadido al css
        //para darle estilos
        productoCreado.classList.add('cart-product');
        //añadimos la informacion dinamicamente con los elementos de nuestro producto
        //utilizando innerHtml
        //copiamos nuestro div previamente maquetado
        //añadimos la informacion de nuestro elemento dentro del div con ${objeto.variabl}

        productoCreado.innerHTML =
            `<div class="info-cart-product">
                <span class="cantidad-producto-carrito"> ${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
                <span class="imgen-carrito"><img src="${product.imagen}"</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon_close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>`

        //añadimos al html nuestro innerHtml con el metodo append
        //para añadirlo usamos rowproduct(que es el contenedor de productos previamente creado
        // en el html  y almacenado en el js )


        rowProduct.append(productoCreado);

        total = total + parseInt(product.quantity * product.price.slice(1));

        totalOfProducts = totalOfProducts + product.quantity;


    })
    //modificamos el valor del total a pagar con la suma del coste total de los
    //añadidos al carrito  y el numero total de articulos

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;

};

//llamamos para que nos ordene la primera vez que entramos en la web el carrito
showHTML();
