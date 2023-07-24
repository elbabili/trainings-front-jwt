import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './model/category.model';
import { ApiService } from './services/api.service';
import { AuthenticateService } from './services/authenticate.service';
import { CartService } from './services/cart.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trainings-front-app';
  listCat: Category[] | undefined;
  currentCat: Category | undefined;
  error = null;

  constructor(public cartService : CartService, public authService : AuthenticateService, 
              public apiService : ApiService, public router : Router){
  }
  
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.apiService.getCategories().subscribe({
      next : (data) => this.listCat = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

  getTrainingsByCat(category : Category) {
    this.currentCat = category;
    this.router.navigateByUrl("/trainings/" + category.id);
  }

  listTrainings() {
    this.currentCat = undefined;
    this.router.navigateByUrl("/trainings/0");
  }
}


