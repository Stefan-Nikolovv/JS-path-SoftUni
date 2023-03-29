import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, filter, Subscription, tap } from 'rxjs';
import { IUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
  user$ = this.user$$.asObservable().pipe(
    filter((val): val is IUser | null => val !== undefined)
  );

      user: IUser | null = null;
      userId: string | null = null 
       

      get isLoggedIn() {
        return localStorage.getItem('user') || null;
      }
      get userI(){
        return JSON.stringify(localStorage.getItem('user'))  || null;
      }
     
      
  subscription : Subscription
  
  constructor(private httpClient: HttpClient) { 
    this.subscription = this.user$.subscribe(user => {
      this.user = user;
    })
  }
  
  

  register(email: string, password: string) {
      return this.httpClient.post<IUser>('/api/register', {email, password})
      .pipe(tap((user) =>{
        localStorage.setItem('user', JSON.stringify(user));
        this.userId = user._id; 
        return this.user$$.next(user)
      }

        ))
  };

  login(email: string, password: string) {
    return this.httpClient.post<any>('/api/login', {email, password})
    .pipe(tap((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userId = user._id;
      return this.user$$.next(user)
    }
      
      ));
};

logout(){
  return this.httpClient.post<void>('/api/logout', {}, {withCredentials: true})
  .pipe(tap(() => localStorage.clear()));
};

ngOnDestroy(): void {
  this.subscription.unsubscribe();
};

};
