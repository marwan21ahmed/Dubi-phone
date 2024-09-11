import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductService } from '../../../Services/productServices/product.service';
import { IProduct } from '../../../Models/product/iproduct';
import { CardComponent } from "../card/card.component";
import { WishlistService } from '../../../Services/wishlistService/wishlist.service';

@Component({
    selector: 'app-wishlist',
    standalone: true,
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.css',
    imports: [CardComponent]
})
export class WishlistComponent implements OnInit ,OnChanges {
  @ViewChild('container',{static:true}) container!:ElementRef;
  products:IProduct[]=[];
  constructor(private _wishlistService:WishlistService) {


  }
  ngOnChanges(changes: SimpleChanges): void {
    if ((this.container?.nativeElement as HTMLElement).childElementCount===0) {
      this.products=[];
    }
  }

  ngOnInit(): void {
  this._wishlistService
  .getWishlistItems()
  .subscribe({
    next: (data: any) => {
      this.products = data;
    }});
  }


}
