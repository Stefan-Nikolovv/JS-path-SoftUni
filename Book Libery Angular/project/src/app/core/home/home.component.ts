import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IBook } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  bookList: IBook[] | any;
  errorFetcingData = false;
  dataBooks = false;
  constructor(private apiService: ApiService, private authService: AuthService){}

  ngOnInit(): void {
    this.apiService.loadAll()
    .subscribe({
      next: (value) => {
        
        this.bookList = value;
        console.log(!this.bookList)
      },
      error: (err) => {
        this.errorFetcingData = true;
        this.dataBooks = true
      }
    })
  }
}
