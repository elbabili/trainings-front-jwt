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
  mode:number = 0;
  
  constructor(private formBuilder : FormBuilder, public authService : AuthenticateService, 
    private apiService : ApiService, private router : Router) { 
    this.user = new User("","",[]);
    this.connected = authService.isConnected();
    this.myForm = this.formBuilder.group({
      username : [this.user.username, [Validators.required]],
      password : [this.user.password, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onLogin(form : FormGroup){
    if(form.valid){
      this.authService.login(form.value.username,form.value.password).subscribe({
        next : (resp) => {
          console.log(resp)
          let jwt = resp.headers.get('Authorization');
          this.authService.saveToken(jwt);
          this.router.navigateByUrl('/trainings/0');
          this.mode = 0;
        },
        error : (err) => {
           //this.error = "Bad credentials";    //ToDo personnaliser l'exception côté back et l'afficher ici
           this.error = err.message;
           this.mode = 1;
        },
        complete : () => this.error = ""
      })
    }
  }

  onAddUser(){

  }

  deconnexion(){
    this.authService.deconnected();
    this.connected = false;
    this.router.navigateByUrl('/trainings/0');
  }
}
