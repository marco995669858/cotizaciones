export class SnackBar{
  mensaje: string;
  // 0: mensaje de carga, 1: ok, 2:error
  tipo: number;
  button: boolean;

  constructor(mensaje: string, tipo: number, button: boolean){
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.button = button;
  }
}
