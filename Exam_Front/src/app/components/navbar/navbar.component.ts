import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLogedIn=false;
  user:any=null;

  constructor(public login:LoginService){}

  ngOnInit(): void {
    this.isLogedIn=this.login.isLogin();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
    this.isLogedIn=this.login.isLogin();
    this.user=this.login.getUser();
    })
  }
  public logout(){
    this.login.logout();
   window.location.reload();
   //this.login.loginStatusSubject.next(false);
  }
}
