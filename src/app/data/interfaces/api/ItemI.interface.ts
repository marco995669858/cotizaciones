import { EstructuraI } from "./EstructuraI.interface";

export class ItemI{
  id: number = 0;
  nombre: string = '';
  cantidad: number = 0;
  precio: number = 0;
  estadoLogico: number = 1;
  totalSoles: number = 0;
  totalDolares: number = 0;
  fkEstructura: EstructuraI = null;
}
