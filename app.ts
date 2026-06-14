import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calculadora');
  pantalla = "0";
  private valorAnterior: number | null = null;
  private operacion: string | null = null;
  nuevoNumero: boolean | undefined;

limpiar() {
    this.pantalla = "0";
  }
  borrar_ultimo() {
    if (this.pantalla.length > 1) {
      this.pantalla = this.pantalla.slice(0, -1);
    } else {
      this.pantalla = "0";
    }
  }
  agregarNumero(numero: any) {
    if (this.pantalla === "0") {
      this.pantalla = numero;
    } else {      this.pantalla += numero;
    }
  }

presionarOperacion(operacion: string) {
  if (this.nuevoNumero) {
    this.pantalla = operacion;
    this.nuevoNumero = false;
  } else {
    this.pantalla += operacion;
  }
}

  agregarDecimal() {
    if (!this.pantalla.includes('.')) {
      this.pantalla += '.';
    }
  }
  obtenerResultado() {
    try {
      const resultado = eval(this.pantalla);
      this.pantalla = resultado.toString();
      this.nuevoNumero = true;
    } catch (error) {
      this.pantalla = "Error";
    } 
  }
  agregarPorcentaje() {
  const valorActual = parseFloat(this.pantalla);

  if (this.valorAnterior !== null && this.operacion) {
    const porcentaje = (this.valorAnterior * valorActual) / 100;

    let resultado = 0;

    switch (this.operacion) {
      case '+':
        resultado = this.valorAnterior + porcentaje;
        
 break;
      case '-':
        resultado = this.valorAnterior - porcentaje;
        break;
      case '*':
        resultado = this.valorAnterior * (porcentaje / this.valorAnterior);
        break;
      case '/':
        resultado = this.valorAnterior / (porcentaje / this.valorAnterior);
        break;
    }

    this.pantalla = resultado.toString();
    this.valorAnterior = null;
    this.operacion = null;
  } else {
    this.pantalla = (valorActual / 100).toString();
}
  this.nuevoNumero = true;
  }
  abrirUniandes() {
    window.open('https://www.uniandes.edu.ec/', '_blank');
  }
  exit () {
    window.close();
  }
  raizCuadrada() {
    const valorActual = parseFloat(this.pantalla);
    this.pantalla = Math.sqrt(valorActual).toString();
  } 
}

