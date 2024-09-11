import { HttpClient } from '@angular/common/http';

import { ChangeDetectorRef, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IUser } from '../../Models/user/iuser';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ICreatingUser } from '../../Models/user/icreating-user';
import { IUpdatedUser } from '../../Models/user/iupdated-user';
import { Ilogin } from '../../Models/user/ilogin';
import { Router } from '@angular/router';
import { JwtDecoderService } from '../tokenService/jwt-decoder.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private URL!: string;
  private AccountURL!: string;
  private isUserLoggedIn!: BehaviorSubject<boolean>;
  private user!:IUser;

  constructor(private httpClient: HttpClient, private router: Router,private jwtService: JwtDecoderService) {
    this.URL = environment.serverURL + '/api/user';
    this.AccountURL = environment.serverURL + '/api/Account';
    this.isUserLoggedIn = new BehaviorSubject<boolean>(this.userState);

    if (this.userState) {
      this.user=jwtService.decodeToken(localStorage.getItem('token') as string);
    }
  }

  get userState(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  get UserLoggedIn(): BehaviorSubject<boolean> {
    return this.isUserLoggedIn;
  }

  get User() {
    if(this.userState)
      return this.user;
    return null;
  }

  login(email: string, password: string) {
    let user: Ilogin = { username: email, password: password };
    this.httpClient.post<Ilogin>(this.AccountURL + '/Login', user).subscribe({
      next: (data: any) => {
        if (data.status) {
          localStorage.setItem('token', data.token);
          this.isUserLoggedIn.next(true);
          this.router.navigate(['/']);
        }
      },
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.isUserLoggedIn.next(false);
  }
  registration(user: ICreatingUser) {
    this.httpClient
      .post<ICreatingUser>(this.AccountURL + '/SignUp', user)
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error(err) {
          console.log(err);
        },
      });
  }
  addToMyWishList(LovedProductId: number): Observable<any> {
    return this.httpClient.patch(
      this.URL + `/additemtomywishlist/${LovedProductId}`,
      {}
    );
  }
  getMyData(): Observable<IUser> {
    return this.httpClient.get<IUser>(this.URL + `/myprofile`);
  }
  updateMyData(user: IUpdatedUser): Observable<IUser> {
    return this.httpClient.put<IUser>(this.URL + `/myprofile`, user);
  }

}
