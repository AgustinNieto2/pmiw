//Alumno: Nieto Agustin 119101/6
//Comision 3 
// Obra op art
// https://youtu.be/1G5y9xZjjQ0
let obra; //  carga imagen
let diam = 20; //  diámetro de los círculos
let espacio = 60; //  espacio entre un elemento y otro
let colorCirculos; // color de los círculos

function preload() {
  obra = loadImage("data/obra.jpg"); // carga la imagen antes del setup
}

function setup() {
  createCanvas (800, 400); // tamaño del lienzo
  colorCirculos = color(255); // color inicial de los círculos
}

function draw() {
  background(0); // fondo negro
  image(obra, 0, 0, 400, 400); // dibuja la imagen

  push(); // guarda la transformación actual
  translate(415, 0); // mueve el origen del sistema de coordenadas a la derecha

  for (let x = 0; x < height; x += espacio) { // cambia el valor de x y lo reemplaza por la altura
    for (let y = 0; y < width; y += espacio) { // cambia el valor de y y lo reemplaza por el ancho

      fill(150); // color de los rectángulos
      noStroke();
      rect(x, y, width, 10); // dibuja rectángulo horizontal
      rect(x, y, 10, height); // dibuja rectángulo vertical

      if (mouseIsPressed) {
        colorCirculos = color(random(255), random(255), random(255)); // color aleatorio para los círculos
      } else {
        colorCirculos = color(255); // vuelve a blanco si no se hace click
      }

      fill(colorCirculos); // usa el color actual para los círculos
      ellipse(x, y, diam, diam); // dibuja los círculos
    }
  }

  pop(); // restaura la transformación previa
}
