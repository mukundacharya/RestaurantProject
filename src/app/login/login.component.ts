import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ApiService]
})
export class LoginComponent implements OnInit {
  constructor(private ser:ApiService,private route:Router) { 
  }

  ngOnInit(): void {
  }
  onSubmit(data:any) {
    let user:any;
    const md5=new Md5();
    let username=data.username;
    let password=data.password;
    this.ser.getUser(username).subscribe(p => {
        user=p;
        let pass=user.password;
        let passhash=md5.appendStr(password).end();
        if(pass==passhash) {
          alert('Hi '+username+'! Login Successful!');
          this.route.navigate(['/home']);
        }
        else {
          alert('Password did not match! Try again!');
        }
    },
    error => {
      alert("Username doesn't exist!");
    });
  }

}
