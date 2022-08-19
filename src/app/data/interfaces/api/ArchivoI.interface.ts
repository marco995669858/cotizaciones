import { CotizacionI } from "./CotizacionI.interface";
import { EstructuraI } from "./EstructuraI.interface";

export class ArchivoI{
    id: number = 0;
    nombre: string = 'No existe archivo';
    fecha: string = '';
    estadoLogico: number = 1;
    fkEstructura: EstructuraI = new EstructuraI;
}
