import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { of } from 'rxjs';

export class ApiClass{
  public url = environment.uri;
  public isProduction = environment.production;

  constructor() { }

  error(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: ${error.status}\nMessage:_${error.message}`;
    }
    return of({error: true, msg: errorMessage, data: null});
  };

  public getToken(){
    if(localStorage.getItem("token")!=null){
      return localStorage.getItem("token");
    }else{
      return null;
    }
  };

}
