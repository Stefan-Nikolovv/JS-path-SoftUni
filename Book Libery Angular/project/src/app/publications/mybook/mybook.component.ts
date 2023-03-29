import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IBook } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mybook',
  templateUrl: './mybook.component.html',
  styleUrls: ['./mybook.component.css']
})
export class MybookComponent implements OnInit {


  bookList: IBook[] | null = null;
  errorFetcingData = false;
  dataBooks = false;
  constructor(private apiService: ApiService, private authService: AuthService){}
   
  ngOnInit(): void {
    this.apiService.loadMyAllBooks()
    .subscribe({
      next: (value) => {
    
        this.bookList = value;
      },
      error: (err) => {
        this.errorFetcingData = true;
        this.dataBooks = true
      }
    })
  }
}
