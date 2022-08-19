import { environment } from "environments/environment";
import { UsuarioI } from "./UsuarioI.interface";

export class EstructuraI{
  id:number = 0;
  nombre:string = '';
  descripcion:string = '';
  cliente:string = '';
  precioNoIgv:number = 0;
  precioIgv:number = 0;
  tipoCambio:number = 0;
  igv:number = 0;
  estadoLogico:number = 1;
  estado:string = 'No existe estructura';
  fechaCreacion:string = '';
  costoTotal:number = 0;
  costSubtotal:number = 0;
  moneda:string = '';
  observacion:string = 'no';
  rucCliente:string = '';
  formaPago:string = '';
  plazoImplementacion:string = '';
  validezCotizacion:string = '';
  fkUsuario:UsuarioI = null;
}
