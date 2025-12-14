let juego;
let imagenInicio;
let imagenDerrota;
let imagenVictoria;
let imagenFondoJuego;
let imagenAlaIzquierda;
let imagenAlaDerecha;
let imagenCabeza;
let imagenCola;
let imagenCuerpo;
let sonidoEnclaje;
let sonidoGanar;
let sonidoPerder;
let fuentePrincipal;

function preload() {

  fuentePrincipal = loadFont("data/fuentes/BebasNeue-Regular.ttf");
  imagenInicio = loadImage("data/imagenes/imagen_01.png");
  imagenDerrota = loadImage("data/imagenes/imagen_02.png");
  imagenVictoria = loadImage("data/imagenes/imagen_03.png");
  imagenFondoJuego = loadImage("data/imagenes/imagen_04.png");
  imagenAlaIzquierda = loadImage("data/imagenes/alaizq.png");
  imagenAlaDerecha = loadImage("data/imagenes/alader.png");
  imagenCabeza = loadImage("data/imagenes/cabeza.png");
  imagenCola = loadImage("data/imagenes/cola.png");
  imagenCuerpo = loadImage("data/imagenes/cuerpo.png");
  sonidoEnclaje = loadSound("data/sonidos/engranajes.mp3");
  sonidoGanar = loadSound("data/sonidos/ganar.mp3");
  sonidoPerder = loadSound("data/sonidos/perder.mp3");
}

function setup() {
  createCanvas(640, 480);
  textFont(fuentePrincipal);
  juego = new Juego();
}

function draw() {
  background(220);
  juego.dibujar();
}

function mousePressed() {
  juego.mousePressed();
}

function mouseReleased() {
}

function keyPressed() {
  juego.keyPressed();
}
