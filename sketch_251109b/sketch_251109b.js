// Archivo: sketch.js
// Este es el archivo principal de p5.js. Aquí se configura el sketch y se manejan las clases.

// Clases definidas:
// 1. Bird: Representa el pájaro mecánico base.
// 2. Part: Representa cada parte del rompecabezas (alas, cabeza, cola, etc.).
// 3. Game: Maneja la lógica del juego, estado, temporizador, verificación de victoria/derrota.
// 4. UI: Maneja la interfaz de usuario (instrucciones, créditos, botón de reiniciar).

let game; // Instancia del juego

function setup() {
  createCanvas(800, 600);
  game = new Game();
}

function draw() {
  background(220);
  game.update();
  game.display();
}

function mousePressed() {
  game.handleMousePressed();
}

function mouseDragged() {
  game.handleMouseDragged();
}

function mouseReleased() {
  game.handleMouseReleased();
}

// Clase Bird: Representa el pájaro mecánico base con posiciones para las partes.
class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.parts = []; // Lista de partes colocadas
    this.requiredParts = ['head', 'body', 'wings', 'tail']; // Partes necesarias
  }

  display() {
    // Dibuja el cuerpo base del pájaro
    fill(150);
    ellipse(this.x, this.y, 100, 50); // Cuerpo
    // Dibuja partes colocadas
    for (let part of this.parts) {
      part.display();
    }
  }

  addPart(part) {
    if (this.isCorrectPosition(part)) {
      this.parts.push(part);
      part.placed = true;
    }
  }

  isCorrectPosition(part) {
    // Lógica simple: verifica si la parte está cerca de su posición correcta
    let correctPos = this.getCorrectPosition(part.type);
    return dist(part.x, part.y, correctPos.x, correctPos.y) < 20;
  }

  getCorrectPosition(type) {
    switch (type) {
      case 'head': return { x: this.x, y: this.y - 30 };
      case 'body': return { x: this.x, y: this.y };
      case 'wings': return { x: this.x - 40, y: this.y };
      case 'tail': return { x: this.x + 40, y: this.y };
      default: return { x: this.x, y: this.y };
    }
  }

  isComplete() {
    return this.parts.length === this.requiredParts.length;
  }
}

// Clase Part: Representa cada pieza del rompecabezas.
class Part {
  constructor(type, x, y, img) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.img = img; // Imagen de la parte (puedes cargar imágenes en p5.js)
    this.dragging = false;
    this.placed = false;
  }

  display() {
    if (!this.placed) {
      image(this.img, this.x - 25, this.y - 25, 50, 50);
    }
  }

  isMouseOver() {
    return dist(mouseX, mouseY, this.x, this.y) < 25;
  }

  startDrag() {
    if (this.isMouseOver() && !this.placed) {
      this.dragging = true;
    }
  }

  drag() {
    if (this.dragging) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  stopDrag() {
    this.dragging = false;
  }
}

// Clase Game: Maneja la lógica del juego.
class Game {
  constructor() {
    this.bird = new Bird(400, 300);
    this.parts = this.createParts();
    this.timer = new Timer(60); // 60 segundos
    this.ui = new UI();
    this.gameState = 'playing'; // 'playing', 'won', 'lost'
  }

  createParts() {
    // Crea las partes (en un juego real, cargarías imágenes)
    let parts = [];
    parts.push(new Part('head', 100, 100, null)); // Simula imagen
    parts.push(new Part('body', 200, 100, null));
    parts.push(new Part('wings', 300, 100, null));
    parts.push(new Part('tail', 400, 100, null));
    return parts;
  }

  update() {
    if (this.gameState === 'playing') {
      this.timer.update();
      if (this.timer.isTimeUp()) {
        this.gameState = 'lost';
      }
      if (this.bird.isComplete()) {
        this.gameState = 'won';
      }
    }
  }

  display() {
    this.bird.display();
    for (let part of this.parts) {
      part.display();
    }
    this.timer.display();
    this.ui.display(this.gameState);
  }

  handleMousePressed() {
    for (let part of this.parts) {
      part.startDrag();
    }
    this.ui.handleClick();
  }

  handleMouseDragged() {
    for (let part of this.parts) {
      part.drag();
    }
  }

  handleMouseReleased() {
    for (let part of this.parts) {
      part.stopDrag();
      this.bird.addPart(part);
    }
  }
}

// Clase Timer: Maneja el temporizador.
class Timer {
  constructor(seconds) {
    this.startTime = millis();
    this.duration = seconds * 1000;
  }

  update() {
    // No hace nada, solo se verifica en display
  }

  isTimeUp() {
    return millis() - this.startTime > this.duration;
  }

  display() {
    let remaining = max(0, this.duration - (millis() - this.startTime));
    let seconds = floor(remaining / 1000);
    fill(0);
    textSize(20);
    text(`Tiempo: ${seconds}s`, 10, 30);
  }
}

// Clase UI: Maneja instrucciones, créditos y reiniciar.
class UI {
  constructor() {
    this.restartButton = createButton('Reiniciar');
    this.restartButton.position(10, 550);
    this.restartButton.mousePressed(() => this.restartGame());
    this.showInstructions = true;
    this.showCredits = false;
  }

  display(gameState) {
    if (this.showInstructions) {
      fill(0);
      textSize(16);
      text('Instrucciones: Arrastra las partes del pájaro mecánico a sus posiciones correctas para armarlo y hacerlo volar. Tienes 60 segundos.', 10, 60, 780, 100);
      text('Haz clic para comenzar.', 10, 180);
    } else if (gameState === 'won') {
      fill(0, 255, 0);
      textSize(32);
      text('¡Ganaste! El pájaro mecánico está completo y puede volar.', 100, 300);
    } else if (gameState === 'lost') {
      fill(255, 0, 0);
      textSize(32);
      text('Perdiste. El tiempo se agotó y el pájaro no pudo volar.', 100, 300);
    }

    if (this.showCredits) {
      fill(0);
      textSize(16);
      text('Créditos: Desarrollado por [Tu Nombre] usando p5.js y Programación Orientada a Objetos.', 10, 500);
    }
  }

  handleClick() {
    if (this.showInstructions) {
      this.showInstructions = false;
      this.showCredits = true;
    }
  }

  restartGame() {
    // Reinicia el juego (en un sketch real, recargar o resetear instancias)
    location.reload(); // Simple reload para reiniciar
  }
}
