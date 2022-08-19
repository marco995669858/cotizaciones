import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClass } from '@data/schema/ApiClass.class';
import { environment } from 'environments/environment';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService extends ApiClass{

  constructor(private http: HttpClient) {
    super();
  }

  getFile(nombreArchivo: string): Observable<Blob> {
    let headers = new HttpHeaders({'responseType': 'blob'});
    return this.http.get(environment.uri + 'files/' + nombreArchivo, {responseType: 'blob', headers})
  }

  uploadFile(file: File, nombre: string){
    const data:FormData = new FormData();
    const response = {error: false, msg: '', data: null};
    let extension: string = file.name.split('?')[0].split('.').pop()!;
    const nameFile: string = nombre + '.' + extension;
    data.append("files", file, nameFile);
    return this.http.post<any>(environment.uri + 'files/upload', data);
  }
}
