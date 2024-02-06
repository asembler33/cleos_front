import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) { }

  public listBox(idSucursal: any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/box/lista-box/${idSucursal}`);
  }

  public saveBox(data:any): Observable<any> {
    return this.http.post((environment as any).URL_API+'/box', data);
  }

  public deleteBox(id:any): Observable<any> {
    return this.http.delete((environment as any).URL_API+`/box/${id}`);
  }

  public updateBox(data:any, id: any ): Observable<any> {
    return this.http.put((environment as any).URL_API+`/box/${id}`,data);
  }

  public getBox(id: any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/box/${id}`);
  }


}
