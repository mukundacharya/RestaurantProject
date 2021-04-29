import { Component, OnInit } from '@angular/core';
import { CartServicesService } from '../cart-services.service';

@Component({
  selector: 'app-chef-order',
  templateUrl: './chef-order.component.html',
  styleUrls: ['./chef-order.component.css']
})
export class ChefOrderComponent implements OnInit {
  orders:any;
  constructor(private ser:CartServicesService) { 
    let tempOrd:any;
    ser.cartItems.subscribe(p=> {
      tempOrd=p;
    })
    let strobjs=JSON.stringify(tempOrd);
    this.orders=JSON.parse(strobjs);
    console.log(this.orders);
  }

  ngOnInit(): void {
  }

}
