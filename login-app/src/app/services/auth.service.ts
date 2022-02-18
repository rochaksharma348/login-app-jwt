import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "http://localhost:8080/authenticate";

  constructor(private httpClient : HttpClient) { }

  authenticate(username: string, password: string) {
    return this.httpClient.post<any>(this.authUrl, {username, password}).pipe(
      map(
        data => {
          sessionStorage.setItem('username', username);
          const token = "Bearer " + data.token;
          sessionStorage.setItem('token', token);
          console.log(`token: ${token}`)
          return data;
        }
      )
    );
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('username');
    return (user != null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

    const headers = new Headers()
  }
}
