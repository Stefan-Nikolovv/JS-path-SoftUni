import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

 

  validationForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    description: ['', [Validators.required,Validators.minLength(15), Validators.maxLength(100)]],
    imageUrl: ['', [Validators.required]],
    type: ['Other', [Validators.required]]
  })
  constructor(private fb: FormBuilder, private router: Router, private apiSerivce: ApiService){}
  createdHandler(){
    if(this.validationForm.invalid) {
      return;
    }
    const {title, description, imageUrl, type} = this.validationForm.value;
      this.apiSerivce.createBook(title as string, description as string, imageUrl as string, type as string)
      .subscribe(() => {
        this.router.navigate(['/'])
      })
  }
}
