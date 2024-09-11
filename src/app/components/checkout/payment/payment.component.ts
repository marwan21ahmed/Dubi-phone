import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../Services/OrderService/order.service';
import { Router, RouterModule } from '@angular/router';
import { ICreateOrder } from '../../../Models/Order/ICreateOrder';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterModule,TranslateModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
@ViewChild('paymentRef',{static:true}) paymentRef!:ElementRef;

order!:ICreateOrder;
constructor(private _orderService:OrderService,
  private router:Router
) {
 if(_orderService.order.address ===' ')
  router.navigate(['checkout']);

 this.order=_orderService.order;
}

ngOnInit(): void {
  window.paypal.Buttons(
    {createOrder:(data:any,actions:any)=>{
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: this.order.totalPrice.toString(),
        }
      }]
    });
  },
  onApprove: (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      if (details.status === 'COMPLETED') {
        this.order.transactionId = details.id;
        this._orderService.CreateOrder(this.order);
        this.router.navigate(['/orderPlaced']);
      }
    });
  },
  onError: (error: any) => {
    console.log(error);
  }
}
).render(this.paymentRef.nativeElement);
}

editShippingInfo(){
  this.router.navigate(['checkout']);
}
}
