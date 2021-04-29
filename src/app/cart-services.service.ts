import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {
  cartItems: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  cartItemID: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([]);
  totItems:BehaviorSubject<number>=new BehaviorSubject<number>(0);
  totcost: number = 0;
  insertCartID(id: number) {
    let ind: number[]
    ind=JSON.parse(localStorage.getItem('cartItemID'));
    if(ind==null) {
      ind=[];
    }
    ind.push(id);
    localStorage.setItem('cartItemID',JSON.stringify(ind));
    let len=ind.length;
    this.totItems.next(len);
  }

  removeCartID(id: number) {
    let ind: number[]
    ind=JSON.parse(localStorage.getItem('cartItemID'));
    let index = ind.indexOf(id);
    if (index > -1) {
      ind.splice(index, 1);
      localStorage.setItem('cartItemID',JSON.stringify(ind));
      let len=ind.length;
      this.totItems.next(len);
    }
    else {
      console.log("INVALID");
    }
  }

  checkCartID(id: number) {
    let ind: number[]
    ind=JSON.parse(localStorage.getItem('cartItemID'));
    ind=ind==null?[]:ind;
    return (ind.includes(id));
  }

  storeCartItems(passedObjectArray) {
    this.cartItems.next(passedObjectArray);
  }
  getTotalCost() {
    /*
    let objs: any;
    this.cartItems.subscribe(p => {
      objs = p;
    })
    let strobjs = JSON.stringify(objs);
    let jsonobjs = JSON.parse(strobjs);
    */
    let jsonobjs = JSON.parse(localStorage.getItem('cart'))
    let i: number = 0;
    let totcost: number = 0;
    for (i = 0; i < jsonobjs.length; i++) {
      totcost += parseInt(jsonobjs[i].totalCost)
    }
    console.log(totcost);
    return totcost;

  }

  addObject(toBeAdded) {
    /*
    let objs: any;
    this.cartItems.subscribe(p => {
      objs = p;
    })*/
    let jsonobjs = JSON.parse(localStorage.getItem('cart'))
    if(jsonobjs==null) {
      jsonobjs=[];
    }
    jsonobjs.push(toBeAdded);
    let indx = toBeAdded.FoodID;
    this.insertCartID(indx);
    this.cartItems.next(jsonobjs);
    localStorage.setItem('cart',JSON.stringify(jsonobjs));
    console.log(jsonobjs)
    this.getTotalCost();
    alert('Order Placed for '+toBeAdded.foodName+' with quantity '+toBeAdded.quantity);
  }

  deleteObjectWoMessage(FoodID: number) {
    /*
    let objs: any;
    this.cartItems.subscribe(p => {
      objs = p;
    })
    let strobjs = JSON.stringify(objs);
    */
    let jsonobjs = JSON.parse(localStorage.getItem('cart'))
    const index = jsonobjs.findIndex(x => x.FoodID === FoodID);
    console.log(index);
    if (index !== -1) {
      jsonobjs.splice(index, 1);
      this.cartItems.next(jsonobjs);
      localStorage.setItem('cart',JSON.stringify(jsonobjs));
      console.log(jsonobjs);
      this.removeCartID(FoodID);
    }
    else {
      alert('Not Present in orders!');
    }
    this.getTotalCost();
  }






  deleteObject(FoodID: number) {
    /*
    let objs: any;
    this.cartItems.subscribe(p => {
      objs = p;
    })
    let strobjs = JSON.stringify(objs);
    let jsonobjs = JSON.parse(strobjs);
    */
    let jsonobjs = JSON.parse(localStorage.getItem('cart'))
    const index = jsonobjs.findIndex(x => x.FoodID === FoodID);
    console.log(index);
    if (index !== -1) {
      jsonobjs.splice(index, 1);
      this.cartItems.next(jsonobjs);
      localStorage.setItem('cart',JSON.stringify(jsonobjs));
      console.log(jsonobjs);
      this.removeCartID(FoodID);
      alert('Order Removed from Cart!')
    }
    else {
      alert('Not Present in orders!');
    }
    this.getTotalCost();
  }

  getTotalItems() {
    let temp:number[];
    this.cartItemID.subscribe(p => {
      temp=p;
    });
    return temp.length;
  }

  constructor() { }
}
