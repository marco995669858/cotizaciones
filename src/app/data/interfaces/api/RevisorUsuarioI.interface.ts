import { UsuarioI } from "./UsuarioI.interface";

export class RevisorUsuarioI{
  id: number = 0;
  prioridad: number = 0;
  estadoLogico: number = 1;
  fkUsuario: UsuarioI = new UsuarioI;
}
