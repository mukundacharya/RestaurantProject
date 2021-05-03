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
    })
  }

  onOrderComplete(id:number) {
    let order:any;
    this.ser.getOrderByID(id).subscribe(p => {
      order=p;
      console.log(order);
      order.status=false;
      delete order.customerInfo;
      delete order.menu;
      console.log(order);
      this.ser.putOrderStatus(id,order).subscribe(p => {
        console.log(p);
        
      })
    })
    alert('Order with orderID '+id+' completed! Well Done!');
    window.location.reload();
    

  }

  ngOnInit(): void {
  }

}
