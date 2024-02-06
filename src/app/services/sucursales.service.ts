import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConectionSucursalesService {

  
  constructor(private http: HttpClient) { }

  
  public listSucursales(): Observable<any> {
    return this.http.get((environment as any).URL_API+'/sucursales/lista-sucursales');
  }

  public getSucursal(id:any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/sucursales/${id}`);
  }

  public getComuna(id:any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/comunas/${id}`);
  }

  public listRegiones(): Observable<any> {
    return this.http.get((environment as any).URL_API+'/regiones/list-regiones');
  }
  
  public deleteSucursal(id: any): Observable<any> {
    return this.http.delete((environment as any).URL_API+`/sucursales/${id}`);
  }
  
  public updateSucursales(id: any, data:any): Observable<any> {
    return this.http.put((environment as any).URL_API+`/sucursales/${id}`,data);
  }

  public saveSucursales(data: any): Observable<any> {
    return this.http.post((environment as any).URL_API+'/sucursales', data);
  }

  

}
