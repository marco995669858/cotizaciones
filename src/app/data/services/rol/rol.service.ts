import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '@data/interfaces/api/RolI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService extends ApiClass{

  constructor(private http: HttpClient) { 
    super();
  }

  getRoles(): Observable<{
    error: boolean,
    msg: string,
    data: Rol[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<Rol[]>(this.url + 'roles')
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    )
  }
}
