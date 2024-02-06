import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  public listRoles(): Observable<any> {
    return this.http.get((environment as any).URL_API+'/roles/lista-roles');
  }

  public saveRol(data:any): Observable<any> {
    return this.http.post((environment as any).URL_API+'/roles', data);
  }

  public deleteRol(id:any): Observable<any> {
    return this.http.delete((environment as any).URL_API+`/roles/${id}`);
  }

  public updateRol(data:any, id: any ): Observable<any> {
    return this.http.put((environment as any).URL_API+`/roles/${id}`,data);
  }

  public getRol(id: any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/roles/${id}`);
  }


}
