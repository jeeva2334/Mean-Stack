import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title:string = '';
  @Input() author:string = '';
  @Input() genre:Array<any> = [];
  @Input() image:string = '';
  @Input() return:boolean = false;
  splited:any = [];

  ngOnInit(){
    this.split();
  }

  split(){
   this.splited = this.genre.toString().split(',');
  }
}
