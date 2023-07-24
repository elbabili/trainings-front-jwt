import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] | undefined;
  error : string | undefined;
  host : string = "";
  editPhoto : boolean | undefined;
  currentTraining : any;
  selectedFiles : any;
  progress : number | undefined;
  currentFileUpload : any;
  idCat : number = 0;
  categories : Category[] | undefined;
  
  constructor(private cartService : CartService, private router : Router, 
    private apiService : ApiService, public authService : AuthenticateService, 
    public route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.host = environment.host;
    this.router.events.subscribe( nav => {    //on observe chaque évènement sur le routeur qui redirige vers le composant trainings
      if(nav instanceof NavigationEnd) {      //on vérifie si la navigation s'est finalisé correctement
        this.idCat = this.route.snapshot.params['ca']; //on récupère l'id de la catégorie positionné dans le composant principal
        this.refreshScreen();
      }
    })
    this.getAllTrainings();   //par défaut, on affiche toutes les formations
    this.getAllCategories();  
  }

  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = "Pb de chargement",
      complete : () => this.error = ""
    })
  }

  getAllCategories() {
    this.apiService.getCategories().subscribe({
      next : (data) => this.categories = data,
      error : (err) => this.error = "Pb de chargement",
      complete : () => this.error = ""
    })
  }

  getAllTrainingsByCat(idCat : number) {
    this.apiService.getTrainingsByCat(idCat).subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = "Pb de chargement",
      complete : () => this.error = ""
    })
  }

  onAddToCart(training:Training) {
    if(training.quantity > 0) {
     this.cartService.addTraining(training);
     //this.router.navigateByUrl('cart');
    }
  }

  onDeleteTraining(training : Training) {
    if(confirm("vous êtes sur de vouloir supprimer cette formation")) {
      this.apiService.delTraining(training).subscribe({
        next : (data) => console.log(data),
        error : (err) => this.error = err.error.cause.localizedMessage,   //ToDo : personnaliser le traitement des erreurs coté serveur
        complete : () => this.refreshScreen()
      })
    }
  }

  refreshScreen(){
    if(this.idCat > 0) this.getAllTrainingsByCat(this.idCat); //on affiche toutes les formations d'une catégorie
    else this.getAllTrainings();  //ou toutes les formations
  }

  onUpdateTraining(training : Training) {
    this.router.navigateByUrl('training/' + training.id);
  }

  onTrainingDetail(training : Training) {
    this.router.navigateByUrl('training-zoom/' + training.id);   //ToDo afficher l'image associée pour modification
  }

  onEditPhoto(training : Training){
    this.currentTraining = training;
    this.editPhoto = true;
  }

  onSelectedFile(event:any){
    this.selectedFiles = event.target.files;
  }

  uploadPhoto(){
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);    //on peut uploader le 1er fichier selectionné
    this.apiService.uploadPhoto(this.currentFileUpload,this.currentTraining.id).subscribe({
      next : (event) => {
        if(event.type === HttpEventType.UploadProgress){
          if(event.total) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
          else {
            console.log("handle illegal state");
          }
        }
        else if(event instanceof HttpResponse) {  //lorsque tout s'est bien déroulé
          this.refreshScreen();
        }
      },
      error : (err) => this.error = "pb de transfert d'image",
      complete : () => this.error = ""
    });
  } 
}