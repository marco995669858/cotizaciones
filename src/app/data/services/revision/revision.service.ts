import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RevisionI } from '@data/interfaces/api/RevisionI.interface';
import { RevisorI } from '@data/interfaces/api/RevisorI.interface';
import { RevisorUsuarioI } from '@data/interfaces/api/RevisorUsuarioI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevisionService extends ApiClass{

  constructor(private http: HttpClient) {
    super();
  }

  getRevisionesEstructura(idEstructura: number): Observable<{
    error: boolean,
    msg: string,
    data: RevisionI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<RevisionI[]>(this.url + `revision/obtenerRevisiones/${idEstructura}`)
    .pipe(
      map( r => {
        response.data = r;
        return response
      }), catchError(this.error)
    )
  }

  getRevisores(): Observable<{
    error: boolean,
    msg: string,
    data: RevisorUsuarioI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<RevisorUsuarioI[]>(this.url + 'revisores')
    .pipe(
      map( r => {
        response.data = r;
        return response
      }), catchError(this.error)
    )
  }

  postRevisor(revisores: RevisorUsuarioI[]): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<any>(this.url + 'revisor', JSON.stringify(revisores), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response
      }), catchError(this.error)
    )
  }

  putRevisor(revisores: RevisorUsuarioI[]): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put<any>(this.url + `revisor`, JSON.stringify(revisores), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response
      }), catchError(this.error)
    )
  }
}
