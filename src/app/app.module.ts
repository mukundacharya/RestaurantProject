import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ChefOrderComponent } from './chef-order/chef-order.component';
import { CartComponent } from './cart/cart.component';
import { ChefNavComponent } from './chef-nav/chef-nav.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    AboutComponent,
    ContactComponent,
    ChefOrderComponent,
    CartComponent,
    ChefNavComponent,
    OrderPlacedComponent,
    NavbarComponent,
    AllOrdersComponent,
    UpdateMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
