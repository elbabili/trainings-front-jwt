import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';      //npm install @auth0/angular-jwt

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private jwtToken:string = "";
  private roles:Array<any> = new Array<any>();
  private userConnected:User = new User("","",[]);

  constructor(private http : HttpClient) { }

  //renvoi l'utilisateur en locale storage s'il existe sinon un client vide
  getUser() {
    let user = localStorage.getItem('user');    
    if(user) { 
      //ToDo gestion d'une session prolongée soit à l'aide d'un double token soit en utilisant le session storage
      this.userConnected = JSON.parse(user); 
    }
    return this.userConnected;
  }

  login(username : string, password : string): Observable<any> {
    let formData:FormData = new FormData();
    formData.append('username',username);
    formData.append('password',password);
    //console.log(environment.host + '/login' + username + " " + password );
		return this.http.post<any> ( environment.host + '/login', formData, {observe:'response'} );
      //observation des entêtes de la réponse http notamment l'entête "autorisation"
      //l'idée ici avec observe, consiste à spécifier de ne pas convertir le résultat au format json,
      // au contraire nous souhaitons exploiter toute la réponse http afin de vérifier si une personne a des droits, si oui, lesquels
	}

  saveToken(token:string){  //une fois authentifié, on stocke en locale storage le token + l'utilisateur avec les droits associés
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    localStorage.setItem('token' , JSON.stringify(token));
    this.userConnected.username = decodedToken.sub;
    this.userConnected.roles = decodedToken.roles;
    localStorage.setItem('user' , JSON.stringify(this.userConnected));
  }

  getToken(){
    let token = localStorage.getItem('token');    
    if(token){ 
      return JSON.parse(token); 
    }
  }

  isConnected() {
    return (this.isAdmin() || this.isUser());
  }

  deconnected() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.userConnected.username = "";
    this.userConnected.password = "";
    this.userConnected.roles = [];
  }

  isAdmin() {
    let user = this.getUser();
    if(user.roles.length > 0){
      if(user.roles.indexOf('ADMIN') > -1)  return true;
    }
    return false;
  }

  isUser() {
    let user = this.getUser();
    if(user.roles.length > 0){
      if(user.roles.indexOf('USER') > -1)  return true;
    }
    return false;
  }
}

