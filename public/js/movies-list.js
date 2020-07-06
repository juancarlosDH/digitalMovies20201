window.addEventListener('load', function(){
    const buttonsHearts = document.querySelectorAll('.buttonHeart');

    for (const boton of buttonsHearts) {
        boton.onclick = function() {
            const anclaje = this;
            const movieId = this.getAttribute('data-movieId');
            
            fetch('http://localhost:3001/users/addFavourite', {
                method : 'POST',
                body : '',
                headers : {
                    'Content-type' : 'application/json'
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (respuestaEnJson) {
                //aqui la API me responda exitosamente
                console.log(respuestaEnJson)

                //alert('Pelicula agregada exitosamente');

                //busco a la etiqueta i 
                const i = anclaje.querySelector('i');

                //cambio el icono a lleno
                i.classList.toggle('far');
                i.classList.toggle('fas');
            })
            .catch(function (error) {
                console.error(error);
            });

        }
    }
});