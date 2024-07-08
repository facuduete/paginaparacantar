let intervalo;
const textarea = document.getElementById('letra-field');
const botonIniciar = document.getElementById('botonIniciar');
const botonPausar = document.getElementById('botonPausar');
const botonDetener = document.getElementById('botonDetener');
icono = botonPausar.querySelector('i');
var velocidad = 500, fuenteSize = 1;

function resetForm() {
    document.getElementById('formLetra').reset();
    if (botonPausar.getAttribute('title') == "Continuar") {
        mostrarIconoPausa();
    }
    if (botonIniciar.style.display == 'none'){
        mostrarBotonIniciar();
    }
}

textarea.addEventListener('input', function() {
    if (textarea.value.trim() === '') {
        resetForm();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (botonPausar.style.display == 'inline-block') {
            event.preventDefault();
            pausar();
        }
    }
});

function iniciar() {
    // Verificar si el textarea no está vacío
    if (textarea.value.trim() !== "") {
        textarea.scrollTop = 0;
        continuar();
    }
}

textarea.addEventListener('wheel', function() {
    if (botonPausar.getAttribute('title') == "Pausar") {
        clearInterval(intervalo);
        mostrarIconoContinuar();
    }
});

textarea.addEventListener('touchmove', function() {
    if (botonPausar.getAttribute('title') == "Pausar") {
        clearInterval(intervalo);
        mostrarIconoContinuar();
    }
});

function detener() {
    clearInterval(intervalo); // Detener el desplazamiento automático
    mostrarBotonIniciar();
    if (botonPausar.getAttribute('title') == "Continuar") {
        mostrarIconoPausa();
    }
}

function pausar() {
    if (botonPausar.getAttribute('title') == "Pausar") {
        clearInterval(intervalo);
        mostrarIconoContinuar();
    }
    else {
        mostrarIconoPausa();
        continuar();
    }
}

function continuar(){
    clearInterval(intervalo);
    mostrarIconoPausa();
    mostrarBotonPausa();
    const step = fuenteSize; // Número de píxeles por desplazamiento
    intervalo = setInterval(() => {
        const maxScroll = textarea.scrollHeight - textarea.clientHeight;
        const currentScroll = textarea.scrollTop;
        
        if (currentScroll >= maxScroll - 1) {
            detener();
        } else {
            textarea.scrollTop += step;
        }
    }, velocidad); // Intervalo en milisegundos entre cada desplazamiento
}

function mostrarBotonPausa(){
    botonIniciar.style.display = 'none';
    botonPausar.style.display = 'inline-block';
    botonDetener.style.display = 'inline-block';
}

function mostrarBotonIniciar(){
    botonPausar.style.display = 'none';
    botonDetener.style.display = 'none';
    botonIniciar.style.display = 'inline-block';
}

function mostrarIconoPausa(){
    icono.classList.remove('bi-play-fill');
    icono.classList.add('bi-pause-fill');
    botonPausar.setAttribute('title', 'Pausar');
}

function mostrarIconoContinuar(){
    icono.classList.remove('bi-pause-fill');
    icono.classList.add('bi-play-fill');
    botonPausar.setAttribute('title', 'Continuar');
}

//Scripts para botón para seleccionar tamaño de fuente.
document.addEventListener('DOMContentLoaded', function() {
    const defaultFontSizeOption = '1'; // Opción por defecto para el tamaño de letra
    const dropdownItemsFontSize = document.querySelectorAll('.dropdown-menu-letra .dropdown-item');

    // Inicializar el valor seleccionado para el tamaño de letra
    dropdownItemsFontSize.forEach(function(item) {
        if (item.getAttribute('data-value') === defaultFontSizeOption) {
            item.classList.add('selected');
        }
    });

    // Agregar eventos a los elementos del dropdown de tamaño de letra
    dropdownItemsFontSize.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            if (botonPausar.getAttribute('title') == "Pausar") {
                pausar();
            }
            const valor = this.getAttribute('data-value');

            // Remover la clase 'selected' de todos los elementos del tamaño de letra
            dropdownItemsFontSize.forEach(function(el) {
                el.classList.remove('selected');
            });

            // Añadir la clase 'selected' al elemento clicado del tamaño de letra
            this.classList.add('selected');

            let tamañoFuente;
            switch(valor) {
                case '1':
                    tamañoFuente = '15px';
                    fuenteSize = 1;
                    break;
                case '2':
                    tamañoFuente = '20px';
                    fuenteSize = 2;
                    break;
                case '3':
                    tamañoFuente = '25px';
                    fuenteSize = 3;
                    break;
                case '4':
                    tamañoFuente = '30px';
                    fuenteSize = 4;
                    break;
                case '5':
                    tamañoFuente = '35px';
                    fuenteSize = 5;
                    break;
                default:
                    tamañoFuente = '15px';
                    fuenteSize = 1;
                    break;
            }
            textarea.style.fontSize = tamañoFuente; // Aplicar el tamaño de letra al textarea
        });
    });
});

//script para boton de seleccionar velocidad.
document.addEventListener('DOMContentLoaded', function() {
    const defaultSpeedOption = '1.0'; // Opción por defecto para la velocidad
    const dropdownItemsSpeed = document.querySelectorAll('.dropdown-menu-velocidad .dropdown-item');

    // Inicializar el valor seleccionado para la velocidad
    dropdownItemsSpeed.forEach(function(item) {
        if (item.getAttribute('data-value') === defaultSpeedOption) {
            item.classList.add('selected');
            velocidad = 500;
        }
    });

    // Agregar eventos a los elementos del dropdown de velocidad
    dropdownItemsSpeed.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            if (botonPausar.getAttribute('title') == "Pausar") {
                pausar();
            }
            const valor = this.getAttribute('data-value');

            // Remover la clase 'selected' de todos los elementos de velocidad
            dropdownItemsSpeed.forEach(function(el) {
                el.classList.remove('selected');
            });

            // Añadir la clase 'selected' al elemento clicado de velocidad
            this.classList.add('selected');

            switch(valor) {
                case '0.25':
                    velocidad = 800;
                    break;
                case '0.50':
                    velocidad = 700;
                    break;
                case '0.75':
                    velocidad = 600;
                    break;
                case '1.0':
                    velocidad = 500;
                    break;
                case '1.25':
                    velocidad = 400;
                    break;
                case '1.50':
                    velocidad = 300;
                    break;
                case '1.75':
                    velocidad = 200;
                    break;
                case '2.0':
                    velocidad = 100;
                    break;
                default:
                    velocidad = 500;
                    break;
            }

        });
    });
});