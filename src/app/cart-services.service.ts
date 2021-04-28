import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {
  cartItems:BehaviorSubject<any>=new BehaviorSubject<any>([]);

  storeCartItems(passedObjectArray) {
    this.cartItems.next(passedObjectArray);
  }

  addObject(toBeAdded) {
    let temp=JSON.stringify(this.cartItems);
    let currentObjects=JSON.parse(temp);
    let tba=JSON.parse(toBeAdded);
    currentObjects.push(tba);
    this.cartItems.next(currentObjects);
  }

  constructor() { }
}
