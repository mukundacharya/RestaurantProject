import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartServicesService } from '../cart-services.service';
import { Router } from '@angular/router'
declare var $: any

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ApiService]
})
export class CartComponent implements OnInit {
  orders: any;
  totalCost: number;
  currentCustomerID: any;
  //:any[]=[];
  constructor(private cart: CartServicesService, private route: Router, private ser: ApiService) {
    /*
    let temp:any;
    this.cart.cartItems.subscribe(p => {
      temp=p;
    })
    let strobjs = JSON.stringify(temp);
    localStorage.setItem('cart',strobjs);
    */
    this.orders = JSON.parse(localStorage.getItem('cart'));
    let i: number = 0;
    /*
    for(i =0;i<this.orders.length;i++) {
      this.img.push(this.orders[i].foodImage);
    }
  */
    this.totalCost = this.cart.getTotalCost();

  }

  ngOnInit(): void {

  }
  onDelete(o: any) {
    if (confirm('Are you sure to remove this Item?')) {
      let foodID: number = o.FoodID;
      console.log(foodID);
      this.cart.deleteObject(foodID);
      window.location.reload();
    }
    else {
      console.log("done")
    }
  }

  clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('cartItemID', JSON.stringify([]));
    alert('Cart Cleared!')
    window.location.reload();
  }
  placeOrderMul(id: number) {
    let orderArray: any;
    orderArray = JSON.parse(localStorage.getItem('cart'));
    console.log(orderArray.length)
    for (let i = 0; i < orderArray.length; i++) {
      let customerID = id;
      let foodID = orderArray[i].FoodID;
      let quantity = orderArray[i].quantity;
      let status = true;
      let amount = orderArray[i].totalCost;
      let order = { "customerID": customerID, "foodID": foodID, "quantity": quantity, "status": status, "amount": amount };
      let temp: any;
      this.ser.postOrder(order).subscribe(p => {
        temp = p;
        localStorage.setItem('orderID', temp.orderID);
      },
        error => {
          alert('Order Could not be placed!');
        });

    }
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('cartItemID', JSON.stringify([]));
    this.route.navigate(['/ordersuccess']);

  }

  placeOrder() {
    let orderArray: any;
    orderArray = JSON.parse(localStorage.getItem('cart'));
    if (orderArray.length == 0 || orderArray == null) {
      alert('No order present in cart!');
    }
    else {
      const currentDate = new Date();
      let arr: any;
      let dateTime = currentDate.toISOString().split('T')[0] + ' ' + currentDate.toTimeString().split(' ')[0];
      let customer = { "dt": dateTime, "finalAmount": this.totalCost };
      this.ser.postCustomer(customer).subscribe(p => {
        this.currentCustomerID = p;
        console.log(this.currentCustomerID.customerID);
        this.placeOrderMul(this.currentCustomerID.customerID);
      })
    }


  }


}
