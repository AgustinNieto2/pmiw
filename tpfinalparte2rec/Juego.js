class Juego {
  constructor() {
    this.nombrePantallaActual = "inicio";
    this.posicionCentroX = width / 2;
    this.posicionCentroY = height / 2;
    this.hayUnaParteSeleccionada = "no";
    this.parteSeleccionadaActual = "ninguna";
    this.contadorDeTiempo = 30;
    this.contadorDeFrames = 0;
    this.pajaroMecanico = new PajaroMecanico(20, 60);
    this.listaDePartesDelPajaro = [
      new PartesPajaro("alaizquierda", 100, 400, 100, imagenAlaIzquierda),
      new PartesPajaro("aladerecha", 200, 400, 100, imagenAlaDerecha),
      new PartesPajaro("cabeza", 300, 400, 100, imagenCabeza),
      new PartesPajaro("cola", 400, 400, 100, imagenCola),
      new PartesPajaro("cuerpo", 500, 400, 100, imagenCuerpo)
    ];
    this.listaDeZonasDeEnsamblaje = [
      new ZonaEnsamblaje("alaizquierda", this.posicionCentroX - 100, this.posicionCentroY, 90),
      new ZonaEnsamblaje("aladerecha", this.posicionCentroX + 100, this.posicionCentroY, 90),
      new ZonaEnsamblaje("cabeza", this.posicionCentroX, this.posicionCentroY - 100, 80),
      new ZonaEnsamblaje("cola", this.posicionCentroX, this.posicionCentroY + 100, 80),
      new ZonaEnsamblaje("cuerpo", this.posicionCentroX, this.posicionCentroY, 100)
    ];
  }

  dibujar() {
    if (this.nombrePantallaActual == "inicio") this.dibujarInicio();
    else if (this.nombrePantallaActual == "instrucciones") this.dibujarInstrucciones();
    else if (this.nombrePantallaActual == "juego") this.dibujarJuego();
    else if (this.nombrePantallaActual == "ganaste") this.dibujarGanaste();
    else if (this.nombrePantallaActual == "perdiste") this.dibujarPerdiste();
  }

  dibujarInicio() {
    imageMode(CENTER);
    image(imagenInicio, width / 2, height / 2, width, height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("Completar el ruiseñor mecánico", width / 2, 80);
    textSize(24);
    text("Presioná J para jugar - I para instrucciones", width / 2, height - 50);
  }

  dibujarInstrucciones() {
    imageMode(CENTER);
    image(imagenFondoJuego, width / 2, height / 2, width, height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("INSTRUCCIONES", width / 2, 50);
    textSize(18);
    text(
      "Arrastrá cada parte del pájaro hasta su círculo.\n\nClick para agarrar y soltar\n\nJ para jugar - R para volver",
      width / 2,
      height / 2
    );
  }

  dibujarGanaste() {
    image(imagenVictoria, width / 2, height / 2, width, height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("LO COMPLETASTE!", width / 2, 80);
    textSize(28);
    text("¡GANASTE!\nPresioná R para volver", width / 2, height - 60);
  }

  dibujarPerdiste() {
    image(imagenDerrota, width / 2, height / 2, width, height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("Se acabó el tiempo", width / 2, 80);
    textSize(24);
    text("Se acabó el tiempo\nPresioná R para volver", width / 2, height - 60);
  }

  dibujarJuego() {
    image(imagenFondoJuego, width / 2, height / 2, width, height);

    this.contadorDeFrames++;
    if (this.contadorDeFrames == 60) {
      this.contadorDeTiempo--;
      this.contadorDeFrames = 0;
    }

    fill(0);
    textAlign(LEFT, TOP);
    textSize(22);
    text("Tiempo: " + this.contadorDeTiempo, 20, 20);

    if (this.contadorDeTiempo <= 0) { 
      this.nombrePantallaActual = "perdiste";
     sonidoPerder.play();
    }

    for (let i = 0; i < this.listaDeZonasDeEnsamblaje.length; i++) {
      this.listaDeZonasDeEnsamblaje[i].dibujar();
    }

    if (this.hayUnaParteSeleccionada == "si") {
      this.parteSeleccionadaActual.mover(mouseX, mouseY);
    }

    for (let i = 0; i < this.listaDePartesDelPajaro.length; i++) {
      this.listaDePartesDelPajaro[i].dibujar();
    }

    this.pajaroMecanico.actualizar(this.listaDeZonasDeEnsamblaje);
    this.pajaroMecanico.dibujar();

    if (this.pajaroMecanico.estaCompleto == "si") {
      this.nombrePantallaActual = "ganaste";
     sonidoGanar.play();
    }
  }

  iniciarJuego() {
    this.nombrePantallaActual = "juego";
    this.contadorDeTiempo = 30;
    this.contadorDeFrames = 0;
    this.hayUnaParteSeleccionada = "no";
    this.parteSeleccionadaActual = "ninguna";

    for (let i = 0; i < this.listaDePartesDelPajaro.length; i++) {
      let parte = this.listaDePartesDelPajaro[i];
      parte.posicionX = random(100, width - 100);
      parte.posicionY = random(100, height - 100);
      parte.estaColocada = "no";
      parte.estaSeleccionada = "no";
    }

    for (let i = 0; i < this.listaDeZonasDeEnsamblaje.length; i++) {
      this.listaDeZonasDeEnsamblaje[i].estaOcupadaConLaParteCorrecta = "no";
    }
  }

  keyPressed() {
    if (key == "i" || key == "I") this.nombrePantallaActual = "instrucciones";
    if (key == "j" || key == "J") this.iniciarJuego();
    if (key == "r" || key == "R") {
      this.nombrePantallaActual = "inicio";
    }
  }

  mousePressed() {
    if (this.nombrePantallaActual == "juego") {

      if (this.hayUnaParteSeleccionada == "si") {
        this.parteSeleccionadaActual.estaSeleccionada = "no";

        for (let i = 0; i < this.listaDeZonasDeEnsamblaje.length; i++) {
          this.listaDeZonasDeEnsamblaje[i].intentarColocar(this.parteSeleccionadaActual);
        }

        this.hayUnaParteSeleccionada = "no";
        this.parteSeleccionadaActual = "ninguna";
      } else {
        for (let i = 0; i < this.listaDePartesDelPajaro.length; i++) {
          let parte = this.listaDePartesDelPajaro[i];
          parte.fueTocada(mouseX, mouseY);

          if (parte.resultadoDelToque == "si" && parte.estaColocada == "no") {
            parte.estaSeleccionada = "si";
            this.hayUnaParteSeleccionada = "si";
            this.parteSeleccionadaActual = parte;
          }
        }
      }
    }
  }
}
