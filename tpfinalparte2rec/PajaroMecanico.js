class PajaroMecanico {
  constructor(x, y) {
    this.posicionX = x;
    this.posicionY = y;
    this.cantidadPartesCorrectas = 0;
    this.estaCompleto = "no";
  }

  actualizar(zonas) {
    let contador = 0;

    for (let i = 0; i < zonas.length; i++) {
      if (zonas[i].estaOcupadaConLaParteCorrecta == "si") {
        contador++;
      }
    }

    this.cantidadPartesCorrectas = contador;
    this.estaCompleto = (contador == 5) ? "si" : "no";
  }

  dibujar() {
    fill(0);
    textSize(14);
    text(
      "Pájaro armado: " + this.cantidadPartesCorrectas + " / 5",
      this.posicionX,
      this.posicionY
    );
  }
}
