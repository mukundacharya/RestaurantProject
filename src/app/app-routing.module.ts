import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { ChefOrderComponent } from './chef-order/chef-order.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'menu',component:MenuComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'chef',component:ChefOrderComponent,canActivate:[AuthGuard]},
  {path:'cart',component:CartComponent},
  {path:'ordersuccess',component:OrderPlacedComponent},
  {path:'allorders',component:AllOrdersComponent,canActivate:[AuthGuard]},
  {path:'menustatus',component:UpdateMenuComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/home',pathMatch:'prefix'},
  {path:'**',redirectTo:'/home',pathMatch:'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
