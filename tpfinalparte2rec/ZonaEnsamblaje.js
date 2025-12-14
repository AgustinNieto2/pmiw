class ZonaEnsamblaje {
  constructor(nombre, x, y, tamaño) {
    this.nombre = nombre;
    this.posicionX = x;
    this.posicionY = y;
    this.tamaño = tamaño;
    this.estaOcupadaConLaParteCorrecta = "no";
  }

  dibujar() {
    noFill();
    stroke(0);
    ellipse(this.posicionX, this.posicionY, this.tamaño, this.tamaño);
    noStroke();
    fill(0);
    textSize(12);
    text(this.nombre, this.posicionX, this.posicionY - 25);
  }

  intentarColocar(parte) {
  if (parte.estaColocada == "no") {
    let distanciaParteX = parte.posicionX - this.posicionX;
    let distanciaParteY = parte.posicionY - this.posicionY;
    let radioCuadrado = (this.tamaño / 2) * (this.tamaño / 2);

    if (distanciaParteX * distanciaParteX + distanciaParteY * distanciaParteY < radioCuadrado) {
      parte.posicionX = this.posicionX;
      parte.posicionY = this.posicionY;
      parte.estaColocada = "si";
      this.estaOcupadaConLaParteCorrecta = (parte.nombre == this.nombre) ? "si" : "no";
      
      if (sonidoEnclaje.isPlaying() == false) {
        sonidoEnclaje.play();
      }
    }
  }
}
}
