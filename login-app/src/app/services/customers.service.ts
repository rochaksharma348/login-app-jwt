import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../common/user';
import { UserDto } from '../common/user-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl = "http://localhost:8080/users";
  registerUrl = "http://localhost:8080/register"

  constructor(private http : HttpClient) { }

  getUsers(): Observable<User[]> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({Authorization : token})

    return this.http.get<GetResponseUser>(this.baseUrl, {headers}).pipe(
      map(response => response._embedded.users)
    );
  }

  registerUser(user : UserDto) : Observable<any> {
    return this.http.post<UserDto>(this.registerUrl, user);
  }
}

interface GetResponseUser {
  _embedded : {
    users : User[];
  }
}
