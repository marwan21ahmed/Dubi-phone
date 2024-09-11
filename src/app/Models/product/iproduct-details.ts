import { IProduct } from "./iproduct";

export interface IProductDetails extends  IProduct {
  description:string;
  images:string[];
  stock:number;
}
