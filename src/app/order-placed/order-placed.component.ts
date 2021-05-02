import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {
  orderID:number;
  constructor() { 
    this.orderID=parseInt(localStorage.getItem('orderID'));
    localStorage.removeItem('orderID');
  }

  ngOnInit(): void {
  }

}
