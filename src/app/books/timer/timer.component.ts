import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  constructor (private router:Router,private bookService:BooksService) { }
  ngOnInit(): void {
    if(!this.bookService.checkLogin()){
      this.router.navigate(['/']);
    }
    this.setTimer();
  }

  setTimer(){
    let time = 20;
    let timer = setInterval(()=>{
      time--;
      if(time == 0){
        clearInterval(timer);
        this.router.navigate(['/AllBooks']);
      }
    },1000);
  }
}
