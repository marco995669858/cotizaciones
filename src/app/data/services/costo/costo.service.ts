import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CostoI } from '@data/interfaces/api/CostoI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { Observable, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostoService extends ApiClass {

  constructor(private http: HttpClient) {
    super();
   }

  postCostos(costos: CostoI[]): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.url + 'costos', JSON.stringify(costos), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  getCostoEstructura(idEstructura:number): Observable<{
    error: boolean,
    msg: string,
    data: CostoI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<CostoI[]>(this.url + 'costo_estructura/' + idEstructura)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }
}
