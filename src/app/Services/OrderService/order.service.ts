import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ICreateOrder } from '../../Models/Order/ICreateOrder';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../Models/Order/IOrder';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private URL: string = environment.serverURL + '/api/order';
  order!:ICreateOrder;
  constructor(private _httpClient: HttpClient,private _userService:UserService) {}

  CreateOrder(order: ICreateOrder) {
    localStorage.setItem('cart','');
    order.userId=this._userService.User?.nameidentifier as string;
    this._httpClient.post<ICreateOrder>(this.URL, order).subscribe();
  }
  GetUserOrder() {
    const id=this._userService.User?.nameidentifier;
    return this._httpClient.get<IOrder[]>(this.URL + `/GetUserOrders?id=${id}`);
  }
}
