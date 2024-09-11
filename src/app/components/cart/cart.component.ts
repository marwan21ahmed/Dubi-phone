import { CommonModule } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { CartService } from '../../Services/cartServices/cart.service';
import { IProductCart } from '../../Models/CartItem/iproduct-cart';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from '../../Services/localiztionService/localization.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  fakeTotal: number = 0;
  subTotal: number = 0;
  isArabic!: boolean;

  cart: IProductCart[] = [];
  constructor(
    private _cartService: CartService,
    private localizationService: LocalizationService
  ) {
    _cartService.getCartProducts().subscribe((products) => {
      this.cart = products;
      _cartService.AddQuantity(this.cart);
      this.cart.forEach((item) => {
        this.subTotal += item.salePrice * item.quantity;
        this.fakeTotal += item.normalPrice * item.quantity;
      });
    });
    this.localizationService.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }
  createRange(number: number) {
    if (number >= 5) {
      number=5
    }
    return new Array(number);
  }

  removerFromCart(e: Event, id: number) {
    (e.target as HTMLElement).closest('.item')?.remove();
    this._cartService.updateCart(id, 0);
  }
  changeQuantity(e: Event, id: number) {
    let quantity = (e.target as HTMLSelectElement).selectedIndex + 1;
    this._cartService.updateCart(id, quantity);
  }
  useLanguage() {
    this.localizationService.ChangeLanguage();
  }
}
