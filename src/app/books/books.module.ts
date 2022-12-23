import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllbooksComponent } from './allbooks/allbooks.component';
import { MybooksComponent } from './mybooks/mybooks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { DescriptionComponent } from './description/description.component';
import { TimerComponent } from './timer/timer.component';
import { RetBookComponent } from './ret-book/ret-book.component';



@NgModule({
  declarations: [
    AllbooksComponent,
    MybooksComponent,
    NavbarComponent,
    CardComponent,
    DescriptionComponent,
    TimerComponent,
    RetBookComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    HttpClientModule
  ]
})
export class BooksModule { }
