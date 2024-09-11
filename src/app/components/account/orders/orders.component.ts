import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../../Models/Order/IOrder';
import { OrderService } from '../../../Services/OrderService/order.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit  {
orders:IOrder[]=[];
constructor(private _orderService:OrderService){

}
  ngOnInit(): void {
    this._orderService.GetUserOrder().subscribe(data=>{
      this.orders=data.reverse();
    })
  }
}
