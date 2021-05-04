import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {
  customerID:number;
  constructor() { 
    this.customerID=parseInt(localStorage.getItem('customerID'));
    localStorage.removeItem('customerID');
  }

  ngOnInit(): void {
  }

}
