import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private users = [
    {email:'elbab@gmail.com'   , password:'1234' , roles:['ADMIN','USER']},
    {email:'pierre@gmail.com'  , password:'123'  , roles:['USER']},    
  ];
  private connected = false;
  userConnected : User = new User("","",[]);

  constructor(private apiService : ApiService) { }

  //renvoi l'utilisateur en locale storage s'il existe sinon un client vide
  getUser(){
    let user = localStorage.getItem('user');    
    if(user){
      this.userConnected = JSON.parse(atob(user));    // décryptage
    }
    return this.userConnected;
  }

  login(email: string, password: string) {
    this.users.forEach( (user) => {
        if((user.email == email) && (user.password == password)){
          this.connected = true;
          this.userConnected = user;
          localStorage.setItem('user',btoa(JSON.stringify(user)));  //cryptage des données avant stockage en LS
        }
    });
    return this.connected;
  }

  isConnected() {
    return localStorage.getItem('user') != null; 
  }

  deconnected() {
    localStorage.removeItem('user');
  }

}
