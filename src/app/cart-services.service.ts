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

  addObject(toBeAdded) {
    let objs:any;
    this.cartItems.subscribe(p => {
      objs=p;
    })
    let strobjs=JSON.stringify(objs);
    let jsonobjs=JSON.parse(strobjs);
    jsonobjs.push(toBeAdded);
    console.log(jsonobjs);
    this.cartItems.next(jsonobjs);
  }

  constructor() { }
}
