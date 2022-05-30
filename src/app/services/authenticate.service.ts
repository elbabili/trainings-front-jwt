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
  userConnected : User = new User("","",[]);

  constructor(private apiService : ApiService) { }

  //renvoi l'utilisateur en locale storage s'il existe sinon un client vide
  getUser(){
    let user = localStorage.getItem('user');    
    if(user){ //si j'ai déjà un utilisateur en LS, c'est que je suis connecté
      this.userConnected = JSON.parse(atob(user));    // décryptage
    }
    return this.userConnected;
  }

  login(email: string, password: string) {
    let connected : boolean = false;
    this.users.forEach( (user) => {
        if((user.email == email) && (user.password == password)){
          connected = true;
          this.userConnected = user;
          localStorage.setItem('user',btoa(JSON.stringify(user)));  //cryptage des données avant stockage en LS
        }
    });
    return connected;
  }

  isConnected() {
    return localStorage.getItem('user') != null; 
  }

  deconnected() {
    localStorage.removeItem('user');
    this.userConnected = new User("","",[]);
  }

  isAdmin() {
    let user = this.getUser();
    if(user.roles.length > 0){
      if(user.roles.indexOf('ADMIN') > -1)  return true;
    }
    return false;
  }

}
