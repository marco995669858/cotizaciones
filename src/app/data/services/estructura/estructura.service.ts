import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstructuraI } from '@data/interfaces/api/EstructuraI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstructuraService extends ApiClass{

  constructor(private http: HttpClient) {
    super();
  }

  getEstructuras(): Observable<{
    error: boolean,
    msg: string,
    data: EstructuraI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<EstructuraI[]>(this.url + 'estructuras')
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  getEstructurasUsuario(idUsuario: number): Observable<{
    error: boolean,
    msg: string,
    data: EstructuraI[]
  }> {
    const response = {error: false, msg: '', data: null}
    return this.http.get<EstructuraI[]>(this.url + `estructuras/${idUsuario}`)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  getEstructura(idEstructura:number): Observable<{
    error: boolean,
    msg: string,
    data: EstructuraI
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<EstructuraI>(this.url + 'estructura/' + idEstructura)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  postEstructura(estructura: EstructuraI): Observable<{
    error: boolean,
    msg: string,
    data: EstructuraI
  }> {
    const response = {error: false, msg: '', data: null};
    let headers =new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<EstructuraI>(this.url + 'estructura', JSON.stringify(estructura), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  postEstructuraExcel(estructura: EstructuraI): Observable<{
    error: boolean,
    msg: string,
    data: EstructuraI
  }> {
    const response = {error: false, msg: '', data: null};
    let headers =new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<EstructuraI>(this.url + 'estructura/excel', JSON.stringify(estructura), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  deleteEstructura(idEstructura: number): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.delete<any>(this.url + 'estructura/' + idEstructura)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  enviarRevision(estructura: EstructuraI): Observable<{
    error: boolean,
    msg: string,
    data: EstructuraI
  }>{
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<EstructuraI>(this.url + 'revision/enviar_revision', JSON.stringify(estructura), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  aprobarRevision(idEstructura: number, idUsuario: number): Observable<{
    error: boolean,
    msg: string,
    data: EstructuraI
  }>{
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<EstructuraI>(this.url + `revision/aprobar/${idEstructura}/${idUsuario}`, {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  observarRevision(idEstructura: number, idUsuario: number, observacion: string): Observable<{
    error: boolean,
    msg: string,
    data: EstructuraI
  }>{
    const object = {
      observacion: observacion
    }
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<EstructuraI>(this.url + `revision/observar/${idEstructura}/${idUsuario}`, object, {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

}
