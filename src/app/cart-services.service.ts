import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {
  cartItems:BehaviorSubject<Array<any>>=new BehaviorSubject<Array<any>>([]);

  storeCartItems(passedObjectArray) {
    this.cartItems.next(passedObjectArray);
  }
  getTotalCost() {
    let objs:any;
    this.cartItems.subscribe(p => {
      objs=p;
    })
    let strobjs=JSON.stringify(objs);
    let jsonobjs=JSON.parse(strobjs);
    let i:number=0;
    let totcost:number=0;
    for(i=0;i<jsonobjs.length;i++) {
      totcost+=parseInt(jsonobjs[i].totalCost)
    }
    console.log(totcost);

  }

  addObject(toBeAdded) {
    let objs:any;
    this.cartItems.subscribe(p => {
      objs=p;
    })
    let strobjs=JSON.stringify(objs);
    let jsonobjs=JSON.parse(strobjs);
    jsonobjs.push(toBeAdded);
    this.cartItems.next(jsonobjs);
    this.getTotalCost();
  }

  deleteObject(FoodID:number) {
    let objs:any;
    this.cartItems.subscribe(p => {
      objs=p;
    })
    let strobjs=JSON.stringify(objs);
    let jsonobjs=JSON.parse(strobjs);
    const index = jsonobjs.findIndex(x => x.FoodID === FoodID);
    console.log(index);
    if (index !== -1)  
    {
      jsonobjs.splice(index, 1);
    this.cartItems.next(jsonobjs);
    alert('Order Removed from Cart!')
    }
    else {
      alert('Not Present in orders!');
    }
    this.getTotalCost();
    console.log(jsonobjs);
  }

  constructor() { }
}
