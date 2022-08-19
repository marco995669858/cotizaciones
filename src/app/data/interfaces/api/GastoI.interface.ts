import { EstructuraI } from "./EstructuraI.interface";

export class GastoI{
  id: number = 0;
  nombre: string = '';
  porcentaje: number = 0;
  estadoLogico: number = 1;
  totalSoles: number = 0;
  totalDolares: number = 0;
  fkEstructura: EstructuraI = null;
}
