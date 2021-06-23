const contenido = document.querySelector('.contenido')
const btnGrabarTexto = document.querySelector('.btn-grabar')
    /* Primero creamos los objetos para poder grabar nuestra voz con el microfono */
const reconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition
const reconocimiento = new reconocimientoVoz()
    /* metodo que se ejecuta al empezar a granar */
reconocimiento.onstart = () => {
        contenido.innerHTML = 'Realizando busqueda...'
    }
    /* Metodo que se ejecuta al terminar la grabación */
reconocimiento.onresult = event => {
        let mensaje = event.results[0][0].transcript
        contenido.innerHTML = mensaje
        leerTextoCondicionado(mensaje)
    }
    /* Función que se lanza para locutar lo grabado */
const leerTextoSimple = (mensaje) => {
        const voz = new SpeechSynthesisUtterance()
        voz.text = mensaje
        window.speechSynthesis.speak(voz)
    }
    /* Función que condiciona la respuesta dependiendo de el contenido de la grabación */
const leerTextoCondicionado = (mensaje) => {
        const voz = new SpeechSynthesisUtterance()
        if (mensaje.includes('zapatos')) {
            let datos = new FormData();
            datos.append("producto", 'Zapato');
            fetch('recibirDatos.php', {
                    method: 'POST',
                    body: datos
                }).then(Response => Response.json())
                .then((Response) => {
                    console.log(Response);
                    console.log(Response[0][2])
                    let z = Response[0][2];
                    /*  if (data === 1) {
                         console.log(data);
                         location.href = 'home.php';
                     } else if (data === 2) {
                         location.href = 'inventarioUsuario.php';
                         console.log(data);
                     } else {
                         setTimeout(() => {
                             respuestaForm.classList.remove('invisible');
                             console.log(data);
                             alertaForm.textContent = 'Datos Incorrectos';
                             setTimeout(() => {
                                 respuestaForm.classList.add('invisible');
                             }, 2000);
                         }, 100);
                     } */
                });
            voz.text = 'En un momento te muestro los disponible'
        } else {
            voz.text = mensaje
        }
        window.speechSynthesis.speak(voz)
    }
    /* Evento para empezar a grabar pulsado el boton */
btnGrabarTexto.addEventListener('click', () => {
    reconocimiento.start()
})