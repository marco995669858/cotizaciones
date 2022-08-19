import { CotizacionI } from "./CotizacionI.interface";
import { EstructuraI } from "./EstructuraI.interface";
import { RevisorUsuarioI } from "./RevisorUsuarioI.interface";
import { UsuarioI } from "./UsuarioI.interface";

export interface RevisorI{
    id: number;
    estado: string;
    tipoUsuario: string;
    estadoLogico: number;
    prioridad: number;
    turno: number;
    fkEstructura: EstructuraI;
    fkRevisor: RevisorUsuarioI;
}
