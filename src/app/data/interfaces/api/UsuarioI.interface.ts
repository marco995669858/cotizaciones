import { AreaI } from "./AreaI.interface";
import { Rol } from "./RolI.interface";

export class UsuarioI{
  id: number = 0;
  nombre: string = '';
  dni: string = '';
  correo: string = '';
  estadoLogico: number = 1;
  password: string = '';
  imagen: string = '';
  cargo: string = '';
  fkArea: AreaI = new AreaI;
  fkRol: Rol = new Rol;
}
