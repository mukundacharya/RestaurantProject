import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[ApiService]
})
export class MenuComponent implements OnInit {
menuItems:any;
  constructor(private ser:ApiService) { 
    this.ser.getAllMenu().subscribe(p => {
      this.menuItems=p;
      console.log(p);
    });
  }

  ngOnInit(): void {
  }

}
