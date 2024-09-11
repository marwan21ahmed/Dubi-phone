export interface ICreateOrder {
  address: string;
  emailAddress: string;
  city: string;
  shippingMethod: string;
  store?: string;
  firstName: string;
  lastName: string;
  phone: string;
  userId: string;
  transactionId: string;
  totalPrice: number;
}
