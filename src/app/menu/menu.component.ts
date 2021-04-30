import { Component, OnInit } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
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
  menuItemsTemp:any;
  constructor(private ser: ApiService, private cart: CartServicesService) {
    this.ser.getAllMenu().subscribe(p => {
      this.menuItems = p;
      this.menuItemsTemp=p;
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
          let order1 = { "FoodID": m.FoodID, "foodName": m.foodName, "quantity": quantity, "cost": m.cost, "totalCost": totalCost ,"foodImage":m.foodImage};
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
        let order1 = { "FoodID": m.FoodID, "foodName": m.foodName, "quantity": quantity, "cost": m.cost, "totalCost": totalCost, "foodImage":m.foodImage };
        this.cart.addObject(order1);
      }
    }
  }
  onDelete(m: any) {
    this.cart.deleteObject(m.FoodID);
  }
  viewOrdersAlert() {
    /*
    let arr: any;
    
    this.cart.cartItems.subscribe(p => {
      arr = p;
    })
    let strobjs = JSON.stringify(arr);
    */
    let alertText: string = "Your orders are";
    let jsonobjs = JSON.parse(localStorage.getItem('cart'));
    let cartarray=JSON.parse(localStorage.getItem('cartItemID'));
    if (jsonobjs==null || cartarray==null || cartarray.length==0) {
      alert('No Orders Placed!')
    }
    else {
      let cost: number = 0;
      let j: number;;
      for (j = 0; j < jsonobjs.length; j++) {
        alertText += "\n" + jsonobjs[j].foodName + " x " + jsonobjs[j].quantity;
        cost+=jsonobjs[j].totalCost;
      }
      
      alertText += "\nYour Total price is ₹" + cost;
      console.log(alertText);
      alert(alertText);
    }
  }
  onSearchChange(searchValue: string): void {  
    let items=[];
    for(let i=0;i<this.menuItemsTemp.length;i++) {
      if(this.menuItemsTemp[i].foodName.toLowerCase().includes(searchValue.toLowerCase())) {
        items.push(this.menuItemsTemp[i]);
      }
    }
    console.log(items);
    this.menuItems=items;
  }

  onSearchClick(str:string) {

  }



  handleChange(evt:any) {
    let target = evt.target;
    let temp=[];
    if(target.checked) {
      console.log("checked");
      for(let i=0;i<this.menuItems.length;i++) {
        if(this.menuItems[i].isVeg) {
          temp.push(this.menuItems[i]);
        }
      }
      this.menuItems=temp;
    }
    else {
      console.log('unchecked')
      this.ser.getAllMenu().subscribe( p => {
        this.menuItems=p;
      })
    }
  }

  ngOnInit(): void {
  }

}
