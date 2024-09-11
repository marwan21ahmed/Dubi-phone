import { Routes } from '@angular/router';
import { Component } from '@angular/core';

import { ProductsPageComponent } from './components/products/products-page/products-page.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { ShippingComponent } from './components/checkout/shipping/shipping.component';
import { PaymentComponent } from './components/checkout/payment/payment.component';
import { WishlistComponent } from './components/shared/wishlist/wishlist.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { MywishlistComponent } from './components/account/mywishlist/mywishlist.component';
import { CouponsComponent } from './components/account/coupons/coupons.component';
import { AddressesComponent } from './components/account/addresses/addresses.component';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';
import { usergardGuard } from './guard/usergard.guard';
import { OrderPlacedComponent } from './components/checkout/order-placed/order-placed.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign up', component: SignupComponent, title: 'sign up' },
  { path: 'login', component: LoginComponent, title: 'login' },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [usergardGuard],
    children: [
      { path: '', component: ShippingComponent },
      { path: 'payment', component: PaymentComponent },
    ],
  },
  { path: 'orderPlaced', component: OrderPlacedComponent ,canActivate: [usergardGuard],},
  { path: 'cart', component: CartComponent },
  {
    path: 'category',
    component: ProductsPageComponent,
    children: [
      { path: ':category', component: ProductsPageComponent },
      { path: ':category/:brand', component: ProductsPageComponent },
    ],
  },
  {
    path: 'brand',
    component: ProductsPageComponent,
    children: [{ path: ':brand', component: ProductsPageComponent }],
  },
  { path: 'product/:name', component: ProductDetailsComponent },
  { path: 'search', component: ProductsPageComponent },
  { path: 'wishlist', component: WishlistComponent },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [usergardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'my-wishlist', component: WishlistComponent },
      { path: 'coupons', component: CouponsComponent },
      { path: 'edit-address', component: AddressesComponent },
      { path: 'edit-account', component: AccountDetailsComponent },
    ],
  },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
