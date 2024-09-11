import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../userService/user.service';
import { IWishlist } from '../../Models/wishlist/iwishlist';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private URL!: string;
  wishlists:IWishlist[]=[];
  constructor(private _userService:UserService,
    private _httpClient: HttpClient,

  ) {
    this.URL = environment.serverURL + '/api/Wishlist';
    if (localStorage.getItem('wishlist'))
      this.wishlists = JSON.parse(localStorage.getItem('wishlist') as string);
    if (_userService.userState)
      this.getUserWishlist(_userService.User?.nameidentifier as string);
  }
  getUserWishlist(id:string){
    this._httpClient.get(this.URL + `?userId=${id}`).subscribe((d:any)=>{
      d.forEach((wishlist:any)=>{
        let indexProdInWishlist = this.wishlists.findIndex(
          (val) => val.productId === wishlist.id
        );
        if(wishlist.id && indexProdInWishlist===-1)
          this.wishlists.push(wishlist?.id);
      })
      localStorage.setItem('wishlist',JSON.stringify(this.wishlists));
    });
  }

  getWishlistItems(){
    const userId = this._userService.User?.nameidentifier;
    return this._httpClient.get(this.URL + `?userId=${userId}`);
  }
  updateWishlist(prodId:number){
    if (this._userService.userState){
      const userId = this._userService.User?.nameidentifier;
      this._httpClient.post(this.URL+`?userId=${userId}&prodId=${prodId}`,{}).subscribe();
    }
    let indexProdInWishlist = this.wishlists.findIndex(
      (val) => val.productId === prodId
    );
    if(indexProdInWishlist===-1)
      this.wishlists.push({productId: prodId});
    else
      this.wishlists.splice(indexProdInWishlist, 1);
  }

}
