window.onload = () => {

    let botonGoogle = document.querySelector('#boton-google');

    botonGoogle.onclick = function (event) {
        event.preventDefault();
        alert('me clikeaste')
    }

    //capturo al formulario
    let formularioLogin = document.querySelector('form.form-login');

    let campoEmail = formularioLogin.querySelector('#email');
    let campoPass = formularioLogin.querySelector('#password');

    //asigno el evento onsubmit
    formularioLogin.onsubmit = (ev) => {
        //aqui si empiezo a validar
        campoEmail.classList.remove('is-invalid');

        let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        if (!regexEmail.test(campoEmail.value)) {
            console.log('no es corrrecto email')
            //evito que se envio el formulario
            ev.preventDefault();
            //le agrego la clase is-invalid al input
            campoEmail.classList.add('is-invalid');
            //busco al hermanito donde voy a mostrar el error
            let mostrarError = campoEmail.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'Email Invalido';
        }

        
        campoPass.classList.remove('is-invalid');

        if (campoPass.value == '') {
            console.log('no es corrrecto pass')
            //evito que se envio el formulario
            ev.preventDefault();
            //le agrego la clase is-invalid al input
            campoPass.classList.add('is-invalid');
            //busco al hermanito donde voy a mostrar el error
            let mostrarError = campoPass.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'Ingrese la Password';
        }

    }

    let passMostrar = formularioLogin.querySelector('#pass-mostrar');
    
    passMostrar.onmousedown  = () => {
        campoPass.type = 'text';
    }
    passMostrar.onmouseup = () => {
        campoPass.type = 'password';
    }


    let eliminarme = document.querySelector('#eliminarme');
    eliminarme.onclick = function () {
        this.parentElement.remove();
    }
    
    let iniciar = document.querySelector('#iniciar');
    let spanNumeros = document.querySelector('#numeros');
    let cronometro = 0;
    iniciar.onclick = function () {
        setInterval(function(){
            cronometro++;
            spanNumeros.innerText = cronometro;
        }, 1000);
    }
    

}