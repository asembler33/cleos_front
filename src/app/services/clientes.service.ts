import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  
  public listClientes(): Observable<any> {
    return this.http.get((environment as any).URL_API+'/clientes/lista-clientes');
  }

  public saveClientes(data:any): Observable<any> {
    return this.http.post((environment as any).URL_API+'/clientes', data);
  }

  public deleteCliente(id:any): Observable<any> {
    return this.http.delete((environment as any).URL_API+`/clientes/${id}`);
  }

  public updateCliente(data:any, id: any ): Observable<any> {
    return this.http.put((environment as any).URL_API+`/clientes/${id}`,data);
  }

  public getClientes(id: any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/clientes/${id}`);
  }

}
