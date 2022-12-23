import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faBars, faClose, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit{


  constructor(private title:Title,private bookService:BooksService,private router:Router) { }

  books:any = [];
  single:any = [];
  nothing:boolean = false;

  ngOnInit(){
    if(!this.bookService.checkLogin()){
      this.router.navigate(['']);
    }
    this.bookService.myBooks().subscribe((data)=>{
      this.books = data.books;
      if(!this.books){
        this.nothing = true;
      }else{
        this.SingleBook();
      }
    },(err)=>{
      console.log(err);
    });
    this.title.setTitle('BookKart-MyBooks');
  }

  SingleBook(){
    for (let index = 0; index < this.books.length; index++) {
      const element = this.books[index].bookId;
      this.bookService.getBook(element).subscribe((data)=>{
        this.single = [...this.single,data.Book];
      },(err)=>{
        console.log(err);
      });
    }
  }

  ngOnDestroy(){
    this.books = null;
  }
}
