import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { LoginI } from '@data/interfaces/form/LoginI.interface';
import { ApiClass } from '@data/schema/ApiClass.class';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  extends ApiClass{

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Función para iniciar sesión
   * @param form Valores del formulario.
   * @returns
   */
  sign_in(form: LoginI): Observable<{
    error: boolean,
    msg: string,
    data: string
  }> {
    const response = {error: false, msg: '', data: null};
    const payload = new HttpParams().set('user', form.email).set('pass', form.password);
    let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post<any>(this.url+'auth/sign_in', payload, {headers})
    .pipe(
      map( r => {
        response.data = r.token;
        return response;
      }),
      catchError(this.error)
    );
  };

  session_user(): Observable<{
    error: boolean,
    msg: string,
    data: UsuarioI
  }> {
    const response = {error: false, msg: '', data: null};
    const payload = new HttpParams().set('token', this.getToken());
    let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post<UsuarioI>(this.url+'auth/session_user', payload, {headers})
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  };



}
