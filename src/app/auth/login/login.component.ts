import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;
  setEmail:boolean = false;
  setPass:boolean = false;
  isLoading:boolean = false;
  u401:boolean = false;
  u402:boolean = false;
  faClose = faClose;

  constructor(private title:Title,private http:HttpClient,private authService:AuthService,private router:Router){
  }
  ngOnInit(): void {
    this.title.setTitle("Bookkart-Login")
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9]+.[a-z]{2,4}')]),
      password: new FormControl(null,[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    });
    if(this.authService.checkLogin()){
      this.router.navigate(['/AllBooks'])
    }
  }

  onSubmit(){
    if(this.loginForm.value.email === null){
      this.setEmail = true
    }else if(this.loginForm.value.password === null){
      this.setPass = true
    }else{
      this.isLoading = true
      this.authService.Login(this.loginForm.value.email,this.loginForm.value.password).subscribe((res)=>{
        localStorage.setItem('token',res.token)
        localStorage.setItem('user',res.user)
        this.isLoading = false
        this.router.navigate(['/AllBooks'])
      },(err)=>{
        if(err.status === 401){
          this.u401 = true
        }else if(err.status === 402){
          this.u402 = true
        }
        this.isLoading = false
      })
    }
  }
  
}
