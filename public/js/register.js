window.onload = () => {

    //capturo al formulario
    let formulario = document.querySelector('form.form-register');

    //asigno el evento onsubmit
    formulario.onsubmit = (ev) => {

        for (const input of formulario.elements) {
            input.classList.remove('is-invalid');

            if (['text', 'password'].includes(input.type) && input.value == '') {
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

    const file    = document.querySelector('#poster')

    file.onchange = function () {
        const preview = document.querySelector('#photo-preload img');
        const previewDiv = document.querySelector('#photo-preload');
        const file    = this.files[0];
        const reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
          previewDiv.style.display = 'block';
        }
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = "";
        }
    }

}