import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchivoI } from '@data/interfaces/api/ArchivoI.interface';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { Observable, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService extends ApiClass{

  constructor(private http: HttpClient) {
    super();
  }

  getArchivoEstructura(idEstructura: number): Observable<{
    error: boolean,
    msg: string,
    data: ArchivoI
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<ArchivoI>(this.url + 'archivo_estructura/' + idEstructura)
    .pipe(map( r => {
      response.data = r;
      return response;
    }),
    catchError(this.error)
    );
  }

  getArchivosEstructura(idEstructura: number): Observable<{
    error: boolean,
    msg: string,
    data: ArchivoI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<ArchivoI[]>(this.url + 'archivos_estructura/' + idEstructura)
    .pipe(map( r => {
      response.data = r;
      return response;
    }),
    catchError(this.error)
    );
  }
}
