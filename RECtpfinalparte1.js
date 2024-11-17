let estado = 0; // Estado inicial
let textos = [];
//Comision nro 3 
//Alumno : Nieto Agustin 
//Rec Tpfinal parte 1 
let botonA = [];
let botonB = [];
let fondos = [];
let imgFondo; // Imagen de fondo actual
let opening;

function preload() {
  // Cargar el sonido
  opening = loadSound("data/opening.mp3");

  // Cargar imágenes secuenciales
  for (let i = 1; i <= 12; i++) {
  img.resize(640, 0);  
  fondos.push(loadImage(`data/${i}.jpg`));
  }
}

function setup() {
  createCanvas(640, 480); // Canvas fijo
  if (fondos.length > 0) {
    imgFondo = fondos[estado]; // Imagen inicial
  } else {
    console.error("No se cargaron imágenes de fondo.");
  }
  inicializar();
}

function draw() {
background(0);

  // Dibujar la imagen de fondo
  if (imgFondo) {
    image(imgFondo, 0, 0, width, height); // Escalar al canvas
  }

  // Mostrar texto y botones
  mostrarTexto(textos[estado]);
  mostrarBotones();
}

function mostrarTexto(texto) {
  textSize(20);
  textAlign(CENTER);
  fill(255); // Texto en blanco
  text(texto, width / 2, height / 4, width * 0.8); // Ajustado al ancho del canvas
}

function mostrarBotones() {
  textSize(20);
  rectMode(CENTER);

  // Botón A
  if (botonA[estado]) {
    fill(255, 100, 100); // Color botón A
    rect(width / 2, height * 0.75, 200, 50, 10); // Dibujar botón A
    fill(255); // Texto del botón
    text(botonA[estado].text, width / 2, height * 0.75 + 5);
  }

  // Botón B
  if (botonB[estado]) {
    fill(100, 100, 255); // Color botón B
    rect(width / 2, height * 0.75 + 60, 200, 50, 10); // Dibujar botón B
    fill(255); // Texto del botón
    text(botonB[estado].text, width / 2, height * 0.75 + 65);
  }
}

function colisionBoton(x, y, w, h) {
  return mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2;
}

function mousePressed() {
  // Reproducir o detener la música
  if (!opening.isPlaying()) {
    opening.play();
  } else {
    opening.stop();
  }

  // Verificar colisión con el botón A
  if (botonA[estado] && colisionBoton(width / 2, height * 0.75, 200, 50)) {
    estado = botonA[estado].next; // Cambiar estado
    imgFondo = fondos[estado]; // Cambiar imagen de fondo
  }

  // Verificar colisión con el botón B
  if (botonB[estado] && colisionBoton(width / 2, height * 0.75 + 60, 200, 50)) {
    estado = botonB[estado].next; // Cambiar estado
    imgFondo = fondos[estado]; // Cambiar imagen de fondo
  }
}

function inicializar() {
  // Textos de cada estado
  textos = [
    "Hulk chasquea los dedos con el guante del infinito, y todos vuelven a la vida.",
    "Thanos llega al presente con la ayuda de Nebula, destruyendo la base de los Vengadores.",
    "¿Qué hacer? Los Vengadores se juntan o se mantienen separados.",
    "Iron Man, Thor y Capitán América pelean contra Thanos.",
    "El Capitán América es derrotado por Thanos.",
    "Iron Man adquiere las gemas del infinito y derrota a Thanos fácilmente.",
    "Tony es corrompido por el poderde las gemas y se convierte en villano.",
    "Iron Man se encuentra solo frente a Thanos.",
    "Iron Man pierde la batalla.",
    "¿Ayudar a Iron Man?",
    "Thor salva a Iron Man y derrota a Thanos.",
    "Capitán América se une a la pelea, pero ambos son derrotados.",
    "Doctor Strange aparece para ayudar a los Vengadores y vence a Thanos.",
  ];

  // Botones para cada estado
  botonA = [
    { text: "Inicio", next: 1 },
    { text: "Continuar", next: 2 },
    { text: "Vengadores Unidos", next: 3 },
    { text: "Seguir Luchando", next: 4 },
    { text: "Intentar de Nuevo", next: 5 },
    { text: "Iron Man Gana", next: 6 },
    { text: "Tony Villano", next: 7 },
    { text: "Capitán América", next: 8 },
    { text: "Thor Actúa", next: 9 },
    { text: "Doctor Strange", next: 10 },
    null,
    null,
    null,
  ];

  botonB = [
    null,
    null,
    { text: "Luchar Separados", next: 4 },
    { text: "Thor Actúa", next: 5 },
    { text: "Iron Man Retoma", next: 6 },
    null,
    null,
    { text: "recibir ayuda de Thor ", next: 10 },
    null,
    { text: "Iron Man Solo", next: 11 },
    null,
    null,
    null,
  ];
}
