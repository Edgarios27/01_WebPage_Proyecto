function buscarArticulos(query) {
    fetch('data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (articulos) {
            const resultados = articulos.filter(function (articulo) {
                return articulo.nombre.toLowerCase().includes(query.toLowerCase());
            });
            mostrarResultados(resultados);
        })
        .catch(function (error) {
            console.log(error);
        });
}
const formulario = document.querySelector('#formulario');
const inputBusqueda = document.querySelector('#busqueda');
const resultado = document.querySelector('#resultado');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const query = inputBusqueda.value;
    buscarArticulos(query);
});

function mostrarResultados(resultados) {
    if (resultados.length > 0) {
        resultado.innerHTML = '';
        resultados.forEach(function (articulo) {
            resultado.innerHTML += `
                <figure>
                    <a href="detalleWomen.html">
                        <img src="${articulo.img}" alt="" srcset="">
                    </a>
                </figure>
                <div class="info_product">
                    <h2>${articulo.nombre}</h2>
                    <p class="price">€ ${articulo.precio}</p>
                    <button class="btn_add_cart">Agregar al Carrito</button>
                </div>
            `;
        });
    } else {
        resultado.innerHTML = '<p>No se encontraron resultados.</p>';
    }
}
