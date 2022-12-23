import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin:boolean = false;

  constructor(private http:HttpClient) { }

  Login(email:string,password:string){
    return this.http.post<{message:string;status:number;token:string;user:string}>('http://localhost:8000/api/user/login',{email,password})
  }

  signup(fullname:string,phone:string,email:string,password:string){
    return this.http.post<{message:string;status:number;user:string}>("http://localhost:8000/api/user/addUser/",{fullname,phone,email,password})
  }

  otp(uid:string,otp:string){
    const body = {
      uid: uid,
      otp: otp
    }
    return this.http.post<{message:string;status:number}>("http://localhost:8000/api/user/addUser/Otp/",{uid,otp})
  }

  resendOtp(email:string){
    return this.http.post<{message:string;status:number}>("http://localhost:8000/api/user/addUser/Otp/Resend",{email})
  }

  checkLogin(){
    localStorage.getItem('user');
    localStorage.getItem('token');
    if(localStorage.getItem('user') && localStorage.getItem('token')){
      return true;
    }else {
      return false;
    }
  }

  getUser(){
    return this.http.get<{user:any}>('http://localhost:8000/api/user/profile/'+localStorage.getItem('user'))
  }
}
