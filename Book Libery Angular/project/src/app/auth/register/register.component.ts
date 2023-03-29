import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appEmailValidator, appPasswordValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  validationForm = this.fb.group({
    email: ['', [Validators.required, appEmailValidator]],
    pass: this.fb.group({
      password: ["", [Validators.required, Validators.minLength(5)]],
      rePassword: []
    }, {
      validators: [appPasswordValidator('password', 'rePassword')]
    })
  });
 


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){}

  registerHandler(){
    if(this.validationForm.invalid){
      return;
    }
    const {email, pass: {password, rePassword} = {}} = this.validationForm.value;
    this.authService.register(email as string, password as string)
    .subscribe(user => {
      this.router.navigate(['/']);
    })
  }
}
