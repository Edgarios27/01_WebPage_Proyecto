const menuIcon = document.querySelector('.simbolo_hamburguesa');
const menuBurger = document.querySelector('.menu_nav')
const menuCerrar = document.querySelector('.cerrar')

menuIcon.addEventListener('click', function() {

        menuBurger.classList.toggle('menu_hidden');
        
});

menuCerrar.addEventListener('click', function() {

    menuBurger.classList.toggle('menu_hidden');
});

const containerIcon = document.querySelector('.container_icon');


containerIcon.addEventListener('click', () => {
 const containerCartProducts = document.querySelector('.container-cart-products');
 containerCartProducts.classList.toggle('hidden-cart');
});
