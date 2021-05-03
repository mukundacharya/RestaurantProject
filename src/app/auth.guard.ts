import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate() {
    console.log("Auth Guard");
     if(localStorage.getItem("user")) {
       return true;
   }
   else return false;
   
 }
    
  
}
