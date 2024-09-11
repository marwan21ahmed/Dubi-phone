import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';
import { ICartItem } from '../../Models/CartItem/icart-item';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IProductCart } from '../../Models/CartItem/iproduct-cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCount: BehaviorSubject<ICartItem[]>;
  private URL!: string;
  private cart: ICartItem[] = [];
  constructor(
    private _userService: UserService,
    private httpClient: HttpClient
  ) {
    this.URL = environment.serverURL + '/api/cart';
    if (localStorage.getItem('cart'))
      this.cart = JSON.parse(localStorage.getItem('cart') as string);
    if (_userService.userState)
      this.getUserCart(_userService.User?.nameidentifier as string);

    this.cartCount = new BehaviorSubject<ICartItem[]>(this.cart);

  }

  addToCart(id: number) {
    let indexProdInCart = this.cart.findIndex((val) => val.productId === id);
    let cartItem: ICartItem;

    if (indexProdInCart === -1) {
      cartItem = {
        productId: id,
        quantity: 1,
      };
      this.cart.push(cartItem);
    } else {
      this.cart[indexProdInCart].quantity++;
      cartItem = { ...this.cart[indexProdInCart] };
    }

    if (this._userService.userState) {
      cartItem.userId = this._userService.User?.nameidentifier;
      this.addCartToApi(cartItem);
    }

    this.addCartToMemory();
  }
  private addCartToMemory() {
    this.cartCount.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  private addCartToApi(item: ICartItem) {
    this.httpClient.post<ICartItem>(this.URL, item).subscribe();
  }
  getUserCart(id: string) {
    this.httpClient
      .get<ICartItem[]>(this.URL + '/GetUserCart?userId=' + id)
      .subscribe({
        next: (result) => {
          result.forEach((cartItem) => {
            let indexProdInCart = this.cart.findIndex(
              (val) => val.productId === cartItem.productId
            );
            if (indexProdInCart === -1) {
              this.cart.push({
                productId: cartItem.productId,
                quantity: 1,
              });
            } else this.cart[indexProdInCart].quantity = cartItem.quantity;
          });
          this.addCartToMemory();
        },
      });
  }
  getCartProducts() {
    if (this._userService.userState) {
      const id = this._userService.User?.nameidentifier;
      return this.httpClient.get<IProductCart[]>(
        this.URL + '/GetCartProductsByUser?userId=' + id
      );
    }
    let arr: number[] = this.cart.map((item) => item.productId);
    return this.httpClient.get<IProductCart[]>(
      this.URL + '/GetCartProducts?ids=' + arr.join('&ids=')
    );
  }
  AddQuantity(products: IProductCart[]) {
    products.forEach((p) => {
      let indexProdInCart = this.cart.findIndex(
        (val) => val.productId === p.productId
      );
      if (indexProdInCart === -1) {
        p.quantity = 1;
      } else p.quantity = this.cart[indexProdInCart].quantity;
    });
  }
  updateCart(id: number, quantity: number) {
    let indexProdInCart = this.cart.findIndex((val) => val.productId === id);
    if (indexProdInCart !== -1) {
      let cartItem: ICartItem = this.cart[indexProdInCart];
      if (quantity===0)
        this.cart.splice(indexProdInCart, 1);

      if (this._userService.userState) {
        cartItem.userId = this._userService.User?.nameidentifier;
        cartItem.quantity = quantity;
        this.addCartToApi(cartItem);
      }
      this.addCartToMemory();
    }
  }

  getCartCount() {
    return this.cartCount.asObservable();
  }
}
