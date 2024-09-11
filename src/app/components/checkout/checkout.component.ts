import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../Services/cartServices/cart.service';
import { IProductCart } from '../../Models/CartItem/iproduct-cart';
import { PaymentComponent } from "./payment/payment.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { OrderService } from '../../Services/OrderService/order.service';
import { ICreateOrder } from '../../Models/Order/ICreateOrder';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from '../../Services/localiztionService/localization.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css',
    imports: [CommonModule, PaymentComponent, ShippingComponent,RouterOutlet,RouterModule,TranslateModule]
})
export class CheckoutComponent {
  cart:IProductCart[]=[];
  home:boolean=true;
  totalPrice:number=0;
  order:ICreateOrder={
    firstName:' ',
    lastName:' ',
    phone:' ',
    emailAddress:' ',
    address:' ',
    city:' ',
    shippingMethod:'HomeDelivery',
    userId:' ',
    transactionId:' ',
    totalPrice:0
  };

  isArabic!: boolean ;

  constructor(private _cartService: CartService,private _orderService: OrderService,
    private localizationService: LocalizationService ) {
    this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);
    _orderService.order=this.order;
    _cartService.getCartProducts().subscribe(products => {
      this.cart = products;
      _cartService.AddQuantity(this.cart);
      this.cart.forEach(item=>
          this.totalPrice+= item.salePrice * item.quantity)
      this._orderService.order.totalPrice = this.totalPrice;


    });
  }
  createRange(number:number){
    // return new Array(number);
    return new Array(number);
  }
  changeRadio(res:boolean) {
    this.home = res;
  }

  useLanguage(){
    this.localizationService.ChangeLanguage();
  }
}
