class PartesPajaro {
  constructor(nombre, posicionX, posicionY, tamaño, imagen) {
    this.nombre = nombre;
    this.posicionX = posicionX;
    this.posicionY = posicionY;
    this.tamaño = tamaño;
    this.imagen = imagen;
    this.estaSeleccionada = "no";
    this.estaColocada = "no";
    this.resultadoDelToque = "no";
  }

  dibujar() {
    if (this.imagen) {
      imageMode(CENTER);
      image(this.imagen, this.posicionX, this.posicionY, this.tamaño, this.tamaño);
    } else {
      fill(200, 230, 255);
      ellipse(this.posicionX, this.posicionY, this.tamaño, this.tamaño);
    }
  }

  mover(nuevoX, nuevoY) {
    if (this.estaSeleccionada == "si" && this.estaColocada == "no") {
      this.posicionX = nuevoX;
      this.posicionY = nuevoY;
    }
  }

  fueTocada(mouseX, mouseY) {
  let distanciaMouseX = mouseX - this.posicionX;
  let distanciaMouseY = mouseY - this.posicionY;
  let radioCuadrado = (this.tamaño / 2) * (this.tamaño / 2);
  this.resultadoDelToque = (distanciaMouseX * distanciaMouseX + distanciaMouseY * distanciaMouseY < radioCuadrado) ? "si" : "no";
}
}
