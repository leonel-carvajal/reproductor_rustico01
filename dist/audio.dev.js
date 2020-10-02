"use strict";

var video = document.getElementById('video');
var miAudio = document.getElementById('miAudio');
var reproducir = document.getElementById('reproducir');
var barra = document.getElementById('barra');
var progreso = document.getElementById('progreso');
var play = document.getElementById('play'); //Variable con el tamaño de barra de progreso, revisar CCS/#Barra

var maximo = 600;
var volumen = document.getElementById('volumen');
var iconoVolumen = document.getElementById('iconoVolumen');
var imagenes = document.querySelectorAll('img');
var adelantar = document.getElementById('adelantar');
var regresar = document.getElementById('regresar'); //Array con imagenes y canciones

var nombreCanciones = ['Moonlight.mp3', 'Nocturne_chopin.mp3', 'Serenata-Nocturna.mp3', 'Zarathustra.mp3'];
var imgCanciones = ['moonlight.jpg', 'chopin.jpg', 'zara.jpg', 'mozart2.jpg'];
var posicionActual = 0;
var etiquetaCancion = document.getElementById('etiquetaCancion');

var comenzar = function comenzar() {
  reproducir.addEventListener('click', clicando, false);
  barra.addEventListener('click', adelantando, false);
  volumen.addEventListener('click', controlVolumen);
  iconoVolumen.addEventListener('click', controlIconoVolumen);
  adelantar.addEventListener('click', adelantaCancion, true);
  regresar.addEventListener('click', regresaCancion);
};

var regresaCancion = function regresaCancion() {
  posicionActual--;

  if (posicionActual < 0) {
    posicionActual = 3;
  }

  imgCanciones[posicionActual];
  nombreCanciones[posicionActual];
  var arra = Array.from(imagenes);
  arra[0].setAttribute('src', "img/".concat(imgCanciones[posicionActual]));
  miAudio.setAttribute('src', "audio/".concat(nombreCanciones[posicionActual]));
  etiquetaCancion.textContent = nombreCanciones[posicionActual];
  var faPlay = 'fas fa-play';
  play.className = faPlay;
};

var adelantaCancion = function adelantaCancion() {
  posicionActual++;

  if (posicionActual > 3) {
    posicionActual = 0;
  }

  imgCanciones[posicionActual];
  nombreCanciones[posicionActual];
  console.log(posicionActual);
  var arra = Array.from(imagenes);
  arra[0].setAttribute('src', "img/".concat(imgCanciones[posicionActual]));
  miAudio.setAttribute('src', "audio/".concat(nombreCanciones[posicionActual]));
  var nombre = nombreCanciones[posicionActual].slice(0, -4);
  etiquetaCancion.textContent = nombre;
  var faPlay = 'fas fa-play';
  play.className = faPlay;
  var ultima = imgCanciones.length - 1;

  if (posicionActual == ultima) {
    posicionActual = -1;
  }
};

var controlVolumen = function controlVolumen() {
  miAudio.volume = volumen.value;

  if (miAudio.volume == 0) {
    var _faMute = 'fas fa-volume-mute';
    iconoVolumen.className = _faMute;
  } else {
    faMute = 'fas fa-volume-up';
    iconoVolumen.className = faMute;
  }
};

var controlIconoVolumen = function controlIconoVolumen() {
  var vol = miAudio.volume;

  if (vol > 0) {
    volMute();
  } else {
    volUp();
  }
};

var volMute = function volMute() {
  miAudio.volume = 0;
  volumen.value = 0;
  var faMute = 'fas fa-volume-mute';
  iconoVolumen.className = faMute;
};

var volUp = function volUp() {
  miAudio.volume = 1;
  volumen.value = 1;
  var faMute = 'fas fa-volume-up';
  iconoVolumen.className = faMute;
};

var clicando = function clicando() {
  if (miAudio.paused == false && miAudio.ended == false) {
    miAudio.pause();
    var faPlay = 'fas fa-play';
    play.className = faPlay;
  } else {
    miAudio.play();
    var faPause = 'fas fa-pause';
    play.className = faPause;
    bucle = setInterval(estado, 50);
  }
};

var actual = function actual() {
  var actual = document.getElementById('actual');
  var a = miAudio.currentTime.toFixed(0);
  actual.textContent = "0".concat(a, "s/");
};

var estado = function estado() {
  if (miAudio.ended == false) {
    var total = parseInt(miAudio.currentTime * maximo / miAudio.duration);
    progreso.style.width = "".concat(total, "px");
  }
};

var adelantando = function adelantando(posicion) {
  if (miAudio.paused == false && miAudio.ended == false) {
    var ratonX = posicion.pageX - barra.offsetLeft;
    var nuevoTiempo = ratonX * miAudio.duration / maximo;
    miAudio.currentTime = nuevoTiempo;
    progreso.style.width = "".concat(ratonX, "px");
  } else if (miAudio.paused == true) {
    var _ratonX = posicion.pageX - barra.offsetLeft;

    var _nuevoTiempo = _ratonX * miAudio.duration / maximo;

    miAudio.currentTime = _nuevoTiempo;
    progreso.style.width = "".concat(_ratonX, "px");
  }
};

window.addEventListener('load', comenzar, false);