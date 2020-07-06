window.addEventListener('load', function(){
    const form = document.querySelector('.form-busqueda');

    form.onsubmit = function(event) {
        event.preventDefault();
        const anclaje = this;
        const busqueda = this.querySelector('#busqueda');
        const titulo = document.querySelector('#titulo-resultados');
        const listado = document.querySelector('#lista-resultados');
        listado.innerHTML = '';
        titulo.innerHTML = '<div class="alert alert-light" role="alert">Buscando</div>';
        busqueda.classList.remove('is-invalid');

        if (busqueda.value.trim().length <= 2) {
            titulo.innerHTML = '<div class="alert alert-danger" role="alert">Al menos 3 letras para buscar</div>';
            busqueda.classList.add('is-invalid');
            busqueda.parentElement.querySelector('div.invalid-feedback').innerText = 'Al menos 3 letras para buscar';
            return false;
        }

        fetch(`http://www.omdbapi.com/?apikey=a7935ed&s=${busqueda.value.trim()}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (respuestaEnJson) {
            //aqui la API me responda exitosamente

            if (respuestaEnJson.Response == "False") {
                titulo.innerHTML = '<div class="alert alert-danger" role="alert">No se ha encontrado nada con lo buscaste</div>';
                return false;
            }

            titulo.innerHTML = 'Resultados';
            for (const buscado of respuestaEnJson.Search) {
                listado.innerHTML += `<div class="item-resultado">
                    <h6>${buscado.Title}</h6>
                    <img src="${buscado.Poster}" class="img-resultado"/>
                </div>`
            }

            
        })
        .catch(function (error) {
            console.error(error);
        });

    }
});