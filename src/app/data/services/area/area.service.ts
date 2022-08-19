import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaI } from '@data/interfaces/api/AreaI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService extends ApiClass{

  constructor(private http: HttpClient) {
    super();
  }

  getAreas(): Observable<{
    error: boolean,
    msg: string,
    data: AreaI[] 
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<AreaI[]>(this.url + 'areas')
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }
}
