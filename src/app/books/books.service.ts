import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books:any = [];

  constructor(private http:HttpClient) { }

  checkLogin(){
    localStorage.getItem('user');
    localStorage.getItem('token');
    console.log(localStorage.getItem('user'));
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('user') && localStorage.getItem('token')){
      console.log(true);
      return true;
    }else {
      console.log(false);
      return false;
    }
  }

  getUser(){
    return this.http.get<{user:any}>('http://localhost:8000/api/user/profile/'+localStorage.getItem('user'));
  }

  async logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return this.http.get<{message:string}>('http://localhost:8000/api/user/logout');
  }

  getBooks(){
    return this.http.get<{books:any}>('http://localhost:8000/api/books/getBooks');
  }

  getBook(id:string){
    console.log(id);
    return this.http.get<{Book:any}>('http://localhost:8000/api/books/getBook/'+id);
  }

  takeBook(id:string){
    const uid = localStorage.getItem('user');
    const body = {
      bookId:id,
      userId:uid
    }
    console.log(body);
    return this.http.post<{message:string}>('http://localhost:8000/api/myBooks/TakeBook/',body);
  }

  myBooks(){
    const uid = localStorage.getItem('user');
    const body = {
      userId:uid
    }
    return this.http.post<{books:any}>('http://localhost:8000/api/myBooks/',body);
  }

  returnBook(id:string){
    const body = {
      id:id
    }
    return this.http.post<{message:string}>('http://localhost:8000/api/myBooks/returnBook/',body);
  }
}
