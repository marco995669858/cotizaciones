import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemI } from '@data/interfaces/api/ItemI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends ApiClass{

  constructor(private http: HttpClient) {
    super();
  }

  postItems(items: ItemI[]): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = {error: false, msg: '', data: null};
    let headers =new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.url + 'items', JSON.stringify(items), {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }

  getItemEstructura(idEstructura:number): Observable<{
    error: boolean,
    msg: string,
    data: ItemI[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<ItemI[]>(this.url + 'item_estructura/' + idEstructura)
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }
}
