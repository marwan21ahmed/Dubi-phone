
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../Services/userService/user.service';
import { IUser } from '../../../Models/user/iuser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
user:IUser |null;
constructor(private _userService: UserService) {
  this.user=_userService.User
}
}
