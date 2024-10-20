let estado = 0; // Estado inicial
let textos = [];
let botonA = [];
let botonB = [];
let imghulk,imgthanos;
let imgFondo; // Variable para la imagen de fondo
let opening ;
function preload() {
  opening = loadSound('data/sonidos/opening.mp3');
  imgFondo = loadImage('data/inicio.jpg');
  imghulk=loadImage('data/hulk.jpg');
  imgthanos=loadImage('data/thanospelea.jpg');

}

function setup() {
  createCanvas(640, 480);
  inicializar();
}

function draw() {
  background(200);
  image(imgFondo, 0, 0, width, height); // Dibuja la imagen de fondo
  mostrarTexto(textos[estado]);
  mostrarBotones();
}

function mostrarTexto(texto) {
  textSize(15);
  textAlign(CENTER);
  fill(255); // Color del texto
  text(texto, width / 2, height / 4);
}

function mostrarBotones() {
  if (botonA[estado]) {
    textSize(20);
    fill(255); // Color del texto de botones
    text(botonA[estado].text, width / 2, height * 0.75);
  }
  if (botonB[estado]) {
    textSize(20);
    fill(255); // Color del texto de botones
    text(botonB[estado].text, width / 2, height * 0.75 + 40);
   
  }
}

function mousePressed() {
  if (botonA[estado] && colisionBoton(width / 2, height * 0.75, 200, 40)) {
    estado = botonA[estado].next; // Transición según la decisión A
     opening.play(); // Reproduce el sonido al iniciar
  }
  if (botonB[estado] && colisionBoton(width / 2, height * 0.75 + 40, 200, 40)) {
    estado = botonB[estado].next; // Transición según la decisión B
  }
}

function colisionBoton(x, y, w, h) {
  return mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2;
}

function inicializar() {
  // Texto y decisiones
  textos = [
    "Hulk chasquea los dedos con el guante del infinito creado por Tony Stark, y todos vuelven a la vida.",
    "Thanos llega al presente con la ayuda de Nebula, destruyendo la base de los Vengadores.",
    "¿Qué hacer? Los Vengadores se juntan o se mantienen separados.",
    "Los Vengadores se juntan: Iron Man, Thor y Capitán América se preparan para pelear contra Thanos.",
    "El Capitán América es derrotado por Thanos.",
    "Iron Man adquiere las gemas del infinito y derrota a Thanos fácilmente.",
    "Tony es corrompido por su poder y se convierte en villano.",
    "Iron Man se encuentra solo frente a Thanos.",
    "Iron Man pierde la batalla.",
    "¿Ayudar a Iron Man como Thor o Capitán América?",
    "Thor salva a Iron Man y derrota a Thanos. Thor se convierte en el superhéroe más poderoso.",
    "Capitán América se une a la pelea, pero ambos son derrotados.",
    "Doctor Strange y Spider-Man aparecen para ayudar a los Vengadores y vencen a Thanos.",
    "Spider-Man devuelve todas las gemas del infinito a su respectivo lugar."
  ];

  botonA = [
    { text: "Inicio", next: 1 },
    { text: "continuar", next: 2 },
    { text: "Vengadores Unidos", next: 3 },
    { text: "Vengadores Separados", next: 7 },
    { text: "", next: 4 }, // Sin acción A en 4
    { text: "", next: 6 }, // Sin acción A en 5
    { text: "", next: 7 }, // Sin acción A en 6
    { text: "Ayudar a Iron Man", next: 10 },
    { text: "Usando al Capitan America", next: 11 },
    { text: "", next: 12 }, // Sin acción A en 9
    { text: "", next: 0 },  // Opciones para repetir
    { text: "", next: 0 },  // Opciones para repetir
    { text: "", next: 0 },  // Opciones para repetir
    { text: "", next: 0 }   // Opciones para repetir
  ];

  botonB = [
    null, // No hay opción B para el estado 0
    null, // No hay opción B para el estado 1
    { text: "Vengadores Separados", next: 7 }, // Opción B en el estado 2
    null, // No hay opción B para el estado 3
    null, // No hay opción B para el estado 4
    null, // No hay opción B para el estado 5
    null, // No hay opción B para el estado 6
    { text: "Vengadores Unidos", next: 3 }, // Opción B en el estado 7
     { text: "Usando a Thor", next: 11 },
    null, // No hay opción B para el estado 9
    null, // No hay opción B para el estado 10
    null, // No hay opción B para el estado 11
    null, // No hay opción B para el estado 12
    null  // No hay opción B para el estado 13
  ];
}
