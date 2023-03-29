import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http'

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

      loadAll(){
        return this.httpClient.get<any>(`${apiURL}/books`)
      };


      getOneBook(id: number){
        return this.httpClient.get<any>(`${apiURL}/books/${id}`);
      };

      createBook(title: string,description: string, imageUrl: string, type: string){
        
       return this.httpClient.post<any>(`${apiURL}/books`,{title, description, imageUrl,type}, {withCredentials: true})
      };

      updateBook(id: string, title: string,description: string, imageUrl: string, type: string) {
        return this.httpClient.put<any>(`${apiURL}/books/` + id, { title, description, imageUrl, type }, {withCredentials: true});
      };
      deleteBook(id: string) {
        console.log('delete')
        return this.httpClient.delete<any>(`${apiURL}/books/` + id, {withCredentials: true});
      }
      loadMyAllBooks(){
        return this.httpClient.get<any>(`${apiURL}/books/mybooks`, {withCredentials:true})
      };


};
