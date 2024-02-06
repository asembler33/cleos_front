import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfesionService {

  constructor(private http: HttpClient) { }

  public listProfesiones(): Observable<any> {
    return this.http.get((environment as any).URL_API+'/profesiones/lista-profesiones');
  }

  public saveProfesiones(data:any): Observable<any> {
    return this.http.post((environment as any).URL_API+'/profesiones', data);
  }

  public deleteProfesion(id:any): Observable<any> {
    return this.http.delete((environment as any).URL_API+`/profesiones/${id}`);
  }

  public updateProfesion(data:any, id: any ): Observable<any> {
    return this.http.put((environment as any).URL_API+`/profesiones/${id}`,data);
  }

  public getProfesion(id: any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/profesiones/${id}`);
  }

  


}
