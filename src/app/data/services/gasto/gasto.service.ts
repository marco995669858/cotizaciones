import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GastoI } from '@data/interfaces/api/GastoI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoService extends ApiClass{

  constructor(private http: HttpClient) {
    super();
  }

  postGastos(gastos: GastoI[]): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = {error: false, msg: '', data: null};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.url + 'gastos', JSON.stringify(gastos), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  getGastoEstructura(idEstructura:number): Observable<{
    error: boolean,
    msg: string,
    data: GastoI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<GastoI[]>(this.url + 'gasto_estructura/' + idEstructura)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }
}
