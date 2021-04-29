import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartServicesService } from '../cart-services.service';

@Component({
  selector: 'app-chef-order',
  templateUrl: './chef-order.component.html',
  styleUrls: ['./chef-order.component.css'],
  providers:[ApiService]
})
export class ChefOrderComponent implements OnInit {
  orders:any;
  constructor(private cart:CartServicesService,private ser:ApiService) { 
    this.ser.getOrders().subscribe(p => {
      this.orders=p;
      console.log(this.orders);
      for(let i=0;i<this.orders.length;i++) {
        let name:string;
        let temp:any;
        this.ser.getMenuByID(this.orders[i].foodID).subscribe(p => {
          temp=p;
          name=temp.foodName;
          this.orders[i]['name']=name;
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
