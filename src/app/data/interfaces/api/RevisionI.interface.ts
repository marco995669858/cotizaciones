import { ArchivoI } from "./ArchivoI.interface";
import { RevisorI } from "./RevisorI.interface";
import { UsuarioI } from "./UsuarioI.interface";

export interface RevisionI{
    id: number;
    observacion: string;
    fecha: string;
    estado: string;
    ciclo: number;
    fkEstructuraUsuario: RevisorI;
}
