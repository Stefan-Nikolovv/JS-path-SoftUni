import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
 
  get userInfo(){
   let length =  this.authService.userI?.split('email')[1].split(':')[1].split('"')[1].length 
    const user = this.authService.userI?.split('email')[1].split(':')[1].split('"')[1].substring(0, length! - 1);
    console.log(user)
    return user;
  }


constructor(private authService: AuthService, private router: Router){}



}
