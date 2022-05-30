import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-loginout',
  templateUrl: './loginout.component.html',
  styleUrls: ['./loginout.component.css']
})
export class LoginoutComponent implements OnInit {
  myForm : FormGroup;
  user : User | undefined;
  error : string | undefined;
  connected : boolean = false;
  
  constructor(private formBuilder : FormBuilder, public authService : AuthenticateService, 
    private apiService : ApiService, private router : Router) { 
    this.user = authService.getUser(); 
    this.connected = authService.isConnected();
    this.myForm = this.formBuilder.group({
      email : [this.user.email, [Validators.required,Validators.pattern('[a-z0-9.@]*')]],
      password : [this.user.password, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onLogin(form : FormGroup){
    if(form.valid){
      if(this.authService.login(form.value.email,form.value.password)){
          this.router.navigateByUrl('cart');
      }
      this.error = 'Email ou Password incorrectes';
    }
  }

  onAddUser(){

  }

  deconnexion(){
    this.authService.deconnected();
    this.connected = false;
    this.router.navigateByUrl('trainings');
  }
}
