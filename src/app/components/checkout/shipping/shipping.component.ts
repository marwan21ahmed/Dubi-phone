import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateOrder } from '../../../Models/Order/ICreateOrder';
import { OrderService } from '../../../Services/OrderService/order.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,TranslateModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
})
export class ShippingComponent   {
  shippingInfo: FormGroup;
  @Output() radioChangeEvent = new EventEmitter<boolean>();
  @Output() storeEvent = new EventEmitter<boolean>();
  @Input() home: boolean = true;
  @Input() payment: boolean = false;
  order!:ICreateOrder;

  constructor(private router: Router,
    private _orderService: OrderService
  ) {

    if (_orderService.order!==undefined)
        this.order=_orderService.order;

    this.shippingInfo = new FormGroup({
      firstName: new FormControl(this.order.firstName, [Validators.required]),
      lastName: new FormControl(this.order.lastName, [Validators.required]),
      address: new FormControl(this.order.address, [Validators.required]),
      emailAddress: new FormControl(this.order.emailAddress, [Validators.required]),
      city: new FormControl(this.order.city, [Validators.required]),
      phone: new FormControl(this.order.phone, [Validators.required]),
      shippingMethod: new FormControl(this.order.shippingMethod, [Validators.required]),
      store: new FormControl(this.order?.store, []),
    });

    if (this.order.shippingMethod==='StorePickup')
      this.home=false;

  }

  get EmailAddress() {
    return this.shippingInfo.get('emailAddress');
  }
  get FirstName() {
    return this.shippingInfo.get('firstName');
  }
  get LastName() {
    return this.shippingInfo.get('lastName');
  }
  get Address() {
    return this.shippingInfo.get('address');
  }
  get City() {
    return this.shippingInfo.get('city');
  }
  get Phone() {
    return this.shippingInfo.get('phone');
  }
  get ShippingMethod() {
    return this.shippingInfo.get('shippingMethod');
  }
  get store() {
    return this.shippingInfo.get('store');
  }
  changeShippingMethod(e: Event) {
    if ((e.currentTarget as HTMLElement).classList.contains('home')) {
      this.home = true;
      this.radioChangeEvent.emit(true);
      this.store?.reset(Validators.required);
      this.ShippingMethod?.setValue("HomeDelivery");
    } else if ((e.currentTarget as HTMLElement).classList.contains('store')) {
      this.home = false;
      this.radioChangeEvent.emit(false);
      this.store?.reset();
      this.store?.addValidators(Validators.required);
      this.ShippingMethod?.setValue("StorePickup");

    }
    (
      (e.currentTarget as HTMLElement).querySelector(
        'input'
      ) as HTMLInputElement
    ).checked = true;
  }
  SaveInfo(event: Event) {
    event.preventDefault();
    if (this.shippingInfo.valid) {
      this._orderService.order=this.shippingInfo.value;
      this._orderService.order.totalPrice=this.order.totalPrice;
      this.router.navigate(['checkout/payment'] );
    }
  }
}
