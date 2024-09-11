import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { RouterModule } from '@angular/router';
import { IProduct } from '../../../Models/product/iproduct';
import { LocalizationService } from '../../../Services/localiztionService/localization.service';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../../Services/wishlistService/wishlist.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,RouterModule,TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() isGridOne=false
@Input() isWishlist=false
@Input() product!:IProduct;

isArabic!: boolean ;

@ViewChild('cardRef',{static:true}) cardRef!:ElementRef;

// Keep track of list of generated components for removal purposes
components = [];
constructor(private localizationService: LocalizationService,
  private _wishlistService: WishlistService
) {
this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);

}

removeFromWishlist(){

  this._wishlistService.updateWishlist(this.product.id);
 (((this.cardRef.nativeElement as HTMLElement).parentElement)as HTMLElement).remove();
}
}
