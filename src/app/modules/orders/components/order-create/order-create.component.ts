import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { FormModule } from '@coreui/angular';


@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [FormModule, ReactiveFormsModule],
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent {
  orderForm: FormGroup;
  products: any[] = []; // Replace with actual Product model

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      shippingAddressId: ['', Validators.required],
      billingAddressId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      orderItems: this.fb.array([])
    });
  }

  submitOrder() {
    if (this.orderForm.valid) {
      this.orderService.createOrder(this.orderForm.value)
        .pipe(
          catchError(err => {
            console.error('Order creation failed', err);
            return of(null);
          })
        )
        .subscribe((result) => {
          if (result) {
            console.log('Order created successfully', result);
            this.router.navigate(['/orders/list']);
          }
        });
    }
  }

  addItem(item: any) {
    // Logic to add item to orderItems FormArray
  }
}
