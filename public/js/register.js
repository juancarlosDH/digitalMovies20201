window.onload = () => {

    //capturo al formulario
    let formulario = document.querySelector('form.form-register');

    console.log(formulario.elements);

    //asigno el evento onsubmit
    formulario.onsubmit = (ev) => {

        for (const input of formulario.elements) {
            input.classList.remove('is-invalid');

            if (input.value == '') {
                //evito que se envio el formulario
                ev.preventDefault();
                //le agrego la clase is-invalid al input
                input.classList.add('is-invalid');
                //busco al hermanito donde voy a mostrar el error
                let mostrarError = input.parentElement.querySelector('div.invalid-feedback');
                mostrarError.innerText = 'Ingrese el valor';
            }
        }
        
        

    }



}