import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AutheService {

  private baseUrl = environments.baseUrl
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined{

    if (!this.user) return undefined;
    //return {...this.user}//envio una copia de user
    return structuredClone(this.user)
  }

  login(email:string, password: string): Observable<User>{

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token',user.id))
    );
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> | boolean{
    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap( user => this.user = user),
      map( user => !!user),
      catchError( err => of(false))
    )
  }

}
