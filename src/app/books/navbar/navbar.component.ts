import { Component, OnInit } from '@angular/core';
import { faBars, faClose, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  faBars = faBars;
  showMenu:boolean = false;
  faClose = faClose;
  faTimes = faTimes;
  userName:string;

  constructor(private bookService:BooksService) { }

  ngOnInit(){
    this.bookService.getUser().subscribe((data)=>{
      this.userName = data.user.fullname;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout(){
    this.bookService.logout();
  }
}