import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../Services/userService/user.service';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgClass,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  islogin!: boolean;
  constructor(
    private formbuilder: FormBuilder,
    private userservices: UserService,
    private router: Router,

  ) {
    this.loginform = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    if (this.userservices.userState) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.islogin = this.userservices.userState;
  }
  get email() {
    return this.loginform.get('Email')?.value;
  }
  get password() {
    return this.loginform.get('password')?.value;
  }
  save(form: FormGroup) {
    this.login();
  }

  async login() {
    await this.userservices.login(this.email, this.password);
    if (this.userservices.userState) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.userservices.logout();
    this.islogin = this.userservices.userState;
  }
}
