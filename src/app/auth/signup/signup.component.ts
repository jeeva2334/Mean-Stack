import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private title:Title,private authService:AuthService,private router:Router) { }
  isLoading:boolean = false;
  signupForm = new FormGroup({
    fullname: new FormControl(null, {validators: [Validators.required]}),
    phone: new FormControl(null, {validators: [Validators.required]}),
    email: new FormControl(null, {validators: [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9]+.[a-z]{2,4}')]}),
    password: new FormControl(null, {validators: [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]})
  });

  ngOnInit(): void {
    if(this.authService.checkLogin()){
      this.router.navigate(['/AllBooks'])
    }
    this.title.setTitle("Bookkart-Signup")
  }

  page:number = 0;
  faClose = faClose;

  u401:boolean = false;

  incPage(){
    this.page++;
  }

  onSubmit(){
    this.isLoading = true;
    this.authService.signup(this.signupForm.value.fullname,this.signupForm.value.phone,this.signupForm.value.email,this.signupForm.value.password).subscribe((res)=>{
      localStorage.setItem('user',res.user);
      this.isLoading = false;
      this.router.navigate(['/otp',this.signupForm.value.email]);
    },(err)=>{
      if(err.status === 401){
        this.u401 = true;
      }
      this.isLoading = false;
    });
  }
}
