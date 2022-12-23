import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor(private title:Title,private bookService:BooksService,private router:Router) { }
  
  book:any;
  isLoading:boolean = false;

  ngOnInit(): void {
    if(!this.bookService.checkLogin()){
      this.router.navigate(['/']);
    }
    const id = this.router.url.split('/')[2]
    this.bookService.getBook(this.router.url.split('/')[2]).subscribe((data)=>{
      this.book = data.Book;
    },(err)=>{
      console.log(err);
    });
    this.title.setTitle('BookKart-'+this.book.title);
  }

  ngOnDestroy(){
    this.book = null;
  }

  takeBook(){
    this.isLoading = true;
    this.bookService.takeBook(this.book._id).subscribe((data)=>{
      this.isLoading = false;
      this.router.navigate(['/Timer']);
    },(err)=>{
      console.log(err);
      this.isLoading = false;
    });
  }

}
