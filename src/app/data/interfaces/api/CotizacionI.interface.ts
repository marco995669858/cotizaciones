import { EstructuraI } from "./EstructuraI.interface";
import { UsuarioI } from "./UsuarioI.interface";

export class CotizacionI{
    id: number = 0;
    nombre: string = '';
    fechaCreacion: string = '';
    estadoLogico: number = 1
    etapa: number = 0;
    fkEstructura: EstructuraI = new EstructuraI;
}