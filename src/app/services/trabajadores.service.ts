import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {

  constructor(private http: HttpClient) { }

  public listTrabajadores(): Observable<any> {
    return this.http.get(environment.URL_API+'/trabajadores/lista-trabajadores');
  }

  public getTrabajador(id:any): Observable<any> {
    return this.http.get(environment.URL_API+`/trabajadores/${id}`);
  }
  
  public deleteTrabajador(id: any): Observable<any> {
    return this.http.delete(environment.URL_API+`/trabajadores/${id}`);
  }
  
  public updateTrabajador(id: any, data:any): Observable<any> {
    return this.http.put(environment.URL_API+`/trabajadores/${id}`,data);
  }

  public saveTrabajador(data: any): Observable<any> {
    return this.http.post(environment.URL_API+'/trabajadores', data);
  }


}
