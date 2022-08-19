import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CotizacionI } from '@data/interfaces/api/CotizacionI.interface';
import { EstructuraI } from '@data/interfaces/api/EstructuraI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService extends ApiClass {

  constructor(private http: HttpClient) {
    super();
   }

  getCotizaciones(): Observable<{
    error: boolean,
    msg: string,
    data: CotizacionI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<CotizacionI[]>(this.url + 'cotizaciones')
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  getCotizacion(idCotizacion: number): Observable<{
    error: boolean,
    msg: string,
    data: CotizacionI
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<CotizacionI>(this.url + 'cotizacion/' + idCotizacion)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  getCotizacionEstructura(idEstructura: number): Observable<{
    error: boolean,
    msg: string,
    data: CotizacionI
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<CotizacionI>(this.url + `CotizacionEstructura/${idEstructura}`)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  getCotizacionesUsuario(idUsuario: number): Observable<{
    error: boolean,
    msg: string,
    data: CotizacionI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<CotizacionI[]>(this.url + `cotizacionesUsuario/${idUsuario}`)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  getCotizacionesEtapa(etapa: number): Observable<{
    error: boolean,
    msg: string,
    data: CotizacionI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<CotizacionI[]>(this.url + `cotizacionesEtapa/${etapa}`)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  generarCotizacion(estructura: EstructuraI): Observable<{
    error: boolean,
    msg: string,
    data: CotizacionI
  }> {
    const response = {error: false, msg: '', data: null};
    let headers =new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<CotizacionI>(this.url + 'generarCotizacion', JSON.stringify(estructura), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  putCotizacion(cotizacion: CotizacionI): Observable<{
    error: boolean,
    msg: string,
    data: CotizacionI
  }> {
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<CotizacionI>(this.url + 'cotizacion', JSON.stringify(cotizacion), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }
}
