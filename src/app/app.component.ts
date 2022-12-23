import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:string;
  isAdmin:boolean = false;
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get<{message:string}>('http://localhost:8000/').subscribe(res=>{
      this.title = res.message;
      console.table(this.title)
    })
  }
}
