import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faBars, faClose, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.css']
})
export class AllbooksComponent {
  constructor(private title:Title,private bookService:BooksService,private router:Router,private authService:AuthService) { }

  books:any = [];

  ngOnInit(){
    if(!this.bookService.checkLogin()){
      this.router.navigate(['']);
    }
    this.bookService.getBooks().subscribe((data)=>{
      this.books = data.books;
      this.authService.getUser();
    },(err)=>{
      console.log(err);
    });
    this.title.setTitle('BookKart-AllBooks');
  }

  ngOnDestroy(){
    this.books = null;
  }
}
