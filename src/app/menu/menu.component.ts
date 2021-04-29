import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartServicesService } from '../cart-services.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ApiService]
})
export class MenuComponent implements OnInit {
  menuItems: any;
  constructor(private ser: ApiService, private cart: CartServicesService) {
    this.ser.getAllMenu().subscribe(p => {
      this.menuItems = p;
      console.log(p);
    });
  }
  onSubmit(m: any, qty: string) {
    let quantity = parseInt(qty);
    if (this.cart.checkCartID(m.FoodID)) {
      if (confirm('The item ' + m.foodName + ' has already been placed! Do you want to rewrite order or cancel?')) {
        if (quantity == 0) {
          alert('Quantity cannot be Zero!');
        }
        else {
          this.cart.deleteObjectWoMessage(m.FoodID);
          let totalCost: number = (m.cost * quantity);
          let order1 = { "FoodID": m.FoodID, "foodName": m.foodName, "quantity": quantity, "cost": m.cost, "totalCost": totalCost };
          this.cart.addObject(order1);
        }
      } else {
        // Do nothing!
        console.log('Done!');
      }
    }
    else {
      if (quantity == 0) {
        alert('Quantity cannot be Zero!');
      }
      else {
        let totalCost: number = (m.cost * quantity);
        let order1 = { "FoodID": m.FoodID, "foodName": m.foodName, "quantity": quantity, "cost": m.cost, "totalCost": totalCost };
        this.cart.addObject(order1);
      }
    }
  }
  onDelete(m: any) {
    this.cart.deleteObject(m.FoodID);
  }
  viewOrdersAlert() {
    let arr: any;
    let alertText: string = "Your orders are";
    this.cart.cartItems.subscribe(p => {
      arr = p;
    })
    let strobjs = JSON.stringify(arr);
    let jsonobjs = JSON.parse(strobjs);
    console.log(jsonobjs.length);
    if (jsonobjs.length == 0) {
      alert('No Orders Placed!')
    }
    else {
      let j: number;;
      for (j = 0; j < jsonobjs.length; j++) {
        alertText += "\n" + jsonobjs[j].foodName + " x " + jsonobjs[j].quantity;
      }
      let cost: number = this.cart.getTotalCost();
      alertText += "\nYour Total price is ₹" + cost;
      console.log(alertText);
      alert(alertText);
    }
  }

  ngOnInit(): void {
  }

}
