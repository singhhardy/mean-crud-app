import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/api/users`

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
  }

  AddNewUser(userData: any): Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl, userData)
  }

  deleteUser(userId: string): Observable<any>{
    const deleteUrl = `${this.apiUrl}/${userId}`;
    return  this.http.delete<any>(deleteUrl);
  }

  updateUser(userId: string, updatedUser: any): Observable<any>{
    const updateUrl = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(updateUrl, updatedUser)
  }

}
