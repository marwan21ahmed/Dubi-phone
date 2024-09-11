import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../Services/userService/user.service';
import { ICreatingUser } from '../../../Models/user/icreating-user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgClass,RouterOutlet,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

signform:FormGroup;

constructor(formbilder:FormBuilder,private userService:UserService,private router:Router) {
  this.signform=new FormGroup({
    UserName:new FormControl("",[Validators.required]),
    Email:new FormControl("",[Validators.required]),
    Password:new FormControl("",[Validators.required])
  })

}
get UserName(){
  return this.signform.get('UserName')?.value;
}
get Email(){
  return this.signform.get('Email')?.value;
}
get Password(){
  return this.signform.get('Password')?.value;
}
save(form:FormGroup){
}
signup(){
  let user:ICreatingUser={email:this.Email, password:this.Password,username:this.UserName}
  this.userService.registration(user);
  // this.router.navigate(['/']);
}
}
