import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lostpassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgClass,RouterOutlet,RouterModule],
  templateUrl: './lostpassword.component.html',
  styleUrl: './lostpassword.component.css'
})
export class LostpasswordComponent {

  loginform:FormGroup;
constructor(private formbuilder:FormBuilder){
this.loginform=new FormGroup({
  Email:new FormControl("",[Validators.required,Validators.email])
})


}
get email(){
  return this.loginform.get('Email');
}

save(form:FormGroup){

}

}
