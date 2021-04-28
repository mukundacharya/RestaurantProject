import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartServicesService } from '../cart-services.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[ApiService]
})
export class MenuComponent implements OnInit {
menuItems:any;
  constructor(private ser:ApiService,private cart:CartServicesService) { 
    this.ser.getAllMenu().subscribe(p => {
      this.menuItems=p;
      console.log(p);
    });
  }
  onSubmit(m:any,qty:string) {
    let quantity=parseInt(qty);
    if(quantity==0) {
      alert('Quantity entered is Zero!');
    }
    else {
      let totalCost:number=(m.cost*quantity);
      let order1={"FoodID":m.FoodID,"foodName":m.foodName,"quantity":quantity,"cost":m.cost,"totalCost":totalCost};
      this.cart.addObject(order1);
    }
  }
  onDelete(m:any) {
    this.cart.deleteObject(m.FoodID);
  }

  ngOnInit(): void {
  }

}
