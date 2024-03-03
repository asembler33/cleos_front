import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConectionCleosService {
  
  constructor(private http: HttpClient) { }


  public listEspecialidades(): Observable<any> {
    return this.http.get((environment as any).URL_API+'/especialidades/lista-especialidades');
  }
  
  public deleteEspecialidad(id: any): Observable<any> {
    
    return this.http.delete((environment as any).URL_API+`/especialidades/${id}`);
  }
  
  public updateEspecialidad(id: any, data:any): Observable<any> {
    
    return this.http.put((environment as any).URL_API+`/especialidades/${id}`,data);
  }

  public saveEspecialidad(data: any): Observable<any> {
    
    return this.http.post((environment as any).URL_API+'/especialidades', data);
  }

  public getEspecialidad(id: any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/especialidades/${id}`);
  }

  public saveServicio(data: any): Observable<any> {
    
    return this.http.post((environment as any).URL_API+'/servicios', data);
  }
    
  public deleteServicio(id: any){
    return this.http.delete((environment as any).URL_API+`/servicios/${id}`);
  }

  public listServicios(): Observable<any> {
    return this.http.get((environment as any).URL_API+'/servicios/lista-servicios');
  }
  
  public getServicio(id: any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/servicios/${id}`);
  }

  public listServiciosEspecialidad(id: any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/servicios/listaServiciosEspecialidad/${id}`);
  }

  public listDuracion(): Observable<any> {
    return this.http.get((environment as any).URL_API+`/duracion/lista-duraciones`);
  }

  public updateServicio(id: any, data:any): Observable<any>{

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put((environment as any).URL_API+`/servicios/${id}`, data , {headers});
      
  }





}
