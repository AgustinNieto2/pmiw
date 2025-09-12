//Nieto Agustin 119101/6
//Comision  5
//Tp1 p5js
// https://youtu.be/I64maoAd3f8

let obra;  // variable para cargar imagen
let diam = 20;  // diámetro de círculos
let espacio = 60; // espacio entre un elemento y otro
let colorCirculos; // color de los círculos

function preload() {
  obra = loadImage("data/obra.jpg"); // carga la imagen antes de setup
}

function setup() {
  createCanvas(800, 400); // tamaño de la pantalla
  colorCirculos = color(255); // circulos color blanco
}

function draw() {
  background(0); // fondo negro
  image(obra, 0, 0, 400, 400); // dibuja la imagen a la izquierda
  translate(415, 0); // mueve el origen a la derecha

  noStroke(); // quita contorno de figuras

  for (let x = 0; x < width - 415; x += espacio) {  // bucle horizontal
    for (let y = 0; y < height; y += espacio) {     // bucle vertical

      fill(150);
      rect(x, y, width, 10);   // rectángulo horizontal
      rect(x, y, 10, height);  // rectángulo vertical

      if (mouseIsPressed) {
        // color aleatorio si el mouse está presionado
        colorCirculos = color(random(255), random(255), random(255));
      } else {
        // vuelve a blanco si no está presionado
        colorCirculos = color(255);
      }

      fill(colorCirculos);
      ellipse(x, y, diam, diam); // dibuja los círculos
    }
  }
}
