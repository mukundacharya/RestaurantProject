import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartServicesService } from '../cart-services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[ApiService]
})
export class CartComponent implements OnInit {
  orders:any;
  totalCost:number;
  //:any[]=[];
  constructor(private cart:CartServicesService) { 
    let temp:any;
    this.cart.cartItems.subscribe(p => {
      temp=p;
    })
    let strobjs = JSON.stringify(temp);
    this.orders = JSON.parse(strobjs);
    let i:number=0;
    /*
    for(i =0;i<this.orders.length;i++) {
      this.img.push(this.orders[i].foodImage);
    }
    */
    this.totalCost=this.cart.getTotalCost();
  }

  ngOnInit(): void {
  }

}
