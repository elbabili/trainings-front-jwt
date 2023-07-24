import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category.model';
import { Order } from '../model/order.model';
import { Training } from '../model/training.model';
import { User } from '../model/user.model';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient, private auth : AuthenticateService) { }

  public getTrainings() {
    return this.http.get<Training[]>(environment.host+"/trainings");
  }

  public postTraining(training : any) {
    return this.http.post<Training>(environment.host+"/trainings", training , {headers:new HttpHeaders({'Authorization': this.auth.getToken()})});
  }

  public delTraining(training: Training) {
    return this.http.delete(environment.host+"/trainings/" + training.id , {headers:new HttpHeaders({'Authorization': this.auth.getToken()})});
  }

  public getTraining(id : number) {
    return this.http.get<Training>(environment.host+"/trainings/" + id);
  }  

  public getUsers() {
    return this.http.get<User[]>(environment.host + "/users");
  }

  public putTraining(training: Training) {
    console.log(training)
    return this.http.put<Training>(environment.host + "/trainings" , training , {headers:new HttpHeaders({'Authorization': this.auth.getToken()})});
  }

  public getCategories() {
    return this.http.get<Category[]>(environment.host + "/categories");
  }

  public getTrainingsByCat(id : number) {
    return this.http.get<Training[]>(environment.host + "/categories/" + id + "/trainings");
  }

  public postOrder(order : Order) {
    return this.http.post<Order>(environment.host+"/order", order , {headers:new HttpHeaders({'Authorization': this.auth.getToken()})});
  }

  public uploadPhoto(file:File, id:number):Observable<HttpEvent<{}>>{
    let formData:FormData = new FormData();
    formData.append('file',file);
    const req = new HttpRequest('POST',environment.host+'/photo/' + id , formData , 
      {
        reportProgress : true,
        responseType : 'text',
        headers:new HttpHeaders({'Authorization': this.auth.getToken()})
      } );
    return this.http.request(req);
  }
}
