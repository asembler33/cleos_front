import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public listUsers(): Observable<any> {
    return this.http.get((environment as any).URL_API+'/users/list-users');
  }

  public getUser(id:any): Observable<any> {
    return this.http.get((environment as any).URL_API+`/users/${id}`);
  }
  
  public deleteUser(id: any): Observable<any> {
    return this.http.delete((environment as any).URL_API+`/users/${id}`);
  }
  
  public updateUser(id: any, data:any): Observable<any> {
    return this.http.put((environment as any).URL_API+`/users/${id}`,data);
  }

  public saveUser(data: any): Observable<any> {
    return this.http.post((environment as any).URL_API+'/users', data);
  }
}
