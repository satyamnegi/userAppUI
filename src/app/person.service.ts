import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './login/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PersonService {

  private baseUrl = 'https://userappservice.herokuapp.com/api/';

  constructor(private http:HttpClient,private authenticationService: AuthenticationService) { }

  getPersonList(): Observable<any> {
    //, { headers: { authorization: this.authenticationService.authToken}}
    return this.http.get(`${this.baseUrl}`+'getAllPersons');
  }

  createPerson(student: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'savePerson', [student]);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}deletePerson/${id}`, { responseType: 'text' });
  }

  getPerson(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}getPersonById/${id}`);
  }

  updatePerson(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}updatePersonById/${id}`, value);
  }
  
}                                           