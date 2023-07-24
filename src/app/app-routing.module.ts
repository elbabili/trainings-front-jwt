import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { TrainingComponent } from './components/training/training.component';
import { TrainingZoomComponent } from './components/training-zoom/training-zoom.component';
import { UserGuard } from './components/user.guard';

const routes: Routes = [
    { path : 'trainings/:ca', component : TrainingsComponent },
    { path : 'cart' , component : CartComponent },
    { 
      path : 'order' , component : OrderComponent,
      canActivate : [UserGuard]
    },
    { 
      path : 'customer' , component : CustomerComponent,
      canActivate : [UserGuard]
    },
    { path : 'login' , component : LoginoutComponent},
    { 
      path : 'training/:id' , component : TrainingComponent,
      canActivate : [UserGuard]
    },
    { path : 'training-zoom/:id' , component : TrainingZoomComponent},
    { path : '' , redirectTo : 'trainings/0', pathMatch : 'full' },
    { path: '404', component: NotFoundComponent},
    { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
