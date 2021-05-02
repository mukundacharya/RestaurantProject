import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
  providers:[ApiService]
})
export class AllOrdersComponent implements OnInit {
  orders:any;
  totalCost:number=0;
  constructor(private ser:ApiService) { 
    this.ser.getOrders().subscribe(p => {
      this.orders=p;
      for(let i=0;i<this.orders.length;i++) {
        this.totalCost+=this.orders[i].amount;
        let temp:any;
        this.ser.getMenuByID(this.orders[i].foodID).subscribe(p => {
          temp=p;
          this.orders[i]['name']=temp.foodName;
          this.orders[i]['perplate']=temp.cost;
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
