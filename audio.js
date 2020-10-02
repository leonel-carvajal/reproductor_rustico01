const video = document.getElementById('video');
const miAudio = document.getElementById('miAudio');
const reproducir = document.getElementById('reproducir');
const barra = document.getElementById('barra')
const progreso = document.getElementById('progreso')
const play = document.getElementById('play')
//Variable con el tamaño de barra de progreso, revisar CCS/#Barra
const maximo = 600
const volumen = document.getElementById('volumen')
const iconoVolumen = document.getElementById('iconoVolumen')
const imagenes = document.querySelectorAll('img')
const adelantar = document.getElementById('adelantar')
const regresar = document.getElementById('regresar')
//Array con imagenes y canciones
let nombreCanciones = ['Moonlight.mp3', 'Nocturne_chopin.mp3', 'Serenata-Nocturna.mp3', 'Zarathustra.mp3']
let imgCanciones = ['moonlight.jpg', 'chopin.jpg', 'zara.jpg', 'mozart2.jpg']
let posicionActual = 0
let etiquetaCancion = document.getElementById('etiquetaCancion')

const comenzar = () => {
    reproducir.addEventListener('click', clicando, false)
    barra.addEventListener('click', adelantando, false)
    volumen.addEventListener('click', controlVolumen)
    iconoVolumen.addEventListener('click', controlIconoVolumen)
    adelantar.addEventListener('click', adelantaCancion, true)
    regresar.addEventListener('click', regresaCancion)

};

const regresaCancion = () => {

    posicionActual--
    if (posicionActual < 0) {
        posicionActual = 3
    }
    imgCanciones[posicionActual]
    nombreCanciones[posicionActual]
    let arra = Array.from(imagenes)
    arra[0].setAttribute('src', `img/${imgCanciones[posicionActual]}`)
    miAudio.setAttribute('src', `audio/${nombreCanciones[posicionActual]}`)
    etiquetaCancion.textContent = nombreCanciones[posicionActual]
    let faPlay = 'fas fa-play'
    play.className = faPlay
}

const adelantaCancion = () => {

    posicionActual++
    if (posicionActual > 3) {
        posicionActual = 0
    }
    imgCanciones[posicionActual]
    nombreCanciones[posicionActual]
    console.log(posicionActual)

    let arra = Array.from(imagenes)
    arra[0].setAttribute('src', `img/${imgCanciones[posicionActual]}`)
    miAudio.setAttribute('src', `audio/${nombreCanciones[posicionActual]}`)
    let nombre = nombreCanciones[posicionActual].slice(0,-4)
    etiquetaCancion.textContent = nombre
    
    let faPlay = 'fas fa-play'
    play.className = faPlay
    let ultima = imgCanciones.length - 1

    if (posicionActual == ultima) {
        posicionActual = -1
    }
}

const controlVolumen = () => {
    miAudio.volume = volumen.value

    if (miAudio.volume == 0) {
        let faMute = 'fas fa-volume-mute';
        iconoVolumen.className = faMute;
    } else {
        faMute = 'fas fa-volume-up';
        iconoVolumen.className = faMute;
    }


}
const controlIconoVolumen = () => {
    let vol = miAudio.volume
    if (vol > 0) {
        volMute();
    } else {
        volUp()
    }
}
const volMute = () => {
    miAudio.volume = 0;
    volumen.value = 0;
    let faMute = 'fas fa-volume-mute';
    iconoVolumen.className = faMute
}
const volUp = () => {
    miAudio.volume = 1;
    volumen.value = 1;
    let faMute = 'fas fa-volume-up';
    iconoVolumen.className = faMute
}


const clicando = () => {
    if (miAudio.paused == false && miAudio.ended == false) {
        miAudio.pause();
        let faPlay = 'fas fa-play'
        play.className = faPlay

    } else {
        miAudio.play()
        let faPause = 'fas fa-pause'
        play.className = faPause
        bucle = setInterval(estado, 50)

    }
};

const actual = () => {
    let actual = document.getElementById('actual')
    let a = miAudio.currentTime.toFixed(0)
    actual.textContent = `0${a}s/`
}

const estado = () => {
    if (miAudio.ended == false) {
        let total = parseInt(miAudio.currentTime * maximo / miAudio.duration)
        progreso.style.width = `${total}px`

    }
};

const adelantando = (posicion) => {
    if (miAudio.paused == false && miAudio.ended == false) {
        let ratonX = posicion.pageX - barra.offsetLeft;
        let nuevoTiempo = ratonX * miAudio.duration / maximo;
        miAudio.currentTime = nuevoTiempo;
        progreso.style.width = `${ratonX}px`;
    } else if (miAudio.paused == true) {
        let ratonX = posicion.pageX - barra.offsetLeft;
        let nuevoTiempo = ratonX * miAudio.duration / maximo;
        miAudio.currentTime = nuevoTiempo;
        progreso.style.width = `${ratonX}px`;
    }
};

window.addEventListener('load', comenzar, false)