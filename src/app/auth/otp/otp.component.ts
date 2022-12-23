import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgxOtpInputConfig } from 'ngx-otp-input/public-api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{

  isLoaded:boolean = false;
  constructor(private title:Title,private authSerivce:AuthService,private activeRoute:ActivatedRoute,private router:Router) { }
  email:string;
  uid:string;
  faClose = faClose;
  otp:string[];
  alert:boolean = false;
  sucAlt:boolean = false;
  sucmsg:string;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params:ParamMap)=>{
      this.email = params.get('email');
      this.uid = localStorage.getItem('user');
    });
      if(this.authSerivce.checkLogin()){
        this.router.navigate(['/AllBooks'])
      }
      this.title.setTitle("Bookkart-OTP")
  }

  OtpConfig: NgxOtpInputConfig = {
    otpLength: 4,
    autofocus: true
  }

  onOtpChange(otp:string[]){
    this.otp = otp;
  }

  onSubmit(){
    this.isLoaded = true;
    this.authSerivce.otp(this.uid,this.otp.join('')).subscribe((res)=>{
      this.sucAlt = true;
      this.sucmsg = res.message;
      this.isLoaded = false;
      this.router.navigate(['']);
    },(err)=>{
      console.log(err);
      this.isLoaded = false;
    });
  }

  resend(){
    this.isLoaded = true;
    this.authSerivce.resendOtp(this.email).subscribe((res)=>{
      this.sucAlt = true;
      this.sucmsg = res.message;
      this.isLoaded = false;
    },(err)=>{
      if(err.status === 400){
        this.alert = true;
      }
      this.isLoaded = false;
    });
  }
}
