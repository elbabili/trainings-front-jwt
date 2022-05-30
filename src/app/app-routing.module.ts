import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
    { path : 'trainings', component : TrainingsComponent },
    { path : 'cart' , component : CartComponent },
    { path : 'order' , component : OrderComponent},
    { path : 'customer' , component : CustomerComponent},
    { path : 'login' , component : LoginoutComponent},
    { path : 'training/:id' , component : TrainingComponent},
    { path : '' , redirectTo : 'trainings', pathMatch : 'full' },
    { path: '404', component: NotFoundComponent},
    { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
