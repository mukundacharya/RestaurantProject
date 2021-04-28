import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {
  cartItems:BehaviorSubject<Array<any>>=new BehaviorSubject<Array<any>>([]);
  cartItemID:BehaviorSubject<Array<number>>=new BehaviorSubject<Array<number>>([]);
  totcost:number=0;
  insertCartID(id:number) {
    let ind:number[]
    this.cartItemID.subscribe(p => {
      ind=p;
    })
    ind.push(id);
    this.cartItemID.next(ind);
  }

  removeCartID(id:number) {
    let ind:number[]
    this.cartItemID.subscribe(p => {
      ind=p;
    })
    let index = ind.indexOf(id);
    if(index > -1) {
      ind.splice(index,1);
    }
    else {
      console.log("INVALID");
    }
  }

  checkCartID(id:number) {
    let ind:number[]
    this.cartItemID.subscribe(p => {
      ind=p;
    })
    return (ind.includes(id));
  }

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
    let indx=toBeAdded.FoodID;
    this.insertCartID(indx);
    this.cartItems.next(jsonobjs);
    console.log(jsonobjs)
    this.getTotalCost();
    alert('Order Placed!')
  }

  deleteObjectWoMessage(FoodID:number) {
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
    console.log(jsonobjs);
    this.removeCartID(FoodID);
    }
    else {
      alert('Not Present in orders!');
    }
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
    console.log(jsonobjs);
    this.removeCartID(FoodID);
    alert('Order Removed from Cart!')
    }
    else {
      alert('Not Present in orders!');
    }
    this.getTotalCost();
  }

  constructor() { }
}
