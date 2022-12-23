import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { OtpComponent } from './auth/otp/otp.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AllbooksComponent } from './books/allbooks/allbooks.component';
import { DescriptionComponent } from './books/description/description.component';
import { MybooksComponent } from './books/mybooks/mybooks.component';
import { RetBookComponent } from './books/ret-book/ret-book.component';
import { TimerComponent } from './books/timer/timer.component';

const routes: Routes = [
  {path:'',component:LoginComponent,data:{title:"BookKart-Login"}},
  {path:'signup',component:SignupComponent,data:{title:"BookKart-signup"}},
  {path:'otp/:email',component:OtpComponent},
  {path:'AllBooks',component:AllbooksComponent},
  {path:'description/:id',component:DescriptionComponent},
  {path:'Timer',component:TimerComponent},
  {path:'MyBooks',component:MybooksComponent},
  {path:'return/:id',component:RetBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
