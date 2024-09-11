export interface IProductCart {
  productId:number;
  cartItemId?:number;
  quantity:number;
  stock:number;
  salePrice:number;
  normalPrice:number;
  name:string;
  arabicName?:string;
  cover:string;
}
