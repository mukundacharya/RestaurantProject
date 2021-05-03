import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chef-nav',
  templateUrl: './chef-nav.component.html',
  styleUrls: ['./chef-nav.component.css']
})
export class ChefNavComponent implements OnInit {
  name:string;

  constructor(private route:Router) { 
    let user=JSON.parse(localStorage.getItem('user'));
    this.name=user.username;
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('user');
    this.route.navigate(['/home']);
  }

}
