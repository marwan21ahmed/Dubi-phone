import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/userService/user.service';
import { IUser } from '../../Models/user/iuser';


@Component({
    selector: 'app-account',
    standalone: true,
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
    imports: [RouterModule]
})
export class AccountComponent {
user:IUser|null;
constructor(private router: Router,private _userService: UserService) {
  if(router.url =='/account'){
    router.navigate(['/account/dashboard']);
  }
  this.user=_userService.User;
}
logOut(){
  this._userService.logout();
  this.router.navigate(['/login']);
}
}
