import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})

export class PlaceOrderComponent {
  orderForm: FormGroup;
  private apiKey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';
  orderData: any;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      patient_id: [''],
      delivery_type: ['', Validators.required],
      address: [''],
      address_line2: [''],
      city: [''],
      state: [''],
      zipcode: ['', [Validators.pattern(/^\d{6}$/)]],
      patient_name: [''],
      mobile: [''],
      latitude: [''],
      longitude: [''],
      full_address: ['']
    });

    this.orderData = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.orderData);
    if (this.orderData != undefined) {
      this.setValueFun(this.orderData);
    }

    this.orderForm.get('delivery_type')?.valueChanges.subscribe(value => {
      if (value === 'delivery') {
        this.orderForm.get('address')?.setValidators(Validators.required);
        this.orderForm.get('city')?.setValidators(Validators.required);
        this.orderForm.get('state')?.setValidators(Validators.required);
        this.orderForm.get('zipcode')?.setValidators([Validators.required, Validators.pattern(/^\d{6}$/)]);
      } else {
        this.clearValidators(['address', 'city', 'state', 'zipcode']);
      }
      this.orderForm.updateValueAndValidity();
    });
  }

  setValueFun(data: any) {
    this.orderForm.patchValue({
      patient_id: data.patient_id,
      delivery_type: data.delivery_type,
      patient_name: data.first_name + ' ' + data.last_name,
      zipcode: data.zipcode,
      mobile: data.mobile,
      latitude: 12.970612,
      longitude: 77.6382433
    });
  }

  clearValidators(fields: string[]) {
    fields.forEach(field => {
      this.orderForm.get(field)?.clearValidators();
      this.orderForm.get(field)?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      if (!this.orderData?.cartItems || this.orderData.cartItems.length === 0) {
        alert('No items in cart. Please add items before placing an order.');
        return;
      }
      const items = this.orderData.cartItems.map((item: any) => ({
        medicine_id: item.medicine_id,
        quantity: item.quantity
      }));
      const orderData = {
        ...this.orderForm.value,
        items: JSON.stringify(items),
        apikey: this.apiKey,
        auto_assign: true
      };
     var  orderData2={
      items: JSON.stringify(items),
        apikey: this.apiKey,
        latitude: 12.970612,
      longitude: 77.6382433
     }
      delete orderData.chemist_id;
      console.log('Order payload:', orderData);
      this.orderService.checkoutOrder(orderData2).subscribe(
        response1 => {
          if (response1.status_code === "1") {
      this.orderService.placeOrder(orderData).subscribe(
        response => {
          console.log('Order response:', response);
          if (response.status_code === "1") {
            alert('Order placed successfully');
            this.orderForm.reset();
            this.router.navigate(['/dashboard'])
       
          } else {
            alert(response.status_message);
          }
        },
        error => {
          console.error('Error placing order', error);
          alert('Error placing order. Please try again.');
        }
      );

    }else {
      alert(response1.status_message);
    }
    
    }, error => {
      console.error('Error placing order', error);
      alert('Error placing order. Please try again.');
    }
  )

    }
  }
}