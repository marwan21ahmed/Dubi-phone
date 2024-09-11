import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductService } from '../../../Services/productServices/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { IProductDetails } from '../../../Models/product/iproduct-details';
import { CartService } from '../../../Services/cartServices/cart.service';
import { IProductCart } from '../../../Models/CartItem/iproduct-cart';
import { PanelComponent } from '../../shared/panel/panel.component';
import { LocalizationService } from '../../../Services/localiztionService/localization.service';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../../Services/wishlistService/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [

    RouterLink,
    MatSidenavModule,
    CommonModule,
    GalleriaModule,
    ImageModule,
    SidebarModule,
    PanelComponent,
    TranslateModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  showSideCart: boolean = false;
  cartCount:number = 0;
  public product!: IProductDetails;
  public itemId?: number;
  public quantity?: number;
  public cart:IProductCart[]=[];
  subTotal:number=0;
  fakeTotal:number=0
  sub!: Subscription;
  showFiller = false;
  sidebarVisible1: boolean = false;
  sidebarVisible2: boolean = false;
  sidebarVisible3: boolean = false;
  cartitemnum:number=this.cart.length;
  isArabic!: boolean ;
  constructor(
    private _productService: ProductService,
    private route: Router,
    private _cartService: CartService,
    private localizationService: LocalizationService,
   private  _wishlistService: WishlistService
  ) {
    this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);

    this._cartService.getCartCount().subscribe(cart=>{
      this.cartCount=0;
      cart.forEach(c =>{
        this.cartCount+=c.quantity;
      } )
    })

  }

  ngOnInit(): void {
    const id = history.state['id'];
    this.sub = this._productService.getProductByID(id).subscribe({
      next: (data) => {
        if (data===null) {
          this.route.navigate(['/NotFound']);
        }
        this.product = data;
        this.product.images.unshift(data.cover);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public AddtoWichlist() {
    document
      .getElementById('hart')
      ?.classList.replace('bi-heart', 'bi-heart-fill');
    this._wishlistService.updateWishlist(this.product.id);
  }

  public addtocart() {
    this._cartService.addToCart(this.product.id);
     this.getcart() // Show sidebar
  }
  public getcart(){
    this._cartService.getCartProducts().subscribe(products => {
      this.cart = products;
      this._cartService.AddQuantity(this.cart);
      this.cart.forEach(item=>
        {
          this.subTotal+= item.salePrice * item.quantity;
          this.fakeTotal+= item.normalPrice * item.quantity
        }
      )
      this.sidebarVisible1 = true;
    });


  }

  public onCloseSidebar() {
    this.sidebarVisible2 = false; // Hide sidebar
  }
  createRange(number:number){
    // return new Array(number);
    if (number >= 5) {
      number=5
    }
    return new Array(number);
  }

  deletecart(e:Event,id:number){
     (e.target as HTMLElement).closest('.item')?.remove();
    this._cartService.updateCart(id, 0);
  }
  useLanguage(){
    this.localizationService.ChangeLanguage();
  }
  changeQuantity(e: Event, id: number) {
    let quantity = (e.target as HTMLSelectElement).selectedIndex + 1;
    console.log(quantity);
    this._cartService.updateCart(id, quantity);
  }
}
