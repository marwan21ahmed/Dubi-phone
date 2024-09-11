import { IOrderItem } from "./IOrderitem";

export interface IOrder {
  id:number;
  status: string;
  totalPrice: number;
  orderedAt: Date;
  orderItems:IOrderItem[];
}
