import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Training } from '../model/training.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  public getTrainings() {
    return this.http.get<Training[]>(environment.host+"/trainings");
  }

  public getUsers() {
    return this.http.get<User[]>(environment.host + "/users");
  }
}
