import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'],
  providers:[ApiService]
})
export class UpdateMenuComponent implements OnInit {
  menu:any;

  constructor(private ser:ApiService) { 
    this.ser.getAllMenu().subscribe(p => {
      this.menu=p;
    })
  }

  changeStatus(id:number) {
    if(confirm('Are you sure you want to change the status?')) {
      let menuItem:any;
    this.ser.getMenuByID(id).subscribe(p => {
      menuItem=p;
      if(menuItem.isAvailable) {
        menuItem.isAvailable=false;
      }
      else {
        menuItem.isAvailable=true;
      }
      delete menuItem.orders;
      //console.log(menuItem);
      this.ser.putMenuStatus(id,menuItem).subscribe( p=> {
        console.log(p);
      })
    })
    alert('Status Changed Successfully!')
    window.location.reload();
    }
    
  }

  ngOnInit(): void {
  }

}
