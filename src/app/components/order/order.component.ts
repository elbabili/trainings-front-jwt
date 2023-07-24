import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { Order } from 'src/app/model/order.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  dateOrder : Date = new Date();
  orderNumber : number | undefined;
  customer : any;
  error = null;
  cardStyle:string = "";

  constructor(public cartService : CartService, private router : Router, private apiService : ApiService) { }
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.customer = this.cartService.getCustomer();
  }

  onOrder() {
    //expedition de la commande vers l'api, attente de confirmation avec le numéro de commande
    let order = new Order(0,this.dateOrder,this.cartService.getCartItems(),this.customer,this.cartService.getAmount());
    console.log(order);
    this.apiService.postOrder(order).subscribe({
      next : (data) => {
        this.orderNumber = data.id;
        this.dateOrder = data.date;
        this.cardStyle = "card bg-info";        
      },
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

  backToHome() {  
    if(confirm("êtes vous vraiment sur de vouloir payer ?")) {
      this.cartService.clear();
      this.router.navigateByUrl('');
    }
  }
}
