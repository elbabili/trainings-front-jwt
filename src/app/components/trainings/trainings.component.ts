import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] | undefined;
  error = null;
  
  constructor(private cartService : CartService, private router : Router, 
    private apiService : ApiService, public authService : AuthenticateService) {
  }

  ngOnInit(): void {
    this.getAllTrainings();
  }

  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

  onAddToCart(training:Training){
    if(training.quantity > 0) {
     this.cartService.addTraining(training);
     //this.router.navigateByUrl('cart');
    }
  }

  onDeleteTraining(training : Training){
    if(confirm("vous êtes sur de vouloir supprimer cette formation")) {
      this.apiService.delTraining(training).subscribe({
        next : (data) => console.log(data),
        error : (err) => this.error = err.message,
        complete : () => this.getAllTrainings()
      })
    }
  }

  onUpdateTraining(training : Training){
    this.router.navigateByUrl('training/' + training.id);
  }
}



