import { Injectable } from '@angular/core';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RevisorI } from '@data/interfaces/api/RevisorI.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ApiClass {
  constructor(private http: HttpClient){
    super();
  }

  getUsuarios(): Observable<{
    error: boolean,
    msg: string,
    data: UsuarioI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<UsuarioI[]>(this.url + 'usuarios')
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  getUsuario(idUsuario: number): Observable<{
    error: boolean,
    msg: string,
    data: UsuarioI
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<UsuarioI>(this.url + 'usuario/' + idUsuario)
    .pipe(map( r => {
      response.data = r;
      return response;
    }),
    catchError(this.error)
    );
  }

  postUsuario(usuario: UsuarioI): Observable<{
    error: boolean,
    msg: string,
    data: UsuarioI
  }> {
    const response = {error: false, msg: '', data: null};
    let headers =new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<UsuarioI>(this.url + 'usuario', JSON.stringify(usuario), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  putUsuario(usuario: UsuarioI): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<any>(this.url + 'usuario', JSON.stringify(usuario), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }), catchError(this.error)
    )
  }

  verificarTurno(idUsuario: number, idEstructura): Observable<{
    error: boolean,
    msg: string,
    data: RevisorI
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<RevisorI>(this.url + `revision/verificarTurnoUsuario/${idUsuario}/${idEstructura}`)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }), catchError(this.error)
    )
  }
}
